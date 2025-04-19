export default function createNotificationPush(values: Record<string, string>) {
  const container = document.createElement("div");
  container.className = "push-notification";

  const image = document.createElement("img");
  image.className = "push-image";
  image.src = isValidImageUrl(values.imageUrl) ? values.imageUrl : "/image.png";
  image.alt = "Notification Image";

  const content = document.createElement("div");
  content.className = "push-content";

  const title = document.createElement("h4");
  title.className = "push-title";
  title.textContent = values.title || "Notificación";

  const message = document.createElement("p");
  message.className = "push-message";
  message.textContent = values.message || "";

  const priority = document.createElement("small");
  priority.className = "push-priority";
  priority.textContent = values.priority;

  const closeBtn = document.createElement("button");
  closeBtn.className = "push-close";
  closeBtn.textContent = "✕";
  closeBtn.onclick = () => {
    container.classList.add("hide");
    setTimeout(() => container.remove(), 300);
  };

  content.appendChild(title);
  content.appendChild(message);
  content.appendChild(priority);

  container.appendChild(image);
  container.appendChild(content);
  container.appendChild(closeBtn);

  document.body.appendChild(container);

  setTimeout(() => {
    container.classList.add("hide");
    setTimeout(() => container.remove(), 300);
  }, 10000);
}

function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(parsedUrl.pathname);
  } catch {
    return false;
  }
}
