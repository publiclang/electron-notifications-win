const Notification = require('../notification')

const { ipcRenderer, remote } = require('electron')

let autoClose = false

ipcRenderer.on('setup', (event, title, options) => {
  new Notification(title, options)
  if (options.autoClose) {
    autoClose = options.autoClose
  }
})

function notify(){
  // 当消息被点击时，发出去一个消息
  ipcRenderer.send('notification-lite-click')
  if (autoClose) {
    remote.getCurrentWindow().close()
  }
}