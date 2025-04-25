import { prototypeRegistry } from "../../prototype/prototype-registry";
import { IButton } from "../interfaces/button";
import { WindowsButton } from "./windows-button";

export class AppleButton implements IButton {
  render(onClick?: () => void): HTMLButtonElement {
    const button = prototypeRegistry
      .get<WindowsButton>("apple_button")
      .render();
    if (onClick) {
      button.addEventListener("click", onClick);
    }
    return button;
  }
}
