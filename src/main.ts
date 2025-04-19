import { Constants } from "./constants/constants";
import { GUIFactory } from "./domain/factory/ui-factory";
import { IButton } from "./domain/ui/interfaces/button";
import { IInput } from "./domain/ui/interfaces/input";
import { Body, fetchProcessPayment } from "./utils/fetch-data";
import { sendDataNotification } from "./utils/send-data-notification";
import { Theme, Format } from "./enums/enums";
import createSelectWithLabel from "./utils/createSelectWithLabel";
import createSingleRadio from "./utils/createSingleRadio";
import { radioValue } from "./utils/getElementValue";
import createNotificationPush from "./utils/createNotificationPush";

export class Application {
  private _button: IButton;
  private _amountInput: IInput;
  private _titleInput: IInput;
  private _footerInput: IInput;

  constructor(private factory: GUIFactory) {
    this._button = this.factory.createButton();
    this._amountInput = this.factory.createInput();
    this._titleInput = this.factory.createInput();
    this._footerInput = this.factory.createInput();
  }

  render() {
    const container: HTMLDivElement | null =
      document.querySelector<HTMLDivElement>("#app");

    if (!container) return;

    const amountLabel: HTMLLabelElement = document.createElement("label");
    amountLabel.textContent = "Ingrese el monto";

    const reportLabel: HTMLLabelElement = document.createElement("label");
    reportLabel.textContent = "Configuración de Reporte";

    const amountInput: HTMLInputElement = this._amountInput.render("text");
    amountInput.placeholder = "500.000";

    const titleInput: HTMLInputElement = this._titleInput.render("text");
    titleInput.placeholder = "Título del Reporte";

    const footerInput: HTMLInputElement = this._footerInput.render("text");
    footerInput.placeholder = "Descripcion del Reporte";

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

      if (amountInput.value === "") {
        alert("Por favor ingrese un monto valido");
      }

      const amount = parseFloat(amountInput.value);
      const title = titleInput.value;
      const footerMessage = footerInput.value;
      const includeLogo = radioValue("includeLogo");
      const includePaymentDetails = radioValue("includePaymentDetails");
      const includeUserInfo = radioValue("includeUserInfo");
      const includeTimeStamp = radioValue("includeTimeStamp");
      const theme =
        Theme[
          (document.querySelector('select[name="theme"]') as HTMLSelectElement)
            .value as keyof typeof Theme
        ];
      const format =
        Format[
          (document.querySelector('select[name="format"]') as HTMLSelectElement)
            .value as keyof typeof Format
        ];

      const body: Body = {
        type: select.value,
        amount,
        pdfData: {
          title,
          footerMessage,
          includeLogo,
          includePaymentDetails,
          includeUserInfo,
          includeTimeStamp,
          theme,
          format,
        },
      };
      const modalMessage: HTMLDivElement | null =
        document.querySelector<HTMLDivElement>("#modal-message");
      const modal: HTMLDivElement | null =
        document.querySelector<HTMLDivElement>("#modal");
      const modalNotification: HTMLDivElement | null =
        document.querySelector<HTMLDivElement>("#modal-notification");
      const modalNotificationContent: HTMLDivElement | null =
        document.querySelector<HTMLDivElement>("#modal-notification-content");

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

                modalNotificationContent?.classList.add("active");
                const divNotificationContent: HTMLDivElement | null =
                  document.querySelector<HTMLDivElement>(
                    "#notification-content"
                  );

                divNotificationContent!.innerHTML = "";
                const fields =
                  Constants.fieldsMap[selectNotification?.value!] || [];

                fields.forEach((field) => {
                  const label = document.createElement("label");
                  label.textContent = field;
                  label.htmlFor = field;

                  const input = document.createElement("input");
                  input.type = "text";
                  input.id = field;
                  input.name = field;
                  input.placeholder = field;
                  input.classList.add("notification-input");

                  divNotificationContent!.appendChild(label);
                  divNotificationContent!.appendChild(input);
                  divNotificationContent!.appendChild(
                    document.createElement("br")
                  );
                });

                document
                  .querySelector<HTMLButtonElement>(
                    "#toggle_modal_notification_content"
                  )
                  ?.addEventListener("click", async () => {
                    const inputs = document!.querySelectorAll<HTMLInputElement>(
                      ".notification-input"
                    );
                    const values: Record<string, string> = {};

                    inputs.forEach((input) => {
                      values[input.name] = input.value;
                    });

                    if (
                      Array.from(inputs).some((input) => input.value === "")
                    ) {
                      document
                        .getElementById("modal-notification-content")!
                        .classList.add("active");
                      return;
                    }

                    const response = await sendDataNotification(
                      selectNotification?.value!,
                      values
                    );

                    if (!response.ok) {
                      alert(
                        "Error al enviar la notificación, intenta más tarde"
                      );
                    }

                    if (selectNotification?.value === "push") {
                      createNotificationPush(values);
                      return;
                    }

                    alert("Notificación enviada correctamente");
                  });
              });

            amountInput.value = "";
            titleInput.value = "";
            footerInput.value = "";
            document!
              .querySelectorAll<HTMLInputElement>("input[type=radio]")
              .forEach((radio) => {
                radio.checked = false;
              });
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

    const includeLogoRadio = createSingleRadio("Incluir logo", "includeLogo");
    const includePaymentDetailsRadio = createSingleRadio(
      "Detalles de pago",
      "includePaymentDetails"
    );
    const includeUserInfoRadio = createSingleRadio(
      "Información del usuario",
      "includeUserInfo"
    );
    const includeTimeStampRadio = createSingleRadio(
      "Fecha y hora",
      "includeTimeStamp"
    );

    const themeOptions = Object.keys(Theme).filter((key) => isNaN(Number(key)));
    const formatOptions = Object.keys(Format).filter((key) =>
      isNaN(Number(key))
    );
    const themeSelect = createSelectWithLabel("Tema", "theme", themeOptions);
    const formatSelect = createSelectWithLabel(
      "Formato",
      "format",
      formatOptions
    );

    amountLabel.appendChild(amountInput);
    container.appendChild(amountLabel);
    container.appendChild(reportLabel);
    container.appendChild(titleInput);
    container.appendChild(footerInput);
    container.appendChild(includeLogoRadio);
    container.appendChild(includePaymentDetailsRadio);
    container.appendChild(includeUserInfoRadio);
    container.appendChild(includeTimeStampRadio);
    container.appendChild(themeSelect);
    container.appendChild(formatSelect);
    container.appendChild(buttonElement);
  }
}
