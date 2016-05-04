'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilLeftpad = require('./util-leftpad');

var _utilLeftpad2 = _interopRequireDefault(_utilLeftpad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountDown = function (_Component) {
  _inherits(CountDown, _Component);

  function CountDown(props) {
    _classCallCheck(this, CountDown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CountDown).call(this, props));

    var subTime = _this.getNewRestTime(props.expireTime);
    var restTime = subTime < 0 ? 0 : subTime;

    _this.state = {
      restTime: restTime
    };

    _this.updateTimer = setTimeout(function () {
      return _this.updateRestTime();
    }, 1000);

    _this.updateRestTime.bind(_this);
    return _this;
  }

  _createClass(CountDown, [{
    key: 'getNewRestTime',
    value: function getNewRestTime(expireTime) {
      return parseInt((expireTime - Date.now()) / 1000);
    }
  }, {
    key: 'getFormateTime',
    value: function getFormateTime(time) {
      var d = (0, _utilLeftpad2.default)(parseInt(time / (24 * 60 * 60)), 2, 0);
      var h = (0, _utilLeftpad2.default)(parseInt(time / (60 * 60) % 24), 2, 0);
      var m = (0, _utilLeftpad2.default)(parseInt(time / 60 % 60), 2, 0);
      var s = (0, _utilLeftpad2.default)(parseInt(time % 60), 2, 0);

      return { d: d, h: h, m: m, s: s };
    }
  }, {
    key: 'updateRestTime',
    value: function updateRestTime() {
      var _this2 = this;

      var _props = this.props;
      var expireTime = _props.expireTime;
      var onEnd = _props.onEnd;

      var newRestTime = this.getNewRestTime(expireTime);

      this.setState({ restTime: newRestTime });
      // when CountDown is end
      if (newRestTime <= 0) {
        onEnd();
        return clearTimeout(this.updateTimer);
      }

      setTimeout(function () {
        return _this2.updateRestTime();
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.updateTimer);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var expireTime = nextProps.expireTime;

      // if parent component update expireTime, CountDown will change restTime too

      if (expireTime.getTime() !== this.props.expireTime.getTime()) {
        var restTime = this.getNewRestTime(expireTime);
        this.setState({ restTime: restTime });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var restTime = this.state.restTime;
      var _props2 = this.props;
      var overText = _props2.overText;
      var children = _props2.children;

      var isOver = restTime <= 0;

      var date = !isOver && this.getFormateTime(restTime);

      return _react2.default.createElement(
        'h5',
        null,
        isOver ? overText : children(date)
      );
    }
  }]);

  return CountDown;
}(_react.Component);

CountDown.defaultProps = {
  overText: '时间已过期'
};

CountDown.PropTypes = {
  expireTime: _react.PropTypes.number.isRequired,
  overText: _react.PropTypes.oneOf([_react.PropTypes.string, _react.PropTypes.element]),
  children: _react.PropTypes.func.isRequired,
  onEnd: _react.PropTypes.func
};

exports.default = CountDown;
'use strict';

module.exports = require('./CountDown');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = leftPad;
/**
 * leftpad 用于填充字符串，递归实现
 * @param  {String} str [需要填充的字符串]
 * @param  {Number} len [填充后的长度]
 * @param  {String} ch  [填充字符，默认为空格]
 * @return {String}     [填充后的文字]
 */
function leftPad(str, len, ch) {
  str = String(str);
  ch = String(ch);

  if (str.length >= len) return str;
  if (!ch && ch != 0) ch = ' ';

  return leftPad(ch + str, len, ch);
}