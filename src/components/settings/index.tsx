import { useState } from "react";
import { SpeedtTestIcon } from "../../assets/Icons";

export function BadgeText({
  icon,
  text,
  customClass,
}: {
  icon: string;
  text: string;
  customClass?: string;
}) {
  
  return (
    <div
      className={`flex gap-2 font-semibold text-[#fff] text-[12px] ${customClass}`}
    >
      <SpeedtTestIcon height={18} width={18} name={icon}></SpeedtTestIcon>
      {text}
     
    </div>
  );
}
