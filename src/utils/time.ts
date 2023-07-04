import moment from "moment-timezone";

export const getLondonTime = async (): Promise<number> => {
  const dateInfo = await fetch(
    "http://worldtimeapi.org/api/timezone/Europe/London"
  ).then((response) => response.json());
  const time = moment(dateInfo.datetime);
  console.log({ dateInfo });
  return parseInt(moment().tz("Europe/London").format("HHmm"));
};
