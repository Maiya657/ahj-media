import moment from "moment";

export class Message {
  constructor(modal) {
    this.modal = modal;
    this.date = moment();
    this.geo = { latitude: 0, longitude: 0 };
  }

  async getGeo() {
    try {
      if (!navigator.geolocation) {
        throw new Error('no-geolocation');
      }

      this.geo = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((value) => resolve(value.coords), reject, {
          enableHighAccuracy: true,
          timeout: 5000,
        });
      });

      return;
    } catch (err) {
      console.warn('Geolocation failed:', err.message);

      try {
        this.geo = await this.modal.getCoordinatsFromUser();
        return;
      } catch {
        console.warn('User cancelled manual input');
      }

      this.geo = [0, 0];
    }
  }
}
