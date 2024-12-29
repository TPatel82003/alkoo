import { UserCard } from "../../components/client";
import { Test } from "../../components/test";
export function Home() {
  return (
    <div className="flex flex-col gap-20 justify-center items-center w-[800px]">
      <Test
      ></Test>
      <UserCard></UserCard>
    </div>
  );
}
