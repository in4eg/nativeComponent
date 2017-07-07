var fadeHandleFirst, fadeHandleLast, fadeHandleSecound, fadeInElement, fadeOutElement;

fadeHandleFirst = function() {
  $('.fade-first').html('First CallBack');
};

fadeHandleSecound = function(arg) {
  $('.fade-secound').html($('#fade-example').css('opacity'));
};

fadeHandleLast = function() {
  $('.fade-last').html('Last CallBack');
};

fadeOutElement = function() {
  $('#fade-example').fadeOut(1500, fadeHandleFirst, fadeHandleSecound, fadeHandleLast);
};

fadeInElement = function() {
  $('#fade-example').fadeIn(1500, fadeHandleFirst, fadeHandleSecound, fadeHandleLast);
};

$('#fadeout').on("click", fadeOutElement);

$('#fadein').on("click", fadeInElement);

$('#slideup').on("click", function() {
  console.log('slideup');
});
