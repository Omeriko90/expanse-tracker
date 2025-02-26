import { Dayjs } from "dayjs";
import moment from "moment";

export const convertDayjsToTimestamp = (date: Dayjs) =>
  moment(date.toISOString()).format("YYYY-MM-DD HH:mm:ss");
