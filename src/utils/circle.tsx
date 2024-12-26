import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const Circle = ({
  percentage,
  classname,
  text,
}: {
  percentage: number;
  classname?: string;
  text?: string;
}) => {
  return (
    <div className="h-[180px] w-[180px] text-[40px] text-white font-semibold cursor-pointer">
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={1.8}
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: `${classname}`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "round",
            // Customize transition animation
            transition: "stroke-dashoffset 0.5s ease 0s",
          },
        }}
      >
        {text}
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Circle;
