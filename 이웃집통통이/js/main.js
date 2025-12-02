const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

$(function () {
  const $slides = $(".slides");
  const $slide = $(".slide");
  const $slideCount = $slide.length;
  const duration = 800;
  let currentIndex = 0;

  const $firstClone = $slide.first().clone(); //재료준비
  $slides.append($firstClone);

  function goToSlide(index, withTransition = true) {
    //틀을 만들어놓는 거임
    if (withTransition) {
      $slides.css("transition", "transform 0.8s ease-in-out");
    } else {
      $slides.css("transition", "none");
    }

    const x = -index * 100;
    $slides.css("transform", `translateX(${x}%)`);
  }

  function nextSlide() {
    currentIndex++;
    goToSlide(currentIndex, true);

    if (currentIndex === $slideCount) {
      setTimeout(function () {
        currentIndex = 0;
        goToSlide(currentIndex, false);
      }, duration);
    }
  }

  // 이전 슬라이드로 이동
  function prevSlide() {
    if (currentIndex === 0) {
      // 맨 처음에서 "이전" 누르면 → 마지막 원본 슬라이드로 점프
      currentIndex = $slideCount - 1;
      goToSlide(currentIndex, false); // 점프 (애니메이션 없이)
    } else {
      currentIndex--; // 인덱스 -1
      goToSlide(currentIndex, true); // 한 칸 뒤로 애니메이션 이동
    }
  }

  let timer = setInterval(nextSlide, 3000);

  // 버튼 클릭 이벤트 연결
  $(".slide-btn.next").on("click", function (e) {
    e.preventDefault(); // 클릭 시 기본 동작 방지
    clearInterval(timer); // 자동 슬라이드 멈춤
    nextSlide(); // 다음 슬라이드로 이동
  });

  $(".slide-btn.prev").on("click", function (e) {
    e.preventDefault();
    clearInterval(timer);
    prevSlide(); // 이전 슬라이드로 이동
  });
});

const btn = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

btn.addEventListener("click", () => {
  const open = !nav.classList.contains("active");
  nav.classList.toggle("active", open);
  btn.classList.toggle("active", open);
  btn.setAttribute("aria-expanded", open);
  btn.setAttribute("aria-label", open ? "hidden" : "");
});
