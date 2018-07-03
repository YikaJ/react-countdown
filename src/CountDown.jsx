import React, {PropTypes, Component} from 'react'

class Countdown extends Component {

  constructor(props) {
    super(props)

    this.state = {
      restTime: this.getRestTime(props.endTime)
    }

    // timeout timer
    this.updateTimer = setTimeout(()=>this.updateRestTime(), 1000)

    // function binding
    this.updateRestTime.bind(this)
  }

  getRestTime(endTime) {
    const restTime =  parseInt((endTime - Date.now())/ 1000)

    return restTime < 0 ? 0 : restTime
  }

  getFormateTime(time) {
    const curryLeftpad = time => leftpad(time, 2, 0)

    const d = curryLeftpad(parseInt(time / (24 * 60 * 60)))
    const h = curryLeftpad(parseInt(time / (60 * 60) % 24))
    const m = curryLeftpad(parseInt(time / 60 % 60))
    const s = curryLeftpad(parseInt(time % 60))

    return {d,h,m,s}
  }

  updateRestTime() {
    const {endTime, onEnd} = this.props
    const newRestTime = this.getRestTime(endTime)

    this.setState({restTime: newRestTime})
    // when Countdown is end
    if(newRestTime <= 0) {
      onEnd()
      return clearTimeout(this.updateTimer)
    }

    this.updateTimer = setTimeout(()=>this.updateRestTime(), 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.updateTimer)
  }

  componentWillReceiveProps(nextProps) {
    const {endTime} = nextProps

    // if parent component update endTime, Countdown will change restTime too
    if(endTime.getTime() !== this.props.endTime.getTime()) {
      const restTime = this.getRestTime(endTime)
      this.setState({restTime})
    }
  }

  render() {
    const {restTime} = this.state
    const {overText, children} = this.props
    const isOver = restTime <= 0

    const date = !isOver && this.getFormateTime(restTime)

    return (
      <h5>
        {isOver ?
           overText :
           children(date)
        }
      </h5>
    )
  }
}

Countdown.defaultProps = {
  overText: 'time out!'
}

Countdown.PropTypes = {
  children: PropTypes.func.isRequired,
  endTime: PropTypes.number.isRequired,
  overText: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  onEnd: PropTypes.func
}

module.exports = Countdown
exports.default = Countdown

/**
 * leftpad 用于填充字符串，递归实现
 * @param  {String} str [需要填充的字符串]
 * @param  {Number} len [填充后的长度]
 * @param  {String} ch  [填充字符，默认为空格]
 * @return {String}     [填充后的文字]
 */
function leftpad(str, len, ch) {
  str = String(str)
  ch = String(ch)

  if(str.length >= len) return str
  if(!ch && ch != 0) ch = ' '

  return leftpad(ch + str, len, ch)
}
