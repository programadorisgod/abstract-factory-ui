export type inputType = "text" | "search" | "url" | "tel" |"email"| "password"| "number";

export interface IInput {
    render(type:inputType):HTMLInputElement;
}