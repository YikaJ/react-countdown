import React, {PropType, Component} from 'react'

import Countdown from '../src/Countdown'

class App extends Component {

  handleCountdownEnd() {
    console.log('end')
  }

  render() {
    return (
      <div>
        <h1>Countdown</h1>
        <hr />
        <Countdown endTime={new Date("2017/5/4 19:25:40")} overText="活动已结束" onEnd={this.handleCountdownEnd}>
          {({d, h, m, s}) => {
            return (<span>还剩{d}天{h}时{m}分{s}秒</span>)
          }}
        </Countdown>
      </div>
    )
  }
}

export default App
