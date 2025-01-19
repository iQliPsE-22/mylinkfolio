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
      x: -1,
      y: 1,
      html2canvas: { scale: 0.15 }, // Adjust scale if needed
    });
  };
  const styles = {
    page: {
      padding: "20mm",
      margin: "0 auto",
      backgroundColor: "white",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      fontSize: "16pt",
      lineHeight: "1.4",
      color: "#333",
    },
    header: {
      textAlign: "center",
      marginBottom: "3mm",
    },
    h1: {
      fontSize: "20pt",
      fontWeight: "bold",
      margin: "0 0 2mm 0",
    },
    h2: {
      fontSize: "18pt",
      fontWeight: "bold",
      borderBottom: "1px solid #333",
      marginBottom: "2mm",
      paddingBottom: "2mm",
    },
    h3: {
      fontSize: "16pt",
      fontWeight: "bold",
      margin: "0 0 1mm 0",
    },
    p: {
      fontSize: "16pt",
    },
    section: {
      marginBottom: "5mm",
    },
    ul: {
      fontSize: "16pt",
      marginTop: "2mm",
      marginBottom: "2mm",
      paddingLeft: "5mm",
      listStyleType: "disc",
    },
    li: {
      marginBottom: "1mm",
    },
    link: {
      color: "#1154cc",
      textDecoration: "none",
    },
    experienceItem: {
      marginBottom: "3mm",
    },
    projectItem: {
      marginBottom: "3mm",
    },
    educationItem: {
      marginBottom: "2mm",
      fontSize: "16pt",
    },
    skillCategory: {
      fontWeight: "bold",
    },
  };

  return (
    <UserProvider>
      <Provider>
        <section className="w-full flex flex-col justify-center p-8 text-sm ">
          <div style={styles.page} className="pdf-content block">
            <header style={styles.header}>
              <h1
                style={styles.h1}
              >{`${user?.firstName.toUpperCase()} ${user?.lastName.toUpperCase()}`}</h1>
              <p>
                {user?.email} | {user?.phone} |{" "}
                <span style={styles.link}>{user?.linkedin}</span> |{" "}
                <span style={styles.link}>{user?.github}</span>
              </p>
            </header>

            <section style={styles.section}>
              <h2 style={styles.h2}>EXPERIENCE</h2>
              {experience.map((exp, index) => (
                <div key={index} style={styles.experienceItem}>
                  <h3 style={styles.h3}>
                    {`${exp.role} | ${exp.organization} | ${exp.location} | ${exp.start} – ${exp.end}`}
                  </h3>
                  <ul style={styles.ul}>
                    <li style={styles.li}>{exp.point1}</li>
                    <li style={styles.li}>{exp.point2}</li>
                    <li style={styles.li}>{exp.point3}</li>
                  </ul>
                </div>
              ))}
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>TECHNICAL SKILLS</h2>
              {skills.map((skill, index) => (
                <p key={index} style={styles.p}>
                  <span style={styles.skillCategory}>{skill.category}:</span>{" "}
                  {skill.name}
                </p>
              ))}
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>PROJECTS</h2>
              {projects.map((project, index) => (
                <div key={index} style={styles.projectItem}>
                  <h3 style={styles.h3}>
                    <a href={project.link} style={styles.link}>
                      {project.name}
                    </a>
                    <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                      {" "}
                      ({project.description})
                    </span>
                  </h3>
                  <ul style={styles.ul}>
                    <li style={styles.li}>{project.point1}</li>
                    <li style={styles.li}>{project.point2}</li>
                    {project.point3 && (
                      <li style={styles.li}>{project.point3}</li>
                    )}
                  </ul>
                </div>
              ))}
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>EDUCATION</h2>
              {education.map((edu, index) => (
                <div key={index} style={styles.educationItem}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>{edu.school}</strong>
                    <span>{edu.location}</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
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
          </div>
          <Heading size="sm" className="pt-4 pb-4 lg:hidden">
            Your ATS Friendly Resume is Ready to Download!
          </Heading>
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
