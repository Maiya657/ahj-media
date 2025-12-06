export class Modal {
  constructor(container = "#root") {
    if (typeof container === "string") {
      this.container = document.querySelector(container);
    } else {
      this.container = container;
    }
  }

  async getCoordinatsFromUser() {
    return this.renderModal();
  }

  async renderModal() {
    return new Promise((resolve, reject) => {
      this.container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="modal-overlay">
          <div class="modal">
            <div class="modal-header"></div>
            <form class="modal-form">
              <div class="modal-body">
                <h2 class="modal-title">Что-то пошло не так</h2>
                <p class="text">К сожалению, нам не удалось определить ваше местоположение, пожалуйста, 
                дайте разрешение на использование геолокации, либо введите координаты вручную.</p>
                <div class="text-field">
                  <label for="modal-coordinates">Широта и долгота через запятую</label>
                  <input name="coordinates" type="text" id="modal-coordinates"></input>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-cancel">Отмена</button>
                <button class="btn btn-submit" type="submit">Ок</button>
              </div>
            </form>
          </div>
        </div>
      `,
      );

      this.container
        .querySelector(".btn-cancel")
        .addEventListener(
          "click",
          this.cancelBtnEvent(resolve, reject).bind(this),
        );
      this.container
        .querySelector(".modal-form")
        .addEventListener(
          "submit",
          this.submitForm(resolve, reject).bind(this),
        );
    });
  }

  cancelBtnEvent(resolve, reject) {
    return (e) => {
      e.preventDefault();
      this.closeModal(resolve, reject);
    };
  }

  closeModal(resolve, reject) {
    this.container
      .querySelector(".btn-cancel")
      .removeEventListener(
        "click",
        this.cancelBtnEvent(resolve, reject).bind(this),
      );
    this.container
      .querySelector(".modal-form")
      .removeEventListener(
        "submit",
        this.submitForm(resolve, reject).bind(this),
      );
    this.container.querySelector(".modal-overlay").remove();
    reject();
  }

  submitForm(resolve, reject) {
    return (e) => {
      e.preventDefault();
      const { coordinates } = Object.fromEntries(
        new FormData(e.target, e.submitter).entries(),
      );
      const coordinatesObj = this.findCoordinates(coordinates);
      resolve(coordinatesObj);
      this.closeModal(resolve, reject);
    };
  }

  findCoordinates(coordinates) {
    const [latitude, longitude] = coordinates
      .replace(/ /g, "")
      .replace(/^\[+|\]+$/g, "")
      .split(",", 2);
    return { latitude, longitude };
  }
}
