import GoogleLoginButton from "@/components/GoogleLoginButton";
import { OpenAiLogo } from "@/components/Icons";
import Button from "@/components/ui/Button";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="absolute inset-0 bg-white text-black">
      <div className="w-full h-full my-4 grid grid-rows-3 justify-center">
        <OpenAiLogo className="justify-self-center" />
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl font-extrabold">Welcome back</h1>
          <GoogleLoginButton />
        </div>
      </div>
    </main>
  );
};

export default page;
