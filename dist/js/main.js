var fadeHandleFirst, fadeHandleLast, fadeHandleSecound, fadeInElement, fadeOutElement, slideHandleFirst, slideHandleLast, slideHandleSecound;

fadeHandleFirst = function() {
  $('.fade-first').html('First CallBack');
};

fadeHandleSecound = function(arg) {
  $('.fade-secound').html($('#fade-example').css('opacity'));
};

fadeHandleLast = function() {
  $('.fade-last').html('Last CallBack');
};

slideHandleFirst = function() {
  $('.slide-first').html('First CallBack');
};

slideHandleSecound = function(height) {
  $('.slide-secound').html($('#slide-example').height());
};

slideHandleLast = function() {
  $('.slide-last').html('Last CallBack');
};

fadeOutElement = function() {
  $('#fade-example').fadeOut(250, fadeHandleFirst, fadeHandleSecound, fadeHandleLast);
};

fadeInElement = function() {
  $('#fade-example').fadeIn(250, fadeHandleFirst, fadeHandleSecound, fadeHandleLast);
};

$('#fadeout').on("click", fadeOutElement);

$('#fadein').on("click", fadeInElement);

$('#slideup').on("click", function() {
  $('#slide-example').slideUp(150, slideHandleFirst, slideHandleSecound, slideHandleLast);
});

$('#slidedown').on("click", function() {
  $('#slide-example').slideDown(150, slideHandleFirst, slideHandleSecound, slideHandleLast);
});

$('#slidetoggle').on("click", function() {
  $('#slide-example').slideToggle(150, slideHandleFirst, slideHandleSecound, slideHandleLast);
});
