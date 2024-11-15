import { ScrollText } from "lucide-react";
import Link from "next/link";
import React from "react";

function Header({ children, className }: HeaderProps) {
   return (
      <div className="bg-black w-full">
         <div
            className={`max-w-6xl mx-auto flex h-16 items-center justify-between ${className}`}
         >
            <Link href="/" className="flex items-center">
               <ScrollText size={40} className="stroke-white mr-1" />
               <h1 className="text-gray-100 hidden md:block text-xl">Sync Docs</h1>
            </Link>
            {children}
         </div>
      </div>
   );
}

export default Header;
