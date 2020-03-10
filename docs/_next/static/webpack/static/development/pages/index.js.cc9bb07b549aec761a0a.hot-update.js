webpackHotUpdate("static/development/pages/index.js",{

/***/ "./lib/quickTypeLib.ts":
/*!*****************************!*\
  !*** ./lib/quickTypeLib.ts ***!
  \*****************************/
/*! exports provided: quicktypeJSON, quickTypeGen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quicktypeJSON", function() { return quicktypeJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quickTypeGen", function() { return quickTypeGen; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var quicktype_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quicktype-core */ "./node_modules/quicktype-core/dist/index.js");
/* harmony import */ var quicktype_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quicktype_core__WEBPACK_IMPORTED_MODULE_1__);


function quicktypeJSON(targetLanguage, typeName, jsonString) {
  var jsonInput, inputData;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function quicktypeJSON$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          jsonInput = Object(quicktype_core__WEBPACK_IMPORTED_MODULE_1__["jsonInputForTargetLanguage"])(targetLanguage); // We could add multiple samples for the same desired
          // type, or many sources for other types. Here we're
          // just making one type from one piece of sample JSON.

          _context.next = 3;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(jsonInput.addSource({
            name: typeName,
            samples: [jsonString]
          }));

        case 3:
          inputData = new quicktype_core__WEBPACK_IMPORTED_MODULE_1__["InputData"]();
          inputData.addInput(jsonInput);
          return _context.abrupt("return", Object(quicktype_core__WEBPACK_IMPORTED_MODULE_1__["quicktype"])({
            inputData: inputData,
            lang: targetLanguage,
            combineClasses: true,
            allPropertiesOptional: false,
            inferEnums: false,
            inferUuids: false,
            inferIntegerStrings: false,
            inferDateTimes: true,
            inferBooleanStrings: false,
            rendererOptions: {
              'array-type': 'list',
              features: 'attributes-only'
            }
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
}
function quickTypeGen(_ref) {
  var prefix, jsonString, result, text, classNameRegex, m, className;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function quickTypeGen$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          prefix = _ref.prefix, jsonString = _ref.jsonString;
          _context2.next = 3;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(quicktypeJSON('csharp', prefix, jsonString));

        case 3:
          result = _context2.sent;
          text = result.lines.join('\n');
          text = text.replace(/JsonProperty\("/g, 'JsonPropertyName("');
          text = text.replace(/public partial class/g, 'public class');
          text = text.replace(/namespace QuickType\s+{/, '');
          text = text.replace(/}\s*$/, '');
          text = text.replace(/using \S+;/g, '');
          text = text.replace(/, NullValueHandling = NullValueHandling.Ignore/g, '');
          text = text.replace(/public (\S+) (\S+) {/g, 'public $1? $2 {');
          text = text.replace(/\?\?/g, '?');
          text = text.replace(/public Uri/g, 'public string');
          classNameRegex = /public class (\S+)/g; // text = text.replace(classNameRegex, `public class ${prefix}$1`);

        case 15:
          if (!((m = classNameRegex.exec(text)) !== null)) {
            _context2.next = 22;
            break;
          }

          // if (m.index === classNameRegex.lastIndex) classNameRegex.lastIndex += 1;
          className = m[1];

          if (!className.startsWith(prefix)) {
            _context2.next = 19;
            break;
          }

          return _context2.abrupt("continue", 15);

        case 19:
          text = text.replace(new RegExp("\\b".concat(className, "\\b"), 'g'), "".concat(prefix).concat(className));
          _context2.next = 15;
          break;

        case 22:
          text = text.trim();
          return _context2.abrupt("return", text);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, null, Promise);
}

/***/ })

})
//# sourceMappingURL=index.js.cc9bb07b549aec761a0a.hot-update.js.map