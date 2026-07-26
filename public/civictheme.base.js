// phpcs:ignoreFile
/**
 * This file was automatically generated. Please run `npm run dist` to update.
 */
var CivicTheme = (function(exports) {
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null;
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (node.toString() !== "[object Window]") {
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
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name];
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(name2) {
        var value = attributes[name2];
        if (value === false) {
          element.removeAttribute(name2);
        } else {
          element.setAttribute(name2, value === true ? "" : value);
        }
      });
    });
  }
  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return function() {
      Object.keys(state.elements).forEach(function(name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
        var style = styleProperties.reduce(function(style2, property) {
          style2[property] = "";
          return style2;
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }
  const applyStyles$1 = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: effect$2,
    requires: ["computeStyles"]
  };
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;
  function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function(item) {
        return item.brand + "/" + item.version;
      }).join(" ");
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
    var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x,
      y
    };
  }
  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
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
      width,
      height
    };
  }
  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
      return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) {
          return true;
        }
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
  }
  function getDocumentElement(element) {
    return ((isElement(element) ? element.ownerDocument : (
      // $FlowFixMe[prop-missing]
      element.document
    )) || window.document).documentElement;
  }
  function getParentNode(element) {
    if (getNodeName(element) === "html") {
      return element;
    }
    return (
      // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || // DOM Element detected
      (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element)
    );
  }
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === "fixed") {
      return null;
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle$1(element);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return null;
  }
  function getOffsetParent(element) {
    var window2 = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }
  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min2, value, max2) {
    var v = within(min2, value, max2);
    return v > max2 ? max2 : v;
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
    return keys.reduce(function(hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }
  var toPaddingObject = function toPaddingObject2(padding, state) {
    padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  };
  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state, name = _ref.name, options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets2) {
      return;
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
    var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min2 = paddingObject[minProp];
    var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset2 = within(min2, center, max2);
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
  }
  function effect$1(_ref2) {
    var state = _ref2.state, options = _ref2.options;
    var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) {
      return;
    }
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return;
      }
    }
    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }
    state.elements.arrow = arrowElement;
  }
  const arrow$1 = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: effect$1,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
  function getVariation(placement) {
    return placement.split("-")[1];
  }
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x, y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper2);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper2)) {
        offsetParent = getDocumentElement(popper2);
        if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
          // $FlowFixMe[prop-missing]
          offsetParent[heightProp]
        );
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
          // $FlowFixMe[prop-missing]
          offsetParent[widthProp]
        );
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x,
      y
    }, getWindow(popper2)) : {
      x,
      y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration,
      isFixed: state.options.strategy === "fixed"
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive,
        roundOffsets
      })));
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets
      })));
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    });
  }
  const computeStyles$1 = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };
  var passive = {
    passive: true
  };
  function effect(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.addEventListener("resize", instance.update, passive);
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive);
        });
      }
      if (resize) {
        window2.removeEventListener("resize", instance.update, passive);
      }
    };
  }
  const eventListeners = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {
    },
    effect,
    data: {}
  };
  var hash$1 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash$1[matched];
    });
  }
  var hash = {
    start: "end",
    end: "start"
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
      return hash[matched];
    });
  }
  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop
    };
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
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
      if (layoutViewport || !layoutViewport && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x + getWindowScrollBarX(element),
      y
    };
  }
  function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle$1(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }
    return getScrollParent(getParentNode(node));
  }
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
    return isBody ? updatedList : (
      // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)))
    );
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
    var rect = getBoundingClientRect(element, false, strategy === "fixed");
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
  }
  function getClippingParents(element) {
    var clippingParents2 = listScrollParents(getParentNode(element));
    var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
      return [];
    }
    return clippingParents2.filter(function(clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
    });
  }
  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
    var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents2[0];
    var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
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
  function computeOffsets(_ref) {
    var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference2.x + reference2.width / 2 - element.width / 2;
    var commonY = reference2.y + reference2.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference2.y - element.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference2.y + reference2.height
        };
        break;
      case right:
        offsets = {
          x: reference2.x + reference2.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference2.x - element.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference2.x,
          y: reference2.y
        };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
          break;
      }
    }
    return offsets;
  }
  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets2 = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset2 = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function(key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset2[axis] * multiply;
      });
    }
    return overflowOffsets;
  }
  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
      return getVariation(placement2) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function(placement2) {
      return allowedAutoPlacements.indexOf(placement2) >= 0;
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    }
    var overflows = allowedPlacements.reduce(function(acc, placement2) {
      acc[placement2] = detectOverflow(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding
      })[getBasePlacement(placement2)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
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
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) {
      return;
    }
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
      return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding,
        flipVariations,
        allowedAutoPlacements
      }) : placement2);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = /* @__PURE__ */ new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements2[0];
    for (var i = 0; i < placements2.length; i++) {
      var placement = placements2[i];
      var _basePlacement = getBasePlacement(placement);
      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        altBoundary,
        padding
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
      if (checks.every(function(check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }
      checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop2(_i2) {
        var fittingPlacement = placements2.find(function(placement2) {
          var checks2 = checksMap.get(placement2);
          if (checks2) {
            return checks2.slice(0, _i2).every(function(check) {
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
  }
  const flip$1 = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
      _skip: false
    }
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
    return [top, right, bottom, left].some(function(side) {
      return overflow[side] >= 0;
    });
  }
  function hide(_ref) {
    var state = _ref.state, name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference"
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets,
      popperEscapeOffsets,
      isReferenceHidden,
      hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped
    });
  }
  const hide$1 = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
  };
  function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
      placement
    })) : offset2, skidding = _ref[0], distance = _ref[1];
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
    var state = _ref2.state, options = _ref2.options, name = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
  }
  const offset$1 = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };
  function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      placement: state.placement
    });
  }
  const popperOffsets$1 = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };
  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function preventOverflow(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary,
      rootBoundary,
      padding,
      altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
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
    if (!popperOffsets2) {
      return;
    }
    if (checkMainAxis) {
      var _offsetModifierState$;
      var mainSide = mainAxis === "y" ? top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset2 = popperOffsets2[mainAxis];
      var min$1 = offset2 + overflow[mainSide];
      var max$1 = offset2 - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset2 + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _offsetModifierState$2;
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _len = altAxis === "y" ? "height" : "width";
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data;
  }
  const preventOverflow$1 = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
  };
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
  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  }
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
      if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
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
  function order(modifiers) {
    var map = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier);
      }
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }
  function debounce(fn) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn());
          });
        });
      }
      return pending;
    };
  }
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged2, current) {
      var existing = merged2[current.name];
      merged2[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged2;
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key];
    });
  }
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return !args.some(function(element) {
      return !(element && typeof element.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper2(reference2, popper2, options) {
      if (options === void 0) {
        options = defaultOptions;
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference2,
          popper: popper2
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state,
        setOptions: function setOptions(setOptionsAction) {
          var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options2);
          state.scrollParents = {
            reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
            popper: listScrollParents(popper2)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
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
          var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
          if (!areValidElements(reference3, popper3)) {
            return;
          }
          state.rects = {
            reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper3)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
            if (typeof fn === "function") {
              state = fn({
                state,
                options: _options,
                name,
                instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function() {
          return new Promise(function(resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };
      if (!areValidElements(reference2, popper2)) {
        return instance;
      }
      instance.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref) {
          var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
          if (typeof effect2 === "function") {
            var cleanupFn = effect2({
              state,
              name,
              instance,
              options: options2
            });
            var noopFn = function noopFn2() {
            };
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn) {
          return fn();
        });
        effectCleanupFns = [];
      }
      return instance;
    };
  }
  var createPopper$2 = /* @__PURE__ */ popperGenerator();
  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /* @__PURE__ */ popperGenerator({
    defaultModifiers: defaultModifiers$1
  });
  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /* @__PURE__ */ popperGenerator({
    defaultModifiers
  });
  const Popper$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    afterMain,
    afterRead,
    afterWrite,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    auto,
    basePlacements,
    beforeMain,
    beforeRead,
    beforeWrite,
    bottom,
    clippingParents,
    computeStyles: computeStyles$1,
    createPopper,
    createPopperBase: createPopper$2,
    createPopperLite: createPopper$1,
    detectOverflow,
    end,
    eventListeners,
    flip: flip$1,
    hide: hide$1,
    left,
    main,
    modifierPhases,
    offset: offset$1,
    placements,
    popper,
    popperGenerator,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1,
    read,
    reference,
    right,
    start,
    top,
    variationPlacements,
    viewport,
    write
  }, Symbol.toStringTag, { value: "Module" }));
  function init0() {
    function CivicThemeCollapsible(el) {
      if (el.getAttribute("data-collapsible") === "true" || this.el) {
        return;
      }
      const trigger = this.getTrigger(el);
      const panel = this.getPanel(el);
      if (!trigger || !panel) {
        return;
      }
      this.el = el;
      this.trigger = trigger;
      this.panel = panel;
      this.collapsed = this.isCollapsed(el);
      this.duration = this.el.hasAttribute("data-collapsible-duration") ? this.el.getAttribute("data-collapsible-duration") : 500;
      this.group = this.el.hasAttribute("data-collapsible-group") ? this.el.getAttribute("data-collapsible-group") : null;
      this.icon = '<svg class="ct-icon" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.6072 8.38619C18.3583 8.13884 18.0217 8 17.6709 8C17.32 8 16.9834 8.13884 16.7346 8.38619L11.9668 13.0876L7.26542 8.38619C7.01659 8.13884 6.67999 8 6.32913 8C5.97827 8 5.64167 8.13884 5.39284 8.38619C5.26836 8.50965 5.16956 8.65654 5.10214 8.81838C5.03471 8.98022 5 9.1538 5 9.32912C5 9.50445 5.03471 9.67803 5.10214 9.83987C5.16956 10.0017 5.26836 10.1486 5.39284 10.2721L11.0239 15.9031C11.1473 16.0276 11.2942 16.1264 11.4561 16.1938C11.6179 16.2612 11.7915 16.2959 11.9668 16.2959C12.1421 16.2959 12.3157 16.2612 12.4775 16.1938C12.6394 16.1264 12.7863 16.0276 12.9097 15.9031L18.6072 10.2721C18.7316 10.1486 18.8304 10.0017 18.8979 9.83987C18.9653 9.67803 19 9.50445 19 9.32912C19 9.1538 18.9653 8.98022 18.8979 8.81838C18.8304 8.65654 18.7316 8.50965 18.6072 8.38619Z" /></svg>';
      this.iconGroupEnabled = this.el.hasAttribute("data-collapsible-icon-group");
      this.trigger.setAttribute("data-collapsible-trigger", "");
      this.panel.setAttribute("data-collapsible-panel", "");
      if (!this.panel.hasAttribute("data-collapsible-trigger-no-icon") && !this.trigger.querySelector(".ct-collapsible__icon")) {
        const iconEl = this.htmlToElement(this.icon);
        iconEl.classList.add("ct-collapsible__icon");
        if (this.iconGroupEnabled) {
          const wrapText = (text2) => `<span class="ct-text-icon__text">${text2}</span>`;
          const text = this.trigger.innerText.trim();
          const lastWordIndex = text.lastIndexOf(" ");
          const lastWord = lastWordIndex >= 0 ? text.substring(lastWordIndex + 1) : text;
          const firstWords = lastWordIndex >= 0 ? text.substring(0, lastWordIndex + 1) : "";
          const iconGroupEl = this.htmlToElement(`<span class="ct-text-icon__group">${wrapText(lastWord)} </span>`);
          iconGroupEl.append(iconEl);
          this.trigger.innerHTML = wrapText(firstWords);
          this.trigger.append(iconGroupEl);
        } else {
          this.trigger.append(iconEl);
        }
      }
      this.trigger.addEventListener("click", this.clickEvent.bind(this));
      this.trigger.addEventListener("keydown", this.keydownEvent.bind(this.trigger));
      this.trigger.addEventListener("focusout", this.focusoutEvent.bind(this));
      this.panel.addEventListener("click", (e) => e.stopPropagation());
      this.panel.addEventListener("focusout", this.focusoutEvent.bind(this));
      if (this.collapsed) {
        this.setCollapsedState.call(this);
      } else {
        this.setExpandedState.call(this);
      }
      this.el.addEventListener("ct.collapsible.collapse", (evt) => {
        const animate = evt.detail && evt.detail.animate;
        const isCloseAllEvent = evt.detail && evt.detail.closeAll;
        if (isCloseAllEvent && this.isGroupsEnabled || !isCloseAllEvent) {
          this.collapse(animate, evt);
        }
      });
      this.el.addEventListener("ct.collapsible.expand", () => {
        this.expand(true);
      });
      this.el.addEventListener("ct.collapsible.toggle", () => {
        if (this.isCollapsed(this.el)) {
          this.el.dispatchEvent(new CustomEvent("ct.collapsible.expand", { bubbles: true }));
        } else {
          this.el.dispatchEvent(new CustomEvent("ct.collapsible.collapse", { bubbles: true, detail: { animate: true } }));
        }
      });
      document.addEventListener("keydown", CivicThemeCollapsible.prototype.keydownEvent);
      document.addEventListener("click", CivicThemeCollapsible.prototype.collapseAllGroups);
      this.isGroupsEnabled = true;
      this.groupEnabledBreakpoint = this.el.getAttribute("data-collapsible-group-enabled-breakpoint");
      if (this.groupEnabledBreakpoint) {
        window.addEventListener("ct-responsive", (evt) => {
          const evaluationResult = evt.detail.evaluate(this.groupEnabledBreakpoint, () => {
            this.isGroupsEnabled = true;
          });
          if (evaluationResult === false) {
            this.isGroupsEnabled = false;
          }
        }, false);
      }
      this.el.setAttribute("data-collapsible", "true");
    }
    CivicThemeCollapsible.prototype.destroy = function(el) {
      if (el.getAttribute("data-collapsible") !== "true" || !this.el) {
        return;
      }
      const trigger = el.querySelector("[data-collapsible-trigger]") || el.firstElementChild;
      const panel = el.querySelector("[data-collapsible-panel]") || el.firstElementChild.nextElementSibling;
      if (!trigger || !panel) {
        return;
      }
      this.el = el;
      this.trigger = trigger;
      this.panel = panel;
      this.trigger.outerHTML = this.trigger.outerHTML;
      this.panel.style.height = "";
      this.panel.style.overflow = "";
      this.trigger.removeAttribute("aria-expanded");
      this.panel.removeAttribute("aria-hidden");
      this.el.setAttribute("data-collapsible", "");
      delete this.el;
      delete this.trigger;
      delete this.panel;
      delete this.collapsed;
      delete this.duration;
      delete this.group;
    };
    CivicThemeCollapsible.prototype.clickEvent = function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.stopImmediatePropagation();
      if (this.group) {
        this.closeGroup(this.group);
      }
      if (this.collapsed) {
        this.el.dispatchEvent(new CustomEvent("ct.collapsible.expand", { bubbles: true }));
      } else {
        this.el.dispatchEvent(new CustomEvent("ct.collapsible.collapse", { bubbles: true, detail: { animate: true } }));
      }
    };
    CivicThemeCollapsible.prototype.focusoutEvent = function(e) {
      if (e.relatedTarget && !this.panel.contains(e.relatedTarget) && !this.trigger.contains(e.relatedTarget) && this.group && this.isGroupsEnabled) {
        e.target.dispatchEvent(new CustomEvent("ct.collapsible.collapse", { bubbles: true }));
      }
    };
    CivicThemeCollapsible.prototype.keydownEvent = function(e) {
      if (!/(32|27|37|38|39|40)/.test(e.which) || e.altKey || e.ctrlKey || e.metaKey || /input|textarea|select|object/i.test(e.target.tagName)) {
        return;
      }
      e.stopPropagation();
      if (e.which === 27) {
        CivicThemeCollapsible.prototype.collapseAllGroups();
        return;
      }
      if (this !== document) {
        if ((e.which === 38 || e.which === 40 || e.which === 32) && !e.shiftKey) {
          e.preventDefault();
        }
        if ((e.which === 38 || e.which === 37) && !e.shiftKey) {
          this.dispatchEvent(new CustomEvent("ct.collapsible.collapse", { bubbles: true, detail: { animate: true, keydown: true } }));
          return;
        }
        if ((e.which === 40 || e.which === 39) && !e.shiftKey) {
          this.dispatchEvent(new CustomEvent("ct.collapsible.expand", { bubbles: true }));
        }
        if (e.which === 32) {
          e.target.click();
        }
      }
    };
    CivicThemeCollapsible.prototype.closeGroup = function(group) {
      if (this.isGroupsEnabled) {
        const currentEl = this.el;
        document.querySelectorAll("[data-collapsible-group=" + group + "]:not([data-collapsible-collapsed])").forEach((el) => {
          if (el !== currentEl) {
            el.dispatchEvent(new CustomEvent("ct.collapsible.collapse", { bubbles: true, detail: { closeGroup: true } }));
          }
        });
      }
    };
    CivicThemeCollapsible.prototype.collapseAllGroups = function() {
      document.querySelectorAll("[data-collapsible-group]").forEach((el) => {
        el.dispatchEvent(new CustomEvent("ct.collapsible.collapse", { bubbles: true, detail: { closeAll: true } }));
      });
    };
    CivicThemeCollapsible.prototype.setCollapsedState = function() {
      this.panel.style.transition = "";
      this.panel.style.overflow = "hidden";
      this.panel.style.display = "none";
      this.el.setAttribute("data-collapsible-collapsed", "");
      this.trigger.setAttribute("data-collapsible-trigger-collapsed", "");
      this.panel.setAttribute("aria-hidden", true);
      this.trigger.setAttribute("aria-expanded", false);
      this.collapsed = true;
    };
    CivicThemeCollapsible.prototype.collapse = function(animate, evt) {
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
      const onTransitionEnd = function() {
        t.panel.removeEventListener("transitionend", onTransitionEnd);
        t.el.removeAttribute("data-collapsible-collapsing");
        t.trigger.removeAttribute("data-collapsible-trigger-collapsing");
        t.setCollapsedState.call(t);
      };
      if (animate && t.duration > 0) {
        const transition = t.panel.style.transition || `height ${t.duration}ms ease-out`;
        t.panel.style.transition = "";
        t.panel.style.overflow = "hidden";
        const h = t.panel.scrollHeight;
        requestAnimationFrame(() => {
          t.panel.style.transition = transition;
          t.panel.style.height = `${h}px`;
          t.el.setAttribute("data-collapsible-collapsing", "");
          t.trigger.setAttribute("data-collapsible-trigger-collapsing", "");
          requestAnimationFrame(() => {
            t.panel.addEventListener("transitionend", onTransitionEnd);
            t.panel.style.height = "0px";
          });
        });
      } else {
        const transition = t.panel.style;
        t.setCollapsedState.call(t);
        t.panel.style.transition = transition;
      }
    };
    CivicThemeCollapsible.prototype.setExpandedState = function() {
      this.panel.style.transition = "";
      this.panel.style.overflow = "";
      this.panel.style.height = "";
      this.panel.style.display = "";
      this.panel.setAttribute("aria-hidden", false);
      this.trigger.setAttribute("aria-expanded", true);
      this.el.removeAttribute("data-collapsible-collapsed");
      this.trigger.removeAttribute("data-collapsible-trigger-collapsed");
      this.collapsed = false;
    };
    CivicThemeCollapsible.prototype.expand = function(animate) {
      const t = this;
      if (!this.isCollapsed(t.el)) {
        return;
      }
      const onTransitionEnd = function() {
        t.panel.removeEventListener("transitionend", onTransitionEnd);
        t.setExpandedState.call(t);
        t.el.removeAttribute("data-collapsible-collapsing");
        t.trigger.removeAttribute("data-collapsible-trigger-collapsing");
      };
      if (animate && t.duration > 0) {
        t.panel.style.display = "";
        t.panel.style.height = "";
        const h = t.panel.scrollHeight;
        t.el.setAttribute("data-collapsible-collapsing", "");
        t.trigger.setAttribute("data-collapsible-trigger-collapsing", "");
        t.panel.style.height = "0px";
        requestAnimationFrame(() => {
          t.panel.style.transition = t.panel.style.transition || `height ${t.duration}ms ease-out`;
          requestAnimationFrame(() => {
            t.panel.addEventListener("transitionend", onTransitionEnd);
            t.panel.style.height = `${h}px`;
          });
        });
      } else {
        const transition = t.panel.style;
        t.setExpandedState.call(t);
        t.panel.style.transition = transition;
      }
    };
    CivicThemeCollapsible.prototype.isCollapsed = function(el) {
      return el.hasAttribute("data-collapsible-collapsed");
    };
    CivicThemeCollapsible.prototype.getTrigger = function(el) {
      return el.querySelector("[data-collapsible-trigger]") || el.firstElementChild || null;
    };
    CivicThemeCollapsible.prototype.getPanel = function(el) {
      let panelEl = el.querySelector("[data-collapsible-panel]");
      if (!panelEl) {
        const triggerEl = this.getTrigger(el);
        if (triggerEl) {
          panelEl = triggerEl.nextElementSibling;
        }
      }
      return panelEl;
    };
    CivicThemeCollapsible.prototype.htmlToElement = function(html) {
      const template = document.createElement("template");
      template.innerHTML = html.trim();
      return template.content.firstChild;
    };
    document.querySelectorAll("[data-collapsible]").forEach((el) => {
      const breakpointExpr = el.getAttribute("data-responsive");
      if (breakpointExpr) {
        window.addEventListener("ct-responsive", (evt) => {
          evt.detail.evaluate(breakpointExpr, CivicThemeCollapsible, el);
        }, false);
        return;
      }
      new CivicThemeCollapsible(el);
    });
  }
  function init1() {
    function CivicThemeFlyout(el) {
      if (el.getAttribute("data-flyout") === "true" || this.el) {
        return;
      }
      const openTriggers = document.querySelectorAll("[data-flyout-open-trigger]");
      if (!openTriggers.length) {
        return;
      }
      this.openTrigger = this.findOpenTrigger(openTriggers, el);
      if (!this.openTrigger) {
        return;
      }
      this.el = el;
      this.closeTriggers = Array.from(this.el.querySelectorAll("[data-flyout-close-trigger]"));
      this.closeTriggers = this.closeTriggers.filter((item) => item.closest("[data-flyout]") === this.el);
      this.closeAllTriggers = Array.from(this.el.querySelectorAll("[data-flyout-close-all-trigger]"));
      this.closeAllTriggers = this.closeAllTriggers.filter((item) => item.closest("[data-flyout]") === this.el);
      this.panel = this.el.querySelector("[data-flyout-panel]");
      this.el.expanded = this.el.hasAttribute("data-flyout-expanded");
      this.duration = this.el.hasAttribute("data-flyout-duration") ? parseInt(this.el.getAttribute("data-flyout-duration"), 10) : 500;
      this.focusTargets = this.el.hasAttribute("data-flyout-focus") ? this.el.getAttribute("data-flyout-focus").split(",").filter((i) => i) : [];
      if (this.openTrigger) {
        this.openTrigger.addEventListener("click", this.clickEvent.bind(this));
        this.openTrigger.expand = true;
      }
      if (this.closeTriggers) {
        this.closeTriggers.forEach((trigger) => {
          trigger.addEventListener("click", this.clickEvent.bind(this));
          trigger.expand = false;
        });
      }
      if (this.closeAllTriggers) {
        this.closeAllTriggers.forEach((trigger) => {
          trigger.addEventListener("click", this.closeAllTriggerClickEvent.bind(this));
        });
      }
      document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
          const flyoutElements = document.querySelectorAll("[data-flyout]");
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
      this.el.setAttribute("data-flyout", "true");
    }
    CivicThemeFlyout.prototype.findOpenTrigger = function(triggers, el) {
      for (const i in triggers) {
        if (Object.prototype.hasOwnProperty.call(triggers, i)) {
          if (triggers[i].hasAttribute("data-flyout-target")) {
            const found = document.querySelector(triggers[i].getAttribute("data-flyout-target"));
            if (found === el) {
              return triggers[i];
            }
          } else if (triggers[i].nextElementSibling && triggers[i].nextElementSibling.hasAttribute("data-flyout")) {
            const found = triggers[i].nextElementSibling;
            if (found === el) {
              return triggers[i];
            }
          }
        }
      }
      return null;
    };
    CivicThemeFlyout.prototype.clickEvent = function(e) {
      e.stopPropagation();
      if (e.target.hasAttribute("data-flyout-trigger-allow-default") !== true) {
        e.preventDefault();
      }
      return e.currentTarget.expand ? this.expand() : this.collapse();
    };
    CivicThemeFlyout.prototype.closeAllTriggerClickEvent = function(e) {
      e.stopPropagation();
      if (e.target.hasAttribute("data-flyout-trigger-allow-default") !== true) {
        e.preventDefault();
      }
      document.querySelectorAll("[data-flyout-expanded]").forEach((flyout) => {
        flyout.removeAttribute("data-flyout-expanded");
      });
      document.querySelectorAll("[data-flyout-panel]").forEach((panel) => {
        panel.setAttribute("aria-hidden", true);
        const duration = panel.parentNode.hasAttribute("data-flyout-duration") ? parseInt(panel.parentNode.getAttribute("data-flyout-duration"), 10) : 500;
        setTimeout(() => {
          panel.style.visibility = null;
          document.body.style.overflow = null;
        }, duration);
      });
      document.querySelectorAll("[data-flyout-open-trigger]").forEach((trigger) => {
        trigger.setAttribute("aria-expanded", false);
      });
      if (this.focusTargets) {
        setTimeout(() => {
          document.querySelector("[data-flyout-open-trigger]").focus();
        }, this.duration);
      }
    };
    CivicThemeFlyout.prototype.expand = function() {
      this.el.expanded = true;
      this.openTrigger.setAttribute("aria-expanded", true);
      this.panel.style.visibility = "visible";
      this.el.setAttribute("data-flyout-expanded", true);
      this.panel.setAttribute("aria-hidden", false);
      document.body.style.overflow = "hidden";
      if (this.focusTargets) {
        const focusTargets = [
          ...this.focusTargets,
          "[data-flyout-close-trigger]",
          "[data-flyout-close-all-trigger]"
        ];
        for (let i = 0; i < focusTargets.length; i++) {
          let focusElements = Array.from(this.panel.querySelectorAll(focusTargets[i]));
          focusElements = focusElements.filter((el) => el.closest("[data-flyout-panel]") === this.panel);
          if (focusElements.length > 0) {
            setTimeout(() => focusElements[0].focus(), this.duration);
            break;
          }
        }
      }
    };
    CivicThemeFlyout.prototype.collapse = function() {
      this.el.expanded = false;
      this.openTrigger.setAttribute("aria-expanded", false);
      this.el.removeAttribute("data-flyout-expanded");
      this.panel.setAttribute("aria-hidden", true);
      setTimeout(() => {
        this.panel.style.visibility = null;
        document.body.style.overflow = null;
        if (this.focusTargets) {
          this.openTrigger.focus();
        }
      }, this.duration);
    };
    document.querySelectorAll("[data-flyout]").forEach((flyout) => {
      new CivicThemeFlyout(flyout);
    });
  }
  function init2() {
    function CivicThemeLayout(el) {
      this.el = el;
      this.grid = el.querySelector(":scope > .ct-layout__inner");
      const gridStyle = getComputedStyle(this.grid);
      if (gridStyle.gridTemplateRows === "masonry" || this.grid.hasAttribute("data-masonry")) {
        return;
      }
      this.grid.setAttribute("data-masonry", true);
      this.stl = this.grid.querySelector(":scope > .ct-layout__sidebar_top_left");
      this.str = this.grid.querySelector(":scope > .ct-layout__sidebar_top_right");
      this.sbl = this.grid.querySelector(":scope > .ct-layout__sidebar_bottom_left");
      this.sbr = this.grid.querySelector(":scope > .ct-layout__sidebar_bottom_right");
      if (this.stl && this.str && this.sbl && this.sbr) {
        this.gap = parseFloat(gridStyle.gridRowGap);
        this.items = Array.from(this.grid.children);
        this.height = 0;
        this.resizeObserver = new ResizeObserver(() => {
          requestAnimationFrame(() => {
            this.masonryRedraw();
          });
        });
        this.items.forEach((item) => {
          Array.from(item.children).forEach((child) => {
            this.resizeObserver.observe(child);
          });
        });
        this.masonryRedraw();
      }
    }
    CivicThemeLayout.prototype.masonryPositionElement = function(el, aboveEl, gap) {
      const aboveChildIdx = aboveEl.children.length - 1;
      const aboveChild = aboveChildIdx >= 0 ? aboveEl.children[aboveChildIdx] : null;
      const aboveBottom = aboveChild ? aboveChild.getBoundingClientRect().bottom : aboveEl.getBoundingClientRect().top;
      const currentTop = el.getBoundingClientRect().top;
      el.style.marginTop = `${aboveBottom + gap - currentTop}px`;
    };
    CivicThemeLayout.prototype.masonryRedraw = function() {
      const newHeight = this.items.reduce((totalHeight, item) => {
        const childrenHeight = Array.from(item.children).reduce((childTotal, child) => childTotal + child.getBoundingClientRect().height, 0);
        return totalHeight + childrenHeight;
      }, 0);
      if (newHeight !== this.height) {
        this.height = newHeight;
        this.sbl.style.removeProperty("margin-top");
        this.sbr.style.removeProperty("margin-top");
        if (getComputedStyle(this.grid).getPropertyValue("--js-masonry-enabled")) {
          this.masonryPositionElement(this.sbl, this.stl, this.gap);
          this.masonryPositionElement(this.sbr, this.str, this.gap);
        }
      }
    };
    document.querySelectorAll(".ct-layout").forEach((layout) => {
      new CivicThemeLayout(layout);
    });
  }
  function init3() {
    function CivicThemePlatform(el) {
      function iOS() {
        return [
          "iPad Simulator",
          "iPhone Simulator",
          "iPod Simulator",
          "iPad",
          "iPhone",
          "iPod"
        ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
      }
      if (iOS()) {
        el.dataset.platform = "ios";
      }
    }
    document.querySelectorAll("[data-platform]").forEach((el) => {
      new CivicThemePlatform(el);
    });
  }
  function init4() {
    function CivicThemeResponsive() {
      const queries = this.getMediaQueries();
      for (const breakpoint in queries) {
        const query = queries[breakpoint];
        window.civicthemeResponsive = window.civicthemeResponsive || {};
        if (!(query in window.civicthemeResponsive)) {
          window.civicthemeResponsive[query] = window.matchMedia(query);
          const hasEventListener = window.civicthemeResponsive[query].addEventListener !== void 0;
          if (hasEventListener) {
            window.civicthemeResponsive[query].addEventListener("change", this.mediaQueryChange.bind(this, breakpoint));
          } else {
            window.civicthemeResponsive[query].addListener(this.mediaQueryChange.bind(this, breakpoint));
          }
        }
        this.mediaQueryChange(breakpoint, { matches: window.civicthemeResponsive[query].matches });
      }
    }
    CivicThemeResponsive.prototype.breakpoints = {
      xxs: "0px",
      xs: "368px",
      s: "576px",
      m: "768px",
      l: "992px",
      xl: "1280px",
      xxl: "1440px"
    };
    CivicThemeResponsive.prototype.getMediaQueries = function() {
      const queries = {};
      const firstBp = Object.keys(this.breakpoints)[0];
      let lastBp = firstBp;
      for (const breakpoint in this.breakpoints) {
        if (breakpoint === firstBp) {
          continue;
        }
        const min2 = this.breakpoints[lastBp];
        const max2 = `${Math.max(parseFloat(this.breakpoints[breakpoint]) - 0.02, 0)}px`;
        if (lastBp === firstBp) {
          queries[lastBp] = `screen and (max-width: ${max2})`;
        } else {
          queries[lastBp] = `screen and (min-width: ${min2}) and (max-width: ${max2})`;
        }
        lastBp = breakpoint;
      }
      queries[lastBp] = `screen and (min-width: ${this.breakpoints[lastBp]})`;
      return queries;
    };
    CivicThemeResponsive.prototype.mediaQueryChange = function(breakpoint, evt) {
      if (!evt.matches) {
        return;
      }
      window.dispatchEvent(new CustomEvent("ct-responsive", {
        bubbles: true,
        detail: {
          breakpoint,
          evaluate: CivicThemeResponsive.prototype.evaluate
        }
      }));
    };
    CivicThemeResponsive.prototype.evaluate = function(breakpointExpr, func, el) {
      if (CivicThemeResponsive.prototype.matchExpr(breakpointExpr, this.breakpoint)) {
        return new func(el);
      }
      if (typeof func.prototype.destroy !== "undefined") {
        func.prototype.destroy(el);
        return true;
      }
      return false;
    };
    CivicThemeResponsive.prototype.matchExpr = function(breakpointExpr, breakpoint) {
      const names = Object.keys(CivicThemeResponsive.prototype.breakpoints);
      const regex = `^(<|>|=|>=|<=|<>)?(${names.join("|")})$`;
      const matches = breakpointExpr.match(new RegExp(regex, "i"));
      if (!matches || matches.length < 2 || matches.length > 3) {
        return false;
      }
      const parsedOperator = matches[1] || ">=";
      const parsedBreakpoint = matches[2];
      const compFunctions = {
        ">": (parsed, current) => names.indexOf(current) > names.indexOf(parsed),
        ">=": (parsed, current) => names.indexOf(current) >= names.indexOf(parsed),
        "<": (parsed, current) => names.indexOf(current) < names.indexOf(parsed),
        "<=": (parsed, current) => names.indexOf(current) <= names.indexOf(parsed),
        "<>": (parsed, current) => names.indexOf(current) !== names.indexOf(parsed),
        "=": (parsed, current) => names.indexOf(current) === names.indexOf(parsed)
      };
      return compFunctions[parsedOperator](parsedBreakpoint, breakpoint);
    };
    if (document.querySelectorAll("[data-responsive]").length) {
      setTimeout(() => {
        new CivicThemeResponsive();
      }, 10);
    }
  }
  function init5() {
    function CivicThemeScrollspy(el) {
      if (el.getAttribute("data-scrollspy") === "true" || this.el) {
        return;
      }
      this.el = el;
      this.offset = this.el.hasAttribute("data-scrollspy-offset") ? this.el.getAttribute("data-scrollspy-offset") : null;
      document.addEventListener("scroll", CivicThemeScrollspy.prototype.scrollEvent.bind(this));
      this.el.setAttribute("data-scrollspy", "true");
    }
    CivicThemeScrollspy.prototype.scrollEvent = function() {
      if (window.scrollY > this.offset) {
        this.el.classList.add("ct-scrollspy-scrolled");
      } else {
        this.el.classList.remove("ct-scrollspy-scrolled");
      }
    };
    document.querySelectorAll("[data-scrollspy]").forEach((el) => {
      new CivicThemeScrollspy(el);
    });
  }
  function init6() {
    function CivicThemeSkipToTarget(el) {
      this.el = el;
      this.targetId = this.el.getAttribute("href");
      if (this.targetId) {
        this.targetEl = document.querySelector(this.targetId);
        this.el.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.targetEl.setAttribute("tabindex", "1");
          this.targetEl.focus();
          this.targetEl.scrollIntoView(true);
          this.targetEl.setAttribute("tabindex", "-1");
        });
      }
    }
    document.querySelectorAll("[data-skip-to-target]").forEach((el) => {
      new CivicThemeSkipToTarget(el);
    });
  }
  function init7() {
    function CivicThemeButton(el) {
      if (el.getAttribute("data-button") === "true") {
        return;
      }
      this.el = el;
      this.el.setAttribute("data-button", "true");
      this.dismissButton = this.el.querySelector("[data-button-dismiss]");
      this.keyboardFocused = false;
      this.el.addEventListener("click", this.clickEvent.bind(this));
      this.el.addEventListener("focusin", this.focusinEvent.bind(this));
      this.el.addEventListener("focusout", this.focusoutEvent.bind(this));
      document.addEventListener("mousedown", this.mousedownEvent.bind(this));
      document.addEventListener("keydown", this.keydownEvent.bind(this));
      if (this.dismissButton) {
        this.dismissButton.addEventListener("click", this.dismissClickEvent.bind(this));
      }
    }
    CivicThemeButton.prototype.clickEvent = function(e) {
      if (/input/i.test(e.target.tagName)) {
        let isChecked = false;
        const input = e.target;
        if (input.getAttribute("type") === "checkbox") {
          isChecked = input.getAttribute("checked");
        } else if (input.getAttribute("type") === "radio") {
          const name = input.getAttribute("name");
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
    CivicThemeButton.prototype.keydownEvent = function(e) {
      if (e.key && (e.key === "Tab" || e.key.indexOf("Arrow") === 0)) {
        this.keyboardFocused = true;
      }
    };
    CivicThemeButton.prototype.mousedownEvent = function() {
      this.keyboardFocused = false;
    };
    CivicThemeButton.prototype.setChecked = function(input, check) {
      const button = this.findButton(input);
      if (button && !button.hasAttribute("disabled")) {
        if (check) {
          input.setAttribute("checked", "checked");
          button.classList.add("active");
        } else {
          input.removeAttribute("checked");
          button.classList.remove("active");
        }
      }
    };
    CivicThemeButton.prototype.focusinEvent = function(e) {
      const button = this.findButton(e.target);
      if (button && !button.hasAttribute("disabled") && this.keyboardFocused) {
        button.classList.add("focus");
      }
    };
    CivicThemeButton.prototype.focusoutEvent = function(e) {
      const button = this.findButton(e.target);
      if (button) {
        button.classList.remove("focus");
      }
    };
    CivicThemeButton.prototype.dismissClickEvent = function(e) {
      const button = this.findButton(e.target);
      if (button) {
        button.remove();
        this.el.dispatchEvent(new CustomEvent("ct.button.dismiss", { bubbles: true }));
      }
    };
    CivicThemeButton.prototype.findButton = function(el) {
      if (el.classList.contains("ct-button")) {
        return el;
      }
      return el.closest(".ct-button");
    };
    document.querySelectorAll(".ct-button").forEach((el) => {
      new CivicThemeButton(el);
    });
  }
  function init8() {
    function CivicThemeChip(el) {
      if (el.getAttribute("data-chip") === "true") {
        return;
      }
      this.el = el;
      this.groupParentSelector = el.getAttribute("data-chip-group-parent") || null;
      this.el.addEventListener("change", this.changeEvent.bind(this));
      this.el.addEventListener("focusin", this.focusinEvent.bind(this));
      this.el.addEventListener("focusout", this.focusoutEvent.bind(this));
      this.el.setAttribute("data-chip", "true");
    }
    CivicThemeChip.prototype.setChecked = function(input, isChecked) {
      const chip = this.findChip(input);
      if (chip && !chip.hasAttribute("disabled")) {
        if (isChecked) {
          input.setAttribute("checked", "checked");
          chip.classList.add("active");
        } else {
          input.removeAttribute("checked");
          chip.classList.remove("active");
          const dismissable = chip.hasAttribute("data-chip-dismiss");
          if (dismissable && !input.checked) {
            this.el.dispatchEvent(new CustomEvent("ct.chip.dismiss", { bubbles: true }));
          }
        }
      }
    };
    CivicThemeChip.prototype.focusinEvent = function(e) {
      const chip = this.findChip(e.target);
      if (chip && !chip.hasAttribute("disabled")) {
        chip.classList.add("focus");
      }
    };
    CivicThemeChip.prototype.focusoutEvent = function(e) {
      const chip = this.findChip(e.target);
      if (chip) {
        chip.classList.remove("focus");
      }
    };
    CivicThemeChip.prototype.changeEvent = function(e) {
      const chip = this.findChip(e.target);
      if (!chip) {
        return;
      }
      const input = chip.querySelector("input");
      if (!input) {
        return;
      }
      if (input.getAttribute("type") === "radio") {
        const name = input.getAttribute("name");
        const chipContainer = !!this.groupParentSelector && chip.closest(this.groupParentSelector) || document;
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
    CivicThemeChip.prototype.findChip = function(el) {
      if (el.classList.contains("ct-chip")) {
        return el;
      }
      return el.closest(".ct-chip");
    };
    document.querySelectorAll(".ct-chip").forEach((el) => {
      new CivicThemeChip(el);
    });
  }
  function init9() {
    (function() {
      const SVG_UP = '<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5625 15.5L11 6.63125L15.4375 15.5H6.5625Z" fill="currentColor"/></svg>';
      const SVG_DOWN = '<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4375 7L11 15.8687L6.5625 7L15.4375 7Z" fill="currentColor"/></svg>';
      const SVG_UPDOWN = '<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.1875 9.5L10.9609 3.95703L13.7344 9.5H8.1875Z" fill="currentColor"/><path d="M13.7344 12.0781L10.9609 17.6211L8.1875 12.0781H13.7344Z" fill="currentColor"/></svg>';
      function getCellValue(cell) {
        if (!cell) return "";
        const raw = cell.getAttribute("data-sort-value") || cell.textContent.trim();
        const num = Number(raw);
        return Number.isFinite(num) ? num : raw;
      }
      function updateIcons(headings) {
        headings.forEach((th) => {
          const btn = th.querySelector(".ct-sort-btn");
          if (!btn) return;
          const existing = btn.querySelector("svg");
          if (existing) existing.remove();
          const dir = th.getAttribute("aria-sort");
          btn.insertAdjacentHTML(
            "beforeend",
            dir === "ascending" ? SVG_UP : dir === "descending" ? SVG_DOWN : SVG_UPDOWN
          );
        });
      }
      function sortRows(tbody, colIndex, direction) {
        const rows = Array.from(tbody.querySelectorAll("tr"));
        const ascending = direction === "ascending";
        rows.sort((a, b) => {
          const aCell = a.querySelectorAll("td, th")[colIndex];
          const bCell = b.querySelectorAll("td, th")[colIndex];
          const aVal = getCellValue(aCell);
          const bVal = getCellValue(bCell);
          if (typeof aVal === "number" && typeof bVal === "number") {
            return ascending ? aVal - bVal : bVal - aVal;
          }
          return ascending ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
        });
        rows.forEach((row) => tbody.appendChild(row));
      }
      function initialiseSortedColumn(headings, tbody) {
        headings.forEach((th) => {
          const dir = th.getAttribute("aria-sort");
          if (dir !== "ascending" && dir !== "descending") return;
          const btn = th.querySelector(".ct-sort-btn");
          if (!btn) return;
          sortRows(tbody, parseInt(btn.getAttribute("data-index"), 10), dir);
        });
      }
      function initTable(table) {
        if (table.dataset.tableSortInit) return;
        table.dataset.tableSortInit = "true";
        const thead = table.querySelector("thead");
        const tbody = table.querySelector("tbody");
        if (!thead || !tbody) return;
        const headings = Array.from(thead.querySelectorAll("th"));
        headings.forEach((th) => {
          const preset = th.getAttribute("aria-sort") || (th.classList.contains("ct-sort--asc") ? "ascending" : th.classList.contains("ct-sort--desc") ? "descending" : "none");
          th.setAttribute("aria-sort", preset);
        });
        headings.forEach((th, index) => {
          if (th.querySelector(".ct-sort-btn")) return;
          const label = th.textContent.trim();
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "ct-sort-btn";
          btn.setAttribute("data-index", String(index));
          btn.textContent = label;
          th.textContent = "";
          th.appendChild(btn);
        });
        updateIcons(headings);
        initialiseSortedColumn(headings, tbody);
        const status = document.createElement("div");
        status.setAttribute("aria-atomic", "true");
        status.setAttribute("aria-live", "polite");
        status.setAttribute("role", "status");
        status.className = "ct-visually-hidden";
        table.insertAdjacentElement("afterend", status);
        if (table.sortAbort) table.sortAbort.abort();
        const controller = new AbortController();
        table.sortAbort = controller;
        thead.addEventListener("click", (event) => {
          const btn = event.target.closest(".ct-sort-btn");
          if (!btn) return;
          const th = btn.parentElement;
          const current = th.getAttribute("aria-sort");
          const newDir = current === "none" || current === "descending" ? "ascending" : "descending";
          const colIndex = parseInt(btn.getAttribute("data-index"), 10);
          headings.forEach((h) => h.setAttribute("aria-sort", "none"));
          th.setAttribute("aria-sort", newDir);
          updateIcons(headings);
          sortRows(tbody, colIndex, newDir);
          status.textContent = `Sort by ${btn.textContent.trim()} (${newDir})`;
        }, { signal: controller.signal });
      }
      function initAll(context) {
        (context || document).querySelectorAll(".ct-table--sortable").forEach(initTable);
      }
      window.DgaTableSort = { initAll };
      if (typeof Drupal !== "undefined") {
        Drupal.behaviors.dgaTableSort = {
          attach(context) {
            initAll(context);
          }
        };
      } else {
        initAll();
        new MutationObserver(() => initAll()).observe(document.body || document.documentElement, { childList: true, subtree: true });
      }
    })();
  }
  function init10() {
    function CivicThemeTable(el) {
      if (!el) {
        return;
      }
      this.el = el;
      this.init();
    }
    CivicThemeTable.prototype.init = function() {
      if (this.el.getAttribute("data-table") === "true") {
        return;
      }
      this.addTitles();
      if (this.el.classList.contains("ct-table--data")) {
        this.addWrapper();
      }
      this.el.setAttribute("data-table", "true");
    };
    CivicThemeTable.prototype.addTitles = function() {
      this.addTheadColumnTitles();
    };
    CivicThemeTable.prototype.addWrapper = function() {
      const targetElement = this.el;
      const wrapper = document.createElement("div");
      wrapper.classList.add("ct-table--wrapper");
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("tabindex", "0");
      targetElement.parentNode.insertBefore(wrapper, targetElement);
      wrapper.appendChild(targetElement);
    };
    CivicThemeTable.prototype.addTheadColumnTitles = function() {
      const theadRows = this.el.querySelectorAll("thead tr");
      const tbodyRows = this.el.querySelectorAll("tbody tr");
      if (!(theadRows.length && tbodyRows.length)) {
        return;
      }
      const theadRow = theadRows[0];
      const theadCells = theadRow.querySelectorAll("th, td");
      tbodyRows.forEach((tbodyRow) => {
        const tbodyRowCells = tbodyRow.querySelectorAll("th, td");
        tbodyRowCells.forEach((tbodyRowCell, index) => {
          if (!tbodyRowCell.hasAttribute("data-title") && theadCells[index]) {
            tbodyRowCell.setAttribute("data-title", theadCells[index].textContent);
          }
        });
      });
    };
    document.querySelectorAll(".ct-basic-content table, .ct-table").forEach((table) => {
      new CivicThemeTable(table);
    });
  }
  function init11() {
    function CivicThemeGroupFilterComponent(el) {
      if (this.el) {
        return;
      }
      this.el = el;
      this.el.addEventListener("ct.group-filter.update", this.update.bind(this));
      if (!el.hasEventListener) {
        el.hasEventListener = true;
        el.querySelectorAll('input, textarea, select, [type="checkbox"], [type="radio"]').forEach((input) => {
          input.addEventListener("change", () => {
            el.dispatchEvent(new CustomEvent("ct.group-filter.update", { detail: { parent: input.parentElement } }));
          });
        });
      }
    }
    CivicThemeGroupFilterComponent.prototype.update = function(el) {
      el.detail.parent.setAttribute("aria-live", "polite");
    };
    document.querySelectorAll("[data-group-filter-filters]").forEach((el) => {
      new CivicThemeGroupFilterComponent(el);
    });
  }
  function init12() {
    function ctSearchFormInit(context) {
      (context || document).querySelectorAll("[data-search-form-field]").forEach(function(field) {
        if (field.getAttribute("data-search-form") === "true") {
          return;
        }
        var input = field.querySelector("input");
        if (!input) {
          return;
        }
        field.setAttribute("data-search-form", "true");
        function sync() {
          field.classList.toggle("has-value", input.value.trim() !== "");
        }
        input.addEventListener("input", sync);
        sync();
      });
    }
    if (typeof Drupal !== "undefined") {
      Drupal.behaviors.ctSearchForm = {
        attach: function(context) {
          ctSearchFormInit(context);
        }
      };
    }
    if (typeof MutationObserver !== "undefined" && typeof document !== "undefined" && document.body) {
      new MutationObserver(function() {
        ctSearchFormInit(document);
      }).observe(document.body, { childList: true, subtree: true });
    }
    ctSearchFormInit(document);
  }
  function init13() {
    function CivicThemeSingleFilterComponent(el) {
      if (el.getAttribute("data-single-filter") === "true") {
        return;
      }
      this.el = el;
      this.el.addEventListener("ct.single-filter.update", this.updateEvent.bind(this));
      this.el.querySelectorAll('input, textarea, select, [type="checkbox"], [type="radio"]').forEach((input) => {
        input.addEventListener("change", () => {
          el.dispatchEvent(new CustomEvent("ct.single-filter.update", { detail: { parent: input.parentElement } }));
        });
      });
      this.el.setAttribute("data-single-filter", "true");
    }
    CivicThemeSingleFilterComponent.prototype.updateEvent = function(el) {
      el.detail.parent.setAttribute("aria-live", "polite");
    };
    document.querySelectorAll(".ct-single-filter").forEach((el) => {
      new CivicThemeSingleFilterComponent(el);
    });
  }
  function init14() {
    function CivicThemeTableOfContents(el) {
      if (el.hasAttribute("data-table-of-contents-initialised")) {
        return;
      }
      this.target = el;
      this.position = this.target.getAttribute("data-table-of-contents-position").trim();
      this.theme = this.target.hasAttribute("data-table-of-contents-theme") ? this.target.getAttribute("data-table-of-contents-theme").trim() : "light";
      this.title = this.target.hasAttribute("data-table-of-contents-title") ? this.target.getAttribute("data-table-of-contents-title").trim() : "";
      this.anchorScopeSelector = this.target.hasAttribute("data-table-of-contents-anchor-scope-selector") ? this.target.getAttribute("data-table-of-contents-anchor-scope-selector").trim() : ".ct-basic-content";
      this.excludeSelector = this.target.hasAttribute("data-table-of-contents-exclude-selector") ? this.target.getAttribute("data-table-of-contents-exclude-selector").trim() : "";
      this.minLevel = this.normaliseLevel(this.target.getAttribute("data-table-of-contents-min-level"), 2);
      this.maxLevel = this.normaliseLevel(this.target.getAttribute("data-table-of-contents-max-level"), 3);
      if (this.maxLevel < this.minLevel) {
        this.maxLevel = this.minLevel;
      }
      const explicitAnchorSelector = this.target.hasAttribute("data-table-of-contents-anchor-selector") ? this.target.getAttribute("data-table-of-contents-anchor-selector").trim() : "";
      this.anchorSelector = explicitAnchorSelector !== "" ? explicitAnchorSelector : this.buildAnchorSelector(this.minLevel, this.maxLevel);
      this.position = ["before", "after", "prepend", "append"].indexOf(this.position.trim()) > 0 ? this.position : "before";
      this.theme = this.theme === "dark" ? "dark" : "light";
      this.anchorScopeSelector = this.anchorScopeSelector !== "" ? this.anchorScopeSelector : ".ct-basic-content";
      this.init();
      this.target.setAttribute("data-table-of-contents-initialised", "true");
    }
    CivicThemeTableOfContents.prototype.init = function() {
      const links = this.findLinks(this.anchorSelector, this.anchorScopeSelector);
      if (!links.length) {
        return;
      }
      const elContainer = this.renderContainer(this.theme, this.position);
      if (this.title) {
        elContainer.appendChild(this.renderTitle(this.title));
      }
      elContainer.appendChild(this.renderLinks(this.buildTree(links)));
      this.place(this.target, this.position, elContainer);
    };
    CivicThemeTableOfContents.prototype.findLinks = function(anchorSelector, scopeSelector) {
      const links = [];
      const existingUrls = /* @__PURE__ */ new Set();
      document.querySelectorAll(scopeSelector).forEach((elScope) => {
        elScope.querySelectorAll(anchorSelector).forEach((elAnchor) => {
          if (elAnchor.hasAttribute("data-toc-exclude")) {
            return;
          }
          if (this.isExcluded(elAnchor)) {
            return;
          }
          let anchorId = elAnchor.id || null;
          const anchorText = elAnchor.innerText;
          if (anchorText.trim() === "") {
            return;
          }
          if (!anchorId || anchorId.length === 0) {
            anchorId = this.makeAnchorId(anchorText);
            while (elScope.querySelectorAll(`#${anchorId}`).length || existingUrls.has(`#${anchorId}`)) {
              anchorId = `${anchorId}-${Math.random().toString(36).substring(2, 5)}`;
            }
          }
          const url = `#${anchorId}`;
          if (existingUrls.has(url)) {
            return;
          }
          links.push({
            title: anchorText,
            url,
            level: this.headingLevel(elAnchor)
          });
          elAnchor.id = anchorId;
          existingUrls.add(url);
        });
      });
      return links;
    };
    CivicThemeTableOfContents.prototype.buildTree = function(links) {
      const root = { children: [] };
      const stack = [{ node: root, level: this.minLevel - 1 }];
      links.forEach((link) => {
        const node = { title: link.title, url: link.url, children: [] };
        while (stack.length > 1 && stack[stack.length - 1].level >= link.level) {
          stack.pop();
        }
        stack[stack.length - 1].node.children.push(node);
        stack.push({ node, level: link.level });
      });
      return root.children;
    };
    CivicThemeTableOfContents.prototype.renderTitle = function(title) {
      const elTitle = document.createElement("h2");
      elTitle.className = "ct-table-of-contents__title";
      elTitle.textContent = title;
      return elTitle;
    };
    CivicThemeTableOfContents.prototype.renderLinks = function(nodes, isChild) {
      if (!nodes.length) {
        return null;
      }
      const elList = document.createElement("ul");
      elList.className = isChild ? "ct-table-of-contents__links ct-table-of-contents__links--child" : "ct-table-of-contents__links";
      nodes.forEach((node) => {
        const elItem = document.createElement("li");
        elItem.className = "ct-table-of-contents__link-item";
        const elLink = document.createElement("a");
        elLink.className = "ct-table-of-contents__link";
        elLink.setAttribute("href", node.url);
        elLink.textContent = node.title;
        elItem.appendChild(elLink);
        const elChildren = this.renderLinks(node.children, true);
        if (elChildren) {
          elItem.appendChild(elChildren);
        }
        elList.appendChild(elItem);
      });
      return elList;
    };
    CivicThemeTableOfContents.prototype.renderContainer = function(theme, position) {
      const elContainer = document.createElement("div");
      elContainer.className = `ct-table-of-contents ct-theme-${theme} ct-table-of-contents--position-${position}`;
      return elContainer;
    };
    CivicThemeTableOfContents.prototype.place = function(el, position, node) {
      const positionMap = {
        before: "beforebegin",
        after: "afterend",
        prepend: "afterbegin",
        append: "beforeend"
      };
      el.insertAdjacentElement(positionMap[position], node);
    };
    CivicThemeTableOfContents.prototype.makeAnchorId = function(str) {
      return str.toLowerCase().replace(/(&\w+?;)/gim, " ").replace(/[_.~"<>%|'!*();:@&=+$,/?%#[\]{}\n`^\\]/gim, "").replace(/(^\s+)|(\s+$)/gim, "").replace(/\s+/gm, "-");
    };
    CivicThemeTableOfContents.prototype.normaliseLevel = function(value, fallback) {
      const level = parseInt(value, 10);
      if (Number.isNaN(level)) {
        return fallback;
      }
      return Math.min(6, Math.max(2, level));
    };
    CivicThemeTableOfContents.prototype.buildAnchorSelector = function(min2, max2) {
      const selectors = [];
      for (let level = min2; level <= max2; level++) {
        selectors.push(`h${level}`);
      }
      return selectors.join(", ");
    };
    CivicThemeTableOfContents.prototype.headingLevel = function(el) {
      const match = /^h([1-6])$/i.exec(el.tagName);
      return match ? parseInt(match[1], 10) : this.minLevel;
    };
    CivicThemeTableOfContents.prototype.isExcluded = function(el) {
      if (this.excludeSelector === "") {
        return false;
      }
      try {
        return el.matches(this.excludeSelector);
      } catch (e) {
        return false;
      }
    };
    document.querySelectorAll("[data-table-of-contents-position]").forEach((el) => {
      new CivicThemeTableOfContents(el);
    });
  }
  function init15() {
    function CivicThemeTabs(el, selectedIndex) {
      if (!el) {
        return;
      }
      this.el = el;
      this.links = this.el.querySelectorAll("[data-tabs-tab]");
      this.panels = this.el.querySelectorAll("[data-tabs-panel]");
      if (this.links.length === 0 || this.panels.length === 0 || this.links.length !== this.panels.length) {
        return;
      }
      this.init(selectedIndex);
    }
    CivicThemeTabs.prototype.init = function() {
      this.clickListener = this.clickEvent.bind(this);
      let selected = 0;
      for (let i = 0; i < this.panels.length; i++) {
        this.links[i].addEventListener("click", this.clickListener, false);
        if (this.panels[i].classList.contains("ct-tabs__panel--selected") && !selected) {
          selected = i;
        }
      }
      this.links[selected].click();
    };
    CivicThemeTabs.prototype.clickEvent = function(e) {
      e.preventDefault();
      this.setSelected(e.currentTarget);
    };
    CivicThemeTabs.prototype.setSelected = function(current) {
      for (let i = 0; i < this.panels.length; i++) {
        const currentLink = this.links[i];
        if (currentLink === current) {
          currentLink.classList.add("ct-tabs__tab--selected");
          currentLink.setAttribute("aria-selected", true);
          this.panels[i].classList.add("ct-tabs__panel--selected");
          this.panels[i].setAttribute("aria-hidden", false);
        } else {
          currentLink.classList.remove("ct-tabs__tab--selected");
          currentLink.setAttribute("aria-selected", false);
          this.panels[i].classList.remove("ct-tabs__panel--selected");
          this.panels[i].setAttribute("aria-hidden", true);
        }
      }
    };
    CivicThemeTabs.prototype.destroy = function() {
      for (let i = 0; i < this.panels.length; i++) {
        this.links[i].removeAttribute("aria-selected");
        this.links[i].classList.remove("ct-tabs__tab--selected");
        this.links[i].removeEventListener("click", this.clickListener, false);
        this.panels[i].removeAttribute("aria-hidden");
        this.panels[i].classList.remove("ct-tabs__panel--selected");
      }
    };
    document.querySelectorAll(".ct-tabs").forEach((tabs) => {
      new CivicThemeTabs(tabs);
    });
    function CivicThemeTabsDisclosure(el) {
      if (!el) {
        return;
      }
      this.el = el;
      this.summary = el.querySelector("summary");
      if (!this.summary) {
        return;
      }
      this.wasDesktop = null;
      this.syncListener = this.sync.bind(this);
      this.sync();
      window.addEventListener("resize", this.syncListener, false);
    }
    CivicThemeTabsDisclosure.prototype.sync = function() {
      const isDesktop = window.getComputedStyle(this.summary).display === "none";
      if (isDesktop !== this.wasDesktop) {
        this.el.open = isDesktop;
        this.wasDesktop = isDesktop;
      }
    };
    document.querySelectorAll("[data-tabs-disclosure]").forEach((el) => {
      new CivicThemeTabsDisclosure(el);
    });
  }
  function init16() {
    function CivicThemeTooltip(el) {
      if (el.getAttribute("data-tooltip") === "true") {
        return;
      }
      this.el = el;
      this.el.setAttribute("data-tooltip", "true");
      this.button = this.el.querySelector("[data-tooltip-button]");
      this.content = this.el.querySelector("[data-tooltip-content]");
      this.arrow = this.el.querySelector("[data-tooltip-arrow]");
      this.close = this.el.querySelector("[data-tooltip-close]");
      this.position = "auto";
      if (this.button) {
        let prefix = "tooltip";
        do {
          prefix += Math.floor(Math.random() * 1e4);
        } while (document.getElementById(prefix));
        this.content.setAttribute("id", prefix);
        this.button.setAttribute("aria-describedby", prefix);
        this.position = this.button.getAttribute("data-tooltip-position") || "auto";
        this.button.addEventListener("click", this.tooltipShow.bind(this));
        this.button.addEventListener("focusin", this.tooltipShow.bind(this));
        this.button.addEventListener("focusout", this.tooltipHide.bind(this));
        this.button.addEventListener("mouseenter", this.tooltipShow.bind(this));
        this.button.addEventListener("mouseleave", this.tooltipHide.bind(this));
        this.close.addEventListener("focusin", this.tooltipHide.bind(this));
        this.close.addEventListener("click", this.tooltipHide.bind(this));
      }
      if (typeof Popper !== "undefined") {
        this.el.popper = window.Popper.createPopper(this.button, this.content, {
          placement: this.position,
          modifiers: [
            {
              name: "arrow",
              options: {
                element: this.arrow,
                padding: 12
              }
            },
            {
              name: "offset",
              options: {
                offset: [0, 36]
              }
            },
            {
              name: "flip",
              options: {
                fallbackPlacements: ["top", "bottom"]
              }
            }
          ]
        });
      }
    }
    CivicThemeTooltip.prototype.tooltipShow = function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.stopImmediatePropagation();
      const tooltip = this.findTooltip(e.target);
      if (tooltip) {
        tooltip.setAttribute("data-tooltip-visible", "");
        tooltip.popper.update();
      }
    };
    CivicThemeTooltip.prototype.tooltipHide = function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.stopImmediatePropagation();
      const tooltip = this.findTooltip(e.target);
      if (tooltip) {
        tooltip.removeAttribute("data-tooltip-visible");
      }
    };
    CivicThemeTooltip.prototype.findTooltip = function(el) {
      if (el.classList.contains("ct-tooltip")) {
        return el;
      }
      return el.closest(".ct-tooltip");
    };
    CivicThemeTooltip.prototype.destroy = function(el) {
      if (el.getAttribute("data-tooltip") !== "true" || !this.el) {
        return;
      }
      const button = el.querySelector("[data-tooltip-button]");
      const content = el.querySelector("[data-tooltip-content]");
      if (!button || !content) {
        return;
      }
      this.el = el;
      this.button = button;
      this.content = content;
      this.button.outerHTML = this.button.outerHTML;
      this.el.setAttribute("data-tooltip", "");
      delete this.el;
      delete this.button;
      delete this.content;
      delete this.arrow;
      delete this.close;
      delete this.position;
    };
    document.querySelectorAll(".ct-tooltip").forEach((el) => {
      new CivicThemeTooltip(el);
    });
  }
  function init17() {
    function CivicThemeAlert(el) {
      if (el.getAttribute("data-alert") === "true" || this.container) {
        return;
      }
      this.container = el;
      this.endpoint = this.container.getAttribute("data-alert-endpoint");
      if (this.endpoint !== null) {
        this.getAll();
      }
      this.container.setAttribute("data-alert", "true");
    }
    CivicThemeAlert.prototype.getAll = function() {
      const { endpoint } = this;
      const request = new XMLHttpRequest();
      request.open("get", endpoint);
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          try {
            const response = JSON.parse(request.responseText);
            const html = this.filter(response);
            this.insert(html);
          } catch (e) {
          }
        }
      };
      request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      request.send();
    };
    CivicThemeAlert.prototype.filter = function(response) {
      let html = "";
      if (response.length) {
        for (let i = 0; i < response.length; i++) {
          const item = response[i];
          if (!this.isValidResponse(item)) {
            continue;
          }
          if (this.hasCookieValue(item.id, item.message)) {
            continue;
          }
          if (!this.isVisible(item.visibility)) {
            continue;
          }
          html += item.message;
        }
      }
      return html;
    };
    CivicThemeAlert.prototype.isVisible = function(visibilityString) {
      if (typeof visibilityString === "undefined" || visibilityString === false || visibilityString === "") {
        return true;
      }
      let pageVisibility = visibilityString.replace(/\*/g, "[^ ]*");
      pageVisibility = pageVisibility.replace("<front>", "/");
      pageVisibility = pageVisibility.replace("/", "/");
      const pageVisibilityRules = pageVisibility.split(/\r?\n/);
      if (pageVisibilityRules.length !== 0) {
        const path = this.urlPath();
        for (let r = 0, rlen = pageVisibilityRules.length; r < rlen; r++) {
          if (path === pageVisibilityRules[r]) {
            return true;
          }
          if (pageVisibilityRules[r].indexOf("*") !== -1 && path.match(new RegExp(`^${pageVisibilityRules[r]}`))) {
            return true;
          }
        }
        return false;
      }
      return true;
    };
    CivicThemeAlert.prototype.isValidResponse = function(item) {
      return typeof item === "object" && "id" in item && "message" in item && "visibility" in item;
    };
    CivicThemeAlert.prototype.getCookieName = function() {
      return "ct-alert-hide";
    };
    CivicThemeAlert.prototype.hasCookieValue = function(id, message) {
      const cookie = this.getCookie();
      return id in cookie && cookie[id] === this.hashString(this.removeHtml(message));
    };
    CivicThemeAlert.prototype.setCookieValue = function(id, message) {
      const cookie = this.getCookie();
      cookie[id] = this.hashString(this.removeHtml(message));
      this.setCookie(cookie);
    };
    CivicThemeAlert.prototype.getCookie = function() {
      let cookie = {};
      const values = document.cookie.split(";").filter((item) => item.trim().startsWith(`${this.getCookieName()}=`));
      if (values.length !== 1) {
        return cookie;
      }
      const stringValues = values[0].trim().replace(`${this.getCookieName()}=`, "");
      if (typeof stringValues !== "string") {
        return cookie;
      }
      try {
        cookie = JSON.parse(stringValues);
      } catch (e) {
        cookie = {};
      }
      return cookie;
    };
    CivicThemeAlert.prototype.setCookie = function(value) {
      document.cookie = `${this.getCookieName()}=${JSON.stringify(value)}; SameSite=Strict; Path=/`;
    };
    CivicThemeAlert.prototype.removeHtml = function(string) {
      return string.replace(/(\r\n|\n|\r)/g, "").replace(/\s/g, "").replace(/(&nbsp;|<([^>]+)>)/ig, "").trim();
    };
    CivicThemeAlert.prototype.hashString = function(string) {
      let hash2 = 0;
      let i;
      let chr;
      if (string.length === 0) return hash2;
      for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash2 = (hash2 << 5) - hash2 + chr;
        hash2 |= 0;
      }
      return hash2;
    };
    CivicThemeAlert.prototype.insert = function(html) {
      this.container.insertAdjacentHTML("afterbegin", html);
      this.setDismissListeners();
    };
    CivicThemeAlert.prototype.setDismissListeners = function() {
      document.querySelectorAll("[data-alert-dismiss-trigger]").forEach((el) => {
        el.addEventListener("click", (event) => {
          event.stopPropagation();
          const parent = this.getParentElement(event.currentTarget, '[data-component-name="ct-alert"]');
          this.dismiss(parent);
        });
      });
    };
    CivicThemeAlert.prototype.dismiss = function(element) {
      if (element !== null) {
        const parent = this.getParentElement(element, '[data-component-name="ct-alerts"]');
        if (parent) {
          parent.removeChild(element);
        }
        const id = element.getAttribute("data-alert-id");
        if (id) {
          this.setCookieValue(id, element.outerHTML);
        }
      }
    };
    CivicThemeAlert.prototype.getParentElement = function(element, selector) {
      while (element !== null && !element.matches(selector)) {
        element = element.parentNode;
      }
      return element;
    };
    CivicThemeAlert.prototype.urlPath = function() {
      return this.container.getAttribute("data-test-path") || window.location.pathname;
    };
    document.querySelectorAll('[data-component-name="ct-alerts"]').forEach((el) => {
      new CivicThemeAlert(el);
    });
  }
  function init18() {
    (function() {
      if (typeof window.Drupal === "undefined") {
        window.Drupal = {
          behaviors: {},
          t: (str, args) => {
            if (!args) return str;
            return String(str).replace(/[@!%][\w-]+/g, (m) => m in args ? String(args[m]) : m);
          }
        };
      }
      if (typeof window.once === "undefined") {
        const marks = /* @__PURE__ */ new WeakMap();
        window.once = function(id, selector, context) {
          const root = context || document;
          const out = [];
          root.querySelectorAll(selector).forEach((el) => {
            const keys = marks.get(el) || /* @__PURE__ */ new Set();
            if (keys.has(id)) return;
            keys.add(id);
            marks.set(el, keys);
            out.push(el);
          });
          return out;
        };
      }
    })();
    (function(Drupal2, once) {
      const ALLOWED_HOSTS = ["data.gov.au", "www.data.gov.au"];
      const MAX_ROWS = 5e3;
      const FETCH_TIMEOUT_MS = 1e4;
      const MAX_CELL_CHARS = 500;
      const EXPORT_STYLE_PROPS = [
        "fill",
        "fill-opacity",
        "stroke",
        "stroke-width",
        "stroke-opacity",
        "stroke-dasharray",
        "stroke-linecap",
        "stroke-linejoin",
        "opacity",
        "color",
        "font-family",
        "font-size",
        "font-weight",
        "font-style",
        "text-anchor",
        "dominant-baseline",
        "letter-spacing",
        "visibility"
      ];
      const FILTER_ICON_SVG = '<svg class="ct-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>';
      const FILTER_CHEVRON_SVG = '<svg class="ct-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.6072 8.38619C18.3583 8.13884 18.0217 8 17.6709 8C17.32 8 16.9834 8.13884 16.7346 8.38619L11.9668 13.0876L7.26542 8.38619C7.01659 8.13884 6.67999 8 6.32913 8C5.97827 8 5.64167 8.13884 5.39284 8.38619C5.26836 8.50965 5.16956 8.65654 5.10214 8.81838C5.03471 8.98022 5 9.1538 5 9.32912C5 9.50445 5.03471 9.67803 5.10214 9.83987C5.16956 10.0017 5.26836 10.1486 5.39284 10.2721L11.0239 15.9031C11.1473 16.0276 11.2942 16.1264 11.4561 16.1938C11.6179 16.2612 11.7915 16.2959 11.9668 16.2959C12.1421 16.2959 12.3157 16.2612 12.4775 16.1938C12.6394 16.1264 12.7863 16.0276 12.9097 15.9031L18.6072 10.2721C18.7316 10.1486 18.8304 10.0017 18.8979 9.83987C18.9653 9.67803 19 9.50445 19 9.32912C19 9.1538 18.9653 8.98022 18.8979 8.81838C18.8304 8.65654 18.7316 8.50965 18.6072 8.38619Z"/></svg>';
      const ORDINAL_RANK = {
        high: 0,
        "medium-high": 1,
        medium: 2,
        "medium-low": 3,
        low: 4,
        "not reported": 5,
        "not-reported": 5,
        "unable to rate": 6
      };
      function rankOf(label) {
        if (!label) return null;
        const k = String(label).toLowerCase().trim().replace(/\s+/g, " ");
        return Object.prototype.hasOwnProperty.call(ORDINAL_RANK, k) ? ORDINAL_RANK[k] : null;
      }
      function compareByRank(a, b) {
        const ra = rankOf(a);
        const rb = rankOf(b);
        if (ra !== null && rb !== null) return ra - rb;
        if (ra !== null) return -1;
        if (rb !== null) return 1;
        return 0;
      }
      const PALETTE_DEFAULT = [
        "#1e3c50",
        // navy (primary, anchor) - series 1
        "#28a197",
        // turquoise
        "#801650",
        // dark pink
        "#f46a25",
        // orange
        "#a285d1",
        // light purple
        "#3d3d3d",
        // dark grey
        "#1e3c50",
        "#28a197",
        "#801650",
        "#f46a25",
        "#a285d1",
        "#3d3d3d",
        // 7-12: cycle
        "#1e3c50",
        "#28a197"
        // 13-14: cycle
      ];
      const SEQUENTIAL_DEFAULT = ["#001d33", "#003c61", "#015e8c", "#5693bd", "#aed0e8", "#f0eeee"];
      function cssVar(el, name, fallback) {
        const v = getComputedStyle(el).getPropertyValue(name).trim();
        return v !== "" ? v : fallback;
      }
      function cssNum(el, name, fallback) {
        const n = parseFloat(getComputedStyle(el).getPropertyValue(name));
        return Number.isFinite(n) ? n : fallback;
      }
      function resolvePalette(el) {
        const categorical = PALETTE_DEFAULT.map((d, i) => cssVar(el, `--bdga-chart-c${i + 1}`, d));
        const sequential = SEQUENTIAL_DEFAULT.map((d, i) => cssVar(el, `--bdga-chart-s${i + 1}`, d));
        return { categorical, sequential, single: categorical[0] };
      }
      function shadeSequential(palette, index, total) {
        if (total <= 1) return palette.single;
        return palette.sequential[Math.min(index, palette.sequential.length - 1)];
      }
      Drupal2.behaviors.bdgaChart = {
        attach(context) {
          if (typeof window.d3 === "undefined") {
            return;
          }
          once("bdga-chart", "[data-bdga-chart]", context).forEach((el) => {
            new BdgaChart(el).init();
          });
        }
      };
      class BdgaChart {
        constructor(root) {
          this.root = root;
          this.canvas = root.querySelector("[data-bdga-chart-canvas]");
          this.errorEl = root.querySelector("[data-bdga-chart-error]");
          this.tableEl = root.querySelector("[data-bdga-chart-data]");
          this.statusEl = root.querySelector("[data-bdga-chart-status]");
          this.configEl = root.querySelector('script[type="application/json"][data-bdga-chart-config]');
          const config = this.readConfig();
          if (config) {
            this.id = config.id || root.id || null;
            this.type = config.type || root.dataset.bdgaChart || "bar";
            this.mode = config.source || "json";
            this.url = config.url || null;
            this.xKey = config.x_key || null;
            this.yKeys = Array.isArray(config.y_keys) ? config.y_keys.slice() : [];
            this.rows = Array.isArray(config.rows) ? config.rows : [];
            this.locale = config.locale || null;
            this.maxRows = config.max_rows || MAX_ROWS;
            this.xLabel = config.x_label || this.xKey;
            this.yLabel = config.y_label || (this.yKeys.length === 1 ? this.yKeys[0] : "");
            this.colorBy = config.color_by || "series";
            this.nodes = Array.isArray(config.nodes) ? config.nodes : null;
            this.links = Array.isArray(config.links) ? config.links : null;
            this.medianValue = typeof config.median_value === "number" && Number.isFinite(config.median_value) ? config.median_value : null;
            this.filters = Array.isArray(config.filters) ? config.filters : [];
          } else {
            this.id = root.dataset.bdgaChartId;
            this.type = root.dataset.bdgaChart;
            this.mode = root.dataset.bdgaChartSource;
            this.url = root.dataset.bdgaChartUrl || null;
            this.xKey = root.dataset.bdgaChartX || null;
            this.yKeys = (root.dataset.bdgaChartY || "").split(",").filter(Boolean);
            this.rows = null;
            this.locale = null;
            this.maxRows = MAX_ROWS;
            this.xLabel = this.xKey;
            this.yLabel = this.yKeys[0] || "";
            this.colorBy = "series";
            this.nodes = null;
            this.links = null;
            this.medianValue = null;
            this.filters = [];
          }
          this.toolbarEl = root.querySelector("[data-bdga-chart-toolbar]");
          this.menuEl = root.querySelector("[data-bdga-chart-menu]");
          this.menuButtonEl = root.querySelector("[data-bdga-chart-menu-button]");
          this.tableToggleEl = root.querySelector('[data-bdga-chart-tool="table"]');
          this.detailsEl = this.tableEl ? this.tableEl.closest("details") : null;
          this.downloads = (root.dataset.bdgaChartDownloads || "").split(",").map((s) => s.trim()).filter((s) => s === "csv" || s === "json");
          this.sourcePage = root.dataset.bdgaChartSourcePage || null;
          this.menuOpen = false;
          this.menuItems = [];
          this.legendEl = root.querySelector("[data-bdga-chart-legend]");
          this.legendBuilt = false;
          this.legendButtons = /* @__PURE__ */ new Map();
          this.hidden = /* @__PURE__ */ new Set();
          this.texture = root.dataset.bdgaChartTexture === "true";
          this.zoomGroupEl = root.querySelector("[data-bdga-chart-zoom-group]");
          this.zoom = !!this.zoomGroupEl;
          this.zoomWindow = null;
          this.filtersBarEl = root.querySelector("[data-bdga-chart-filters-bar]");
          this.activeFilters = /* @__PURE__ */ new Map();
          this.fullRows = null;
        }
        /**
         * Parse the JSON data island. Returns null if absent or unparseable.
         * Failures here are silent at the constructor level; init() decides
         * whether to fall back to the table or fail loudly.
         */
        readConfig() {
          if (!this.configEl) return null;
          try {
            const txt = this.configEl.textContent || "";
            if (!txt.trim()) return null;
            return JSON.parse(txt);
          } catch (e) {
            if (window.console) {
              window.console.warn("[bdga-chart] config JSON parse failed:", e);
            }
            return null;
          }
        }
        init() {
          this.observeResize();
          this.initToolbar();
          try {
            if (this.mode === "url") {
              return this.loadFromUrl();
            }
            if (this.type === "sankey" || this.type === "flow") {
              if (!this.nodes || !this.nodes.length || !this.links || !this.links.length) {
                return this.fail("Sankey/flow chart requires nodes and links");
              }
              if (typeof window.d3 === "undefined" || typeof window.d3.sankey !== "function") {
                return this.fail("d3-sankey plugin missing");
              }
              return this.draw([]);
            }
            let rows = this.rows;
            if (!rows || !rows.length) {
              rows = this.readTable();
            }
            if (!rows.length) return this.fail("No rows in data island or fallback table");
            this.fullRows = rows;
            this.setupFilters();
            this.drawFiltered();
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
          if (typeof ResizeObserver === "undefined" || this.resizeObserver || !this.canvas) {
            return;
          }
          let timer = 0;
          this.resizeObserver = new ResizeObserver(() => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
              if (this.lastDrawData === void 0) return;
              const w = this.canvas.clientWidth || 0;
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
          }
        }
        setStatus(msg) {
          if (this.statusEl) this.statusEl.textContent = msg;
        }
        fail(reason) {
          if (window.console) {
            window.console.warn(`[bdga-chart] ${this.id}: ${reason}`);
          }
          if (this.errorEl) this.errorEl.hidden = false;
          if (this.canvas) this.canvas.setAttribute("aria-hidden", "true");
          this.setStatus(Drupal2.t("Chart unavailable."));
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
          this.zoomGroupEl.addEventListener("click", (e) => {
            const btn = e.target.closest("[data-bdga-chart-zoom]");
            if (!btn) return;
            const action = btn.getAttribute("data-bdga-chart-zoom");
            const center = this.pointFocused ? this.currentFullIndex() : null;
            if (action === "in") this.zoomIn(center);
            else if (action === "out") this.zoomOut(center);
            else this.zoomReset();
          });
        }
        applicableZoom() {
          return this.zoom && (this.type === "bar" || this.type === "line" || this.type === "lollipop");
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
          const g = this.focusPos ? this.focusPos.g : 0;
          const win = this.zoomWindow || { start: 0, end: n - 1 };
          const span = win.end - win.start + 1;
          const newSpan = Math.max(2, Math.round(span * factor));
          if (newSpan >= n) {
            this.zoomWindow = null;
          } else {
            const center = centerIdx != null ? centerIdx : Math.floor((win.start + win.end) / 2);
            let start2 = Math.round(center - newSpan / 2);
            start2 = Math.max(0, Math.min(start2, n - newSpan));
            this.zoomWindow = { start: start2, end: start2 + newSpan - 1 };
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
            this.setStatus(Drupal2.t("Showing all @n points.", { "@n": rows.length }));
            return;
          }
          const { start: start2, end: end2 } = this.zoomWindow;
          this.setStatus(
            Drupal2.t("Showing @a to @b, @c of @n points.", {
              "@a": rows[start2] ? rows[start2][this.xKey] : "",
              "@b": rows[end2] ? rows[end2][this.xKey] : "",
              "@c": end2 - start2 + 1,
              "@n": rows.length
            })
          );
        }
        wireTableToggle() {
          const btn = this.tableToggleEl;
          const details = this.detailsEl;
          if (!btn || !details) return;
          btn.addEventListener("click", () => {
            details.open = !details.open;
            if (details.open) {
              const summary = details.querySelector("summary");
              if (summary) summary.focus();
              this.setStatus(Drupal2.t("Showing data table."));
            }
          });
          const sync = () => btn.setAttribute("aria-expanded", String(details.open));
          details.addEventListener("toggle", sync);
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
          if (this.mode === "url" && (this.sourcePage || this.url)) {
            const a = document.createElement("a");
            a.className = "bdga-chart__menu-item";
            a.setAttribute("role", "menuitem");
            a.href = this.sourcePage || this.url;
            a.textContent = Drupal2.t("View source data");
            a.addEventListener("click", () => this.closeMenu(false));
            items.push(a);
          } else {
            this.downloads.forEach((fmt) => {
              const b = document.createElement("button");
              b.type = "button";
              b.className = "bdga-chart__menu-item";
              b.setAttribute("role", "menuitem");
              b.textContent = fmt === "json" ? Drupal2.t("Download data (JSON)") : Drupal2.t("Download data (CSV)");
              b.addEventListener("click", () => {
                this.download(fmt);
                this.closeMenu(true);
              });
              items.push(b);
            });
          }
          items.push(
            this.imageMenuItem(Drupal2.t("Download image (PNG)"), () => this.downloadPng()),
            this.imageMenuItem(Drupal2.t("Download image (SVG)"), () => this.downloadSvg())
          );
          if (!items.length) {
            const wrap = this.menuButtonEl && this.menuButtonEl.closest(".bdga-chart__menu-wrap");
            if (wrap) wrap.remove();
            this.menuButtonEl = null;
            this.menuEl = null;
            return;
          }
          menu.replaceChildren(
            ...items.map((el) => {
              const li = document.createElement("li");
              li.setAttribute("role", "none");
              li.appendChild(el);
              return li;
            })
          );
          this.menuItems = items;
          items.forEach((el, i) => el.setAttribute("tabindex", i === 0 ? "0" : "-1"));
        }
        wireMenu() {
          const button = this.menuButtonEl;
          const menu = this.menuEl;
          if (!button || !menu || !this.menuItems.length) return;
          button.addEventListener("click", () => {
            if (this.menuOpen) this.closeMenu(true);
            else this.openMenu(0);
          });
          button.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              this.openMenu(0);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              this.openMenu(this.menuItems.length - 1);
            }
          });
          menu.addEventListener("keydown", (e) => {
            const items = this.menuItems;
            const current = items.indexOf(document.activeElement);
            switch (e.key) {
              case "ArrowDown":
                e.preventDefault();
                this.focusMenuItem((current + 1) % items.length);
                break;
              case "ArrowUp":
                e.preventDefault();
                this.focusMenuItem((current - 1 + items.length) % items.length);
                break;
              case "Home":
                e.preventDefault();
                this.focusMenuItem(0);
                break;
              case "End":
                e.preventDefault();
                this.focusMenuItem(items.length - 1);
                break;
              case "Escape":
                e.preventDefault();
                this.closeMenu(true);
                break;
              case "Tab":
                this.closeMenu(false);
                break;
            }
          });
          document.addEventListener("pointerdown", (e) => {
            if (!this.menuOpen) return;
            if (this.toolbarEl && this.toolbarEl.contains(e.target)) return;
            this.closeMenu(false);
          });
        }
        openMenu(index) {
          if (!this.menuEl || !this.menuButtonEl) return;
          this.menuEl.hidden = false;
          this.menuButtonEl.setAttribute("aria-expanded", "true");
          this.menuOpen = true;
          this.focusMenuItem(index);
        }
        closeMenu(returnFocus) {
          if (!this.menuEl || !this.menuButtonEl) return;
          this.menuEl.hidden = true;
          this.menuButtonEl.setAttribute("aria-expanded", "false");
          this.menuOpen = false;
          if (returnFocus) this.menuButtonEl.focus();
        }
        focusMenuItem(index) {
          const items = this.menuItems;
          items.forEach((el, i) => el.setAttribute("tabindex", i === index ? "0" : "-1"));
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
            this.setStatus(Drupal2.t("No data available to download yet."));
            return;
          }
          const base = this.exportBase();
          const info = this.exportSource();
          if (fmt === "json") {
            const payload = { source: this.exportSourceMeta(info), rows };
            this.downloadBlob(`${base}.json`, "application/json", JSON.stringify(payload, null, 2));
            this.setStatus(Drupal2.t("Data downloaded as JSON."));
          } else {
            this.downloadBlob(`${base}.csv`, "text/csv;charset=utf-8", this.exportSourceComment(info) + this.toCsv(rows));
            this.setStatus(Drupal2.t("Data downloaded as CSV."));
          }
        }
        /** Provenance object for the JSON export envelope. */
        exportSourceMeta(info) {
          const src = info || this.exportSource();
          const meta = { title: src.title, retrieved: src.retrieved };
          const url = src.landing || src.sourceUrl;
          if (url) meta.url = url;
          if (src.publisher) meta.publisher = src.publisher;
          return meta;
        }
        /**
         * Leading comment lines for the CSV export carrying the same source line as
         * the image exports. CSV has no metadata standard; `#` comments are the
         * common convention (pandas/csvkit honour `comment='#'`).
         */
        exportSourceComment(info) {
          const src = info || this.exportSource();
          const url = src.landing || src.sourceUrl;
          const lines = url ? [`# Source: ${url} (${src.publisher || "source"})`, `# Retrieved: ${src.retrieved.slice(0, 10)}`] : [`# ${src.title}`, `# Generated: ${src.retrieved.slice(0, 10)}`];
          return `${lines.join("\r\n")}\r
`;
        }
        /**
         * The rows to export. Flow / sankey carry their data as links
         * (source / target / value); every other type exports the plotted rows.
         * Falls back to the parsed table when no draw has happened yet.
         */
        exportRows() {
          if ((this.type === "sankey" || this.type === "flow") && Array.isArray(this.links)) {
            return this.links.map((l) => ({
              source: l.source && l.source.id ? l.source.id : l.source,
              target: l.target && l.target.id ? l.target.id : l.target,
              value: l.value
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
          if (this.type === "sankey" || this.type === "flow") {
            return ["source", "target", "value"];
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
            const s = v === null || v === void 0 ? "" : String(v);
            return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
          };
          const head = keys.map(esc).join(",");
          const body = rows.map((r) => keys.map((k) => esc(r[k])).join(",")).join("\r\n");
          return `${head}\r
${body}\r
`;
        }
        saveBlob(filename, blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.setTimeout(() => URL.revokeObjectURL(url), 0);
        }
        downloadBlob(filename, mime, text) {
          this.saveBlob(filename, new Blob([text], { type: mime }));
        }
        // -- Image export (PNG / SVG) --------------------------------------------
        //
        // Capture the rendered <svg> as a standalone file. Both work in every
        // source mode because they read the drawn chart, not the source data.
        /** A menu-item button wired to an image-export action. */
        imageMenuItem(label, action) {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "bdga-chart__menu-item";
          b.setAttribute("role", "menuitem");
          b.textContent = label;
          b.addEventListener("click", () => {
            action();
            this.closeMenu(true);
          });
          return b;
        }
        /** The rendered <svg>, or null before the first draw. */
        chartSvg() {
          return this.canvas ? this.canvas.querySelector("svg") : null;
        }
        /** Filename stem shared by every export. */
        exportBase() {
          return String(this.id || "chart").replace(/[^\w-]+/g, "-");
        }
        /** Opaque backdrop for the PNG - SVG areas are otherwise transparent. */
        exportBackground() {
          const probe = this.root || this.canvas;
          if (probe) {
            const bg = window.getComputedStyle(probe).backgroundColor;
            if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
          }
          const dark = this.root && this.root.classList.contains("ct-theme-dark");
          return dark ? "#000000" : "#ffffff";
        }
        /**
         * Copy presentation-affecting computed styles from the live SVG subtree
         * onto its detached clone, recursing in lockstep. The on-page chart leans
         * on external CSS + --bdga-chart-* custom properties; inlining makes the
         * serialised copy self-contained.
         */
        inlineSvgStyles(srcEl, cloneEl) {
          const cs = window.getComputedStyle(srcEl);
          let decl = "";
          EXPORT_STYLE_PROPS.forEach((prop) => {
            const val = cs.getPropertyValue(prop);
            if (val) decl += `${prop}:${val};`;
          });
          if (decl) cloneEl.setAttribute("style", decl);
          const src = srcEl.children;
          const clone = cloneEl.children;
          for (let i = 0; i < src.length; i += 1) {
            if (clone[i]) this.inlineSvgStyles(src[i], clone[i]);
          }
        }
        /** Clip a string to n chars with an ellipsis, for the visible caption. */
        clip(str, n) {
          const s = String(str);
          return s.length > n ? `${s.slice(0, n - 1)}…` : s;
        }
        /**
         * Provenance for the export: chart title, the data source (landing page
         * preferred over the raw endpoint), publisher host, and a retrieval
         * timestamp. Only url-mode charts have an external source; local data
         * yields title + date only.
         */
        exportSource() {
          const titleEl = this.root && this.root.querySelector(".bdga-chart__title");
          const title = titleEl && titleEl.textContent.trim() || this.id || "Chart";
          let sourceUrl = "";
          let landing = "";
          let publisher = "";
          if (this.mode === "url") {
            sourceUrl = this.url || "";
            landing = this.sourcePage || "";
            const probe = landing || sourceUrl;
            if (probe) {
              try {
                publisher = new URL(probe).hostname.replace(/^www\./, "");
              } catch {
              }
            }
          }
          return { title, sourceUrl, landing, publisher, retrieved: (/* @__PURE__ */ new Date()).toISOString() };
        }
        /**
         * Inject SVG provenance into the export clone (no effect on the live
         * chart): a <title> + <desc> for assistive tech, and a Dublin Core
         * <metadata> block (dc:title, dc:source, dc:publisher, dc:date) for
         * machine-readable attribution. Source / publisher are emitted only for
         * url-mode data.
         */
        injectProvenance(svg, info) {
          const SVGNS = "http://www.w3.org/2000/svg";
          const RDFNS = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
          const DCNS = "http://purl.org/dc/elements/1.1/";
          const sourceText = info.landing || info.sourceUrl;
          const title = document.createElementNS(SVGNS, "title");
          title.textContent = info.title;
          const desc = document.createElementNS(SVGNS, "desc");
          desc.textContent = sourceText ? `${info.title}. Source: ${sourceText} (${info.publisher || "source"}), retrieved ${info.retrieved.slice(0, 10)}.` : `${info.title}. Generated ${info.retrieved.slice(0, 10)}.`;
          const metadata = document.createElementNS(SVGNS, "metadata");
          const rdf = document.createElementNS(RDFNS, "rdf:RDF");
          const description = document.createElementNS(RDFNS, "rdf:Description");
          const dc = (local, value) => {
            if (!value) return;
            const el = document.createElementNS(DCNS, `dc:${local}`);
            el.textContent = value;
            description.appendChild(el);
          };
          dc("title", info.title);
          dc("source", sourceText);
          dc("publisher", info.publisher);
          dc("date", info.retrieved);
          rdf.appendChild(description);
          metadata.appendChild(rdf);
          svg.insertBefore(metadata, svg.firstChild);
          svg.insertBefore(desc, metadata);
          svg.insertBefore(title, desc);
        }
        /**
         * Serialise the live <svg> into a standalone, portable string: inline the
         * computed styles (so it renders without the page CSS), add a Dublin Core
         * <metadata> block + <title>/<desc>, and - when the data has a source -
         * bake a "Source:" caption into an added bottom band so the attribution
         * survives PNG rasterisation too. Returns { string, width, height } or null
         * when nothing has been drawn yet.
         */
        serializeSvg() {
          const svgEl = this.chartSvg();
          if (!svgEl) return null;
          const rect = svgEl.getBoundingClientRect();
          const vb = svgEl.viewBox && svgEl.viewBox.baseVal;
          const baseW = Math.round(vb && vb.width || rect.width || 600);
          const baseH = Math.round(vb && vb.height || rect.height || 400);
          const clone = svgEl.cloneNode(true);
          this.inlineSvgStyles(svgEl, clone);
          const info = this.exportSource();
          const caption = info.landing || info.publisher || info.sourceUrl;
          let height = baseH;
          if (caption) {
            const band = 22;
            height = baseH + band;
            clone.setAttribute("viewBox", `0 0 ${baseW} ${height}`);
            const dark = this.root && this.root.classList.contains("ct-theme-dark");
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "8");
            text.setAttribute("y", String(height - 7));
            text.setAttribute("style", `font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:${dark ? "#cfcfcf" : "#5a5a5a"};`);
            text.textContent = `Source: ${this.clip(caption, 96)}  ·  Retrieved ${info.retrieved.slice(0, 10)}`;
            clone.appendChild(text);
          }
          clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
          clone.setAttribute("width", String(baseW));
          clone.setAttribute("height", String(height));
          this.injectProvenance(clone, info);
          const string = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
${new XMLSerializer().serializeToString(clone)}`;
          return { string, width: baseW, height };
        }
        downloadSvg() {
          const out = this.serializeSvg();
          if (!out) {
            this.setStatus(Drupal2.t("No chart available to download yet."));
            return;
          }
          this.downloadBlob(`${this.exportBase()}.svg`, "image/svg+xml;charset=utf-8", out.string);
          this.setStatus(Drupal2.t("Chart downloaded as SVG."));
        }
        downloadPng() {
          const out = this.serializeSvg();
          if (!out) {
            this.setStatus(Drupal2.t("No chart available to download yet."));
            return;
          }
          const scale = window.devicePixelRatio || 1;
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(out.width * scale));
          canvas.height = Math.max(1, Math.round(out.height * scale));
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            this.setStatus(Drupal2.t("PNG export is not supported in this browser."));
            return;
          }
          ctx.scale(scale, scale);
          ctx.fillStyle = this.exportBackground();
          ctx.fillRect(0, 0, out.width, out.height);
          const svgUrl = URL.createObjectURL(new Blob([out.string], { type: "image/svg+xml;charset=utf-8" }));
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, out.width, out.height);
            URL.revokeObjectURL(svgUrl);
            canvas.toBlob((blob) => {
              if (!blob) {
                this.setStatus(Drupal2.t("PNG export failed."));
                return;
              }
              this.saveBlob(`${this.exportBase()}.png`, blob);
              this.setStatus(Drupal2.t("Chart downloaded as PNG."));
            }, "image/png");
          };
          img.onerror = () => {
            URL.revokeObjectURL(svgUrl);
            this.setStatus(Drupal2.t("PNG export failed."));
          };
          img.src = svgUrl;
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
          if (this.type === "pie") {
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
          return total <= p.categorical.length ? p.categorical[index] : shadeSequential(p, index, total);
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
          const id = `bdga-pat-${this.id || "chart"}-${index}`.replace(/[^\w-]+/g, "-");
          let defs = svg.select("defs");
          if (defs.empty()) defs = svg.append("defs");
          if (this.patternIds.has(id)) return `url(#${id})`;
          this.patternIds.add(id);
          const motif = index % 5;
          const stroke = "rgba(255, 255, 255, 0.7)";
          const sw = 1.3;
          const p = defs.append("pattern").attr("id", id).attr("patternUnits", "userSpaceOnUse").attr("width", 8).attr("height", 8);
          p.append("rect").attr("width", 8).attr("height", 8).attr("fill", color);
          const hline = (yy) => p.append("line").attr("x1", 0).attr("y1", yy).attr("x2", 8).attr("y2", yy).attr("stroke", stroke).attr("stroke-width", sw);
          const vline = (xx) => p.append("line").attr("x1", xx).attr("y1", 0).attr("x2", xx).attr("y2", 8).attr("stroke", stroke).attr("stroke-width", sw);
          if (motif === 0) {
            hline(2);
            hline(6);
            p.attr("patternTransform", "rotate(45)");
          } else if (motif === 1) {
            hline(2);
            hline(6);
            p.attr("patternTransform", "rotate(-45)");
          } else if (motif === 2) {
            p.append("circle").attr("cx", 4).attr("cy", 4).attr("r", 1.5).attr("fill", stroke);
          } else if (motif === 3) {
            hline(4);
            vline(4);
          } else {
            vline(2);
            vline(6);
          }
          return `url(#${id})`;
        }
        buildLegend() {
          if (!this.legendEl || this.legendBuilt) return;
          this.palette = this.palette || resolvePalette(this.root);
          let series;
          if (this.type === "pie") {
            const rows = this.lastDrawData || [];
            series = rows.map((r, i) => ({
              key: String(r[this.xKey]),
              label: String(r[this.xKey]),
              color: this.seriesColor(i, rows.length)
            }));
          } else {
            series = this.yKeys.map((k, i) => ({
              key: String(k),
              label: String(k),
              color: this.seriesColor(i, this.yKeys.length)
            }));
          }
          if (series.length < 2) {
            this.legendEl.remove();
            this.legendEl = null;
            this.legendBuilt = true;
            return;
          }
          const frag = document.createDocumentFragment();
          this.legendButtons = /* @__PURE__ */ new Map();
          series.forEach((s, i) => {
            const li = document.createElement("li");
            li.setAttribute("role", "none");
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "bdga-chart__legend-item";
            btn.setAttribute("aria-pressed", "true");
            btn.dataset.bdgaKey = s.key;
            const swatch = document.createElement("span");
            swatch.className = "bdga-chart__legend-swatch";
            if (this.texture) swatch.classList.add(`bdga-chart__legend-swatch--tex${i % 5}`);
            swatch.setAttribute("aria-hidden", "true");
            swatch.style.backgroundColor = s.color;
            const label = document.createElement("span");
            label.className = "bdga-chart__legend-label";
            label.textContent = s.label;
            btn.append(swatch, label);
            btn.addEventListener("click", () => this.toggleSeries(s.key, s.label));
            btn.addEventListener("mouseenter", () => this.emphasizeSeries(s.key));
            btn.addEventListener("mouseleave", () => this.emphasizeSeries(null));
            btn.addEventListener("focus", () => this.emphasizeSeries(s.key));
            btn.addEventListener("blur", () => this.emphasizeSeries(null));
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
            this.setStatus(Drupal2.t("At least one series must stay visible."));
            return;
          }
          if (willHide) this.hidden.add(key);
          else this.hidden.delete(key);
          const btn = this.legendButtons.get(key);
          if (btn) {
            btn.setAttribute("aria-pressed", String(!willHide));
            btn.classList.toggle("bdga-chart__legend-item--hidden", willHide);
            btn.setAttribute("aria-label", willHide ? Drupal2.t("@s (hidden)", { "@s": label }) : label);
          }
          this.redraw();
          this.setStatus(
            willHide ? Drupal2.t("@s hidden", { "@s": label }) : Drupal2.t("@s shown", { "@s": label })
          );
        }
        /**
         * Highlight one series by dropping every other mark to 30% opacity. Inline
         * styles are wiped on the next redraw, so a stale highlight can't persist
         * past a toggle. key === null restores all.
         */
        emphasizeSeries(key) {
          if (!this.canvas) return;
          if (key === null) {
            this.canvas.querySelectorAll("[data-bdga-series],[data-bdga-point]").forEach((m) => {
              m.style.opacity = "";
            });
            this.canvas.querySelectorAll(".bdga-chart__sankey-link").forEach((m) => {
              m.style.opacity = "";
            });
            return;
          }
          this.canvas.querySelectorAll("[data-bdga-series]").forEach((m) => {
            m.style.opacity = m.getAttribute("data-bdga-series") === key ? "" : "0.3";
          });
        }
        /**
         * Emphasize what a hovered/focused mark belongs to; dim the rest to 30%.
         * Multi-series charts emphasize the whole series. Charts that colour marks
         * by a per-mark dimension (color_by a category/field) or sankey/flow nodes
         * emphasize the single mark (and, for sankey, its connected links). Plain
         * single-colour charts have nothing to dim.
         */
        emphasizePoint(pt) {
          if (!pt || !this.canvas) return;
          const sEl = pt.closest("[data-bdga-series]");
          const seriesKey = sEl && sEl.getAttribute("data-bdga-series");
          if (seriesKey && this.yKeys.length > 1) {
            this.emphasizeSeries(seriesKey);
            return;
          }
          const isFlow = this.type === "sankey" || this.type === "flow";
          const cb = this.colorBy;
          const perMark = cb && cb !== "series" && cb !== "single";
          if (!perMark && !isFlow) return;
          this.canvas.querySelectorAll("[data-bdga-point]").forEach((m) => {
            m.style.opacity = m === pt ? "" : "0.3";
          });
          if (isFlow) {
            const node = window.d3.select(pt).datum();
            const id = node && node.id;
            this.canvas.querySelectorAll(".bdga-chart__sankey-link").forEach((l) => {
              const ld = window.d3.select(l).datum();
              const s = ld && ld.source && ld.source.id;
              const t = ld && ld.target && ld.target.id;
              l.style.opacity = id && (s === id || t === id) ? "" : "0.2";
            });
          }
        }
        /**
         * Carbon emphasis-by-fade for a single flow: raise the hovered link to full
         * opacity and drop every other link to 20%, so one path reads cleanly out
         * of a dense diagram. Nodes are left untouched - the flow is emphasised.
         * Restored by emphasizeSeries(null), which clears every link's inline
         * opacity, so a stale highlight can't survive a redraw or a mouseout.
         */
        emphasizeLink(linkEl) {
          if (!linkEl || !this.canvas) return;
          this.canvas.querySelectorAll(".bdga-chart__sankey-link").forEach((l) => {
            l.style.opacity = l === linkEl ? "1" : "0.2";
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
          return typeof v === "number" ? v.toLocaleString(this.locale || void 0) : String(v);
        }
        pointLabel(seriesLabel, xVal, value) {
          const val = this.formatValue(value);
          return seriesLabel && String(seriesLabel) !== String(xVal) ? `${xVal}, ${seriesLabel}: ${val}` : `${xVal}: ${val}`;
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
            e.el.setAttribute("role", "img");
            e.el.setAttribute("aria-label", label);
            e.el.setAttribute("tabindex", "-1");
            e.el.setAttribute("data-bdga-point", "");
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
          this.canvas.removeAttribute("aria-hidden");
          this.canvas.querySelectorAll(".tick, .domain, .bdga-chart__axis-label").forEach((el) => el.setAttribute("aria-hidden", "true"));
          const svgEl = this.canvas.querySelector("svg");
          if (!svgEl) return;
          svgEl.setAttribute("role", "group");
          const titleEl = this.root.querySelector(".bdga-chart__title");
          const name = titleEl && titleEl.textContent.trim() || this.id || Drupal2.t("Chart");
          svgEl.setAttribute(
            "aria-label",
            instruction ? Drupal2.t("@t. @i", { "@t": name, "@i": instruction }) : name
          );
        }
        initPointNav() {
          if (!this.points || !this.points.length) return;
          this.exposePlot(Drupal2.t("Use arrow keys to move between data points."));
          this.pointGroups.forEach((group) => {
            group.forEach((el, idx) => {
              el.setAttribute("aria-posinset", String(idx + 1));
              el.setAttribute("aria-setsize", String(group.length));
            });
          });
          this.focusPos = { g: 0, i: 0 };
          this.pointFocused = false;
          this.pointGroups[0][0].setAttribute("tabindex", "0");
          if (this.pointNavBound) return;
          this.pointNavBound = true;
          this.canvas.addEventListener("keydown", (e) => this.onPointKeydown(e));
          this.canvas.addEventListener("mouseover", (e) => {
            const pt = e.target.closest("[data-bdga-point]");
            if (pt) {
              this.showPointTooltip(pt);
              this.emphasizePoint(pt);
              return;
            }
            const link = e.target.closest("[data-bdga-link]");
            if (link) {
              this.showPointTooltip(link);
              this.emphasizeLink(link);
            }
          });
          this.canvas.addEventListener("mouseout", (e) => {
            const pt = e.target.closest("[data-bdga-point]");
            if (pt) {
              this.hidePointTooltip();
              this.emphasizeSeries(null);
              return;
            }
            const link = e.target.closest("[data-bdga-link]");
            if (link) {
              this.hidePointTooltip();
              this.emphasizeSeries(null);
            }
          });
          this.canvas.addEventListener("focusin", (e) => {
            const pt = e.target.closest && e.target.closest("[data-bdga-point]");
            if (!pt) return;
            this.syncFocusPos(pt);
            this.showPointTooltip(pt);
            this.emphasizePoint(pt);
          });
          this.canvas.addEventListener("focusout", (e) => {
            const pt = e.target.closest && e.target.closest("[data-bdga-point]");
            if (pt) {
              this.hidePointTooltip();
              this.emphasizeSeries(null);
            }
          });
        }
        /** Locate a focused point so arrow keys resume from it. */
        syncFocusPos(el) {
          for (let g = 0; g < this.pointGroups.length; g += 1) {
            const i = this.pointGroups[g].indexOf(el);
            if (i !== -1) {
              if (this.focusPos) {
                const prev = this.pointGroups[this.focusPos.g] && this.pointGroups[this.focusPos.g][this.focusPos.i];
                if (prev && prev !== el) prev.setAttribute("tabindex", "-1");
              }
              el.setAttribute("tabindex", "0");
              this.focusPos = { g, i };
              this.pointFocused = true;
              return;
            }
          }
        }
        onPointKeydown(e) {
          if (!this.pointGroups.length || !this.focusPos) return;
          if (this.applicableZoom()) {
            if (e.key === "+" || e.key === "=") {
              e.preventDefault();
              this.zoomIn(this.currentFullIndex(), true);
              return;
            }
            if (e.key === "-" || e.key === "_") {
              e.preventDefault();
              this.zoomOut(this.currentFullIndex(), true);
              return;
            }
            if (e.key === "0") {
              e.preventDefault();
              this.zoomReset(this.currentFullIndex(), true);
              return;
            }
          }
          let { g, i } = this.focusPos;
          const groups = this.pointGroups;
          switch (e.key) {
            case "ArrowRight":
              i = Math.min(i + 1, groups[g].length - 1);
              break;
            case "ArrowLeft":
              i = Math.max(i - 1, 0);
              break;
            case "ArrowDown":
              g = Math.min(g + 1, groups.length - 1);
              i = Math.min(i, groups[g].length - 1);
              break;
            case "ArrowUp":
              g = Math.max(g - 1, 0);
              i = Math.min(i, groups[g].length - 1);
              break;
            case "Home":
              i = 0;
              break;
            case "End":
              i = groups[g].length - 1;
              break;
            case "Escape":
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
          if (prev) prev.setAttribute("tabindex", "-1");
          this.focusPos = { g, i };
          this.pointFocused = true;
          const el = groups[g][i];
          el.setAttribute("tabindex", "0");
          el.focus();
          this.showPointTooltip(el);
        }
        showPointTooltip(el) {
          if (!this.canvas) return;
          let tip = this.tooltipEl;
          if (!tip) {
            tip = document.createElement("div");
            tip.className = "bdga-chart__tooltip";
            tip.setAttribute("aria-hidden", "true");
            this.canvas.appendChild(tip);
            this.tooltipEl = tip;
          }
          tip.textContent = el.getAttribute("aria-label") || "";
          const cRect = this.canvas.getBoundingClientRect();
          const mRect = el.getBoundingClientRect();
          const left2 = mRect.left - cRect.left + mRect.width / 2;
          const top2 = mRect.top - cRect.top;
          tip.style.left = `${left2}px`;
          tip.style.top = `${top2}px`;
          tip.dataset.visible = "true";
        }
        hidePointTooltip() {
          if (this.tooltipEl) delete this.tooltipEl.dataset.visible;
        }
        readTable() {
          if (!this.tableEl) return [];
          const headerKeys = Array.from(this.tableEl.querySelectorAll("thead th")).map(
            (th) => th.dataset && th.dataset.bdgaKey || th.textContent.trim()
          );
          if (!this.xKey && headerKeys[0]) this.xKey = headerKeys[0];
          if (!this.yKeys.length) {
            this.yKeys = headerKeys.slice(1).filter(Boolean);
          }
          return Array.from(this.tableEl.querySelectorAll("tbody tr")).slice(0, MAX_ROWS).map((tr) => {
            const cells = tr.querySelectorAll("th, td");
            const row = {};
            cells.forEach((cell, i) => {
              const key = cell.dataset && cell.dataset.bdgaKey || headerKeys[i] || `col_${i}`;
              const raw = cell.dataset && cell.dataset.value !== void 0 ? cell.dataset.value : cell.textContent;
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
          if (!this.url) return this.fail("Missing source URL");
          let url;
          try {
            url = new URL(this.url);
          } catch {
            return this.fail("Invalid URL");
          }
          if (url.protocol !== "https:") return this.fail("Insecure URL scheme");
          if (!ALLOWED_HOSTS.includes(url.hostname)) {
            return this.fail(`Host not on allowlist: ${url.hostname}`);
          }
          this.setStatus(Drupal2.t("Loading chart data..."));
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
          let payload;
          try {
            const res = await fetch(url.toString(), {
              method: "GET",
              credentials: "omit",
              referrerPolicy: "no-referrer",
              mode: "cors",
              signal: controller.signal,
              headers: { Accept: "application/json" }
            });
            clearTimeout(timer);
            if (!res.ok) return this.fail(`HTTP ${res.status}`);
            const ct = (res.headers.get("content-type") || "").toLowerCase();
            if (ct.indexOf("application/json") === -1) {
              return this.fail(`Unexpected content-type: ${ct}`);
            }
            payload = await res.json();
          } catch (err) {
            clearTimeout(timer);
            return this.fail(`Fetch failed: ${err.message || err}`);
          }
          const rows = this.extractCkanRows(payload);
          if (!rows.length) return this.fail("No rows returned");
          if (this.type === "sankey" || this.type === "flow") {
            const graph = this.buildSankeyFromRows(rows);
            if (!graph.links.length) {
              return this.fail("CKAN response had no usable source/target/value rows");
            }
            if (typeof window.d3.sankey !== "function") {
              return this.fail("d3-sankey plugin missing");
            }
            this.nodes = graph.nodes;
            this.links = graph.links;
            this.populateFlowTable(graph.links);
            this.updateFlowTableHeaders(graph.nodes);
            this.setStatus(
              Drupal2.t("Chart loaded. @count flows, @nodes nodes.", {
                "@count": graph.links.length,
                "@nodes": graph.nodes.length
              })
            );
            return this.draw([]);
          }
          this.populateTable(rows);
          this.setStatus(
            Drupal2.t("Chart loaded. @count rows.", { "@count": rows.length })
          );
          this.fullRows = rows;
          this.setupFilters();
          this.drawFiltered();
        }
        extractCkanRows(payload) {
          const records = payload && payload.result && Array.isArray(payload.result.records) ? payload.result.records : Array.isArray(payload) ? payload : [];
          const isFlow = this.type === "sankey" || this.type === "flow";
          const yKeySet = new Set(this.yKeys || []);
          if (isFlow) {
            yKeySet.clear();
            yKeySet.add("value");
          }
          return records.slice(0, MAX_ROWS).map((r) => {
            const out = {};
            Object.keys(r || {}).forEach((k) => {
              const v = r[k];
              if (v === null || v === void 0) {
                out[k] = "";
                return;
              }
              if (typeof v === "object") {
                return;
              }
              if (yKeySet.has(k)) {
                const n = Number(v);
                out[k] = Number.isFinite(n) ? n : 0;
                return;
              }
              const s = String(v);
              out[k] = s.length > MAX_CELL_CHARS ? `${s.slice(0, MAX_CELL_CHARS)}…` : s;
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
          const hasFlatKeys = "source" in first && "target" in first && "value" in first;
          if (hasFlatKeys) {
            return this.buildSankeyFromFlatRows(rows);
          }
          const stageCols = Object.keys(first).filter((k) => k !== "value");
          if (stageCols.length < 2) return { nodes: [], links: [] };
          return this.buildSankeyFromCascadeRows(rows, stageCols);
        }
        buildSankeyFromFlatRows(rows) {
          let hasCollision = false;
          for (let i = 0; i < rows.length; i += 1) {
            const r = rows[i];
            const s = String(r.source ?? "").trim();
            const t = String(r.target ?? "").trim();
            if (s && t && s === t) {
              hasCollision = true;
              break;
            }
          }
          const seen = /* @__PURE__ */ new Set();
          const nodes = [];
          const links = [];
          let droppedSelfLoops = 0;
          rows.forEach((r) => {
            let src = String(r.source ?? "").trim();
            let tgt = String(r.target ?? "").trim();
            const val = Number(r.value);
            if (!src || !tgt) return;
            if (!Number.isFinite(val) || val <= 0) return;
            if (hasCollision) {
              src = `From: ${src}`;
              tgt = `To: ${tgt}`;
            }
            if (src === tgt) {
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
            window.console.warn(`[bdga-chart] ${this.id}: dropped ${droppedSelfLoops} self-loop rows`);
          }
          return { nodes, links };
        }
        buildSankeyFromCascadeRows(rows, stageCols) {
          const seen = /* @__PURE__ */ new Set();
          const nodes = [];
          const linkMap = /* @__PURE__ */ new Map();
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
            const chain = [];
            stageCols.forEach((c) => {
              const v = r[c];
              if (v === null || v === void 0 || v === "") return;
              chain.push({ id: `${c}: ${String(v).trim()}`, stage: stageOf.get(c) });
            });
            if (chain.length < 2) return;
            chain.forEach((step) => addNode(step.id, step.stage));
            for (let i = 0; i < chain.length - 1; i += 1) {
              const src = chain[i].id;
              const tgt = chain[i + 1].id;
              if (src === tgt) {
                continue;
              }
              const key = `${src}\0${tgt}`;
              const existing = linkMap.get(key);
              if (existing) {
                existing.value += val;
              } else {
                linkMap.set(key, { source: src, target: tgt, value: val });
              }
            }
          });
          return { nodes, links: Array.from(linkMap.values()) };
        }
        populateTable(rows) {
          if (!this.tableEl) return;
          const tbody = this.tableEl.querySelector("tbody");
          if (!tbody) return;
          const frag = document.createDocumentFragment();
          rows.forEach((row) => {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.textContent = row[this.xKey];
            tr.appendChild(th);
            this.yKeys.forEach((y) => {
              const td = document.createElement("td");
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
          const tbody = this.tableEl.querySelector("tbody");
          if (!tbody) return;
          const frag = document.createDocumentFragment();
          links.forEach((l) => {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.textContent = String(l.source);
            tr.appendChild(th);
            const tdTarget = document.createElement("td");
            tdTarget.textContent = String(l.target);
            tr.appendChild(tdTarget);
            const tdValue = document.createElement("td");
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
            const id = String(nodes[i].id || "");
            const sep = id.indexOf(": ");
            if (sep === -1) return;
            const p = id.slice(0, sep);
            if (prefixes.indexOf(p) === -1) {
              prefixes.push(p);
              if (prefixes.length > 2) return;
            }
          }
          if (prefixes.length !== 2) return;
          const srcTh = this.tableEl.querySelector('thead [data-bdga-key="source"]');
          const tgtTh = this.tableEl.querySelector('thead [data-bdga-key="target"]');
          if (srcTh) srcTh.textContent = prefixes[0];
          if (tgtTh) tgtTh.textContent = prefixes[1];
        }
        // -- Filters (interactive, client-side) ----------------------------------
        //
        // Author-declared filters ({ key, label?, values? }, via config_json) build
        // one control per dimension. Within a filter the selected values are OR-ed;
        // across filters they are AND-ed. The renderer owns the controls + redraw;
        // the fallback data table stays complete (filters affect only the visual).
        /** Distinct non-empty stringified values of a column, first-seen order. */
        distinctValues(rows, key) {
          const seen = /* @__PURE__ */ new Set();
          const out = [];
          rows.forEach((r) => {
            const v = String(r[key] ?? "");
            if (v !== "" && !seen.has(v)) {
              seen.add(v);
              out.push(v);
            }
          });
          return out;
        }
        /**
         * Build the filter controls from this.filters into the filter bar. No-op
         * without configured filters, a bar element, or for the node-link types.
         * Every filter starts fully selected.
         */
        setupFilters() {
          if (!this.filtersBarEl || !this.filters.length) return;
          if (this.type === "sankey" || this.type === "flow") return;
          const rows = this.fullRows || [];
          this.activeFilters = /* @__PURE__ */ new Map();
          const groups = [];
          this.filters.forEach((f, idx) => {
            if (!f || !f.key) return;
            const values = Array.isArray(f.values) && f.values.length ? f.values.map(String) : this.distinctValues(rows, f.key);
            if (!values.length) return;
            this.activeFilters.set(f.key, new Set(values));
            groups.push(this.buildFilterControl(f, values, idx));
          });
          if (!groups.length) return;
          this.filtersBarEl.replaceChildren(...groups);
          this.filtersBarEl.hidden = false;
        }
        /**
         * One filter's disclosure. Reuses the tabs mobile-disclosure shell - funnel
         * icon, label, chevron - opening to a checkbox per value.
         */
        buildFilterControl(f, values, idx) {
          const label = f.label || f.key;
          const themeClass = this.root && this.root.classList.contains("ct-theme-dark") ? "ct-theme-dark" : "ct-theme-light";
          const details = document.createElement("details");
          details.className = "bdga-chart__filter";
          const summary = document.createElement("summary");
          summary.className = "bdga-chart__filter-summary";
          const icon = document.createElement("span");
          icon.className = "bdga-chart__filter-icon";
          icon.setAttribute("aria-hidden", "true");
          icon.innerHTML = FILTER_ICON_SVG;
          const labelEl = document.createElement("span");
          labelEl.className = "bdga-chart__filter-label";
          labelEl.textContent = `${label}: ${values.length} of ${values.length}`;
          const chevron = document.createElement("span");
          chevron.className = "bdga-chart__filter-chevron";
          chevron.setAttribute("aria-hidden", "true");
          chevron.innerHTML = FILTER_CHEVRON_SVG;
          summary.append(icon, labelEl, chevron);
          details.appendChild(summary);
          const fieldset = document.createElement("fieldset");
          fieldset.className = "bdga-chart__filter-options";
          const legend = document.createElement("legend");
          legend.className = "visually-hidden";
          legend.textContent = label;
          fieldset.appendChild(legend);
          const base = `${this.id || "chart"}-f${idx}`;
          values.forEach((val, vIdx) => {
            const optionId = `${base}-o${vIdx}`;
            const option = document.createElement("div");
            option.className = "bdga-chart__filter-option";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = `ct-checkbox ${themeClass}`;
            checkbox.id = optionId;
            checkbox.checked = true;
            checkbox.value = val;
            checkbox.addEventListener("change", () => {
              this.onFilterChange(f.key, val, checkbox.checked, labelEl, label, values.length);
            });
            const optionLabel = document.createElement("label");
            optionLabel.className = `ct-label ct-label--small ct-checkbox__label ${themeClass}`;
            optionLabel.setAttribute("for", optionId);
            optionLabel.textContent = val;
            option.append(checkbox, optionLabel);
            fieldset.appendChild(option);
          });
          details.appendChild(fieldset);
          return details;
        }
        onFilterChange(key, value, checked, labelEl, label, total) {
          const active = this.activeFilters.get(key);
          if (!active) return;
          if (checked) active.add(value);
          else active.delete(value);
          if (labelEl) labelEl.textContent = `${label}: ${active.size} of ${total}`;
          this.drawFiltered();
        }
        /** Rows passing every filter (the row's value is in that filter's set). */
        applyFilters(rows) {
          if (!this.activeFilters || !this.activeFilters.size) return rows;
          const entries = Array.from(this.activeFilters.entries());
          return rows.filter((row) => entries.every(([key, active]) => active.has(String(row[key] ?? ""))));
        }
        /** Draw the filtered view, or an empty state when nothing matches. */
        drawFiltered() {
          const rows = this.applyFilters(this.fullRows || []);
          if (!rows.length) {
            this.showFilterEmptyState();
            return;
          }
          this.draw(rows);
          if (this.activeFilters && this.activeFilters.size) {
            this.setStatus(Drupal2.t("Showing @n of @total rows.", {
              "@n": rows.length,
              "@total": (this.fullRows || []).length
            }));
          }
        }
        showFilterEmptyState() {
          this.lastDrawData = [];
          if (this.canvas) {
            this.canvas.replaceChildren();
            const p = document.createElement("p");
            p.className = "bdga-chart__empty";
            p.textContent = Drupal2.t("No data matches the selected filters.");
            this.canvas.appendChild(p);
          }
          this.setStatus(Drupal2.t("No data matches the selected filters."));
        }
        draw(rows) {
          this.lastDrawData = rows;
          this.lastDrawWidth = this.canvas.clientWidth || 640;
          this.canvas.replaceChildren();
          this.canvas.removeAttribute("aria-hidden");
          this.canvas.setAttribute("aria-hidden", "true");
          this.palette = resolvePalette(this.root);
          this.buildLegend();
          this.points = [];
          this.pointGroups = [];
          this.patternIds = /* @__PURE__ */ new Set();
          const drawRows = this.applicableZoom() ? this.sliceZoom(rows) : rows;
          switch (this.type) {
            case "line":
              this.drawLine(drawRows);
              break;
            case "pie":
              this.drawPie(drawRows);
              break;
            case "stacked_bar":
              this.drawStackedBar(drawRows);
              break;
            case "grouped_bar":
              this.drawGroupedBar(drawRows);
              break;
            case "sankey":
              this.drawSankey();
              break;
            case "flow":
              this.drawFlow();
              break;
            case "lollipop":
              this.drawLollipop(drawRows);
              break;
            case "cleveland":
              this.drawCleveland(drawRows);
              break;
            case "bar":
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
          const labels = rows.map((r) => String(r[this.xKey] || ""));
          const maxLen = labels.reduce((acc, s) => Math.max(acc, s.length), 0);
          const count = labels.length;
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
          const maxLen = rows ? rows.reduce((acc, r) => Math.max(acc, String(r[this.xKey] || "").length), 0) : 0;
          const xLabelExtra = this.xLabel ? 22 : 0;
          const yLabelExtra = this.yLabel ? 24 : 0;
          const bottom2 = (rotation ? Math.min(48 + Math.ceil(maxLen * 4.2), 160) : 48) + xLabelExtra;
          return {
            w,
            h: rotation ? h + (bottom2 - 48 - xLabelExtra) + xLabelExtra : h + xLabelExtra,
            m: { top: 16, right: 24, bottom: bottom2, left: 56 + yLabelExtra },
            rotation
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
            svg.append("text").attr("class", "bdga-chart__axis-label bdga-chart__axis-label--x").attr("x", m.left + (w - m.left - m.right) / 2).attr("y", h - 6).attr("text-anchor", "middle").text(this.xLabel);
          }
          if (this.yLabel) {
            svg.append("text").attr("class", "bdga-chart__axis-label bdga-chart__axis-label--y").attr("transform", "rotate(-90)").attr("x", -(m.top + (h - m.top - m.bottom) / 2)).attr("y", 14).attr("text-anchor", "middle").text(this.yLabel);
          }
        }
        /**
         * Apply rotation to the tick labels on the last-rendered X axis group.
         * Truncates labels longer than 28 chars with an ellipsis, keeping the
         * full text in a <title> child so screen-reader / hover users see all.
         */
        rotateXLabels(svg, rotation) {
          if (!rotation) return;
          const ticks = svg.selectAll("g.tick text").nodes();
          ticks.forEach((t) => {
            const full = t.textContent;
            if (full.length > 28) {
              t.textContent = `${full.slice(0, 27)}…`;
              const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
              title.textContent = full;
              t.parentNode.appendChild(title);
            }
            t.setAttribute("text-anchor", "end");
            t.setAttribute("transform", `translate(-8,4) rotate(${rotation})`);
          });
        }
        svgRoot(w, h) {
          return window.d3.select(this.canvas).append("svg").attr("viewBox", `0 0 ${w} ${h}`).attr("role", "presentation").attr("focusable", "false");
        }
        drawBar(rows) {
          const d3 = window.d3;
          const { w, h, m, rotation } = this.dims(rows);
          const svg = this.svgRoot(w, h);
          const yKey = this.yKeys[0];
          const x = d3.scaleBand().domain(rows.map((r) => r[this.xKey])).range([m.left, w - m.right]).padding(0.15);
          const y = d3.scaleLinear().domain([0, d3.max(rows, (r) => r[yKey]) || 1]).nice().range([h - m.bottom, m.top]);
          const xAxis = svg.append("g").attr("transform", `translate(0,${h - m.bottom})`).call(d3.axisBottom(x));
          svg.append("g").attr("transform", `translate(${m.left},0)`).call(d3.axisLeft(y));
          this.rotateXLabels(xAxis, rotation);
          const palette = this.palette;
          const cb = this.colorBy;
          const colorField = cb && cb !== "series" && cb !== "category" && cb !== "single" && rows[0] && Object.prototype.hasOwnProperty.call(rows[0], cb) ? cb : null;
          let barFill;
          if (colorField) {
            const cats = Array.from(new Set(rows.map((r) => r[colorField])));
            if (cats.every((c) => rankOf(c) !== null)) {
              const ordered = [...cats].sort((a, b) => rankOf(a) - rankOf(b));
              barFill = (d) => shadeSequential(palette, ordered.indexOf(d[colorField]), ordered.length);
            } else {
              const scale = d3.scaleOrdinal().domain(cats).range(palette.categorical);
              barFill = (d) => scale(d[colorField]);
            }
          } else if (cb === "category" && this.yKeys.length === 1) {
            barFill = (_d, i) => i < palette.categorical.length ? palette.categorical[i] : shadeSequential(palette, i, rows.length);
          } else {
            barFill = palette.single;
          }
          const bars = svg.append("g").selectAll("rect").data(rows).join("rect").attr("x", (d) => x(d[this.xKey])).attr("y", (d) => y(d[yKey])).attr("width", x.bandwidth()).attr("height", (d) => y(0) - y(d[yKey])).attr("fill", barFill);
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
          const keys = this.visibleKeys();
          const x0 = d3.scaleBand().domain(rows.map((r) => r[this.xKey])).range([m.left, w - m.right]).paddingInner(0.2);
          const x1 = d3.scaleBand().domain(keys).range([0, x0.bandwidth()]).padding(0.05);
          const yMax = d3.max(rows, (r) => d3.max(keys, (k) => r[k])) || 1;
          const y = d3.scaleLinear().domain([0, yMax]).nice().range([h - m.bottom, m.top]);
          const useSequential = this.yKeys.length > this.palette.categorical.length;
          const palette = this.palette;
          const color = useSequential ? (key) => shadeSequential(palette, this.yKeys.indexOf(key), this.yKeys.length) : d3.scaleOrdinal().domain(this.yKeys).range(palette.categorical);
          const xAxis = svg.append("g").attr("transform", `translate(0,${h - m.bottom})`).call(d3.axisBottom(x0));
          svg.append("g").attr("transform", `translate(${m.left},0)`).call(d3.axisLeft(y));
          this.rotateXLabels(xAxis, rotation);
          const groupRects = svg.append("g").selectAll("g").data(rows).join("g").attr("transform", (d) => `translate(${x0(d[this.xKey])},0)`).selectAll("rect").data((d) => keys.map((key) => ({ key, value: +d[key] || 0 }))).join("rect").attr("x", (d) => x1(d.key)).attr("y", (d) => y(d.value)).attr("width", x1.bandwidth()).attr("height", (d) => y(0) - y(d.value)).attr("data-bdga-series", (d) => d.key).attr("fill", (d) => this.fillFor(svg, this.yKeys.indexOf(d.key), color(d.key)));
          const groupRectNodes = groupRects.nodes();
          keys.forEach((key) => {
            const entries = groupRectNodes.map((el) => ({ el, d: d3.select(el).datum(), row: d3.select(el.parentNode).datum() })).filter((o) => o.d.key === key).map((o) => ({ el: o.el, xVal: o.row[this.xKey], value: o.d.value }));
            this.addPoints(key, entries);
          });
          this.drawAxisLabels(svg, w, h, m);
        }
        drawStackedBar(rows) {
          const d3 = window.d3;
          const { w, h, m, rotation } = this.dims(rows);
          const svg = this.svgRoot(w, h);
          const series = d3.stack().keys(this.visibleKeys())(rows);
          const x = d3.scaleBand().domain(rows.map((r) => r[this.xKey])).range([m.left, w - m.right]).padding(0.15);
          const y = d3.scaleLinear().domain([0, d3.max(series, (s) => d3.max(s, (d) => d[1])) || 1]).nice().range([h - m.bottom, m.top]);
          const useSequential = this.yKeys.length > this.palette.categorical.length;
          const palette = this.palette;
          const color = useSequential ? (key) => shadeSequential(palette, this.yKeys.indexOf(key), this.yKeys.length) : d3.scaleOrdinal().domain(this.yKeys).range(palette.categorical);
          const xAxis = svg.append("g").attr("transform", `translate(0,${h - m.bottom})`).call(d3.axisBottom(x));
          svg.append("g").attr("transform", `translate(${m.left},0)`).call(d3.axisLeft(y));
          this.rotateXLabels(xAxis, rotation);
          const stackRects = svg.append("g").selectAll("g").data(series).join("g").attr("fill", (s) => this.fillFor(svg, this.yKeys.indexOf(s.key), color(s.key))).attr("data-bdga-series", (s) => s.key).selectAll("rect").data((s) => s).join("rect").attr("x", (d) => x(d.data[this.xKey])).attr("y", (d) => y(d[1])).attr("height", (d) => y(d[0]) - y(d[1])).attr("width", x.bandwidth());
          const byKey = /* @__PURE__ */ new Map();
          stackRects.nodes().forEach((el) => {
            const sKey = el.parentNode.getAttribute("data-bdga-series");
            const d = d3.select(el).datum();
            if (!byKey.has(sKey)) byKey.set(sKey, []);
            byKey.get(sKey).push({ el, xVal: d.data[this.xKey], value: d.data[sKey] });
          });
          this.visibleKeys().slice().reverse().forEach((key) => {
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
          if (multi) {
            const longest = keys.reduce((a, k) => Math.max(a, String(k).length), 0);
            m.right = Math.max(m.right, Math.min(160, 16 + longest * 7));
          }
          const svg = this.svgRoot(w, h);
          const x = d3.scalePoint().domain(rows.map((r) => r[this.xKey])).range([m.left, w - m.right]);
          const yMax = d3.max(rows, (r) => d3.max(keys, (k) => +r[k] || 0)) || 1;
          const y = d3.scaleLinear().domain([0, yMax]).nice().range([h - m.bottom, m.top]);
          const xAxis = svg.append("g").attr("transform", `translate(0,${h - m.bottom})`).call(d3.axisBottom(x));
          svg.append("g").attr("transform", `translate(${m.left},0)`).call(d3.axisLeft(y));
          this.rotateXLabels(xAxis, rotation);
          const palette = this.palette;
          const SYMBOLS = [
            d3.symbolCircle,
            d3.symbolSquare,
            d3.symbolTriangle,
            d3.symbolDiamond,
            d3.symbolStar,
            d3.symbolCross,
            d3.symbolWye
          ];
          const idxOf = (key) => this.yKeys.indexOf(key);
          const colorFor = (key) => {
            if (!multi) return palette.single;
            const i = idxOf(key);
            return i < palette.categorical.length ? palette.categorical[i] : shadeSequential(palette, i, this.yKeys.length);
          };
          const symbolFor = (key) => d3.symbol().type(SYMBOLS[idxOf(key) % SYMBOLS.length]).size(70)();
          keys.forEach((key) => {
            const color = colorFor(key);
            const g = svg.append("g").attr("data-bdga-series", key);
            const lineGen = d3.line().x((d) => x(d[this.xKey])).y((d) => y(+d[key] || 0));
            g.append("path").attr("class", "bdga-chart__line").datum(rows).attr("fill", "none").attr("stroke", color).attr("stroke-width", 2).attr("d", lineGen);
            const markers = g.selectAll("path.bdga-chart__line-marker").data(rows).join("path").attr("class", "bdga-chart__line-marker").attr("transform", (d) => `translate(${x(d[this.xKey])},${y(+d[key] || 0)})`).attr("d", symbolFor(key)).attr("fill", color);
            if (multi && rows.length) {
              const last = rows[rows.length - 1];
              g.append("text").attr("class", "bdga-chart__line-label").attr("x", x(last[this.xKey]) + 6).attr("y", y(+last[key] || 0)).attr("dy", "0.32em").attr("fill", color).text(key);
            }
            this.addPoints(
              multi ? key : this.yLabel || key,
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
          const r = Math.max(48, Math.min(w, h) / 2 - 72);
          const g = svg.append("g").attr("transform", `translate(${w / 2},${h / 2})`);
          const palette = this.palette;
          const total = rows.length;
          const colorByKey = /* @__PURE__ */ new Map();
          const idxByKey = /* @__PURE__ */ new Map();
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
          const slices = g.selectAll("path.bdga-chart__pie-slice").data(arcs).join("path").attr("class", "bdga-chart__pie-slice").attr("d", arc).attr("data-bdga-series", (d) => String(d.data[this.xKey])).attr("fill", (d) => {
            const k = String(d.data[this.xKey]);
            return this.fillFor(svg, idxByKey.get(k) || 0, colorByKey.get(k) || palette.single);
          }).attr("stroke", "var(--ct-color-background, #fff)").attr("stroke-width", 2);
          const labelArc = d3.arc().innerRadius(r + 6).outerRadius(r + 6);
          const mid = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;
          const labels = g.append("g").attr("class", "bdga-chart__pie-labels").attr("aria-hidden", "true");
          arcs.forEach((d) => {
            const right2 = mid(d) < Math.PI;
            const elbow = labelArc.centroid(d);
            const end2 = [(r + 28) * (right2 ? 1 : -1), elbow[1]];
            labels.append("polyline").attr("class", "bdga-chart__pie-leader").attr("points", [arc.centroid(d), elbow, end2].map((p) => p.join(",")).join(" "));
            const pct = Math.round((Number(d.data[yKey]) || 0) / sum * 100);
            labels.append("text").attr("class", "bdga-chart__pie-label").attr("x", end2[0] + (right2 ? 4 : -4)).attr("y", end2[1]).attr("dy", "0.32em").attr("text-anchor", right2 ? "start" : "end").text(`${d.data[this.xKey]} (${pct}%)`);
          });
          this.addPoints(
            null,
            slices.nodes().map((el) => {
              const d = d3.select(el).datum();
              const pct = Math.round((Number(d.data[yKey]) || 0) / sum * 100);
              return {
                el,
                label: Drupal2.t("@x: @v, @p% of total", {
                  "@x": d.data[this.xKey],
                  "@v": this.formatValue(d.data[yKey]),
                  "@p": pct
                })
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
          const x = d3.scalePoint().domain(rows.map((r) => r[this.xKey])).range([m.left, w - m.right]).padding(0.5);
          const yMax = d3.max(rows, (r) => r[yKey]) || 1;
          const y = d3.scaleLinear().domain([0, yMax]).nice().range([h - m.bottom, m.top]);
          const xAxis = svg.append("g").attr("transform", `translate(0,${h - m.bottom})`).call(d3.axisBottom(x));
          svg.append("g").attr("transform", `translate(${m.left},0)`).call(d3.axisLeft(y));
          this.rotateXLabels(xAxis, rotation);
          const palette = this.palette;
          const categoryKey = rows[0] && Object.keys(rows[0]).find(
            (k) => k !== this.xKey && k !== yKey && typeof rows[0][k] === "string"
          ) || null;
          const categories = categoryKey ? Array.from(new Set(rows.map((r) => r[categoryKey]))) : [];
          const categoryColor = categoryKey ? d3.scaleOrdinal().domain(categories).range(palette.categorical) : null;
          const dotColor = (d) => {
            if (this.colorBy === "category" && categoryKey) {
              return categoryColor(d[categoryKey]);
            }
            return palette.single;
          };
          const stems = svg.append("g").attr("class", "bdga-chart__lollipop-stems");
          stems.selectAll("line").data(rows).join("line").attr("class", "bdga-chart__lollipop-stem").attr("x1", (d) => x(d[this.xKey])).attr("x2", (d) => x(d[this.xKey])).attr("y1", y(0)).attr("y2", (d) => y(d[yKey]));
          const dots = svg.append("g").selectAll("circle").data(rows).join("circle").attr("class", "bdga-chart__lollipop-dot").attr("cx", (d) => x(d[this.xKey])).attr("cy", (d) => y(d[yKey])).attr("r", 4).attr("fill", dotColor);
          dots.append("title").text((d) => `${d[this.xKey]}: ${d[yKey]}`);
          this.addPoints(
            this.yLabel || yKey,
            dots.nodes().map((el) => {
              const d = d3.select(el).datum();
              return { el, xVal: d[this.xKey], value: d[yKey] };
            })
          );
          if (this.medianValue !== null && this.medianValue > 0) {
            const yPos = y(this.medianValue);
            svg.append("line").attr("class", "bdga-chart__lollipop-median").attr("x1", m.left).attr("x2", w - m.right).attr("y1", yPos).attr("y2", yPos);
            svg.append("text").attr("class", "bdga-chart__lollipop-median-label").attr("x", w - m.right).attr("y", yPos - 4).attr("text-anchor", "end").text(Drupal2.t("Median @v", { "@v": this.medianValue.toLocaleString() }));
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
          axisSel.selectAll("g.tick text").nodes().forEach((t) => {
            const full = t.textContent;
            if (full.length > maxChars) {
              t.textContent = `${full.slice(0, maxChars - 1)}…`;
              const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
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
          if (keys.length < 2) return this.fail("Cleveland dot plot needs two y_keys");
          const w = this.canvas.clientWidth || 640;
          const labels = rows.map((r) => String(r[this.xKey] != null ? r[this.xKey] : ""));
          const longest = labels.reduce((a, s) => Math.max(a, s.length), 0);
          const labelBudget = Math.min(Math.round(w * 0.38), Math.max(72, Math.round(longest * 6.5)));
          const m = { top: 44, right: 28, bottom: 44, left: labelBudget + 12 };
          const rowH = 26;
          const h = m.top + m.bottom + Math.max(1, rows.length) * rowH;
          const svg = this.svgRoot(w, h);
          const y = d3.scaleBand().domain(labels).range([m.top, h - m.bottom]).padding(0.45);
          const xMax = d3.max(rows, (r) => Math.max(...keys.map((k) => Number(r[k]) || 0))) || 1;
          const x = d3.scaleLinear().domain([0, xMax]).nice().range([m.left, w - m.right]);
          svg.append("g").attr("transform", `translate(0,${h - m.bottom})`).call(d3.axisBottom(x).ticks(Math.min(8, xMax)).tickFormat(d3.format("d")));
          const yAxis = svg.append("g").attr("transform", `translate(${m.left},0)`).call(d3.axisLeft(y));
          this.truncateTickLabels(yAxis, labelBudget);
          const colorA = palette.categorical[0];
          const colorB = palette.categorical[1];
          const cy = (d) => y(String(d[this.xKey] != null ? d[this.xKey] : "")) + y.bandwidth() / 2;
          const rowG = svg.append("g").selectAll("g").data(rows).join("g").attr("class", "bdga-chart__cleveland-row").attr("tabindex", "0").attr("role", "img").attr("aria-label", (d) => `${d[this.xKey]}: ${keys[0]} ${d[keys[0]]}, ${keys[1]} ${d[keys[1]]}`);
          rowG.append("line").attr("class", "bdga-chart__cleveland-connector").attr("x1", (d) => x(Number(d[keys[0]]) || 0)).attr("x2", (d) => x(Number(d[keys[1]]) || 0)).attr("y1", cy).attr("y2", cy);
          keys.forEach((k, i) => {
            rowG.append("circle").attr("class", `bdga-chart__cleveland-dot bdga-chart__cleveland-dot--${i + 1}`).attr("cx", (d) => x(Number(d[k]) || 0)).attr("cy", cy).attr("r", 5).attr("fill", i === 0 ? colorA : colorB).append("title").text((d) => `${d[this.xKey]} - ${k}: ${d[k]}`);
          });
          const legend = svg.append("g").attr("class", "bdga-chart__cleveland-legend").attr("transform", `translate(${m.left},22)`);
          keys.forEach((k, i) => {
            const g = legend.append("g").attr("transform", `translate(${i * 96},0)`);
            g.append("circle").attr("r", 5).attr("cx", 5).attr("cy", -4).attr("fill", i === 0 ? colorA : colorB);
            g.append("text").attr("class", "bdga-chart__cleveland-legend-label").attr("x", 16).attr("y", 0).text(k);
          });
          this.drawAxisLabels(svg, w, h, m);
          this.exposePlot(Drupal2.t("Tab to each row for its values."));
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
          const c = this.canvas;
          let side = cssNum(c, "--bdga-chart-sankey-margin-x", 140);
          const MIN_PLOT = 80;
          if (w - side * 2 < MIN_PLOT) {
            side = Math.max(8, Math.floor((w - MIN_PLOT) / 2));
          }
          const m = {
            top: cssNum(c, "--bdga-chart-sankey-margin-top", 60),
            right: side,
            bottom: cssNum(c, "--bdga-chart-sankey-margin-bottom", 10),
            left: side
          };
          const stackedLabels = cssVar(c, "--bdga-chart-sankey-label-mode", "outside") !== "outside";
          const svg = this.svgRoot(w, h);
          const split = (id) => {
            const idx = id.indexOf(": ");
            return idx >= 0 ? { prefix: id.slice(0, idx), label: id.slice(idx + 2) } : { prefix: "", label: id };
          };
          const meta = /* @__PURE__ */ new Map();
          this.nodes.forEach((n) => meta.set(n.id, split(n.id)));
          const allPrefixed = this.nodes.every((n) => meta.get(n.id).prefix !== "");
          const stageIndex = /* @__PURE__ */ new Map();
          this.nodes.forEach((n) => {
            const p = meta.get(n.id).prefix;
            if (!p) return;
            if (typeof n.stage === "number" && !stageIndex.has(p)) {
              stageIndex.set(p, n.stage);
            }
          });
          this.nodes.forEach((n) => {
            const p = meta.get(n.id).prefix;
            if (p && !stageIndex.has(p)) {
              stageIndex.set(p, stageIndex.size);
            }
          });
          const fallbackAlign = alignFn || d3.sankeyJustify;
          const customAlign = allPrefixed && stageIndex.size >= 2 ? (node, n) => {
            if (typeof node.stage === "number") return node.stage;
            const p = meta.get(node.id).prefix;
            const i = stageIndex.get(p);
            return i !== void 0 ? i : fallbackAlign(node, n);
          } : fallbackAlign;
          const sankeyGen = d3.sankey().nodeId((d) => d.id).nodeAlign(customAlign).nodeWidth(14).nodePadding(12).extent([
            [m.left, m.top],
            [w - m.right, h - m.bottom]
          ]).nodeSort((a, b) => compareByRank(meta.get(a.id).label, meta.get(b.id).label));
          const nodes = this.nodes.map((n) => Object.assign({}, n));
          const links = this.links.map((l) => Object.assign({}, l));
          const graph = sankeyGen({ nodes, links });
          const palette = this.palette;
          const mutedColour = cssVar(this.root, "--bdga-chart-sankey-muted", "#a8a8a8");
          let colourForNode;
          if (allPrefixed) {
            const isMutedLabel = (label) => {
              const r = rankOf(label);
              return r !== null && r >= 5;
            };
            const seen = /* @__PURE__ */ new Set();
            const encounterOrder = [];
            graph.nodes.forEach((n) => {
              const key = meta.get(n.id).label;
              if (!seen.has(key) && !isMutedLabel(key)) {
                seen.add(key);
                encounterOrder.push(key);
              }
            });
            const ordered = encounterOrder.slice().sort(compareByRank);
            const groupIndex = /* @__PURE__ */ new Map();
            ordered.forEach((key, i) => groupIndex.set(key, i));
            const totalGroups = ordered.length;
            colourForNode = (n) => {
              const label = meta.get(n.id).label;
              if (isMutedLabel(label)) return mutedColour;
              const i = groupIndex.get(label);
              if (i === void 0) return palette.single;
              return i < palette.sequential.length ? palette.sequential[i] : shadeSequential(palette, i, totalGroups);
            };
          } else {
            colourForNode = (n, i) => i < palette.categorical.length ? palette.categorical[i] : shadeSequential(palette, i, graph.nodes.length);
          }
          const colorByNode = /* @__PURE__ */ new Map();
          graph.nodes.forEach((n, i) => colorByNode.set(n.id, colourForNode(n, i)));
          const headers = /* @__PURE__ */ new Map();
          graph.nodes.forEach((n) => {
            const p = meta.get(n.id).prefix;
            if (!p) return;
            if (!headers.has(n.layer)) {
              headers.set(n.layer, { x: (n.x0 + n.x1) / 2, prefix: p });
            } else if (headers.get(n.layer).prefix !== p) {
              headers.set(n.layer, { x: 0, prefix: "" });
            }
          });
          const headerGroup = svg.append("g").attr("aria-hidden", "true");
          headers.forEach((meta_) => {
            if (!meta_.prefix) return;
            headerGroup.append("text").attr("class", "bdga-chart__sankey-column-header").attr("x", meta_.x).attr("y", m.top - 20).attr("text-anchor", "middle").text(meta_.prefix);
          });
          const flowLabel = (d) => {
            let base = `${d.source.id} → ${d.target.id}: ${this.formatValue(d.value)}`;
            if (typeof d.budget === "number") {
              base += ` ($${d.budget.toFixed(2)}B)`;
            }
            return base;
          };
          const linkGroup = svg.append("g").attr("fill", "none").attr("aria-hidden", "true");
          linkGroup.selectAll("path").data(graph.links).join("path").attr("class", "bdga-chart__sankey-link").attr("data-bdga-link", "").attr("aria-label", flowLabel).attr("d", d3.sankeyLinkHorizontal()).attr("stroke", (d) => colorByNode.get(d.source.id) || palette.single).attr("stroke-width", (d) => Math.max(1, d.width)).append("title").text(flowLabel);
          const maxLayer = d3.max(graph.nodes, (n) => n.layer);
          const nodeGroup = svg.append("g").selectAll("g").data(graph.nodes).join("g").attr("class", "bdga-chart__sankey-node");
          nodeGroup.append("rect").attr("x", (d) => d.x0).attr("y", (d) => d.y0).attr("width", (d) => Math.max(1, d.x1 - d.x0)).attr("height", (d) => Math.max(1, d.y1 - d.y0)).attr("fill", (d) => colorByNode.get(d.id) || palette.single).append("title").text((d) => `${d.name || d.id}: ${d.value}`);
          const isEdge = (d) => d.layer === 0 || d.layer === maxLayer;
          nodeGroup.append("text").attr("text-anchor", (d) => {
            if (stackedLabels) {
              if (d.layer === 0) return "start";
              if (d.layer === maxLayer) return "end";
              return "middle";
            }
            if (d.layer === 0) return "end";
            if (d.layer === maxLayer) return "start";
            return "middle";
          }).attr("x", (d) => {
            if (stackedLabels) {
              if (d.layer === 0) return d.x0;
              if (d.layer === maxLayer) return d.x1;
              return (d.x0 + d.x1) / 2;
            }
            if (d.layer === 0) return d.x0 - 6;
            if (d.layer === maxLayer) return d.x1 + 6;
            return (d.x0 + d.x1) / 2;
          }).attr("y", (d) => {
            if (!stackedLabels && isEdge(d)) return (d.y0 + d.y1) / 2;
            return d.y0 - 4;
          }).attr("dy", (d) => !stackedLabels && isEdge(d) ? "0.35em" : "0").text((d) => meta.get(d.id).label);
          this.addPoints(
            null,
            nodeGroup.nodes().map((el) => {
              const d = d3.select(el).datum();
              const incoming = (d.targetLinks || []).length;
              const outgoing = (d.sourceLinks || []).length;
              const parts = [];
              if (incoming) parts.push(Drupal2.t("@n in", { "@n": incoming }));
              if (outgoing) parts.push(Drupal2.t("@n out", { "@n": outgoing }));
              const flows = parts.length ? `. ${parts.join(", ")}` : "";
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
    (function() {
      if (typeof window.Drupal === "undefined" || typeof window.Drupal.attachBehaviors === "function") {
        return;
      }
      const attach2 = (context) => {
        Object.values(window.Drupal.behaviors).forEach((b) => {
          if (b && typeof b.attach === "function") b.attach(context || document);
        });
      };
      window.Drupal.attachBehaviors = attach2;
      const run = () => attach2(document);
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
      } else {
        run();
      }
      new MutationObserver(run).observe(
        document.body || document.documentElement,
        { childList: true, subtree: true }
      );
    })();
  }
  function init19() {
    (function() {
      if (typeof window.Drupal === "undefined") {
        window.Drupal = {
          behaviors: {},
          t: (str, args) => {
            if (!args) return str;
            return String(str).replace(/[@!%][\w-]+/g, (m) => m in args ? String(args[m]) : m);
          }
        };
      }
      if (typeof window.once === "undefined") {
        const marks = /* @__PURE__ */ new WeakMap();
        window.once = function(id, selector, context) {
          const root = context || document;
          const out = [];
          root.querySelectorAll(selector).forEach((el) => {
            const keys = marks.get(el) || /* @__PURE__ */ new Set();
            if (keys.has(id)) return;
            keys.add(id);
            marks.set(el, keys);
            out.push(el);
          });
          return out;
        };
      }
    })();
    (function(Drupal2, once) {
      const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
      const CHECK_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ*~$=U";
      const CODE_LENGTH = 8;
      function splitList(value) {
        return (value || "").split(",").map((s) => s.trim()).filter(Boolean);
      }
      const SVG_NS = "http://www.w3.org/2000/svg";
      function svgNode(tag, attrs) {
        const el = document.createElementNS(SVG_NS, tag);
        Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
        return el;
      }
      function trackerCheck() {
        const svg = svgNode("svg", { class: "progress-marker__icon", viewBox: "0 0 24 24", focusable: "false" });
        svg.appendChild(svgNode("polyline", { points: "5 12.5 10 17.5 19 7" }));
        return svg;
      }
      Drupal2.behaviors.dgaDecisionTool = {
        attach(context) {
          once("dga-decision-tool", "[data-dga-decision-tool]", context).forEach((el) => {
            new DecisionTool(el).init();
          });
        }
      };
      class DecisionTool {
        constructor(root) {
          this.root = root;
          this.id = root.dataset.dgaDecisionToolId || null;
          this.storageKey = root.dataset.dgaDecisionToolStorageKey || null;
          this.steps = Array.from(root.querySelectorAll("[data-dga-decision-tool-step]"));
          this.outcomes = Array.from(root.querySelectorAll("[data-dga-decision-tool-outcome]"));
          this.stepsWrap = root.querySelector("[data-dga-decision-tool-steps]");
          this.nav = root.querySelector("[data-dga-decision-tool-nav]");
          this.resultWrap = root.querySelector("[data-dga-decision-tool-result]");
          this.statusEl = root.querySelector("[data-dga-decision-tool-status]");
          this.progressEl = root.querySelector("[data-dga-decision-tool-progress]");
          this.backWrap = root.querySelector("[data-dga-decision-tool-back]");
          this.nextWrap = root.querySelector("[data-dga-decision-tool-advance-next]");
          this.submitWrap = root.querySelector("[data-dga-decision-tool-advance-submit]");
          this.restartWrap = root.querySelector("[data-dga-decision-tool-restart]");
          this.backBtn = this.backWrap ? this.backWrap.querySelector(".ct-button") : null;
          this.nextBtn = this.nextWrap ? this.nextWrap.querySelector(".ct-button") : null;
          this.submitBtn = this.submitWrap ? this.submitWrap.querySelector(".ct-button") : null;
          this.restartBtn = this.restartWrap ? this.restartWrap.querySelector(".ct-button") : null;
          this.summaryEl = root.querySelector("[data-dga-decision-tool-summary]");
          this.summaryList = this.summaryEl ? this.summaryEl.querySelector("[data-dga-decision-tool-summary-list]") : null;
          this.history = [];
        }
        init() {
          if (!this.steps.length || !this.stepsWrap || !this.nav || !this.resultWrap) return;
          this.root.setAttribute("data-enhanced", "true");
          this.bind();
          this.history = [this.steps[0]];
          this.showCurrent(false);
        }
        bind() {
          this.stepsWrap.addEventListener("change", () => this.onChange());
          if (this.backBtn) this.backBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.back();
          });
          if (this.nextBtn) this.nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.advance();
          });
          if (this.submitBtn) this.submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.advance();
          });
          if (this.restartBtn) this.restartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.restart();
          });
        }
        current() {
          return this.history[this.history.length - 1];
        }
        stepById(id) {
          return this.steps.find((s) => s.dataset.stepId === id) || null;
        }
        hasSelection(step) {
          return !!step.querySelector("[data-dga-decision-tool-option]:checked");
        }
        /** Resolve where the current step leads, given the live selection. */
        resolveNext(step) {
          if (!this.hasSelection(step)) return null;
          if (step.dataset.stepType !== "multiple") {
            const checked = step.querySelector("[data-dga-decision-tool-option]:checked");
            if (checked && checked.dataset.next) return checked.dataset.next;
          }
          if (step.dataset.defaultNext) return step.dataset.defaultNext;
          const idx = this.steps.indexOf(step);
          if (idx > -1 && idx < this.steps.length - 1) return this.steps[idx + 1].dataset.stepId;
          return "result";
        }
        showCurrent(focus) {
          const step = this.current();
          this.resultWrap.hidden = true;
          this.steps.forEach((s) => {
            const active = s === step;
            s.hidden = !active;
            s.classList.toggle("dga-decision-tool__step--active", active);
          });
          this.outcomes.forEach((o) => {
            o.hidden = true;
          });
          this.nav.hidden = false;
          this.renderProgress();
          this.updateNav();
          this.renderSummary(false);
          if (focus) {
            const heading = step.querySelector("[data-dga-decision-tool-step-heading]");
            if (heading) heading.focus();
            this.announce(Drupal2.t("Step @n.", { "@n": this.history.length }));
          }
        }
        renderProgress(isComplete) {
          if (!this.progressEl) return;
          this.progressEl.hidden = false;
          if (this.progressEl.dataset.progressStyle === "bar") {
            this.renderProgressBar(isComplete);
          } else {
            this.renderProgressTracker(isComplete);
          }
        }
        /**
         * Horizontal progress-tracker over ALL defined steps (the page count): each
         * marker is complete (visited, shown with a check), active (current), or
         * to-do (not yet visited). When a branch skips steps the active marker just
         * lands further along - the skipped markers stay to-do.
         */
        renderProgressTracker(isComplete) {
          let tracker = this.progressEl.querySelector(".progress-tracker");
          if (!tracker) {
            tracker = document.createElement("ol");
            tracker.className = "progress-tracker";
            this.progressEl.appendChild(tracker);
          }
          const current = this.current();
          const visited = new Set(this.history);
          const frag = document.createDocumentFragment();
          this.steps.forEach((step, i) => {
            const isCurrent = !isComplete && step === current;
            const done = isComplete || visited.has(step) && !isCurrent;
            const item = document.createElement("li");
            item.className = "progress-step";
            if (done) item.classList.add("is-complete");
            if (isCurrent) {
              item.classList.add("is-active");
              item.setAttribute("aria-current", "step");
            }
            const marker = document.createElement("span");
            marker.className = "progress-marker";
            marker.setAttribute("aria-hidden", "true");
            if (done) marker.appendChild(trackerCheck());
            else marker.textContent = String(i + 1);
            const status = document.createElement("span");
            status.className = "ct-visually-hidden";
            if (done) status.textContent = Drupal2.t("Step @n, completed", { "@n": i + 1 });
            else if (isCurrent) status.textContent = Drupal2.t("Step @n, current", { "@n": i + 1 });
            else status.textContent = Drupal2.t("Step @n, not started", { "@n": i + 1 });
            item.append(marker, status);
            frag.appendChild(item);
          });
          tracker.replaceChildren(frag);
        }
        /** Simple filled progress bar with a "Step N of T" / "Complete" label. */
        renderProgressBar(isComplete) {
          let label = this.progressEl.querySelector("[data-dga-decision-tool-bar-label]");
          let fill = this.progressEl.querySelector("[data-dga-decision-tool-bar-fill]");
          if (!label) {
            const wrap = document.createElement("div");
            wrap.className = "dga-decision-tool__bar";
            label = document.createElement("p");
            label.className = "dga-decision-tool__bar-label";
            label.setAttribute("data-dga-decision-tool-bar-label", "");
            const track = document.createElement("div");
            track.className = "dga-decision-tool__bar-track";
            track.setAttribute("aria-hidden", "true");
            fill = document.createElement("span");
            fill.className = "dga-decision-tool__bar-fill";
            fill.setAttribute("data-dga-decision-tool-bar-fill", "");
            track.appendChild(fill);
            wrap.append(label, track);
            this.progressEl.appendChild(wrap);
          }
          const total = this.steps.length || 1;
          const idx = this.steps.indexOf(this.current());
          const stepNum = idx > -1 ? idx + 1 : this.history.length;
          const pct = isComplete ? 100 : Math.round(stepNum / total * 100);
          label.textContent = isComplete ? Drupal2.t("Complete") : Drupal2.t("Step @n of @t", { "@n": stepNum, "@t": total });
          fill.style.width = `${pct}%`;
        }
        updateNav() {
          const step = this.current();
          const isLinkCard = step.dataset.stepOptionStyle === "link-card";
          if (this.backWrap) this.backWrap.hidden = this.history.length <= 1;
          if (isLinkCard) {
            if (this.nextWrap) this.nextWrap.hidden = true;
            if (this.submitWrap) this.submitWrap.hidden = true;
            return;
          }
          const toResult = this.resolveNext(step) === "result";
          if (this.nextWrap) this.nextWrap.hidden = toResult;
          if (this.submitWrap) this.submitWrap.hidden = !toResult;
        }
        onChange() {
          this.updateNav();
          const step = this.current();
          if (step && step.dataset.stepOptionStyle === "link-card" && this.hasSelection(step)) {
            this.advance();
          }
        }
        /** The chosen option label(s) for a step, for the answer summary. */
        answerText(step) {
          const labels = [];
          step.querySelectorAll("[data-dga-decision-tool-option]:checked").forEach((input) => {
            const option = input.closest(".dga-decision-tool__option");
            const label = option ? option.querySelector(".dga-decision-tool__option-label") : null;
            if (label) labels.push(label.textContent.trim());
          });
          return labels.join(", ");
        }
        /**
         * Fill the "what you have answered" review. During the flow it lists the
         * answered steps before the current one; on the result it lists them all.
         * Each row has a Change link that jumps back to that step.
         */
        renderSummary(onResult) {
          if (!this.summaryList || !this.summaryEl) return;
          const candidates = onResult ? this.history : this.history.slice(0, -1);
          const answered = candidates.filter((step) => this.hasSelection(step));
          if (!answered.length) {
            this.summaryEl.hidden = true;
            return;
          }
          this.summaryEl.hidden = false;
          const changeLabel = this.summaryEl.dataset.changeLabel || Drupal2.t("Change");
          const frag = document.createDocumentFragment();
          answered.forEach((step, i) => {
            const item = document.createElement("li");
            item.className = "dga-decision-tool__summary-item";
            const number = document.createElement("span");
            number.className = "dga-decision-tool__summary-number";
            number.setAttribute("aria-hidden", "true");
            number.textContent = String(i + 1);
            const heading = step.querySelector("[data-dga-decision-tool-step-heading]");
            const question = heading ? heading.textContent.trim() : "";
            const body = document.createElement("span");
            body.className = "dga-decision-tool__summary-body";
            const q = document.createElement("span");
            q.className = "dga-decision-tool__summary-question";
            q.textContent = question;
            const a = document.createElement("span");
            a.className = "dga-decision-tool__summary-answer";
            a.textContent = this.answerText(step);
            body.append(q, a);
            const change = document.createElement("button");
            change.type = "button";
            change.className = "dga-decision-tool__summary-change";
            change.textContent = changeLabel;
            const hidden = document.createElement("span");
            hidden.className = "ct-visually-hidden";
            hidden.textContent = `: ${question}`;
            change.appendChild(hidden);
            change.addEventListener("click", (e) => {
              e.preventDefault();
              this.changeStep(step);
            });
            item.append(number, body, change);
            frag.appendChild(item);
          });
          this.summaryList.replaceChildren(frag);
        }
        /** Jump back to a step to change its answer; later answers are dropped. */
        changeStep(step) {
          const idx = this.history.indexOf(step);
          if (idx === -1) return;
          this.history = this.history.slice(0, idx + 1);
          this.outcomes.forEach((o) => {
            o.hidden = true;
            o.removeAttribute("tabindex");
          });
          this.showCurrent(true);
        }
        advance() {
          const step = this.current();
          if (!this.hasSelection(step)) {
            this.announce(Drupal2.t("Select an answer to continue."));
            const first = step.querySelector("[data-dga-decision-tool-option]");
            if (first) first.focus();
            return;
          }
          const target = this.resolveNext(step);
          const next = target === "result" ? null : this.stepById(target);
          if (!next) {
            this.complete();
            return;
          }
          this.history.push(next);
          this.showCurrent(true);
        }
        back() {
          if (this.history.length <= 1) return;
          this.history.pop();
          this.showCurrent(true);
        }
        restart() {
          this.steps.forEach((s) => {
            s.querySelectorAll("[data-dga-decision-tool-option]:checked").forEach((input) => {
              input.checked = false;
            });
          });
          this.outcomes.forEach((o) => {
            o.hidden = true;
            o.removeAttribute("tabindex");
          });
          this.history = [this.steps[0]];
          this.showCurrent(true);
        }
        /** Union of flags from every selected option along the visited path. */
        collectFlags() {
          const flags = [];
          const seen = /* @__PURE__ */ new Set();
          this.history.forEach((step) => {
            step.querySelectorAll("[data-dga-decision-tool-option]:checked").forEach((input) => {
              splitList(input.dataset.flags).forEach((flag) => {
                if (!seen.has(flag)) {
                  seen.add(flag);
                  flags.push(flag);
                }
              });
            });
          });
          return flags;
        }
        /** First outcome whose when-condition holds; last is the fallback. */
        matchOutcome(flags) {
          const set = new Set(flags);
          for (let i = 0; i < this.outcomes.length; i += 1) {
            const outcome = this.outcomes[i];
            const all = splitList(outcome.dataset.whenAll);
            const any = splitList(outcome.dataset.whenAny);
            const allOk = all.every((flag) => set.has(flag));
            const anyOk = any.length === 0 || any.some((flag) => set.has(flag));
            if (allOk && anyOk) return outcome;
          }
          return this.outcomes[this.outcomes.length - 1] || null;
        }
        complete() {
          const flags = this.collectFlags();
          const outcome = this.matchOutcome(flags);
          const code = this.generateCode();
          this.steps.forEach((s) => {
            s.hidden = true;
          });
          this.nav.hidden = true;
          if (this.progressEl) {
            if (this.progressEl.dataset.progressStyle === "bar") {
              this.progressEl.hidden = false;
              this.renderProgressBar(true);
            } else {
              this.progressEl.hidden = true;
            }
          }
          this.resultWrap.hidden = false;
          this.outcomes.forEach((o) => {
            o.hidden = o !== outcome;
          });
          this.renderSummary(true);
          let outcomeId = null;
          if (outcome) {
            outcomeId = outcome.dataset.outcomeId || null;
            const codeEl = outcome.querySelector("[data-dga-decision-tool-code]");
            if (codeEl) codeEl.textContent = code || "";
            this.wireCopy(outcome);
            outcome.setAttribute("tabindex", "-1");
            outcome.focus();
          }
          this.announce(Drupal2.t("Assessment complete. Your reference code is ready below."));
          const detail = {
            questionSetId: this.id,
            outcomeId,
            flags,
            referenceCode: code
          };
          this.root.dispatchEvent(new CustomEvent("civictheme:decision-tool:complete", {
            bubbles: true,
            detail
          }));
          if (this.storageKey) {
            try {
              window.sessionStorage.setItem(this.storageKey, JSON.stringify(detail));
            } catch (e) {
            }
          }
        }
        wireCopy(outcome) {
          const wrap = outcome.querySelector("[data-dga-decision-tool-copy]");
          if (!wrap || wrap.dataset.bound === "true") return;
          const btn = wrap.querySelector(".ct-button");
          const codeEl = outcome.querySelector("[data-dga-decision-tool-code]");
          if (!btn || !codeEl) return;
          wrap.dataset.bound = "true";
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            const text = codeEl.textContent;
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(
                () => this.announce(Drupal2.t("Reference code copied to the clipboard.")),
                () => this.selectCode(codeEl)
              );
            } else {
              this.selectCode(codeEl);
            }
          });
        }
        selectCode(codeEl) {
          if (typeof window.getSelection === "undefined") return;
          const range = document.createRange();
          range.selectNodeContents(codeEl);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          this.announce(Drupal2.t("Reference code selected. Press Control or Command, then C, to copy."));
        }
        /** Opaque, cryptographically-random base32 code with a Crockford check. */
        generateCode() {
          const cryptoObj = window.crypto || window.msCrypto;
          if (!cryptoObj || typeof cryptoObj.getRandomValues !== "function") {
            if (window.console) {
              window.console.warn("[dga-decision-tool] Web Crypto unavailable; no reference code generated.");
            }
            return null;
          }
          const bytes = new Uint8Array(CODE_LENGTH);
          cryptoObj.getRandomValues(bytes);
          let data = "";
          let acc = 0;
          for (let i = 0; i < CODE_LENGTH; i += 1) {
            const value = bytes[i] % 32;
            data += ALPHABET.charAt(value);
            acc = (acc * 32 + value) % 37;
          }
          return `${data.slice(0, 4)}-${data.slice(4, 8)}-${CHECK_ALPHABET.charAt(acc)}`;
        }
        announce(message) {
          if (this.statusEl) this.statusEl.textContent = message;
        }
      }
    })(window.Drupal, window.once);
    (function() {
      if (typeof window.Drupal === "undefined" || typeof window.Drupal.attachBehaviors === "function") {
        return;
      }
      const attach2 = (context) => {
        Object.values(window.Drupal.behaviors).forEach((b) => {
          if (b && typeof b.attach === "function") b.attach(context || document);
        });
      };
      window.Drupal.attachBehaviors = attach2;
      const run = () => attach2(document);
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
      } else {
        run();
      }
      new MutationObserver(run).observe(
        document.body || document.documentElement,
        { childList: true, subtree: true }
      );
    })();
  }
  function init20() {
    (function() {
      function initWrapper(wrapper) {
        var _a;
        if (wrapper.dataset.filterableTableInit) return;
        wrapper.dataset.filterableTableInit = "true";
        const targetId = wrapper.getAttribute("data-table-id");
        if (!targetId) return;
        const target = ((_a = wrapper.parentElement) == null ? void 0 : _a.querySelector(`#${CSS.escape(targetId)}`)) ?? document.getElementById(targetId);
        if (!target) return;
        const targetType = wrapper.getAttribute("data-target-type") || (target.tagName === "DL" ? "list" : "table");
        const themeClass = Array.from(wrapper.classList).find((c) => /^ct-theme-/.test(c));
        if (themeClass) {
          Array.from(target.classList).filter((c) => /^ct-theme-/.test(c)).forEach((c) => target.classList.remove(c));
          target.classList.add(themeClass);
        }
        let allRows;
        let getColValue;
        if (targetType === "list") {
          allRows = Array.from(target.querySelectorAll("[data-filter-row]"));
          getColValue = (row, colIndex) => (row.getAttribute(`data-filter-col-${colIndex}`) || "").trim();
        } else {
          const tbody = target.querySelector("tbody");
          allRows = tbody ? Array.from(tbody.querySelectorAll("tr")) : [];
          getColValue = (row, colIndex) => {
            const cell = row.querySelectorAll("td")[colIndex];
            return cell ? cell.textContent.trim() : "";
          };
        }
        const setRowVisible = (row, visible) => {
          if (targetType === "list") {
            if (visible) row.removeAttribute("hidden");
            else row.setAttribute("hidden", "");
          } else {
            row.style.display = visible ? "" : "none";
          }
        };
        const rowNoun = targetType === "list" ? "items" : "rows";
        const filterInputs = Array.from(wrapper.querySelectorAll("[data-filter-type]"));
        const clearBtn = wrapper.querySelector(".ct-filterable-table__clear-btn");
        const resultsEl = wrapper.querySelector(".ct-filterable-table__results");
        function applyFilters() {
          const activeFilters = filterInputs.map((input) => ({
            colIndex: parseInt(input.getAttribute("data-column-index"), 10),
            type: input.getAttribute("data-filter-type"),
            value: input.value.trim().toLowerCase()
          })).filter((f) => f.value !== "");
          let visibleCount = 0;
          allRows.forEach((row) => {
            const visible = activeFilters.every((filter) => {
              const cellText = getColValue(row, filter.colIndex).toLowerCase();
              if (filter.type === "text") return cellText.indexOf(filter.value) !== -1;
              if (filter.type === "select") return cellText === filter.value;
              return true;
            });
            setRowVisible(row, visible);
            if (visible) visibleCount++;
          });
          if (resultsEl) {
            resultsEl.textContent = activeFilters.length === 0 ? "" : `Showing ${visibleCount} of ${allRows.length} ${rowNoun}`;
          }
          if (clearBtn) {
            if (activeFilters.length > 0) {
              clearBtn.removeAttribute("hidden");
            } else {
              clearBtn.setAttribute("hidden", "");
            }
          }
        }
        filterInputs.forEach((input) => {
          if (input.getAttribute("data-filter-type") !== "select") return;
          const colIndex = parseInt(input.getAttribute("data-column-index"), 10);
          const seen = /* @__PURE__ */ new Set();
          const values = [];
          allRows.forEach((row) => {
            const text = getColValue(row, colIndex);
            if (text && !seen.has(text)) {
              seen.add(text);
              values.push(text);
            }
          });
          values.sort();
          values.forEach((val) => {
            const opt = document.createElement("option");
            opt.value = val;
            opt.textContent = val;
            input.appendChild(opt);
          });
        });
        filterInputs.forEach((input) => {
          input.addEventListener("input", applyFilters);
          input.addEventListener("change", applyFilters);
        });
        if (clearBtn) {
          clearBtn.addEventListener("click", () => {
            filterInputs.forEach((input) => {
              if (input.tagName === "SELECT") {
                input.selectedIndex = 0;
              } else {
                input.value = "";
              }
            });
            applyFilters();
          });
        }
        applyFilters();
      }
      function initAll(context) {
        (context || document).querySelectorAll("[data-dga-filterable-table]").forEach(initWrapper);
      }
      window.DgaFilterableTable = { initAll };
      if (typeof Drupal !== "undefined") {
        Drupal.behaviors.dgaFilterableTable = {
          attach(context) {
            initAll(context);
          }
        };
      } else {
        initAll();
        new MutationObserver(() => initAll()).observe(document.body || document.documentElement, { childList: true, subtree: true });
      }
    })();
  }
  function init21() {
    (function() {
      if (typeof window.Drupal === "undefined") {
        window.Drupal = {
          behaviors: {},
          t: (str, args) => {
            if (!args) return str;
            return String(str).replace(/[@!%][\w-]+/g, (m) => m in args ? String(args[m]) : m);
          }
        };
      }
      if (typeof window.once === "undefined") {
        const marks = /* @__PURE__ */ new WeakMap();
        window.once = function(id, selector, context) {
          const root = context || document;
          const out = [];
          root.querySelectorAll(selector).forEach((el) => {
            const keys = marks.get(el) || /* @__PURE__ */ new Set();
            if (keys.has(id)) return;
            keys.add(id);
            marks.set(el, keys);
            out.push(el);
          });
          return out;
        };
      }
    })();
    (function(Drupal2, once) {
      const GENERATING_MS = 650;
      const TEASER_SPEED_MS = 12;
      const CONTINUATION_SPEED_MS = 14;
      const CHUNK_SIZE = 3;
      const PHASE_STATES = ["generating", "teaser", "streaming", "expanded"];
      function normaliseQuery(query) {
        return (query || "").toLowerCase().trim().replace(/\s+/g, " ").replace(/[?!.]+$/, "").trim();
      }
      function collapseWhitespace(text) {
        return (text || "").trim().replace(/\s+/g, " ");
      }
      function prefersReducedMotion() {
        return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      }
      class Typewriter {
        constructor() {
          this.timer = null;
        }
        stop() {
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
          }
        }
        stream(el, text, speed) {
          this.stop();
          if (prefersReducedMotion()) {
            el.textContent = text;
            return;
          }
          let index = 0;
          el.textContent = "";
          const tick = () => {
            index = Math.min(index + CHUNK_SIZE, text.length);
            el.textContent = text.slice(0, index);
            if (index >= text.length) {
              this.timer = null;
              return;
            }
            const jitter = speed * 0.5;
            this.timer = setTimeout(tick, speed - jitter / 2 + Math.random() * jitter);
          };
          this.timer = setTimeout(tick, speed);
        }
        reveal(el, text) {
          this.stop();
          el.textContent = text;
        }
      }
      class SearchAssistant {
        constructor(el) {
          this.el = el;
          this.threshold = parseFloat(el.getAttribute("data-confidence-threshold")) || 0.6;
          this.form = el.querySelector(".ct-search-bar");
          this.input = this.form ? this.form.querySelector(".ct-search-bar__input") : null;
          this.hint = el.querySelector("[data-dga-search-assistant-hint]");
          this.fallback = el.querySelector("[data-dga-search-assistant-fallback]");
          this.fallbackSummary = el.querySelector("[data-dga-search-assistant-fallback-summary]");
          this.fallbackSummaryTemplate = this.fallbackSummary ? this.fallbackSummary.textContent : "";
          const fallbackStatus = this.fallback ? this.fallback.querySelector(".dga-search-assistant__no-answer") : null;
          this.fallbackText = fallbackStatus ? collapseWhitespace(fallbackStatus.textContent) : "";
          this.generatingTimer = null;
          this.teaserWriter = new Typewriter();
          this.continuationWriter = new Typewriter();
          this.entries = Array.from(el.querySelectorAll("[data-dga-search-assistant-entry]")).map((entryEl) => {
            const teaser = entryEl.querySelector("[data-dga-search-assistant-teaser]");
            const continuationText = entryEl.querySelector("[data-dga-search-assistant-continuation-text]");
            return {
              el: entryEl,
              query: normaliseQuery(entryEl.getAttribute("data-query")),
              owner: entryEl.getAttribute("data-owner") || "full",
              confidence: parseFloat(entryEl.getAttribute("data-confidence")) || 0,
              continuationWorthy: entryEl.getAttribute("data-continuation-worthy") === "true",
              card: entryEl.querySelector("[data-dga-search-assistant-card]"),
              announce: entryEl.querySelector("[data-dga-search-assistant-announce]"),
              teaser,
              teaserText: teaser ? collapseWhitespace(teaser.textContent) : "",
              toggle: entryEl.querySelector("[data-dga-search-assistant-toggle]"),
              toggleLabel: entryEl.querySelector("[data-dga-search-assistant-toggle-label]"),
              continuation: entryEl.querySelector("[data-dga-search-assistant-continuation]"),
              continuationTextEl: continuationText,
              continuationText: continuationText ? collapseWhitespace(continuationText.textContent) : "",
              suppressedMessage: entryEl.querySelector("[data-dga-search-assistant-suppressed]"),
              // Each follow-on prompt is a disclosure: its own toggle, panel and
              // typewriter, so prompts stream independently.
              prompts: Array.from(entryEl.querySelectorAll("[data-dga-search-assistant-prompt]")).map((toggle) => ({
                toggle,
                query: normaliseQuery(toggle.getAttribute("data-prompt-query")),
                panel: entryEl.querySelector(`#${CSS.escape(toggle.getAttribute("aria-controls"))}`),
                writer: new Typewriter()
              }))
            };
          });
          this.init();
        }
        init() {
          if (this.form) {
            this.form.addEventListener("submit", (event) => {
              event.preventDefault();
              this.search(this.input ? this.input.value : "");
            });
          }
          this.entries.forEach((entry) => {
            if (entry.toggle) entry.toggle.addEventListener("click", () => this.onToggle(entry));
            entry.prompts.forEach((prompt) => {
              if (prompt.panel) prompt.toggle.addEventListener("click", () => this.onTogglePrompt(entry, prompt));
            });
          });
          this.el.setAttribute("data-dga-search-assistant", "true");
          this.applyForcedState();
        }
        // Demo affordance: data-force-state / data-force-query jump straight to a
        // state on load, so any state can be shown without typing.
        applyForcedState() {
          const state = this.el.getAttribute("data-force-state");
          const query = this.el.getAttribute("data-force-query") || "";
          if (!state || state === "idle") return;
          if (this.input && query) this.input.value = query;
          if (state === "fallback") {
            this.reset();
            this.showFallback(query || "an unscripted question");
            return;
          }
          if (state === "referral") {
            const entry = this.entries.find((e) => e.owner === "external");
            if (entry) {
              this.reset();
              this.showReferral(entry);
            }
            return;
          }
          if (state === "suppressed") {
            const entry = this.entries.find((e) => e.owner === "none") || this.entries.find((e) => e.confidence < this.threshold);
            if (entry) {
              this.reset();
              this.showSuppressed(entry);
            }
            return;
          }
          if (PHASE_STATES.includes(state)) {
            const entry = query && this.entries.find((e) => e.query === normaliseQuery(query) && this.isAnswerable(e)) || this.entries.find((e) => this.isAnswerable(e) && e.continuationWorthy) || this.entries.find((e) => this.isAnswerable(e));
            if (entry) {
              if (this.input && !query) this.input.value = entry.query;
              this.reset();
              this.showAnswer(entry, state);
            }
          }
        }
        isAnswerable(entry) {
          return (entry.owner === "full" || entry.owner === "partial") && entry.card && entry.confidence >= this.threshold;
        }
        search(raw) {
          this.reset();
          const query = normaliseQuery(raw);
          if (!query) {
            if (this.hint) this.hint.hidden = false;
            return;
          }
          const entry = this.entries.find((e) => e.query === query) || null;
          if (!entry) {
            this.showFallback(raw.trim());
            return;
          }
          if (entry.owner === "external") {
            this.showReferral(entry);
            return;
          }
          if (!this.isAnswerable(entry)) {
            this.showSuppressed(entry);
            return;
          }
          this.showAnswer(entry, null);
        }
        // The streamed elements are not live regions; the full text goes into the
        // card's hidden live region once, when the stream starts, so screen
        // readers hear it whole rather than every partial chunk.
        announce(entry, text) {
          if (entry.announce) entry.announce.textContent = text;
        }
        reset() {
          if (this.generatingTimer) {
            clearTimeout(this.generatingTimer);
            this.generatingTimer = null;
          }
          this.teaserWriter.stop();
          this.continuationWriter.stop();
          if (this.hint) this.hint.hidden = true;
          if (this.fallback) this.fallback.hidden = true;
          this.entries.forEach((entry) => {
            entry.el.hidden = true;
            if (entry.announce) entry.announce.textContent = "";
            if (entry.suppressedMessage) entry.suppressedMessage.hidden = true;
            if (entry.card) {
              entry.card.hidden = false;
              entry.card.removeAttribute("data-phase");
            }
            if (entry.teaser) entry.teaser.textContent = entry.teaserText;
            entry.prompts.forEach((prompt) => this.collapsePrompt(prompt));
            this.collapse(entry);
          });
        }
        collapse(entry) {
          if (!entry.toggle) return;
          entry.toggle.setAttribute("aria-expanded", "false");
          if (entry.toggleLabel) {
            entry.toggleLabel.textContent = entry.toggle.getAttribute("data-show-more-label") || "Show more";
          }
          if (entry.continuation) entry.continuation.hidden = true;
          if (entry.continuationTextEl) entry.continuationTextEl.textContent = entry.continuationText;
        }
        expand(entry, instant) {
          if (!entry.toggle || !entry.continuation) return;
          entry.toggle.setAttribute("aria-expanded", "true");
          if (entry.toggleLabel) {
            entry.toggleLabel.textContent = entry.toggle.getAttribute("data-show-less-label") || "Show less";
          }
          entry.continuation.hidden = false;
          this.announce(entry, entry.continuationText);
          if (instant) {
            this.continuationWriter.reveal(entry.continuationTextEl, entry.continuationText);
          } else {
            this.continuationWriter.stream(entry.continuationTextEl, entry.continuationText, CONTINUATION_SPEED_MS);
          }
        }
        onToggle(entry) {
          if (entry.toggle.getAttribute("aria-expanded") === "true") {
            this.continuationWriter.stop();
            this.collapse(entry);
          } else {
            this.expand(entry, false);
          }
        }
        collapsePrompt(prompt) {
          prompt.writer.stop();
          prompt.toggle.setAttribute("aria-expanded", "false");
          if (prompt.panel) {
            prompt.panel.hidden = true;
            prompt.panel.textContent = "";
          }
        }
        // Expanding a prompt streams the matched scripted answer into its panel.
        // Prompts are curated to answerable queries; anything else gets the
        // fallback status rather than a fabricated answer.
        onTogglePrompt(entry, prompt) {
          if (prompt.toggle.getAttribute("aria-expanded") === "true") {
            this.collapsePrompt(prompt);
            return;
          }
          prompt.toggle.setAttribute("aria-expanded", "true");
          prompt.panel.hidden = false;
          const target = this.entries.find((e) => e.query === prompt.query);
          const text = target && this.isAnswerable(target) && target.teaserText ? target.teaserText : this.fallbackText;
          this.announce(entry, text);
          prompt.writer.stream(prompt.panel, text, TEASER_SPEED_MS);
        }
        showAnswer(entry, forcedPhase) {
          entry.el.hidden = false;
          if (forcedPhase === "generating") {
            entry.card.setAttribute("data-phase", "generating");
            return;
          }
          if (forcedPhase) {
            entry.card.setAttribute("data-phase", forcedPhase);
            this.announce(entry, entry.teaserText);
            this.teaserWriter.reveal(entry.teaser, entry.teaserText);
            if (forcedPhase === "streaming") this.expand(entry, false);
            if (forcedPhase === "expanded") this.expand(entry, true);
            return;
          }
          entry.card.setAttribute("data-phase", "generating");
          this.generatingTimer = setTimeout(() => {
            this.generatingTimer = null;
            entry.card.setAttribute("data-phase", "teaser");
            this.announce(entry, entry.teaserText);
            this.teaserWriter.stream(entry.teaser, entry.teaserText, TEASER_SPEED_MS);
          }, prefersReducedMotion() ? 0 : GENERATING_MS);
        }
        showSuppressed(entry) {
          entry.el.hidden = false;
          if (entry.card) entry.card.hidden = true;
          if (entry.suppressedMessage) entry.suppressedMessage.hidden = false;
        }
        showReferral(entry) {
          entry.el.hidden = false;
        }
        showFallback(query) {
          if (!this.fallback) return;
          this.fallback.hidden = false;
          if (this.fallbackSummary) {
            this.fallbackSummary.textContent = this.fallbackSummaryTemplate.replace("@query", query);
          }
        }
      }
      Drupal2.behaviors.dgaSearchAssistant = {
        attach(context) {
          once("dga-search-assistant", "[data-dga-search-assistant]", context).forEach((el) => new SearchAssistant(el));
        }
      };
    })(window.Drupal, window.once);
    (function() {
      if (typeof window.Drupal === "undefined" || typeof window.Drupal.attachBehaviors === "function") {
        return;
      }
      const attach2 = (context) => {
        Object.values(window.Drupal.behaviors).forEach((b) => {
          if (b && typeof b.attach === "function") b.attach(context || document);
        });
      };
      window.Drupal.attachBehaviors = attach2;
      const run = () => attach2(document);
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
      } else {
        run();
      }
      new MutationObserver(run).observe(
        document.body || document.documentElement,
        { childList: true, subtree: true }
      );
    })();
  }
  function init22() {
    function CivicThemeSlider(el) {
      if (el.getAttribute("data-slider") === "true" || this.el) {
        return;
      }
      this.el = el;
      this.el.setAttribute("data-slider", "true");
      this.panel = this.el.querySelector("[data-slider-panel]");
      this.rail = this.el.querySelector("[data-slider-rail]");
      this.prev = this.el.querySelector("[data-slider-previous]");
      this.next = this.el.querySelector("[data-slider-next]");
      this.slides = this.el.querySelectorAll("[data-slider-slide]");
      this.progressIndicator = this.el.querySelector("[data-slider-progress]");
      this.prev.addEventListener("click", this.previousClick.bind(this));
      this.next.addEventListener("click", this.nextClick.bind(this));
      window.addEventListener("resize", this.refresh.bind(this));
      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(() => this.refresh()).observe(this.panel);
      }
      this.currentSlide = 0;
      this.totalSlides = this.slides.length;
      this.animationTimeout = null;
      this.updateProgress();
      this.addSlideAriaAttributes();
      this.hideAllSlidesExceptCurrent();
      this.refresh();
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          this.refresh();
        });
      });
    }
    CivicThemeSlider.prototype.refresh = function() {
      const panelWidth = window.getComputedStyle(this.panel).width;
      const panelWidthVal = parseFloat(panelWidth);
      this.rail.style.height = "";
      this.panel.style.height = "";
      this.rail.style.width = `${this.totalSlides * panelWidthVal}px`;
      this.slides.forEach((slide) => {
        slide.style.height = null;
        slide.style.width = panelWidth;
      });
      this.slides.forEach((slide) => slide.removeAttribute("data-slider-slide-hidden"));
      let largestHeight = 0;
      this.slides.forEach((slide, idx) => {
        slide.style.left = `${idx * panelWidthVal}px`;
        const slideHeight = slide.offsetHeight;
        if (slideHeight > largestHeight) {
          largestHeight = slideHeight;
        }
      });
      const largestHeightPx = `${largestHeight}px`;
      this.slides.forEach((slide) => {
        slide.style.height = largestHeightPx;
      });
      this.hideAllSlidesExceptCurrent();
      this.rail.style.height = largestHeightPx;
      this.panel.style.height = largestHeightPx;
    };
    CivicThemeSlider.prototype.enableSlideInteraction = function() {
      this.rail.querySelectorAll("a, button").forEach((link) => {
        link.removeAttribute("tabindex");
      });
    };
    CivicThemeSlider.prototype.addSlideAriaAttributes = function() {
      this.slides.forEach((slide, idx) => {
        slide.setAttribute("aria-label", `Slide ${idx + 1} of ${this.totalSlides}`);
      });
    };
    CivicThemeSlider.prototype.disableSlideInteraction = function() {
      this.rail.querySelectorAll("a, button").forEach((link) => {
        link.setAttribute("tabindex", "-1");
      });
    };
    CivicThemeSlider.prototype.hideAllSlidesExceptCurrent = function() {
      this.slides.forEach((slide, idx) => {
        if (idx !== this.currentSlide) {
          slide.setAttribute("data-slider-slide-hidden", "true");
          slide.setAttribute("inert", true);
        } else {
          slide.removeAttribute("data-slider-slide-hidden");
          slide.removeAttribute("inert");
        }
      });
    };
    CivicThemeSlider.prototype.updateDisplaySlide = function() {
      const duration = parseFloat(window.getComputedStyle(this.rail).transitionDuration) * 1e3;
      this.disableSlideInteraction();
      this.slides.forEach((slide) => slide.removeAttribute("data-slider-slide-hidden"));
      clearTimeout(this.animationTimeout);
      this.animationTimeout = setTimeout(() => {
        this.hideAllSlidesExceptCurrent();
        this.enableSlideInteraction();
      }, duration);
    };
    CivicThemeSlider.prototype.previousClick = function() {
      if (this.currentSlide === 0) {
        this.currentSlide = this.totalSlides - 1;
      } else {
        this.currentSlide--;
      }
      this.rail.style.left = `${this.currentSlide * -100}%`;
      this.updateProgress();
      this.updateDisplaySlide();
    };
    CivicThemeSlider.prototype.nextClick = function() {
      if (this.currentSlide === this.totalSlides - 1) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
      this.rail.style.left = `${this.currentSlide * -100}%`;
      this.updateProgress();
      this.updateDisplaySlide();
    };
    CivicThemeSlider.prototype.updateProgress = function() {
      this.progressIndicator.innerHTML = `Slide ${this.currentSlide + 1} of ${this.totalSlides}`;
    };
    function initAll(context) {
      (context || document).querySelectorAll("[data-slider]").forEach((slider) => {
        new CivicThemeSlider(slider);
      });
    }
    if (typeof Drupal !== "undefined") {
      Drupal.behaviors.civicThemeSlider = {
        attach(context) {
          initAll(context);
        }
      };
    } else {
      initAll();
      new MutationObserver(() => initAll()).observe(document.body || document.documentElement, { childList: true, subtree: true });
    }
  }
  function init23() {
    function CivicThemeStepByStepNav(el) {
      if (el.getAttribute("data-step-by-step-nav") === "true" || this.el) {
        return;
      }
      this.el = el;
      this.steps = Array.from(el.querySelectorAll("[data-collapsible]"));
      this.toggleButton = null;
      if (!this.steps.length) {
        return;
      }
      this.injectToggle();
      this.updateToggle();
      const observer = new MutationObserver(this.updateToggle.bind(this));
      this.steps.forEach(function(step) {
        observer.observe(step, { attributes: true, attributeFilter: ["data-collapsible-collapsed"] });
      });
      el.setAttribute("data-step-by-step-nav", "true");
    }
    CivicThemeStepByStepNav.prototype.injectToggle = function() {
      const stepsEl = this.el.querySelector(".ct-step-by-step-nav__steps");
      if (!stepsEl) {
        return;
      }
      const wrapper = document.createElement("div");
      wrapper.className = "ct-step-by-step-nav__toggle";
      const btn = document.createElement("button");
      btn.className = "ct-step-by-step-nav__toggle__button";
      btn.setAttribute("type", "button");
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Show all steps";
      btn.addEventListener("click", this.onToggleAll.bind(this));
      wrapper.appendChild(btn);
      stepsEl.before(wrapper);
      this.toggleButton = btn;
    };
    CivicThemeStepByStepNav.prototype.allExpanded = function() {
      return this.steps.every(function(step) {
        return !step.hasAttribute("data-collapsible-collapsed");
      });
    };
    CivicThemeStepByStepNav.prototype.updateToggle = function() {
      if (!this.toggleButton) {
        return;
      }
      const expanded = this.allExpanded();
      this.toggleButton.textContent = expanded ? "Hide all steps" : "Show all steps";
      this.toggleButton.setAttribute("aria-expanded", String(expanded));
    };
    CivicThemeStepByStepNav.prototype.onToggleAll = function() {
      const expand = !this.allExpanded();
      const eventName = expand ? "ct.collapsible.expand" : "ct.collapsible.collapse";
      this.steps.forEach(function(step) {
        step.dispatchEvent(new CustomEvent(eventName, {
          bubbles: true,
          detail: { animate: true }
        }));
      });
    };
    function initAll(context) {
      (context || document).querySelectorAll("[data-step-by-step-nav]").forEach(function(el) {
        new CivicThemeStepByStepNav(el);
      });
    }
    if (typeof Drupal !== "undefined") {
      Drupal.behaviors.civicThemeStepByStepNav = {
        attach(context) {
          initAll(context);
        }
      };
    } else {
      initAll();
      new MutationObserver(function() {
        initAll();
      }).observe(document.body || document.documentElement, { childList: true, subtree: true });
    }
  }
  function init24() {
    function CivicThemeWebform(el) {
      if (el.getAttribute("data-webform") === "true" || this.el) {
        return;
      }
      this.el = el;
      const fieldErrors = this.el.querySelectorAll(".ct-field-message--error");
      if (fieldErrors.length > 0) {
        const errorMessage = document.querySelector(".ct-message--error");
        if (errorMessage) {
          if (!errorMessage.matches("a")) {
            errorMessage.setAttribute("tabindex", "-1");
          }
          errorMessage.focus();
          errorMessage.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
      this.el.setAttribute("data-webform", "true");
    }
    document.querySelectorAll(".ct-webform").forEach((webform) => {
      new CivicThemeWebform(webform);
    });
  }
  const behaviours = {
    civictheme_collapsible: init0,
    civictheme_flyout: init1,
    civictheme_layout: init2,
    civictheme_platform: init3,
    civictheme_responsive: init4,
    civictheme_scrollspy: init5,
    civictheme_skip_to_target: init6,
    civictheme_button: init7,
    civictheme_chip: init8,
    civictheme_table_sort: init9,
    civictheme_table: init10,
    civictheme_group_filter: init11,
    civictheme_search_form: init12,
    civictheme_single_filter: init13,
    civictheme_table_of_contents: init14,
    civictheme_tabs: init15,
    civictheme_tooltip: init16,
    civictheme_alert: init17,
    civictheme_chart: init18,
    civictheme_decision_tool: init19,
    civictheme_filterable_table: init20,
    civictheme_search_assistant: init21,
    civictheme_slider: init22,
    civictheme_step_by_step_nav: init23,
    civictheme_webform: init24
  };
  function attach() {
    Object.entries(behaviours).forEach(([name, init]) => {
      try {
        init();
      } catch (error) {
        console.error("CivicTheme behaviour " + name + " failed to attach.", error);
      }
    });
  }
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (!window.Popper) {
      window.Popper = Popper$1;
    }
    if (typeof window.Drupal !== "undefined" && window.Drupal.behaviors) {
      Object.entries(behaviours).forEach(([name, init]) => {
        window.Drupal.behaviors[name] = { attach: init };
      });
    } else {
      document.addEventListener("DOMContentLoaded", attach);
      if (document.readyState !== "loading") {
        attach();
      }
    }
  }
  exports.attach = attach;
  exports.behaviours = behaviours;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
})({});
