"use client";

import React, { useState } from "react";

import { deleteDocument } from "@/lib/actions/room.actions";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

function DeleteModal({ roomId }: DeleteModalProps) {
   const [open, setOpen] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);

   const deleteDocumentHandler = async () => {
      setLoading(true);

      try {
         await deleteDocument(roomId);
         setOpen(false);
      } catch (error) {
         console.log("Error notif:", error);
      }

      setLoading(false);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Trash2 size={30} className="stroke-red-500 hover:cursor-pointer" />
         </DialogTrigger>
         <DialogContent className="shad-dialog">
            <DialogHeader>
               <DialogTitle>Delete document ?</DialogTitle>
               <DialogDescription>
                  Are you sure you want to delete this document? This action cannot be
                  undone.
               </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-5">
               <DialogClose asChild className="w-full bg-dark-400 text-white">
                  Cancel
               </DialogClose>

               <Button
                  variant="destructive"
                  onClick={deleteDocumentHandler}
                  className="gradient-red w-full"
               >
                  {loading ? "Deleting..." : "Delete"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

export default DeleteModal;
