import { MessageText } from "./message";

export class BoardView {
  constructor(modal, container = "#root") {
    this.messages = [];
    this.modal = modal;

    if (typeof container === "string") {
      this.container = document.querySelector(container);
    } else {
      this.container = container;
    }
  }

  init() {
    this.render();
  }

  render() {
    this.container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="timeline-container"></div> 
      <div class="input-container">
        <form class="form">
          <textarea name="text"></textarea>
          <button class="send"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
      </div>  
    `,
    );

    this.container
      .querySelector(".form")
      .addEventListener("submit", this.sendMessageText.bind(this));
    this.timelineContainer = this.container.querySelector(
      ".timeline-container",
    );
    this.renderTimeline();
  }

  async sendMessageText(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    const { text } = formObject;
    const message = new MessageText(this.modal, text);

    await message.getGeo();

    this.messages.push(message);
    this.renderTimeline();
    e.target.reset();
  }

  renderTimeline() {
    this.timelineContainer.innerHTML = "";

    this.messages.forEach((message) => {
      this.timelineContainer.insertAdjacentHTML("beforeend", message.getHTML());
    });
  }
}
