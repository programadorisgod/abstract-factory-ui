import { GUIFactory } from "../domain/factory/ui-factory";

export  abstract class UIFactoryProvider {

    private factory!: GUIFactory;

    public getUIFactory ():GUIFactory{
        this.factory = this.create()
        return this.factory
    }

    public abstract create():GUIFactory;
}