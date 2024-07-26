function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

tl = gsap.timeline();

function loadingAnimation(){

  tl.from(".loader h3",{
    x:150,
    opacity:0,
    duration:0.7,
    delay:0.5,
  })
  tl.to(".loader h3",{
    x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
  })
  tl.to(".loader",{
    opacity:0,
    duration:2,
  })
  tl.to(".loader",{
    display:"none",
  })
  
}

function cursorAnimation(){
    let page1 = document.querySelector("#page1");
    // Ensure initial state of cursor
    
    page1.addEventListener("mousemove", function(dets){

        gsap.to(".crsr",{
          x: dets.clientX,
          y: dets.clientY,
          scale: 1,
          opacity: 1,
          // duration: 0.1,
          display: "flex",
        })
    })
    page1.addEventListener("mouseleave",()=>{
        gsap.to(".crsr",{
            display:"none",
            scale:0,
            opacity:0,
        })
})
}

function cursorAnimation1(){
    let bluediv = document.querySelector(".bluediv");
    // Ensure initial state of cursor
    
    bluediv.addEventListener("mousemove", function(dets){
        gsap.to(".crsr1",{
          x: dets.clientX -600,
          y: dets.clientY -400,
          scale: 1,
          opacity: 1,
          // duration: 0.1,
          display: "flex",
        })
    })
    bluediv.addEventListener("mouseleave",()=>{
        gsap.to(".crsr1",{
            display:"none",
            scale:0,
            opacity:0,
        })
})
}

function textAnimation(){

  tl.from(".page1-top h3",{
      opacity:0,
      stagger:0.2,
      duration:0.8,
      x:-50,
  })

tl.from("#page1 span",{
    y:350,
    opacity:0,
    stagger:0.1,
    duration:0.7,
    ease: "power2.out"   

})

gsap.from(".effect h3",{
  y:100,
  opacity:0,
  duration:0.5,
  stagger:0.2,
  scrollTrigger:{
    trigger:".effect h3",
    scroller:"#main",
    // markers:true,
    start:"top 90%",
  }
})
gsap.from(".effect1 h3",{
  y:100,
  opacity:0,
  duration:0.5,
  stagger:0.2,
  scrollTrigger:{
    trigger:".effect1 h3",
    scroller:"#main",
    // markers:true,
    start:"top 90%",

  }
})
gsap.from(".effect h1",{
  y:100,
  opacity:0,
  duration:0.5,
  stagger:0.2,
  scrollTrigger:{
    trigger:".effect h3",
    scroller:"#main",
    // markers:true,
    start:"top 0",
    
  }
})
gsap.from(".about h1",{
  y:100,
  opacity:0,
  duration:0.8,
  
  scrollTrigger:{
    trigger:".about h1",
    scroller:"#main",
    // markers:true,
    start:"top 110%",
    
  }
})
gsap.from(".footer-bottom-second h1 span",{
  y:-500,
  opacity:0,
  stagger:0.1,
  duration:0.7,
  ease: "power2.out",
  scrollTrigger:{
    trigger:'.footer-bottom-second h1 span',
    scroller:"#main",
    // markers:true,
    start:"top 15%",
    // scrub:5,
  }
})

}

function videoAnimation() {
  const videos = [
      { img: "#first-img", video: "#first-video" },
      { img: "#sec-img", video: "#sec-video" },
      { img: "#third-img", video: "#third-video" }
  ];

  videos.forEach((e) => {
      let imageElement = document.querySelector(e.img);
      let videoElement = document.querySelector(e.video);

      imageElement.addEventListener("mouseenter", () => {
          gsap.to(e.img, { opacity: 0, duration: 0.5 });
          videoElement.play();
      });

      imageElement.addEventListener("mouseleave", () => {
          gsap.to(e.img, { opacity: 1, duration: 0.5 });
          videoElement.pause();
      });
  });
}

function sliderAnimation(){

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
          },
      });
}

locomotiveAnimation();
loadingAnimation();
cursorAnimation();
cursorAnimation1();
videoAnimation();
textAnimation();
sliderAnimation();

gsap.to(".bluediv h1 span",{
  onStart:function (){
    let count=9;
    setInterval(() => {
      if(count>2){
        count--;
       document.querySelector(".bluediv h1 span").innerHTML=count;
      }else{
        count=2;
        document.querySelector(".bluediv h1 span").innerHTML=count;
      }
    }, 250);
  },
  scrollTrigger:{
    trigger:".bluediv h1 span",
    scroller:"#main",
    start:"top 90%",
  }
})
gsap.to(".page1-top-part1 h3",{
onstart:function(){
   let rejouice = document.querySelector(".page1-top-part1 h3");
   rejouice.textContent="rejouice";
   rejouice.style.fontFamily="rejoy";
},
})