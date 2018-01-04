const Notification = require('../notification')

const { ipcRenderer } = require('electron')

ipcRenderer.on('setup', (event, title, options) => {
  new Notification(title, options)
})

function notify(){
  // 当消息被点击时，发出去一个消息
  ipcRenderer.send('notification-lite-click')
}