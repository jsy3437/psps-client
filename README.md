## Progress & Update

> 2022.03.09

-  FAQ페이지 : 자주 묻는 질문 리스트 조회 기능 추가
-  FAQ페이지 : 문의하기 버튼 클릭 시 회사 전화로 연결

---

> 2022.03.07

-  찾기페이지 : 비밀번호찾기 서버 요청 전 까지 기능 완성
-  찾기결과페이지 : 가입된 아이디가 없으면 회원가입버튼 아이디가 있으면 로그인 버튼이 나오게 구현완료
-  global : 가로 스크롤 제거완료
-  마이페이지 : 메뉴 클릭시 글자 높이 달라지는 부분 수정
-  로그인 페이지 : 자동로그인 없이 가기로, 간편로그인 임시로 안보이게
-  상품페이지 : 배너 글씨 그림자 추가, 배너 글씨 드래그 안되게
-  소개페이지 : 글씨 드래그 안되게
-  마이페이지 : 서버에 변경요청 보낼때 데이터 이름 변경된거 수정
-  상품페이지 : 상품 개수에 따라 페이지수 바뀌고 part나 subPart 변했을때 1페이지로 시작하게 수정완료

**원격저장소 병합, branch => main, develop, feature, hotfix, release**

> 2022.03.06

-  회원가입페이지 : step3 변경된 레이아웃, 스타일의 기능 수정
-  찾기페이지 : 아이디 찾기 기능완성, 비밀번호 찾기 기능 구현중

---

> 2022.03.05

-  회원가입페이지 : step3 레이아웃, 스타일 변경된거 수정

---

> 2022.03.04

-  취소,교환,반품페이지 : 서버응답처리 완료, pathname 변경
-  메인페이지 : 추천상품 호버시 스타일 변경
-  결제페이지 : styledComponent props 전달 시 생기는 에러 때문에 수정
-  상품페이지 : 서브카테고리 나눠지는 선 스타일 변경, 상품 호버시 스타일 변경
-  상품상세페이지 : 상품상세이미지 width 수정, OrderBox의 기존가 수량 참조 가격으로 나오게 수정
-  global : input요소들 focus 상태일때 border는 그대로 그림자만 적용완료
-  로그인페이지 : 자동 로그인 추가, 아이디/비밀번호 찾기 문구 수정
-  로그인페이지 : Footer 추가
-  회원가입페이지 : step1 error info 수정, step2 약관동의 text박스 스크롤 스타일 수정

---

> 2022.03.03

-  장바구니페이지 : 체크상태배열 데이터 구조 변경완료 (전체선택, 예상결제금액 등 구)체크상태배열 참조하는 로직 전부 수정)
-  결제페이지 : 바뀐 레이아웃, 스타일 수정완료
-  취소,교환,반품페이지 : 서버 요청 성공

---

> 2022.03.02

-  장바구니페이지 : 체크상태배열 데이터 구조 변경중

---

> 2022.03.01

-  Footer : 민원처리문구, 통신판매번호 추가

---

> 2022.02.28

-  마이페이지 : 주문상세보기에서 취소,교환,반품 사유입력 페이지로 넘어갈때 상품 상태 검사하고 넘기는거 수정

> 2022.02.27

-  마이페이지 : 주문상세보기에서 취소 바로 진행되던거 사유입력페이지 거치고 요청되게 수정
-  취소,교환,반품페이지 : 레이아웃, 스타일링 완료
-  취소,교환,반품페이지 : 서버 요청 전 기능까지 완료

---

> 2022.02.25

-  Navbar : 로그인,로그아웃 시 장바구니 갯수 즉시 반영되게 수정
-  메인페이지 : 추천 상품 이미지 호버 시 스케일 변경 스타일 OK
-  상품리스트페이지 : 상품 이미지 호버 시 스케일 변경 스타일 OK
-  메인페이지 : 추천 상품 설명 추가(가격)
-  상품리스트페이지 : 상품 설명 추가(가격)
-  장바구니페이지 : 레이아웃, 스타일링 변경된거 수정
-  상품상세페이지 : 페이지 들어오면 제일 상단으로 스크롤 되게 구현 OK
-  마이페이지 : 주문내역 레이아웃, 스타일링 변경된거 수정 OK
-  마이페이지 : 주문상세 레이아웃, 스타일링 변경된거 수정 OK
-  마이페이지 : 주문상세 레이아웃 맟춰서 기능 구현중 (체크기능 완성)

---

> 2022.02.24

-  장바구니페이지 : 데이터 나열 기준 개별 상품에서 공급원별 상품으로 변경
-  결제페이지 : 결제상품파트에 공급원 기준 택배비도 추가 후 결제할 때 서버 요청 데이터 로직 변경
-  장바구니페이지 : 장바구니에서 상품 삭제 후 넵바에 장바구니 갯수 즉시 반영되게 수정
-  회원가입페이지 : 이메일 입력 후 다음으로 버튼 누르면 이메일 중복확인하고 넘어가게 수정
-  회원가입페이지 : 전화번호 인증확인 인증번호 발송했을때만 활성화 되게 수정
-  상품상세페이지 : 주문하기 클릭시 결제페이지로 필요 데이터랑 같이 보내기 완료
-  마이페이지 : 주문 상세보기 취소 요청 구현 완료

---

> 2022.02.22

-  장바구니페이지 : 레이아웃, 스타일링 및 데이터 요소 변경으로 수정중

---

> 2022.02.21

-  마이페이지 : 주소 변경 모달 레이아웃, 스타일링 완료
-  마이페이지 : 주소 변경 요청, 응답처리 완료
-  마이페이지 : 연락처 변경 모달 레이아웃, 스타일링 완료
-  마이페이지 : 연락처 변경 요청만 완료 (본인인증번호 전송시 에러 알아보고 해결하기)
-  Navbar : 장바구니 상품 담기, 장바구니 상품 삭제시 Navbar 장바구니 갯수 바로 반영될 수 있게 리덕스 사용 연결 완료
-  상품상세페이지 : OrderBox 레이아웃, 스타일링 변경으로 수정 및 옵션 변경시 수량 1로 같이 변경되게 구현 OK
-  상품상세페이지 : 상품정보테이블 응답 데이터로 변경 완료
-  상품상세페이지 : controller 클릭시 해당 요소로 이동되게 구현 OK
-  장바구니페이지 : OrderBox 변경된 레이아웃, 스타일링 적용 OK

---

> 2022.02.20

-  품생품사란페이지 : 페이지 레이아웃, 스타일링 완료
-  Induce 컴포넌트 : 커서 포인터로 바꾸고 클릭시 product 페이지로 이동되게 수정
-  상품디테일페이지 : OrderBox의 상품옵션 기본값 옵션리스트[0]으로 참조 할 수 있게 수정
-  장바구니페이지 : 상품 체크박스 클릭시 OrderBox의 결제금액 변경되지 않아서 수정
-  마이페이지 : 상품 주문, 결제 후 페이지에서 주문내역보기 클릭시 해당 주문상세컴포넌트 띄워주기 완료
-  Footer : 브라우저랑 이용약관, 개인정보처리방침 모달 창 위치 안맞아서 수정
-  마이페이지 : OrderDetail 컴포넌트 하단부 레이아웃 수정
-  마이페이지 : 개인정보관리 레이아웃, 스타일링 완료
-  마이페이지 : 비밀번호 변경 요청 및 응답처리 완료

---

> 2022.02.18

-  메인페이지 : 메인 배너 자동,수동 슬라이드 구현완료
-  메인페이지 : 광고 배너 자동 슬라이드 구현완료

---

> 2022.02.17

-  Footer : 사업자등록증 공정거래위원회 주소 연결
-  마이페이지 : 주문내역 요청 및 응답 처리 완료
-  결제페이지 : 기본배송지로 저장 체크 구현 완료
-  상품페이지 : 상품 배너 part별로 다르게 구현 완료
-  마이페이지 : 주문내역상세 요청 및 응답 처리 완료
-  메인페이지 : 메인배너, 광고배너 서버에서 받아옴

> 2022.02.15

-  회원가입페이지 : step3 휴대폰, 인증번호 데이터 타입 및 길이 제한
-  Footer : 이용약관, 개인정보처리방침 모달 레이아웃, 스타일링
-  메인페이지 : 카테고리 레이아웃, 스타일링 및 주소연결
-  결제페이지 : 결제완료되면 결제완료페이지로 이동OK

---

> 2022.02.14

-  결제페이지 : psps 서버에서 현재 로그인 한 유저 정보 받고 UserData 컴포넌트에 전달
-  결제페이지 : 주문자 정보 가져와서 받는사람 input의 value로 채워줌
-  고객센터페이지 : 레이아웃, 스타일링 및 Navbar, Footer 버튼 주소연결
-  cursor: pointer로 변경 (로그인, 회원가입)
-  회원가입페이지 : 본인인증 서버로 요청, 응답 처리완료

---

> 2022.02.13

-  결제페이지 : ProductData, UserData 컴포넌트 레이아웃, 스타일링
-  Daum Postcode API 컴포넌트 레이아웃, 스타일링 및 데이터 받고 띄우는 로직 완성

---

> 2022.02.11

-  아임포트서버 결제 요청 후 응답데이터 psps서버로 넘기는 로직 OK
-  psps 서버에서 돌아온 응답 처리
-  결제 연동 테스트

---

> 2022.02.10

-  장바구니페이지 : OrderBox 컴포넌트 레이아웃, 스타일링
-  장바구니페이지 : DB데이터 받아와서 OrderBox 가격표 구현

---

> 2022.02.09

-  장바구니페이지 : cart_controller(서버 요청) 및 DB데이터 받아서 CartList의 상품리스트 구현

---

> 2022.02.08

-  장바구니페이지 : CartList 컴포넌트 레이아웃, 스타일링

---

> 2022.02.05

-  프론트 역할 분배
-  메인페이지 조서윤, 관리자페이지 방병도

---

> 2022.02.04

-  상품상세페이지 상세이미지, 상품정보

---

> 2022.02.03

-  추천상품 목록 조회
-  상품, 추천상품 이미지/제목 클릭 시 상세페이지로 이동
-  상세페이지 주문박스 컴포넌트 - 상세정보 조회
-  코드 리팩토링(가독성)

---

> 2022.02.02

-  상품목록 조회

---

> 2022.01.29

-  robots.txt 검색로봇 수집허용
-  Navbar 디자인 변경사항 수정

---

> 2021.12.27

-  결제연동 테스트

---

> 2021.12.26

-  마이페이지 주문내역 스타일링

---

> 2021.12.25

-  마이페이지 컴포넌트 분리
-  마이페이지 레이아웃

---

> 2021.12.24

-  FindInfoPage(아이디/비밀번호 찾기 페이지) 스타일링
-  FindIdResultPage(아이디 찾기 결과페이지) 스타일링
-  비밀번호 찾기는 인증 후 비밀번호 변경 페이지로 이동할 예정
-  PageSelector 컴포넌트 수정
-  수정내용 : 1페이지일때 왼쪽방향 비활성화, 마지막페이지일때 오른쪽방향 비활성화, 스타일 수정

---

> 2021.12.23

-  로그인페이지 스타일링 OK
-  로그인 기능, 로그인 유지기능 OK
-  회원가입 유저 인풋 데이터 유효성 검사 로직 작성

---

> 2021.12.22

-  Bold폰트 => Black폰트로 변경
-  회원가입 첫번째 페이지 항목 제목 누락된 것 수정

---

> 2021.12.17

-  회원가입 페이지 스텝1~스텝4 레이아웃, 스타일링
-  컴포넌트 파일 증가로 재분류, 정리

---

> 2021.12.16

-  상품 상세보기 페이지 주문 박스 컴포넌트 제작
-  상세보기 페이지 레이아웃, 스타일 완성

---

> 2021.12.15

-  메인페이지 스타일 일부 수정
-  상품 목록 페이지(카테고리) 페이지 스타일링
-  브랜드 스토리(품생품사란) 페이지 스타일링

---

> 2021.12.14

-  메인페이지 레이아웃, 스타일링
-  (네비게이션바, 메인배너, 서브배너, 추천상품, 쇼핑하러 가기, 푸터 컴포넌트 제작)

---

## Project name

-  품생품사 쇼핑몰 웹

## Period

-  2021.12.14 ~

## Member & Role

-  # 방병도(Front), 조서윤(Front), 최도영(Server, DataBase), 최준영(Design)

-  품생품사 쇼핑몰 웹

## Period

-  2021.12.14 ~

## Member & Role

-  방병도(Front), 조서윤(Front), 최도영(Server, DataBase), 최준영(Design)
