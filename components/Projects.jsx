import React, { useState, useEffect } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useUser } from "../app/userContext";
import ProjectForm from "./ProjectForm";

const Projects = () => {
  const { user, setUser } = useUser();
  const [forms, setForms] = useState(user?.project || []);

  useEffect(() => {
    if (user?.project) {
      setForms(user.project);
    }
  }, [user?.project]);

  const addForm = () => {
    const newForm = {
      name: "",
      description: "",
      point1: "",
      point2: "",
      point3: "",
    };
    setForms([...forms, newForm]);
    setUser({ ...user, project: [...forms, newForm] });
  };

  const deleteForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    setUser({ ...user, project: updatedForms });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Heading>Project Information</Heading>
      <Text fontSize="sm" color="fg.muted">
        Before Proceeding, We need some Info!
      </Text>
      {forms.map((project, index) => (
        <div
          key={index}
          className="p-2 w-full lg:w-3/4 flex flex-col items-center justify-center"
        >
          <ProjectForm heading={`${index + 1}`} data={project} index={index} />
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
        Add project +
      </Button>
    </div>
  );
};

export default Projects;
