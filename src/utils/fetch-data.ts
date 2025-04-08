import { Constants } from "../constants/constants";
import { Failure, ResultResponse, Succes } from "./result";

export type Body = {
  type: string;
  amount: number;
};

export type response = {
  payment: string;
};

export async function fetchProcessPayment(
  params: Body
): Promise<ResultResponse<response, Error>> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${Constants.BASE_URL}/payment-processor`, {
      method: "PUT",
      body: JSON.stringify(params),
      headers,
    });

    if (!response.ok) {
      return Failure<Error>(new Error("Error getting data.."));
    }

    const data: response = await response.json();

    return Succes<response>(data);
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return Failure<Error>(new Error("An  error occurred"));
    }

    return Failure<Error>(new Error("An unknown error occurred"));
  }
}
