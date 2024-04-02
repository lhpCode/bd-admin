import { getCurrentInstance } from "vue";

export default function () {
  const get = getCurrentInstance();
  if (!get) return;
  const {
    config: { globalProperties },
  } = get.appContext;
  return globalProperties.$t;
}
