"use client";
import { useState } from "react";
import { Stack, Input, Button, Heading, HStack } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useUser } from "../app/userContext";

const ProjectForm = ({ heading, index }) => {
  const { user, setUser } = useUser();
  const existingProjects = user?.project?.[index] || {};

  const [projectInfo, setProjectInfo] = useState({
    name: existingProjects.name || "",
    description: existingProjects.description || "",
    point1: existingProjects.point1 || "",
    point2: existingProjects.point2 || "",
    point3: existingProjects.point3 || "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedProject = [...(user?.project || [])];
    updatedProject[index] = projectInfo;

    setUser({ ...user, project: updatedProject });
    console.log("Updated project:", updatedProject);
  };

  return (
    <form
      className="h-fit p-8 pb-4 w-full flex flex-col items-center justify-center space-y-4"
      onSubmit={handleFormSubmit}
    >
      <Heading>{`Project ${heading}`}</Heading>
      <Field label="Project Name" required>
        <Input
          placeholder="Enter Your Project Name"
          value={projectInfo.name}
          onChange={(e) =>
            setProjectInfo({ ...projectInfo, name: e.target.value })
          }
        />
      </Field>
      <Field
        label="Short Description"
        required
        helperText="Write a short description of project in a single line"
      >
        <Input
          placeholder="Description"
          value={projectInfo.description}
          onChange={(e) =>
            setProjectInfo({ ...projectInfo, description: e.target.value })
          }
        />
      </Field>
      <Field label="Point 1" required>
        <Input
          placeholder="Bullet Point"
          value={projectInfo.point1}
          onChange={(e) =>
            setProjectInfo({ ...projectInfo, point1: e.target.value })
          }
        />
      </Field>
      <Field label="Point 2" required>
        <Input
          placeholder="Bullet Point"
          value={projectInfo.point2}
          onChange={(e) =>
            setProjectInfo({ ...projectInfo, point2: e.target.value })
          }
        />
      </Field>
      <Field label="Point 3">
        <Input
          placeholder="Bullet Point"
          value={projectInfo.point3}
          onChange={(e) =>
            setProjectInfo({ ...projectInfo, point3: e.target.value })
          }
        />
      </Field>
      <Button type="submit" variant="solid" colorScheme="blue" w="50%">
        Save
      </Button>
    </form>
  );
};

export default ProjectForm;
