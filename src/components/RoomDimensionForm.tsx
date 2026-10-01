import type { LengthUnit, RoomType } from "../types";
import UnitInput from "./ui/UnitInput";
import FeetInchesInput from "./ui/FeetInchesInput";
import KolViralInput from "./ui/KolViralInput";
import { roomTypes } from "../lib/roomData";
import { useI18n } from "../i18n";

export interface DimensionState {
  unit: LengthUnit;
  value: number;
  feet: number;
  inches: number;
  kol: number;
  viral: number;
}

export const emptyDimension: DimensionState = {
  unit: "feet",
  value: NaN,
  feet: NaN,
  inches: NaN,
  kol: NaN,
  viral: NaN,
};

interface RoomDimensionFormProps {
  roomType: RoomType;
  onRoomTypeChange: (t: RoomType) => void;
  length: DimensionState;
  width: DimensionState;
  height: DimensionState;
  includeHeight: boolean;
  onToggleHeight: (v: boolean) => void;
  onChange: (key: "length" | "width" | "height", dim: DimensionState) => void;
}

function DimensionRow({
  label,
  dim,
  onChange,
}: {
  label: string;
  dim: DimensionState;
  onChange: (dim: DimensionState) => void;
}) {
  if (dim.unit === "feetInches") {
    return (
      <FeetInchesInput
        id={`dim-${label}`}
        label={label}
        value={{ feet: dim.feet, inches: dim.inches }}
        unit={dim.unit}
        onUnitChange={(u) => onChange({ ...dim, unit: u })}
        onChange={(v) => onChange({ ...dim, feet: v.feet, inches: v.inches })}
      />
    );
  }
  if (dim.unit === "kolViral") {
    return (
      <KolViralInput
        id={`dim-${label}`}
        label={label}
        value={{ kol: dim.kol, viral: dim.viral }}
        unit={dim.unit}
        onUnitChange={(u) => onChange({ ...dim, unit: u })}
        onChange={(v) => onChange({ ...dim, kol: v.kol, viral: v.viral })}
      />
    );
  }
  return (
    <UnitInput
      id={`dim-${label}`}
      label={label}
      value={dim.value}
      unit={dim.unit}
      onValueChange={(v) => onChange({ ...dim, value: v })}
      onUnitChange={(u) => onChange({ ...dim, unit: u })}
    />
  );
}

export default function RoomDimensionForm({
  roomType,
  onRoomTypeChange,
  length,
  width,
  height,
  includeHeight,
  onToggleHeight,
  onChange,
}: RoomDimensionFormProps) {
  const { t } = useI18n();
  return (
    <div className="card p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="room-type" className="label-base">
            {t("Room name or type")}
          </label>
          <select
            id="room-type"
            value={roomType}
            onChange={(e) => onRoomTypeChange(e.target.value as RoomType)}
            className="input-base"
          >
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {t(type)}
              </option>
            ))}
          </select>
        </div>

        <DimensionRow label="Length" dim={length} onChange={(d) => onChange("length", d)} />
        <DimensionRow label="Width" dim={width} onChange={(d) => onChange("width", d)} />

        {includeHeight && (
          <div className="sm:col-span-2">
            <DimensionRow
              label="Height (optional)"
              dim={height}
              onChange={(d) => onChange("height", d)}
            />
          </div>
        )}

        <div className="sm:col-span-2 flex items-center gap-2">
          <input
            id="include-height"
            type="checkbox"
            checked={includeHeight}
            onChange={(e) => onToggleHeight(e.target.checked)}
            className="h-4 w-4 rounded border-temple-900/20 text-temple-700 focus:ring-temple-500"
          />
          <label htmlFor="include-height" className="text-sm text-temple-800">
            {t("Include height")}
          </label>
        </div>
      </div>
    </div>
  );
}
