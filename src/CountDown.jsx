import React, {PropTypes, Component} from 'react'

class CountDown extends Component {

  constructor(props) {
    super(props)

    const subTime = this.getNewRestTime(props.expireTime)
    const restTime = subTime < 0 ? 0 : subTime

    this.state = {
      restTime
    }

    this.updateTimer = setTimeout(()=>this.updateRestTime(), 1000)

    this.updateRestTime.bind(this)
  }

  getNewRestTime(expireTime) {
    return parseInt((expireTime - Date.now())/ 1000)
  }

  leftPad(str, len, ch) {
    str = String(str)
    ch = String(ch)

    if(str.length >= len) return str
    if(!ch && ch != 0) ch = ' '

    return this.leftPad(ch + str, len, ch)
  }

  getFormateTime(time) {
    const d = this.leftPad(parseInt(time / (24 * 60 * 60)), 2, 0)
    const h = this.leftPad(parseInt(time / (60 * 60) % 24), 2, 0)
    const m = this.leftPad(parseInt(time / 60 % 60), 2, 0)
    const s = this.leftPad(parseInt(time % 60), 2, 0)

    return {d,h,m,s}
  }

  updateRestTime() {
    const {expireTime, onEnd} = this.props
    const newRestTime = this.getNewRestTime(expireTime)

    this.setState({restTime: newRestTime})
    // when CountDown is end
    if(newRestTime <= 0) {
      onEnd()
      return clearInterval(this.updateTimer)
    }

    setTimeout(()=>this.updateRestTime(), 1000)
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

CountDown.defaultProps = {
  overText: '时间已过期'
}

CountDown.PropTypes = {
  expireTime: PropTypes.number.isRequired,
  overText: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  children: PropTypes.func.isRequired,
  onEnd: PropTypes.func
}

export default CountDown
