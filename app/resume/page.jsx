"use client";
import Head from "next/head";
import { useUser } from "../userContext";
import { UserProvider } from "../userContext";
import Link from "next/link";
import { HStack } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Provider } from "./../../components/ui/provider";
import { Button } from "./../../components/ui/button";
const Page = () => {
  const { user } = useUser();
  console.log(user);
  const experience = user?.experience || [];
  const education = user?.education || [];
  const certificates = user?.certificates || [];
  const projects = user?.project || [];

  const downloadPDF = async () => {
    const section = document.querySelector(".pdf-content"); // Target the div
    if (!section) return;

    const canvas = await html2canvas(section, { scale: 2 }); // Higher scale for better quality
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${user?.firstName || "Resume"}.pdf`); // Download as PDF
  };

  return (
    <UserProvider>
      <Provider>
        <section className="w-full flex justify-center p-8 text-xs">
          <div
            className="pdf-content bg-white text-black pl-10 p-8 font-arial"
            style={{ width: "210mm", minHeight: "297mm" }}
          >
            <Head>
              <title>{`${user?.firstName?.toUpperCase() || ""} ${
                user?.lastName?.toUpperCase() || ""
              } Resume`}</title>
            </Head>

            <header className="pb-4 text-center">
              <h1 className="text-xl font-bold">
                {`${user?.firstName?.toUpperCase() || ""} ${
                  user?.lastName?.toUpperCase() || ""
                }`}
              </h1>
              <p className="">
                {user?.email || "N/A"} | {user?.phone || "N/A"} |{" "}
                {user?.linkedin && (
                  <Link href={user.linkedin} className="text-blue-500">
                    LinkedIn
                  </Link>
                )}{" "}
                |{" "}
                {user?.github && (
                  <Link href={user.github} className="text-blue-500">
                    Gitub
                  </Link>
                )}
              </p>
            </header>

            {experience.length > 0 && (
              <section className="mb-2">
                <h2 className=" font-bold border-b-2 mb-2 text-sm">
                  EXPERIENCE
                </h2>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <h3 className="font-semibold">
                      {`${exp.role || ""} | ${exp.organization || " "}`} |
                      {` ${exp.location || "N/A"} | ${exp.start || "N/A"} - ${
                        exp.end
                      }`}
                    </h3>
                    <ul className="list-disc pl-6 text-justify">
                      <li>{exp.point1}</li>
                      <li>{exp.point2}</li>
                      <li>{exp.point3}</li>
                    </ul>
                  </div>
                ))}
              </section>
            )}

            <section className="mb-2">
              <h2 className=" font-bold border-b-2 mb-2 text-sm">
                TECHNICAL SKILLS
              </h2>

              {user.skills.map((skill, index) => (
                <p key={index}>
                  <strong>{skill.category}:</strong> {skill.name || "N/A"}
                </p>
              ))}
            </section>

            {projects.length > 0 && (
              <section className="mb-2">
                <h2 className="font-bold border-b-2 mb-2 text-sm">PROJECTS</h2>
                {projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-blue-500">
                      {project.name || " "}{" "}
                      <span className="italic text-black">
                        {" "}
                        ({project.description || " "} )
                      </span>
                    </h3>
                    <ul className="list-disc pl-6 text-justify">
                      <li>{project.point1}</li>
                      <li>{project.point2}</li>
                      {project.point3 && <li>{project.point3}</li>}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {education.length > 0 && (
              <section className="mb-2">
                <h2 className=" font-bold border-b-2 mb-2 text-sm">
                  EDUCATION
                </h2>
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex flex-row justify-between">
                      <strong>{edu.school}</strong>
                      <p>{edu.location}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>
                        {edu.degree} (
                        {edu.grade.includes("%")
                          ? `Percentage: ${edu.grade}`
                          : `GPA: ${edu.grade}`}
                        )
                      </p>
                      ({edu.start}-{edu.end})
                    </div>
                  </div>
                ))}
              </section>
            )}

            {certificates.length > 0 && (
              <section>
                <h2 className=" font-bold border-b-2 mb-2 text-sm">
                  CERTIFICATIONS
                </h2>
                <ul className="list-disc pl-6 text-justify	">
                  {certificates.map((cert, index) => (
                    <li key={index}>
                      <strong>
                        {cert.org} [{cert.name}]:
                      </strong>{" "}
                      {cert.description}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <Button onClick={downloadPDF} colorPaletter={"red"}>
            Download
          </Button>
        </section>
      </Provider>
    </UserProvider>
  );
};

export default Page;
