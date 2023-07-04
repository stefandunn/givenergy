// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { APIResponse, APIRequest } from "~/types/api.types";
import { getSetting, setSetting } from "~/utils/api";

const formatTimeToNumber = (value: any): number | undefined => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value !== "string") {
    return undefined;
  }
  // Unrecognised value
  if (!value.match(/\d+:\d+/)) {
    console.warn(
      `Cannot convert "${value}" to number as its format is unrecognised.`
    );
    return undefined;
  }
  return parseInt(value.replace(":", ""));
};

const handler = async (req: APIRequest, res: APIResponse<any>) => {
  const { key } = req.query;
  if (key !== "867ituybf3gnj09h78g67rubtfigynyyh978tg6ri7bu") {
    return res.status(405).json({ error: "Not allowed to access directly" });
  }
  try {
    const {
      CHARGE_ENABLED_SETTING_ID,
      CHARGE_START_SETTING_ID,
      CHARGE_END_SETTING_ID,
      DISCHARGE_ENABLED_SETTING_ID,
      DISCHARGE_START_SETTING_ID,
      DISCHARGE_END_SETTING_ID,
    } = process.env;
    const chargeEnabled =
      (await getSetting(CHARGE_ENABLED_SETTING_ID)) === true;
    const dischargeEnabled =
      (await getSetting(DISCHARGE_ENABLED_SETTING_ID)) === true;

    if (!chargeEnabled && !dischargeEnabled) {
      return res.status(200).json({
        message:
          "Not required as scheduled charging and discharging is disabled",
      });
    }
    const chargeStartTime = formatTimeToNumber(
      await getSetting<string>(CHARGE_START_SETTING_ID)
    );
    const chargeEndTime = formatTimeToNumber(
      await getSetting<string>(CHARGE_END_SETTING_ID)
    );
    const dischargeStartTime = formatTimeToNumber(
      await getSetting<string>(DISCHARGE_START_SETTING_ID)
    );
    const dischargeEndTime = formatTimeToNumber(
      await getSetting<string>(DISCHARGE_END_SETTING_ID)
    );

    if (
      !chargeStartTime ||
      !chargeEndTime ||
      !dischargeStartTime ||
      !dischargeEndTime
    ) {
      return res.status(500).json({
        message:
          "Invalid formats of time returned from API. Perhaps API response structure has changed.",
      });
    }

    const currentDate = new Date();
    const curTime = parseInt(
      `${currentDate.getHours()}${currentDate.getMinutes()}`
    );
    const isWithinChargeTime =
      chargeEnabled &&
      curTime > chargeStartTime - 1 &&
      curTime < chargeEndTime + 1;
    const isWithinDischargeTime =
      dischargeEnabled &&
      curTime > dischargeStartTime - 1 &&
      curTime < dischargeEndTime + 1;

    const isNotOnScheduledTime = !isWithinChargeTime && !isWithinDischargeTime;

    if (!isNotOnScheduledTime) {
      return res.status(200).json({
        message:
          "Not required as scheduled charging and discharging is occurring, we do nothing",
        chargeEnabled,
        dischargeEnabled,
        chargeStartTime,
        chargeEndTime,
        dischargeStartTime,
        dischargeEndTime,
        isWithinChargeTime,
        isWithinDischargeTime,
        isNotOnScheduledTime,
        curTime,
      });
    }

    const { success, message } = await setSetting(
      process.env.ECO_MODE_SETTING_ID,
      true
    );

    if (!success) {
      return res.status(500).json({
        error: message,
      });
    }

    res.status(200).json({
      message,
      success,
      chargeEnabled,
      dischargeEnabled,
      chargeStartTime,
      chargeEndTime,
      dischargeStartTime,
      dischargeEndTime,
      isWithinChargeTime,
      isWithinDischargeTime,
      isNotOnScheduledTime,
      curTime,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export default handler;
