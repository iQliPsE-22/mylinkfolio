"use client";
import React, { useState } from "react";
import { useUser } from "../app/userContext";
import { Input, Button, Heading } from "@chakra-ui/react";
import { Field } from "./ui/field";

const SkillsForm = ({ heading, data, index }) => {
  const { user, setUser } = useUser();
  const [skillInfo, setSkillInfo] = useState({
    category: data.category || "",
    name: data.name || "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedSkills = [...(user?.skills || [])];
    updatedSkills[index] = skillInfo;

    setUser({ ...user, skills: updatedSkills });
    console.log("Updated skills:", updatedSkills);
  };

  return (
    <form
      className="h-fit p-8 pb-4 w-full flex flex-col items-center justify-center space-y-4"
      onSubmit={handleFormSubmit}
    >
      <Heading>{heading}</Heading>
      <Field label="Skill Category" required>
        <Input
          placeholder="Enter Skill Category"
          value={skillInfo.category}
          onChange={(e) =>
            setSkillInfo({ ...skillInfo, category: e.target.value })
          }
        />
      </Field>
      <Field label="Skill Name" required>
        <Input
          placeholder="Enter Skill Name"
          value={skillInfo.name}
          onChange={(e) => setSkillInfo({ ...skillInfo, name: e.target.value })}
        />
      </Field>

      <Button type="submit" colorScheme="teal">
        Save
      </Button>
    </form>
  );
};

export default SkillsForm;
