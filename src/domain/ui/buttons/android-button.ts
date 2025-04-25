import { prototypeRegistry } from "../../prototype/prototype-registry";
import { IButton } from "../interfaces/button";

export class AndroidButton implements IButton {
  render(onClick?: () => void): HTMLButtonElement {
    const button = prototypeRegistry
      .get<AndroidButton>("android_button")
      .render();
    if (onClick) {
      button.addEventListener("click", onClick);
    }
    return button;
  }
}
