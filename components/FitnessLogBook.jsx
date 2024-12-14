import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FitnessLogBook({ workouts }) {
  return (
    <div>
      {workouts &&
        workouts.map((workout) => (
          <div key={workout.id} className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <div className="text-lg font-semibold">
                Day: {workout.day.name}
              </div>
              <div className="text-lg font-semibold">
                {format(new Date(workout.date), "yyyy-MM-dd")}
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              {workout.workoutExercises.map((exercise) => (
                <div key={exercise.id} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">
                      {exercise.exercise.name}
                    </div>
                  </div>
                  <Table>
                    <TableCaption className="sr-only">
                      A list of your recent invoices.
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="">set</TableHead>
                        <TableHead>reps</TableHead>
                        <TableHead>weight</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exercise.workoutSets.map((set) => (
                        <TableRow>
                          <TableCell className="font-medium">
                            {set.setNumber}
                          </TableCell>
                          <TableCell>{set.reps}</TableCell>
                          <TableCell>{set.weight}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
