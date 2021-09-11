/* Скрипт для того, чтобы скрыть (почту/другой портал),
КУДА отправляютя данные с формы. */
var gmailFirst = "govorov2001gv", gmailSecond = "gmail";
myForm.action = "mailto:" + gmailFirst + "@" + gmailSecond + ".com";


/* 
$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 900,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-solid.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right-solid.svg"></button>',
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: true,
            arrows: false
          }
        }
      ]      
    });
  }); */

const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 1,
  speed: 1000,
  autoplay: true,
  autoplayTimeout: 3500,
  autoplayButtonOutput: false,
  autoHeight: false,
  controls: false,
  nav: true,
  navPosition: "bottom",
  mouseDrag: false,
  responsive: {
    992: {
      mouseDrag: true,
      autoHeight: true,
      nav: false,
      touch: false
    }
  }
});

document.querySelector('.carousel__prev').addEventListener('click',function () {
  slider.goTo('prev');
});

document.querySelector('.carousel__next').addEventListener('click',function () {
  slider.goTo('next');
});