import { NextApiRequest, NextApiResponse } from "next";

export type APIRequest = NextApiRequest;
export type APIResponse<T> = NextApiResponse<T | { error: string }>;

export type Setting = {
  value: string | number | boolean;
};

export interface SettingModified extends Setting {
  success: boolean;
  message: string;
}
