import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // You can add default headers here if needed, e.g. Authorization
});

/**
 * Get most-recent-per-id data at or before timestamp (ms).
 * If timestampMs is omitted/undefined, backend will use current time.
 * Returns { fires: [...], drones: [...] }
 */
export async function fetchDataAtTime(timestampMs) {
  const params = {};
  if (timestampMs !== undefined && timestampMs !== null) params.ts = timestampMs;
  const resp = await apiClient.get("data-at-time/", { params });
  return resp.data;
}

/**
 * Get all records between startMs and endMs (inclusive).
 * Both startMs and endMs are required (milliseconds).
 * Returns { fires: [...], drones: [...] }
 */
export async function fetchDataBetween(startMs, endMs) {
  const resp = await apiClient.get("data-between/", {
    params: { start: startMs, end: endMs },
  });
  return resp.data;
}

export async function fetchRecentData() {
  const resp = await apiClient.get("recent-data/");
  return resp.data;
}

export default apiClient;