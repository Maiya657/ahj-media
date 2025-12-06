import { BoardView } from "./boardView";
import { Modal } from "./modal";

document.addEventListener("DOMContentLoaded", () => {
  const modal = new Modal();
  const boardView = new BoardView(modal);

  boardView.init();
});
