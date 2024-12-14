import FitnessDay from "./FitnessDay";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import DndWrapper from "./dnd/DndWrapper";
import Draggable from "./dnd/Draggable";
export default function FitnessDays({
  days,
  addDay,
  control,
  setValue,
  name,
  removeExercise,
}) {
  const handleDragEnd = (newOrder) => {
    // Use the ordered list of `day` items to reset the form state carefully
    const reorderedDays = newOrder.map((item, index) => ({
      ...item,
      dayNumber: index + 1, // Optional if you need to reassign day numbers
    }));

    // Update only the `days` array in the form state without recreating the entire array reference
    setValue("days", reorderedDays, { shouldValidate: true });
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow h-fit">
      <div className="flex items-center justify-between p-2 h-9 border-b border-border  ">
        <h1 className="text-xl font-bold">Workout Days</h1>

        <Plus className=" text-green-500" onClick={addDay} />
      </div>
      <div className="flex">
        <ScrollArea className="w-1 flex-1 overflow-hidden px-2 h-60">
          <DndWrapper items={days} onDragEnd={handleDragEnd}>
            <div className="flex w-max gap-2">
              {days.map((day, index) => (
                <div key={day.id}>
                  <Draggable id={day.id}>
                    <div className="overflow-hidden rounded-md shrink-0">
                      <div className="h-52 mt-4 mr-1 px-2 pb-2 mb-4">
                        <FitnessDay
                          key={day.id}
                          days={days}
                          day={day}
                          name={name}
                          index={index}
                          control={control}
                          setValue={setValue}
                          removeExercise={removeExercise}
                        />
                      </div>
                    </div>
                  </Draggable>
                </div>
              ))}
            </div>
          </DndWrapper>
          <ScrollBar orientation="horizontal" className="w-full" />
        </ScrollArea>
      </div>
    </div>
  );
}
