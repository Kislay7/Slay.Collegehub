const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0,
 yValue = 0 ;

 window.addEventListener("mousemove",(e)=> {
xValue = e.clientX - window.innerWidth / 2;
yValue = e.clientY - window.innerHeight / 2;
parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;

    el.style.transform= `translateX(calc( 0% + ${-xValue * speedx
    }px)) translateY(calc(0% + ${yValue * speedy}px))`;
});
 });

 if(window.innerwidth >= 725) {
    main.style.maxHeight = `${window.innerwidth * 0.6}px`;
 }else {
    main.style.maxHeight = `${window.innerwidth * 1.6}px`;
 }

 let timeline = gsap.timeline();

 timeline.from(".text h2", {
    y: -150,
    opacity: 0,
    duration: 1,
 },
 "0.3"
 )
 .from(".hide", {
    opacity: 0,
    duration: 1.5,
 },
 "0.6");
