import moment from "moment";

export const getLondonTime = async (): Promise<number> => {
  const dateInfo = await fetch(
    "http://worldtimeapi.org/api/timezone/Europe/London"
  ).then((response) => response.json());
  const time = moment(dateInfo.datetime);
  return parseInt(time.format("HHMM"));
};