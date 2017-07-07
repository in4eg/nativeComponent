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
    return node.innerHTML = text;
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
    $.utils.traverse(this, function(node) {
      return node.style.setProperty(property, value);
    });
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
      $.utils.traverse(this, function(node) {
        return node.style.setProperty(cssProperty, property[key]);
      });
    }
  }
  return this;
};

methods.fadeOut = function(time, func1, func2, func3) {
  var frameTime, framesCount, i, step;
  if (func1 && func2) {
    func1();
  }
  if (typeof time === "undefined") {
    time = 500;
  }
  frameTime = 1000 / 60;
  framesCount = time / frameTime;
  i = 1;
  step = (function(_this) {
    return function() {
      var percent;
      i++;
      percent = i / framesCount;
      $.utils.traverse(_this, function(node) {
        return node.style.opacity = 1 - Math.max(0, Math.min(percent, 1));
      });
      if (func1 && func2 && func3) {
        func2(percent);
      }
      if (percent <= 1) {
        requestAnimationFrame(step);
      }
      if (percent >= 1) {
        if (func1 && typeof func2 === "undefined") {
          func1(percent);
        }
        if (func1 && func2 && typeof func3 === "undefined") {
          func2(percent);
        }
        if (func1 && func2 && func3) {
          func3(percent);
        }
      }
    };
  })(this);
  step();
  return this;
};

methods.fadeIn = function(time, func1, func2, func3) {
  var frameTime, framesCount, i, step;
  if (func1 && func2) {
    func1();
  }
  if (typeof time === "undefined") {
    time = 500;
  }
  frameTime = 1000 / 60;
  framesCount = time / frameTime;
  i = 0;
  step = (function(_this) {
    return function() {
      var percent;
      i++;
      percent = i / framesCount;
      $.utils.traverse(_this, function(node) {
        return node.style.opacity = Math.max(0, Math.min(percent, 1));
      });
      if (func1 && func2 && func3) {
        func2(percent);
      }
      if (percent <= 1) {
        requestAnimationFrame(step);
      }
      if (percent >= 1) {
        if (func1 && typeof func2 === "undefined") {
          func1(percent);
        }
        if (func1 && func2 && typeof func3 === "undefined") {
          func2(percent);
        }
        if (func1 && func2 && func3) {
          func3(percent);
        }
      }
    };
  })(this);
  step();
  return this;
};

methods.slideUp = function(time, func1, func2, func3) {
  var frameTime, framesCount, i, step;
  if (func1 && func2) {
    func1();
  }
  if (typeof time === "undefined") {
    time = 500;
  }
  frameTime = 1000 / 60;
  framesCount = time / frameTime;
  i = 1;
  console.log(($.utils.traverse(this, function(node) {}), node.style.height));
  step = (function(_this) {
    return function() {
      var percent;
      i++;
      percent = i / framesCount;
      $.utils.traverse(_this, function(node) {
        return node.style.opacity = 1 - Math.max(0, Math.min(percent, 1));
      });
      if (func1 && func2 && func3) {
        func2(percent);
      }
      if (percent <= 1) {
        requestAnimationFrame(step);
      }
      if (percent >= 1) {
        if (func1 && typeof func2 === "undefined") {
          func1(percent);
        }
        if (func1 && func2 && typeof func3 === "undefined") {
          func2(percent);
        }
        if (func1 && func2 && func3) {
          func3(percent);
        }
      }
    };
  })(this);
  step();
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
