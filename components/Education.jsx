import React, { useState, useEffect } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import EducationForm from "./EducationForm";
import { useUser } from "../app/userContext";

const Education = () => {
  const { user, setUser } = useUser();
  const [forms, setForms] = useState(user?.education || []);

  useEffect(() => {
    if (user?.education) {
      setForms(user.education);
    }
  }, [user?.education]);

  const addForm = () => {
    const newForm = {
      school: "",
      degree: "",
      stream: "",
      grade: "",
      start: "",
      end: "",
      location: "",
    };
    setForms([...forms, newForm]);
    setUser({ ...user, education: [...forms, newForm] });
  };

  const deleteForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    setUser({ ...user, education: updatedForms });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Heading>Educational Information</Heading>
      <Text fontSize="sm" color="fg.muted">
        Before Proceeding, We need some Info!
      </Text>
      {forms.map((education, index) => (
        <div
          key={index}
          className="p-2 flex flex-col items-center justify-center"
        >
          <EducationForm
            heading={`${index + 1}`}
            data={education}
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
      <Button
        variant="solid"
        colorScheme="blue"
        onClick={addForm}
        className="m-2"
      >
        Add Education +
      </Button>
    </div>
  );
};

export default Education;
