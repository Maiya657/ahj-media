import moment from "moment";

export class Message {
  constructor(modal) {
    this.modal = modal;
    this.date = moment();
    this.geo = { latitude: 0, longitude: 0 };
  }

  async getGeo() {
    try {
      this.geo = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (data) => {
              resolve(data.coords);
            },
            (err) => {
              console.warn(`ERROR(${err.code}): ${err.message}`);
              this.modal.getCoordinatsFromUser().then(resolve).catch(reject);
            },
            { enableHighAccuracy: true, timeout: 5000 },
          );
        } else {
          this.modal.getCoordinatsFromUser().then(resolve).catch(reject);
        }
      });
    } catch {
      console.warn(
        "User did not set coordinates. Cordinates has been set to zero value.",
      );
    }
  }
}
