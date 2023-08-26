const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

// Calculate the intensity of the parallax effect based on screen width
const getParallaxIntensity = () => {
   const screenWidth = window.innerWidth;
   return screenWidth < 725 ? 1.2 : 1; // Adjust the value as needed
 };
 
 // Handle both mousemove and touchmove events
 const handleParallax = (x, y) => {
   xValue = (x - window.innerWidth / 2) * getParallaxIntensity();
   yValue = (y - window.innerHeight / 2) * getParallaxIntensity();
 
   parallax_el.forEach((el) => {
     let speedx = el.dataset.speedx;
     let speedy = el.dataset.speedy;
 
     el.style.transform = `translateX(calc( 0% + ${-xValue * speedx}px)) translateY(calc(0% + ${yValue * speedy}px))`;
   });
 };
 
 // Mousemove event for desktop
 window.addEventListener("mousemove", (e) => {
   handleParallax(e.clientX, e.clientY);
 });
 
 // Touchmove event for mobile
 window.addEventListener("touchmove", (e) => {
   const touch = e.touches[0];
   handleParallax(touch.clientX, touch.clientY);
 });

 if(window.innerwidth >= 725) {
    main.style.maxHeight = `${window.innerwidth * 0.6}px`;
 }else {
    main.style.maxHeight = `${window.innerwidth * 1.6}px`;
 }

 let timeline = gsap.timeline();

 timeline.from(".text h2", {
    y: -450,
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

// Select the elements to animate
const animatedElements = document.querySelectorAll("[data-animated='false']");

// Set up the Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Trigger animation when 50% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      target.setAttribute("data-animated", "true"); // Mark as animated

      // Add GSAP animation to reveal from the bottom
      gsap.fromTo(
        target,
        { y: "100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );

      // Stop observing the element once it's animated
      observer.unobserve(target);
    }
  });
}, observerOptions);

// Start observing each animated element
animatedElements.forEach((element) => {
  observer.observe(element);
});

