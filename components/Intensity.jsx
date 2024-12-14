import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Lightning } from "@phosphor-icons/react";

export default function Intensity({ intensity, setIntensity }) {
  return (
    <ToggleGroup
      type="single"
      value={intensity} // Controlled state for the toggle group
      onValueChange={(value) => setIntensity(value)} // Update intensity when a toggle is selected
    >
      <ToggleGroupItem
        value="moderate"
        aria-label="moderate"
        className={intensity === "moderate" ? "bg-highlight" : ""}
      >
        <Lightning
          className="h-4 w-4"
          weight={intensity === "moderate" ? "fill" : "regular"}
        />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="aggressive"
        aria-label="aggressive"
        className={intensity === "aggressive" ? "bg-highlight" : ""}
      >
        <Lightning
          className="h-4 w-4"
          weight={intensity === "aggressive" ? "fill" : "regular"}
        />
        <Lightning
          className="h-4 w-4"
          weight={intensity === "aggressive" ? "fill" : "regular"}
        />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="extreme"
        aria-label="extreme"
        className={intensity === "extreme" ? "bg-highlight" : ""}
      >
        <Lightning
          className="h-4 w-4"
          weight={intensity === "extreme" ? "fill" : "regular"}
        />
        <Lightning
          className="h-4 w-4"
          weight={intensity === "extreme" ? "fill" : "regular"}
        />
        <Lightning
          className="h-4 w-4"
          weight={intensity === "extreme" ? "fill" : "regular"}
        />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
