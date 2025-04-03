import { IButton } from "../interfaces/button";

export class AndroidButton implements IButton {
    render(): HTMLButtonElement {
        const button: HTMLButtonElement  = document.createElement('button');
        button.classList.add('android_button')
        return button
    }
}