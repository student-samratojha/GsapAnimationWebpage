function cursoranimation() {
  document.addEventListener("mouseenter", () => {
    setInterval(() => {
      document.querySelector(
        "#cursor"
      ).style.backgroundColor = `${getMyColor()}`;

      document.querySelector(".bodr").style.backgroundColor = `${getMyColor()}`;
    }, 1000);
    gsap.to("#cursor", {
      scale: "1",
    });
  });
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      scale: "1",
      x: dets.x - 4,
      y: dets.y + 6,
    });
  });
  document.addEventListener("mouseleave", () => {
    gsap.to("#cursor", {
      scale: "0",
    });
  });
  const getMyColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };
  document.querySelector("nav").addEventListener("mouseenter", function () {
    gsap.to("#cursor", {
      width: "80px",
      height: "80px",
      duration: 0.5,
    });
  });
  document.querySelector("nav").addEventListener("mouseleave", function () {
    gsap.to("#cursor", {
      width: "50px",
      height: "50px",
      duration: 0.5,
    });
  });
}
cursoranimation();

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function page1gsapanimation() {
  document.querySelector(".fronter").addEventListener("mouseenter", (dets) => {
    gsap.to("#cursor", {
      scale: "1",
      x: dets.x - 22,
      y: dets.y - 11,
    });
    document.querySelector("#cursor").innerHTML = "play";
    document.querySelector("#cursor").addEventListener("click", () => {
      setTimeout(() => {
        window.open("vide.mp4");
      }, 500);
    });
  });
  document.querySelector(".fronter").addEventListener("mousemove", () => {
    document.querySelector("#cursor").innerHTML = "play";
  });
  document.querySelector(".fronter").addEventListener("mouseleave", () => {
    document.querySelector("#cursor").innerHTML = "";
  });
  let tl = gsap.timeline();
  tl.from("nav a", {
    y: -40,
    duration: 0.7,
    delay: 0.7,
    opacity: 0,
    stagger: 0.15,
  });
  gsap.to(
    ".centerImage",
    {
      scale: "1",
      opacity: 1,
      delay: 0.6,
      bottom: "1%",
      right: "0%",
      duration: 5,
      scrollTrigger: {
        trigger: ".page1",
        scroller: ".main",
        start: "top 0%",
        scrub: 2,
        // pin:true,
      },
    },
    "bb"
  );

  gsap.to(
    "#hed",
    {
      top: "0",
      left: "1vw",
      duration: 7,
      delay: 2,
      scrollTrigger: {
        trigger: ".page1",
        scroller: ".main",
        start: "top 0%",
        // pin: true,
        scrub: 2,
      },
    },
    "bb"
  );
  gsap.to(
    ".fronter",
    {
      top: "-110%",
      // scale: ".3",
      // opacity: 0,
      duration: 3,
      // delay: 2,
      ease: "none",
      scrollTrigger: {
        trigger: ".page1",
        scroller: ".main",
        start: "top 0%",
        pin: true,
        scrub: 2,
      },
    },
    "tt"
  );
  gsap.to("nav", {
    borderRadius: "111px",
    width: "90%",
    left: "5%",
    borderTop: "2px solid #fff",
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      start: "top 33%",
      scrub: 5,
    },
  });
  tl.from(".fronter", {
    top: "-100%",
    // left: "-100%",
    duration: 2,
    scale: 0,
    delay: 0.6,
  });
}
page1gsapanimation();

function page2gsapanimation() {
  gsap.from(".writtenSpan span,.writtenSpan a", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    // delay: 1,
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 5%",
      // pin: true,
      stagger: 0.2,
      scrub: 1,
    },
  });
  gsap.to(".writtenSpan .bodr", {
    width: "100%",
    duration: 0.6,
    // delay: 1,
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 0%",
      // pin: true,
      stagger: 0.2,
      scrub: 2,
    },
  });

  gsap.from(".slideBarCon", {
    transform: "translateX(-240%)",
    delay: 1,
    opacity: 0.5,
    duration: 5,
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 0",
      pin: true,
      stagger: 0.2,
      scrub: 2,
    },
  });
}
page2gsapanimation();

function page3gsapanimation() {
  gsap.to(".page3 video", {
    animation: "zoom 300s infinite alternate",
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top 1%",
      scrub: 2,
      // pin: true,
    },
  });
  gsap.from(".line", {
    y: 100,
    opacity: 0,
    stagger: 1.5,
    delay: 0.8,
    duration: 1.5,
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top 1%",
      // scrub: 2,
      pin: true,
    },
  });
  const getMyColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };
  setInterval(() => {
    Array.from(document.querySelectorAll(".line span")).forEach((e) => {
      e.style.textShadow = `0 0 14px ${getMyColor()}`;
    });
  }, 500);
  const hoverTexts = document.querySelectorAll(".line");
  const hoverImages = document.querySelectorAll(".hoverimg");

  hoverTexts.forEach((el, index) => {
    const imageContainer = hoverImages[index],
      setX = gsap.quickSetter(imageContainer, "x", "px"),
      setY = gsap.quickSetter(imageContainer, "y", "px"),
      align = (e) => {
        setX(e.clientX + 124);
        setY(e.clientY - 204);
      },
      startFollow = () => document.addEventListener("mousemove", align),
      stopFollow = () => document.removeEventListener("mousemove", align),
      fade = gsap.to(imageContainer, {
        autoAlpha: 1, // Controls both opacity and visibility of the div
        duration: 0.6,
        scale: 1,
        ease: "power1.out",
        paused: true,
        onReverseComplete: stopFollow,
      });
    el.addEventListener("mouseenter", (e) => {
      // Set visibility and start the fade-in animation for the hover-image div
      fade.play(); // Play the fade animation
      startFollow(); // Start following the mouse
      align(e); // Immediately position it under the cursor

      el.style.opacity = "1";
    });

    el.addEventListener("mouseleave", () => {
      fade.reverse();
    });
  });

  Array.from(document.querySelectorAll(".line")).forEach((e) => {
    e.addEventListener("mouseenter", function () {
      document.querySelector("#cursor").style.display = "none";
    });
    e.addEventListener("mouseleave", function () {
      document.querySelector("#cursor").style.display = "block";
    });
    e.addEventListener("click", () => {
      console.log("ram ram");
    });
  });
}
page3gsapanimation();

function page4gsapanimation() {
  gsap.from(".vid", {
    scale: 0,
    delay: 1.5,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top -15%",
      end: "top 34%",
      scrub: 4,
      // pin: true,
    },
  });
  gsap.from(".secon", {
    scale: 0,
    opacity: 0,
    delay: 1.5,
    duration: 3,
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top -15%",
      end: "top 34%",
      scrub: 4,
      // pin: true,
    },
  });
  gsap.from(".vid span", {
    scale: 0,
    opacity: 0,
    duration: 2,
    delay: 0.7,
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top -33%",
      scrub: 2,
      // pin: true,
    },
  });
  gsap.to(".sec", {
    opacity: 0.5,
    duration: 1,
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top 0%",
      scrub: 2,
      pin: true,
    },
  });
}
page4gsapanimation();
