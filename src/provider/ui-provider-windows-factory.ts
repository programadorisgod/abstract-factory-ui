import { GUIFactory } from "../domain/factory/ui-factory";
import { WindowsFactory } from "../domain/factory/windows-ui-factory";
import { UIFactoryProvider } from "./ui-provider-factory";

export class UIWindowsProvider extends UIFactoryProvider {
    public create(): GUIFactory {
     return new WindowsFactory()
    }

}