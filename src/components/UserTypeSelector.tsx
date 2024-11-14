import React from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

function UserTypeSelector({
   userType,
   setUserType,
   onClickHandler,
}: UserTypeSelectorParams) {
   const accessChangeHandler = (type: UserType) => {
      setUserType(type);

      if (onClickHandler) {
         onClickHandler(type);
      }
   };

   return (
      <Select
         value={userType}
         onValueChange={(type: UserType) => accessChangeHandler(type)}
      >
         <SelectTrigger className="shad-select">
            <SelectValue placeholder="Theme" />
         </SelectTrigger>
         <SelectContent className="border-none bg-dark-200">
            <SelectItem value="viewer" className="shad-select">
               Allow view
            </SelectItem>
            <SelectItem value="editor" className="shad-select">
               Allow edit
            </SelectItem>
         </SelectContent>
      </Select>
   );
}

export default UserTypeSelector;
