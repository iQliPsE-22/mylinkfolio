"use client";
import Head from "next/head";
import { useUser } from "../userContext";
import { UserProvider } from "../userContext";
import Link from "next/link";
import { HStack, Heading } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import { Provider } from "./../../components/ui/provider";
import { Button } from "./../../components/ui/button";
const Page = () => {
  const { user } = useUser();
  console.log(user);
  const experience = user?.experience || [];
  const education = user?.education || [];
  const certificates = user?.certificates || [];
  const skills = user?.skills || [];
  const projects = user?.project || [];
  const downloadPDF = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const content = document.querySelector(".pdf-content");

    pdf.html(content, {
      callback: (doc) => {
        doc.save(`${user?.firstName || "resume"}.pdf`);
      },
      x: 0,
      y: 0,
      html2canvas: { scale: 0.27 }, // Adjust scale if needed
    });
  };
  const styles = {
    page: {
      // height: "297mm",
      width: "210mm",
      padding: "8mm",
      paddingBottom: "4mm",
      paddingLeft: "12mm",
      paddingRight: "12mm",
      margin: "0 auto",
      backgroundColor: "#f0f0f0",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      fontSize: "10pt",
      lineHeight: "1.3",
      color: "#333",
    },
    header: {
      textAlign: "center",
      marginBottom: "1mm",
    },
    h1: {
      fontSize: "14pt",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "11pt",
      fontWeight: "bold",
      borderBottom: "1px solid #333",
      marginBottom: "1mm",
      paddingBottom: "2mm",
    },
    h3: {
      fontSize: "10pt",
      fontWeight: "bold",
    },
    p: {
      fontSize: "10pt",
      margin: "0 0 0 0",
    },
    section: {
      marginBottom: "2mm",
      paddingLeft: "1mm",
      paddingRight: "1mm",
    },
    ul: {
      fontSize: "10pt",
      paddingLeft: "4mm",
      textAlign: "justify",
      listStyleType: "disc",
    },
    li: {
      marginBottom: "1mm",
      padding: "0 0 0 0",
      textAlign: "justify",
    },
    link: {
      color: "#1154cc",
      textDecoration: "none",
    },
    experienceItem: {
      marginBottom: "2mm",
    },
    projectItem: {
      marginBottom: "2mm",
    },
    educationItem: {
      marginBottom: "2mm",
      fontSize: "10pt",
    },
    skillCategory: {
      fontWeight: "bold",
    },
  };

  return (
    <UserProvider>
      <Provider>
        <section className="w-full flex lg:flex-row flex-col justify-center lg:p-8 mb-4">
          <main className="w-full p-8 overflow-scroll lg:overflow-hidden">
            <div style={styles.page} className="pdf-content">
              <header style={styles.header}>
                <h1 style={styles.h1}>{`${user?.fullName.toUpperCase()}`} </h1>
                <p>
                  {user?.email} | {user?.phone}
                  {user?.linkedin && (
                    <>
                      {" | "}
                      <span style={styles.link}>{user?.linkedin}</span>
                    </>
                  )}
                  {user?.github && (
                    <>
                      {" | "}
                      <span style={styles.link}>{user?.github}</span>
                    </>
                  )}
                </p>
              </header>

              {experience.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.h2}>EXPERIENCE</h2>
                  {experience.map((exp, index) => (
                    <div key={index} style={styles.experienceItem}>
                      <h3 style={styles.h3}>
                        {`${exp.role} | ${exp.organization} | ${exp.location} | ${exp.start} – ${exp.end}`}
                      </h3>
                      <ul style={styles.ul}>
                        {exp.point1 && <li style={styles.li}>{exp.point1}</li>}
                        {exp.point2 && <li style={styles.li}>{exp.point2}</li>}
                        {exp.point3 && <li style={styles.li}>{exp.point3}</li>}
                      </ul>
                    </div>
                  ))}
                </section>
              )}

              {skills.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.h2}>TECHNICAL SKILLS</h2>
                  {skills.map((skill, index) => (
                    <p key={index} style={styles.p}>
                      <span style={styles.skillCategory}>
                        {skill.category}:
                      </span>{" "}
                      {skill.name}
                    </p>
                  ))}
                </section>
              )}

              {projects.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.h2}>PROJECTS</h2>
                  {projects.map((project, index) => (
                    <div key={index} style={styles.projectItem}>
                      <h3 style={styles.h3}>
                        <a href={project.link} style={styles.link}>
                          {project.name}
                        </a>
                        <span
                          style={{ fontStyle: "italic", fontWeight: "bold" }}
                        >
                          {" "}
                          ({project.description})
                        </span>
                      </h3>
                      <ul style={styles.ul}>
                        {project.point1 && (
                          <li style={styles.li}>{project.point1}</li>
                        )}
                        {project.point2 && (
                          <li style={styles.li}>{project.point2}</li>
                        )}
                        {project.point3 && (
                          <li style={styles.li}>{project.point3}</li>
                        )}
                      </ul>
                    </div>
                  ))}
                </section>
              )}

              {education.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.h2}>EDUCATION</h2>
                  {education.map((edu, index) => (
                    <div key={index} style={styles.educationItem}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong>{edu.school}</strong>
                        <span>{edu.location}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          {edu.degree} (
                          {edu.grade.includes("%")
                            ? `Percentage: ${edu.grade}`
                            : `GPA: ${edu.grade}`}
                          )
                        </span>
                        <span>
                          ({edu.start}-{edu.end})
                        </span>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {certificates.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.h2}>CERTIFICATIONS</h2>
                  <ul style={styles.ul}>
                    {certificates.map((cert, index) => (
                      <li key={index} style={styles.li}>
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
            <Heading size="sm" className="pt-4 pb-4 lg:hidden">
              Your ATS Friendly Resume is Ready to Download!
            </Heading>
          </main>
          <Button
            colorPalette="teal"
            size="xl"
            variant="solid"
            onClick={downloadPDF}
          >
            Download
          </Button>
        </section>
      </Provider>
    </UserProvider>
  );
};

export default Page;
