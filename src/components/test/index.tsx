import { useState } from "react";
import {
    calculateAverageLatency,
    calculateAverageSpeed,
    calculateProgress,
    inverseProgress,
    packBinaryData,
    SocketStatus,
    unpackBinaryData,
} from "../../utils/utils";
import Circle from "../../utils/circle";
import { MetricsType } from "../metrics/type";
import { Dialogbox } from "../dialog";
import { Metrics } from "../metrics";
import { BadgeText } from "../settings";

export function Test() {
    const [percentage, setPercentage] = useState(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<SocketStatus>(SocketStatus.Initialize);
    const [metrics, setMetrics] = useState<MetricsType>({});
    const maxPacketSize = 1048576;
    const totalBytes = 104857600;
    const downloadSpeed = () =>
        new Promise<number[]>((resolve, reject) => {
            setStatus(SocketStatus.Connecting);
            const ws = new WebSocket("ws://localhost:8765");
            let totalReceived = 0;
            let latency: number[] = new Array(totalBytes / maxPacketSize);
            let packet: number = 0;
            ws.onopen = () => {
                setStatus(SocketStatus.Connected);
                ws.send(`SEND PREP ${totalBytes} ${maxPacketSize}`);
            };
            ws.onerror = (error) => {
                reject(error);
            };
            ws.onmessage = async (messageEvent) => {
                const { data: msg } = messageEvent;
                if (typeof msg === "string") {
                    if (msg === "SEND READY") {
                        ws.send("SEND START");
                        setStatus(SocketStatus.Downloading);
                    } else if (msg === "SEND DONE") {
                        setStatus(SocketStatus.DownloadDone);
                        ws.close();
                        resolve(latency);
                    }
                } else {
                    unpackBinaryData(msg).then((lat) => {
                        latency[packet] = lat;
                        totalReceived += maxPacketSize;
                        setPercentage(calculateProgress(totalReceived, totalBytes));
                        ws.send(`ACK ${packet++}`);
                    });
                }
            };
        });
    const uploadSpeedTest = () =>
        new Promise<number[]>((resolve, reject) => {
            const ws = new WebSocket("ws://localhost:8765");
            console.log(ws);
            const maxPacket = totalBytes / maxPacketSize;
            const latency: number[] = new Array(totalBytes / maxPacketSize);
            ws.onopen = () => {
                console.log("Connected");
                ws.send(`RECV PREP ${totalBytes} ${maxPacketSize}`);
            };
            ws.onerror = (error) => {
                console.log(error);
            };
            ws.onmessage = (message) => {
                const { data: msg } = message;
                if (typeof msg === "string") {
                    if (msg === "RECV READY") {
                        ws.send(packBinaryData(maxPacketSize));
                    } else if (msg === "RECV DONE") {
                        ws.close();
                        resolve(latency);
                    } else if (msg.startsWith("ACK")) {
                        const packet = parseInt(msg.split(" ")[1]);
                        const time = parseInt(msg.split(" ")[2]);
                        latency[packet] = time;
                        if (packet < maxPacket) {
                            setPercentage(inverseProgress(packet + 1, maxPacket));
                            ws.send(packBinaryData(maxPacketSize));
                        }
                    }
                }
            };
        });
    function test() {
        downloadSpeed()
            .then((data: number[]) => {
                const speed = Math.floor(
                    calculateAverageSpeed(data, maxPacketSize) * 0.008
                );
                const latency = Math.floor(calculateAverageLatency(data));

                setMetrics((prev) => {
                    return {
                        ...prev,
                        downloadSpeed: speed,
                        downloadLatency: latency,
                    };
                });
                // localStorage.setItem(
                //     "Results",
                //     JSON.stringify([
                //         ...JSON.parse(localStorage.getItem("Results") || "[]"),
                //         result,
                //     ])
                // );
                return uploadSpeedTest();
            }).then((data: number[]) => {
                const speed = Math.floor(
                    calculateAverageSpeed(data, maxPacketSize) * 0.008
                );
                const latency = Math.floor(calculateAverageLatency(data));
                setMetrics((prev) => {
                    return {
                        ...prev,
                        uploadSpeed: speed,
                        uploadLatency: latency,
                    };
                });

            })
            .catch((error) => { console.log(error); });
    }
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-[800px]">
            {status === SocketStatus.Initialize ? (
                <div className="flex gap-4">
                    <button
                        className="bg-none border-none p-0 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <BadgeText
                            text={"SETTINGS"}
                            icon="settings"
                            customClass="flex w-[400px] justify-end"
                        ></BadgeText>
                    </button>
                    <BadgeText
                        text={"RESULTS"}
                        icon="yes"
                        customClass="flex w-[400px] justify-start"
                    ></BadgeText>
                </div>
            ) : (
                <Metrics data={metrics}></Metrics>
            )}
            <button onClick={test} className="bg-none border-none p-0 cursor-pointer">
                <Circle
                    percentage={percentage}
                    classname={"#1cbfff"}
                    text={"GO"}
                ></Circle>
            </button>
            <Dialogbox
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            ></Dialogbox>
        </div>

    );
}