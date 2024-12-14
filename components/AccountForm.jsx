"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserInfo } from "@/app/lib/actions";

export default function AccountForm({ isMetric, userid }) {
  const FormSchema = z.object({
    isMetric: z.boolean(),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isMetric: isMetric,
    },
  });

  function onSubmit(data) {
    updateUserInfo(userId, data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const { watch } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="isMetric"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="flex w-full whitespace-nowrap gap-4">
                  <div className="font-black ">Units</div>
                  Murica
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  Rest of world
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
