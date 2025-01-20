"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUserData = localStorage.getItem("userData");
        return storedUserData
          ? JSON.parse(storedUserData)
          : {
              fullName: "",
              email: "",
              phone: "",
              github: "",
              linkedin: "",
              education: [],
              project: [],
              experience: [],
              certificates: [],
              skills: [],
            };
      } catch (error) {
        console.error("Error parsing userData from localStorage", error);
        return {
          fullName: "",
          email: "",
          phone: "",
          github: "",
          linkedin: "",
          education: [],
          project: [],
          experience: [],
          certificates: [],
          skills: [],
        };
      }
    }
    return {
      fullName: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      education: [],
      project: [],
      experience: [],
      certificates: [],
      skills: [],
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("userData", JSON.stringify(user));
      } catch (error) {
        console.error("Error saving userData to localStorage", error);
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
