import { SignIn } from "@clerk/nextjs";
import React from "react";

function SignInPage() {
   return (
      <main className="auth-page bg-black">
         <SignIn />
      </main>
   );
}

export default SignInPage;
