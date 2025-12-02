const tabs = document.querySelectorAll(".tablist .tab"); //모든 탭 버튼(스파이더샵, 형지샵)
const cards = document.querySelectorAll(".grid-boxs > a > li"); //모든 상품 카드(li)

//(1) 탭 상태 바꾸기
function applyFilter(target) {
  /* target 은 “지금 클릭한 탭의 이름(spider, hyungji)”이에요.
           이 함수는 “그 탭에 맞게 화면을 바꿔주는 역할”을 합니다.*/
  tabs.forEach((tab) => {
    //탭메뉴들을 하나씩 돌리면서
    const active = tab.dataset.filter === target;
    //HTML에 있는 data-filter= 값을 가져와서 클릭된 탭과 이름이 같은지 확인 (true/false)
    tab.classList.toggle("active", active);
    //같으면 .active 클래스 붙이고, 다르면 떼기
    tab.setAttribute("aria-selected", String(active));
    //접근성용: 선택 여부(true/false)를 표시
  });

  //(2) 카드 필터링
  cards.forEach((card) => {
    //상품 카드를 하나씩 돌면서
    const match = card.dataset.shop === target;
    //각 카드의 소속(shop) 값을 가져와서 (data-shop=) 클릭된 탭의 이름과 같은지 확인
    card.classList.toggle("is-hidden", !match);
    //같지 않으면(is-hidden = true) 숨기기
  });
}

//(3)초기상태 세팅: 첫 탭 활성화
const initial =
  document.querySelector(".tab.active")?.dataset.filter || "spider";
applyFilter(initial);

// 클릭 이벤트
tabs.forEach(
  (tab) => tab.addEventListener("click", () => applyFilter(tab.dataset.filter))
  //버튼 클릭을 감지 - 클릭한 버튼의 data-filter 값 읽기 (spider/hyungji) - 클릭된 탭 이름을 전달해서 화면 변경 실행
);

const btn = document.querySelector(".hamburger");
const nav = document.querySelector(".gnb");

btn.addEventListener("click", () => {
  const open = !nav.classList.contains("active");
  nav.classList.toggle("active", open);
  btn.classList.toggle("active", open);
  btn.setAttribute("aria-expanded", open);
  btn.setAttribute("aria-label", open ? "hidden" : "");
});

//햄버거 메뉴 오픈/클로즈
