import React, { useState, useEffect } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useUser } from "../app/userContext";
import CertificateForm from './CertificateForm';

const Certificates = () => {
  const { user, setUser } = useUser();
  const [forms, setForms] = useState(user?.certificates || []);

  useEffect(() => {
    if (user?.certificates) {
      setForms(user.certificates);
    }
  }, [user?.certificates]);

  const addForm = () => {
    const newForm = {
      name: "",
      description: "",
      point1: "",
      point2: "",
      point3: "",
    };
    setForms([...forms, newForm]);
    setUser({ ...user, certificates: [...forms, newForm] });
  };

  const deleteForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    setUser({ ...user, certificate: updatedForms });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Heading>Certificates Information</Heading>
      <Text fontSize="sm" color="fg.muted">
        Before Proceeding, We need some Info!
      </Text>
      {forms.map((certificate, index) => (
        <div
          key={index}
          className="p-2 w-full lg:w-3/4 flex flex-col items-center justify-center"
        >
          <CertificateForm heading={`${index + 1}`} data={certificate} index={index} />
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
        Add certificate +
      </Button>
    </div>
  );
};

export default Certificates;
