import { color } from "framer-motion";

export const nutritionTableHeaders = [
  { keyName: "active", displayName: "Active" },
  { keyName: "name", displayName: "Name" },

  { keyName: "dateStarted", displayName: "Date Started" },
  { keyName: "dateEnded", displayName: "Date Ended" },
  { keyName: "details", displayName: "Details" },
];

export const fitnessTableHeaders = [
  { keyName: "active", displayName: "Active" },
  { keyName: "name", displayName: "Name" },
  { keyName: "daysPerWeek", displayName: "Days / Week" },
  { keyName: "dateStarted", displayName: "Date Started" },
  { keyName: "dateEnded", displayName: "Date Ended" },
  { keyName: "details", displayName: "Details" },
];

export const nutritionCaloriesBarChartConfig = {
  val: {
    label: "Calories",
  },
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-1))",
  },
  fat: {
    label: "Fat",
    color: "hsl(var(--chart-2))",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(var(--chart-3))",
  },
  totalCalories: {
    label: "Total Calories",
    color: "hsl(var(--chart-4))",
  },
};
export const nutritionMacroPieChartConfig = {
  percent: {
    label: "Percent",
  },
  protein: {
    label: "Protien",
    color: "hsl(var(--chart-1))",
  },
  fat: {
    label: "Fat",
    color: "hsl(var(--chart-2))",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(var(--chart-3))",
  },
};

export const muscleEngagementBarChartConfig = {
  primary: {
    label: "Primary Muscles",
    color: "hsl(var(--chart-3))", // Use your desired color for primary muscles
  },
  secondary: {
    label: "Secondary Muscles",
    color: "hsl(var(--chart-4))", // Use your desired color for secondary muscles
  },
  force: {
    label: "Force Type",
  },
};

export const muscleEngagementRadarChartConfig = {
  count: {
    label: "cvcvcvcvccv",
    color: "hsl(var(--chart-1))",
  },
  Core: {
    label: "Core",
  },
  Legs: {
    label: "Legs",
  },
  Arms: {
    label: "Arms",
  },
  Chest: {
    label: "Chest",
  },
  Shoulders: {
    label: "Shoulders",
  },
  Back: {
    label: "Back",
  },
  Neck: {
    label: "Neck",
  },
};
export const largeMuscleEngagementRadarChartConfig = {
  title: {
    label: "cvcvcvcvccv",
    color: "hsl(var(--chart-1))",
  },
  Upper: {
    label: "Upper Body",
    color: "hsl(var(--chart-3))",
  },
  Lower: {
    label: "Lower Body",
    color: "hsl(var(--chart-4))",
  },
};
export const muscleEngagementChartConfig = {
  force: {
    label: "Calories",
  },
  primary: {
    label: " ",
    color: "hsl(var(--chart-1))",
  },
  secondary: {
    label: " ",
    color: "hsl(var(--chart-2))",
  },
};
export const fitnessForcePieChartConfig = {
  count: {
    label: "Count of Exercises",
  },
  pull: {
    label: "Pull",
    color: "hsl(var(--chart-1))",
  },
  static: {
    label: "Static",
    color: "hsl(var(--chart-2))",
  },
  push: {
    label: "Push",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
};
export const fitnessEquipmentChartConfig = {
  count: {
    label: "Equipment Type",
  },
  "body only": {
    label: "Body Only",
    color: "hsl(var(--chart-1))",
  },
  barbell: {
    label: "Barbell",
    color: "hsl(var(--chart-2))",
  },
  machine: {
    label: "Machine",
    color: "hsl(var(--chart-3))",
  },
  dumbbell: {
    label: "Dumbbell",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export const fitnessLevelChartConfig = {
  beginner: {
    label: "Beginner",
  },
  intermediate: {
    label: "Intermediate",
  },
  expert: {
    label: "Expert",
  },
};

export const exercises = [
  {
    id: "Alternate_Heel_Touchers",
    name: "Alternate Heel Touchers",
    force: "pull",
    level: "beginner",
    mechanic: "isolation",
    equipment: "body only",
    primaryMuscles: ["abdominals"],
    secondaryMuscles: [],
    instructions: [
      "Lie on the floor with the knees bent and the feet on the floor around 18-24 inches apart. Your arms should be extended by your side. This will be your starting position.",
      "Crunch over your torso forward and up about 3-4 inches to the right side and touch your right heel as you hold the contraction for a second. Exhale while performing this movement.",
      "Now go back slowly to the starting position as you inhale.",
      "Now crunch over your torso forward and up around 3-4 inches to the left side and touch your left heel as you hold the contraction for a second. Exhale while performing this movement and then go back to the starting position as you inhale. Now that both heels have been touched, that is considered 1 repetition.",
      "Continue alternating sides in this manner until all prescribed repetitions are done.",
    ],
    category: "strength",
    imageUrls: ["Alternate_Heel_Touchers.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Hip_Circles_prone",
    name: "Hip Circles (prone)",
    force: "pull",
    level: "beginner",
    mechanic: "isolation",
    equipment: "body only",
    primaryMuscles: ["abductors"],
    secondaryMuscles: ["adductors"],
    instructions: [
      "Position yourself on your hands and knees on the ground. Maintaining good posture, raise one bent knee off of the ground. This will be your starting position.",
      "Keeping the knee in a bent position, rotate the femur in an arc, attempting to make a big circle with your knee.",
      "Perform this slowly for a number of repetitions, and repeat on the other side.",
    ],
    category: "stretching",
    imageUrls: ["Hip_Circles_prone.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Groiners",
    name: "Groiners",
    force: "pull",
    level: "intermediate",
    mechanic: "compound",
    equipment: "body only",
    primaryMuscles: ["adductors"],
    secondaryMuscles: [],
    instructions: [
      "Begin in a pushup position on the floor. This will be your starting position.",
      "Using both legs, jump forward landing with your feet next to your hands. Keep your head up as you do so.",
      "Return to the starting position and immediately repeat the movement, continuing for 10-20 repetitions.",
    ],
    category: "stretching",
    imageUrls: ["Groiners.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Seated_Biceps",
    name: "Seated Biceps",
    force: "static",
    level: "expert",
    mechanic: "isolation",
    equipment: "body only",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["chest", "shoulders"],
    instructions: [
      "Sit on the floor with your knees bent and your partner standing behind you. Extend your arms straight behind you with your palms facing each other. Your partner will hold your wrists for you. This will be the starting position.",
      "Attempt to flex your elbows, while your partner prevents any actual movement.",
      "After 10-20 seconds, relax your arms while your partner gently pulls your wrists up to stretch your biceps. Be sure to let your partner know when the stretch is appropriate to prevent injury or overstretching.",
    ],
    category: "stretching",
    imageUrls: ["Seated_Biceps.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Standing_Barbell_Calf_Raise",
    name: "Standing Barbell Calf Raise",
    force: "push",
    level: "beginner",
    mechanic: "isolation",
    equipment: "barbell",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    instructions: [
      "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the correct height is chosen and the bar is loaded, step under the bar and place the bar on the back of your shoulders (slightly below the neck).",
      "Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso.",
      "Step away from the rack and position your legs using a shoulder width medium stance with the toes slightly pointed out. Keep your head up at all times as looking down will get you off balance and also maintain a straight back. The knees should be kept with a slight bend; never locked. This will be your starting position. Tip: For better range of motion you may also place the ball of your feet on a wooden block but be careful as this option requires more balance and a sturdy block.",
      "Raise your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all times. There should be no bending at any time. Hold the contracted position by a second before you start to go back down.",
      "Go back slowly to the starting position as you breathe in by lowering your heels as you bend the ankles until calves are stretched.",
      "Repeat for the recommended amount of repetitions.",
    ],
    category: "strength",
    imageUrls: ["Standing_Barbell_Calf_Raise.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Decline_Smith_Press",
    name: "Decline Smith Press",
    force: "push",
    level: "beginner",
    mechanic: "compound",
    equipment: "machine",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders", "triceps"],
    instructions: [
      "Place a decline bench underneath the Smith machine. Now place the barbell at a height that you can reach when lying down and your arms are almost fully extended. Using a pronated grip that is wider than shoulder width, unlock the bar from the rack and hold it straight over you with your arms extended. This will be your starting position.",
      "As you inhale, lower the bar under control by allowing the elbows to flex, lightly contacting the torso.",
      "After a brief pause, bring the bar back to the starting position by extending the elbows, exhaling as you do so.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When the set is complete, lock the bar back in the rack.",
    ],
    category: "strength",
    imageUrls: ["Decline_Smith_Press.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl",
    name: "Seated One-Arm Dumbbell Palms-Down Wrist Curl",
    force: "pull",
    level: "intermediate",
    mechanic: "isolation",
    equipment: "dumbbell",
    primaryMuscles: ["forearms"],
    secondaryMuscles: [],
    instructions: [
      "Sit on a flat bench with a dumbbell in your right hand.",
      "Place your feet flat on the floor, at a distance that is slightly wider than shoulder width apart.",
      "Lean forward and place your right forearm on top of your upper right thigh with your palm down. Tip: Make sure that the back of the wrist lies on top of your knees. This will be your starting position.",
      "Lower the dumbbell as far as possible as you keep a tight grip on the dumbbell. Inhale as you perform this movement.",
      "Now curl the dumbbell as high as possible as you contract the forearms and as you exhale. Keep the contraction for a second before you lower again. Tip: The only movement should happen at the wrist.",
      "Perform for the recommended amount of repetitions, switch arms and repeat the movement.",
    ],
    category: "strength",
    imageUrls: ["Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Flutter_Kicks",
    name: "Flutter Kicks",
    force: "pull",
    level: "beginner",
    mechanic: "compound",
    equipment: "body only",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings"],
    instructions: [
      "On a flat bench lie facedown with the hips on the edge of the bench, the legs straight with toes high off the floor and with the arms on top of the bench holding on to the front edge.",
      "Squeeze your glutes and hamstrings and straighten the legs until they are level with the hips. This will be your starting position.",
      "Start the movement by lifting the left leg higher than the right leg.",
      "Then lower the left leg as you lift the right leg.",
      "Continue alternating in this manner (as though you are doing a flutter kick in water) until you have done the recommended amount of repetitions for each leg. Make sure that you keep a controlled movement at all times. Tip: You will breathe normally as you perform this movement.",
    ],
    category: "strength",
    imageUrls: ["Flutter_Kicks.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Standing_Hamstring_and_Calf_Stretch",
    name: "Standing Hamstring and Calf Stretch",
    force: "static",
    level: "beginner",
    mechanic: null,
    equipment: "other",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: [],
    instructions: [
      "Being by looping a belt, band, or rope around one foot. While standing, place that foot forward.",
      "Bend your back leg, while keeping the front one straight. Now raise the toes of your front foot off of the ground and lean forward.",
      "Using the belt, pull on the top of the foot to increase the stretch in the calf. Hold for 10-20 seconds and repeat with the other foot.",
    ],
    category: "stretching",
    imageUrls: ["Standing_Hamstring_and_Calf_Stretch.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Side_To_Side_Chins",
    name: "Side To Side Chins",
    force: "pull",
    level: "intermediate",
    mechanic: "compound",
    equipment: "other",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "forearms", "middle back", "shoulders"],
    instructions: [
      "Grab the pull-up bar with the palms facing forward using a wide grip.",
      "As you have both arms extended in front of you holding the bar at a wide grip, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position.",
      "Pull your torso up while leaning to the left hand side until the bar almost touches your upper chest by drawing the shoulders and the upper arms down and back. Exhale as you perform this portion of the movement. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary as it moves through space (no swinging) and only the arms should move. The forearms should do no other work other than hold the bar.",
      "After a second of contraction, inhale as you go back to the starting position.",
      "Now, pull your torso up while leaning to the right hand side until the bar almost touches your upper chest by drawing the shoulders and the upper arms down and back. Exhale as you perform this portion of the movement. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar.",
      "After a second of contraction, inhale as you go back to the starting position.",
      "Repeat steps 3-6 until you have performed the prescribed amount of repetitions for each side.",
    ],
    category: "strength",
    imageUrls: ["Side_To_Side_Chins.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Hyperextensions_With_No_Hyperextension_Bench",
    name: "Hyperextensions With No Hyperextension Bench",
    force: "pull",
    level: "intermediate",
    mechanic: "compound",
    equipment: "body only",
    primaryMuscles: ["lower back"],
    secondaryMuscles: ["glutes", "hamstrings"],
    instructions: [
      "With someone holding down your legs, slide yourself down to the edge a flat bench until your hips hang off the end of the bench. Tip: Your entire upper body should be hanging down towards the floor. Also, you will be in the same position as if you were on a hyperextension bench but the range of motion will be shorter due to the height of the flat bench vs. that of the hyperextension bench.",
      "With your body straight, cross your arms in front of you (my preference) or behind your head. This will be your starting position. Tip: You can also hold a weight plate for extra resistance in front of you under your crossed arms.",
      "Start bending forward slowly at the waist as far as you can while keeping your back flat. Inhale as you perform this movement. Keep moving forward until you almost touch the floor or you feel a nice stretch on the hamstrings (whichever comes first). Tip: Never round the back as you perform this exercise.",
      "Slowly raise your torso back to the initial position as you exhale. Tip: Avoid the temptation to arch your back past a straight line. Also, do not swing the torso at any time in order to protect the back from injury.",
      "Repeat for the recommended amount of repetitions.",
    ],
    category: "strength",
    imageUrls: ["Hyperextensions_With_No_Hyperextension_Bench.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Suspended_Row",
    name: "Suspended Row",
    force: "pull",
    level: "beginner",
    mechanic: "compound",
    equipment: "other",
    primaryMuscles: ["middle back"],
    secondaryMuscles: ["biceps", "lats"],
    instructions: [
      "Suspend your straps at around chest height. Take a handle in each hand and lean back. Keep your body erect and your head and chest up. Your arms should be fully extended. This will be your starting position.",
      "Begin by flexing the elbow to initiate the movement. Protract your shoulder blades as you do so.",
      "At the completion of the motion pause, and then return to the starting position.",
    ],
    category: "strength",
    imageUrls: ["Suspended_Row.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Lying_Face_Up_Plate_Neck_Resistance",
    name: "Lying Face Up Plate Neck Resistance",
    force: "pull",
    level: "intermediate",
    mechanic: "isolation",
    equipment: "other",
    primaryMuscles: ["neck"],
    secondaryMuscles: [],
    instructions: [
      "Lie face up with your whole body straight on a flat bench while holding a weight plate on top of your forehead. Tip: You will need to position yourself so that your shoulders are slightly above the end of a flat bench in order for the traps, neck and head to be off the bench. This will be your starting position.",
      "While keeping the plate secure on your forehead slowly lower your head back in a semi-circular motion as you breathe in.",
      "Raise your head back up to the starting position in a semi-circular motion as you breathe out. Hold the contraction for a second.",
      "Repeat for the recommended amount of repetitions.",
    ],
    category: "strength",
    imageUrls: ["Lying_Face_Up_Plate_Neck_Resistance.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Jogging_Treadmill",
    name: "Jogging, Treadmill",
    force: null,
    level: "beginner",
    mechanic: null,
    equipment: "machine",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings"],
    instructions: [
      "To begin, step onto the treadmill and select the desired option from the menu. Most treadmills have a manual setting, or you can select a program to run. Typically, you can enter your age and weight to estimate the amount of calories burned during exercise. Elevation can be adjusted to change the intensity of the workout.",
      "Treadmills offer convenience, cardiovascular benefits, and usually have less impact than jogging outside. A 150 lb person will burn almost 250 calories jogging for 30 minutes, compared to more than 450 calories running. Maintain proper posture as you jog, and only hold onto the handles when necessary, such as when dismounting or checking your heart rate.",
    ],
    category: "cardio",
    imageUrls: ["Jogging_Treadmill.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Machine_Shoulder_Military_Press",
    name: "Machine Shoulder (Military) Press",
    force: "push",
    level: "beginner",
    mechanic: "compound",
    equipment: "machine",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps"],
    instructions: [
      "Sit down on the Shoulder Press Machine and select the weight.",
      "Grab the handles to your sides as you keep the elbows bent and in line with your torso. This will be your starting position.",
      "Now lift the handles as you exhale and you extend the arms fully. At the top of the position make sure that you hold the contraction for a second.",
      "Lower the handles slowly back to the starting position as you inhale.",
      "Repeat for the recommended amount of repetitions.",
    ],
    category: "strength",
    imageUrls: ["Machine_Shoulder_Military_Press.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Dumbbell_Shrug",
    name: "Dumbbell Shrug",
    force: "pull",
    level: "beginner",
    mechanic: "isolation",
    equipment: "dumbbell",
    primaryMuscles: ["traps"],
    secondaryMuscles: [],
    instructions: [
      "Stand erect with a dumbbell on each hand (palms facing your torso), arms extended on the sides.",
      "Lift the dumbbells by elevating the shoulders as high as possible while you exhale. Hold the contraction at the top for a second. Tip: The arms should remain extended at all times. Refrain from using the biceps to help lift the dumbbells. Only the shoulders should be moving up and down.",
      "Lower the dumbbells back to the original position.",
      "Repeat for the recommended amount of repetitions.",
    ],
    category: "strength",
    imageUrls: ["Dumbbell_Shrug.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
  {
    id: "Reverse_Triceps_Bench_Press",
    name: "Reverse Triceps Bench Press",
    force: "push",
    level: "intermediate",
    mechanic: "compound",
    equipment: "barbell",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["chest", "shoulders"],
    instructions: [
      "Lie back on a flat bench. Using a close, supinated grip (around shoulder width), lift the bar from the rack and hold it straight over you with your arms locked extended in front of you and perpendicular to the floor. This will be your starting position.",
      "As you breathe in, come down slowly until you feel the bar on your middle chest. Tip: Make sure that as opposed to a regular bench press, you keep the elbows close to the torso at all times in order to maximize triceps involvement.",
      "After a second pause, bring the bar back to the starting position as you breathe out and push the bar using your triceps muscles. Lock your arms in the contracted position, hold for a second and then start coming down slowly again. Tip: It should take at least twice as long to go down than to come up.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the bar back in the rack.",
    ],
    category: "strength",
    imageUrls: ["Reverse_Triceps_Bench_Press.gif"],
    createdAt: "2024-10-24 19:10:35.022",
    updatedAt: null,
  },
];

// <AccordionItem value={`day-${index}`}>
//   <AccordionTrigger>
//     {fitnessPlanForm.watch(`days[${index}].name`) || `Day ${index + 1}`}
//   </AccordionTrigger>
//   <AccordionContent>
//     <FormField
//       control={fitnessPlanForm.control}
//       name={`days[${index}].name`}
//       render={({ field }) => (
//         <FormItem className="flex items-end space-x-2 ">
//           <FormLabel className={` `}>Name</FormLabel>
//           <FormControl>
//             <Input
//               type="text"
//               placeholder=""
//               className={inputStyle}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//           <FormDescription className="sr-only">
//             Name of your day
//           </FormDescription>
//         </FormItem>
//       )}
//     />
//     <Plus className="h-6 w-6" />
//     {field.exercises.map((exercise, exerciseIndex) => (
//       <FormField
//         control={fitnessPlanForm.control}
//         name={`days[${index}].exercises[${exerciseIndex}].exerciseId`}
//         render={({ field }) => (
//           <FormItem className="flex flex-col">
//             <FormLabel>Exercise </FormLabel>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <FormControl>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     className={cn(
//                       "w-[200px] justify-between",
//                       !field.value && "text-muted-foreground"
//                     )}
//                   >
//                     {field.value
//                       ? exerciseOptions.find(
//                           (exerciseOption) =>
//                             exerciseOption.value === field.value
//                         )?.label
//                       : "Select Exercise"}
//                     <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                   </Button>
//                 </FormControl>
//               </PopoverTrigger>
//               <PopoverContent className="w-[200px] p-0">
//                 <Command>
//                   <CommandInput
//                     placeholder="Search framework..."
//                     className="h-9"
//                   />
//                   <CommandList>
//                     <CommandEmpty>No framework found.</CommandEmpty>
//                     <CommandGroup>
//                       {exerciseOptions.map((exerciseOption) => (
//                         <CommandItem
//                           value={exerciseOption.label}
//                           key={exerciseOption.value}
//                           onSelect={() => {
//                             field.onChange(exerciseOption.value);
//                             //   fitnessPlanForm.setValue(
//                             //     `days[${index}].exercises[${exerciseIndex}].exerciseId`,
//                             //     exerciseOption.value
//                             //   );
//                           }}
//                         >
//                           {exerciseOption.label}
//                           <CheckIcon
//                             className={cn(
//                               "ml-auto h-4 w-4",
//                               exerciseOption.value === field.value
//                                 ? "opacity-100"
//                                 : "opacity-0"
//                             )}
//                           />
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//             <FormDescription>
//               This is the language that will be used in the dashboard.
//             </FormDescription>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ))}
//   </AccordionContent>
// </AccordionItem>

export const muscleGroups = [
  { name: "all", value: "all" },
  { name: "abdominals", value: "abdominals" },
  { name: "abductors", value: "abductors" },
  { name: "adductors", value: "adductors" },
  { name: "biceps", value: "biceps" },
  { name: "calves", value: "calves" },
  { name: "chest", value: "chest" },
  { name: "forearms", value: "forearms" },
  { name: "glutes", value: "glutes" },
  { name: "hamstrings", value: "hamstrings" },
  { name: "lats", value: "lats" },
  { name: "lower back", value: "lower back" },
  { name: "middle back", value: "middle back" },
  { name: "neck", value: "neck" },
  { name: "quadriceps", value: "quadriceps" },
  { name: "shoulders", value: "shoulders" },
  { name: "traps", value: "traps" },
  { name: "triceps", value: "triceps" },
];
