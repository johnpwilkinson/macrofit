"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Create a context for the close function
const DialogCloseContext = React.createContext(undefined);

export function useDialogClose() {
  return React.useContext(DialogCloseContext);
}

export default function Modal({ title, desc, children, btnStyle, btnTitle }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`w-fit ${btnStyle}`}>{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-2xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{desc}</DialogDescription>
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <DialogClose asChild>
              {/* This button is hidden and will be triggered programmatically */}
              <button className="hidden" id="dialog-close-button" />
            </DialogClose>
            <DialogCloseContext.Provider
              value={() =>
                document.getElementById("dialog-close-button")?.click()
              }
            >
              {children}
            </DialogCloseContext.Provider>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
