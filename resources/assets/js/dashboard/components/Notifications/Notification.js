export default class Notification {
    constructor(text, type = 'info', icon = 'fa-newspaper-o', time = moment()) {
        this.text = text;
        this.type = type;
        this.icon = icon;
        this.time = time.format();
    }

    setIcon(icon) {
        this.icon = icon;
        return this;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setTime(time) {
        this.time = time;
    }

    warning() {
        this.type = 'warning';
        return this;
    }

    success() {
        this.type = 'success';
        return this;
    }

    info() {
        this.type = 'info';
        return this;
    }

    danger() {
        this.type = 'danger';
        return this;
    }

}
