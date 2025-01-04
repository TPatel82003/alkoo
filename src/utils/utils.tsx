export function calculateProgress(data: number, totalData: number) {
    return (data / totalData) * 100;
}
export function inverseProgress(data: number, totalData: number) {
    return 100 - calculateProgress(data, totalData);
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
    return latency.reduce((acc, curr) => acc + curr, 0) / latency.length;
}

export function calculateAverageSpeed(
    speed: number[],
    fixBytesSize: number
): number {
    speed = speed.map((s) => fixBytesSize / s);
    console.log(speed);
    return speed.reduce((acc, curr) => acc + curr, 0) / speed.length;
}

export const unpackBinaryData = (data: Blob) =>
    new Promise<number>(async (resolve, reject) => {
        const arrayBuffer = await data.arrayBuffer();
        const dataview = new DataView(arrayBuffer);
        const chunkSize = dataview.byteLength - 8;
        const sendTime = dataview.getFloat64(chunkSize) * 1000;
        resolve(Date.now() - sendTime);
    });

export const packBinaryData = (data: number) => {
    const totalChunkSize = data + 8;
    const buffer = new ArrayBuffer(totalChunkSize);
    const dataview = new DataView(buffer);
    const time = Date.now();
    dataview.setFloat64(data, time, false);
    return dataview;
};
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

export function safeParse<T>(data: string): T | null {
    try {
        return JSON.parse(data) as T;
    } catch (e) {
        return null;
    }
}

export const getFileSize = () => {
    const size = JSON.parse(localStorage.getItem("preference") ?? '{"size":"1"}').size;
    return size;
}