import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Logs({
  data,
  title,
  desc,
  content,
  icon,
  value,
  units,
}) {
  return (
    <Card className="h-full min-h-[146px]">
      <CardHeader className=" pb-0 mb-[6px]">
        <CardTitle className="text-2xl font-black">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        {data === null ? (
          <p>loading...</p>
        ) : (
          <>
            <div className="flex items-center justify-center space-x-2">
              <div>{icon}</div>
              <div className="text-2xl">{value}</div>
              <div className="text-2xl">{units}</div>
            </div>
          </>
        )}
        {/* <p>{data.actualWeight}</p> */}
      </CardContent>
    </Card>
  );
}
