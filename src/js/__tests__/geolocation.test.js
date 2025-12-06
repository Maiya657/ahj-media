import { Modal } from "../modal";

test("parse geolocation with space", () => {
  const modal = new Modal(null);
  expect(modal.findCoordinates("51.50851, −0.12572")).toEqual({
    latitude: "51.50851",
    longitude: "−0.12572",
  });
});

test("parse geolocation without space", () => {
  const modal = new Modal(null);
  expect(modal.findCoordinates("51.50851,−0.12572")).toEqual({
    latitude: "51.50851",
    longitude: "−0.12572",
  });
});

test("parse geolocation with space and brackets", () => {
  const modal = new Modal(null);
  expect(modal.findCoordinates("[51.50851, −0.12572]")).toEqual({
    latitude: "51.50851",
    longitude: "−0.12572",
  });
});

test("parse geolocation without space with brackets", () => {
  const modal = new Modal(null);
  expect(modal.findCoordinates("[51.50851,−0.12572]")).toEqual({
    latitude: "51.50851",
    longitude: "−0.12572",
  });
});
