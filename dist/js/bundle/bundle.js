var lerp, methods;

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

methods.appendTo = function(block) {
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

methods.addClass = function(className) {
  $.utils.traverse(this, function(node) {
    return node.classList.add(className);
  });
  return this;
};

methods.removeClass = function(className) {
  $.utils.traverse(this, function(node) {
    return node.classList.remove(className);
  });
  return this;
};

methods.toggleClass = function(className) {
  $.utils.traverse(this, function(node) {
    return node.classList.toggle(className);
  });
  return this;
};

methods.hasClass = function(className) {
  if (this[0].classList.contains(className)) {
    return true;
  } else {
    return false;
  }
};

methods.parent = function() {
  return $(this[0].parentElement);
};

methods.next = function() {
  return $(this[0].nextElementSibling);
};

methods.html = function(text) {
  $.utils.traverse(this, function(node) {
    return node.innerHTML(text);
  });
  return this;
};

methods.on = function(event, handler, useCapture) {
  $.utils.traverse(this, function(node) {
    return node.addEventListener(event, handler);
  });
  if (typeof useCapture === "boolean" && useCapture === true) {
    useCapture = true;
  } else {
    useCapture = false;
  }
  return this;
};

methods.off = function(event, handler, useCapture) {
  $.utils.traverse(this, function(node) {
    return node.removeEventListener(event, handler);
  });
  if (typeof useCapture === "boolean" && useCapture === true) {
    useCapture = true;
  } else {
    useCapture = false;
  }
  return this;
};

methods.closest = function(elem) {
  if (elem === "undefined") {
    return this;
  } else {
    return $(this[0].closest(elem));
  }
};

methods.css = function(property, value) {
  var cssProperty, finalProperty, key, modifyProperty;
  if (typeof property === "undefined" && typeof value === "undefined") {
    return window.getComputedStyle(this[0], null);
  }
  if (property && value) {
    this[0].style.setProperty(property, value);
  }
  if (typeof property === "string" && typeof value === "undefined") {
    modifyProperty = property.split('-');
    finalProperty = modifyProperty.reduce((function(phrase, word, index) {
      if (index === 0) {
        return phrase + word;
      } else {
        return phrase + '' + word[0].toUpperCase() + word.slice(1);
      }
    }), '');
    return window.getComputedStyle(this[0], null)[finalProperty];
  }
  if (typeof property === "object") {
    for (key in property) {
      cssProperty = key.split(key.match(/[A-Z]/g)).map(function(el) {
        return el;
      }).join('-' + key.match(/[A-Z]/g)).toLowerCase();
      this[0].style.setProperty(cssProperty, property[key]);
    }
  }
  return this;
};

methods._animate = function(options, time, onEnd) {
  var frameTime, framesCount, i, interval, startOptions, step;
  startOptions = [];
  $.utils.traverse(this, function(node, i) {
    var obj, styles;
    obj = {};
    styles = getComputedStyle(node);
    startOptions[i] = obj;
  });
  console.log(startOptions);
  frameTime = 1000 / 60;
  framesCount = time / frameTime;
  step = (function(_this) {
    return function(percent) {
      $.utils.traverse(_this, function(node) {
        var prop;
        for (prop in options) {
          node.style[prop] = 1 - percent;
        }
      });
    };
  })(this);
  i = 0;
  interval = setInterval(function() {
    var percent;
    percent = i * frameTime / time;
    if (i < framesCount) {
      i++;
      return step(percent);
    } else {
      clearInterval(interval);
      percent = 1;
      step(percent);
      if (onEnd) {
        onEnd();
      }
    }
  });
  return this;
};

lerp = function(value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
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
;
