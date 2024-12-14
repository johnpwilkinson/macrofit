import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import MyAlert from "./MyAlert";
import {
  setActiveFitnessPlan,
  setActiveNutritionPlan,
} from "@/app/lib/actions";
import Link from "next/link";
import { format } from "date-fns";

export default function MyTable({ data, headers, caption, from }) {
  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead className="text-center" key={header.keyName}>
              {header.displayName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {headers.map((header) => (
              <TableCell
                className={`${
                  header.keyName === "details" || header.keyName === "active"
                    ? "flex justify-center items-center "
                    : ""
                }text-center`}
                key={header.keyName}
              >
                {header.keyName === "active" ? (
                  row[header.keyName] ? (
                    <StarFilledIcon />
                  ) : (
                    <MyAlert
                      title="are you sure you want to make this fitness plan active?"
                      desc={row.id}
                      rowId={row.id}
                      action={
                        from === "fitness"
                          ? setActiveFitnessPlan
                          : setActiveNutritionPlan
                      }
                    >
                      <StarIcon />
                    </MyAlert>
                  )
                ) : header.keyName === "name" ? (
                  row[header.keyName] === undefined ? (
                    `Nutritional Plan ${index + 1}`
                  ) : (
                    row[header.keyName]
                  )
                ) : header.keyName === "details" ? (
                  <Link href={`/${from}/${row.id}`}>{row[header.keyName]}</Link>
                ) : header.keyName === "dateStarted" ||
                  header.keyName === "dateEnded" ? (
                  format(new Date(row[header.keyName]), "M/d/yy")
                ) : (
                  row[header.keyName]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
