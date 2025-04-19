export default function createSelectWithLabel(
  labelText: string,
  name: string,
  options: string[]
): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "select-wrapper";

  const label = document.createElement("label");
  label.textContent = labelText;

  const select = document.createElement("select");
  select.name = name;

  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    select.appendChild(option);
  });

  wrapper.appendChild(label);
  wrapper.appendChild(select);
  return wrapper;
}
