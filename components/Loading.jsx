import React from "react";
import { SkeletonText } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="bg-white p-6 lg:p-16 w-full lg:w-1/2 rounded-lg shadow-lg mt-8 ">
      <SkeletonText noOfLines={7} gap="4" className="bg-gray-500" />
    </div>
  );
};

export default Loading;
