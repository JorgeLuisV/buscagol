(function(e){var t="click.scrolly";e.fn.scrolly=function(r,i){var s=e(this);return r||(r=1e3),i||(i=0),s.off(t).on(t,function(t){var n,s,o,u=e(this),a=u.attr("href");a.charAt(0)=="#"&&a.length>1&&(n=e(a)).length>0&&(s=n.offset().top,u.hasClass("scrolly-centered")?o=s-(e(window).height()-n.outerHeight())/2:(o=Math.max(s,0),i&&(typeof i=="function"?o-=i():o-=i)),t.preventDefault(),e("body,html").stop().animate({scrollTop:o},r,"swing"))}),s}})(jQuery);

'use strict'

var delay = 0

function removePreloader(){
	var preloader = $('.loader-cont'),
		navbar = $('.nav-bg'),
		footer = $('.foo-bg')

	preloader.addClass('animated fadeOut')
	setTimeout(function() {
		preloader.css('display', 'none')
		navbar.removeClass('d-none')
		navbar.addClass('animated zoomIn').css('animation-delay', '.25s')
		footer.removeClass('d-none')
		footer.addClass('animated slideInUp').css('animation-delay', '1s')
	},800)
}

function closeMenu(){
	$('.nav-bg').css('box-shadow', 'none')
	$('.nav-list li').each(function(){
  		$(this).removeClass('animated flipInX').addClass('animated flipOutX').css({'animation-delay': `${delay}s`, 'animation-duration': '.2s'})
  		delay = delay - 0.1
	})
	$('.nav-btn').css({'transition': 'all .8s', 'transform': 'scale(1)'})
	setTimeout(function() {
		$('.nav-bg').removeClass('nav-size')
	},800)
	$('a.nav-ibtn').removeClass('open')
}

$('a.nav-ibtn').on('click', function(){
	if( $(this).hasClass('open') ){
		closeMenu()
	} else {

		$('.nav-bg').addClass('nav-size')
		$('.nav-btn').css({'transition': 'all 1s', 'transform': 'scale(50)'})
		$('.nav-list li').each(function(){
			var ndelay = delay + 0.1
      		$(this).removeClass('animated flipOutX').addClass('animated flipInX').css({'animation-delay': `${ndelay}s`, 'animation-duration': '.5s'})
      		delay = ndelay
    	})
    	$('.nav-bg').css('box-shadow', '0 8px 17px 2px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)')
		$(this).addClass('open')

	}
})

$('.nav-list a').click(function(e){
	e.preventDefault()
	var href = $(this).attr('href')
  	if(href){
    	$('html, body').animate({
      		scrollTop: $(href).offset().top
    	}, 1000)
    	closeMenu()
  	} else {
    	window.location.href = './admin/login.php'
  	}
})

Waves.attach('.btn-wa')
Waves.init()

var wow = new WOW({
    mobile: false
})
wow.init()

function isInViewport(){
	var elemment = $('.footer-cont')

  	var elementTop = $(elemment).offset().top
  	var elementBottom = elementTop + $(elemment).outerHeight()

  	var viewportTop = $(window).scrollTop()
  	var viewportBottom = viewportTop + $(window).height()

  	return elementBottom > viewportTop && elementTop < viewportBottom;
}

$(window).on('resize scroll', function() {
	if(isInViewport()){
		if( !$('.cta-btns').hasClass('ouline') ){
			$('.cta-bg').css('background-color', 'transparent').removeClass('cta-shadow')
			$('.cta-btns > li > a').css({'color': '#FFF', 'font-weight': 'normal'})
			$('.cta-btns > li').addClass('cta-fborder')
			$('.cta-btns').addClass('ouline')
		}
	} else {
		if( $('.cta-btns').hasClass('ouline') ){
			$('.cta-bg').css('background-color', '#FFF').addClass('cta-shadow')
			$('.cta-btns > li > a').css({'color': '#424242', 'font-weight': 'bold'})
			$('.cta-btns > li').removeClass('cta-fborder')
			$('.cta-btns').removeClass('ouline')
		}
	}
})

$('.form-control').focus(function(){
	$(this).parent('.form-group').addClass('focused')
})

$('.form-control').focusout(function(){
	$(this).parent('.form-group').removeClass('focused')
})

function inputs_validity(inputs_form){
    return document.querySelector(inputs_form).checkValidity()
}

function sendEmail(){
	var gresponse = grecaptcha.getResponse(),
		form = $('#contact-form'),
		send_button = form.find('button[type="submit"]')

	send_button.prop('disabled', true)
	send_button.find('span').addClass('d-none')
	send_button.find('.wait').removeClass('d-none')

	if(gresponse.length > 0){
		$.post('./admin/controlador/contact.send.email.php', {
			p_formData: form.serialize(),
			p_gresponse: gresponse
        })
        .done(function(resultado){                  
          	var datosJSON = resultado

          	if (datosJSON.estado===200){
          		form[0].reset()
          		grecaptcha.reset()
          		send_button.find('span').text('¡Tu mensaje fué enviado!').removeClass('d-none')
				send_button.find('.wait').addClass('d-none')
          		send_button.addClass('success')

          		setInterval(function() {
          			send_button.find('span').text('Enviar')
          			send_button.removeClass('success')
          			send_button.prop('disabled', false)
  				},5000)
          	}
      	})
      	.fail(function(error){
        	var datosJSON = $.parseJSON( error.responseText )

        	grecaptcha.reset()
      		send_button.find('span').text('Ocurrió algo, inténtalo nuevamente').removeClass('d-none')
			send_button.find('.wait').addClass('d-none')
      		send_button.addClass('error')

      		setInterval(function() {
	  			send_button.find('span').text('Enviar')
	  			send_button.removeClass('error')
	  			send_button.prop('disabled', false)
			},5000)
      	})
	}
}

$('#contact-form').submit(function(event){
	event.preventDefault()
	var form = '#contact-form'

	if( inputs_validity(form)){
        grecaptcha.execute()
    }else{
        var $invalid_fieldset = $(form).find('.input:invalid')
        $($invalid_fieldset).focus()
    }
})

$(document).ready(function(){
	if($(window).width() <= 544){
	    $('.cta-btns > li:nth-child(2)').find('span').text('Escríbenos')
	    $('.cta-btns > li:nth-child(3)').find('span').text('Descargar')
	} else {
		$('.cta-btns > li:nth-child(2)').find('span').text('Comunícate con nosotros')
	    $('.cta-btns > li:nth-child(3)').find('span').text('Descargar para Android')
	}
	removePreloader()
	$('.footer-copy').find('span').html(new Date().getFullYear())
})