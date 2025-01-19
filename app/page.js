"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Box, Field, Input, defineStyle, Heading } from "@chakra-ui/react";
import { Button } from "./../components/ui/button";
import { useRouter } from "next/navigation";
import Custom from "./../components/Custom";

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "#8eaccd",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "#f0f0f0",
    top: "3",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});

const handleformSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await fetch(
      "http://localhost:5000/api/linkedin/get-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: link }),
      }
    );
    const data = await response.json();
    setLoading(false);
    setLinkedinData(data);
    console.log(data);
    if (linkedinData) {
      router.push("/portfolio");
    }
  } catch (err) {
    console.log(err);
  }
  console.log(link);
};

export default function Home() {
  const router = useRouter();
  const { linkedinData, setLinkedinData } = useState();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-dvh pb-8">
      <h1 className="quicksand text-lg wider lg:text-3xl font-bold text-[#f0f0f0] text-center mt-8 tracking-wider">
        Link. Generate. Shine
      </h1>
      <h2 className="quicksand text-xl lg:text-4xl font-bold text-[#474747] text-center pt-3 p-8">
        Make a <span className="text-[#405dbb] font-semibold">LINKFOLIO</span>
      </h2>
      <main className="w-full flex flex-col lg:flex-row items-center justify-center p-8 gap-4">
        <div className="bg-[#8EACCD] p-6 lg:p-12 w-11/12 lg:w-1/2 rounded-lg mt-8 flex flex-col items-center justify-center shadow shadow-xl">
          <section className="w-full flex flex-col items-center justify-center pb-8">
            <Heading className="text-lg lg:text-xl p-4 tracking-wide">
              Fetch Your Details From{" "}
              <span className="text-[#405dbb]">LINKEDIN</span>
            </Heading>
            <form
              className="w-full p-2 flex justify-center lg:flex-row flex-col items-center gap-4"
              onSubmit={handleformSubmit}
            >
              <Field.Root>
                <Box pos="relative" w="full">
                  <Input
                    placeholder=""
                    css={{ "--error-color": "green" }}
                    className="peer p-6 text-black"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <Field.Label css={floatingStyles}>
                    Enter LinkedIn Profile Link
                  </Field.Label>
                </Box>
              </Field.Root>

              <button
                type="button"
                className="bg-[#405dbb] hover:bg-[#2e4387] text-white rounded-md h-12 w-1/2 lg:w-1/4"
                onClick={() => setLoading(true)}
              >
                {!loading ? "Generate" : "Generating..."}
              </button>
            </form>
          </section>
        </div>

        <Custom />
      </main>
    </div>
  );
}
