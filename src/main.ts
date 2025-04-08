import { Constants } from "./constants/constants";
import { GUIFactory } from "./domain/factory/ui-factory";
import { IButton } from "./domain/ui/interfaces/button";
import { IInput } from "./domain/ui/interfaces/input";
import { Body, fetchProcessPayment } from "./utils/fetch-data";

export class Application {
  private _button: IButton;
  private _input: IInput;

  constructor(private factory: GUIFactory) {
    this._button = this.factory.createButton();
    this._input = this.factory.createInput();
  }

  render() {
    const container: HTMLDivElement | null =
      document.querySelector<HTMLDivElement>("#app");

    if (!container) return;

    const label: HTMLLabelElement = document.createElement("label");
    label.textContent = "Ingrese el monto";

    const inputElement: HTMLInputElement = this._input.render("text");
    inputElement.placeholder = "500.000";

    const buttonElement: HTMLButtonElement = this._button.render();
    buttonElement.textContent = "Pagar";

    buttonElement.addEventListener("click", () => {
      const form: HTMLFormElement | null =
        container.querySelector<HTMLFormElement>("#form");

      if (!form) {
        return;
      }

      const select: HTMLSelectElement | null =
        form.querySelector<HTMLSelectElement>("select");

      if (!select) {
        return;
      }

      if (inputElement.value === "") {
        alert("Por favor ingrese un monto valido");
      }

      const amount = parseFloat(inputElement.value);

      const body: Body = {
        amount,
        type: select.value,
      };
      const modalMessage: HTMLDivElement | null =
        document.querySelector<HTMLDivElement>("#modal-message");
      const modal: HTMLDivElement | null =
        document.querySelector<HTMLDivElement>("#modal");
      const modalNotification: HTMLDivElement | null =
        document.querySelector<HTMLDivElement>("#modal-notification");

      const toggleModal: HTMLButtonElement | null =
        modal!.querySelector<HTMLButtonElement>("#toggle_modal");

      if (!toggleModal) return;

      toggleModal.className = buttonElement.className;

      fetchProcessPayment(body)
        .then((result) => {
          if (result.success && modalMessage && modal) {
            modalMessage.textContent = `Pago exitoso con ${result.value?.payment}`;
            modal.classList.add("active");

            modalNotification?.classList.add("active");

            document
              .querySelector<HTMLButtonElement>("#toggle_modal_notification")
              ?.addEventListener("click", async () => {
                const selectNotification: HTMLSelectElement | null =
                  document.querySelector<HTMLSelectElement>(
                    "#select-notification"
                  );

                try {
                  const response = await fetch(
                    `${Constants.BASE_URL}/send-notification/` +
                      selectNotification?.value,
                    {
                      method: "GET",
                    }
                  );

                  if (!response.ok) {
                    alert("Error al enviar la notificación");
                    return;
                  }

                  alert("Revisa tu dispositivo para ver la notificación");
                } catch (error) {
                  console.error(error);
                }
              });

            inputElement.value = "";
          }
        })
        .catch((err) => {
          console.log(err);
          if (modalMessage && modal) {
            modalMessage.textContent = `Error en el pago, intenta más tarde`;
            modal.classList.add("active");
          }
        });
    });

    label.appendChild(inputElement);
    container.appendChild(label);
    container.appendChild(buttonElement);
  }
}
