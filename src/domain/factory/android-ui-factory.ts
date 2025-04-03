import { AndroidButton } from "../ui/buttons/android-button"
import { AndroidInput } from "../ui/inputs/android-input"
import { IButton } from "../ui/interfaces/button"
import { IInput } from "../ui/interfaces/input"
import { GUIFactory } from "./ui-factory"

export class AndroidFactory implements GUIFactory {
    createButton(): IButton {
        return new AndroidButton()
    }
    createInput(): IInput {
        return new AndroidInput()
    }

}