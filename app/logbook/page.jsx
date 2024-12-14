import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AccountForm from "@/components/AccountForm";
import { getUserInfo } from "../lib/actions";
const { getUser } = getKindeServerSession();
export default async function Page() {
  const user = await getUser();
  const userInfo = await getUserInfo(user.id);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{user.given_name}'s logbook</CardTitle>
          <CardDescription>your logbook </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
