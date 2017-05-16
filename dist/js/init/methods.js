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

methods.closest = function(elem) {
  if (elem === "undefined") {
    return this;
  } else {
    return this[0].closest(elem);
  }
};

methods.parent = function() {
  return this[0].parentElement;
};

methods.next = function() {
  return this[0].nextElementSibling;
};
