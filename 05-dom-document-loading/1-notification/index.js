   function createDivElement(className, message = '') {
    const element = document.createElement("div");
    element.classList = className;
    element.textContent = message;

    return element;
  }

export default class NotificationMessage {
    currentNotification = null;

    constructor( message = "",{ duration = 2000, type = 'success'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.element = createDivElement('notification');

    this.element.classList.add(this.type);

    const timer = createDivElement('timer');
    this.element.append(timer);

    const innerWrapper = createDivElement('inner-wrapper');

    const notificationHeader = createDivElement('notification-header', this.type);
    innerWrapper.append(notificationHeader);

    const notificationBody = createDivElement('notification-body', this.message);
    innerWrapper.append(notificationBody);

    this.element.append(innerWrapper);
  }

  show( targetElement = document.body) {
    if (NotificationMessage.currentNotification) {
      NotificationMessage.currentNotification.destroy();
    }
    NotificationMessage.currentNotification = this;

    targetElement.append(this.element);
    this.timerId = setTimeout(this.destroy.bind(this), this.duration);
  }

  destroy() {
    if (NotificationMessage.currentNotification === this) {
      NotificationMessage.currentNotification = null;
    }
    this.remove();
    clearTimeout(this.timerId);
  }

  remove() {
    this.element.remove();
  }
}

