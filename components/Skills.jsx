"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../app/userContext";
import { Stack, Input, Button, Heading, Text } from "@chakra-ui/react";
import SkillsForm from "./SkillsForm";

const Skills = () => {
  const { user, setUser } = useUser();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    if (user?.skills) {
      setForms(user.skills);
    }
  }, [user?.skills]);

  const addForm = () => {
    const newForm = {
      category: "",
      name: "",
      description: "",
    };
    const updatedForms = [...forms, newForm];
    setForms(updatedForms);
    setUser({ ...user, skills: updatedForms });
  };

  const deleteForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    setUser({ ...user, skills: updatedForms });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Heading>Skill Information</Heading>
      <Text fontSize="sm" color="fg.muted">
        Before Proceeding, We need some Info!
      </Text>
      {forms.map((form, index) => (
        <div
          key={index}
          className="p-2 w-full lg:w-3/4 flex flex-col items-center justify-center"
        >
          <SkillsForm
            heading={`Skill ${index + 1}`}
            data={form}
            index={index}
          />
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => deleteForm(index)}
          >
            Delete
          </Button>
        </div>
      ))}
      <Button colorScheme="blue" onClick={addForm} mt={4}>
        Add Skill
      </Button>
    </div>
  );
};

export default Skills;
