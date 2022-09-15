class NotificationView {
  constructor(id, options) {
    this.element = document.getElementById('notification');
    this.iconEl = document.getElementById('icon');
    this.titleEl = document.getElementById('title');
    this.messageEl = document.getElementById('message');
    this.buttonsEl = document.getElementById('buttons');
    this.closeIconEl = document.getElementById('close-icon');
    this.id = id;
    this.options = options;
    this.render();
    this.addEventListener();
  }

  addEventListener() {
    this.element.addEventListener('click', () => {
      window.electron.ipcRenderer.send('notifier.click', this.id);
    }, false);
    this.closeIconEl.addEventListener('click', (e) => {
      // 关闭事件不触发 notifier.click
      e.stopPropagation();
      window.electron.ipcRenderer.send('notifier.close', this.id);
    }, false);
  }

  render() {
    this.titleEl.innerHTML = this.options.title;
    this.iconEl.src = this.options.icon;

    if (this.options.body) {
      this.messageEl.innerHTML = this.options.body;
    } else {
      const parent = this.messageEl.parentElement;
      parent.classList.add('onlyTitle');
      parent.removeChild(this.messageEl);
    }
  }
}
export default NotificationView;
