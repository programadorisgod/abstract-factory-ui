import { AppleFactory } from "../domain/factory/apple-ui-factory";
import { GUIFactory } from "../domain/factory/ui-factory";
import { UIFactoryProvider } from "./ui-provider-factory";

export class UIAppleProvider extends UIFactoryProvider {
    public create(): GUIFactory {
     return new AppleFactory()
    }

}