"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";

export default function ModalDrawer({ title, desc, children }) {
  const [open, setOpen] = useState(false);

  const isMobile = useWindowSize().width < 640;
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">{title}</Button>
        </DrawerTrigger>
        <div className="mx-auto w-full max-w-sm">
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle className="capitalize">{title}</DrawerTitle>
              <DrawerDescription>{desc}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 w-full">{children}</div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                {/* <Button variant="outline">Cancel</Button> */}
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </div>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <div className="p-4 pb-0 w-full">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
