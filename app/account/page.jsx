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
import { Separator } from "@/components/ui/separator";
const { getUser } = getKindeServerSession();
export default async function Page() {
  const user = await getUser();
  const userInfo = await getUserInfo(user.id);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{user.given_name}'s info</h3>
      </div>
      <Separator />
      <AccountForm userid={user.id} />
    </div>
  );
}
