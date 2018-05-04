/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Manager = function NotesManager() {
  var notes = [];
  var data = {
    numberOfNotes: 0,
    summary: '',
    detail: ''
  }; // get the inputs from the DOM

  var inputs = _toConsumableArray(document.getElementsByClassName('input')); // add an input event listener to the DOM elements


  inputs.forEach(function (input, index) {
    input.addEventListener('input', function () {
      data[input.name] = input.value;
      console.log(data);
    });
  }); // the Note object, ie, blueprint so to speak.

  function Note(id, summary, detail) {
    this.id = id;
    this.summary = summary;
    this.detail = detail;
  } // Create the events for adding and removing a note.


  var noteAdded = new CustomEvent('note-added');
  var noteRemoved = new CustomEvent('note-removed');

  function addNote() {
    var id = data.numberOfNotes + 1;

    for (var key in data) {
      if (data[key].length < 3) {
        dispatchEvent(new CustomEvent('input-error', {
          detail: key
        }));
        return;
      }
    }

    notes.push(new Note(id, data.summary, data.detail));
    data.numberOfNotes++; // clear the inputs and the data object summary and detail values.

    inputs.forEach(function (input, index) {
      input.value = '';
      data[input.name] = '';
    });
    console.log('NOTES:', notes, 'DATA:', data);
    dispatchEvent(noteAdded);
  }

  function removeNote(id) {
    console.log('TO_DELETE_ID = ' + id);
    var note = notes.find(function (note) {
      return note.id === id;
    });
    console.log('NOTE_TO_BE_DELETED ', note);
    note != undefined ? notes.splice(notes.indexOf(note), 1) : null;
    console.log('REMAINING_NOTES ', notes);
    dispatchEvent(noteRemoved);
  }

  var publicAPI = {
    addNote: addNote,
    removeNote: removeNote,
    notes: notes
  };
  return publicAPI;
}();

window.Manager = Manager;
/* harmony default export */ __webpack_exports__["default"] = (Manager);

/***/ }),

/***/ "./resources/js/dom.js":
/*!*****************************!*\
  !*** ./resources/js/dom.js ***!
  \*****************************/
/*! exports provided: AvailableNotes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvailableNotes", function() { return AvailableNotes; });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ "./resources/js/app.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var AvailableNotes =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(AvailableNotes, _HTMLElement);

  function AvailableNotes() {
    var _this;

    _classCallCheck(this, AvailableNotes);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AvailableNotes).call(this)); // First time, call the render method. The notes will be = []
    // but that fine, we call it still

    _this.render(_app_js__WEBPACK_IMPORTED_MODULE_0__["default"].notes); // This method listens for the note-added and note-removed events
    // and re-renders the DOM [Notes only] correclty according to the notes array.


    _this.handler = function () {
      console.log('A_DOM_EVENT_WAS_FIRED');
      var data = _app_js__WEBPACK_IMPORTED_MODULE_0__["default"].notes;

      _this.render(data);
    };

    window.addEventListener('note-added', _this.handler);
    window.addEventListener('note-removed', _this.handler);
    window.addEventListener('input-error', function (event) {
      return _this.wrongInputAlerter(event);
    });
    return _this;
  }

  _createClass(AvailableNotes, [{
    key: "render",
    value: function render(data) {
      var _this2 = this;

      var existingNoteDetails = document.getElementsByClassName('note-details');
      var existingNoteSummary = document.getElementsByClassName('note-summary');

      while (existingNoteDetails[0] || existingNoteSummary[0]) {
        existingNoteDetails[0].parentNode.removeChild(existingNoteDetails[0]);
        existingNoteSummary[0].parentNode.removeChild(existingNoteSummary[0]);
      }

      if (document.getElementsByClassName('note-wrapper').length < 1) {
        var noteWrapper = document.createElement('div');
        noteWrapper.className = 'note-wrapper';
      } else {
        noteWrapper = document.getElementsByClassName('note-wrapper')[0];
      }

      data.forEach(function (datum, index) {
        var noteSummary = document.createElement('div');
        var noteDetails = document.createElement('div');
        noteDetails.className = 'note-details';
        noteSummary.className = 'note-summary';
        noteSummary.innerHTML = "<span>".concat(datum.summary, "</span> <button class=\"remove-note-btn\" value=").concat(datum.id, " onclick=\"Manager.removeNote(").concat(datum.id, ")\">Remove note</button>");
        noteDetails.innerText = datum.detail;
        noteWrapper.appendChild(noteSummary);
        noteWrapper.appendChild(noteDetails);

        _this2.appendChild(noteWrapper);
      });
    }
  }, {
    key: "wrongInputAlerter",
    value: function wrongInputAlerter(e) {
      // remove the error div if its already there
      if (document.getElementsByClassName('input-error').length > 0) {
        document.getElementsByClassName('input-error')[0].remove();
      }

      var inputSection = document.getElementsByClassName('input-container');
      var errorDiv = document.createElement('div');
      errorDiv.className = 'input-error';
      errorDiv.innerHTML = "<h2>The ".concat(e.detail, " cannot be less than 3 characters</h2>");
      inputSection[0].appendChild(errorDiv);
      setTimeout(function () {
        errorDiv.remove();
      }, 5000);
    }
  }]);

  return AvailableNotes;
}(_wrapNativeSuper(HTMLElement));
window.AvailableNotes = AvailableNotes;
customElements.define('available-notes', AvailableNotes);

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/dom.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/nabaasarichard/Desktop/Pieces/js/notesmanager/resources/js/dom.js */"./resources/js/dom.js");
module.exports = __webpack_require__(/*! /Users/nabaasarichard/Desktop/Pieces/js/notesmanager/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });