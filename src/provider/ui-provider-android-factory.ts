
import { AndroidFactory } from "../domain/factory/android-ui-factory";
import { GUIFactory } from "../domain/factory/ui-factory";
import { UIFactoryProvider } from "./ui-provider-factory";

export class UIAndrodiProvider extends UIFactoryProvider {
    public create(): GUIFactory {
     return new AndroidFactory()
    }
}