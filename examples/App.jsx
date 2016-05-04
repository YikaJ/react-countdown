import React, {PropType, Component} from 'react'

import CountDown from '../index'
// import CountDown from '../src/CountDown'

class App extends Component {

  handleCountDownEnd() {
    console.log('end')
  }

  render() {
    return (
      <div>
        <h1>CountDown</h1>
        <hr />
        <CountDown expireTime={new Date("2017/5/4 19:25:40")} overText="活动已结束" onEnd={this.handleCountDownEnd}>
          {({d, h, m, s}) => {
            return (<span>还剩{d}天{h}时{m}分{s}秒</span>)
          }}
        </CountDown>
      </div>
    )
  }
}

export default App
