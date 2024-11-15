import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
   return (
      <main className="auth-page bg-black">
         <SignUp />
      </main>
   );
}

export default SignUpPage;
