export function radioValue(name: string): boolean {
  return (
    document.querySelector<HTMLInputElement>(
      `input[name="${name}"]:checked`
    ) !== null
  );
}
