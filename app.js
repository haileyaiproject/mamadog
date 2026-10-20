/* ==========================================================
   마마독 app.js  (프레임워크 없이 순수 JavaScript)
   ========================================================== */

/* ---------------- 설정 (여기만 고치면 돼요) ----------------
   KAKAO_JS_KEY : 나중에 카카오맵으로 바꾸고 싶을 때 카카오 개발자센터의
                  JavaScript 키를 넣으세요. 지금은 비워두고, 지도는 Leaflet(OpenStreetMap)을 써요.
                  (카카오맵 연동은 아직 구현되어 있지 않아요.)
   CONTACT_EMAIL: 푸터의 "정보 제보하기" 메일 주소예요. 실제 주소로 바꿔주세요.
   SITE_NAME    : 사이트 이름 */
const CONFIG = {
  KAKAO_JS_KEY: "",
  CONTACT_EMAIL: "hello@example.com",
  SITE_NAME: "마마독"
};

/* ---------------- 상태 ---------------- */
let places = [];                       // 전체 장소
const filters = { nursingRoom: false, diaperStation: false, strollerRental: false, dog: false };
let map = null, markerLayer = null;
const markers = {};                    // id -> Leaflet 마커
let activeId = null;

const $ = (id) => document.getElementById(id);

/* HTML에 넣을 글자를 안전하게 바꿔요 (데이터에 이상한 문자가 있어도 안전) */
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
/* http(s) 링크만 허용 */
function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }

/* ---------------- 데이터 불러오기 ---------------- */
async function fetchJson(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) { const e = new Error("HTTP " + res.status); e.status = res.status; throw e; }
  return res.json();
}
async function loadData() {
  try {
    return await fetchJson("data/places.json");
  } catch (e) {
    // places.json 이 아직 없으면(404) 샘플 데이터를 대신 써요
    return await fetchJson("data/places.sample.json");
  }
}

/* ---------------- 필터 ---------------- */
function getFiltered() {
  const district = $("district").value;
  const category = $("category").value;
  const q = $("q").value.trim().toLowerCase();
  return places.filter((p) => {
    if (filters.nursingRoom && !(p.baby && p.baby.nursingRoom)) return false;
    if (filters.diaperStation && !(p.baby && p.baby.diaperStation)) return false;
    if (filters.strollerRental && !(p.baby && p.baby.strollerRental)) return false;
    if (filters.dog && !(p.dog && (p.dog.allowed === true || p.dog.allowed === "partial"))) return false;
    if (district && p.district !== district) return false;
    if (category && p.category !== category) return false;
    if (q && !((p.name || "") + " " + (p.address || "") + " " + (p.district || "")).toLowerCase().includes(q)) return false;
    return true;
  });
}

/* ---------------- 카드 ---------------- */
const CONF = { high: "확인됨", medium: "참고", low: "미확인" };

function dogBadge(dog) {
  if (!dog) return "";
  const conf = CONF[dog.confidence] || "미확인";
  if (dog.allowed === true) return `<span class="badge dog-yes">🐶 강아지 가능 · ${conf}</span>`;
  if (dog.allowed === "partial") return `<span class="badge dog-partial">🐶 조건부 · ${conf}</span>`;
  return `<span class="badge dog-no">🐾 강아지 불가 · ${conf}</span>`;
}

function cardHtml(p) {
  const b = p.baby || {};
  const badges = [];
  if (b.nursingRoom) badges.push('<span class="badge">🍼 수유실</span>');
  if (b.diaperStation) badges.push('<span class="badge">🚼 기저귀교환대</span>');
  if (b.strollerRental) badges.push('<span class="badge">👶 유모차대여</span>');
  if (b.strollerAccess) badges.push('<span class="badge">🛒 유모차 진입</span>');
  badges.push(dogBadge(p.dog));

  const name = encodeURIComponent(p.name || "");
  const src = safeUrl(p.sourceUrl);
  const notes = [b.note, p.dog && p.dog.note].filter(Boolean).map((n) => `<p class="note">${esc(n)}</p>`).join("");
  const hasCoord = typeof p.lat === "number" && typeof p.lng === "number";
  const route = hasCoord
    ? `<a class="go" href="https://map.kakao.com/link/to/${name},${p.lat},${p.lng}" target="_blank" rel="noopener">길찾기</a>` : "";

  return `<article class="card" data-id="${esc(p.id)}" tabindex="0" aria-label="${esc(p.name)}">
    <h2>${esc(p.name)}</h2>
    <div class="meta">${esc(p.category)} · ${esc(p.district)}</div>
    <div class="badges">${badges.join("")}</div>
    ${notes}
    ${p.hours ? `<div class="hours">🕘 ${esc(p.hours)}</div>` : ""}
    <div class="links">
      ${src ? `<a href="${esc(src)}" target="_blank" rel="noopener">출처</a>` : ""}
      <a href="https://map.kakao.com/link/search/${name}" target="_blank" rel="noopener">카카오맵에서 보기</a>
      ${route}
    </div>
  </article>`;
}

/* ---------------- 지도 ---------------- */
function initMap() {
  if (typeof L === "undefined") {   // Leaflet 로딩 실패 (오프라인 등)
    $("map").innerHTML = '<div class="message">지도를 불러오지 못했어요. 목록은 그대로 볼 수 있어요.</div>';
    return;
  }
  map = L.map("map", { scrollWheelZoom: true }).setView([37.5665, 126.978], 11);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
}

function pinIcon(p) {
  const a = p.dog && p.dog.allowed;
  const cls = a === true ? "dog" : a === "partial" ? "partial" : "baby";
  return L.divIcon({ className: "", html: `<div class="pin ${cls}"></div>`, iconSize: [26, 26], iconAnchor: [13, 26], popupAnchor: [0, -24] });
}

function renderMarkers(list) {
  if (!map) return;
  markerLayer.clearLayers();
  Object.keys(markers).forEach((k) => delete markers[k]);
  const pts = [];
  list.forEach((p) => {
    if (typeof p.lat !== "number" || typeof p.lng !== "number") return;
    const m = L.marker([p.lat, p.lng], { icon: pinIcon(p), title: p.name, keyboard: false });
    m.bindPopup(`<div class="popup-title">${esc(p.name)}</div><div class="popup-sub">${esc(p.category)} · ${esc(p.district)}</div>`);
    m.on("click", () => selectPlace(p.id, "marker"));
    m.addTo(markerLayer);
    markers[p.id] = m;
    pts.push([p.lat, p.lng]);
  });
  if (pts.length) map.fitBounds(pts, { padding: [40, 40], maxZoom: 14 });
}

/* 카드 ↔ 마커 연동 */
function selectPlace(id, from) {
  activeId = id;
  document.querySelectorAll(".card").forEach((c) => c.classList.toggle("active", c.dataset.id === id));
  const m = markers[id];
  if (from === "marker") {
    const card = document.querySelector(`.card[data-id="${CSS.escape(id)}"]`);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else if (m && map) {
    map.setView(m.getLatLng(), Math.max(map.getZoom(), 15), { animate: true });
    m.openPopup();
    // 모바일에서는 지도가 위에 있으므로 지도로 스크롤
    if (window.innerWidth < 900) $("map").scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ---------------- 화면 그리기 ---------------- */
function render() {
  const list = getFiltered();
  $("count").textContent = `${list.length}곳을 찾았어요`;
  $("reset").hidden = !isFiltering();
  $("message").innerHTML = "";

  if (!list.length) {
    $("list").innerHTML = '<div class="empty">조건에 맞는 장소가 없어요.<br>필터를 줄여 보세요 🐾</div>';
  } else {
    $("list").innerHTML = list.map(cardHtml).join("");
  }
  renderMarkers(list);
  if (activeId) selectPlace(activeId, "marker");
}

function isFiltering() {
  return Object.values(filters).some(Boolean) || $("district").value || $("category").value || $("q").value.trim();
}

function fillSelect(id, values) {
  const sel = $(id);
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "ko")).forEach((v) => {
    const o = document.createElement("option");
    o.value = v; o.textContent = v;
    sel.appendChild(o);
  });
}

/* ---------------- 이벤트 ---------------- */
function bindEvents() {
  document.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.filter;
      filters[key] = !filters[key];
      btn.setAttribute("aria-pressed", String(filters[key]));
      render();
    });
  });
  ["district", "category"].forEach((id) => $(id).addEventListener("change", render));
  $("q").addEventListener("input", render);
  $("reset").addEventListener("click", () => {
    Object.keys(filters).forEach((k) => (filters[k] = false));
    document.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", "false"));
    $("district").value = ""; $("category").value = ""; $("q").value = "";
    render();
  });
  // 카드 클릭(링크 클릭은 제외) / 키보드 Enter
  const list = $("list");
  list.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const card = e.target.closest(".card");
    if (card) selectPlace(card.dataset.id, "card");
  });
  list.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || e.target.closest("a")) return;
    const card = e.target.closest(".card");
    if (card) selectPlace(card.dataset.id, "card");
  });
}

/* ---------------- 시작 ---------------- */
async function init() {
  document.title = `${CONFIG.SITE_NAME} (MamaDog) – 아기랑, 강아지랑, 서울 나들이`;
  $("report").href = `mailto:${CONFIG.CONTACT_EMAIL}`;
  initMap();
  bindEvents();

  // file:// 로 직접 열면 브라우저가 fetch 를 막아요
  if (location.protocol === "file:") {
    $("list").innerHTML = "";
    $("count").textContent = "";
    $("message").innerHTML = '<div class="message error">파일을 직접 열면 데이터를 불러올 수 없어요.<br>' +
      '로컬 서버(예: <code>python3 -m http.server</code>)를 켜거나, Vercel·Netlify·GitHub Pages에 배포해서 확인해 주세요.</div>';
    return;
  }

  try {
    const data = await loadData();
    places = Array.isArray(data) ? data : (data.places || []);
    fillSelect("district", places.map((p) => p.district));
    fillSelect("category", places.map((p) => p.category));
    render();
  } catch (e) {
    $("list").innerHTML = "";
    $("count").textContent = "";
    $("message").innerHTML = '<div class="message error">데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</div>';
  }
}
init();
