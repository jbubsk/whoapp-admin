/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.ThisExpression = ThisExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-pre"
};

exports.metadata = metadata;
var THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassExpression", "ClassDeclaration"];

var Program = {
  enter: function enter(program) {
    var first = program.body[0];

    var directive;
    if (t.isExpressionStatement(first) && t.isLiteral(first.expression, { value: "use strict" })) {
      directive = first;
    } else {
      directive = t.expressionStatement(t.literal("use strict"));
      this.unshiftContainer("body", directive);
      if (first) {
        directive.leadingComments = first.leadingComments;
        first.leadingComments = [];
      }
    }
    directive._blockHoist = Infinity;
  }
};

exports.Program = Program;

function ThisExpression() {
  if (!this.findParent(function (path) {
    return !path.is("shadow") && THIS_BREAK_KEYS.indexOf(path.type) >= 0;
  })) {
    return t.identifier("undefined");
  }
}