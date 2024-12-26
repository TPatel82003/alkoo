import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
export function Dialogbox({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [open, setIsOpen] = useState<boolean>(isOpen);
  const [distance, setDistance] = useState<string>("Kilometer");
  const [speed, setSpeed] = useState<string>("Mbps");
  const [time, setTime] = useState<string>("12-hour");

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);
  const activeUnit = (unit: string) => {
    return `transition-all duration-200 ${
      speed === unit || distance === unit || time === unit
        ? "underline underline-offset-2 text-[#1cbfff]"
        : ""
    }`;
  };
  useEffect(() => {
    const { distance, speed, time } = JSON.parse(
      localStorage.getItem("preference") || "{}"
    );
    setDistance(distance || "Kilometer");
    setSpeed(speed || "Mbps");
    setTime(time || "12-hour");
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "preference",
      JSON.stringify({ distance, speed, time })
    );
  }, [distance, speed, time]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setIsOpen(false);
        onClose();
      }}
      className="relative z-50 transition duration-300 ease-out data-[closed]:opacity-0"
      transition
    >
      <DialogBackdrop className="fixed inset-0 bg-[#373951]/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
        <DialogPanel className="max-w-lg space-y-4 rounded-[5px] bg-[#373951] p-8 text-[#fff]">
          <DialogTitle className="font-semibold text-[18px] text-[#9193a8]">
            Settings
          </DialogTitle>
          <div className="flex justify-between items-center gap-8">
            <div className="flex-col gap-4">
              <div>Distance</div>
              <div className="flex gap-2 font-semibold text-[#9193a8] text-[15px] cursor-pointer">
                <div
                  className={activeUnit("Kilometer")}
                  onClick={() => setDistance("Kilometer")}
                >
                  Kilometer
                </div>
                <div
                  className={activeUnit("Mile")}
                  onClick={() => setDistance("Mile")}
                >
                  Mile
                </div>
              </div>
            </div>
            <div className="flex-col gap-4">
              <div>Speed</div>
              <div className="flex gap-2 font-semibold text-[#9193a8] text-[15px] cursor-pointer">
                <div
                  className={activeUnit("Mbps")}
                  onClick={() => setSpeed("Mbps")}
                >
                  Mbps
                </div>
                <div
                  className={activeUnit("Kbps")}
                  onClick={() => setSpeed("Kbps")}
                >
                  Kbps
                </div>
              </div>
            </div>
            <div className="flex-col gap-4">
              <div>Time</div>
              <div className="flex gap-2 font-semibold text-[#9193a8] text-[15px] cursor-pointer">
                <div
                  className={activeUnit("12-hour")}
                  onClick={() => setTime("12-hour")}
                >
                  12-hour
                </div>
                <div
                  className={activeUnit("24-hour")}
                  onClick={() => setTime("24-hour")}
                >
                  24-hour
                </div>
              </div>
            </div>
          </div>
          <div className="text-[14px] text-[#9193a8] flex items-center">
            <FontAwesomeIcon
              icon={faInfoCircle}
              height={25}
              width={25}
            ></FontAwesomeIcon>
            <p>All user preferences are saved in local storage</p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
