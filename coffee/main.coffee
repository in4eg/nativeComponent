fadeHandleFirst = ->
	$('.fade-first').html('First CallBack')
	return

fadeHandleSecound = (arg)->
	$('.fade-secound').html($('#fade-example').css('opacity'))
	return

fadeHandleLast = ->
	$('.fade-last').html('Last CallBack')
	return


slideHandleFirst = ->
	$('.slide-first').html('First CallBack')
	return

slideHandleSecound = (height)->
	$('.slide-secound').html($('#slide-example').height())
	return

slideHandleLast = ->
	$('.slide-last').html('Last CallBack')
	return

fadeOutElement = ->
	$('#fade-example').fadeOut(250, fadeHandleFirst, fadeHandleSecound, fadeHandleLast)
	return

fadeInElement = ->
	$('#fade-example').fadeIn(250, fadeHandleFirst, fadeHandleSecound, fadeHandleLast)
	return

$('#fadeout').on "click", fadeOutElement
$('#fadein').on "click", fadeInElement

$('#slideup').on "click", ->
	$('#slide-example').slideUp(150, slideHandleFirst, slideHandleSecound, slideHandleLast)
	return

$('#slidedown').on "click", ->
	$('#slide-example').slideDown(150, slideHandleFirst, slideHandleSecound, slideHandleLast)
	return

$('#slidetoggle').on "click", ->
	$('#slide-example').slideToggle(150, slideHandleFirst, slideHandleSecound, slideHandleLast)
	return