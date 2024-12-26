import { useState } from "react";
import { UserCard } from "../../components/client";
import { BadgeText } from "../../components/settings";
import { Test } from "../../components/test";
import { Dialogbox } from "../../components/dialog";
import { Table } from "../../components/table";
import { Metrics } from "../../components/metrics";
export function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-20 justify-center items-center w-[800px]">
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
      <Test></Test>
      <UserCard></UserCard>
      <Dialogbox
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      ></Dialogbox>
      <Metrics></Metrics>
    </div>
  );
}
