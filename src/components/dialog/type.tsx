export interface PreferenceType {
  distance: allowedDistance;
  speed: allowedSpeed;
  time: allowedTime;
  size: allowedSize;
}
export type allowedDistance = "Mile" | "Kilometer";
export type allowedSpeed = "Mbps" | "Kbps";
export type allowedTime = "12-hour" | "24-hour";
export type allowedSize = "1" | "10" | "100" | "1000";