import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-regular-svg-icons";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MetricsType } from "./type";

export function Metrics({ data }: { data: MetricsType }) {
  const {
    latency,
    uploadSpeed,
    downloadSpeed,
    uploadLatency,
    downloadLatency,
  } = data;
  return (
    <div className="flex-col space-y-10">
      <div className="flex gap-8 h-auto">
        <div className="flex-col">
          <div className="flex gap-1 items-center justify-center">
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              color="#6afff3"
              height={20}
              width={20}
            ></FontAwesomeIcon>
            <div className="text-[#fff]">DOWNLOAD</div>
            <div className="text-[#9193a8] text-[12px]">Mbps</div>
          </div>
          <div className="text-[#fff] text-4xl font-light transition-transform duration-500 ease-in-out transform text-right">
            {downloadSpeed}
          </div>
        </div>
        <div className="flex-col">
          <div className="flex gap-1 items-center justify-center">
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              color="#bf71ff"
              height={20}
              width={20}
            ></FontAwesomeIcon>
            <div className="text-[#fff]">UPLOAD</div>
            <div className="text-[#9193a8] text-[12px]">Mbps</div>
          </div>
          <div className="text-[#fff] text-4xl font-light text-right">
            {uploadSpeed}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1 items-baseline">
          <div className="text-[#fff]">Ping</div>
          <div className="text-[#9193a8] text-[12px]">ms</div>
        </div>
        <div className="flex justify-center items-center gap-1">
          <FontAwesomeIcon
            icon={faWaveSquare}
            color="#fff38e"
            height={20}
            width={20}
          ></FontAwesomeIcon>
          <div className="text-[#9193a8]">{latency}</div>
        </div>
        <div className="flex justify-center items-center gap-1">
          <FontAwesomeIcon
            icon={faArrowAltCircleDown}
            color="#bf71ff"
            height={20}
            width={20}
          ></FontAwesomeIcon>
          <div className="text-[#9193a8]">{uploadLatency}</div>
        </div>
        <div className="flex justify-center items-center gap-1">
          <FontAwesomeIcon
            icon={faArrowAltCircleDown}
            color="#6afff3"
            height={20}
            width={20}
          ></FontAwesomeIcon>
          <div className="text-[#9193a8]">{downloadLatency}</div>
        </div>
      </div>
    </div>
  );
}

//
