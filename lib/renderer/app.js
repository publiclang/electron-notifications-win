import NotificationView from './notificationView.js';

// 监听该事件渲染 title和body
window.electron.ipcRenderer.on('notifier.setup', (event, id, options) => {
  new NotificationView(id, options);
});
