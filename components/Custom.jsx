import React from "react";
import { Heading } from '@chakra-ui/react';
import { Button } from './ui/button';
import Link from 'next/link';
const Custom = () => {
  return (
    <div className="bg-[#8EACCD] p-8 lg:p-14 w-11/12 lg:w-1/2 rounded-lg mt-8 flex flex-col items-center justify-center shadow shadow-xl">
      <section className="w-full flex flex-col items-center justify-center pb-8">
        <Heading className="text-lg lg:text-xl p-4 tracking-wide">
          Transform your <span className="text-[#405dbb]">RESUME</span>
        </Heading>
        <Link href="signup">
          <Button size="xl" className="w-48">
            Let&apos;s Go
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Custom;
