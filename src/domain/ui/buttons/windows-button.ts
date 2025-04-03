import { IButton } from "../interfaces/button";

export class WindowsButton implements IButton {
    render(): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.classList.add('windows_button')
        return button
    }

}