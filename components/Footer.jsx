import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Headline from "./Headline";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-black w-full text-white flex flex-col lg:flex-row justify-around items-center border-t-2 b-t-[#fff] p-5 pb-20 lg:pb-8 lg:p-8 space-y-4 lg:space-y-8 lg:space-y-0">
      <div className="w-full lg:w-1/4 flex items-center flex-col">
        <Headline heading={"Resume Lab"} text={"Your ATS Friendly Resume"} />
      </div>
      <div className="w-full lg:w-1/5 mt-4 flex flex-row items-center justify-around">
        <Link href="#" className="w-8">
          <FontAwesomeIcon icon={faFacebook} className="icon" />
        </Link>
        <Link href="#" className="w-8">
          <FontAwesomeIcon icon={faInstagram} className="icon" />
        </Link>
        <Link href="#" className="w-8">
          <FontAwesomeIcon icon={faTwitter} className="icon" />
        </Link>
        <Link href="#" className="w-8">
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </Link>
      </div>
      <div className="itim w-full lg:w-1/5 text-center lg:text-left">
        <h2 className="text-2xl mb-2">Contact Us</h2>
        <p className="text-sm">deepaklg02@gmail.com</p>
      </div>
    </div>
  );
};

export default Footer;
