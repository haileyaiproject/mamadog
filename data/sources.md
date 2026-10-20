# places.json 출처 목록

작성 기준일: 2026-10-20

## 공식 출처 (직접 확인)
- 국립중앙박물관 편의시설·운영시간: https://www.museum.go.kr
- 서울시설공단 서울어린이대공원 시설 안내: https://sisul.or.kr/open_content/childrenpark/introduce/facility.jsp
- 현대백화점 반려동물 입장 안내 (더현대서울 포함): https://www.ehyundai.com/mobile/newPortal/cs/pet01.do
- 한강공원 보전 및 이용에 관한 기본 조례 (반려견 목줄·배설물 규정): https://hangang.seoul.go.kr/www/contents/646.do?mid=427
- 서울시 반려견 놀이터 안내 (기사 기준, 북서울꿈의숲·보라매공원 등): https://mediahub.seoul.go.kr/archives/2007192 , https://mediahub.seoul.go.kr/archives/945317
- 서울어린이대공원 반려견 놀이터 (2013년 기사, 현행 여부 미확인): https://mediahub.seoul.go.kr/archives/168152

## 시설 정보 (제3자 관광·육아 정보 페이지, 공식 페이지 접근 불가 시 사용)
- 맘맘(mom-mom.net) 장소 페이지: 각 장소의 sourceUrl 참조 (서울숲, 북서울꿈의숲, 뚝섬한강공원, 용산가족공원, 올림픽공원, 서서울호수공원, 창경궁, 서울역사박물관, 서울도서관, 국립어린이과학관, 국립민속박물관 어린이박물관, 서울시립 사진미술관, 서울생활사박물관, 서울교육박물관, 서울기록원, 서울아트책보고, 롯데월드몰(아크앤북), 코엑스아쿠아리움, 롯데몰 김포공항, 영풍문고 IFC몰, 잠실야구장, 타요키즈카페 보라매, 서울형키즈카페 대방동)
- 더현대서울 시설: 맘맘 레고LCS더현대서울 페이지 (https://mom-mom.net/travel/places/68a6b1eeabc6bae6ac20cd67), 디즈니스토어 더현대 페이지 (https://mom-mom.net/travel/places/654302646702b6172b91452a)
- 서울역사박물관 등 공식 홈페이지 상충 정보는 각 장소의 note와 hours에 표기함

## 확인 실패·제외 사항
- 서울교통공사 수유실 CSV (data.go.kr/data/15044264): 프록시 정책으로 접근 차단. 지하철역 항목은 포함하지 않음.
- 서울숲, 보라매공원 등 공식 홈페이지: 로봇 차단 또는 서버 오류로 접근 불가.
- 경복궁: 수유실·유모차 정보를 확인하지 못해 제외.
- 월드컵공원: 유아숲체험원(맘맘 페이지)은 수유실·유모차 없음, 반려동물 불가로 확인. 공원 전체 시설은 확인하지 못해 제외.
- 여의도한강공원, 반포한강공원, 잠실한강공원: 시설 정보를 확인하지 못해 제외.
- 서울 외 지역(파주 롯데프리미엄아울렛, 인천대공원, 월미공원, 부여, 나주, 울진, 김포 한강중앙공원)은 제외.

## 데이터 설계 메모
- 확인되지 않은 시설 항목은 false 대신 null로 기록 (잘못된 "없음" 표기 방지).
- 반려견 정책 정보가 없는 장소는 allowed "partial", confidence "low", note "방문 전 확인 필요"로 기록.
- allowed true는 근거가 있는 2곳(서울숲, 뚝섬한강공원)만 기록.

## 2차 확장 (2026-10-20 추가분, 한강공원·반려견 놀이터·백화점·카페)

### 공식 출처 (직접 확인)
- 서울시 한강공원 보전 및 이용에 관한 기본 조례 제17조 (배설물 수거·줄 착용, 과태료): https://hangang.seoul.go.kr/www/contents/646.do?mid=427
- 한강공원 편의시설·이용 수칙 (잠실·난지 등): https://hangang.seoul.go.kr/www/contents/651.do?mid=444 , https://hangang.seoul.go.kr/www/contents/672.do?mid=505
- 롯데백화점 반려동물 동반 정책 및 펫모차 대여 지점: https://www.lotteshopping.com/cscenter/pet
- 현대백화점 반려동물 입장 안내 (현대 공통 정책, 무역센터·압구정·목동 적용): https://www.ehyundai.com/mobile/newPortal/cs/pet01.do
- 서울시 미디어허브 - 반려견 놀이터·반려견 캠핑장 안내 (월드컵공원, 보라매공원, 매헌시민의숲, 노을공원 캠핑장): https://mediahub.seoul.go.kr/archives/2012477
- 서울시 미디어허브 - 매헌시민의숲 반려견 놀이터 개장 (2023): https://mediahub.seoul.go.kr/archives/2008195
- 서울시 미디어허브 - 마포 반려동물 캠핑장 (난지한강공원 내, 예약·이용 조건): https://mediahub.seoul.go.kr/archives/2014951
- 서울시 미디어허브 - 여의도 한강공원 반려인·반려견 임시쉼터 (2023 시범운영): https://mediahub.seoul.go.kr/archives/2007205

### 제3자 정보 (기사·블로그·육아 정보 페이지)
- 보라매공원 반려견 놀이터 (2017년 기사, 운영 시간·조건 현행 여부 미확인): https://mediahub.seoul.go.kr/archives/1065186
- 맘맘 노을공원 (월드컵공원 내 수유실·기저귀교환대 인근 안내): https://mom-mom.net/travel/places/62cd165a2718fee95297d35a
- 맘맘 신세계 스누피플레이스 강남점: https://mom-mom.net/travel/places/672877c98fecbb765e143116
- 맘맘 롯데갤러리 아트홀 잠실점 에비뉴엘 (수유실·기저귀교환대·유모차 대여): https://mom-mom.net/travel/places/6563edc1467df1e41ea53ad3
- 맘맘 현대백화점 무역센터점 매장 페이지 (어굽당, 온드린: 수유실·기저귀교환대 웹 게시 정보): https://mom-mom.net/travel/places/69b3948d09fbb11855c0e658 , https://mom-mom.net/travel/places/69b3948f09fbb11855c0e65e
- 맘맘 현대백화점 압구정본점 매장 페이지 (르베즐리: 유모차 대여 없음): https://mom-mom.net/travel/places/69b0f6aceb129a120a65bff6 (르베즐리), https://mom-mom.net/travel/places/69b0f6b2eb129a120a65c002 (본가스시)
- 맘맘 현대백화점 목동점 매장 페이지 (정보 불충분): https://mom-mom.net/travel/places/69b0f6b4c9d127790b69adf7
- 서당개2년로스터스 연남 (여행 블로그, 반려동물 동반 가능·음료 할인): https://www.trvlogue.com/ko/seodanggae-yeonnam-cafe-late-night

### 확인 실패·제외 사항 (2026-10-20 확장 작업)
- 한강공원 중 반포·잠실·망원·이촌·잠원·광나루·양화·강서: 공원별 수유실·기저귀교환대 정보를 찾지 못해 null 처리. 좌표는 대략치이며 강서한강공원 좌표는 특히 부정확할 수 있음.
- 서울교통공사 수유실 지하철역 목록: data.seoul.go.kr 데이터셋 페이지(OA-22721, OA-15994)에 역 목록이 없어 지하철 항목 미추가. "서울시 교통공사 지하철역 편의시설위치정보 수유실 현황" 별도 데이터셋 원본 확인 필요.
- 애견동반 카페(기저귀교환대·아기의자 언급): 검색으로 찾은 후보 대부분이 서울 외 지역(화성, 김제, 고양 일산, 하동)이거나 반려견 동반 정보 없음. 서울 내 충족 사례를 확보하지 못함.
- 스타필드 코엑스몰, IFC몰, 타임스퀘어, 롯데 본점 수유실 위치: 신뢰할 만한 반려동물 정책·수유실 정보를 찾지 못해 제외 또는 null.
- 서울창포원: 반려견 동반 정보를 찾지 못해 제외.
- 맘맘 한강신도시 호수공원(url 681c62b3377d663a9cfc4c65): 김포 소재로 서울 항목에서 제외.
- 키즈카페(서울형키즈카페 상도3동점, 역삼1동점): 수유실·기저귀교환대는 있으나 반려견 정보 없음. 반려견 필터 대상이 아니어서 제외.
