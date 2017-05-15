var methods;

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

methods.attr = function(attrName, value) {
  if (typeof attrName !== "string") {
    console.warn('attribute selector is not a string');
  } else if (typeof value === "undefined") {
    if (this[0].getAttribute(attrName) === null) {
      return false;
    } else {
      return this[0].getAttribute(attrName);
    }
  } else if (typeof value !== "string") {
    console.warn('attribute value is not a string');
  } else {
    $.utils.traverse(this, function(node) {
      return node.setAttribute(attrName, value);
    });
  }
  return this;
};

methods.removeAttr = function(attrName) {
  $.utils.traverse(this, function(node) {
    return node.removeAttribute(attrName);
  });
  return this;
};

methods.apendTo = function(block) {
  $.utils.traverse(this, function(node) {
    var div;
    if (typeof block === "object") {
      div = block[0];
    } else if (typeof block === "string") {
      div = document.querySelectorAll(block)[0];
    }
    return div.appendChild(node);
  });
  return this;
};

methods.apendTo = function(block) {
  $.utils.traverse(this, function(node) {
    var div;
    if (typeof block === "object") {
      div = block[0];
    } else if (typeof block === "string") {
      div = document.querySelectorAll(block)[0];
    }
    return div.appendChild(node);
  });
  return this;
};

methods.prepend = function(elem) {
  var div;
  if (typeof elem === "object") {
    div = elem[0];
  } else if (typeof elem === "string") {
    div = document.querySelectorAll(elem)[0];
  }
  this[0].prepend(div);
  return this;
};

methods.insertAfter = function(elem) {
  var newElement, parentElement, theFirstChild;
  newElement = this[0];
  if (typeof elem === "object") {
    parentElement = elem[0];
  } else if (typeof elem === "string") {
    parentElement = document.querySelectorAll(elem)[0];
  }
  theFirstChild = parentElement.firstChild;
  parentElement.insertBefore(newElement, theFirstChild);
  return this;
};

methods.insertBefore = function(elem) {
  var elementBefore, newElement, parentElement;
  newElement = this[0];
  if (typeof elem === "object") {
    elementBefore = elem[0];
  } else if (typeof elem === "string") {
    elementBefore = document.querySelectorAll(elem)[0];
  }
  parentElement = elementBefore.parentNode;
  parentElement.insertBefore(newElement, elementBefore);
  return this;
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

$.utils = {
  traverse: function(selection, callback) {
    var i, j, len, node;
    for (i = j = 0, len = selection.length; j < len; i = ++j) {
      node = selection[i];
      callback(node, i);
    }
    return selection;
  }
};

console.log($('section'));
;
