import { IButton } from "../ui/interfaces/button"
import { IInput } from "../ui/interfaces/input"

export interface GUIFactory {
     createButton(): IButton
     createInput():IInput
} 