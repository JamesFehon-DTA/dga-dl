// phpcs:ignoreFile
/**
 * @popperjs/core v2.11.8 - MIT License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Popper = {}));
}(this, (function (exports) { 'use strict';

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getUAString() {
    var uaData = navigator.userAgentData;

    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function (item) {
        return item.brand + "/" + item.version;
      }).join(' ');
    }

    return navigator.userAgent;
  }

  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }

    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }

    var _ref = isElement(element) ? getWindow(element) : window,
        visualViewport = _ref.visualViewport;

    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x: x,
      y: y
    };
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();

      if (layoutViewport || !layoutViewport && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === 'fixed');
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$strategy = _options.strategy,
        strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref) {
          var name = _ref.name,
              _ref$options = _ref.options,
              options = _ref$options === void 0 ? {} : _ref$options,
              effect = _ref.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var passive = {
    passive: true
  };

  function effect$2(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect$2,
    data: {}
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x,
        y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }, getWindow(popper)) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$1(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$1,
    requires: ['computeStyles']
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  exports.applyStyles = applyStyles$1;
  exports.arrow = arrow$1;
  exports.computeStyles = computeStyles$1;
  exports.createPopper = createPopper;
  exports.createPopperLite = createPopper$1;
  exports.defaultModifiers = defaultModifiers;
  exports.detectOverflow = detectOverflow;
  exports.eventListeners = eventListeners;
  exports.flip = flip$1;
  exports.hide = hide$1;
  exports.offset = offset$1;
  exports.popperGenerator = popperGenerator;
  exports.popperOffsets = popperOffsets$1;
  exports.preventOverflow = preventOverflow$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));


document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Webform component.
 */

function CivicThemeWebform(el) {
  if (el.getAttribute('data-webform') === 'true' || this.el) {
    return;
  }

  this.el = el;

  // Check for form errors and scroll to error message if present.
  const fieldErrors = this.el.querySelectorAll('.ct-field-message--error');
  if (fieldErrors.length > 0) {
    const errorMessage = document.querySelector('.ct-message--error');
    if (errorMessage) {
      // Make error message focusable if it's not a link.
      if (!errorMessage.matches('a')) {
        errorMessage.setAttribute('tabindex', '-1');
      }
      errorMessage.focus();
      errorMessage.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  // Mark as initialized.
  this.el.setAttribute('data-webform', 'true');
}

// Initialize CivicThemeWebform on every element.
document.querySelectorAll('.ct-webform').forEach((webform) => {
   
  new CivicThemeWebform(webform);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Slider component.
 */

function CivicThemeSlider(el) {
  if (el.getAttribute('data-slider') === 'true' || this.el) {
    return;
  }

  this.el = el;

  this.panel = this.el.querySelector('[data-slider-panel]');
  this.rail = this.el.querySelector('[data-slider-rail]');
  this.prev = this.el.querySelector('[data-slider-previous]');
  this.next = this.el.querySelector('[data-slider-next]');
  this.slides = this.el.querySelectorAll('[data-slider-slide]');
  this.progressIndicator = this.el.querySelector('[data-slider-progress]');

  this.prev.addEventListener('click', this.previousClick.bind(this));
  this.next.addEventListener('click', this.nextClick.bind(this));
  window.addEventListener('resize', this.refresh.bind(this));

  this.currentSlide = 0;
  this.totalSlides = this.slides.length;
  this.animationTimeout = null;

  this.updateProgress();
  this.addSlideAriaAttributes();
  this.hideAllSlidesExceptCurrent();

  this.refresh();

  // Refresh slider on font-load.
  document.fonts.ready.then(() => {
    requestAnimationFrame(() => {
      this.refresh();
    });
  });
}

CivicThemeSlider.prototype.refresh = function () {
  // Set slide width based on panel width.
  const panelWidth = window.getComputedStyle(this.panel).width;
  const panelWidthVal = parseFloat(panelWidth);

  // Reset rail and panel height.
  this.rail.style.height = '';
  this.panel.style.height = '';

  // Set the rail width.
  this.rail.style.width = `${this.totalSlides * panelWidthVal}px`;

  // Reset slide heights.
  this.slides.forEach((slide) => {
    slide.style.height = null;
    slide.style.width = panelWidth;
  });

  // Show all slides temporarily to calculate heights.
  this.slides.forEach((slide) => slide.removeAttribute('data-slider-slide-hidden'));

  // Set slide position and find largest slide.
  let largestHeight = 0;
  this.slides.forEach((slide, idx) => {
    slide.style.left = `${idx * panelWidthVal}px`;
    const slideHeight = slide.offsetHeight;
    if (slideHeight > largestHeight) {
      largestHeight = slideHeight;
    }
  });
  const largestHeightPx = `${largestHeight}px`;

  // Resize all slides to the largest slide.
  this.slides.forEach((slide) => {
    slide.style.height = largestHeightPx;
  });

  this.hideAllSlidesExceptCurrent();

  // Set heights based on largest slide height.
  this.rail.style.height = largestHeightPx;
  this.panel.style.height = largestHeightPx;
};

CivicThemeSlider.prototype.enableSlideInteraction = function () {
  this.rail.querySelectorAll('a, button').forEach((link) => {
    link.removeAttribute('tabindex');
  });
};

CivicThemeSlider.prototype.addSlideAriaAttributes = function () {
  this.slides.forEach((slide, idx) => {
    slide.setAttribute('aria-label', `Slide ${idx + 1} of ${this.totalSlides}`);
  });
};

CivicThemeSlider.prototype.disableSlideInteraction = function () {
  this.rail.querySelectorAll('a, button').forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });
};

CivicThemeSlider.prototype.hideAllSlidesExceptCurrent = function () {
  this.slides.forEach((slide, idx) => {
    if (idx !== this.currentSlide) {
      slide.setAttribute('data-slider-slide-hidden', 'true');
      slide.setAttribute('inert', true);
    } else {
      slide.removeAttribute('data-slider-slide-hidden');
      slide.removeAttribute('inert');
    }
  });
};

CivicThemeSlider.prototype.updateDisplaySlide = function () {
  const duration = parseFloat(window.getComputedStyle(this.rail).transitionDuration) * 1000;

  this.disableSlideInteraction();
  this.slides.forEach((slide) => slide.removeAttribute('data-slider-slide-hidden'));

  // Reset timer and wait for animation to complete.
  clearTimeout(this.animationTimeout);
  this.animationTimeout = setTimeout(() => {
    this.hideAllSlidesExceptCurrent();
    this.enableSlideInteraction();
  }, duration);
};

CivicThemeSlider.prototype.previousClick = function () {
  // Go to last slide if current slide is the first slide.
  if (this.currentSlide === 0) {
    this.currentSlide = this.totalSlides - 1;
  } else {
    this.currentSlide--;
  }
  this.rail.style.left = `${this.currentSlide * -100}%`;
  this.updateProgress();
  this.updateDisplaySlide();
};

CivicThemeSlider.prototype.nextClick = function () {
  // Go to first slide if current slide is the last slide.
  if (this.currentSlide === (this.totalSlides - 1)) {
    this.currentSlide = 0;
  } else {
    this.currentSlide++;
  }
  this.rail.style.left = `${this.currentSlide * -100}%`;
  this.updateProgress();
  this.updateDisplaySlide();
};

CivicThemeSlider.prototype.updateProgress = function () {
  this.progressIndicator.innerHTML = `Slide ${this.currentSlide + 1} of ${this.totalSlides}`;
};

document.querySelectorAll('[data-slider]').forEach((slider) => {
  new CivicThemeSlider(slider);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Chart component.
 */

// Storybook / static-page bootstrap. In Drupal, Drupal.behaviors + once are
// real globals and Drupal.attachBehaviors() runs the registered behaviour
// after each AJAX swap. Outside Drupal (this UIKit's Storybook, static demo
// pages), neither exists, so the file would throw at load. Provide minimal
// shims, then run behaviours on DOMContentLoaded and on each DOM mutation so
// stories that mount their chart markup async still pick it up. Drupal pages
// already have these globals — the typeof guards keep the shims inert there.
(function () {
  'use strict';
  if (typeof window.Drupal === 'undefined') {
    // Drupal.t in core substitutes @placeholder / !placeholder / %placeholder
    // tokens from the second arg. The renderer uses @count and @nodes — without
    // substitution the live-status string renders as
    // "Chart loaded. @count rows."
    // Reproduce just enough of core's contract so the status reads naturally
    // in Storybook.
    window.Drupal = {
      behaviors: {},
      t: (str, args) => {
        if (!args) return str;
        return String(str).replace(/[@!%][\w-]+/g, (m) => (m in args ? String(args[m]) : m));
      },
    };
  }
  if (typeof window.once === 'undefined') {
    const marks = new WeakMap();
    window.once = function (id, selector, context) {
      const root = context || document;
      const out = [];
      root.querySelectorAll(selector).forEach((el) => {
        const keys = marks.get(el) || new Set();
        if (keys.has(id)) return;
        keys.add(id);
        marks.set(el, keys);
        out.push(el);
      });
      return out;
    };
  }
})();

(function (Drupal, once) {
  'use strict';

  const ALLOWED_HOSTS = ['data.gov.au', 'www.data.gov.au'];
  const MAX_ROWS = 5000;
  const FETCH_TIMEOUT_MS = 10000;
  // Per-cell string cap for extracted CKAN rows. Protects against shipping
  // multi-KB descriptive prose columns when an author runs a SELECT * style
  // query; row count is already clamped by MAX_ROWS. 500 chars covers every
  // realistic chart label.
  const MAX_CELL_CHARS = 500;

  // Ordinal rank table for sankey node labels. Used to:
  //   (a) sort group colour assignment so e.g. "High" always gets the
  //       darkest sequential shade regardless of where it appears in the
  //       data, and
  //   (b) drive d3-sankey's nodeSort so the same vocabulary stacks
  //       top-to-bottom by rank in every column.
  // Lower number = higher priority (= darker colour, = higher in column).
  // Labels not present here fall back to encounter order.
  //
  // Currently covers MDPR Delivery Confidence Assessment ratings. Extend
  // here when other ordinal vocabularies appear (project lifecycle states,
  // likert scales, RAG statuses, etc.) - the entries are matched case-
  // insensitively after trimming and collapsing internal whitespace.
  const ORDINAL_RANK = {
    high: 0,
    'medium-high': 1,
    medium: 2,
    'medium-low': 3,
    low: 4,
    'not reported': 5,
    'not-reported': 5,
    'unable to rate': 6,
  };

  function rankOf(label) {
    if (!label) return null;
    const k = String(label).toLowerCase().trim().replace(/\s+/g, ' ');
    return Object.prototype.hasOwnProperty.call(ORDINAL_RANK, k) ? ORDINAL_RANK[k] : null;
  }

  /**
   * Sort comparator for groups identified by their label string. Ranked
   * labels sort by rank ascending; unranked labels keep encounter order
   * (stable sort, returning 0). Mixed pairs put ranked labels first so
   * the colour ramp starts on the known ordinal.
   */
  function compareByRank(a, b) {
    const ra = rankOf(a);
    const rb = rankOf(b);
    if (ra !== null && rb !== null) return ra - rb;
    if (ra !== null) return -1;
    if (rb !== null) return 1;
    return 0;
  }

  // IBM Carbon Charts 14-series Categorical palette (light theme defaults).
  // Sourced from packages/core/scss/_color-palette.scss in
  // carbon-design-system/carbon-charts. Dark-theme equivalents are declared
  // in chart.css under
  // .ct-theme-dark .bdga-chart and override these defaults via CSS custom
  // properties at render time.
  //
  // The CSS-variable hook (--bdga-chart-c1..c14, --bdga-chart-s1..s6) lets a
  // sub-theme swap palettes without touching this file.
  const PALETTE_DEFAULT = [
    '#6929c4', // purple 70   - series 1 (default for single-series charts)
    '#1192e8', // cyan 50
    '#005d5d', // teal 70
    '#9f1853', // magenta 70
    '#fa4d56', // red 50
    '#520408', // red 90
    '#198038', // green 60
    '#002d9c', // blue 80
    '#ee5396', // magenta 50
    '#b28600', // yellow 50
    '#009d9a', // teal 50
    '#012749', // cyan 90
    '#8a3800', // orange 70
    '#a56eff', // purple 50
  ];
  // Sequential ramp for charts with >14 series: progressively lighter purples
  // anchored on series-1 (purple 70). Dark theme overrides via CSS.
  const SEQUENTIAL_DEFAULT = ['#6929c4', '#8a3ffc', '#a56eff', '#be95ff', '#d4bbff', '#e8daff'];

  /**
   * Resolve a CSS custom property against a DOM element, with fallback.
   * Empty / undefined values fall back to the default so authors can leave
   * gaps in their override (e.g. only override c1 and c2).
   */
  function cssVar(el, name, fallback) {
    const v = getComputedStyle(el).getPropertyValue(name).trim();
    return v !== '' ? v : fallback;
  }

  /**
   * Numeric variant of cssVar: read a length-like custom property and parse
   * its leading number (px). Used for the responsive layout knobs that the
   * @container queries in chart.scss switch by container width. Returns the
   * fallback when the property is unset or non-numeric.
   */
  function cssNum(el, name, fallback) {
    const n = parseFloat(getComputedStyle(el).getPropertyValue(name));
    return Number.isFinite(n) ? n : fallback;
  }

  /**
   * Read the 14 categorical and 6 sequential colour stops from CSS on the
   * given chart element. Computed once per chart at draw time.
   */
  function resolvePalette(el) {
    const categorical = PALETTE_DEFAULT.map((d, i) => cssVar(el, `--bdga-chart-c${  i + 1}`, d));
    const sequential = SEQUENTIAL_DEFAULT.map((d, i) => cssVar(el, `--bdga-chart-s${  i + 1}`, d));
    return { categorical, sequential, single: categorical[0] };
  }

  function shadeSequential(palette, index, total) {
    if (total <= 1) return palette.single;
    return palette.sequential[Math.min(index, palette.sequential.length - 1)];
  }

  Drupal.behaviors.bdgaChart = {
    attach(context) {
      if (typeof window.d3 === 'undefined') {
        // D3 vendored library not loaded; keep the table fallback.
        return;
      }
      once('bdga-chart', '[data-bdga-chart]', context).forEach((el) => {
        // eslint-disable-next-line no-use-before-define
        new BdgaChart(el).init();
      });
    },
  };

  class BdgaChart {
    constructor(root) {
      this.root = root;
      this.canvas = root.querySelector('[data-bdga-chart-canvas]');
      this.errorEl = root.querySelector('[data-bdga-chart-error]');
      this.tableEl = root.querySelector('[data-bdga-chart-data]');
      this.statusEl = root.querySelector('[data-bdga-chart-status]');
      this.configEl = root.querySelector('script[type="application/json"][data-bdga-chart-config]');

      // Read primary config from the JSON data island. Fall back to data-*
      // attributes + table walk only if the island isn't present (e.g. an
      // older cached render of the markup, or a hand-rolled embed).
      const config = this.readConfig();
      if (config) {
        this.id = config.id || root.id || null;
        this.type = config.type || root.dataset.bdgaChart || 'bar';
        this.mode = config.source || 'json';
        this.url = config.url || null;
        this.xKey = config.x_key || null;
        this.yKeys = Array.isArray(config.y_keys) ? config.y_keys.slice() : [];
        this.rows = Array.isArray(config.rows) ? config.rows : [];
        this.locale = config.locale || null;
        this.maxRows = config.max_rows || MAX_ROWS;
        this.xLabel = config.x_label || this.xKey;
        this.yLabel = config.y_label || (this.yKeys.length === 1 ? this.yKeys[0] : '');
        this.colorBy = config.color_by === 'category' ? 'category' : 'series';
        // Sankey / flow shape - parallel to rows. drawSankey / drawFlow
        // ignore rows entirely and read these instead.
        this.nodes = Array.isArray(config.nodes) ? config.nodes : null;
        this.links = Array.isArray(config.links) ? config.links : null;
        // Lollipop median reference line; null disables.
        this.medianValue = (typeof config.median_value === 'number' && Number.isFinite(config.median_value))
          ? config.median_value
          : null;
      }
      else {
        this.id = root.dataset.bdgaChartId;
        this.type = root.dataset.bdgaChart;
        this.mode = root.dataset.bdgaChartSource;
        this.url = root.dataset.bdgaChartUrl || null;
        this.xKey = root.dataset.bdgaChartX || null;
        this.yKeys = (root.dataset.bdgaChartY || '').split(',').filter(Boolean);
        this.rows = null;
        this.locale = null;
        this.maxRows = MAX_ROWS;
        this.xLabel = this.xKey;
        this.yLabel = this.yKeys[0] || '';
        this.colorBy = 'series';
        this.nodes = null;
        this.links = null;
        this.medianValue = null;
      }

      // Toolbar (optional, Phase 1). References resolve to null when the
      // `toolbar` prop didn't render the markup, in which case initToolbar()
      // is a no-op. downloads is read from the figure's data-* attribute so
      // it works in Storybook and Drupal alike, independent of config_json.
      this.toolbarEl = root.querySelector('[data-bdga-chart-toolbar]');
      this.menuEl = root.querySelector('[data-bdga-chart-menu]');
      this.menuButtonEl = root.querySelector('[data-bdga-chart-menu-button]');
      this.tableToggleEl = root.querySelector('[data-bdga-chart-tool="table"]');
      this.detailsEl = this.tableEl ? this.tableEl.closest('details') : null;
      this.downloads = (root.dataset.bdgaChartDownloads || '')
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s === 'csv' || s === 'json');
      this.menuOpen = false;
      this.menuItems = [];

      // Legend (optional, Phase 2). Series toggled here are tracked in
      // `hidden` (by y-key, or by x-value for pie) and excluded at draw time.
      this.legendEl = root.querySelector('[data-bdga-chart-legend]');
      this.legendBuilt = false;
      this.legendButtons = new Map();
      this.hidden = new Set();

      // Texture fills (optional, Phase 4): SVG pattern fills layered on the
      // series colour as a colour-blind-safe redundant cue.
      this.texture = root.dataset.bdgaChartTexture === 'true';

      // Zoom (optional, Phase 4): data-domain windowing for the ordinal
      // cartesian types. zoomWindow is an inclusive {start, end} index range
      // into the full ordered data; null = full extent.
      this.zoomGroupEl = root.querySelector('[data-bdga-chart-zoom-group]');
      this.zoom = !!this.zoomGroupEl;
      this.zoomWindow = null;
    }

    /**
     * Parse the JSON data island. Returns null if absent or unparseable.
     * Failures here are silent at the constructor level; init() decides
     * whether to fall back to the table or fail loudly.
     */
    readConfig() {
      if (!this.configEl) return null;
      try {
        const txt = this.configEl.textContent || '';
        if (!txt.trim()) return null;
        return JSON.parse(txt);
      }
      catch (e) {
        if (window.console) {
          window.console.warn('[bdga-chart] config JSON parse failed:', e);
        }
        return null;
      }
    }

    init() {
      this.observeResize();
      this.initToolbar();
      try {
        if (this.mode === 'url') {
          return this.loadFromUrl();
        }
        // Sankey / flow read nodes + links from the JSON island; the table
        // is the AT fallback only, not a data source for the renderer.
        if (this.type === 'sankey' || this.type === 'flow') {
          if (!this.nodes || !this.nodes.length || !this.links || !this.links.length) {
            return this.fail('Sankey/flow chart requires nodes and links');
          }
          if (typeof window.d3 === 'undefined' || typeof window.d3.sankey !== 'function') {
            return this.fail('d3-sankey plugin missing');
          }
          return this.draw([]);
        }
        // Prefer rows from the JSON island; only walk the <table> if we
        // didn't get any (older markup, or a hand-rolled embed).
        let rows = this.rows;
        if (!rows || !rows.length) {
          rows = this.readTable();
        }
        if (!rows.length) return this.fail('No rows in data island or fallback table');
        this.draw(rows);
      } catch (err) {
        this.fail(err && err.message ? err.message : String(err));
      }
    }

    /**
     * Re-lay-out the chart when its container width changes (device rotation,
     * responsive sidebar, Storybook viewport switch). The SVG already CSS-
     * scales via its viewBox, but re-running the draw at the new pixel width
     * keeps tick text, stroke widths and the sankey @container margin knobs
     * crisp and correct. No-op until the first successful draw has stored its
     * inputs, and a no-op on browsers without ResizeObserver.
     */
    observeResize() {
      if (typeof ResizeObserver === 'undefined' || this.resizeObserver || !this.canvas) {
        return;
      }
      let timer = 0;
      this.resizeObserver = new ResizeObserver(() => {
        // Debounce a burst of resize callbacks (e.g. during a drag) into one
        // redraw once the width settles. setTimeout (not rAF) so the redraw
        // still lands when the chart is in a backgrounded / hidden tab, where
        // rAF is paused.
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          if (this.lastDrawData === undefined) return;
          const w = this.canvas.clientWidth || 0;
          // Ignore sub-pixel jitter and the observer's own initial callback
          // (same width as the last draw) so a redraw can't feed itself.
          if (Math.abs(w - (this.lastDrawWidth || 0)) <= 2) return;
          this.redraw();
        }, 150);
      });
      this.resizeObserver.observe(this.canvas);
    }

    redraw() {
      try {
        this.draw(this.lastDrawData || []);
      } catch {
        // Keep the last good render rather than blanking the canvas on a
        // transient resize-time error.
      }
    }

    setStatus(msg) {
      if (this.statusEl) this.statusEl.textContent = msg;
    }

    fail(reason) {
      if (window.console) {
        window.console.warn(`[bdga-chart] ${  this.id  }: ${  reason}`);
      }
      if (this.errorEl) this.errorEl.hidden = false;
      if (this.canvas) this.canvas.setAttribute('aria-hidden', 'true');
      this.setStatus(Drupal.t('Chart unavailable.'));
    }

    // -- Toolbar (Phase 1) ---------------------------------------------------
    //
    // Accessible controls layered on top of the table-first markup. The
    // "View as table" button drives the existing data disclosure; the overflow
    // menu offers a source-aware action set (download links for local data, a
    // "view source" link in url mode) using the WAI-ARIA menu-button keyboard
    // model. The menu items are built here, not server-side, because their
    // payload derives from the live data the renderer holds; no-JS users keep
    // the table (its own <summary> still works) and the url-mode <noscript>.

    initToolbar() {
      if (!this.toolbarEl) return;
      this.wireTableToggle();
      this.buildMenu();
      this.wireMenu();
      this.wireZoom();
    }

    wireZoom() {
      if (!this.zoomGroupEl) return;
      this.zoomGroupEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-bdga-chart-zoom]');
        if (!btn) return;
        const action = btn.getAttribute('data-bdga-chart-zoom');
        // Centre on the last-focused data point when there is one (clicking the
        // button moved focus off it, but focusPos still records where it was);
        // otherwise centre on the current window.
        const center = this.pointFocused ? this.currentFullIndex() : null;
        if (action === 'in') this.zoomIn(center);
        else if (action === 'out') this.zoomOut(center);
        else this.zoomReset();
      });
    }

    applicableZoom() {
      return this.zoom && (this.type === 'bar' || this.type === 'line' || this.type === 'lollipop');
    }

    sliceZoom(rows) {
      if (!this.zoomWindow) return rows;
      return rows.slice(this.zoomWindow.start, this.zoomWindow.end + 1);
    }

    /** Full-data index of the focused point, for +/- zoom. */
    currentFullIndex() {
      const base = this.zoomWindow ? this.zoomWindow.start : 0;
      return base + (this.focusPos ? this.focusPos.i : 0);
    }

    /**
     * Re-window around a centre index. factor < 1 zooms in, > 1 zooms out.
     * Clamps to >= 2 points and to the data bounds; a window covering the whole
     * range resets to null (full extent). When refocus is set (key-driven
     * zoom), keyboard focus is restored to the SAME data point it centred on -
     * not the first point - so the user keeps their place across the redraw.
     */
    zoomBy(factor, centerIdx, refocus) {
      const rows = this.lastDrawData || [];
      const n = rows.length;
      if (n < 3) return;
      // Capture the focused point's identity (series group + full-data index)
      // before the redraw rebuilds the point model.
      const g = this.focusPos ? this.focusPos.g : 0;
      const win = this.zoomWindow || { start: 0, end: n - 1 };
      const span = win.end - win.start + 1;
      const newSpan = Math.max(2, Math.round(span * factor));
      if (newSpan >= n) {
        this.zoomWindow = null;
      }
      else {
        const center = centerIdx != null ? centerIdx : Math.floor((win.start + win.end) / 2);
        let start = Math.round(center - newSpan / 2);
        start = Math.max(0, Math.min(start, n - newSpan));
        this.zoomWindow = { start, end: start + newSpan - 1 };
      }
      this.redraw();
      this.announceZoom();
      if (refocus) this.refocusPoint(g, centerIdx);
    }

    zoomIn(centerIdx, refocus) {
      this.zoomBy(0.6, centerIdx, refocus);
    }

    zoomOut(centerIdx, refocus) {
      this.zoomBy(1.8, centerIdx, refocus);
    }

    zoomReset(centerIdx, refocus) {
      const g = this.focusPos ? this.focusPos.g : 0;
      this.zoomWindow = null;
      this.redraw();
      this.announceZoom();
      if (refocus) this.refocusPoint(g, centerIdx);
    }

    /**
     * Restore keyboard focus to the data point with the given full-data index
     * within series group g, after a zoom rebuilt the point model. The centred
     * point is always still in the window, so this keeps the user on it;
     * clamps if the group is shorter than expected.
     */
    refocusPoint(g, fullIdx) {
      if (!this.pointGroups.length) return;
      const gi = Math.min(g, this.pointGroups.length - 1);
      const group = this.pointGroups[gi];
      if (!group || !group.length) return;
      const base = this.zoomWindow ? this.zoomWindow.start : 0;
      let i = fullIdx == null ? 0 : fullIdx - base;
      i = Math.max(0, Math.min(i, group.length - 1));
      this.focusPoint(gi, i);
    }

    announceZoom() {
      const rows = this.lastDrawData || [];
      if (!this.zoomWindow) {
        this.setStatus(Drupal.t('Showing all @n points.', { '@n': rows.length }));
        return;
      }
      const { start, end } = this.zoomWindow;
      this.setStatus(
        Drupal.t('Showing @a to @b, @c of @n points.', {
          '@a': rows[start] ? rows[start][this.xKey] : '',
          '@b': rows[end] ? rows[end][this.xKey] : '',
          '@c': end - start + 1,
          '@n': rows.length,
        })
      );
    }

    wireTableToggle() {
      const btn = this.tableToggleEl;
      const details = this.detailsEl;
      if (!btn || !details) return;
      btn.addEventListener('click', () => {
        details.open = !details.open;
        if (details.open) {
          const summary = details.querySelector('summary');
          if (summary) summary.focus();
          this.setStatus(Drupal.t('Showing data table.'));
        }
      });
      // Mirror the button's state when the disclosure is toggled directly via
      // its native summary, so the two controls never disagree.
      const sync = () => btn.setAttribute('aria-expanded', String(details.open));
      details.addEventListener('toggle', sync);
      sync();
    }

    /**
     * Build the overflow menu's items. url mode offers a single "view source"
     * link; local modes offer a download button per configured format. When
     * there is nothing to offer, the menu button is removed so we never ship
     * an empty menu.
     */
    buildMenu() {
      const menu = this.menuEl;
      if (!menu) return;
      const items = [];

      if (this.mode === 'url' && this.url) {
        const a = document.createElement('a');
        a.className = 'bdga-chart__menu-item';
        a.setAttribute('role', 'menuitem');
        a.href = this.url;
        a.target = '_blank';
        a.rel = 'noopener nofollow';
        a.textContent = Drupal.t('View source data (opens in new tab)');
        a.addEventListener('click', () => this.closeMenu(false));
        items.push(a);
      }
      else {
        this.downloads.forEach((fmt) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'bdga-chart__menu-item';
          b.setAttribute('role', 'menuitem');
          b.textContent = fmt === 'json'
            ? Drupal.t('Download data (JSON)')
            : Drupal.t('Download data (CSV)');
          b.addEventListener('click', () => {
            this.download(fmt);
            this.closeMenu(true);
          });
          items.push(b);
        });
      }

      if (!items.length) {
        const wrap = this.menuButtonEl && this.menuButtonEl.closest('.bdga-chart__menu-wrap');
        if (wrap) wrap.remove();
        this.menuButtonEl = null;
        this.menuEl = null;
        return;
      }

      menu.replaceChildren(
        ...items.map((el) => {
          const li = document.createElement('li');
          li.setAttribute('role', 'none');
          li.appendChild(el);
          return li;
        })
      );
      this.menuItems = items;
      items.forEach((el, i) => el.setAttribute('tabindex', i === 0 ? '0' : '-1'));
    }

    wireMenu() {
      const button = this.menuButtonEl;
      const menu = this.menuEl;
      if (!button || !menu || !this.menuItems.length) return;

      button.addEventListener('click', () => {
        if (this.menuOpen) this.closeMenu(true);
        else this.openMenu(0);
      });
      button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openMenu(0);
        }
        else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.openMenu(this.menuItems.length - 1);
        }
      });

      menu.addEventListener('keydown', (e) => {
        const items = this.menuItems;
        const current = items.indexOf(document.activeElement);
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            this.focusMenuItem((current + 1) % items.length);
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.focusMenuItem((current - 1 + items.length) % items.length);
            break;
          case 'Home':
            e.preventDefault();
            this.focusMenuItem(0);
            break;
          case 'End':
            e.preventDefault();
            this.focusMenuItem(items.length - 1);
            break;
          case 'Escape':
            e.preventDefault();
            this.closeMenu(true);
            break;
          case 'Tab':
            // Let focus leave naturally, but collapse the menu behind it.
            this.closeMenu(false);
            break;
          default:
            break;
        }
      });

      // Dismiss on any pointer interaction outside the toolbar while open.
      document.addEventListener('pointerdown', (e) => {
        if (!this.menuOpen) return;
        if (this.toolbarEl && this.toolbarEl.contains(e.target)) return;
        this.closeMenu(false);
      });
    }

    openMenu(index) {
      if (!this.menuEl || !this.menuButtonEl) return;
      this.menuEl.hidden = false;
      this.menuButtonEl.setAttribute('aria-expanded', 'true');
      this.menuOpen = true;
      this.focusMenuItem(index);
    }

    closeMenu(returnFocus) {
      if (!this.menuEl || !this.menuButtonEl) return;
      this.menuEl.hidden = true;
      this.menuButtonEl.setAttribute('aria-expanded', 'false');
      this.menuOpen = false;
      if (returnFocus) this.menuButtonEl.focus();
    }

    focusMenuItem(index) {
      const items = this.menuItems;
      items.forEach((el, i) => el.setAttribute('tabindex', i === index ? '0' : '-1'));
      if (items[index]) items[index].focus();
    }

    /**
     * Trigger a client-side download of the current data in the given format.
     * Reads the live data at click time so url-mode charts export whatever has
     * loaded; announces the outcome through the status live region.
     */
    download(fmt) {
      const rows = this.exportRows();
      if (!rows.length) {
        this.setStatus(Drupal.t('No data available to download yet.'));
        return;
      }
      const base = String(this.id || 'chart').replace(/[^\w-]+/g, '-');
      if (fmt === 'json') {
        this.downloadBlob(`${base}.json`, 'application/json', JSON.stringify(rows, null, 2));
        this.setStatus(Drupal.t('Data downloaded as JSON.'));
      }
      else {
        this.downloadBlob(`${base}.csv`, 'text/csv;charset=utf-8', this.toCsv(rows));
        this.setStatus(Drupal.t('Data downloaded as CSV.'));
      }
    }

    /**
     * The rows to export. Flow / sankey carry their data as links
     * (source / target / value); every other type exports the plotted rows.
     * Falls back to the parsed table when no draw has happened yet.
     */
    exportRows() {
      if ((this.type === 'sankey' || this.type === 'flow') && Array.isArray(this.links)) {
        return this.links.map((l) => ({
          source: l.source && l.source.id ? l.source.id : l.source,
          target: l.target && l.target.id ? l.target.id : l.target,
          value: l.value,
        }));
      }
      if (Array.isArray(this.lastDrawData) && this.lastDrawData.length) {
        return this.lastDrawData;
      }
      if (Array.isArray(this.rows) && this.rows.length) return this.rows;
      return this.readTable();
    }

    /**
     * Columns to emit, in a stable order: X key then the Y series for normal
     * charts, the fixed triplet for flow charts, or the first row's own keys
     * as a last resort.
     */
    csvColumns(rows) {
      if (this.type === 'sankey' || this.type === 'flow') {
        return ['source', 'target', 'value'];
      }
      const cols = [];
      if (this.xKey) cols.push(this.xKey);
      (this.yKeys || []).forEach((k) => {
        if (cols.indexOf(k) === -1) cols.push(k);
      });
      if (!cols.length && rows[0]) return Object.keys(rows[0]);
      return cols;
    }

    toCsv(rows) {
      const keys = this.csvColumns(rows);
      const esc = (v) => {
        const s = v === null || v === undefined ? '' : String(v);
        return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      };
      const head = keys.map(esc).join(',');
      const body = rows.map((r) => keys.map((k) => esc(r[k])).join(',')).join('\r\n');
      return `${head}\r\n${body}\r\n`;
    }

    downloadBlob(filename, mime, text) {
      const blob = new Blob([text], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Revoke on the next tick, once the download navigation has started.
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    }

    // -- Legend + series toggle (Phase 2) ------------------------------------
    //
    // An interactive legend for the genuinely multi-series renderers
    // (grouped_bar, stacked_bar, pie). Each item is an aria-pressed toggle
    // button: pressed = shown. Hover or focus highlights that series (others
    // drop to 30% opacity, per Carbon); click hides/shows it and redraws.
    // Hidden state carries a non-colour cue (strike-through + "(hidden)" in the
    // accessible name) so it never relies on colour alone (WCAG 1.4.1). The
    // legend is an enhancement: the chart still renders, and the data table
    // still carries every series, when it is absent.

    /** Y-keys not currently hidden. Renderers iterate this, not this.yKeys. */
    visibleKeys() {
      return this.yKeys.filter((k) => !this.hidden.has(k));
    }

    /** Count of series still visible, across the keyed and pie shapes. */
    visibleSeriesCount() {
      if (this.type === 'pie') {
        return (this.lastDrawData || []).filter(
          (r) => !this.hidden.has(String(r[this.xKey]))
        ).length;
      }
      return this.visibleKeys().length;
    }

    /**
     * Stable colour for a series at its ORIGINAL index, so a series keeps its
     * colour when others are toggled off. Mirrors the categorical / sequential
     * policy used by the renderers.
     */
    seriesColor(index, total) {
      const p = this.palette || resolvePalette(this.root);
      return total <= p.categorical.length
        ? p.categorical[index]
        : shadeSequential(p, index, total);
    }

    /**
     * Fill value for a series mark: the flat colour, or - when texture is on -
     * an SVG pattern that layers a motif over that colour. The pattern keeps
     * the series colour as its background, so colour and texture agree and the
     * texture is a redundant cue, not a replacement (WCAG 1.4.1).
     */
    fillFor(svg, index, color) {
      return this.texture ? this.ensurePattern(svg, index, color) : color;
    }

    /**
     * Lazily define one pattern per series index in the svg's <defs>, cycling
     * through five motifs (two hatches, dots, cross-hatch, vertical). Returns
     * the url() reference. Motifs are deliberately subtle white-on-colour so
     * they read as texture without the clutter Carbon and UK Gov warn about.
     */
    ensurePattern(svg, index, color) {
      const id = `bdga-pat-${this.id || 'chart'}-${index}`.replace(/[^\w-]+/g, '-');
      let defs = svg.select('defs');
      if (defs.empty()) defs = svg.append('defs');
      if (this.patternIds.has(id)) return `url(#${id})`;
      this.patternIds.add(id);

      const motif = index % 5;
      const stroke = 'rgba(255, 255, 255, 0.7)';
      const sw = 1.3;
      const p = defs
        .append('pattern')
        .attr('id', id)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 8)
        .attr('height', 8);
      p.append('rect').attr('width', 8).attr('height', 8).attr('fill', color);
      const hline = (yy) =>
        p.append('line').attr('x1', 0).attr('y1', yy).attr('x2', 8).attr('y2', yy)
          .attr('stroke', stroke).attr('stroke-width', sw);
      const vline = (xx) =>
        p.append('line').attr('x1', xx).attr('y1', 0).attr('x2', xx).attr('y2', 8)
          .attr('stroke', stroke).attr('stroke-width', sw);
      if (motif === 0) {
        hline(2); hline(6); p.attr('patternTransform', 'rotate(45)');
      }
      else if (motif === 1) {
        hline(2); hline(6); p.attr('patternTransform', 'rotate(-45)');
      }
      else if (motif === 2) {
        p.append('circle').attr('cx', 4).attr('cy', 4).attr('r', 1.5).attr('fill', stroke);
      }
      else if (motif === 3) {
        hline(4); vline(4);
      }
      else {
        vline(2); vline(6);
      }
      return `url(#${id})`;
    }

    buildLegend() {
      if (!this.legendEl || this.legendBuilt) return;
      this.palette = this.palette || resolvePalette(this.root);
      let series;
      if (this.type === 'pie') {
        const rows = this.lastDrawData || [];
        series = rows.map((r, i) => ({
          key: String(r[this.xKey]),
          label: String(r[this.xKey]),
          color: this.seriesColor(i, rows.length),
        }));
      }
      else {
        series = this.yKeys.map((k, i) => ({
          key: String(k),
          label: String(k),
          color: this.seriesColor(i, this.yKeys.length),
        }));
      }

      // A legend for a single series is noise (Carbon: omit it). Drop the
      // empty list so it leaves no stray markup.
      if (series.length < 2) {
        this.legendEl.remove();
        this.legendEl = null;
        this.legendBuilt = true;
        return;
      }

      const frag = document.createDocumentFragment();
      this.legendButtons = new Map();
      series.forEach((s, i) => {
        const li = document.createElement('li');
        li.setAttribute('role', 'none');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bdga-chart__legend-item';
        btn.setAttribute('aria-pressed', 'true');
        btn.dataset.bdgaKey = s.key;
        const swatch = document.createElement('span');
        swatch.className = 'bdga-chart__legend-swatch';
        // Mirror the mark's texture so the key stays truthful.
        if (this.texture) swatch.classList.add(`bdga-chart__legend-swatch--tex${i % 5}`);
        swatch.setAttribute('aria-hidden', 'true');
        swatch.style.backgroundColor = s.color;
        const label = document.createElement('span');
        label.className = 'bdga-chart__legend-label';
        label.textContent = s.label;
        btn.append(swatch, label);
        btn.addEventListener('click', () => this.toggleSeries(s.key, s.label));
        btn.addEventListener('mouseenter', () => this.emphasizeSeries(s.key));
        btn.addEventListener('mouseleave', () => this.emphasizeSeries(null));
        btn.addEventListener('focus', () => this.emphasizeSeries(s.key));
        btn.addEventListener('blur', () => this.emphasizeSeries(null));
        li.appendChild(btn);
        frag.appendChild(li);
        this.legendButtons.set(s.key, btn);
      });
      this.legendEl.replaceChildren(frag);
      this.legendBuilt = true;
    }

    toggleSeries(key, label) {
      const willHide = !this.hidden.has(key);
      if (willHide && this.visibleSeriesCount() <= 1) {
        this.setStatus(Drupal.t('At least one series must stay visible.'));
        return;
      }
      if (willHide) this.hidden.add(key);
      else this.hidden.delete(key);
      const btn = this.legendButtons.get(key);
      if (btn) {
        btn.setAttribute('aria-pressed', String(!willHide));
        btn.classList.toggle('bdga-chart__legend-item--hidden', willHide);
        // Non-colour cue for the hidden state in the accessible name.
        btn.setAttribute('aria-label', willHide ? Drupal.t('@s (hidden)', { '@s': label }) : label);
      }
      this.redraw();
      this.setStatus(
        willHide ? Drupal.t('@s hidden', { '@s': label }) : Drupal.t('@s shown', { '@s': label })
      );
    }

    /**
     * Highlight one series by dropping every other mark to 30% opacity. Inline
     * styles are wiped on the next redraw, so a stale highlight can't persist
     * past a toggle. key === null restores all.
     */
    emphasizeSeries(key) {
      if (!this.canvas) return;
      this.canvas.querySelectorAll('[data-bdga-series]').forEach((m) => {
        m.style.opacity = key === null || m.getAttribute('data-bdga-series') === key ? '' : '0.3';
      });
    }

    // -- Keyboard navigation of data points (Phase 3) ------------------------
    //
    // Each data mark is a real, labelled focusable element (role="img" +
    // aria-label), the way @fluentui/react-charting exposes its marks - so a
    // screen reader reads the point when focus lands on it, with no reliance on
    // a live region for point-by-point narration. A roving-tabindex model gives
    // the group a single tab stop; arrow keys then move between points (Left/
    // Right within a series, Up/Down across series), Home/End jump to the ends.
    // A visual tooltip mirrors the label on focus and hover. The data table
    // remains the structural alternative; decorative axis/grid elements stay
    // out of the a11y tree. Sankey/flow nodes keep their <title> tooltips and
    // are not part of this point model.

    formatValue(v) {
      return typeof v === 'number' ? v.toLocaleString(this.locale || undefined) : String(v);
    }

    pointLabel(seriesLabel, xVal, value) {
      const val = this.formatValue(value);
      // Drop the series label when it would just repeat the category.
      return seriesLabel && String(seriesLabel) !== String(xVal)
        ? `${xVal}, ${seriesLabel}: ${val}`
        : `${xVal}: ${val}`;
    }

    /**
     * Register one series' marks for keyboard navigation. `entries` is an
     * ordered array of { el, xVal, value, label? } in x order. Each element
     * becomes a labelled, focusable point; the group is stored so arrow-key
     * navigation can move within and across series.
     */
    addPoints(seriesLabel, entries) {
      const group = [];
      entries.forEach((e) => {
        const label = e.label || this.pointLabel(seriesLabel, e.xVal, e.value);
        e.el.setAttribute('role', 'img');
        e.el.setAttribute('aria-label', label);
        e.el.setAttribute('tabindex', '-1');
        e.el.setAttribute('data-bdga-point', '');
        this.points.push(e.el);
        group.push(e.el);
      });
      if (group.length) this.pointGroups.push(group);
    }

    /**
     * Finalise the point model after a draw: set position attributes, make the
     * first point the single tab stop, and bind the keyboard / pointer / focus
     * handlers once (the canvas element persists across redraws, so the
     * listeners survive replaceChildren).
     */
    /**
     * Expose the plot to assistive tech once its marks are individually
     * labelled and focusable. draw() leaves the canvas aria-hidden ("table is
     * the AT source"); this lifts that, silences the decorative axes /
     * gridlines, and names the svg as a group. `instruction` is appended to the
     * group label to tell the user how to explore (arrow keys vs Tab). Charts
     * with no focusable marks must NOT call this - they stay aria-hidden so the
     * table is the sole AT path.
     */
    exposePlot(instruction) {
      this.canvas.removeAttribute('aria-hidden');
      this.canvas
        .querySelectorAll('.tick, .domain, .bdga-chart__axis-label')
        .forEach((el) => el.setAttribute('aria-hidden', 'true'));
      const svgEl = this.canvas.querySelector('svg');
      if (!svgEl) return;
      svgEl.setAttribute('role', 'group');
      const titleEl = this.root.querySelector('.bdga-chart__title');
      const name = (titleEl && titleEl.textContent.trim()) || this.id || Drupal.t('Chart');
      svgEl.setAttribute(
        'aria-label',
        instruction ? Drupal.t('@t. @i', { '@t': name, '@i': instruction }) : name
      );
    }

    initPointNav() {
      if (!this.points || !this.points.length) return;

      this.exposePlot(Drupal.t('Use arrow keys to move between data points.'));

      this.pointGroups.forEach((group) => {
        group.forEach((el, idx) => {
          el.setAttribute('aria-posinset', String(idx + 1));
          el.setAttribute('aria-setsize', String(group.length));
        });
      });
      this.focusPos = { g: 0, i: 0 };
      // Whether the user has actually focused a point this draw. Toolbar zoom
      // centres on the focused point only when this is true.
      this.pointFocused = false;
      this.pointGroups[0][0].setAttribute('tabindex', '0');

      if (this.pointNavBound) return;
      this.pointNavBound = true;
      this.canvas.addEventListener('keydown', (e) => this.onPointKeydown(e));
      // Pointer + focus parity for the tooltip.
      this.canvas.addEventListener('mouseover', (e) => {
        const pt = e.target.closest('[data-bdga-point]');
        if (pt) this.showPointTooltip(pt);
      });
      this.canvas.addEventListener('mouseout', (e) => {
        const pt = e.target.closest('[data-bdga-point]');
        if (pt) this.hidePointTooltip();
      });
      this.canvas.addEventListener('focusin', (e) => {
        const pt = e.target.closest && e.target.closest('[data-bdga-point]');
        if (!pt) return;
        this.syncFocusPos(pt);
        this.showPointTooltip(pt);
      });
      this.canvas.addEventListener('focusout', (e) => {
        const pt = e.target.closest && e.target.closest('[data-bdga-point]');
        if (pt) this.hidePointTooltip();
      });
    }

    /** Locate a focused point so arrow keys resume from it. */
    syncFocusPos(el) {
      for (let g = 0; g < this.pointGroups.length; g += 1) {
        const i = this.pointGroups[g].indexOf(el);
        if (i !== -1) {
          if (this.focusPos) {
            const prev = this.pointGroups[this.focusPos.g] &&
              this.pointGroups[this.focusPos.g][this.focusPos.i];
            if (prev && prev !== el) prev.setAttribute('tabindex', '-1');
          }
          el.setAttribute('tabindex', '0');
          this.focusPos = { g, i };
          this.pointFocused = true;
          return;
        }
      }
    }

    onPointKeydown(e) {
      if (!this.pointGroups.length || !this.focusPos) return;

      // Keyboard zoom while a point is focused: +/- around it, 0 resets.
      if (this.applicableZoom()) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          this.zoomIn(this.currentFullIndex(), true);
          return;
        }
        if (e.key === '-' || e.key === '_') {
          e.preventDefault();
          this.zoomOut(this.currentFullIndex(), true);
          return;
        }
        if (e.key === '0') {
          e.preventDefault();
          // Reset to the full extent but keep focus on the same point.
          this.zoomReset(this.currentFullIndex(), true);
          return;
        }
      }

      let { g, i } = this.focusPos;
      const groups = this.pointGroups;
      switch (e.key) {
        case 'ArrowRight':
          i = Math.min(i + 1, groups[g].length - 1);
          break;
        case 'ArrowLeft':
          i = Math.max(i - 1, 0);
          break;
        case 'ArrowDown':
          g = Math.min(g + 1, groups.length - 1);
          i = Math.min(i, groups[g].length - 1);
          break;
        case 'ArrowUp':
          g = Math.max(g - 1, 0);
          i = Math.min(i, groups[g].length - 1);
          break;
        case 'Home':
          i = 0;
          break;
        case 'End':
          i = groups[g].length - 1;
          break;
        case 'Escape':
          this.hidePointTooltip();
          return;
        default:
          return;
      }
      e.preventDefault();
      this.focusPoint(g, i);
    }

    focusPoint(g, i) {
      const groups = this.pointGroups;
      const prev = groups[this.focusPos.g] && groups[this.focusPos.g][this.focusPos.i];
      if (prev) prev.setAttribute('tabindex', '-1');
      this.focusPos = { g, i };
      this.pointFocused = true;
      const el = groups[g][i];
      el.setAttribute('tabindex', '0');
      el.focus();
      this.showPointTooltip(el);
    }

    showPointTooltip(el) {
      if (!this.canvas) return;
      let tip = this.tooltipEl;
      if (!tip) {
        tip = document.createElement('div');
        tip.className = 'bdga-chart__tooltip';
        tip.setAttribute('aria-hidden', 'true');
        this.canvas.appendChild(tip);
        this.tooltipEl = tip;
      }
      tip.textContent = el.getAttribute('aria-label') || '';
      // Position relative to the canvas, centred above the mark.
      const cRect = this.canvas.getBoundingClientRect();
      const mRect = el.getBoundingClientRect();
      const left = mRect.left - cRect.left + mRect.width / 2;
      const top = mRect.top - cRect.top;
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
      tip.dataset.visible = 'true';
    }

    hidePointTooltip() {
      if (this.tooltipEl) delete this.tooltipEl.dataset.visible;
    }

    readTable() {
      if (!this.tableEl) return [];
      // Prefer the canonical data key from the <th data-bdga-key> attribute;
      // fall back to text content for backward compat with hand-written markup.
      const headerKeys = Array.from(this.tableEl.querySelectorAll('thead th')).map(
        (th) => (th.dataset && th.dataset.bdgaKey) || th.textContent.trim()
      );
      if (!this.xKey && headerKeys[0]) this.xKey = headerKeys[0];
      if (!this.yKeys.length) {
        this.yKeys = headerKeys.slice(1).filter(Boolean);
      }
      return Array.from(this.tableEl.querySelectorAll('tbody tr'))
        .slice(0, MAX_ROWS)
        .map((tr) => {
          const cells = tr.querySelectorAll('th, td');
          const row = {};
          cells.forEach((cell, i) => {
            const key = (cell.dataset && cell.dataset.bdgaKey) || headerKeys[i] || (`col_${  i}`);
            const raw =
              cell.dataset && cell.dataset.value !== undefined
                ? cell.dataset.value
                : cell.textContent;
            row[key] = raw.trim();
          });
          this.yKeys.forEach((y) => {
            const n = Number(row[y]);
            row[y] = Number.isFinite(n) ? n : 0;
          });
          row[this.xKey] = String(row[this.xKey]);
          return row;
        });
    }

    async loadFromUrl() {
      if (!this.url) return this.fail('Missing source URL');
      let url;
      try {
        url = new URL(this.url);
      } catch {
        return this.fail('Invalid URL');
      }
      if (url.protocol !== 'https:') return this.fail('Insecure URL scheme');
      if (!ALLOWED_HOSTS.includes(url.hostname)) {
        return this.fail(`Host not on allowlist: ${  url.hostname}`);
      }

      this.setStatus(Drupal.t('Loading chart data...'));

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      let payload;
      try {
        const res = await fetch(url.toString(), {
          method: 'GET',
          credentials: 'omit',
          referrerPolicy: 'no-referrer',
          mode: 'cors',
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        clearTimeout(timer);
        if (!res.ok) return this.fail(`HTTP ${  res.status}`);
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (ct.indexOf('application/json') === -1) {
          return this.fail(`Unexpected content-type: ${  ct}`);
        }
        payload = await res.json();
      } catch (err) {
        clearTimeout(timer);
        return this.fail(`Fetch failed: ${  err.message || err}`);
      }

      const rows = this.extractCkanRows(payload);
      if (!rows.length) return this.fail('No rows returned');

      // Sankey / flow: the wire shape is a list of {source, target, value}
      // rows. Build nodes + links here so the renderer path is identical
      // to JSON-mode flow charts.
      if (this.type === 'sankey' || this.type === 'flow') {
        const graph = this.buildSankeyFromRows(rows);
        if (!graph.links.length) {
          return this.fail('CKAN response had no usable source/target/value rows');
        }
        if (typeof window.d3.sankey !== 'function') {
          return this.fail('d3-sankey plugin missing');
        }
        this.nodes = graph.nodes;
        this.links = graph.links;
        this.populateFlowTable(graph.links);
        this.updateFlowTableHeaders(graph.nodes);
        this.setStatus(
          Drupal.t('Chart loaded. @count flows, @nodes nodes.', {
            '@count': graph.links.length,
            '@nodes': graph.nodes.length,
          })
        );
        return this.draw([]);
      }

      this.populateTable(rows);
      this.setStatus(
        Drupal.t('Chart loaded. @count rows.', { '@count': rows.length })
      );
      this.draw(rows);
    }

    extractCkanRows(payload) {
      // CKAN datastore_search response: { result: { records: [...] } }
      const records =
        payload && payload.result && Array.isArray(payload.result.records)
          ? payload.result.records
          : Array.isArray(payload)
            ? payload
            : [];
      const isFlow = this.type === 'sankey' || this.type === 'flow';
      const yKeySet = new Set(this.yKeys || []);
      // For flow types the y-key set is fixed; the wire shape carries a
      // single numeric column called 'value' regardless of authored y_keys.
      if (isFlow) {
        yKeySet.clear();
        yKeySet.add('value');
      }
      return records.slice(0, MAX_ROWS).map((r) => {
        const out = {};
        // Preserve EVERY column from the source record so downstream renderers
        // (e.g. lollipop's color_by:category lookup) can find non-axis fields
        // like Tier. Numeric Y columns are coerced to Number; everything
        // else (including string columns and the X key) stays as a string.
        // Objects/arrays in the record are dropped: extractCkanRows is a
        // sanitisation boundary, not a generic deep clone.
        //
        // MAX_ROWS caps row count, MAX_CELL_CHARS caps each string cell.
        // Together they bound the payload that lands in the table fallback
        // and any downstream renderer; authors should still constrain their
        // SELECT to the columns they need (Project name, Tier, etc.) rather
        // than SELECT * against a wide CKAN resource.
        Object.keys(r || {}).forEach((k) => {
          const v = r[k];
          if (v === null || v === undefined) {
            out[k] = '';
            return;
          }
          if (typeof v === 'object') {
            // Skip nested structures - we never plot them and they'd
            // serialise as "[object Object]" if cast to string.
            return;
          }
          if (yKeySet.has(k)) {
            const n = Number(v);
            out[k] = Number.isFinite(n) ? n : 0;
            return;
          }
          const s = String(v);
          out[k] = s.length > MAX_CELL_CHARS ? `${s.slice(0, MAX_CELL_CHARS)  }…` : s;
        });
        return out;
      });
    }

    /**
     * Transform a CKAN response into {nodes, links} for d3-sankey.
     *
     * Two wire shapes are supported, distinguished by the first record's
     * keys:
     *
     *  (a) Flat-row: `{source, target, value}` per row. Mirrors the
     *      server-side _bdga_chart_parse_sankey_json flat-row branch.
     *      Self-loops, non-positive values, and missing source/target
     *      are skipped.
     *
     *  (b) Wide-cascade: `{stage1, stage2, ..., stageN, value}` per row.
     *      Each row produces N-1 links chaining adjacent stages, with
     *      node ids prefixed by the column name so values that repeat
     *      across stages (e.g. "High" in 2024 and 2026) don't collapse
     *      into a single node. Null / empty cells drop that stage's
     *      adjacency rather than synthesising a placeholder node; if
     *      fewer than 2 stages survive in a row, the row contributes
     *      no links. Duplicate (source, target) pairs are summed.
     *
     * Node order in the returned array is the order ids are first seen,
     * which keeps the d3-sankey layout stable across reloads.
     */
    buildSankeyFromRows(rows) {
      if (!rows.length) return { nodes: [], links: [] };
      const first = rows[0];
      const hasFlatKeys = 'source' in first && 'target' in first && 'value' in first;
      if (hasFlatKeys) {
        return this.buildSankeyFromFlatRows(rows);
      }
      // Stage columns = every key except `value`, in insertion order.
      // CKAN preserves SELECT-clause order so this matches the SQL the
      // author wrote.
      const stageCols = Object.keys(first).filter((k) => k !== 'value');
      if (stageCols.length < 2) return { nodes: [], links: [] };
      return this.buildSankeyFromCascadeRows(rows, stageCols);
    }

    buildSankeyFromFlatRows(rows) {
      // d3-sankey is a DAG layout: it cannot render edges where source ===
      // target, and the row carries genuine signal (e.g. 12 projects whose
      // DCA rating stayed at Medium-High between 2025 and 2026). When the
      // author writes a 2-stage SQL like
      //   SELECT "DCA 2025" AS source, "DCA 2026" AS target, COUNT(*) AS value
      // the labels overlap. We pre-scan for that collision and, if it
      // occurs anywhere, auto-prefix every row's source/target with
      // generic "From: " / "To: " markers so the data survives. Authors
      // who want nicer node labels can prefix at SQL time, e.g.
      //   SELECT '2025: ' || "DCA 2025" AS source,
      //          '2026: ' || "DCA 2026" AS target,
      // in which case the pre-scan finds no collision and the labels pass
      // through untouched.
      let hasCollision = false;
      for (let i = 0; i < rows.length; i += 1) {
        const r = rows[i];
        const s = String(r.source ?? '').trim();
        const t = String(r.target ?? '').trim();
        if (s && t && s === t) {
          hasCollision = true;
          break;
        }
      }

      const seen = new Set();
      const nodes = [];
      const links = [];
      let droppedSelfLoops = 0;
      rows.forEach((r) => {
        let src = String(r.source ?? '').trim();
        let tgt = String(r.target ?? '').trim();
        const val = Number(r.value);
        if (!src || !tgt) return;
        if (!Number.isFinite(val) || val <= 0) return;
        if (hasCollision) {
          src = `From: ${  src}`;
          tgt = `To: ${  tgt}`;
        }
        if (src === tgt) {
          // Should not occur after auto-prefixing; left as a guard.
          droppedSelfLoops += 1;
          return;
        }
        [src, tgt].forEach((id) => {
          if (!seen.has(id)) {
            seen.add(id);
            nodes.push({ id });
          }
        });
        links.push({ source: src, target: tgt, value: val });
      });
      if (droppedSelfLoops && window.console) {
        window.console.warn(`[bdga-chart] ${  this.id  }: dropped ${  droppedSelfLoops  } self-loop rows`);
      }
      return { nodes, links };
    }

    buildSankeyFromCascadeRows(rows, stageCols) {
      const seen = new Set();
      const nodes = [];
      const linkMap = new Map();
      // Stage column -> integer index in author SELECT order. Captured here
      // and attached to each node so drawSankeyInternal can force the
      // d3-sankey layer assignment directly, rather than guessing stage
      // order from the order chains happen to enter the link map. Leading
      // null rows in the CKAN response would otherwise seed the first
      // non-null column as layer 0 regardless of where it semantically
      // belongs - that bug had the 2025 column rendering leftmost and the
      // 2024 column rendering rightmost.
      const stageOf = new Map(stageCols.map((c, i) => [c, i]));
      const addNode = (id, stage) => {
        if (!seen.has(id)) {
          seen.add(id);
          nodes.push({ id, stage });
        }
      };
      rows.forEach((r) => {
        const val = Number(r.value);
        if (!Number.isFinite(val) || val <= 0) return;
        // Resolve each stage label, dropping nulls/empties. The prefix
        // keeps stage-N nodes distinct from stage-M nodes when their
        // labels overlap (e.g. "High" appears in every DCA year column).
        const chain = [];
        stageCols.forEach((c) => {
          const v = r[c];
          if (v === null || v === undefined || v === '') return;
          chain.push({ id: `${c  }: ${  String(v).trim()}`, stage: stageOf.get(c) });
        });
        if (chain.length < 2) return;
        chain.forEach((step) => addNode(step.id, step.stage));
        for (let i = 0; i < chain.length - 1; i += 1) {
          const src = chain[i].id;
          const tgt = chain[i + 1].id;
          if (src === tgt) {
            // Self-loops happen when a project's rating didn't change between
            // adjacent stages. d3-sankey rejects self-edges, so we drop
            // them - they're already implied by the unchanged column
            // position in the layout.
            continue;
          }
          const key = `${src  } ${  tgt}`;
          const existing = linkMap.get(key);
          if (existing) {
            existing.value += val;
          }
          else {
            linkMap.set(key, { source: src, target: tgt, value: val });
          }
        }
      });
      return { nodes, links: Array.from(linkMap.values()) };
    }

    populateTable(rows) {
      if (!this.tableEl) return;
      const tbody = this.tableEl.querySelector('tbody');
      if (!tbody) return;
      // textContent only; no HTML.
      const frag = document.createDocumentFragment();
      rows.forEach((row) => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.textContent = row[this.xKey];
        tr.appendChild(th);
        this.yKeys.forEach((y) => {
          const td = document.createElement('td');
          td.dataset.value = String(row[y]);
          td.textContent = String(row[y]);
          tr.appendChild(td);
        });
        frag.appendChild(tr);
      });
      tbody.replaceChildren(frag);
    }

    /**
     * Sankey/flow fallback table. Three columns: source, target, value.
     * Server-side rendering already emits the matching <thead>; this only
     * fills <tbody> after a URL-mode fetch.
     */
    populateFlowTable(links) {
      if (!this.tableEl) return;
      const tbody = this.tableEl.querySelector('tbody');
      if (!tbody) return;
      const frag = document.createDocumentFragment();
      links.forEach((l) => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.textContent = String(l.source);
        tr.appendChild(th);
        const tdTarget = document.createElement('td');
        tdTarget.textContent = String(l.target);
        tr.appendChild(tdTarget);
        const tdValue = document.createElement('td');
        tdValue.dataset.value = String(l.value);
        tdValue.textContent = String(l.value);
        tr.appendChild(tdValue);
        frag.appendChild(tr);
      });
      tbody.replaceChildren(frag);
    }

    /**
     * Rewrite the source / target column headers of the fallback table
     * using prefixes detected on the nodes. Mirrors the PHP helper
     * _bdga_chart_sankey_table_labels: a clean 2-stage graph (every node
     * "prefix: label", exactly two distinct prefixes) emits its prefixes
     * as headers; anything else leaves the server-rendered defaults
     * ("From" / "To") in place. The value column is the y_label fallback
     * already baked into the template by Twig.
     *
     * Only the URL-mode path needs this - JSON-mode flow charts have
     * their headers computed server-side and rendered correctly on first
     * paint.
     */
    updateFlowTableHeaders(nodes) {
      if (!this.tableEl || !nodes || !nodes.length) return;
      const prefixes = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const id = String(nodes[i].id || '');
        const sep = id.indexOf(': ');
        if (sep === -1) return; // mixed shape - keep defaults
        const p = id.slice(0, sep);
        if (prefixes.indexOf(p) === -1) {
          prefixes.push(p);
          if (prefixes.length > 2) return; // 3+ stages - keep generic headers
        }
      }
      if (prefixes.length !== 2) return;
      const srcTh = this.tableEl.querySelector('thead [data-bdga-key="source"]');
      const tgtTh = this.tableEl.querySelector('thead [data-bdga-key="target"]');
      if (srcTh) srcTh.textContent = prefixes[0];
      if (tgtTh) tgtTh.textContent = prefixes[1];
    }

    draw(rows) {
      // Remember the inputs and the width we drew at so the ResizeObserver can
      // re-lay-out crisply on a container-width change. URL-mode reuses these
      // fetched rows on redraw - it never refetches.
      this.lastDrawData = rows;
      this.lastDrawWidth = this.canvas.clientWidth || 640;

      // Wipe any previous render and reveal the canvas to sighted users.
      this.canvas.replaceChildren();
      this.canvas.removeAttribute('aria-hidden');
      this.canvas.setAttribute('aria-hidden', 'true'); // table is the AT source.

      // Resolve palette from CSS once per draw (getComputedStyle is fast).
      this.palette = resolvePalette(this.root);

      // Build the legend on first draw (needs palette + data); the guard makes
      // it a no-op on subsequent redraws.
      this.buildLegend();

      // Reset per-draw keyboard-nav state. Renderers register their marks via
      // addPoints(); initPointNav() finalises the roving model afterwards.
      this.points = [];
      this.pointGroups = [];
      // Pattern <defs> live inside each freshly built svg, so the id cache
      // resets per draw.
      this.patternIds = new Set();

      // Apply data-domain zoom for the ordinal cartesian types. lastDrawData
      // keeps the full set (so zoom-out restores and downloads stay complete);
      // only the rows handed to the renderer are windowed.
      const drawRows = this.applicableZoom() ? this.sliceZoom(rows) : rows;

      switch (this.type) {
        case 'line':
          this.drawLine(drawRows);
          break;
        case 'pie':
          this.drawPie(drawRows);
          break;
        case 'stacked_bar':
          this.drawStackedBar(drawRows);
          break;
        case 'grouped_bar':
          this.drawGroupedBar(drawRows);
          break;
        case 'sankey':
          this.drawSankey();
          break;
        case 'flow':
          this.drawFlow();
          break;
        case 'lollipop':
          this.drawLollipop(drawRows);
          break;
        case 'cleveland':
          this.drawCleveland(drawRows);
          break;
        case 'bar':
        default:
          this.drawBar(drawRows);
          break;
      }

      this.initPointNav();
    }

    /**
     * Decide whether X-axis labels need rotation, based on category count and
     * label length. Returns null when no rotation needed (stays horizontal).
     */
    xAxisRotation(rows) {
      if (!rows || !rows.length) return null;
      const labels = rows.map((r) => String(r[this.xKey] || ''));
      const maxLen = labels.reduce((acc, s) => Math.max(acc, s.length), 0);
      const count = labels.length;
      // Heuristic: rotate if too many categories OR any label is long enough
      // to collide with neighbours.
      if (count > 6 || maxLen > 14) return -30;
      return null;
    }

    /**
     * Bottom margin grows when labels are rotated, to leave room for the
     * angled text without clipping. Extra space is also reserved for the
     * axis title text emitted by drawAxisLabels: ~22px below the X axis,
     * ~24px to the left of the Y axis when those titles are present.
     */
    dims(rows) {
      const w = this.canvas.clientWidth || 640;
      const h = Math.min(Math.max(w * 0.5, 280), 480);
      const rotation = this.xAxisRotation(rows);
      const maxLen = rows
        ? rows.reduce((acc, r) => Math.max(acc, String(r[this.xKey] || '').length), 0)
        : 0;
      const xLabelExtra = this.xLabel ? 22 : 0;
      const yLabelExtra = this.yLabel ? 24 : 0;
      const bottom = (rotation
        ? Math.min(48 + Math.ceil(maxLen * 4.2), 160)
        : 48) + xLabelExtra;
      return {
        w,
        h: rotation ? h + (bottom - 48 - xLabelExtra) + xLabelExtra : h + xLabelExtra,
        m: { top: 16, right: 24, bottom, left: 56 + yLabelExtra },
        rotation,
      };
    }

    /**
     * Append the X and Y axis title text to an SVG root. Called by every chart
     * type that has axes (pie skips this). Reads this.xLabel / this.yLabel set
     * in the constructor; empty strings render nothing. Classes drive font /
     * fill via chart.css; no inline styling here.
     */
    drawAxisLabels(svg, w, h, m) {
      if (this.xLabel) {
        svg
          .append('text')
          .attr('class', 'bdga-chart__axis-label bdga-chart__axis-label--x')
          .attr('x', m.left + (w - m.left - m.right) / 2)
          .attr('y', h - 6)
          .attr('text-anchor', 'middle')
          .text(this.xLabel);
      }
      if (this.yLabel) {
        // Rotated -90deg around (0,0); x/y are in the rotated frame, so x is
        // the vertical position (negated) and y is the horizontal position.
        svg
          .append('text')
          .attr('class', 'bdga-chart__axis-label bdga-chart__axis-label--y')
          .attr('transform', 'rotate(-90)')
          .attr('x', -(m.top + (h - m.top - m.bottom) / 2))
          .attr('y', 14)
          .attr('text-anchor', 'middle')
          .text(this.yLabel);
      }
    }

    /**
     * Apply rotation to the tick labels on the last-rendered X axis group.
     * Truncates labels longer than 28 chars with an ellipsis, keeping the
     * full text in a <title> child so screen-reader / hover users see all.
     */
    rotateXLabels(svg, rotation) {
      if (!rotation) return;
      const ticks = svg.selectAll('g.tick text').nodes();
      ticks.forEach((t) => {
        const full = t.textContent;
        if (full.length > 28) {
          t.textContent = `${full.slice(0, 27)  }…`;
          const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          title.textContent = full;
          t.parentNode.appendChild(title);
        }
        t.setAttribute('text-anchor', 'end');
        t.setAttribute('transform', `translate(-8,4) rotate(${  rotation  })`);
      });
    }

    svgRoot(w, h) {
      return window.d3
        .select(this.canvas)
        .append('svg')
        .attr('viewBox', `0 0 ${  w  } ${  h}`)
        .attr('role', 'presentation')
        .attr('focusable', 'false');
    }

    drawBar(rows) {
      const d3 = window.d3;
      const { w, h, m, rotation } = this.dims(rows);
      const svg = this.svgRoot(w, h);
      const yKey = this.yKeys[0];

      const x = d3
        .scaleBand()
        .domain(rows.map((r) => r[this.xKey]))
        .range([m.left, w - m.right])
        .padding(0.15);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(rows, (r) => r[yKey]) || 1])
        .nice()
        .range([h - m.bottom, m.top]);

      const xAxis = svg
        .append('g')
        .attr('transform', `translate(0,${  h - m.bottom  })`)
        .call(d3.axisBottom(x));
      svg.append('g').attr('transform', `translate(${  m.left  },0)`).call(d3.axisLeft(y));
      this.rotateXLabels(xAxis, rotation);

      // Single-series bar charts default to one colour (palette.single) per
      // IBM Carbon convention: for time-series bars the colour carries no
      // information and rainbow bars are visual noise. Authors opt into
      // per-category colouring via field_bdga_p_chart_color_by when the X
      // axis is categorical (e.g. agency types) and colour reinforces the
      // distinction between bars.
      const colorByCategory = this.colorBy === 'category' && this.yKeys.length === 1;
      const palette = this.palette;
      const barFill = colorByCategory
        ? (_d, i) =>
            i < palette.categorical.length
              ? palette.categorical[i]
              : shadeSequential(palette, i, rows.length)
        : palette.single;

      const bars = svg
        .append('g')
        .selectAll('rect')
        .data(rows)
        .join('rect')
        .attr('x', (d) => x(d[this.xKey]))
        .attr('y', (d) => y(d[yKey]))
        .attr('width', x.bandwidth())
        .attr('height', (d) => y(0) - y(d[yKey]))
        .attr('fill', barFill);

      this.addPoints(
        this.yLabel || yKey,
        bars.nodes().map((el) => {
          const d = d3.select(el).datum();
          return { el, xVal: d[this.xKey], value: d[yKey] };
        })
      );

      this.drawAxisLabels(svg, w, h, m);
    }

    /**
     * Grouped bar chart - multiple Y series rendered side-by-side within each
     * X category. Uses two d3.scaleBand instances (outer for categories,
     * inner for series). Single-series data degenerates cleanly to one bar
     * per category, matching drawBar.
     */
    drawGroupedBar(rows) {
      const d3 = window.d3;
      const { w, h, m, rotation } = this.dims(rows);
      const svg = this.svgRoot(w, h);
      // Only the visible series are plotted; colours stay keyed to the full
      // y-key list so a series keeps its colour when others are toggled off.
      const keys = this.visibleKeys();

      const x0 = d3
        .scaleBand()
        .domain(rows.map((r) => r[this.xKey]))
        .range([m.left, w - m.right])
        .paddingInner(0.2);

      const x1 = d3
        .scaleBand()
        .domain(keys)
        .range([0, x0.bandwidth()])
        .padding(0.05);

      const yMax = d3.max(rows, (r) => d3.max(keys, (k) => r[k])) || 1;
      const y = d3.scaleLinear().domain([0, yMax]).nice().range([h - m.bottom, m.top]);

      // Same palette policy as stacked bar: categorical in order, sequential
      // fallback when series count exceeds the palette.
      const useSequential = this.yKeys.length > this.palette.categorical.length;
      const palette = this.palette;
      const color = useSequential
        ? (key) => shadeSequential(palette, this.yKeys.indexOf(key), this.yKeys.length)
        : d3.scaleOrdinal().domain(this.yKeys).range(palette.categorical);

      const xAxis = svg
        .append('g')
        .attr('transform', `translate(0,${  h - m.bottom  })`)
        .call(d3.axisBottom(x0));
      svg.append('g').attr('transform', `translate(${  m.left  },0)`).call(d3.axisLeft(y));
      this.rotateXLabels(xAxis, rotation);

      const groupRects = svg
        .append('g')
        .selectAll('g')
        .data(rows)
        .join('g')
        .attr('transform', (d) => `translate(${  x0(d[this.xKey])  },0)`)
        .selectAll('rect')
        .data((d) => keys.map((key) => ({ key, value: +d[key] || 0 })))
        .join('rect')
        .attr('x', (d) => x1(d.key))
        .attr('y', (d) => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', (d) => y(0) - y(d.value))
        .attr('data-bdga-series', (d) => d.key)
        .attr('fill', (d) => this.fillFor(svg, this.yKeys.indexOf(d.key), color(d.key)));

      // Register one navigable group per visible series. The inner rect's datum
      // is { key, value }; its parent <g> holds the row, so the category label
      // comes from the parent's datum.
      const groupRectNodes = groupRects.nodes();
      keys.forEach((key) => {
        const entries = groupRectNodes
          .map((el) => ({ el, d: d3.select(el).datum(), row: d3.select(el.parentNode).datum() }))
          .filter((o) => o.d.key === key)
          .map((o) => ({ el: o.el, xVal: o.row[this.xKey], value: o.d.value }));
        this.addPoints(key, entries);
      });

      this.drawAxisLabels(svg, w, h, m);
    }

    drawStackedBar(rows) {
      const d3 = window.d3;
      const { w, h, m, rotation } = this.dims(rows);
      const svg = this.svgRoot(w, h);
      // Stack only the visible series; the stack re-bases from zero so hiding a
      // series cleanly removes its band.
      const series = d3.stack().keys(this.visibleKeys())(rows);

      const x = d3
        .scaleBand()
        .domain(rows.map((r) => r[this.xKey]))
        .range([m.left, w - m.right])
        .padding(0.15);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(series, (s) => d3.max(s, (d) => d[1])) || 1])
        .nice()
        .range([h - m.bottom, m.top]);
      // Multi-series stacked bar: categorical palette in order. If the chart
      // has more series than palette colours, switch to sequential shades of
      // Dark blue to keep adjacent series distinguishable.
      const useSequential = this.yKeys.length > this.palette.categorical.length;
      const palette = this.palette;
      const color = useSequential
        ? (key) => shadeSequential(palette, this.yKeys.indexOf(key), this.yKeys.length)
        : d3.scaleOrdinal().domain(this.yKeys).range(palette.categorical);

      const xAxis = svg
        .append('g')
        .attr('transform', `translate(0,${  h - m.bottom  })`)
        .call(d3.axisBottom(x));
      svg.append('g').attr('transform', `translate(${  m.left  },0)`).call(d3.axisLeft(y));
      this.rotateXLabels(xAxis, rotation);

      const stackRects = svg
        .append('g')
        .selectAll('g')
        .data(series)
        .join('g')
        .attr('fill', (s) => this.fillFor(svg, this.yKeys.indexOf(s.key), color(s.key)))
        .attr('data-bdga-series', (s) => s.key)
        .selectAll('rect')
        .data((s) => s)
        .join('rect')
        .attr('x', (d) => x(d.data[this.xKey]))
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) => y(d[0]) - y(d[1]))
        .attr('width', x.bandwidth());

      // Register one navigable group per visible series. The series key is on
      // the parent <g> (data-bdga-series); each rect's datum carries the row in
      // d.data, so the un-stacked value is d.data[key].
      const byKey = new Map();
      stackRects.nodes().forEach((el) => {
        const sKey = el.parentNode.getAttribute('data-bdga-series');
        const d = d3.select(el).datum();
        if (!byKey.has(sKey)) byKey.set(sKey, []);
        byKey.get(sKey).push({ el, xVal: d.data[this.xKey], value: d.data[sKey] });
      });
      // Register top-to-bottom so the arrow-key direction matches the stack:
      // d3.stack puts the first key at the BOTTOM, so the last visible key is
      // the topmost band. Registering it as group 0 means ArrowUp (g-1) moves
      // to the band that is visually higher, ArrowDown to the one below.
      this.visibleKeys()
        .slice()
        .reverse()
        .forEach((key) => {
          if (byKey.has(key)) this.addPoints(key, byKey.get(key));
        });

      this.drawAxisLabels(svg, w, h, m);
    }

    /**
     * Line chart. Single-series stays one line in the primary colour; with two
     * or more y_keys it becomes a multi-series line chart where each series has
     * its own colour, a distinct marker shape (a colour-blind-safe redundant
     * cue), and a direct end-of-line label so the chart is readable without the
     * legend (UK Gov: "label lines directly"). Each series registers as its own
     * keyboard-nav group, so Up/Down move between series.
     */
    drawLine(rows) {
      const d3 = window.d3;
      const keys = this.visibleKeys();
      const multi = this.yKeys.length > 1;
      const dims = this.dims(rows);
      const { w, h, rotation } = dims;
      const m = Object.assign({}, dims.m);
      // Reserve right-margin room for the end-of-line labels when multi-series.
      if (multi) {
        const longest = keys.reduce((a, k) => Math.max(a, String(k).length), 0);
        m.right = Math.max(m.right, Math.min(160, 16 + longest * 7));
      }
      const svg = this.svgRoot(w, h);

      const x = d3
        .scalePoint()
        .domain(rows.map((r) => r[this.xKey]))
        .range([m.left, w - m.right]);
      const yMax = d3.max(rows, (r) => d3.max(keys, (k) => +r[k] || 0)) || 1;
      const y = d3.scaleLinear().domain([0, yMax]).nice().range([h - m.bottom, m.top]);

      const xAxis = svg
        .append('g')
        .attr('transform', `translate(0,${  h - m.bottom  })`)
        .call(d3.axisBottom(x));
      svg.append('g').attr('transform', `translate(${  m.left  },0)`).call(d3.axisLeft(y));
      this.rotateXLabels(xAxis, rotation);

      const palette = this.palette;
      const SYMBOLS = [
        d3.symbolCircle, d3.symbolSquare, d3.symbolTriangle,
        d3.symbolDiamond, d3.symbolStar, d3.symbolCross, d3.symbolWye,
      ];
      // Colour and marker shape key off the ORIGINAL series index so a series
      // keeps both when others are toggled off.
      const idxOf = (key) => this.yKeys.indexOf(key);
      const colorFor = (key) => {
        if (!multi) return palette.single;
        const i = idxOf(key);
        return i < palette.categorical.length ? palette.categorical[i] : shadeSequential(palette, i, this.yKeys.length);
      };
      const symbolFor = (key) => d3.symbol().type(SYMBOLS[idxOf(key) % SYMBOLS.length]).size(70)();

      keys.forEach((key) => {
        const color = colorFor(key);
        const g = svg.append('g').attr('data-bdga-series', key);
        const lineGen = d3.line().x((d) => x(d[this.xKey])).y((d) => y(+d[key] || 0));
        g.append('path')
          .attr('class', 'bdga-chart__line')
          .datum(rows)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 2)
          .attr('d', lineGen);
        const markers = g
          .selectAll('path.bdga-chart__line-marker')
          .data(rows)
          .join('path')
          .attr('class', 'bdga-chart__line-marker')
          .attr('transform', (d) => `translate(${x(d[this.xKey])},${y(+d[key] || 0)})`)
          .attr('d', symbolFor(key))
          .attr('fill', color);

        // Direct end-of-line label (multi-series only); single-series is named
        // by the Y axis already.
        if (multi && rows.length) {
          const last = rows[rows.length - 1];
          g.append('text')
            .attr('class', 'bdga-chart__line-label')
            .attr('x', x(last[this.xKey]) + 6)
            .attr('y', y(+last[key] || 0))
            .attr('dy', '0.32em')
            .attr('fill', color)
            .text(key);
        }

        this.addPoints(
          multi ? key : (this.yLabel || key),
          markers.nodes().map((el) => {
            const d = d3.select(el).datum();
            return { el, xVal: d[this.xKey], value: +d[key] || 0 };
          })
        );
      });

      this.drawAxisLabels(svg, w, h, m);
    }

    drawPie(rows) {
      const d3 = window.d3;
      const { w, h } = this.dims(null);
      const svg = this.svgRoot(w, h);
      const yKey = this.yKeys[0];
      // Reserve an outer ring for the direct slice labels (so each slice is
      // identifiable without the legend); shrink the slice radius to fit them.
      const r = Math.max(48, Math.min(w, h) / 2 - 72);

      const g = svg.append('g').attr('transform', `translate(${  w / 2  },${  h / 2  })`);
      // Pie slices are categorical: colour by ORIGINAL slice index (over the
      // full row set) so a slice keeps its colour when others are toggled off.
      // The pie layout itself runs over only the visible rows so the remaining
      // slices re-fill the circle.
      const palette = this.palette;
      const total = rows.length;
      const colorByKey = new Map();
      const idxByKey = new Map();
      rows.forEach((d, i) => {
        const k = String(d[this.xKey]);
        idxByKey.set(k, i);
        colorByKey.set(
          k,
          total <= palette.categorical.length ? palette.categorical[i] : shadeSequential(palette, i, total)
        );
      });
      const visible = rows.filter((d) => !this.hidden.has(String(d[this.xKey])));
      const sum = visible.reduce((a, d) => a + (Number(d[yKey]) || 0), 0) || 1;
      const pie = d3.pie().value((d) => d[yKey]);
      const arc = d3.arc().innerRadius(0).outerRadius(r);
      const arcs = pie(visible);

      const slices = g
        .selectAll('path.bdga-chart__pie-slice')
        .data(arcs)
        .join('path')
        .attr('class', 'bdga-chart__pie-slice')
        .attr('d', arc)
        .attr('data-bdga-series', (d) => String(d.data[this.xKey]))
        .attr('fill', (d) => {
          const k = String(d.data[this.xKey]);
          return this.fillFor(svg, idxByKey.get(k) || 0, colorByKey.get(k) || palette.single);
        })
        .attr('stroke', 'var(--ct-color-background, #fff)')
        .attr('stroke-width', 2);

      // Direct slice labels with leader lines, outside the pie (Carbon callout
      // style), so the chart reads without the legend. Decorative for AT - the
      // slice path carries the accessible label - so the label group is hidden.
      const labelArc = d3.arc().innerRadius(r + 6).outerRadius(r + 6);
      const mid = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;
      const labels = g.append('g').attr('class', 'bdga-chart__pie-labels').attr('aria-hidden', 'true');
      arcs.forEach((d) => {
        const right = mid(d) < Math.PI;
        const elbow = labelArc.centroid(d);
        const end = [(r + 28) * (right ? 1 : -1), elbow[1]];
        labels
          .append('polyline')
          .attr('class', 'bdga-chart__pie-leader')
          .attr('points', [arc.centroid(d), elbow, end].map((p) => p.join(',')).join(' '));
        const pct = Math.round(((Number(d.data[yKey]) || 0) / sum) * 100);
        labels
          .append('text')
          .attr('class', 'bdga-chart__pie-label')
          .attr('x', end[0] + (right ? 4 : -4))
          .attr('y', end[1])
          .attr('dy', '0.32em')
          .attr('text-anchor', right ? 'start' : 'end')
          .text(`${d.data[this.xKey]} (${pct}%)`);
      });

      // Slices are one navigable group; the label carries the share of the
      // whole so a screen-reader user gets the same insight a sighted user
      // reads off the wedge size.
      this.addPoints(
        null,
        slices.nodes().map((el) => {
          const d = d3.select(el).datum();
          const pct = Math.round(((Number(d.data[yKey]) || 0) / sum) * 100);
          return {
            el,
            label: Drupal.t('@x: @v, @p% of total', {
              '@x': d.data[this.xKey],
              '@v': this.formatValue(d.data[yKey]),
              '@p': pct,
            }),
          };
        })
      );
    }

    /**
     * Lollipop chart - one stem-and-dot per category. Reuses drawLine's
     * scalePoint + circle pattern but skips the connecting path. Categories
     * are coloured by the categorical palette when color_by:category is set
     * (e.g. tier colouring for the MDPR per-project view); otherwise every
     * dot is the single primary colour.
     *
     * Optional median reference line driven by this.medianValue (computed
     * server-side in chart_postprocess.inc).
     */
    drawLollipop(rows) {
      const d3 = window.d3;
      const { w, h, m, rotation } = this.dims(rows);
      const svg = this.svgRoot(w, h);
      const yKey = this.yKeys[0];

      const x = d3
        .scalePoint()
        .domain(rows.map((r) => r[this.xKey]))
        .range([m.left, w - m.right])
        .padding(0.5);
      const yMax = d3.max(rows, (r) => r[yKey]) || 1;
      const y = d3
        .scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([h - m.bottom, m.top]);

      const xAxis = svg
        .append('g')
        .attr('transform', `translate(0,${  h - m.bottom  })`)
        .call(d3.axisBottom(x));
      svg.append('g').attr('transform', `translate(${  m.left  },0)`).call(d3.axisLeft(y));
      this.rotateXLabels(xAxis, rotation);

      // For lollipop the category column is conventionally a non-yKey label
      // such as "Tier"; we use it when color_by:category is enabled. With
      // no category column the chart falls back to the single primary
      // colour, which matches the MDPR figure caption "coloured by tier".
      const palette = this.palette;
      const categoryKey = (rows[0] && Object.keys(rows[0]).find((k) =>
        k !== this.xKey && k !== yKey && typeof rows[0][k] === 'string'
      )) || null;
      const categories = categoryKey
        ? Array.from(new Set(rows.map((r) => r[categoryKey])))
        : [];
      const categoryColor = categoryKey
        ? d3.scaleOrdinal().domain(categories).range(palette.categorical)
        : null;
      const dotColor = (d) => {
        if (this.colorBy === 'category' && categoryKey) {
          return categoryColor(d[categoryKey]);
        }
        return palette.single;
      };

      const stems = svg.append('g').attr('class', 'bdga-chart__lollipop-stems');
      stems
        .selectAll('line')
        .data(rows)
        .join('line')
        .attr('class', 'bdga-chart__lollipop-stem')
        .attr('x1', (d) => x(d[this.xKey]))
        .attr('x2', (d) => x(d[this.xKey]))
        .attr('y1', y(0))
        .attr('y2', (d) => y(d[yKey]));

      const dots = svg
        .append('g')
        .selectAll('circle')
        .data(rows)
        .join('circle')
        .attr('class', 'bdga-chart__lollipop-dot')
        .attr('cx', (d) => x(d[this.xKey]))
        .attr('cy', (d) => y(d[yKey]))
        .attr('r', 4)
        .attr('fill', dotColor);
      dots.append('title').text((d) => `${d[this.xKey]  }: ${  d[yKey]}`);
      this.addPoints(
        this.yLabel || yKey,
        dots.nodes().map((el) => {
          const d = d3.select(el).datum();
          return { el, xVal: d[this.xKey], value: d[yKey] };
        })
      );

      // Median reference line, drawn last so it sits above the stems.
      if (this.medianValue !== null && this.medianValue > 0) {
        const yPos = y(this.medianValue);
        svg
          .append('line')
          .attr('class', 'bdga-chart__lollipop-median')
          .attr('x1', m.left)
          .attr('x2', w - m.right)
          .attr('y1', yPos)
          .attr('y2', yPos);
        svg
          .append('text')
          .attr('class', 'bdga-chart__lollipop-median-label')
          .attr('x', w - m.right)
          .attr('y', yPos - 4)
          .attr('text-anchor', 'end')
          .text(Drupal.t('Median @v', { '@v': this.medianValue.toLocaleString() }));
      }

      this.drawAxisLabels(svg, w, h, m);
    }

    /**
     * Truncate the tick labels on a (vertical) axis group to fit a pixel
     * budget, keeping the full text in a <title> child for screen-reader and
     * hover users. Used by the Cleveland plot where category names (e.g. long
     * portfolio titles) would otherwise overrun the left margin.
     */
    truncateTickLabels(axisSel, pxBudget) {
      const maxChars = Math.max(6, Math.floor(pxBudget / 6.5));
      axisSel.selectAll('g.tick text').nodes().forEach((t) => {
        const full = t.textContent;
        if (full.length > maxChars) {
          t.textContent = `${full.slice(0, maxChars - 1)}…`;
          const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          title.textContent = full;
          t.parentNode.appendChild(title);
        }
      });
    }

    /**
     * Cleveland dot plot - one row per category with two dots (the two
     * y-series) joined by a connector, so the reader scans year-on-year change
     * down the column. Categories run down the Y axis and the value runs along
     * the X axis; the horizontal layout keeps long category labels readable and
     * the chart usable on narrow screens, where a 16-category grouped bar would
     * be unreadable. Needs exactly two y_keys. The connecting line carries the
     * magnitude of change without a separate annotation.
     */
    drawCleveland(rows) {
      const d3 = window.d3;
      const palette = this.palette;
      const keys = (this.yKeys || []).slice(0, 2);
      if (keys.length < 2) return this.fail('Cleveland dot plot needs two y_keys');
      const w = this.canvas.clientWidth || 640;

      // Reserve left room for the category labels - up to ~38% of the canvas,
      // truncating longer names (full text stays in the dot titles + the data
      // table). Narrow containers get a smaller budget so the plot keeps a
      // usable value axis.
      const labels = rows.map((r) => String(r[this.xKey] != null ? r[this.xKey] : ''));
      const longest = labels.reduce((a, s) => Math.max(a, s.length), 0);
      const labelBudget = Math.min(Math.round(w * 0.38), Math.max(72, Math.round(longest * 6.5)));
      const m = { top: 44, right: 28, bottom: 44, left: labelBudget + 12 };

      // Height grows with the number of categories so rows never crowd.
      const rowH = 26;
      const h = m.top + m.bottom + Math.max(1, rows.length) * rowH;
      const svg = this.svgRoot(w, h);

      const y = d3
        .scaleBand()
        .domain(labels)
        .range([m.top, h - m.bottom])
        .padding(0.45);
      const xMax = d3.max(rows, (r) => Math.max(...keys.map((k) => Number(r[k]) || 0))) || 1;
      const x = d3
        .scaleLinear()
        .domain([0, xMax])
        .nice()
        .range([m.left, w - m.right]);

      svg
        .append('g')
        .attr('transform', `translate(0,${h - m.bottom})`)
        .call(d3.axisBottom(x).ticks(Math.min(8, xMax)).tickFormat(d3.format('d')));
      const yAxis = svg
        .append('g')
        .attr('transform', `translate(${m.left},0)`)
        .call(d3.axisLeft(y));
      this.truncateTickLabels(yAxis, labelBudget);

      const colorA = palette.categorical[0];
      const colorB = palette.categorical[1];
      const cy = (d) => y(String(d[this.xKey] != null ? d[this.xKey] : '')) + y.bandwidth() / 2;

      const rowG = svg
        .append('g')
        .selectAll('g')
        .data(rows)
        .join('g')
        .attr('class', 'bdga-chart__cleveland-row')
        .attr('tabindex', '0')
        .attr('role', 'img')
        .attr('aria-label', (d) => `${d[this.xKey]}: ${keys[0]} ${d[keys[0]]}, ${keys[1]} ${d[keys[1]]}`);

      rowG
        .append('line')
        .attr('class', 'bdga-chart__cleveland-connector')
        .attr('x1', (d) => x(Number(d[keys[0]]) || 0))
        .attr('x2', (d) => x(Number(d[keys[1]]) || 0))
        .attr('y1', cy)
        .attr('y2', cy);

      keys.forEach((k, i) => {
        rowG
          .append('circle')
          .attr('class', `bdga-chart__cleveland-dot bdga-chart__cleveland-dot--${i + 1}`)
          .attr('cx', (d) => x(Number(d[k]) || 0))
          .attr('cy', cy)
          .attr('r', 5)
          .attr('fill', i === 0 ? colorA : colorB)
          .append('title')
          .text((d) => `${d[this.xKey]} - ${k}: ${d[k]}`);
      });

      // Inline legend: one swatch per series, above the plot area.
      const legend = svg
        .append('g')
        .attr('class', 'bdga-chart__cleveland-legend')
        .attr('transform', `translate(${m.left},22)`);
      keys.forEach((k, i) => {
        const g = legend.append('g').attr('transform', `translate(${i * 96},0)`);
        g.append('circle').attr('r', 5).attr('cx', 5).attr('cy', -4).attr('fill', i === 0 ? colorA : colorB);
        g.append('text').attr('class', 'bdga-chart__cleveland-legend-label').attr('x', 16).attr('y', 0).text(k);
      });

      this.drawAxisLabels(svg, w, h, m);

      // The row groups are already focusable (tabindex=0) and labelled, but
      // draw() left the canvas aria-hidden, so AT could not reach them. Expose
      // the plot the same way the point-nav charts do. Cleveland uses one tab
      // stop per row (no roving arrow model), so the hint says "Tab".
      this.exposePlot(Drupal.t('Tab to each row for its values.'));
    }

    /**
     * Internal: render a sankey diagram for the given alignment.
     *
     * Colour model:
     *  - When every node id is prefixed (e.g. "2025: High", "From: X"),
     *    nodes are grouped by the suffix and each unique group is assigned
     *    a colour from palette.sequential. The same rating in every year
     *    column then renders in the same shade, matching the MDPR Fig 18
     *    style.
     *  - Without prefixes the renderer falls back to per-index categorical
     *    colouring (rainbow), which is the right answer for ad-hoc graphs
     *    where node ids carry no ordinal structure.
     *  - Link strokes inherit the source node's group colour. The CSS rule
     *    must NOT declare a stroke colour for .bdga-chart__sankey-link, or
     *    it would beat this presentation attribute on specificity and
     *    flatten every link to one hue.
     *
     * Label model:
     *  - One column header per d3-sankey depth, drawn above the column
     *    using the shared prefix (e.g. "2025"). Skipped if column nodes
     *    don't share a prefix.
     *  - Node labels show only the suffix (the rating), with text
     *    anchored outside the chart for the leftmost / rightmost columns
     *    and above the rect for middle columns to avoid overlapping the
     *    link bundles.
     *
     * d3-sankey mutates its input nodes/links in place; we shallow-clone so
     * a re-draw on resize doesn't double-mutate the originals.
     */
    drawSankeyInternal(alignFn) {
      const d3 = window.d3;
      const w = this.canvas.clientWidth || 640;
      const h = Math.min(Math.max(w * 0.55, 320), 520);
      // Side margins reserve room for the leftmost / rightmost node labels and
      // the column headers. They are CSS-var knobs switched by the @container
      // queries in chart.scss: ~140px on wide containers, tightened on narrow
      // ones (mobile, sidebars) so the columns still fit. Authors can override.
      const c = this.canvas;
      let side = cssNum(c, '--bdga-chart-sankey-margin-x', 140);
      // Hard floor independent of the knobs: never let the two columns overlap.
      // Guarantees a positive plot area even if an author sets a large margin
      // on a very narrow embed, or the container query hasn't matched yet.
      const MIN_PLOT = 80;
      if (w - side * 2 < MIN_PLOT) {
        side = Math.max(8, Math.floor((w - MIN_PLOT) / 2));
      }
      const m = {
        top: cssNum(c, '--bdga-chart-sankey-margin-top', 60),
        right: side,
        bottom: cssNum(c, '--bdga-chart-sankey-margin-bottom', 10),
        left: side,
      };
      // 'outside' places the edge-column labels left of / right of their rects
      // (needs the wide side margins above); 'stacked' places every label above
      // its rect so narrow containers don't clip the edges. Switched by the
      // @container queries in chart.scss.
      const stackedLabels = cssVar(c, '--bdga-chart-sankey-label-mode', 'outside') !== 'outside';
      const svg = this.svgRoot(w, h);

      // Split node ids into {prefix, label}. For an id "2025: High" the
      // prefix is "2025" and the label is "High"; for an id with no ": "
      // separator the prefix is "" and the label is the whole id. We pre-
      // compute this on the un-laid-out nodes so the d3-sankey nodeSort
      // and nodeAlign callbacks (which fire during layout) can see labels.
      const split = (id) => {
        const idx = id.indexOf(': ');
        return idx >= 0 ? { prefix: id.slice(0, idx), label: id.slice(idx + 2) } : { prefix: '', label: id };
      };
      const meta = new Map();
      this.nodes.forEach((n) => meta.set(n.id, split(n.id)));
      const allPrefixed = this.nodes.every((n) => meta.get(n.id).prefix !== '');

      // Stage index per prefix. Two sources, in order of trust:
      //   1. node.stage attached by buildSankeyFromCascadeRows. The
      //      cascade builder knows the column order from stageCols, so
      //      this is the canonical answer for URL-mode flow charts and
      //      it's independent of which row happens to be first non-null.
      //   2. Encounter order on input nodes. For JSON-mode authors who
      //      hand-write a node array in stage order, this still produces
      //      the right layout.
      const stageIndex = new Map();
      this.nodes.forEach((n) => {
        const p = meta.get(n.id).prefix;
        if (!p) return;
        if (typeof n.stage === 'number' && !stageIndex.has(p)) {
          stageIndex.set(p, n.stage);
        }
      });
      this.nodes.forEach((n) => {
        const p = meta.get(n.id).prefix;
        if (p && !stageIndex.has(p)) {
          stageIndex.set(p, stageIndex.size);
        }
      });

      // Custom alignment: when every node has a known prefix, force each
      // into its stage's column regardless of upstream connectivity. This
      // fixes the case where a row like {y1: null, y2: 'X', y3: 'Y'}
      // produces a y2 node with no incoming link - d3-sankey's default
      // justify alignment would demote it to column 0 and mix prefixes,
      // which blanks out the column header logic below. Fall back to the
      // requested alignment (justify by default) for unprefixed graphs.
      const fallbackAlign = alignFn || d3.sankeyJustify;
      const customAlign = allPrefixed && stageIndex.size >= 2
        ? (node, n) => {
            if (typeof node.stage === 'number') return node.stage;
            const p = meta.get(node.id).prefix;
            const i = stageIndex.get(p);
            return i !== undefined ? i : fallbackAlign(node, n);
          }
        : fallbackAlign;

      const sankeyGen = d3
        .sankey()
        .nodeId((d) => d.id)
        .nodeAlign(customAlign)
        .nodeWidth(14)
        .nodePadding(12)
        .extent([
          [m.left, m.top],
          [w - m.right, h - m.bottom],
        ])
        // Vertical order within each column: rank known ordinals (High at
        // the top, Not Reported at the bottom) and leave unknown labels
        // in encounter order. Passing null would disable d3-sankey's own
        // crossing-minimisation entirely; this comparator only reshuffles
        // among the ranked labels.
        .nodeSort((a, b) => compareByRank(meta.get(a.id).label, meta.get(b.id).label));

      const nodes = this.nodes.map((n) => Object.assign({}, n));
      const links = this.links.map((l) => Object.assign({}, l));
      const graph = sankeyGen({ nodes, links });

      const palette = this.palette;
      // Muted neutral for "Not reported" / "Unable to rate" so they fall
      // off the rank ramp visually. Comes from a sankey-specific CSS
      // variable so themes can tune it without touching the JS.
      const mutedColour = cssVar(this.root, '--bdga-chart-sankey-muted', '#a8a8a8');
      let colourForNode;
      if (allPrefixed) {
        // Collect the unique suffixes in encounter order, then sort them
        // by ordinal rank so known categories (High..Not Reported) own
        // the head of the sequential ramp and pick up the darkest shades.
        // Unknown labels keep encounter order and fill the tail. Ranks
        // 5+ (Not reported / Unable to rate) are pulled out of the ramp
        // and rendered as muted grey, matching the MDPR Fig 18 treatment
        // where reporting gaps read as desaturated.
        const isMutedLabel = (label) => {
          const r = rankOf(label);
          return r !== null && r >= 5;
        };
        const seen = new Set();
        const encounterOrder = [];
        graph.nodes.forEach((n) => {
          const key = meta.get(n.id).label;
          if (!seen.has(key) && !isMutedLabel(key)) {
            seen.add(key);
            encounterOrder.push(key);
          }
        });
        const ordered = encounterOrder.slice().sort(compareByRank);
        const groupIndex = new Map();
        ordered.forEach((key, i) => groupIndex.set(key, i));
        const totalGroups = ordered.length;
        colourForNode = (n) => {
          const label = meta.get(n.id).label;
          if (isMutedLabel(label)) return mutedColour;
          const i = groupIndex.get(label);
          if (i === undefined) return palette.single;
          return i < palette.sequential.length
            ? palette.sequential[i]
            : shadeSequential(palette, i, totalGroups);
        };
      }
      else {
        colourForNode = (n, i) =>
          i < palette.categorical.length
            ? palette.categorical[i]
            : shadeSequential(palette, i, graph.nodes.length);
      }

      const colorByNode = new Map();
      graph.nodes.forEach((n, i) => colorByNode.set(n.id, colourForNode(n, i)));

      // Column headers: one per d.layer (the column index actually set
      // by nodeAlign), positioned above the column's first node. Skip
      // when nodes in the column don't share a prefix. Note that d.depth
      // is the topological longest-path distance from a source, which
      // is NOT the column for graphs with leading-null cascades; we
      // must read d.layer here or 2024 would land in the wrong slot.
      const headers = new Map();
      graph.nodes.forEach((n) => {
        const p = meta.get(n.id).prefix;
        if (!p) return;
        if (!headers.has(n.layer)) {
          headers.set(n.layer, { x: (n.x0 + n.x1) / 2, prefix: p });
        }
        else if (headers.get(n.layer).prefix !== p) {
          // Mixed prefixes in a column - leave the header off rather
          // than guess. Marker '' tells the render step to skip.
          headers.set(n.layer, { x: 0, prefix: '' });
        }
      });
      // Column headers and link bands are decorative for AT: the per-node
      // labels (added below) carry the meaning, so hide these to avoid noise.
      const headerGroup = svg.append('g').attr('aria-hidden', 'true');
      headers.forEach((meta_) => {
        if (!meta_.prefix) return;
        headerGroup
          .append('text')
          .attr('class', 'bdga-chart__sankey-column-header')
          .attr('x', meta_.x)
          .attr('y', m.top - 20)
          .attr('text-anchor', 'middle')
          .text(meta_.prefix);
      });

      // Links underneath the node rects so they appear to plug in.
      const linkGroup = svg.append('g').attr('fill', 'none').attr('aria-hidden', 'true');
      linkGroup
        .selectAll('path')
        .data(graph.links)
        .join('path')
        .attr('class', 'bdga-chart__sankey-link')
        .attr('d', d3.sankeyLinkHorizontal())
        .attr('stroke', (d) => colorByNode.get(d.source.id) || palette.single)
        .attr('stroke-width', (d) => Math.max(1, d.width))
        .append('title')
        .text((d) => {
          let base = `${d.source.id  } → ${  d.target.id  }: ${  d.value}`;
          if (typeof d.budget === 'number') {
            base += ` ($${  d.budget.toFixed(2)  }B)`;
          }
          return base;
        });

      // Column count for placement decisions. d.layer is the column
      // index set by nodeAlign above; d.depth would be topology and
      // would mis-classify nodes whose chains started mid-cascade.
      const maxLayer = d3.max(graph.nodes, (n) => n.layer);
      const nodeGroup = svg
        .append('g')
        .selectAll('g')
        .data(graph.nodes)
        .join('g')
        .attr('class', 'bdga-chart__sankey-node');

      nodeGroup
        .append('rect')
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('width', (d) => Math.max(1, d.x1 - d.x0))
        .attr('height', (d) => Math.max(1, d.y1 - d.y0))
        .attr('fill', (d) => colorByNode.get(d.id) || palette.single)
        .append('title')
        .text((d) => `${d.name || d.id  }: ${  d.value}`);

      // Label placement, keyed off d.layer so it tracks the column index
      // actually used by the layout. Two modes (see stackedLabels above):
      //   outside (wide containers):
      //     layer 0            -> outside the rect on its left
      //     layer === maxLayer -> outside the rect on its right
      //     middle columns     -> centred above the rect
      //   stacked (narrow containers): every label sits above its rect, with
      //     the edge columns anchored to their inner side so they read inward
      //     and never spill past the canvas edge.
      // Multi-stage flows use the column header for the stage label, so
      // each node's own text is just its suffix (e.g. "Medium-High").
      const isEdge = (d) => d.layer === 0 || d.layer === maxLayer;
      nodeGroup
        .append('text')
        .attr('text-anchor', (d) => {
          if (stackedLabels) {
            if (d.layer === 0) return 'start';
            if (d.layer === maxLayer) return 'end';
            return 'middle';
          }
          if (d.layer === 0) return 'end';
          if (d.layer === maxLayer) return 'start';
          return 'middle';
        })
        .attr('x', (d) => {
          if (stackedLabels) {
            if (d.layer === 0) return d.x0;
            if (d.layer === maxLayer) return d.x1;
            return (d.x0 + d.x1) / 2;
          }
          if (d.layer === 0) return d.x0 - 6;
          if (d.layer === maxLayer) return d.x1 + 6;
          return (d.x0 + d.x1) / 2;
        })
        .attr('y', (d) => {
          if (!stackedLabels && isEdge(d)) return (d.y0 + d.y1) / 2;
          return d.y0 - 4;
        })
        .attr('dy', (d) => (!stackedLabels && isEdge(d) ? '0.35em' : '0'))
        .text((d) => meta.get(d.id).label);

      // Keyboard navigation: each node group is a focusable, labelled point.
      // role="img" (set by addPoints) makes the group a leaf for AT, so its
      // rect / text / title are not announced separately; with the links and
      // headers aria-hidden, a screen reader hears one clear label per node.
      // Nodes are a single nav group - Left/Right and Home/End move through
      // them in layout order.
      this.addPoints(
        null,
        nodeGroup.nodes().map((el) => {
          const d = d3.select(el).datum();
          const incoming = (d.targetLinks || []).length;
          const outgoing = (d.sourceLinks || []).length;
          const parts = [];
          if (incoming) parts.push(Drupal.t('@n in', { '@n': incoming }));
          if (outgoing) parts.push(Drupal.t('@n out', { '@n': outgoing }));
          const flows = parts.length ? `. ${parts.join(', ')}` : '';
          return { el, label: `${d.name || d.id}: ${this.formatValue(d.value)}${flows}` };
        })
      );
    }

    /**
     * Sankey - left-to-right flow diagram. Uses d3.sankeyJustify so the
     * leftmost column is anchored at x=0 and rightmost at x=width, which
     * matches the MDPR Figure 18 DCA flow layout.
     */
    drawSankey() {
      this.drawSankeyInternal(window.d3.sankeyJustify);
    }

    /**
     * Flow - multi-stage alluvial diagram (e.g. 2024 -> 2025 -> 2026).
     * Same renderer as sankey; the data shape declares the staging via
     * node ordering, and the d3-sankey layout handles the rest. Kept as a
     * separate type so authors / templates can style it differently, but
     * the visual difference is currently only via CSS hooks.
     */
    drawFlow() {
      this.drawSankeyInternal(window.d3.sankeyJustify);
    }
  }
})(window.Drupal, window.once);

// Static-page driver. Drupal core runs Drupal.attachBehaviors() after page
// load + each AJAX swap; without it, the bdgaChart behaviour above is
// registered but never attached. Run it on DOMContentLoaded and on every
// DOM mutation so async-rendered story canvases still trigger. once() inside
// the behaviour deduplicates, so repeated calls are cheap.
(function () {
  'use strict';
  if (typeof window.Drupal === 'undefined' || typeof window.Drupal.attachBehaviors === 'function') {
    return;
  }
  const attach = (context) => {
    Object.values(window.Drupal.behaviors).forEach((b) => {
      if (b && typeof b.attach === 'function') b.attach(context || document);
    });
  };
  window.Drupal.attachBehaviors = attach;
  const run = () => attach(document);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  new MutationObserver(run).observe(
    document.body || document.documentElement,
    { childList: true, subtree: true }
  );
})();

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Alert component.
 */

function CivicThemeAlert(el) {
  // Use "data-alert"'s attribute value to identify if this
  // component was already initialised.
  if (el.getAttribute('data-alert') === 'true' || this.container) {
    return;
  }

  this.container = el;
  this.endpoint = this.container.getAttribute('data-alert-endpoint');
  if (this.endpoint !== null) {
    this.getAll();
  }

  // Mark as initialized.
  this.container.setAttribute('data-alert', 'true');
}

/**
 * Gets alerts from endpoint.
 */
CivicThemeAlert.prototype.getAll = function () {
  const { endpoint } = this;
  const request = new XMLHttpRequest();
  request.open('get', endpoint);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      try {
        const response = JSON.parse(request.responseText);
        const html = this.filter(response);
        this.insert(html);
      } catch (e) {
        // Do nothing.
      }
    }
  };
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.send();
};

/**
 * Filters out alerts not to show ie dismissed, page-specific alerts.
 */
CivicThemeAlert.prototype.filter = function (response) {
  let html = '';

  if (response.length) {
    for (let i = 0; i < response.length; i++) {
      const item = response[i];

      if (!this.isValidResponse(item)) {
        continue;
      }

      // Skip the alert hidden by the user session.
      if (this.hasCookieValue(item.id, item.message)) {
        continue;
      }

      // Skip the alert not matching visibility rules.
      if (!this.isVisible(item.visibility)) {
        continue;
      }

      html += item.message;
    }
  }

  return html;
};

/**
 * Checks whether an alert is to be shown on a specified page.
 */
CivicThemeAlert.prototype.isVisible = function (visibilityString) {
  if ((typeof visibilityString === 'undefined') || visibilityString === false || visibilityString === '') {
    return true;
  }

  let pageVisibility = visibilityString.replace(/\*/g, '[^ ]*');
  // Replace '<front>' with "/".
  pageVisibility = pageVisibility.replace('<front>', '/');
  // Replace all occurrences of '/' with '\/'.
  // eslint-disable-next-line
  pageVisibility = pageVisibility.replace('/', '\/');

  const pageVisibilityRules = pageVisibility.split(/\r?\n/);
  if (pageVisibilityRules.length !== 0) {
    const path = this.urlPath();

    for (let r = 0, rlen = pageVisibilityRules.length; r < rlen; r++) {
      if (path === pageVisibilityRules[r]) {
        return true;
      }

      if (pageVisibilityRules[r].indexOf('*') !== -1 && path.match(new RegExp(`^${pageVisibilityRules[r]}`))) {
        return true;
      }
    }
    return false;
  }

  return true;
};

/**
 * Check if response object is valid.
 */
CivicThemeAlert.prototype.isValidResponse = function (item) {
  return typeof item === 'object' && 'id' in item && 'message' in item && 'visibility' in item;
};

/**
 * Get the cookie name.
 */
CivicThemeAlert.prototype.getCookieName = function () {
  return 'ct-alert-hide';
};

/**
 * Check if cookie has value.
 */
CivicThemeAlert.prototype.hasCookieValue = function (id, message) {
  const cookie = this.getCookie();
  return id in cookie && cookie[id] === this.hashString(this.removeHtml(message));
};

/**
 * Sets an cookie value.
 */
CivicThemeAlert.prototype.setCookieValue = function (id, message) {
  const cookie = this.getCookie();
  cookie[id] = this.hashString(this.removeHtml(message));
  this.setCookie(cookie);
};

/**
 * Get cookie value.
 */
CivicThemeAlert.prototype.getCookie = function () {
  let cookie = {};

  const values = document.cookie.split(';').filter((item) => item.trim().startsWith(`${this.getCookieName()}=`));
  if (values.length !== 1) {
    return cookie;
  }

  const stringValues = values[0].trim().replace(`${this.getCookieName()}=`, '');
  if (typeof stringValues !== 'string') {
    return cookie;
  }

  try {
    cookie = JSON.parse(stringValues);
  } catch (e) {
    cookie = {};
  }

  return cookie;
};

/**
 * Set a cookie.
 */
CivicThemeAlert.prototype.setCookie = function (value) {
  document.cookie = `${this.getCookieName()}=${JSON.stringify(value)}; SameSite=Strict; Path=/`;
};

/**
 * Simple HTML remover.
 */
CivicThemeAlert.prototype.removeHtml = function (string) {
  return string
    .replace(/(\r\n|\n|\r)/g, '')
    .replace(/\s/g, '')
    .replace(/(&nbsp;|<([^>]+)>)/ig, '')
    .trim();
};

/**
 * Hash string.
 */
CivicThemeAlert.prototype.hashString = function (string) {
  let hash = 0;
  let i;
  let
    chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0;
  }
  return hash;
};

/**
 * Insert alerts into container.
 */
CivicThemeAlert.prototype.insert = function (html) {
  // Build the alert.
  this.container.insertAdjacentHTML('afterbegin', html);
  this.setDismissListeners();
};

/**
 * Sets dismiss listeners to alerts.
 */
CivicThemeAlert.prototype.setDismissListeners = function () {
  // Process the Close button of each alert.
  document
    .querySelectorAll('[data-alert-dismiss-trigger]')
    .forEach((el) => {
      el.addEventListener('click', (event) => {
        event.stopPropagation();
        const parent = this.getParentElement(event.currentTarget, '[data-component-name="ct-alert"]');
        this.dismiss(parent);
      });
    });
};

/**
 * Dismisses an alert and adds cookie to dismiss for session.
 */
CivicThemeAlert.prototype.dismiss = function (element) {
  if (element !== null) {
    const parent = this.getParentElement(element, '[data-component-name="ct-alerts"]');
    if (parent) {
      parent.removeChild(element);
    }
    const id = element.getAttribute('data-alert-id');
    if (id) {
      this.setCookieValue(id, element.outerHTML);
    }
  }
};

/**
 * Get a parent element matching a selector.
 */
CivicThemeAlert.prototype.getParentElement = function (element, selector) {
  while (element !== null && !element.matches(selector)) {
    element = element.parentNode;
  }
  return element;
};

/**
 * Get current path from URL or data attribute.
 *
 * 'data-test-path' attribute is used for testing of this component within
 * Storybook.
 */
CivicThemeAlert.prototype.urlPath = function () {
  return this.container.getAttribute('data-test-path') || window.location.pathname;
};

/**
 * Initialise component.
 */
document.querySelectorAll('[data-component-name="ct-alerts"]').forEach((el) => {
  new CivicThemeAlert(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Tooltip component.
 */

function CivicThemeTooltip(el) {
  if (el.getAttribute('data-tooltip') === 'true') {
    return;
  }

  this.el = el;
  this.el.setAttribute('data-tooltip', 'true');
  this.button = this.el.querySelector('[data-tooltip-button]');
  this.content = this.el.querySelector('[data-tooltip-content]');
  this.arrow = this.el.querySelector('[data-tooltip-arrow]');
  this.close = this.el.querySelector('[data-tooltip-close]');
  this.position = 'auto';

  if (this.button) {
    // Generate unique id for the tooltip content.
    let prefix = 'tooltip';
    do {
      prefix += Math.floor(Math.random() * 10000);
    } while (document.getElementById(prefix));
    this.content.setAttribute('id', prefix);
    this.button.setAttribute('aria-describedby', prefix);

    this.position = this.button.getAttribute('data-tooltip-position') || 'auto';
    this.button.addEventListener('click', this.tooltipShow.bind(this));
    this.button.addEventListener('focusin', this.tooltipShow.bind(this));
    this.button.addEventListener('focusout', this.tooltipHide.bind(this));
    this.button.addEventListener('mouseenter', this.tooltipShow.bind(this));
    this.button.addEventListener('mouseleave', this.tooltipHide.bind(this));
    this.close.addEventListener('focusin', this.tooltipHide.bind(this));
    this.close.addEventListener('click', this.tooltipHide.bind(this));
  }

  if (typeof Popper !== 'undefined') {
    // Pass the button, the tooltip, and some options, and Popper will do the
    // magic positioning for you:
    this.el.popper = window.Popper.createPopper(this.button, this.content, {
      placement: this.position,
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: this.arrow,
            padding: 12,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 36],
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'bottom'],
          },
        },
      ],
    });
  }
}

/**
 * Show event handler.
 */
CivicThemeTooltip.prototype.tooltipShow = function (e) {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();

  const tooltip = this.findTooltip(e.target);
  if (tooltip) {
    tooltip.setAttribute('data-tooltip-visible', '');
    tooltip.popper.update();
  }
};

/**
 * Hide event handler.
 */
CivicThemeTooltip.prototype.tooltipHide = function (e) {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();

  const tooltip = this.findTooltip(e.target);
  if (tooltip) {
    tooltip.removeAttribute('data-tooltip-visible');
  }
};

/**
 * Find button element.
 */
CivicThemeTooltip.prototype.findTooltip = function (el) {
  if (el.classList.contains('ct-tooltip')) {
    return el;
  }
  return el.closest('.ct-tooltip');
};

/**
 * Destroy an instance.
 */
CivicThemeTooltip.prototype.destroy = function (el) {
  if (el.getAttribute('data-tooltip') !== 'true' || !this.el) {
    return;
  }

  const button = el.querySelector('[data-tooltip-button]');
  const content = el.querySelector('[data-tooltip-content]');

  // Exit early if button or content were not found.
  if (!button || !content) {
    return;
  }

  this.el = el;
  this.button = button;
  this.content = content;

  // Remove any attached event listeners.
  // eslint-disable-next-line no-self-assign
  this.button.outerHTML = this.button.outerHTML;

  // Mark as non-initialized.
  this.el.setAttribute('data-tooltip', '');

  delete this.el;
  delete this.button;
  delete this.content;
  delete this.arrow;
  delete this.close;
  delete this.position;
};

document.querySelectorAll('.ct-tooltip').forEach((el) => {
  new CivicThemeTooltip(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Tabs component.
 */

function CivicThemeTabs(el, selectedIndex) {
  if (!el) {
    return;
  }

  this.el = el;
  this.links = this.el.querySelectorAll('[data-tabs-tab]');
  this.panels = this.el.querySelectorAll('[data-tabs-panel]');

  if (this.links.length === 0
    || this.panels.length === 0
    || this.links.length !== this.panels.length
  ) {
    return;
  }

  this.init(selectedIndex);
}

CivicThemeTabs.prototype.init = function () {
  this.clickListener = this.clickEvent.bind(this);

  let selected = 0;
  for (let i = 0; i < this.panels.length; i++) {
    this.links[i].addEventListener('click', this.clickListener, false);

    if (this.panels[i].classList.contains('ct-tabs__panel--selected') && !selected) {
      selected = i;
    }
  }

  this.links[selected].click();
};

CivicThemeTabs.prototype.clickEvent = function (e) {
  e.preventDefault();

  this.setSelected(e.currentTarget);
};

CivicThemeTabs.prototype.setSelected = function (current) {
  for (let i = 0; i < this.panels.length; i++) {
    const currentLink = this.links[i];
    if (currentLink === current) {
      currentLink.classList.add('ct-tabs__tab--selected');
      currentLink.setAttribute('aria-selected', true);
      this.panels[i].classList.add('ct-tabs__panel--selected');
      this.panels[i].setAttribute('aria-hidden', false);
    } else {
      currentLink.classList.remove('ct-tabs__tab--selected');
      currentLink.setAttribute('aria-selected', false);
      this.panels[i].classList.remove('ct-tabs__panel--selected');
      this.panels[i].setAttribute('aria-hidden', true);
    }
  }
};

CivicThemeTabs.prototype.destroy = function () {
  for (let i = 0; i < this.panels.length; i++) {
    this.links[i].removeAttribute('aria-selected');
    this.links[i].classList.remove('ct-tabs__tab--selected');
    this.links[i].removeEventListener('click', this.clickListener, false);

    this.panels[i].removeAttribute('aria-hidden');
    this.panels[i].classList.remove('ct-tabs__panel--selected');
  }
};

document.querySelectorAll('.ct-tabs').forEach((tabs) => {
  new CivicThemeTabs(tabs);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Table of Contents component.
 */

function CivicThemeTableOfContents(el) {
  // Check if current target is already initialised.
  if (el.hasAttribute('data-table-of-contents-initialised')) {
    return;
  }

  // Get options from attributes.
  this.target = el;
  this.position = this.target.getAttribute('data-table-of-contents-position').trim();
  this.theme = this.target.hasAttribute('data-table-of-contents-theme') ? this.target.getAttribute('data-table-of-contents-theme').trim() : 'light';
  this.anchorSelector = this.target.hasAttribute('data-table-of-contents-anchor-selector') ? this.target.getAttribute('data-table-of-contents-anchor-selector').trim() : 'h2';
  this.anchorScopeSelector = this.target.hasAttribute('data-table-of-contents-anchor-scope-selector') ? this.target.getAttribute('data-table-of-contents-anchor-scope-selector').trim() : '.ct-basic-content';
  this.title = this.target.hasAttribute('data-table-of-contents-title') ? this.target.getAttribute('data-table-of-contents-title').trim() : '';

  // Normalise attribute values.
  this.position = ['before', 'after', 'prepend', 'append'].indexOf(this.position.trim()) > 0 ? this.position : 'before';
  this.theme = this.theme === 'dark' ? 'dark' : 'light';
  this.anchorSelector = this.anchorSelector !== '' ? this.anchorSelector : 'h2';
  this.anchorScopeSelector = this.anchorScopeSelector !== '' ? this.anchorScopeSelector : '.ct-basic-content';

  // Initialise component.
  this.init();

  // Mark target as initialised.
  this.target.setAttribute('data-table-of-contents-initialised', 'true');
}

CivicThemeTableOfContents.prototype.init = function () {
  let html = '';

  const links = this.findLinks(this.anchorSelector, this.anchorScopeSelector);

  if (!links.length) {
    return;
  }

  if (this.title) {
    html += this.renderTitle(this.title);
  }

  html += this.renderLinks(links);

  html = this.renderContainer(html, this.theme, this.position);

  this.place(this.target, this.position, html);
};

CivicThemeTableOfContents.prototype.findLinks = function (anchorSelector, scopeSelector) {
  const links = [];
  const existingUrls = new Set(); // Track existing URLs.

  // Find links within provided scope selector.
  document.querySelectorAll(scopeSelector).forEach((elScope) => {
    elScope.querySelectorAll(anchorSelector).forEach((elAnchor) => {
      // Skip headings marked to be excluded from TOC.
      if (elAnchor.hasAttribute('data-toc-exclude')) {
        return;
      }

      // Respect existing ID.
      let anchorId = elAnchor.id || null;
      const anchorText = elAnchor.innerText;

      // Ignore blank headings.
      if (anchorText.trim() === '') {
        return;
      }

      // Generate new ID if no existing ID.
      if (!anchorId || anchorId.length === 0) {
        anchorId = this.makeAnchorId(anchorText);
        // Check if generated ID is already present on the page or links array.
        while (elScope.querySelectorAll(`#${anchorId}`).length || existingUrls.has(`#${anchorId}`)) {
          // Add random 3 character suffix.
          anchorId = `${anchorId}-${Math.random().toString(36).substring(2, 5)}`;
        }
      }

      const url = `#${anchorId}`;

      // Skip adding the link if the URL already exists.
      if (existingUrls.has(url)) {
        return;
      }

      links.push({
        title: anchorText,
        url,
      });

      // Update anchor with the id. This will "fix" any anchors with duplicated
      // IDs, which is not a valid HTML content.
      elAnchor.id = anchorId;

      // Add the URL to the set of existing URLs.
      existingUrls.add(url);
    });
  });

  return links;
};

CivicThemeTableOfContents.prototype.renderTitle = function (title) {
  return `<h2 class="ct-table-of-contents__title">${title}</h2>`;
};

CivicThemeTableOfContents.prototype.renderLinks = function (links) {
  let html = '';

  html += `<ul class="ct-table-of-contents__links">`;
  for (const i in links) {
    html += `
      <li class="ct-table-of-contents__link-item">
        <a class="ct-table-of-contents__link" href="${links[i].url}">${links[i].title}</a>
      </li>
    `;
  }
  html += '</ul>';

  return html;
};

CivicThemeTableOfContents.prototype.renderContainer = function (html, theme, position) {
  return `<div class="ct-table-of-contents ct-theme-${theme} ct-table-of-contents--position-${position}">${html}</div>`;
};

CivicThemeTableOfContents.prototype.place = function (el, position, html) {
  const positionMap = {
    before: 'beforebegin',
    after: 'afterend',
    prepend: 'afterbegin',
    append: 'beforeend',
  };

  el.insertAdjacentHTML(positionMap[position], html);
};

CivicThemeTableOfContents.prototype.makeAnchorId = function (str) {
  return str.toLowerCase()
    .replace(/(&\w+?;)/gim, ' ')
    .replace(/[_.~"<>%|'!*();:@&=+$,/?%#[\]{}\n`^\\]/gim, '')
    .replace(/(^\s+)|(\s+$)/gim, '')
    .replace(/\s+/gm, '-');
};

document.querySelectorAll('[data-table-of-contents-position]').forEach((el) => {
  new CivicThemeTableOfContents(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Single Filter component.
 */

function CivicThemeSingleFilterComponent(el) {
  if (el.getAttribute('data-single-filter') === 'true') {
    return;
  }

  this.el = el;

  this.el.addEventListener('ct.single-filter.update', this.updateEvent.bind(this));

  this.el.querySelectorAll('input, textarea, select, [type="checkbox"], [type="radio"]').forEach((input) => {
    input.addEventListener('change', () => {
      el.dispatchEvent(new CustomEvent('ct.single-filter.update', { detail: { parent: input.parentElement } }));
    });
  });

  // Mark as initialized.
  this.el.setAttribute('data-single-filter', 'true');
}

/**
 * Update event handler.
 */
CivicThemeSingleFilterComponent.prototype.updateEvent = function (el) {
  el.detail.parent.setAttribute('aria-live', 'polite');
};

document.querySelectorAll('.ct-single-filter').forEach((el) => {
  new CivicThemeSingleFilterComponent(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Group Filter component.
 */

function CivicThemeGroupFilterComponent(el) {
  if (this.el) {
    return;
  }

  this.el = el;

  this.el.addEventListener('ct.group-filter.update', this.update.bind(this));

  if (!el.hasEventListener) {
    el.hasEventListener = true;
    el.querySelectorAll('input, textarea, select, [type="checkbox"], [type="radio"]').forEach((input) => {
      input.addEventListener('change', () => {
        el.dispatchEvent(new CustomEvent('ct.group-filter.update', { detail: { parent: input.parentElement } }));
      });
    });
  }
}

/**
 * Update the instance.
 */
CivicThemeGroupFilterComponent.prototype.update = function (el) {
  el.detail.parent.setAttribute('aria-live', 'polite');
};

document.querySelectorAll('[data-group-filter-filters]').forEach((el) => {
  new CivicThemeGroupFilterComponent(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Table component.
 */

function CivicThemeTable(el) {
  if (!el) {
    return;
  }

  this.el = el;

  this.init();
}

 
CivicThemeTable.prototype.init = function () {
  if (this.el.getAttribute('data-table') === 'true') {
    return;
  }

  this.addTitles();

  // Check if the table has the class 'ct-table--data'
  if (this.el.classList.contains('ct-table--data')) {
    this.addWrapper();
  }

  this.el.setAttribute('data-table', 'true');
};

// Add data-title attributes to cells for display on mobile.
// TODO: Add titles to cells in rows with row-scoped th cells.
// CivicThemeTable.prototype.addRowScopedTitles.
// TODO: Add titles to cells in columns with col-scoped th cells.
// CivicThemeTable.prototype.addColScopedTitles.
CivicThemeTable.prototype.addTitles = function () {
  this.addTheadColumnTitles();
};

CivicThemeTable.prototype.addWrapper = function () {
  // Select the target element you want to wrap.
  const targetElement = this.el;
  // Create the wrapper element.
  const wrapper = document.createElement('div');
  wrapper.classList.add('ct-table--wrapper');
  // Add attributes to the wrapper
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('tabindex', '0');
  // Insert the wrapper before the target element.
  targetElement.parentNode.insertBefore(wrapper, targetElement);
  // Move the target element inside the wrapper.
  wrapper.appendChild(targetElement);
};

 
CivicThemeTable.prototype.addTheadColumnTitles = function () {
  // Determine whether column titles can be added via thead.
  const theadRows = this.el.querySelectorAll('thead tr');
  const tbodyRows = this.el.querySelectorAll('tbody tr');
  if (!(theadRows.length && tbodyRows.length)) {
    return;
  }
  const theadRow = theadRows[0];
  const theadCells = theadRow.querySelectorAll('th, td');

  tbodyRows.forEach((tbodyRow) => {
    const tbodyRowCells = tbodyRow.querySelectorAll('th, td');
    tbodyRowCells.forEach((tbodyRowCell, index) => {
      if (!tbodyRowCell.hasAttribute('data-title') && theadCells[index]) {
        tbodyRowCell.setAttribute('data-title', theadCells[index].textContent);
      }
    });
  });
};

document.querySelectorAll('.ct-basic-content table, .ct-table').forEach((table) => {
   
  new CivicThemeTable(table);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Chip component.
 */

function CivicThemeChip(el) {
  if (el.getAttribute('data-chip') === 'true') {
    return;
  }

  this.el = el;
  this.groupParentSelector = el.getAttribute('data-chip-group-parent') || null;

  this.el.addEventListener('change', this.changeEvent.bind(this));
  this.el.addEventListener('focusin', this.focusinEvent.bind(this));
  this.el.addEventListener('focusout', this.focusoutEvent.bind(this));

  // Mark as initialized.
  this.el.setAttribute('data-chip', 'true');
}

/**
 * Toggle the checked value.
 */
CivicThemeChip.prototype.setChecked = function (input, isChecked) {
  const chip = this.findChip(input);
  if (chip && !chip.hasAttribute('disabled')) {
    if (isChecked) {
      input.setAttribute('checked', 'checked');
      chip.classList.add('active');
    } else {
      input.removeAttribute('checked');
      chip.classList.remove('active');

      const dismissable = chip.hasAttribute('data-chip-dismiss');
      if (dismissable && !input.checked) {
        this.el.dispatchEvent(new CustomEvent('ct.chip.dismiss', { bubbles: true }));
      }
    }
  }
};

/**
 * Focusin event handler.
 */
CivicThemeChip.prototype.focusinEvent = function (e) {
  const chip = this.findChip(e.target);
  if (chip && !chip.hasAttribute('disabled')) {
    chip.classList.add('focus');
  }
};

/**
 * Focusout event handler.
 */
CivicThemeChip.prototype.focusoutEvent = function (e) {
  const chip = this.findChip(e.target);
  if (chip) {
    chip.classList.remove('focus');
  }
};

/**
 * Change event handler.
 */
CivicThemeChip.prototype.changeEvent = function (e) {
  const chip = this.findChip(e.target);
  if (!chip) {
    return;
  }

  const input = chip.querySelector('input');
  if (!input) {
    return;
  }

  // For radios, check current and uncheck others in this group.
  if (input.getAttribute('type') === 'radio') {
    const name = input.getAttribute('name');
    const chipContainer = (!!this.groupParentSelector && chip.closest(this.groupParentSelector)) || document;
    const radios = chipContainer.querySelectorAll(`input[type=radio][name="${name}"]`);
    radios.forEach((radio) => {
      if (radio !== input) {
        this.setChecked(radio, false);
      }
    });
    this.setChecked(input, true);
  } else {
    this.setChecked(input, input.checked);
  }
};

/**
 * Find Chip element.
 */
CivicThemeChip.prototype.findChip = function (el) {
  if (el.classList.contains('ct-chip')) {
    return el;
  }
  return el.closest('.ct-chip');
};

document.querySelectorAll('.ct-chip').forEach((el) => {
  new CivicThemeChip(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Button component.
 */

function CivicThemeButton(el) {
  if (el.getAttribute('data-button') === 'true') {
    return;
  }

  this.el = el;
  this.el.setAttribute('data-button', 'true');
  this.dismissButton = this.el.querySelector('[data-button-dismiss]');
  this.keyboardFocused = false;

  this.el.addEventListener('click', this.clickEvent.bind(this));
  this.el.addEventListener('focusin', this.focusinEvent.bind(this));
  this.el.addEventListener('focusout', this.focusoutEvent.bind(this));

  document.addEventListener('mousedown', this.mousedownEvent.bind(this));
  document.addEventListener('keydown', this.keydownEvent.bind(this));

  if (this.dismissButton) {
    this.dismissButton.addEventListener('click', this.dismissClickEvent.bind(this));
  }
}

/**
 * Click event handler.
 */
CivicThemeButton.prototype.clickEvent = function (e) {
  if (/input/i.test(e.target.tagName)) {
    let isChecked = false;
    const input = e.target;
    if (input.getAttribute('type') === 'checkbox') {
      isChecked = input.getAttribute('checked');
    } else if (input.getAttribute('type') === 'radio') {
      // "Uncheck" all but current radio in this group.
      const name = input.getAttribute('name');
      const radios = document.querySelectorAll(`input[type=radio][name="${name}"]`);
      for (const i in radios) {
        if (Object.prototype.hasOwnProperty.call(radios, i) && radios[i] !== input) {
          this.setChecked(radios[i], false);
        }
      }
    } else {
      return;
    }
    this.setChecked(input, !isChecked);
  }
};

/**
 * Keydown event handler.
 */
CivicThemeButton.prototype.keydownEvent = function (e) {
  if (e.key && (e.key === 'Tab' || e.key.indexOf('Arrow') === 0)) {
    this.keyboardFocused = true;
  }
};

/**
 * Keydown event handler.
 */
CivicThemeButton.prototype.mousedownEvent = function () {
  this.keyboardFocused = false;
};

/**
 * Set the checked value.
 */
CivicThemeButton.prototype.setChecked = function (input, check) {
  const button = this.findButton(input);
  if (button && !button.hasAttribute('disabled')) {
    if (check) {
      input.setAttribute('checked', 'checked');
      button.classList.add('active');
    } else {
      input.removeAttribute('checked');
      button.classList.remove('active');
    }
  }
};

/**
 * Focusin event handler.
 */
CivicThemeButton.prototype.focusinEvent = function (e) {
  const button = this.findButton(e.target);
  if (button && !button.hasAttribute('disabled') && this.keyboardFocused) {
    button.classList.add('focus');
  }
};

/**
 * Focusout event handler.
 */
CivicThemeButton.prototype.focusoutEvent = function (e) {
  const button = this.findButton(e.target);
  if (button) {
    button.classList.remove('focus');
  }
};

/**
 * Click event handler for dismiss button.
 */
CivicThemeButton.prototype.dismissClickEvent = function (e) {
  const button = this.findButton(e.target);
  if (button) {
    button.remove();
    this.el.dispatchEvent(new CustomEvent('ct.button.dismiss', { bubbles: true }));
  }
};

/**
 * Find button element.
 */
CivicThemeButton.prototype.findButton = function (el) {
  if (el.classList.contains('ct-button')) {
    return el;
  }
  return el.closest('.ct-button');
};

document.querySelectorAll('.ct-button').forEach((el) => {
  new CivicThemeButton(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * @file
 * Skip to target utility.
 */

function CivicThemeSkipToTarget(el) {
  this.el = el;
  this.targetId = this.el.getAttribute('href');

  if (this.targetId) {
    this.targetEl = document.querySelector(this.targetId);

    this.el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.targetEl.setAttribute('tabindex', '1');
      this.targetEl.focus();
      this.targetEl.scrollIntoView(true);
      this.targetEl.setAttribute('tabindex', '-1');
    });
  }
}

document.querySelectorAll('[data-skip-to-target]').forEach((el) => {
  new CivicThemeSkipToTarget(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * @file
 * Scrollspy component.
 *
 * Adds '.ct-scrollspy-scrolled' class to an element whose
 * data-scrollspy-offset attribute's value is more than a vertical window
 * scroll.
 */
function CivicThemeScrollspy(el) {
  if (el.getAttribute('data-scrollspy') === 'true' || this.el) {
    return;
  }

  this.el = el;
  this.offset = this.el.hasAttribute('data-scrollspy-offset') ? this.el.getAttribute('data-scrollspy-offset') : null;

  document.addEventListener('scroll', CivicThemeScrollspy.prototype.scrollEvent.bind(this));

  // Mark as initialized.
  this.el.setAttribute('data-scrollspy', 'true');
}

/**
 * Event handler for the scroll.
 */
CivicThemeScrollspy.prototype.scrollEvent = function () {
  if (window.scrollY > this.offset) {
    this.el.classList.add('ct-scrollspy-scrolled');
  } else {
    this.el.classList.remove('ct-scrollspy-scrolled');
  }
};

document.querySelectorAll('[data-scrollspy]').forEach((el) => {
  new CivicThemeScrollspy(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * @file
 * Responsive component.
 *
 * Emits a 'ct-responsive' event on breakpoint change allowing
 * components to delay initialisation by providing 'data-responsive' attribute
 * with an operator and breakpoint name.
 *
 * For example: a component with `data-responsive=">=m"` attribute will
 * delay its initialisation to happen only when current screen size is equal
 * or more than medium ('m') breakpoint.
 */
function CivicThemeResponsive() {
  const queries = this.getMediaQueries();
  for (const breakpoint in queries) {
    const query = queries[breakpoint];
    // Store matched media queries in global scope as this component is a
    // singleton.
    window.civicthemeResponsive = window.civicthemeResponsive || {};
    // Only proceed if this query was not processed previously.
    if (!(query in window.civicthemeResponsive)) {
      window.civicthemeResponsive[query] = window.matchMedia(query);
      // Support for Safari 13.
      const hasEventListener = (window.civicthemeResponsive[query].addEventListener !== undefined);
      if (hasEventListener) {
        window.civicthemeResponsive[query]
          .addEventListener('change', this.mediaQueryChange.bind(this, breakpoint));
      } else {
        window.civicthemeResponsive[query]
          .addListener(this.mediaQueryChange.bind(this, breakpoint));
      }
    }
    // Call event handler on init.
    this.mediaQueryChange(breakpoint, { matches: window.civicthemeResponsive[query].matches });
  }
}

/**
 * Breakpoints map.
 */
CivicThemeResponsive.prototype.breakpoints = {
  xxs: '0px',
  xs: '368px',
  s: '576px',
  m: '768px',
  l: '992px',
  xl: '1280px',
  xxl: '1440px',
};

/**
 * Get an object of media queries.
 *
 * @return object
 *   Keys are breakpoint names, and values a media queries.
 */
CivicThemeResponsive.prototype.getMediaQueries = function () {
  const queries = {};

  const firstBp = Object.keys(this.breakpoints)[0];
  let lastBp = firstBp;
  for (const breakpoint in this.breakpoints) {
    if (breakpoint === firstBp) {
      continue;
    }
    const min = this.breakpoints[lastBp];
    const max = `${Math.max(parseFloat(this.breakpoints[breakpoint]) - 0.02, 0)}px`;
    if (lastBp === firstBp) {
      queries[lastBp] = `screen and (max-width: ${max})`;
    } else {
      queries[lastBp] = `screen and (min-width: ${min}) and (max-width: ${max})`;
    }
    lastBp = breakpoint;
  }
  queries[lastBp] = `screen and (min-width: ${this.breakpoints[lastBp]})`;

  return queries;
};

/**
 * Event handler for the media query change event.
 *
 * @param {string} breakpoint
 *   The breakpoint name for which this event was fired.
 * @param {Event} evt
 *   The media query change event.
 */
CivicThemeResponsive.prototype.mediaQueryChange = function (breakpoint, evt) {
  if (!evt.matches) {
    return;
  }
  // Fire a custom event that other components can subscribe to.
  window.dispatchEvent(new CustomEvent('ct-responsive', {
    bubbles: true,
    detail: {
      breakpoint,
      evaluate: CivicThemeResponsive.prototype.evaluate,
    },
  }));
};

/**
 * Evaluate breakpoint expression and attach or detach component.
 *
 * @param {string} breakpointExpr
 *   The breakpoint expression.
 * @param {object} func
 *   Function or class constructor.
 * @param {object} el
 *   Element to be passed to the constructor.
 *
 * @return {*}
 *   Attached object or false if expression did not match.
 */
CivicThemeResponsive.prototype.evaluate = function (breakpointExpr, func, el) {
  if (CivicThemeResponsive.prototype.matchExpr(breakpointExpr, this.breakpoint)) {
    // eslint-disable-next-line new-cap
    return new func(el);
  }
  if (typeof func.prototype.destroy !== 'undefined') {
    func.prototype.destroy(el);
    return true;
  }
  return false;
};

/**
 * Match breakpoint expression to the passed breakpoint.
 *
 * Used by the listeners to decide when to respond to a query.
 *
 * @param {string} breakpointExpr
 *   The breakpoint expression. E.g. '>=m', '<s' etc.
 *   Supported operators are: <, >, =, >=, <=, <>. Defaults to '>='.
 *   Breakpoint names are matched to the
 *   CivicThemeResponsive.prototype.breakpoints.
 *
 * @param {string} breakpoint
 *   Currently active breakpoint.
 *
 * @return {boolean}
 *   True if expression matches current breakppint, false otherwise.
 */
CivicThemeResponsive.prototype.matchExpr = function (breakpointExpr, breakpoint) {
  const names = Object.keys(CivicThemeResponsive.prototype.breakpoints);
  // Parse breakpoint expression into name and operator.
  const regex = `^(<|>|=|>=|<=|<>)?(${names.join('|')})$`;
  const matches = breakpointExpr.match(new RegExp(regex, 'i'));

  // If not matched (malformed expression) or not exactly expected number of
  // matches - consider as a non-match.
  if (!matches || matches.length < 2 || matches.length > 3) {
    return false;
  }

  // Can be with or without an operator, i.e. '>=m' or 'm'.
  const parsedOperator = matches[1] || '>=';
  const parsedBreakpoint = matches[2];

  const compFunctions = {
    '>': (parsed, current) => names.indexOf(current) > names.indexOf(parsed),
    '>=': (parsed, current) => names.indexOf(current) >= names.indexOf(parsed),
    '<': (parsed, current) => names.indexOf(current) < names.indexOf(parsed),
    '<=': (parsed, current) => names.indexOf(current) <= names.indexOf(parsed),
    '<>': (parsed, current) => names.indexOf(current) !== names.indexOf(parsed),
    '=': (parsed, current) => names.indexOf(current) === names.indexOf(parsed),
  };

  return compFunctions[parsedOperator](parsedBreakpoint, breakpoint);
};

if (document.querySelectorAll('[data-responsive]').length) {
  // CivicThemeResponsive needs to run after all ct-responisve
  // event listeners have been added.
  // Delay the execution until after other components have been initialized.
  // Using setTimeout as an interim solution because:
  // - DOMContentLoad won't work on prod-site due to being double wrapped in a
  //   DOMLoad event.
  // - window 'load' event won't work on storybook as it's not called per
  //   component page change.
  setTimeout(() => {
    // Init if there is at least a single component with data-responsive
    // attribute on the page.
    new CivicThemeResponsive();
  }, 10);
}

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * @file
 * Platform utility.
 */

function CivicThemePlatform(el) {
  function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
  }

  if (iOS()) {
    el.dataset.platform = 'ios';
  }
}

document.querySelectorAll('[data-platform]').forEach((el) => {
  new CivicThemePlatform(el);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * CivicTheme Layout component.
 */

function CivicThemeLayout(el) {
  this.el = el;
  this.grid = el.querySelector(':scope > .ct-layout__inner');
  const gridStyle = getComputedStyle(this.grid);

  if (gridStyle.gridTemplateRows === 'masonry' || this.grid.hasAttribute('data-masonry')) {
    return;
  }

  this.grid.setAttribute('data-masonry', true);

  this.stl = this.grid.querySelector(':scope > .ct-layout__sidebar_top_left');
  this.str = this.grid.querySelector(':scope > .ct-layout__sidebar_top_right');
  this.sbl = this.grid.querySelector(':scope > .ct-layout__sidebar_bottom_left');
  this.sbr = this.grid.querySelector(':scope > .ct-layout__sidebar_bottom_right');

  // Only enable masonry if all 4 elements are present.
  if (this.stl && this.str && this.sbl && this.sbr) {
    // Prepare redraw variables.
    this.gap = parseFloat(gridStyle.gridRowGap);
    // Items include all children of the grid, not just the 4 sidebar regions.
    this.items = Array.from(this.grid.children);
    this.height = 0;

    // Listen for redraw events.
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.masonryRedraw();
      });
    });

    // Observe all children of the grid items rather than the items themselves:
    // this allows us to detect changes in the height of the children rather
    // tnan of the grid items as their height will not change when children
    // combined heights is less than a single grid row height.
    this.items.forEach((item) => {
      Array.from(item.children).forEach((child) => {
        this.resizeObserver.observe(child);
      });
    });

    this.masonryRedraw();
  }
}

/**
 * Position element in relation to it's above element.
 */
CivicThemeLayout.prototype.masonryPositionElement = function (el, aboveEl, gap) {
  const aboveChildIdx = aboveEl.children.length - 1;
  const aboveChild = (aboveChildIdx >= 0) ? aboveEl.children[aboveChildIdx] : null;
  const aboveBottom = aboveChild ? aboveChild.getBoundingClientRect().bottom : aboveEl.getBoundingClientRect().top;
  const currentTop = el.getBoundingClientRect().top;
  el.style.marginTop = `${aboveBottom + gap - currentTop}px`;
};

/**
 * Reposition grid elements.
 */
CivicThemeLayout.prototype.masonryRedraw = function () {
  // Calculate the new height of all children.
  //
  // Although masonry layout is applied only if the element has the
  // CSS variable --js-masonry-enabled set and we could have check for this
  // variable to preserve height reclaulation, this variable can be assigned
  // within a specific media query. Therefore, we need to calculate the height
  // in case --js-masonry-enabled is assigned to the element after the viewport
  // has been resized.
  const newHeight = this.items.reduce((totalHeight, item) => {
    const childrenHeight = Array.from(item.children).reduce((childTotal, child) => childTotal + child.getBoundingClientRect().height, 0);
    return totalHeight + childrenHeight;
  }, 0);

  // Proceed only if the height has changed.
  if (newHeight !== this.height) {
    this.height = newHeight;

    // Clear existing positioning.
    this.sbl.style.removeProperty('margin-top');
    this.sbr.style.removeProperty('margin-top');

    // Set new position (if masonry css has been applied).
    if (getComputedStyle(this.grid).getPropertyValue('--js-masonry-enabled')) {
      this.masonryPositionElement(this.sbl, this.stl, this.gap);
      this.masonryPositionElement(this.sbr, this.str, this.gap);
    }
  }
};

document.querySelectorAll('.ct-layout').forEach((layout) => {
   
  new CivicThemeLayout(layout);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * @file
 * Flyout component.
 *
 * Allows introducing "fly out" behaviour to a block-level HTML element on the
 * page by adding data attributes to elements. The component does not provide
 * any styles, except for z-index configuration and direction transformations.
 *
 * Also, provides a trigger to close a single (currently opened) panel and
 * another trigger to close all open panels.
 */
function CivicThemeFlyout(el) {
  if (el.getAttribute('data-flyout') === 'true' || this.el) {
    return;
  }

  // Find all open triggers.
  const openTriggers = document.querySelectorAll('[data-flyout-open-trigger]');
  if (!openTriggers.length) {
    return;
  }

  // Find an open trigger.
  this.openTrigger = this.findOpenTrigger(openTriggers, el);
  if (!this.openTrigger) {
    return;
  }

  this.el = el;

  // Find "close trigger", but only search among triggers that are not a part
  // of descendant flyouts.
  this.closeTriggers = Array.from(this.el.querySelectorAll('[data-flyout-close-trigger]'));
  this.closeTriggers = this.closeTriggers.filter((item) => (item.closest('[data-flyout]') === this.el));

  this.closeAllTriggers = Array.from(this.el.querySelectorAll('[data-flyout-close-all-trigger]'));
  this.closeAllTriggers = this.closeAllTriggers.filter((item) => (item.closest('[data-flyout]') === this.el));
  this.panel = this.el.querySelector('[data-flyout-panel]');
  this.el.expanded = this.el.hasAttribute('data-flyout-expanded');
  this.duration = this.el.hasAttribute('data-flyout-duration') ? parseInt(this.el.getAttribute('data-flyout-duration'), 10) : 500;
  this.focusTargets = this.el.hasAttribute('data-flyout-focus') ? this.el.getAttribute('data-flyout-focus').split(',').filter((i) => i) : [];

  // Add event listener to element.
  if (this.openTrigger) {
    this.openTrigger.addEventListener('click', this.clickEvent.bind(this));
    this.openTrigger.expand = true;
  }

  if (this.closeTriggers) {
    this.closeTriggers.forEach((trigger) => {
      trigger.addEventListener('click', this.clickEvent.bind(this));
      trigger.expand = false;
    });
  }

  if (this.closeAllTriggers) {
    this.closeAllTriggers.forEach((trigger) => {
      trigger.addEventListener('click', this.closeAllTriggerClickEvent.bind(this));
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      const flyoutElements = document.querySelectorAll('[data-flyout]');
      flyoutElements.forEach((flyout) => {
        const focusableElements = flyout.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        if (document.activeElement === lastFocusable && !event.shiftKey) {
          event.preventDefault();
          firstFocusable.focus();
        } else if (document.activeElement === firstFocusable && event.shiftKey) {
          event.preventDefault();
          lastFocusable.focus();
        }
      });
    }
  });

  // Mark as initialized.
  this.el.setAttribute('data-flyout', 'true');
}

/**
 * Find open trigger for the given flyout among provided triggers.
 */
CivicThemeFlyout.prototype.findOpenTrigger = function (triggers, el) {
  // Find a trigger for the current flyout.
  for (const i in triggers) {
    if (Object.prototype.hasOwnProperty.call(triggers, i)) {
      if (triggers[i].hasAttribute('data-flyout-target')) {
        const found = document.querySelector(triggers[i].getAttribute('data-flyout-target'));
        if (found === el) {
          return triggers[i];
        }
      } else if (triggers[i].nextElementSibling && triggers[i].nextElementSibling.hasAttribute('data-flyout')) {
        // Try to get from the next element.
        const found = triggers[i].nextElementSibling;
        if (found === el) {
          return triggers[i];
        }
      }
    }
  }
  return null;
};

/**
 * Click event handler to toggle flyout state.
 */
CivicThemeFlyout.prototype.clickEvent = function (e) {
  e.stopPropagation();
  if (e.target.hasAttribute('data-flyout-trigger-allow-default') !== true) {
    e.preventDefault();
  }

  return e.currentTarget.expand ? this.expand() : this.collapse();
};

/**
 * Event handler to close all flyout components.
 */
CivicThemeFlyout.prototype.closeAllTriggerClickEvent = function (e) {
  e.stopPropagation();
  if (e.target.hasAttribute('data-flyout-trigger-allow-default') !== true) {
    e.preventDefault();
  }

  // Collapse all panels.
  document.querySelectorAll('[data-flyout-expanded]').forEach((flyout) => {
    flyout.removeAttribute('data-flyout-expanded');
  });
  document.querySelectorAll('[data-flyout-panel]').forEach((panel) => {
    panel.setAttribute('aria-hidden', true);
    const duration = panel.parentNode.hasAttribute('data-flyout-duration') ? parseInt(panel.parentNode.getAttribute('data-flyout-duration'), 10) : 500;
    setTimeout(() => {
      panel.style.visibility = null;
      document.body.style.overflow = null;
    }, duration);
  });
  document.querySelectorAll('[data-flyout-open-trigger]').forEach((trigger) => {
    trigger.setAttribute('aria-expanded', false);
  });

  if (this.focusTargets) {
    // Focus on the first trigger.
    setTimeout(() => {
      document.querySelector('[data-flyout-open-trigger]').focus();
    }, this.duration);
  }
};

/**
 * Expand flyout.
 */
CivicThemeFlyout.prototype.expand = function () {
  this.el.expanded = true;
  this.openTrigger.setAttribute('aria-expanded', true);
  this.panel.style.visibility = 'visible';

  // Add required classes.
  this.el.setAttribute('data-flyout-expanded', true);
  this.panel.setAttribute('aria-hidden', false);
  document.body.style.overflow = 'hidden';

  if (this.focusTargets) {
    // Focus on the first available target or close button.
    const focusTargets = [
      ...this.focusTargets,
      '[data-flyout-close-trigger]',
      '[data-flyout-close-all-trigger]',
    ];

    for (let i = 0; i < focusTargets.length; i++) {
      let focusElements = Array.from(this.panel.querySelectorAll(focusTargets[i]));
      // Filter to only focus points found in this panel.
      focusElements = focusElements.filter((el) => (el.closest('[data-flyout-panel]') === this.panel));
      if (focusElements.length > 0) {
        setTimeout(() => focusElements[0].focus(), this.duration);
        break;
      }
    }
  }
};

/**
 * Collapse flyout.
 */
CivicThemeFlyout.prototype.collapse = function () {
  this.el.expanded = false;
  this.openTrigger.setAttribute('aria-expanded', false);
  this.el.removeAttribute('data-flyout-expanded');
  this.panel.setAttribute('aria-hidden', true);
  setTimeout(() => {
    this.panel.style.visibility = null;
    document.body.style.overflow = null;
    if (this.focusTargets) {
      this.openTrigger.focus();
    }
  }, this.duration);
};

// Initialize CivicThemeFlyout on every element.
document.querySelectorAll('[data-flyout]').forEach((flyout) => {
   
  new CivicThemeFlyout(flyout);
});

});
document.addEventListener('DOMContentLoaded', () => {
/**
 * @file
 * Collapsible component.
 *
 * Attaches to markup with 'data-collapsible' attribute.
 * Available attributes:
 * - data-collapsible-trigger - trigger for the collapsible. If not provided,
 *   then the first descendant will be used.
 * - data-collapsible-panel - panel for the collapsible. If not provided,
 *   then the second descendant will be used.
 * - data-collapsible-collapsed - indicate that a starting state is collapsed.
 * - data-collapsible-duration - duration in milliseconds. Defaults to 500.
 * - data-collapsible-group-enabled-breakpoint - enable grouping at breakpoint.
 *   Needs 'data-responsive' attribute.
 */
function CivicThemeCollapsible(el) {
  // Use "data-collapsible"'s attribute value to identify if this component was
  // already initialised.
  if (el.getAttribute('data-collapsible') === 'true' || this.el) {
    return;
  }

  const trigger = this.getTrigger(el);
  const panel = this.getPanel(el);

  // Exit early if trigger or panel were not found.
  if (!trigger || !panel) {
    return;
  }

  this.el = el;
  this.trigger = trigger;
  this.panel = panel;
  this.collapsed = this.isCollapsed(el);
  this.duration = this.el.hasAttribute('data-collapsible-duration') ? this.el.getAttribute('data-collapsible-duration') : 500;
  this.group = this.el.hasAttribute('data-collapsible-group') ? this.el.getAttribute('data-collapsible-group') : null;
  this.icon = '<svg class="ct-icon" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.6072 8.38619C18.3583 8.13884 18.0217 8 17.6709 8C17.32 8 16.9834 8.13884 16.7346 8.38619L11.9668 13.0876L7.26542 8.38619C7.01659 8.13884 6.67999 8 6.32913 8C5.97827 8 5.64167 8.13884 5.39284 8.38619C5.26836 8.50965 5.16956 8.65654 5.10214 8.81838C5.03471 8.98022 5 9.1538 5 9.32912C5 9.50445 5.03471 9.67803 5.10214 9.83987C5.16956 10.0017 5.26836 10.1486 5.39284 10.2721L11.0239 15.9031C11.1473 16.0276 11.2942 16.1264 11.4561 16.1938C11.6179 16.2612 11.7915 16.2959 11.9668 16.2959C12.1421 16.2959 12.3157 16.2612 12.4775 16.1938C12.6394 16.1264 12.7863 16.0276 12.9097 15.9031L18.6072 10.2721C18.7316 10.1486 18.8304 10.0017 18.8979 9.83987C18.9653 9.67803 19 9.50445 19 9.32912C19 9.1538 18.9653 8.98022 18.8979 8.81838C18.8304 8.65654 18.7316 8.50965 18.6072 8.38619Z" /></svg>';
  this.iconGroupEnabled = this.el.hasAttribute('data-collapsible-icon-group');

  // Make sure that both trigger and a panel have required attributes set.
  this.trigger.setAttribute('data-collapsible-trigger', '');
  this.panel.setAttribute('data-collapsible-panel', '');

  if (!this.panel.hasAttribute('data-collapsible-trigger-no-icon') && !this.trigger.querySelector('.ct-collapsible__icon')) {
    const iconEl = this.htmlToElement(this.icon);
    iconEl.classList.add('ct-collapsible__icon');
    // If multiple words - use last word and icon grouping.
    if (this.iconGroupEnabled) {
      const wrapText = (text) => `<span class="ct-text-icon__text">${text}</span>`;
      const text = this.trigger.innerText.trim();
      const lastWordIndex = text.lastIndexOf(' ');
      const lastWord = lastWordIndex >= 0 ? text.substring(lastWordIndex + 1) : text;
      const firstWords = lastWordIndex >= 0 ? text.substring(0, lastWordIndex + 1) : '';
      const iconGroupEl = this.htmlToElement(`<span class="ct-text-icon__group">${wrapText(lastWord)} </span>`);
      iconGroupEl.append(iconEl);
      this.trigger.innerHTML = wrapText(firstWords);
      this.trigger.append(iconGroupEl);
    } else {
      this.trigger.append(iconEl);
    }
  }

  // Attach event listener.
  this.trigger.addEventListener('click', this.clickEvent.bind(this));
  this.trigger.addEventListener('keydown', this.keydownEvent.bind(this.trigger));
  this.trigger.addEventListener('focusout', this.focusoutEvent.bind(this));
  this.panel.addEventListener('click', (e) => e.stopPropagation());
  this.panel.addEventListener('focusout', this.focusoutEvent.bind(this));

  // Set components to their collapsed / expanded state.
  if (this.collapsed) {
    this.setCollapsedState.call(this);
  } else {
    this.setExpandedState.call(this);
  }

  this.el.addEventListener('ct.collapsible.collapse', (evt) => {
    // For some cases (like group collapse) - the animation should be disabled.
    const animate = (evt.detail && evt.detail.animate);
    const isCloseAllEvent = (evt.detail && evt.detail.closeAll);
    if ((isCloseAllEvent && this.isGroupsEnabled) || !isCloseAllEvent) {
      this.collapse(animate, evt);
    }
  });

  this.el.addEventListener('ct.collapsible.expand', () => {
    this.expand(true);
  });

  this.el.addEventListener('ct.collapsible.toggle', () => {
    if (this.isCollapsed(this.el)) {
      this.el.dispatchEvent(new CustomEvent('ct.collapsible.expand', { bubbles: true }));
    } else {
      this.el.dispatchEvent(new CustomEvent('ct.collapsible.collapse', { bubbles: true, detail: { animate: true } }));
    }
  });

  // Attach global keydown event listener to allow closing all collapsibles.
  document.addEventListener('keydown', CivicThemeCollapsible.prototype.keydownEvent);
  document.addEventListener('click', CivicThemeCollapsible.prototype.collapseAllGroups);

  // Responsive Collapsible Group.
  this.isGroupsEnabled = true;
  this.groupEnabledBreakpoint = this.el.getAttribute('data-collapsible-group-enabled-breakpoint');
  if (this.groupEnabledBreakpoint) {
    window.addEventListener('ct-responsive', (evt) => {
      const evaluationResult = evt.detail.evaluate(this.groupEnabledBreakpoint, () => {
        // Is within breakpoint.
        this.isGroupsEnabled = true;
      });
      if (evaluationResult === false) {
        // Not within breakpoint.
        this.isGroupsEnabled = false;
      }
    }, false);
  }

  // Mark as initialized.
  this.el.setAttribute('data-collapsible', 'true');
}

/**
 * Destroy an instance.
 */
CivicThemeCollapsible.prototype.destroy = function (el) {
  if (el.getAttribute('data-collapsible') !== 'true' || !this.el) {
    return;
  }
  const trigger = el.querySelector('[data-collapsible-trigger]') || el.firstElementChild;
  const panel = el.querySelector('[data-collapsible-panel]') || el.firstElementChild.nextElementSibling;

  // Exit early if trigger or panel were not found.
  if (!trigger || !panel) {
    return;
  }

  this.el = el;
  this.trigger = trigger;
  this.panel = panel;

  // Remove any attached event listeners.
  // eslint-disable-next-line no-self-assign
  this.trigger.outerHTML = this.trigger.outerHTML;
  // Remove inline overrides.
  this.panel.style.height = '';
  this.panel.style.overflow = '';

  this.trigger.removeAttribute('aria-expanded');
  this.panel.removeAttribute('aria-hidden');

  // Mark as non-initialized.
  this.el.setAttribute('data-collapsible', '');

  delete this.el;
  delete this.trigger;
  delete this.panel;
  delete this.collapsed;
  delete this.duration;
  delete this.group;
};

/**
 * Click event handler.
 */
CivicThemeCollapsible.prototype.clickEvent = function (e) {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();

  if (this.group) {
    this.closeGroup(this.group);
  }

  if (this.collapsed) {
    this.el.dispatchEvent(new CustomEvent('ct.collapsible.expand', { bubbles: true }));
  } else {
    this.el.dispatchEvent(new CustomEvent('ct.collapsible.collapse', { bubbles: true, detail: { animate: true } }));
  }
};

/**
 * Focusout event handler.
 */
CivicThemeCollapsible.prototype.focusoutEvent = function (e) {
  // Close when trigger or panel leaves a focus, but only for grouped ones.
  if (
    e.relatedTarget
    && !this.panel.contains(e.relatedTarget)
    && !this.trigger.contains(e.relatedTarget)
    && this.group
    && this.isGroupsEnabled
  ) {
    e.target.dispatchEvent(new CustomEvent('ct.collapsible.collapse', { bubbles: true }));
  }
};

/**
 * React on pressed keys.
 */
CivicThemeCollapsible.prototype.keydownEvent = function (e) {
  if (!/(32|27|37|38|39|40)/.test(e.which) || e.altKey || e.ctrlKey || e.metaKey || /input|textarea|select|object/i.test(e.target.tagName)) {
    return;
  }

  e.stopPropagation();

  // ESC.
  if (e.which === 27) {
    CivicThemeCollapsible.prototype.collapseAllGroups();
    return;
  }

  if (this !== document) {
    if ((e.which === 38 || e.which === 40 || e.which === 32) && !e.shiftKey) {
      e.preventDefault();
    }
    // Up or Left.
    if ((e.which === 38 || e.which === 37) && !e.shiftKey) {
      this.dispatchEvent(new CustomEvent('ct.collapsible.collapse', { bubbles: true, detail: { animate: true, keydown: true } }));
      return;
    }
    // Down or Right.
    if ((e.which === 40 || e.which === 39) && !e.shiftKey) {
      this.dispatchEvent(new CustomEvent('ct.collapsible.expand', { bubbles: true }));
    }

    // Space.
    if (e.which === 32) {
      e.target.click();
    }
  }
};

/**
 * Close "other" instances in the group.
 */
CivicThemeCollapsible.prototype.closeGroup = function (group) {
  if (this.isGroupsEnabled) {
    const currentEl = this.el;
    // eslint-disable-next-line prefer-template
    document.querySelectorAll('[data-collapsible-group=' + group + ']:not([data-collapsible-collapsed])').forEach((el) => {
      if (el !== currentEl) {
        el.dispatchEvent(new CustomEvent('ct.collapsible.collapse', { bubbles: true, detail: { closeGroup: true } }));
      }
    });
  }
};

/**
 * Close all grouped instances on the page.
 */
CivicThemeCollapsible.prototype.collapseAllGroups = function () {
  document.querySelectorAll('[data-collapsible-group]').forEach((el) => {
    el.dispatchEvent(new CustomEvent('ct.collapsible.collapse', { bubbles: true, detail: { closeAll: true } }));
  });
};

/**
 * Set elements to their collapsed state.
 */
CivicThemeCollapsible.prototype.setCollapsedState = function () {
  this.panel.style.transition = '';
  this.panel.style.overflow = 'hidden';
  this.panel.style.display = 'none';
  this.el.setAttribute('data-collapsible-collapsed', '');
  this.trigger.setAttribute('data-collapsible-trigger-collapsed', '');
  this.panel.setAttribute('aria-hidden', true);
  this.trigger.setAttribute('aria-expanded', false);
  this.collapsed = true;
};

/**
 * Collapse panel.
 *
 * @param {boolean} animate
 *   Flag to collapse with animation.
 */
CivicThemeCollapsible.prototype.collapse = function (animate, evt) {
  const t = this;

  if (this.isCollapsed(t.el)) {
    return;
  }

  if (evt && evt.target) {
    if (evt.detail && evt.detail.keydown && !evt.detail.closeGroup) {
      if (evt.target.closest('[data-collapsible="true"]') !== t.el) {
        return;
      }
    } else if (evt.currentTarget !== t.el || evt.target !== t.el) {
      return;
    }
  }

  const onTransitionEnd = function () {
    // Remove the event listener straight away.
     
    t.panel.removeEventListener('transitionend', onTransitionEnd);
    // Remove progress state.
    t.el.removeAttribute('data-collapsible-collapsing');
    t.trigger.removeAttribute('data-collapsible-trigger-collapsing');
    // Set all required attributes.
    t.setCollapsedState.call(t);
  };

  if (animate && t.duration > 0) {
    // Support already set transitions.
    const transition = t.panel.style.transition || `height ${t.duration}ms ease-out`;
    // Reset transition and set overflow before animation starts.
    t.panel.style.transition = '';
    t.panel.style.overflow = 'hidden';
    // Get height before animation starts.
    const h = t.panel.scrollHeight;
    requestAnimationFrame(() => {
      // Prepare for animation by setting initial values.
      t.panel.style.transition = transition;
      t.panel.style.height = `${h}px`;
      // Set progress state.
      t.el.setAttribute('data-collapsible-collapsing', '');
      t.trigger.setAttribute('data-collapsible-trigger-collapsing', '');
      requestAnimationFrame(() => {
        // Register an event listener to fire at the end of the transition.
        t.panel.addEventListener('transitionend', onTransitionEnd);
        // Finally, change the height, triggering the transition.
        t.panel.style.height = '0px';
      });
    });
  } else {
    // Store current transition before it will be reset.
    const transition = t.panel.style;
    t.setCollapsedState.call(t);
    // Restore transition.
    t.panel.style.transition = transition;
  }
};

/**
 * Set elements to their expanded state.
 */
CivicThemeCollapsible.prototype.setExpandedState = function () {
  this.panel.style.transition = '';
  this.panel.style.overflow = '';
  this.panel.style.height = '';
  this.panel.style.display = '';
  this.panel.setAttribute('aria-hidden', false);
  this.trigger.setAttribute('aria-expanded', true);
  this.el.removeAttribute('data-collapsible-collapsed');
  this.trigger.removeAttribute('data-collapsible-trigger-collapsed');
  this.collapsed = false;
};

/**
 * Expand panel.
 *
 * @param {boolean} animate
 *   Flag to expand with animation.
 */
CivicThemeCollapsible.prototype.expand = function (animate) {
  const t = this;

  if (!this.isCollapsed(t.el)) {
    return;
  }

  const onTransitionEnd = function () {
    // Remove the event listener straight away.
     
    t.panel.removeEventListener('transitionend', onTransitionEnd);
    // Set all required attributes.
    t.setExpandedState.call(t);
    // Remove progress state.
    t.el.removeAttribute('data-collapsible-collapsing');
    t.trigger.removeAttribute('data-collapsible-trigger-collapsing');
  };

  if (animate && t.duration > 0) {
    // Get height before animation starts.
    t.panel.style.display = '';
    t.panel.style.height = '';
    const h = t.panel.scrollHeight;

    // Set progress state.
    t.el.setAttribute('data-collapsible-collapsing', '');
    t.trigger.setAttribute('data-collapsible-trigger-collapsing', '');
    t.panel.style.height = '0px';
    requestAnimationFrame(() => {
      // Prepare for animation by setting initial values.
      t.panel.style.transition = t.panel.style.transition || `height ${t.duration}ms ease-out`;

      requestAnimationFrame(() => {
        // Register an event listener to fire at the end of the transition.
        t.panel.addEventListener('transitionend', onTransitionEnd);
        // Finally, change the height, triggering the transition.
        t.panel.style.height = `${h}px`;
      });
    });
  } else {
    const transition = t.panel.style;
    t.setExpandedState.call(t);
    t.panel.style.transition = transition;
  }
};

/**
 * Check if the collapsible is collapsed.
 */
CivicThemeCollapsible.prototype.isCollapsed = function (el) {
  return el.hasAttribute('data-collapsible-collapsed');
};

/**
 * Get trigger element.
 */
CivicThemeCollapsible.prototype.getTrigger = function (el) {
  return el.querySelector('[data-collapsible-trigger]') || el.firstElementChild || null;
};

/**
 * Get panel element.
 */
CivicThemeCollapsible.prototype.getPanel = function (el) {
  let panelEl = el.querySelector('[data-collapsible-panel]');
  if (!panelEl) {
    const triggerEl = this.getTrigger(el);
    if (triggerEl) {
      panelEl = triggerEl.nextElementSibling;
    }
  }
  return panelEl;
};

/**
 * Convert HTML to a DOM element.
 */
CivicThemeCollapsible.prototype.htmlToElement = function (html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

document.querySelectorAll('[data-collapsible]').forEach((el) => {
  // Delay initialisation if should be responsive.
  const breakpointExpr = el.getAttribute('data-responsive');
  if (breakpointExpr) {
    window.addEventListener('ct-responsive', (evt) => {
      evt.detail.evaluate(breakpointExpr, CivicThemeCollapsible, el);
    }, false);
    return;
  }

  new CivicThemeCollapsible(el);
});

});