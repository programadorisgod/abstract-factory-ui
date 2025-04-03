import { IButton } from "../interfaces/button";

export class AppleButton implements IButton {
    render(): HTMLButtonElement {
        const button: HTMLButtonElement  = document.createElement('button');
        button.classList.add('apple_button')
        return button
    }
}