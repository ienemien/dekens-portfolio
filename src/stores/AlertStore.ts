import type Alert from "@/model/Alert";
import dayjs from "dayjs";
import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alerts: [] as Alert[],
  }),
  actions: {
    addAlert(message: string, type = "error", created?: dayjs.Dayjs) {
      const alert = {
        type,
        message,
        created: created ?? dayjs(),
      } as Alert;
      this.alerts.push(alert);
    },
  },
});
