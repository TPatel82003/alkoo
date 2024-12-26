import user from "../../assets/user.png";
import glob from "../../assets/globe.png";
import { useEffect, useState } from "react";
import { GeoLocation } from "./client.type";
import axios from "axios";
export function UserCard() {
  const [clientGeoData, setClientGeoData] = useState<GeoLocation | null>(null);
  useEffect(() => {
    const getGeoData = async () => {
      try {
        const response = await axios.get<GeoLocation>(
          `http://ip-api.com/json/`
        );
        setClientGeoData(response.data);
      } catch (error) {
        console.error("Error fetching IP details:", error);
      }
    };
    getGeoData();
  }, []);
  return (
    clientGeoData && (
      <div className="flex gap-10 justify-center items-center">
        <div className="flex gap-3 text-[#fff] text-[18px] w-[400px] justify-end">
          <div className="flex-col gap-1 justify-end text-end">
            <div>{clientGeoData.isp}</div>
            <div className="text-[#9193A8] text-[15px]">
              {clientGeoData.query}
            </div>
          </div>
          <img
            src={user}
            className="h-[35px] w-[35px] border-2 border-[#9193A8] rounded-full p-[5px] flex justify-center items-center"
            alt="user-icon"
          ></img>
        </div>
        <div className="flex gap-3 text-[#fff] text-[18px] w-[400px] justify-start">
          <img
            src={glob}
            className="h-[35px] w-[35px] border-2 border-[#9193A8] rounded-full p-[6px] flex justify-center items-center"
            alt="glob-icon"
          ></img>
          <div className="flex-col gap-1 justify-end text-start">
            <div>{clientGeoData.country}</div>
            <div className="text-[#9193A8] text-[15px]">
              {clientGeoData.city}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
