import type dayjs from "dayjs";

export default interface Alert {
  type: "error" | "warning";
  message: string;
}
