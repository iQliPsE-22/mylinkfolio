"use client";
import { useState } from "react";
import { Stack, Input, Button, Heading, HStack } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useUser } from "../app/userContext";

const ExperienceForm = ({ heading, index }) => {
  const { user, setUser } = useUser();
  const existingExperience = user?.experience?.[index] || {};

  const [experienceInfo, setExperienceInfo] = useState({
    organization: existingExperience.organization || "",
    role: existingExperience.role || "",
    start: existingExperience.start || "",
    end: existingExperience.end || "",
    location: existingExperience.location || "",
    point1: existingExperience.point1 || "",
    point2: existingExperience.point2 || "",
    point3: existingExperience.point3 || "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedExperience = [...(user?.experience || [])];
    updatedExperience[index] = experienceInfo;

    setUser({ ...user, experience: updatedExperience });
    console.log("Updated experience:", updatedExperience);
  };

  return (
    <form
      className="h-fit p-8 pb-4 w-full flex flex-col items-center justify-center space-y-4"
      onSubmit={handleFormSubmit}
    >
      <Heading>{`Experience ${heading}`}</Heading>
      <Field label="Organization" required>
        <Input
          placeholder="Enter Your Organization Name"
          value={experienceInfo.organization}
          onChange={(e) =>
            setExperienceInfo({
              ...experienceInfo,
              organization: e.target.value,
            })
          }
        />
      </Field>
      <Field label="Role/Designation" required>
        <Input
          placeholder="Role/Designation"
          value={experienceInfo.role}
          onChange={(e) =>
            setExperienceInfo({ ...experienceInfo, role: e.target.value })
          }
        />
      </Field>
      <HStack spacing={4} w="100%">
        <Field label="Start Year" required>
          <Input
            placeholder="Start Year"
            value={experienceInfo.start}
            onChange={(e) =>
              setExperienceInfo({ ...experienceInfo, start: e.target.value })
            }
          />
        </Field>
        <Field label="End Year" required>
          <Input
            placeholder="End Year"
            value={experienceInfo.end}
            onChange={(e) =>
              setExperienceInfo({ ...experienceInfo, end: e.target.value })
            }
          />
        </Field>
      </HStack>
      <Field
        label="Location"
        required
        helperText="Your School/College Location"
      >
        <Input
          placeholder="Location"
          value={experienceInfo.location}
          onChange={(e) =>
            setExperienceInfo({ ...experienceInfo, location: e.target.value })
          }
        />
      </Field>
      <Field label="Point 1" required>
        <Input
          placeholder="Bullet Point"
          value={experienceInfo.point1}
          onChange={(e) =>
            setExperienceInfo({ ...experienceInfo, point1: e.target.value })
          }
        />
      </Field>
      <Field label="Point 2" required>
        <Input
          placeholder="Bullet Point"
          value={experienceInfo.point2}
          onChange={(e) =>
            setExperienceInfo({ ...experienceInfo, point2: e.target.value })
          }
        />
      </Field>
      <Field label="Point 3" required>
        <Input
          placeholder="Bullet Point"
          value={experienceInfo.point3}
          onChange={(e) =>
            setExperienceInfo({ ...experienceInfo, point3: e.target.value })
          }
        />
      </Field>

      <Button type="submit" variant="solid" colorScheme="blue" w="50%">
        Save
      </Button>
    </form>
  );
};
export default ExperienceForm;
