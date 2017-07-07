fadeHandleFirst = ->
	$('.fade-first').html('First CallBack')
	return

fadeHandleSecound = (arg)->
	$('.fade-secound').html($('#fade-example').css('opacity'))
	return

fadeHandleLast = ->
	$('.fade-last').html('Last CallBack')
	return

fadeOutElement = ->
	$('#fade-example').fadeOut(1500, fadeHandleFirst, fadeHandleSecound, fadeHandleLast)
	return

fadeInElement = ->
	$('#fade-example').fadeIn(1500, fadeHandleFirst, fadeHandleSecound, fadeHandleLast)
	return

$('#fadeout').on "click", fadeOutElement
$('#fadein').on "click", fadeInElement

$('#slideup').on "click", ->
	console.log 'slideup'
	return
# $('#slidedown').on "click", fadeInElement
# $('#slidetoggle').on "click", fadeInElement

