import { format, Logform } from "winston";

export const logError: Logform.FormatWrap = format((info) => {
  if (info?.level === "error" && info.message instanceof Error) {
    const error = info.message;

    return {
      ...info,
      message: `${error.message as string}${
        error.stack ? `\n${error.stack}` : ""
      }`,
    };
  }

  return info;
});
