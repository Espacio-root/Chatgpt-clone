"use client";

import { OpenAiLogo } from "@/components/Icons";
import Button from "@/components/ui/Button";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const { data: session } = useSession({ required: false });
  const { push } = useRouter();
  if (session) {
    push("/chat");
  }
  const handleClick = () => {
    push("/auth?callbackUrl=/chat");
  };

  return (
    <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center">
      <OpenAiLogo />
      <h1 className="text-md">Welcome to ChatGPT</h1>
      <h1 className="text-md -mt-2">
        Log in with your OpenAI account to continue
      </h1>
      <div className="flex gap-4">
        <Button className="bg-green-600" onClick={handleClick}>
          Log in
        </Button>
        <Button className="bg-green-600" onClick={handleClick}>
          Sign up
        </Button>
      </div>
      <div className="absolute bottom-4 flex justify-center">
        <p className="text-xs text-gray-400">Terms of use</p>
        <p className="text-xs text-gray-400 ml-2 mr-2">|</p>
        <p className="text-xs text-gray-400">Privacy policy</p>
      </div>
    </div>
  );
};

export default Home;
