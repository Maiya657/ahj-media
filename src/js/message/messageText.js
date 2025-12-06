import { Message } from "./message";

export class MessageText extends Message {
  constructor(modal, text) {
    super(modal);
    this.text = text;
  }

  getHTML() {
    const { latitude, longitude } = this.geo;

    return `
      <div class="message-timeline">
        <div class="message-timeline-item"></div>
        <div class="message">
          <div class="message-date">${this.date.format("DD.MM.YY HH:mm")}</div>
          <div class="message-text">${this.text}</div>
          <div class="message-geo">[${latitude}, ${longitude}] <i class="fa-solid fa-eye"></i></div>
        </div>
      </div>
    `;
  }
}
