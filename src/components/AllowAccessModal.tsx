"use client";

import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

function AllowAccessModal({
   roomId,
   collaborators,
   creatorId,
   currentUserType,
}: AllowAccessModalProps) {
   const user = useSelf();

   const [open, setOpen] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);

   const [email, setEmail] = useState<string>("");
   const [userType, setUserType] = useState<UserType>("viewer");

   const allowDocumentAccessHandler = async () => {
      setLoading(true);

      await updateDocumentAccess({
         roomId,
         email,
         userType: userType as UserType,
         updatedBy: user.info,
      });

      setLoading(false);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger disabled={currentUserType !== "editor"}>
            <Button
               className={`h-9 gap1 px-4 ${currentUserType !== "editor" && "opacity-20"}`}
               disabled={currentUserType !== "editor"}
            >
               <Lock size={24} />
               <div className="hidden sm:block">Allow access</div>
            </Button>
         </DialogTrigger>
         <DialogContent className="shad-dialog">
            <DialogHeader>
               <DialogTitle>Manage collaborative access</DialogTitle>
               <DialogDescription>
                  Add or remove collaborators to view or edit this document.
               </DialogDescription>
            </DialogHeader>

            <Label htmlFor="email" className="mt-6 text-blue-100 ">
               Email
            </Label>
            <div className="flex items-center gap-3">
               <div className="flex flex-1 rounded-md bg-dark-400">
                  <Input
                     id="email"
                     type="email"
                     placeholder="Enter email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="share-input"
                  />

                  <UserTypeSelector
                     userType={userType}
                     setUserType={setUserType}
                     //  onClickHandler={() => {}}
                  />
               </div>
               <Button
                  type="submit"
                  onClick={allowDocumentAccessHandler}
                  className="gradient-blue flex h-full px-5"
                  disabled={loading}
               >
                  {loading ? "allowing..." : "Add"}
               </Button>
            </div>

            <div className="my-2 space-y-2 ">
               <ul className="flex flex-col">
                  {collaborators.map((collaborator) => (
                     <Collaborator
                        key={collaborator.id}
                        roomId={roomId}
                        creatorId={creatorId}
                        email={collaborator.email}
                        collaborator={collaborator}
                        user={user.info}
                     />
                  ))}
               </ul>
            </div>
         </DialogContent>
      </Dialog>
   );
}

export default AllowAccessModal;
