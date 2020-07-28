// import { Message, MessageBoxs } from 'element-ui'
export default function webSocket (data) {
  var url = `ws://localhost:3000?`
  console.log(url)
  var ws = {}
  if ('WebSocket' in window) {
    ws = new WebSocket(url)
    ws.onopen = function () {
      ws.send(data)
    }
    ws.onmessage = function (e) {
      var msg = e.data
      console.log(msg)
    }
    ws.error = function (e) {
      console.log('连接错误')
    }
  } else {
    // alert('您的浏览器不支持WebSocket,无法进行实时监控')
    this.$message.error('您的浏览器不支持webSocket,无法进行实时监控')
  }
  return ws
}
// mounted() {
//     if ('WebSocket' in window) {
//       this.websocket = new WebSocket('ws://localhost:8080/JavaWebSocket/websocket')
//       this.initWebSocket()
//     } else {
//       alert('当前浏览器 Not support websocket')
//     }
//   },
//   beforeDestroy() {
//     this.onbeforeunload()
//   },
//   methods: {
//     initWebSocket() {
//       //连接错误
//       this.websocket.onerror = this.setErrorMessage

//       // //连接成功
//       this.websocket.onopen = this.setOnopenMessage

//       //收到消息的回调
//       this.websocket.onmessage = this.setOnmessageMessage

//       //连接关闭的回调
//       this.websocket.onclose = this.setOncloseMessage

//       //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
//       window.onbeforeunload = this.onbeforeunload
//     },
//     setErrorMessage() {
//       this.data = "WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState;
//     },
//     setOnopenMessage() {
//       this.data = "WebSocket连接成功" + '   状态码：' + this.websocket.readyState;
//     },
//     setOnmessageMessage(event) {
//       this.data = '服务端返回：' + event.data;
//     },
//     setOncloseMessage() {
//       this.data = "WebSocket连接关闭" + '   状态码：' + this.websocket.readyState;
//     },
//     onbeforeunload() {
//       this.closeWebSocket();
//     },

//     //websocket发送消息
//     send() {
//       this.websocket.send(this.text)
//       this.text = ''
//     },
//     closeWebSocket() {
//       this.websocket.close()
//     }
//   }
