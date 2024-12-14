import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GenericWrapper({ title, desc, children }) {
  return (
    <Card className="border-none w-full space-y-2">
      <CardHeader className="p-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-full w-full">{children}</CardContent>
    </Card>
  );
}
