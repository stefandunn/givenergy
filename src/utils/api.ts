import { OutgoingHttpHeaders } from "http";
import { HTTP_METHOD } from "next/dist/server/web/http";
import { Setting, SettingModified } from "~/types/api.types";

export const addAuthTokenToHeaders = (headers: OutgoingHttpHeaders = {}) => ({
  Authorization: `Bearer ${process.env.API_KEY}`,
  Accept: "application/json",
  "Content-Type": "application/json",
  ...headers,
});

export const makeAPIRequest = async <R = any>(
  path: string,
  method: HTTP_METHOD = "GET",
  body: BodyInit | null | undefined = undefined,
  params: Record<string, string> | undefined = undefined,
  additionalHeaders: OutgoingHttpHeaders = {}
): Promise<R> => {
  const url = new URL(`https://api.givenergy.cloud/v1/${path}`);
  for (const param in params) {
    url.searchParams.set(param, params[param]);
  }
  return fetch(url.toString(), {
    method,
    body,
    headers: addAuthTokenToHeaders(additionalHeaders),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((responseJSON) => responseJSON.data);
};

export const getSetting = <T = any>(settingId: string) =>
  makeAPIRequest<Setting>(
    `inverter/${process.env.INVERTER_SERIAL_NO}/settings/${settingId}/read`,
    "POST"
  ).then((response) => response.value as T);

export const setSetting = (
  settingId: string,
  value: any
): Promise<Omit<SettingModified, "value">> =>
  makeAPIRequest<SettingModified>(
    `inverter/${process.env.INVERTER_SERIAL_NO}/settings/${settingId}/write`,
    "POST",
    JSON.stringify({
      value,
    })
  ).then(({ success, message }) => ({
    success,
    message,
  }));
