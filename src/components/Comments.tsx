import { useIsThreadActive } from "@liveblocks/react-lexical";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useThreads } from "@liveblocks/react/suspense";
import React from "react";

function Comments() {
   const { threads } = useThreads();

   return (
      <div className="comments-container">
         <Composer className="comment-composer" />

         {threads.map((thread) => (
            <Comment key={thread.id} thread={thread} />
         ))}
      </div>
   );
}

function Comment({ thread }: ThreadWrapperProps) {
   const isActive = useIsThreadActive(thread.id);

   return (
      <div className="thread-wrapper">
         <Thread
            thread={thread}
            data-state={isActive ? "active" : "inactive"}
            className={`comment-thread border ${
               isActive && "border-blue-500 shadow-md"
            } ${thread.resolved && "opacity-45"}`}
         />
      </div>
   );
}

export default Comments;
