"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";
import Header from "./Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";

function CollaborativeRoom({ roomId, roomMetaData }: CollaborativeRoomProps) {
   return (
      <RoomProvider id={roomId}>
         <ClientSideSuspense fallback={<div>Loading…</div>}>
            <div className="collaborative-room">
               <Header>
                  <div className="flex w-fit items-center justify-center gap-2">
                     <div className="document-title">share</div>
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
