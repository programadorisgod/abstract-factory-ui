import { IInput, inputType } from "../interfaces/input";

export class WindowsInput implements IInput {
  render(type: inputType): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add('windows_input')
    input.type = type;
    return input;
  }
}
