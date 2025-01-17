"use client";
import { useState } from "react";
import { Stack, Input, Button, Heading, HStack } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useUser } from "../app/userContext";

const EducationForm = ({ heading, index }) => {
  const { user, setUser } = useUser();
  const existingEducation = user?.education?.[index] || {};

  const [educationInfo, setEducationInfo] = useState({
    school: existingEducation.school || "",
    degree: existingEducation.degree || "",
    stream: existingEducation.stream || "",
    grade: existingEducation.grade || "",
    start: existingEducation.start || "",
    end: existingEducation.end || "",
    location: existingEducation.location || "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedEducation = [...(user?.education || [])];
    updatedEducation[index] = educationInfo;

    setUser({ ...user, education: updatedEducation });
    console.log("Updated Education:", updatedEducation);
  };

  return (
    <form
      className="h-fit p-8 pb-4 w-full flex flex-col items-center justify-center space-y-4"
      onSubmit={handleFormSubmit}
    >
      <Heading>{`Education ${heading}`}</Heading>
      <Field label="School / College" required>
        <Input
          placeholder="Enter Your School / College Name"
          value={educationInfo.school}
          onChange={(e) =>
            setEducationInfo({ ...educationInfo, school: e.target.value })
          }
        />
      </Field>
      <HStack spacing={4} w="100%">
        <Field label="Degree Or Standard" required>
          <Input
            placeholder="Enter Degree / Standard"
            value={educationInfo.degree}
            onChange={(e) =>
              setEducationInfo({ ...educationInfo, degree: e.target.value })
            }
          />
        </Field>
        <Field label="Stream / Domain" required>
          <Input
            placeholder="Enter Stream / Domain"
            value={educationInfo.stream}
            onChange={(e) =>
              setEducationInfo({ ...educationInfo, stream: e.target.value })
            }
          />
        </Field>
      </HStack>
      <Field label="Grade/Percentage" required>
        <Input
          placeholder="Enter your Grade / Percentage"
          value={educationInfo.grade}
          onChange={(e) =>
            setEducationInfo({ ...educationInfo, grade: e.target.value })
          }
        />
      </Field>
      <HStack spacing={4} w="100%">
        <Field label="Start Year" required>
          <Input
            placeholder="Start Year"
            value={educationInfo.start}
            onChange={(e) =>
              setEducationInfo({ ...educationInfo, start: e.target.value })
            }
          />
        </Field>
        <Field label="End Year" required>
          <Input
            placeholder="End Year"
            value={educationInfo.end}
            onChange={(e) =>
              setEducationInfo({ ...educationInfo, end: e.target.value })
            }
          />
        </Field>
      </HStack>
      <Field label="Location" required helperText="Your School/College Location">
        <Input
          placeholder="Location"
          value={educationInfo.location}
          onChange={(e) =>
            setEducationInfo({ ...educationInfo, location: e.target.value })
          }
        />
      </Field>
      <Button type="submit" variant="solid" colorScheme="blue" w="50%">
        Save
      </Button>
    </form>
  );
};

export default EducationForm;
