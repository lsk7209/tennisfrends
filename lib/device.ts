export function getDeviceId() {
  if (typeof window === "undefined") return "";
  const k = "tf_device_id";
  let id = localStorage.getItem(k);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(k, id);
  }
  return id!;
}
