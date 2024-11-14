"use client";

import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import {
   useInboxNotifications,
   useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import {
   InboxNotification,
   InboxNotificationList,
   LiveblocksUIConfig,
} from "@liveblocks/react-ui";
import Image from "next/image";

function Notifications() {
   const { inboxNotifications } = useInboxNotifications();
   const { count } = useUnreadInboxNotificationsCount();

   const unreadNotifications = inboxNotifications.filter(
      (notification) => !notification.readAt
   );

   return (
      <Popover>
         <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
            <Bell size={24} />

            {count && (
               <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-red-500" />
            )}
         </PopoverTrigger>
         <PopoverContent align="end" className="shad-popover">
            <LiveblocksUIConfig
               overrides={{
                  INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
                     <>{user} mentioned you.</>
                  ),
               }}
            >
               <InboxNotificationList>
                  {unreadNotifications.length <= 0 && (
                     <div className="p-4 text-center text-gray-500">
                        No new notifications
                     </div>
                  )}

                  {unreadNotifications.length > 0 &&
                     unreadNotifications.map((notification) => (
                        <InboxNotification
                           key={notification.id}
                           inboxNotification={notification}
                           className="bg-dark-200 text-white"
                           href={`/documents/${notification.roomId}`}
                           kinds={{
                              thread: (props) => (
                                 <InboxNotification.Thread
                                    {...props}
                                    showActions={false}
                                    showRoomName={false}
                                 />
                              ),
                              textMention: (props) => (
                                 <InboxNotification.TextMention
                                    {...props}
                                    showRoomName={false}
                                 />
                              ),
                              $documentAccess: (props) => (
                                 <InboxNotification.Custom
                                    {...props}
                                    title={
                                       props.inboxNotification.activities[0].data.title
                                    }
                                    aside={
                                       <InboxNotification.Icon className="bg-transparent">
                                          <Image
                                             src={
                                                (props.inboxNotification.activities[0]
                                                   .data.avatar as string) || ""
                                             }
                                             alt="avtr"
                                             width={40}
                                             height={40}
                                             className="rounded-full"
                                          />
                                       </InboxNotification.Icon>
                                    }
                                 >
                                    {props.children}
                                 </InboxNotification.Custom>
                              ),
                           }}
                        />
                     ))}
               </InboxNotificationList>
            </LiveblocksUIConfig>
         </PopoverContent>
      </Popover>
   );
}

export default Notifications;
