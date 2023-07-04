import moment from "moment-timezone";

export const getLondonTime = async (): Promise<number> => {
  return parseInt(moment().tz("Europe/London").format("HHmm"));
};
