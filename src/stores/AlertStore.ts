import type Alert from "@/model/Alert";
import dayjs from "dayjs";
import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alerts: [] as Alert[],
  }),
  actions: {
    addAlert(alert: Alert) {
      alert.created = alert.created ?? dayjs();
      this.alerts.push(alert);
    }
  }
});
