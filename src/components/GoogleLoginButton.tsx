'use client'

import { FC } from "react";
import Button from './ui/Button'
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface GoogleLoginButtonProps {}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({}) => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/chat/";
  return (
    <Button
      variant="ghost"
      className="text-black text-xl border-2 border-black py-6 border-opacity-70"
      onClick={() => signIn("google", { callbackUrl: callbackUrl })}
    >
      <FcGoogle className="mr-2 w-10 h-10" />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
