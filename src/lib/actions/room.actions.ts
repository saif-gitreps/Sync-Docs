"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { redirect } from "next/navigation";

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
   const roomId = nanoid();

   try {
      const metadata = {
         creatorId: userId,
         email,
         title: "Untitled",
      };

      const usersAccesses: RoomAccesses = {
         [email]: ["room:write"],
      };

      const room = await liveblocks.createRoom(roomId, {
         metadata,
         usersAccesses,
         defaultAccesses: [],
      });

      revalidatePath("/");

      return parseStringify(room);
   } catch (error) {
      console.error("Error creating document", error);
      return null;
   }
};

export const getDocument = async ({
   roomId,
   userId,
}: {
   roomId: string;
   userId: string;
}) => {
   try {
      const room = await liveblocks.getRoom(roomId);

      const hasAccess = Object.keys(room.usersAccesses).includes(userId);

      if (!hasAccess) {
         throw new Error("You don't have access to this document");
      }

      return parseStringify(room);
   } catch (error) {
      console.error("Error getting document", error);
      return null;
   }
};

export const getAllDocuments = async (email: string) => {
   try {
      const rooms = await liveblocks.getRooms({ userId: email });

      return parseStringify(rooms);
   } catch (error) {
      console.error("Error getting document", error);
      return null;
   }
};

export const updateDocument = async (roomId: string, title: string) => {
   try {
      const updatedRoom = await liveblocks.updateRoom(roomId, {
         metadata: {
            title,
         },
      });

      revalidatePath(`/documents/${roomId}`);

      return parseStringify(updatedRoom);
   } catch (error) {
      console.log(error);
   }
};

export const deleteDocument = async (roomId: string) => {
   try {
      await liveblocks.deleteRoom(roomId);

      revalidatePath("/");

      redirect("/");
   } catch (error) {
      console.log(error);
   }
};

type UpdateDocumentAccessParams = {
   roomId: string;
   email: string;
   userType: UserType;
   updatedBy: User;
};

export const updateDocumentAccess = async ({
   roomId,
   email,
   userType,
   updatedBy,
}: UpdateDocumentAccessParams) => {
   try {
      const usersAccesses: RoomAccesses = {
         [email]: getAccessType(userType) as AccessType,
      };

      const room = await liveblocks.updateRoom(roomId, {
         usersAccesses,
      });

      if (room) {
         // send notifs
         console.log("Notifying user", updatedBy, "of access change");
      }

      revalidatePath(`/documents/${roomId}`);

      return parseStringify(room);
   } catch (error) {
      console.log(error);
   }
};

export const removeDocumentAccess = async ({
   roomId,
   email,
}: {
   roomId: string;
   email: string;
}) => {
   try {
      const room = await liveblocks.getRoom(roomId);

      if (room.metadata.email === email) {
         throw new Error("You can't remove the owner");
      }

      const updatedRoom = await liveblocks.updateRoom(roomId, {
         usersAccesses: {
            [email]: null,
         },
      });

      revalidatePath(`/documents/${roomId}`);

      return parseStringify(updatedRoom);
   } catch (error) {
      console.log(error);
   }
};
