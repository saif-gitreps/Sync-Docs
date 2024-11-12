import React from "react";
import { Loader2 } from "lucide-react";

function Loader() {
   return (
      <div className="loader">
         <Loader2 className="animate-spin" size={32} />
      </div>
   );
}

export default Loader;
