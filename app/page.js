import Image from "next/image";
import { Heading, Stack } from "@chakra-ui/react";
import { Button } from "./../components/ui/button";
import Link from 'next/link';
export default function Home() {
  return (
    <main className="h-dvh flex flex-col">
      <section className="h-[90%] flex items-center justify-center">
        <div className="flex flex-col p-16 items-center justify-center bg-white rounded text-black">
          <Heading className="p-4">
            Let's Make your ATS Friendly Resume!
          </Heading>
          <Button variant="solid" className="bg-[#0f0f0f] text-[#fff] w-1/3">
            <Link href="/signup">Let's Go</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
