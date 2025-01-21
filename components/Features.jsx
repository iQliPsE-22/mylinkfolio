import React from "react";

const Features = () => {
  return (
    <section className="min-h-[50vh] w-full text-center py-10 px-6 bg-[#0f0f0f]">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6">Why Choose Us?</h2>
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        <div className="flex-1 bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl mb-2">Effortless Conversion</h3>
          <p>
            Turn your LinkedIn profile into a polished resume with minimal
            effort.
          </p>
        </div>
        <div className="flex-1 bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl mb-2">Modern Design</h3>
          <p>
            ATS Friendly Design for your resume with 60+ Score for a fresher.
          </p>
        </div>
        <div className="flex-1 bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl mb-2">Free to Use</h3>
          <p>Access basic features at no cost</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
