# 마마독 (MamaDog)

아기랑, 강아지랑, 서울 나들이 — 빌드 없이 그대로 배포되는 정적 사이트입니다.

## 배포
폴더 전체를 Vercel / Netlify / GitHub Pages에 올리면 끝입니다 (설정 불필요).

## 로컬에서 보기
`file://`로 열면 데이터를 못 불러옵니다. 폴더에서 `python3 -m http.server` 실행 후 http://localhost:8000 접속.

## 나중에 바꿀 것
- `app.js` 맨 위 `CONFIG`: `CONTACT_EMAIL`(제보 메일), `KAKAO_JS_KEY`(카카오맵 전환 시)
- `index.html`의 `mailto:hello@example.com` (JS가 CONFIG 값으로 덮어쓰지만 함께 바꿔 두면 좋아요)
- 데이터: `data/places.json` (없으면 `data/places.sample.json` 사용)
- 브랜딩: `assets/brand.css`, `logo.svg`, `favicon.svg`, `og-image.svg`
