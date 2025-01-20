"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Box, Field, Input, defineStyle, Heading } from "@chakra-ui/react";
import { Button } from "./../components/ui/button";
import { useRouter } from "next/navigation";
import Custom from "./../components/Custom";
import { useUser } from "./userContext.jsx";
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

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [linkedinData, setLinkedinData] = useState(null);
  const [userUrl, setUserUrl] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

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
              onSubmit={handleFetchUserData}
            >
              <Field.Root>
                <Box pos="relative" w="full">
                  <Input
                    placeholder=""
                    css={{ "--error-color": "green" }}
                    className="peer p-6 text-black"
                    value={userUrl}
                    onChange={(e) => setUserUrl(e.target.value)}
                  />
                  <Field.Label css={floatingStyles}>
                    Enter LinkedIn Profile Link
                  </Field.Label>
                </Box>
              </Field.Root>

              <button
                type="button"
                className="bg-[#405dbb] hover:bg-[#2e4387] text-white rounded-md h-12 w-1/2 lg:w-1/4"
                onClick={handleFetchUserData}
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
