import { AppleButton } from "../ui/buttons/apple-button"
import { AppleInput } from "../ui/inputs/apple-input"
import { IButton } from "../ui/interfaces/button"
import { IInput } from "../ui/interfaces/input"
import { GUIFactory } from "./ui-factory"

export class AppleFactory implements GUIFactory {
    createButton(): IButton {
        return new AppleButton()
    }
    createInput(): IInput {
        return new AppleInput()
    }

}