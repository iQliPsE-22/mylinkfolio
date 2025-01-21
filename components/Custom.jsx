import React from "react";
import { Heading } from "@chakra-ui/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Custom = ({ setFakeLoading }) => {
  const router = useRouter();
  const handleClick = () => {
    setFakeLoading(true);
    setTimeout(() => {
      router.push("/signup");
    }, 2000);
  };

  return (
    <div className="bg-white p-6 lg:p-16 w-full lg:w-1/2 rounded-lg shadow-lg mt-8 text-black">
      <section className="w-full flex flex-col items-center justify-center ">
        <Heading className="text-lg lg:text-xl p-4 tracking-wide">
          Transform your <span className="text-[#405dbb]">RESUME</span>
        </Heading>
        <p className="text-center mb-4">
          Build a modern, professional resume in minutes. Tailored for your
          needs.
        </p>
        <Button
          size="xl"
          className="w-48"
          variant="outline"
          className="text-black hover:text-white bg-#0f0f0f"
          onClick={handleClick}
        >
          Let&apos;s Go
        </Button>
      </section>
      <h2 className="quicksand text-2xl lg:text-4xl font-bold text-[#474747] text-center pt-5  pb-5">
        Make a <span className="text-[#405dbb] font-semibold">LINKFOLIO</span>
      </h2>
    </div>
  );
};

export default Custom;
