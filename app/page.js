"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Field,
  Input,
  defineStyle,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Button } from "./../components/ui/button";
import { useRouter } from "next/navigation";
import Custom from "./../components/Custom";
import { useUser } from "./userContext.jsx";
import Loading from './../components/Loading';
import Features from './../components/Features';

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "fg",
  px: "0.5",
  top: "3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "#474757",
    top: "3.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "bg.muted",
    top: "-3",
    insetStart: "2",
  },
});

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [linkedinData, setLinkedinData] = useState(null);
  const [userUrl, setUserUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fakeLoading,setFakeLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchUserData = async () => {
    setLoading(true);
    const url = `https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile?linkedin_url=${userUrl}%2F&include_skills=false&include_certifications=true&include_publications=false&include_honors=false&include_volunteers=false&include_projects=true&include_patents=false&include_courses=false&include_organizations=false&include_profile_status=false&include_company_public_url=false`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a3ecef6823msh7a112161d1b16cep1ef573jsndc3ab7a2a9dd",
        "x-rapidapi-host": "fresh-linkedin-profile-data.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setLinkedinData(data.data);
      const fetchedData = data.data;
      const fetchedEducations = fetchedData.educations.map((item) => ({
        school: item.school || "",
        degree: item.degree || "",
        stream: item.field_of_study || "",
        grade: item.activities.replace("Grade: ", "") || "",
        start: `${item.start_month || ""} ${item.start_year || ""}`.trim(),
        end: `${item.end_month || ""} ${item.end_year || ""}`.trim(),
        location: "",
      }));

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const fetchedExperiences = fetchedData.experiences.map((item) => ({
        organization: item.company || "",
        role: item.title || "",
        start: `${item.start_month ? monthNames[item.start_month - 1] : ""} ${
          item.start_year || ""
        }`.trim(),
        end: `${item.end_month ? monthNames[item.end_month - 1] : ""} ${
          item.end_year || ""
        }`.trim(),
        location: item.location || "",
        point1: item.description.split(".")[0] || "",
        point2: item.description.split(".")[1] || "",
        point3: item.description.split(".")[2] || "",
      }));

      const fetchedCertificates = fetchedData.certifications.map((item) => ({
        name: item.name || "",
        org: item.authority || "",
        description: item.description || "",
      }));

      const fetchedProjects = fetchedData.projects.map((item) => ({
        name: item.name || "",
        description: item.description || "",
      }));
      setUser({
        fullName: fetchedData?.full_name || "",
        email: fetchedData?.email || "",
        phone: fetchedData?.phone || "",
        github: fetchedData?.github || "",
        linkedin: fetchedData?.linkedin_url || "",
        education: fetchedEducations || "",
        experience: fetchedExperiences || "",
        certificates: fetchedCertificates || "",
        project: fetchedProjects || "",
      });
      console.log(user);
      router.push("/signup");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pb-8 bg-gradient-to-b from-[#405dbb] to-[#8EACCD] text-white">
      {/* Hero Section */}
      <header className="w-full text-center py-10">
        <h1 className="quicksand text-4xl lg:text-5xl font-bold mb-4">
          Your Professional Journey Starts Here
        </h1>
        <p className="text-md lg:text-xl w-full lg:max-w-3xl mx-auto text-[#474757]">
          Transform your LinkedIn profile into a stunning resume with just one
          click. Showcase your skills, experience, and projects effortlessly.
        </p>
      </header>

      {/* Main Content */}
      <main className="min-h-dvh flex flex-col lg:flex-row items-start justify-center w-full pb-8 px-6 gap-10">
        {/* Fetch Section */}
        {loading ? (
          <Loading/>
        ) : (
          <div className="bg-white p-6 lg:p-16 w-full lg:w-1/2 rounded-lg shadow-lg mt-8 text-black">
            <section className="w-full flex flex-col items-center justify-center pb-8">
              <Heading className="text-lg lg:text-xl p-4 tracking-wide">
                Fetch Your Details From{" "}
                <span className="text-[#405dbb]">LinkedIn</span>
              </Heading>
              {error && <Text className="text-red-500">{error}</Text>}
              <form
                className="w-full flex flex-col lg:flex-row items-center gap-4 mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFetchUserData();
                }}
              >
                <Field.Root>
                  <Box pos="relative" w="full">
                    <Input
                      placeholder=""
                      className="peer p-6 text-black border border-gray-300 rounded-md"
                      value={userUrl}
                      onChange={(e) => setUserUrl(e.target.value)}
                    />
                    <Field.Label css={floatingStyles}>
                      Enter LinkedIn Profile Link
                    </Field.Label>
                  </Box>
                </Field.Root>
                <button
                  type="submit"
                  className="bg-[#405dbb] hover:bg-[#2e4387] text-white rounded-md h-12 px-6"
                >
                  Fetch
                </button>
              </form>
            </section>
            <h1 className="quicksand text-2xl lg:text-4xl font-bold text-[#474747] text-center pt-3 p- pb-5">
              Link. Generate. Shine
            </h1>
          </div>
        )}

        {/* Custom Section */}
        {fakeLoading ? (
          <Loading/>
        ) : (
          <Custom setFakeLoading = {setFakeLoading}/>
        )}
      </main>

      {/* Features Section */}
      <Features/>
    </div>
  );
}
