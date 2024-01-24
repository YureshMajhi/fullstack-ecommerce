import React from "react";

const CallToAction = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="bg-[#f3f3f3] mt-10">
        <h3 className="text-center text-3xl md:text-5xl py-10 text-[#084240]">
          Let's stay in touch!
        </h3>
        <p className="text-center text-[#596e67] max-w-xl mx-auto">
          Get $10 off your first purchase, early access to new releases and
          outdoor tips, trips and education.
        </p>

        <form
          onSubmit={handleSubmit}
          className="py-10 px-14 flex justify-center"
        >
          <input
            type="email"
            placeholder="Your e-mail"
            className="w-[340px] h-12 pl-4 border-[#084240] border-[1px] rounded-md"
          />
          <input
            type="submit"
            value="Sign Up"
            className="bg-[#084240] p-2.5 rounded-md text-white font-semibold cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default CallToAction;
