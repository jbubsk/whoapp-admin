/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.ReferencedIdentifier = ReferencedIdentifier;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _leven = require("leven");

var _leven2 = _interopRequireDefault(_leven);

var _messages = require("../../../messages");

var messages = _interopRequireWildcard(_messages);

var metadata = {
  optional: true
};

exports.metadata = metadata;

function ReferencedIdentifier(node, parent, scope, file) {
  var binding = scope.getBinding(node.name);
  if (binding && binding.kind === "type" && !this.parentPath.isFlow()) {
    throw this.errorWithNode(messages.get("undeclaredVariableType", node.name), ReferenceError);
  }

  if (scope.hasBinding(node.name)) return;

  // get the closest declaration to offer as a suggestion
  // the variable name may have just been mistyped

  var bindings = scope.getAllBindings();

  var closest;
  var shortest = -1;

  for (var name in bindings) {
    var distance = (0, _leven2["default"])(node.name, name);
    if (distance <= 0 || distance > 3) continue;
    if (distance <= shortest) continue;

    closest = name;
    shortest = distance;
  }

  var msg;
  if (closest) {
    msg = messages.get("undeclaredVariableSuggestion", node.name, closest);
  } else {
    msg = messages.get("undeclaredVariable", node.name);
  }

  //

  throw this.errorWithNode(msg, ReferenceError);
}