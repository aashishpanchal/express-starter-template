import { Logform, format } from "winston";

/**
 * This will remove the chalk color codes from the message provided.
 * It's used to log plain text in the log file
 */
export const excludeColors: Logform.Format = format.printf(({ message }) => {
  if (typeof message !== "string") {
    return message;
  }

  return message.replace(/\[\d+m/g, "");
});
