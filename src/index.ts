import { Application } from "./main";
import { Platform } from "./utils/get-platform";
import "../src/style.css";
import "../src/css/styles.css";

const body = document.querySelector("body") as HTMLBodyElement;

document.addEventListener("DOMContentLoaded", () => {
  const platform = Platform.detectDevice();
  const factory = platform.getUIFactory();
  const app = new Application(factory);
  app.render();
});

// body.addEventListener("click", (_) => {
//   document.querySelector<HTMLAudioElement>("audio")?.play();
// });
