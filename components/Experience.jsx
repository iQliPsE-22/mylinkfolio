import React, { useState, useEffect } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useUser } from "../app/userContext";
import ExperienceForm from "./ExperienceForm";

const Experience = () => {
  const { user, setUser } = useUser();
  const [forms, setForms] = useState(user?.experience || []);

  useEffect(() => {
    if (user?.experience) {
      setForms(user.experience);
    }
  }, [user?.experience]);

  const addForm = () => {
    const newForm = {
      organization: "",
      role: "",
      start:"",
      end:"",
      location:"",
      point1: "",
      point2: "",
      point3: "",
    };
    setForms([...forms, newForm]);
    setUser({ ...user, experience: [...forms, newForm] });
  };

  const deleteForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    setUser({ ...user, experience: updatedForms });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Heading>Experience Information</Heading>
      <Text fontSize="sm" color="fg.muted">
        Before Proceeding, We need some Info!
      </Text>
      {forms.map((_, index) => (
        <div
          key={index}
          className="p-2 w-full lg:w-3/4 flex flex-col items-center justify-center"
        >
          <ExperienceForm heading={`${index + 1}`} index={index} />
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => deleteForm(index)}
          >
            Delete
          </Button>
        </div>
      ))}
      <Button
        variant="solid"
        colorScheme="blue"
        onClick={addForm}
        className="m-2"
      >
        Add Experience +
      </Button>
    </div>
  );
};

export default Experience;
