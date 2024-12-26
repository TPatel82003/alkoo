export function calculateProgress(data: number, totalData: number) {
  return (data / totalData) * 100;
}
export function getStatusColor(status: string) {
  switch (status) {
    case "initialize":
      return "#CCCCCC"; // Light Gray
    case "connecting":
      return "#FFA500"; // Orange
    case "GO":
      return "#28A745"; // Green
    case "disconnected":
      return "#DC3545"; // Red
    default:
      return "#000000"; // Default to black if status is unknown
  }
}

export const getGreenShade = (percentage: number): string => {
  // Define base HSL for green (Hue = 120, Saturation = 60%)
  const hue = 120; // Green
  const saturation = 60; // Saturation remains consistent

  // Lightness decreases as percentage increases (e.g., 90% light at 0%, 30% light at 100%)
  const lightness = 90 - percentage * 0.6; // Adjust lightness range (90% → 30%)

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export function getStatusPercentage(status: string) {
  switch (status) {
    case "initialize":
      return 25; // 0% for Initialize
    case "connecting":
      return 50; // 25% for Connecting
    case "GO":
      return 100; // 100% for Connected
    case "disconnected":
      return 100; // 50% for Disconnected (or choose any relevant percentage)
    default:
      return 0; // Default to 0% if status is unknown
  }
}

export function calculateAverageLatency(latency: number[]): number {
  console.log(latency);
  var lat: number = 0;
  for (let i = 1; i < latency.length; i++) {
    lat += latency[i] - latency[i - 1];
  }
  return lat / latency.length;
}

export enum SocketStatus {
  Initialize = "initialize",
  Connecting = "connecting",
  Connected = "connected",
  Downloading = "downloading",
  Uploading = "uploading",
  DownloadDone = "download done",
  UploadDone = "upload done",
  Disconnected = "disconnected",
}
