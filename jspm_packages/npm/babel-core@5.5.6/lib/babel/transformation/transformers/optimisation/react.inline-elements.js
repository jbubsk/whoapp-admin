/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.JSXElement = JSXElement;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _helpersReact = require("../../helpers/react");

var react = _interopRequireWildcard(_helpersReact);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  optional: true
};

exports.metadata = metadata;
function hasRefOrSpread(attrs) {
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (t.isJSXSpreadAttribute(attr)) return true;
    if (isJSXAttributeOfName(attr, "ref")) return true;
  }
  return false;
}

function isJSXAttributeOfName(attr, name) {
  return t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name });
}

function JSXElement(node, parent, scope, file) {
  // filter
  var open = node.openingElement;
  if (hasRefOrSpread(open.attributes)) return;

  // init
  var isComponent = true;
  var props = t.objectExpression([]);
  var obj = t.objectExpression([]);
  var key = t.literal(null);
  var type = open.name;

  if (t.isJSXIdentifier(type) && react.isCompatTag(type.name)) {
    type = t.literal(type.name);
    isComponent = false;
  }

  function pushElemProp(key, value) {
    pushProp(obj.properties, t.identifier(key), value);
  }

  function pushProp(objProps, key, value) {
    objProps.push(t.property("init", key, value));
  }

  // metadata
  pushElemProp("type", type);
  pushElemProp("ref", t.literal(null));

  if (node.children.length) {
    pushProp(props.properties, t.identifier("children"), t.arrayExpression(react.buildChildren(node)));
  }

  // props
  for (var i = 0; i < open.attributes.length; i++) {
    var attr = open.attributes[i];
    if (isJSXAttributeOfName(attr, "key")) {
      key = attr.value;
    } else {
      pushProp(props.properties, attr.name, attr.value || t.identifier("true"));
    }
  }

  if (isComponent) {
    props = t.callExpression(file.addHelper("default-props"), [t.memberExpression(type, t.identifier("defaultProps")), props]);
  }

  pushElemProp("props", props);

  // key
  pushElemProp("key", key);

  return obj;
}