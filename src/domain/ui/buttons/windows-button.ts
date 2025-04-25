import { prototypeRegistry } from "../../prototype/prototype-registry";
import { IButton } from "../interfaces/button";

export class WindowsButton implements IButton {
  render(onClick?: () => void): HTMLButtonElement {
    const button = prototypeRegistry
      .get<WindowsButton>("windows_button")
      .render();
    if (onClick) {
      button.addEventListener("click", onClick);
    }
    return button;
  }
}
