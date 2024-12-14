import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function ExerciseDetail({ exercise, addExercise }) {
  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-black text-2xl">{exercise.name}</div>

        <div className="">{addExercise}</div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <div>
            <strong>Force:</strong> {exercise.force}
          </div>
          <div>
            <strong>Level:</strong> {exercise.level}
          </div>
          <div>
            <strong>Mechanic:</strong> {exercise.mechanic}
          </div>
          <div>
            <strong>Equipment:</strong> {exercise.equipment}
          </div>
          <div>
            <strong>Primary Muscles:</strong>{" "}
            {exercise.primaryMuscles.join(", ")}
          </div>
          <div>
            <strong>Secondary Muscles:</strong>{" "}
            {exercise.secondaryMuscles.join(", ")}
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex justify-end">
            {" "}
            {/* This takes up 1/3 of the parent container */}
            <Image
              src={`https://ujysvkcngxjuzmlfqyor.supabase.co/storage/v1/object/public/exercise_gifs/${exercise.imageUrls[0]}`}
              width={850}
              height={567}
              alt="Picture of the exercise"
              className="object-contain" // Optional: To maintain aspect ratio
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline text-base pr-4">
              {<strong>Instructions:</strong>}
            </AccordionTrigger>
            <AccordionContent>
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="">
                  {index + 1}. {instruction}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
