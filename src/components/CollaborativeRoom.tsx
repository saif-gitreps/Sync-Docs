"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";
import { Input } from "./ui/input";
import { Edit, Eye } from "lucide-react";
import { updateDocument } from "@/lib/actions/room.actions";
import Loader from "./Loader";

function CollaborativeRoom({
   roomId,
   roomMetadata,
   currentUserType,
   users = [],
}: CollaborativeRoomProps) {
   const [editing, setEditing] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [documentTitle, setDocumentTitle] = useState<string>(roomMetadata?.title || "");

   const containerRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         setLoading(true);

         try {
            if (documentTitle !== roomMetadata?.title) {
               const updatedDocument = await updateDocument(roomId, documentTitle);

               if (updatedDocument) {
                  setEditing(false);
                  setLoading(false);
               }
            }
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      }
   };

   useEffect(() => {
      const handleClickOutside = async (e: MouseEvent) => {
         if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setEditing(false);
            await updateDocument(roomId, documentTitle);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [documentTitle, roomId]);

   useEffect(() => {
      if (editing && inputRef.current) {
         inputRef.current.focus();
      }
   }, [editing]);

   return (
      <RoomProvider id={roomId}>
         <ClientSideSuspense fallback={<Loader />}>
            <div className="collaborative-room">
               <Header>
                  <div
                     ref={containerRef}
                     className="flex w-fit items-center justify-center gap-2"
                  >
                     {editing && !loading ? (
                        <Input
                           type="text"
                           value={documentTitle}
                           ref={inputRef}
                           placeholder="Title"
                           onChange={(e) => setDocumentTitle(e.target.value)}
                           onKeyDown={updateTitleHandler}
                           disabled={!editing || loading}
                           className="document-title-input"
                        />
                     ) : (
                        <>
                           {loading ? (
                              <p className="text-sm text-gray-400 animate-pulse">
                                 Saving title..
                              </p>
                           ) : (
                              <p className="document-title">{documentTitle}</p>
                           )}
                        </>
                     )}

                     {currentUserType === "editor" && !editing && (
                        <Edit
                           size={24}
                           onClick={() => setEditing(true)}
                           className="cursor-pointer"
                        />
                     )}

                     {currentUserType !== "editor" && !editing && (
                        <p className="view-only-tag">
                           View only <Eye size={16} className="ml-1" />
                        </p>
                     )}
                  </div>
                  <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                     <ActiveCollaborators />
                     <SignedOut>
                        <SignInButton />
                     </SignedOut>
                     <SignedIn>
                        <UserButton />
                     </SignedIn>
                  </div>
               </Header>
               <Editor />
            </div>
         </ClientSideSuspense>
      </RoomProvider>
   );
}

export default CollaborativeRoom;
