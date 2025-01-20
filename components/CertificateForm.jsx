"use client";
import { useState } from "react";
import { Stack, Input, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useUser } from "../app/userContext";
import Certificates from "./Certificates";
import { Tooltip } from "./ui/tooltip";
import { CiCircleInfo } from "react-icons/ci";

const CertificateForm = ({ heading, index }) => {
  const { user, setUser } = useUser();
  const existingCertificates = user?.certificates?.[index] || {};

  const [certificateInfo, setCertificateInfo] = useState({
    name: existingCertificates.name || "",
    description: existingCertificates.description || "",
    org: existingCertificates.org || "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedCertificates = [...(user?.certificates || [])];
    updatedCertificates[index] = certificateInfo;

    setUser({ ...user, certificates: updatedCertificates });
    console.log("Updated certificates:", updatedCertificates);
  };

  const countWords = (text) => {
    return text.length;
  };

  return (
    <form
      className="h-fit p-8 pb-4 w-full flex flex-col items-center justify-center space-y-4"
      onSubmit={handleFormSubmit}
    >
      <Heading>{`Certificate ${heading}`}</Heading>
      <Field label="Certificate Name" required>
        <Input
          placeholder="Enter Your Certificate Name"
          value={certificateInfo.name}
          onChange={(e) =>
            setCertificateInfo({ ...certificateInfo, name: e.target.value })
          }
        />
      </Field>
      <Field label="Organization" required>
        <Input
          placeholder="Organization"
          value={certificateInfo.org}
          onChange={(e) =>
            setCertificateInfo({ ...certificateInfo, org: e.target.value })
          }
        />
      </Field>

      <Field
        label="Short Description"
        required
        helperText="Write a short description of Credential in a single line"
      >
        <Input
          placeholder="Description"
          value={certificateInfo.description}
          onChange={(e) =>
            setCertificateInfo({
              ...certificateInfo,
              description: e.target.value,
            })
          }
        />

        <Text mt={2} color="gray.500" className="flex flex-row items-center">
          Count:{" "}
          {countWords(
            certificateInfo.description +
              certificateInfo.name +
              certificateInfo.org
          )}
          <Tooltip
            showArrow
            content="Suggestion: We suggest Maximum 100 Characters."
            openDelay={100}
            closeDelay={100}
          >
            <Button variant="filled" size="lg" className="rounded-full">
              <CiCircleInfo />
            </Button>
          </Tooltip>
        </Text>
      </Field>

      <Button type="submit" variant="solid" colorScheme="blue" w="50%">
        Save
      </Button>
    </form>
  );
};
export default CertificateForm;
