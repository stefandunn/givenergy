import moment from "moment-timezone";

export const getLondonTime = (): number => {
  return parseInt(moment().tz("Europe/London").format("HHmm"));
};
