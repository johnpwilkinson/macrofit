import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Filters({
  categoryName,
  options,
  setFilter,
  width,
  value,
}) {
  return (
    <div className="flex flex-col">
      <div className="text-sm">{categoryName}</div>
      <Select onValueChange={(value) => setFilter(value)} value={value}>
        <SelectTrigger className={width}>
          <SelectValue value={value} />
        </SelectTrigger>
        <SelectContent
          viewportClassName="w-[--radix-select-trigger-width]"
          contentClassName=" "
        >
          <SelectGroup className="">
            <SelectLabel className="sr-only">{categoryName}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} className=" ">
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
