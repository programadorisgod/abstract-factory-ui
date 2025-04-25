import { IButton } from "../ui/interfaces/button";
import { IPrototype } from "./protoype";

export class BaseButton implements IButton, IPrototype<IButton> {
  private baseElement: HTMLButtonElement;
  private className: string;
  private text: string;

  constructor(className: string, text: string) {
    this.className = className;
    this.text = text;
    const button = document.createElement("button");
    console.log(className);
    button.textContent = text;
    this.baseElement = button;
  }

  clone(): IButton {
    const clonedButton = this.baseElement.cloneNode(true) as HTMLButtonElement;
    const button = new BaseButton(this.className, this.text);
    button.setButton(clonedButton);
    return button;
  }

  private setButton(button: HTMLButtonElement) {
    this.baseElement = button;
  }

  render(): HTMLButtonElement {
    return this.baseElement.cloneNode(true) as HTMLButtonElement;
  }
}
