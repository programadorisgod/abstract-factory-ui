import { WindowsButton } from "../ui/buttons/windows-button";
import { WindowsInput } from "../ui/inputs/windows-input";
import { IButton } from "../ui/interfaces/button";
import { IInput } from "../ui/interfaces/input";
import { GUIFactory } from "./ui-factory";

export class WindowsFactory implements GUIFactory {
    createButton(): IButton {
        return new WindowsButton()
    }
    createInput(): IInput {
        return new WindowsInput()
    }

}