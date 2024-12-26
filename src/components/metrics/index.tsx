import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-regular-svg-icons";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Metrics({
  latency = "-",
  uploadSpeed = "-",
  downloadSpeed = "-",
  uploadLatency = "-",
  downloadLatency = "-",
}: {
  latency?: number | string;
  uploadSpeed?: number | string;
  downloadSpeed?: number | string;
  uploadLatency?: number | string;
  downloadLatency?: number | string;
}) {
  return (
    <div className="flex-col space-y-3">
      <div className="flex gap-8 justify-center items-center">
        <div className="flex gap-2">
          <FontAwesomeIcon
            icon={faArrowAltCircleDown}
            color="#6afff3"
            height={20}
            width={20}
          ></FontAwesomeIcon>
          <div className="flex-col">
            <div className="flex gap-1 justify-center items-center">
              <div className="text-[#fff]">DOWNLOAD</div>
              <div className="text-[#9193a8]">Mbps</div>
            </div>
            <div className="text-[#fff] text-4xl font-light">
              {downloadSpeed}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <FontAwesomeIcon
            icon={faArrowAltCircleUp}
            color="#bf71ff"
            height={20}
            width={20}
          ></FontAwesomeIcon>
          <div className="flex-col">
            <div className="flex gap-1 justify-center items-center">
              <div className="text-[#fff]">UPLOAD</div>
              <div className="text-[#9193a8]">Mbps</div>
            </div>
            <div className="text-[#fff] text-4xl font-light">{uploadSpeed}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="flex gap-1">
          <div className="text-[#fff]">Ping</div>
          <div className="text-[#9193a8]">ms</div>
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
