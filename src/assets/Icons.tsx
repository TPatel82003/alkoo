import yes from "../assets/check.png";
import setting from "../assets/setting.png";
export function SpeedtTestIcon({
  name,
  height,
  width,
}: {
  name: String;
  height?: number;
  width?: number;
}) {
  switch (name) {
    case "yes":
      return <img src={yes} height={height} width={width} alt="yes-icon"></img>;

    default:
      return (
        <img
          src={setting}
          height={height}
          width={width}
          alt="setting-icon"
        ></img>
      );
  }
}
