import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
   const clerkUser = await currentUser();

   if (!clerkUser) {
      redirect("/sign-in");
   }

   const user = {
      id: clerkUser?.id,
      info: {
         id: clerkUser?.id,
         name: `${clerkUser?.firstName} ${clerkUser?.lastName}`,
         email: clerkUser?.emailAddresses[0].emailAddress,
         avatar: clerkUser?.imageUrl,
         color: getUserColor(clerkUser?.id as string),
      },
   };

   const { status, body } = await liveblocks.identifyUser(
      {
         userId: user.info.email,
         groupIds: [], // Optional
      },
      { userInfo: user.info }
   );

   return new Response(body, { status });
}
