import AddDocumentButton from "@/components/AddDocumentButton";
import DeleteModal from "@/components/DeleteModal";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";
import { getAllDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { File } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function HomePage() {
   const clerkUser = await currentUser();

   if (!clerkUser) {
      redirect("/sign-in");
   }

   const documents = await getAllDocuments(clerkUser.emailAddresses[0].emailAddress);

   return (
      <main className="home-container">
         <Header className="sticky top-0 left-0">
            <div className="flex items-center gap-2 lg:gap-4">
               <Notifications />

               <SignedIn>
                  <UserButton />
               </SignedIn>
            </div>
         </Header>

         {documents.data.length > 0 ? (
            <div className="document-list-container">
               <div className="document-list-title">
                  <div className="text-28-semibold">Your documents</div>
                  <AddDocumentButton
                     userId={clerkUser.id}
                     email={clerkUser.emailAddresses[0].emailAddress}
                  />
               </div>

               <ul className="document-ul">
                  {documents.data.map(
                     (document: {
                        id: string;
                        metadata: { title: string };
                        createdAt: string;
                     }) => (
                        <li key={document.id} className="document-list-item">
                           <Link
                              href={`/documents/${document.id}`}
                              className="flex flex-1 items-center gap-4"
                           >
                              <div className="hidden rounded-md p-2 sm:block">
                                 <File size={40} className="" />
                              </div>
                              <div className="space-y-1">
                                 <p className="line-clamp-1 text-lg">
                                    {document.metadata.title}
                                 </p>
                                 <p className="text-sm text-black-100">
                                    Created about {dateConverter(document.createdAt)}
                                 </p>
                              </div>
                           </Link>

                           <DeleteModal roomId={document.id} />
                        </li>
                     )
                  )}
               </ul>
            </div>
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
