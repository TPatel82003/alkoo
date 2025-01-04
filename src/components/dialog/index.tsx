import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { allowedDistance, allowedSize, allowedSpeed, allowedTime, PreferenceType } from "./type";

export function Dialogbox({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [open, setIsOpen] = useState<boolean>(isOpen);
    const [preference, setPreference] = useState<PreferenceType>({
        distance: "Mile",
        speed: "Mbps",
        time: "12-hour",
        size: "1"
    });

    const OPTIONS: {
        [key in keyof PreferenceType]: allowedDistance[] | allowedSpeed[] | allowedTime[] | allowedSize[];
    } = {
        distance: ["Mile", "Kilometer"],
        speed: ["Mbps", "Kbps"],
        time: ["12-hour", "24-hour"],
        size: ["1", "10", "100"],
    };

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const preference = localStorage.getItem("preference");
        if (preference) {
            setPreference(JSON.parse(preference));
        }
    }, []);

    const activeUnit = (unit: string) =>
        `transition-all duration-200 ${Object.values(preference).includes(unit) ? "underline underline-offset-2 text-[#1cbfff]" : ""}`;

    const onChange = (key: keyof PreferenceType, value: string) => {
        const newPreference = { ...preference, [key]: value };
        setPreference(newPreference);
        localStorage.setItem("preference", JSON.stringify(newPreference));
    };

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
                    <div className="flex justify-between items-center gap-8 flex-wrap">
                        {Object.entries(OPTIONS).map(([key, options]) => (
                            <div className="flex-col gap-4" key={key}>
                                <div>{key}</div>
                                <div className="flex gap-2 font-semibold text-[#9193a8] text-[15px] cursor-pointer">
                                    {options.map((option) => (
                                        <div
                                            className={activeUnit(option)}
                                            onClick={() => onChange(key as keyof PreferenceType, option)}
                                            key={option}
                                        >
                                            {option} {key === "size" && "Mb"}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-[14px] text-[#9193a8] flex gap-2 items-center">
                        <FontAwesomeIcon icon={faInfoCircle} height={25} />
                        <p>All user preferences are saved in local storage</p>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
