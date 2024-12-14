import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toTitleCase } from "@/app/lib/helpers";
import Modal from "./Modal";
import Cmdk from "./Cmdk";
export default function NoData({
  title,
  desc,
  userFirstName,
  form,
  sectionName,
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <p className="text-center">
          Hey {toTitleCase(userFirstName)}, it looks like you don't have any
          data yet. Let's make a make a{" "}
          <Modal
            title={`${toTitleCase(userFirstName)}'s ${toTitleCase(
              sectionName
            )} Plan`}
            btnTitle={`new ${sectionName} plan`} // Use sectionName here
            desc={"Enter details to build a nutrition plan"}
            btnStyle={"bg-green-600 text-white p-2 font-bold"}
          >
            {/* {form} */}
          </Modal>
        </p>
        {form}
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}
