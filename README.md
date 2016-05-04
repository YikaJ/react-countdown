# react-countdown-time
A component for React

这是一个与UI无关的定时器，如何进行展示这取决于你。
react-countdown-time 只负责帮你计算并实时反馈定时器数据。

##获取该组件
```
$ npm install react-countdown-time --save
```

##代码实例：

```jsx
// 部分代码省略
<CountDown endTime={new Date("2016/6/5")} overText="活动已结束" onEnd={this.handleCountDownEnd}>
  {({d, h, m, s}) => {
    return (<span>还剩{d}天{h}时{m}分{s}秒</span>)
  }}
</CountDown>
```

我们可以看出，如何定义倒计时的样式是取决你的，组件仅提供了时间相关数据的回调，这也大大增大了组件的灵活性和应用场景。

##Receive Props

|prop|type|description
|---|---|---|
|endTime|Date|结束时间|
|overText|String|结束时的提示|
|onEnd|Function|结束后的 Callback Hook|
