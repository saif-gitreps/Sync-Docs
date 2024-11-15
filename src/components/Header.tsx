import { ScrollText } from "lucide-react";
import Link from "next/link";
import React from "react";

function Header({ children, className }: HeaderProps) {
   return (
      <div className={`header ${className}`}>
         <Link href="/" className="flex items-center">
            <ScrollText size={40} className="stroke-white mr-1" />
            <h1 className="text-gray-100 hidden md:block text-xl">Sync Docs</h1>
         </Link>
         {children}
      </div>
   );
}

export default Header;
