import { IInput, inputType } from "../interfaces/input";

export class AndroidInput implements IInput {
  render(type: inputType): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add('android_input')
    input.type = type;
    return input;
  }
}
