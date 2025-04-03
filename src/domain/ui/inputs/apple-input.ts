import { IInput, inputType } from "../interfaces/input";

export class AppleInput implements IInput {
  render(type: inputType): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add('apple_input')
    input.type = type;
    return input;
  }
}
