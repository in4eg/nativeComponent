var eq;

eq = function(index) {};
;var methods;

methods = {};

methods.eq = function(index) {
  return $(this[index]);
};

methods.first = function() {
  return $(this[0]);
};

methods.last = function() {
  return $(this[$(this).length - 1]);
};
;var $;

$ = function(selector, context) {
  var choosenElements, method, res, result;
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
    res = [].slice.call(choosenElements);
  } else {
    res = [choosenElements];
  }
  for (method in methods) {
    res[method] = methods[method].bind(res);
  }
  return res;
};

console.log($('.section').last());
;
