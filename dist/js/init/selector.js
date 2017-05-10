var $;

$ = function(selector, context) {
  var choosenElements, result;
  if (typeof context !== "undefined") {
    return [].slice.call(context.querySelectorAll(selector));
  } else {
    context = document;
  }
  if (typeof selector === "string") {
    selector = selector.trim();
    result = selector.match(/(#|\.|\s|\>)(.*?)(#|\.|\s|\>)/igm);
    if (result) {
      choosenElements = context.querySelectorAll(selector);
    } else {
      if (selector.substr(0, 1) === '.') {
        selector = selector.substring(1);
        choosenElements = context.getElementsByClassName(selector);
      } else if (selector.substr(0, 1) === '#') {
        selector = selector.substring(1);
        choosenElements = context.getElementById(selector);
      } else {
        choosenElements = context.getElementsByTagName(selector);
      }
    }
  } else {
    choosenElements = selector;
  }
  if (!choosenElements) {
    return [];
  }
  if (choosenElements.length && choosenElements.length > 0) {
    return [].slice.call(choosenElements);
  } else {
    return [choosenElements];
  }
};

$('div', $('#dropdown')[0]);
