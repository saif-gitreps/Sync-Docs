import { SignIn } from "@clerk/nextjs";
import React from "react";

function SignInPage() {
   return (
      <main className="auth-page">
         <SignIn />
      </main>
   );
}

export default SignInPage;
