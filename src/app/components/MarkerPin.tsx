import SvgIcon from "./SvgIcon";
import { VehicleStatus } from "../utils/enums";

export default function MarkerPin({
  imageName,
  width,
  height,
  status,
}: {
  imageName: string;
  width?: number;
  height?: number;
  status?: string;
}) {
  let borderColor = "red"; // Default color
  switch (status) {
    case VehicleStatus.IDLE:
      borderColor = "gray";
      break;
    case VehicleStatus.MOVING:
      borderColor = "blue";
      break;
    case VehicleStatus.CHARGING:
      borderColor = "yellow";
      break;
  }
  return (
    <div className="flex flex-col items-center gap-0 relative">
      <div
        className={`flex w-10 h-10 items-center justify-center p-1 border-3 border-${borderColor}-600 bg-${borderColor}-100 rounded-full shadow-lg`}
      >
        <SvgIcon
          name={imageName}
          width={width || 24}
          height={height || 24}
          alt="Marker"
        />
      </div>
      <div
        className={`absolute -bottom-2.5 border-x-8 border-x-transparent border-b-transparent border-t-12 border-${borderColor}-600`}
      ></div>
    </div>
  );
}
