"use client";
import { useState } from "react";
import { Stack, Input, Button, Heading, Text } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useUser } from "../app/userContext";

const Personal = ({ submit_btn }) => {
  const { user, setUser } = useUser();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("User", user);
    // setUser({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phone: "",
    //   github: "",
    //   linkedin: "",
    // });
  };

  return (
    <form
      className="h-fit p-8 pb-4 w-full flex flex-col items-center justify-center space-y-4"
      onSubmit={handleFormSubmit}
    >
      <Heading>Personal Information</Heading>
      <Text fontSize="sm" color="fg.muted">
        Before Proceeding, We need some Info!
      </Text>
      <Field label="Name" required>
        <Input
          placeholder="Enter your Full Name"
          value={user?.fullName || ""}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        />
      </Field>

      <Field label="Email" required helperText="We'll never share your email.">
        <Input
          placeholder="Enter your email"
          value={user?.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </Field>
      <Field label="Phone" required>
        <Input
          placeholder="Enter your Phone Number"
          value={user?.phone || ""}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </Field>
      <Field label="Github">
        <Input
          placeholder="Enter Github Profile Link"
          value={user?.github || ""}
          onChange={(e) => setUser({ ...user, github: e.target.value })}
        />
      </Field>
      <Field label="Linkedin">
        <Input
          placeholder="Enter Linkedin Profile Link"
          value={user?.linkedin || ""}
          onChange={(e) => setUser({ ...user, linkedin: e.target.value })}
        />
      </Field>

      {submit_btn && (
        <Button type="submit" variant="solid" className="w-1/2 ">
          Submit
        </Button>
      )}
    </form>
  );
};

export default Personal;
