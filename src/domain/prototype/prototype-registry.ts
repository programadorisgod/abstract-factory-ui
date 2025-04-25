import { IPrototype } from "./protoype";

export class prototypeRegistry {
  private static prototypes = new Map<string, IPrototype<unknown>>();

  public static register<T>(name: string, prototype: IPrototype<T>): void {
    this.prototypes.set(name, prototype);
  }

  public static get<T>(name: string): T {
    const p = this.prototypes.get(name)?.clone() as T;
    if (!p) {
      throw new Error(`Prototype ${name} not found`);
    }
    return p;
  }
}
