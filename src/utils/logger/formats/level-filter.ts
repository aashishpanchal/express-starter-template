import { Logform, format } from "winston";

export const levelFilter: Logform.FormatWrap = (...levels: string[]) => {
  return format((info) =>
    levels.some((level) => info.level.includes(level)) ? info : false
  )();
};
