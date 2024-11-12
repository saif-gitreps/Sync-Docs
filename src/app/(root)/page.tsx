import AddDocumentButton from "@/components/AddDocumentButton";
import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { File } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

async function HomePage() {
   const clerkUser = await currentUser();

   if (!clerkUser) {
      redirect("/sign-in");
   }

   const documents = [];

   return (
      <main className="home-container">
         <Header className="sticky top-0 left-0">
            <div className="flex items-center gap-2 lg:gap-4">
               Notification
               <SignedIn>
                  <UserButton />
               </SignedIn>
            </div>
         </Header>

         {documents.length > 0 ? (
            <div></div>
         ) : (
            <div className="document-list-empty">
               <File size={60} className="mx-auto" />

               <AddDocumentButton
                  userId={clerkUser.id}
                  email={clerkUser.emailAddresses[0].emailAddress}
               />
            </div>
         )}
      </main>
   );
}

export default HomePage;
