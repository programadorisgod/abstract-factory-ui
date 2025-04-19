import { Constants } from "../constants/constants";

export async function sendDataNotification(
  type: string,
  values: Record<string, string>
): Promise<{ ok: boolean; data: object }> {
  try {
    const response = await fetch(
      `${Constants.BASE_URL}/send-notification/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
    console.log(data);
    return { ok: response.ok, data };
  } catch (error) {
    console.log("Error sending notification data:", error);
  }
  return { ok: false, data: { error: "Error sending notification data" } };
}
