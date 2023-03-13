class NotificationView {
  constructor(id, options) {
    this.element = document.getElementById('notification');
    this.iconEl = document.getElementById('icon');
    this.titleEl = document.getElementById('title');
    this.messageEl = document.getElementById('message');
    this.buttonsEl = document.getElementById('buttons');
    this.closeIconEl = document.getElementById('close-icon');
    this.audioElement = document.getElementById('beep');
    this.id = id;
    this.options = options;
    this.render();
    this.addEventListener();
    this.playAudio();
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

  playAudio() {
    if (!this.options.silent) {
      this.audioElement.play();
      // this.audioElement.addEventListener("canplaythrough", event => {
      //   /* 音频可以播放；如果权限允许则播放 */
      //   this.audioElement.play();
      // });
    }
  }

  render() {
    this.titleEl.innerHTML = this.options.title;
    if (this.options.icon) {
      this.iconEl.src = this.options.icon;
    } else {
      this.element.classList.add('noIcon');
      this.iconEl.parentElement.removeChild(this.iconEl);
    }

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
