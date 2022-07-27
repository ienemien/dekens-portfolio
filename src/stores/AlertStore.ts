import type Alert from "@/model/Alert";
import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alerts: [] as Alert[],
  }),
  actions: {
    addAlert(message: string, type = "error") {
      const newAlert = {
        type,
        message,
      } as Alert;

      const alertAlreadyExists = !!this.alerts.find(
        (alert: Alert) => alert.message === newAlert.message
      );

      if (!alertAlreadyExists) {
        this.alerts.push(newAlert);
      }
    },
    closeAlert(closedAlert: Alert) {
      this.alerts = this.alerts.filter((alert) => alert !== closedAlert);
    },
  },
});
