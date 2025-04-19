export class Constants {
  public static ANDROID = /Android/;
  public static APPLEDEVICE = /iPhone|iPad|iPod|Macintosh/;
  public static WINDOWS = /Windows/;
  public static PLATFORM = window.navigator.userAgent;
  public static BASE_URL = "http://localhost:3000/api/v1";
  public static fieldsMap: Record<string, string[]> = {
    sms: [
      "phoneNumber",
      "message",
      "senderId",
      "deliveryReportRequired",
      "scheduleTime",
    ],
    wpp: [
      "phoneNumber",
      "message",
      "mediaUrl",
      "caption",
      "interactiveButtons",
      "language",
    ],
    email: ["to", "subject", "body", "cc", "bcc", "attachments", "priority"],
    push: [
      "deviceToken",
      "title",
      "message",
      "imageUrl",
      "clickAction",
      "priority",
    ],
  };
}
