
/* Скрипт для того, чтобы скрыть (почту/другой портал),
КУДА отправляютя данные с формы. */
/* var gmailFirst = "govorov2001gv", gmailSecond = "gmail";
consultationForm.action = "mailto:" + gmailFirst + "@" + gmailSecond + ".com";
 */

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
	  autoHeight: false,
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



$(document).ready(function() {

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		
	/*       $( ".catalog__content_active#tabWithTwoItems").css("justify-content","flex-start" );
		if( $(".catalog__content_active#tabWithTwoItems").css("justify-content") == "flex-start" ) {
			$(".catalog-item").css("margin-right", "20px");
		}
		if( $(".catalog__content_active:not(#tabWithTwoItems)").css("justify-content") == "space-between" ) {
			$(".catalog-item").css("margin-right", "0px");
		} */
	});

	toggleSlide('.catalog-item__link_to-list');
	toggleSlide('.catalog-item__link_to-main');


	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn();
	})
	/*   $('[data-modal=call_me]').on('click', function() {
		$('#consultation, #order').fadeOut();
		$('.overlay, #thanks').fadeIn();
	}) */

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut();
	})

	$('[data-modal=order]').each(function(i) {
		$(this).on('click', function() {
			$('#oder, .modal__description').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		})
	})

	validateForms('#consultationForm');
	validateForms('#order form');
	validateForms('#consultation form');
 
	$('input[name=phone]').mask("+7 (999) 999-99-99");



	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__full-description').eq(i).toggleClass('catalog-item__full-description_active');
			})
		})
	}

	function validateForms(feedForm) {
		$(feedForm).validate( {
			rules: {
				name: "required",
				phone: "required",
				email: {
				required: true,
				email: true,
	  		}
		},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен адрес почты, пример: name@domain.com",
				}
			}
  		});
 	}

	 /* backend на php для отправки писем с форм. */
	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");

			$(".overlay, #thanks").fadeIn(),
			$('form').trigger('reset');
		});
		return false; 
	}); 
});