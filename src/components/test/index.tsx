import { useState } from "react";
import {
    calculateAverageLatency,
    calculateAverageSpeed,
    calculateProgress,
    getFileSize,
    inverseProgress,
    packBinaryData,
    SocketStatus,
    unpackBinaryData,
} from "../../utils/utils";
import Circle from "../../utils/circle";
import { MetricsType } from "../metrics/type";
import { Dialogbox } from "../dialog";
import { Metrics } from "../metrics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faCheck, faGear } from "@fortawesome/free-solid-svg-icons";

export function Test() {
    const [percentage, setPercentage] = useState(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<SocketStatus>(SocketStatus.Initialize);
    const [metrics, setMetrics] = useState<MetricsType>({});
    const maxPacketSize = 1048576;
    const totalBytes = 1048576 * getFileSize();
    const handshake = () => new Promise<number>((resolve, reject) => {
        const ws = new WebSocket("ws://localhost:8765");
        let ts = 0;
        ws.onopen = () => {
            ts = performance.now();
            ws.send("PING");
        };
        ws.onerror = (error) => {
            reject(error);
        };
        ws.onmessage = (message) => {
            const { data: msg } = message;
            if (typeof msg === "string") {
                if (msg === "PONG") {
                    resolve(
                        Math.floor(performance.now() - ts)
                    );
                }
            }
        };
    });
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
                        setStatus(SocketStatus.UploadDone);
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
        handshake().then((latency) => {
            setMetrics((prev) => {
                return {
                    ...prev,
                    latency: latency,
                };
            });
            return downloadSpeed();
        }).then((data: number[]) => {
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
            return uploadSpeedTest();
        }).then((data: number[]) => {
            const speed = Math.floor(
                calculateAverageSpeed(data, maxPacketSize) * 0.008
            );
            console.log(totalBytes, maxPacketSize, speed, data);
            const latency = Math.floor(calculateAverageLatency(data));
            setMetrics((prev) => {
                return {
                    ...prev,
                    uploadSpeed: speed,
                    uploadLatency: latency,
                };
            });

        }).catch((error) => { console.log(error); }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className="flex flex-col gap-16 justify-center items-center w-[800px]">
            {status === SocketStatus.Initialize ? (
                <div className="flex gap-6 h-[108px] items-end">
                    <button
                        className="bg-none border-none p-0 cursor-pointer flex gap-2 font-semibold text-[#fff] text-[12px] justify-center items-center"
                        onClick={() => setIsOpen(true)}
                    >
                        <FontAwesomeIcon icon={faGear} color="#9193a8" size="lg"></FontAwesomeIcon>
                        SETTINGS
                    </button>
                    <button
                        className="bg-none border-none p-0 cursor-pointer flex gap-2 font-semibold text-[#fff] text-[12px] justify-center items-center"
                        onClick={() => setIsOpen(true)}
                    >
                        <FontAwesomeIcon icon={faCheck} color="#9193a8" size="lg"></FontAwesomeIcon>
                        RESULTS
                    </button>
                </div>
            ) : (
                <Metrics data={metrics}></Metrics>
            )}
            <button onClick={test} className="bg-none border-none p-0 cursor-pointer">
                <Circle
                    percentage={percentage}
                    classname={status === SocketStatus.Downloading ? "#6afff3" : "#bf71ff"}
                    text={status === SocketStatus.Initialize ? "GO" : status === SocketStatus.Downloading ?
                        (<FontAwesomeIcon icon={faArrowDown} color="#6afff3"></FontAwesomeIcon>) : (<FontAwesomeIcon icon={faArrowUp} color="#bf71ff"></FontAwesomeIcon>)
                    }
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