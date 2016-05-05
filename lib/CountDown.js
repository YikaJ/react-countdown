'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Countdown = function (_Component) {
  _inherits(Countdown, _Component);

  function Countdown(props) {
    _classCallCheck(this, Countdown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Countdown).call(this, props));

    _this.state = {
      restTime: _this.getRestTime(props.endTime)
    };

    // timeout timer
    _this.updateTimer = setTimeout(function () {
      return _this.updateRestTime();
    }, 1000);

    // function binding
    _this.updateRestTime.bind(_this);
    return _this;
  }

  _createClass(Countdown, [{
    key: 'getRestTime',
    value: function getRestTime(endTime) {
      var restTime = parseInt((endTime - Date.now()) / 1000);

      return restTime < 0 ? 0 : restTime;
    }
  }, {
    key: 'getFormateTime',
    value: function getFormateTime(time) {
      var curryLeftpad = function curryLeftpad(time) {
        return leftpad(time, 2, 0);
      };

      var d = curryLeftpad(parseInt(time / (24 * 60 * 60)));
      var h = curryLeftpad(parseInt(time / (60 * 60) % 24));
      var m = curryLeftpad(parseInt(time / 60 % 60));
      var s = curryLeftpad(parseInt(time % 60));

      return { d: d, h: h, m: m, s: s };
    }
  }, {
    key: 'updateRestTime',
    value: function updateRestTime() {
      var _this2 = this;

      var _props = this.props;
      var endTime = _props.endTime;
      var onEnd = _props.onEnd;

      var newRestTime = this.getRestTime(endTime);

      this.setState({ restTime: newRestTime });
      // when Countdown is end
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
      var endTime = nextProps.endTime;

      // if parent component update endTime, Countdown will change restTime too

      if (endTime.getTime() !== this.props.endTime.getTime()) {
        var restTime = this.getRestTime(endTime);
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

  return Countdown;
}(_react.Component);

Countdown.defaultProps = {
  overText: 'time out!'
};

Countdown.PropTypes = {
  children: _react.PropTypes.func.isRequired,
  endTime: _react.PropTypes.number.isRequired,
  overText: _react.PropTypes.oneOf([_react.PropTypes.string, _react.PropTypes.element]),
  onEnd: _react.PropTypes.func
};

module.exports = Countdown;
exports.default = Countdown;

/**
 * leftpad 用于填充字符串，递归实现
 * @param  {String} str [需要填充的字符串]
 * @param  {Number} len [填充后的长度]
 * @param  {String} ch  [填充字符，默认为空格]
 * @return {String}     [填充后的文字]
 */
function leftpad(str, len, ch) {
  str = String(str);
  ch = String(ch);

  if (str.length >= len) return str;
  if (!ch && ch != 0) ch = ' ';

  return leftpad(ch + str, len, ch);
}
