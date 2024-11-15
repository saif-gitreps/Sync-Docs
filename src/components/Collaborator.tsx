import Image from "next/image";
import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import { removeDocumentAccess, updateDocumentAccess } from "@/lib/actions/room.actions";

function Collaborator({
   roomId,
   creatorId,
   collaborator,
   email,
   user,
}: CollaboratorProps) {
   const [userType, setUserType] = useState<UserType>(collaborator.userType || "viewer");
   const [loading, setLoading] = useState<boolean>(false);

   const updateDocumentAccessHandler = async (type: string) => {
      setLoading(true);

      await updateDocumentAccess({
         roomId,
         email,
         userType: type as UserType,
         updatedBy: user,
      });

      setLoading(false);
   };

   const removeDocumentAccessHandler = async (email: string) => {
      setLoading(true);

      await removeDocumentAccess({
         roomId,
         email,
      });

      setLoading(false);
   };

   return (
      <li className="flex items-center justify-between gap-2 py-3">
         <div className="flex gap-2">
            <Image
               src={collaborator.avatar}
               alt={collaborator.name}
               width={32}
               height={32}
               className="size-9 rounded-full"
            />

            <div>
               <div className="line-clamp-1 text-sm font-semibold leading-4 text-black">
                  {collaborator.name}

                  <span className="text-10-regular pl-2 text-gray-700">
                     {loading && "updating.."}
                  </span>
               </div>
               <div className="text-sm font-bold text-gray-700">
                  {collaborator.email === user.email ? "You" : collaborator.email}
               </div>
            </div>
         </div>

         {creatorId === collaborator.id ? (
            <div className="text-sm text-blue-100">Owner</div>
         ) : (
            <div className="flex items-center">
               <UserTypeSelector
                  userType={userType}
                  setUserType={setUserType || "viewer"}
                  onClickHandler={updateDocumentAccessHandler}
               />

               <Button
                  type="button"
                  onClick={() => removeDocumentAccessHandler(collaborator.email)}
               >
                  Remove
               </Button>
            </div>
         )}
      </li>
   );
}

export default Collaborator;
