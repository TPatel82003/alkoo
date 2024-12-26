import { useState } from "react";
import {
  calculateAverageLatency,
  calculateProgress,
  SocketStatus,
} from "../../utils/utils";
import Circle from "../../utils/circle";
import { Result } from "./type";

export function Test() {
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState<string>(SocketStatus.Initialize);
  const maxPacketSize = 1024;
  const totalBytes = 1024;
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
      ws.onmessage = (messageEvent) => {
        const { data: msg, timeStamp } = messageEvent;
        if (typeof msg === "string") {
          if (msg === "SEND READY") {
            ws.send("SEND START");
            setStatus(SocketStatus.Downloading);
          } else if (msg === "SEND DONE") {
            setStatus(SocketStatus.DownloadDone);
            resolve(latency);
          }
        } else {
          latency[packet++] = timeStamp;
          const binary = msg as Blob;
          totalReceived += binary.size;
          setPercentage(calculateProgress(totalReceived, totalBytes));
        }
      };
    });
  function test() {
    downloadSpeed()
      .then((data: number[]) => {
        const speed = (104857600 / (data[data.length - 1] - data[0])) * 0.008;
        const result: Result = {
          timestamp: new Date().toLocaleString(),
          latency: calculateAverageLatency(data),
          upload: 0,
          download: speed,
        };
        localStorage.setItem("Results", JSON.stringify([
          ...JSON.parse(localStorage.getItem("Results") || "[]"), 
          result
        ]));
      })
      .catch((error) => {});
  }
  return (
    <button onClick={test} className="bg-none border-none p-0 cursor-pointer">
      <Circle
        percentage={percentage}
        classname={"#1cbfff"}
        text={"GO"}
      ></Circle>
    </button>
  );
}
