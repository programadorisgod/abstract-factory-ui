export default function createSingleRadio(
  labelText: string,
  name: string
): HTMLElement {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  const span = document.createElement("span");

  label.className = "radio-label";
  span.textContent = labelText;

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = name;
  radio.value = "true";

  label.appendChild(radio);
  label.appendChild(span);
  wrapper.appendChild(label);

  return wrapper;
}
