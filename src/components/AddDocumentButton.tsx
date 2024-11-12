"use client";

import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

function AddDocumentButton({ userId, email }: AddDocumentBtnProps) {
   const router = useRouter();

   const addDocumentHandler = async () => {
      try {
         const room = await createDocument({ userId, email });

         if (room) {
            router.push(`/documents/${room?.id}`);
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Button
         type="submit"
         onClick={addDocumentHandler}
         className="gradient-blue flex gap-1 shadow-md"
      >
         <Plus size={28} />
         <p className="hidden sm:block ">Create a new document</p>
      </Button>
   );
}

export default AddDocumentButton;
