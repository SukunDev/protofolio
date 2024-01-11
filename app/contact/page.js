"use client";

import { PiCheck, PiSpinnerGap } from "react-icons/pi";
import Headings from "../components/headings";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.status === 200) {
      setIsSubmited(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Headings title={"Hire Me"}>
        <div className="flex items-center gap-2 px-1.5 py-1.5 rounded-full sm:px-2 sm:py-0 bg-green-400/50 dark:bg-green-400/20">
          <div className="p-[3px] bg-green-500 rounded-full"></div>
          <p className="hidden font-normal text-green-600 uppercase sm:block dark:text-green-700">
            available for work
          </p>
        </div>
      </Headings>
      <div className="mx-2 mt-6 text-center sm:mx-4 xs:text-start">
        <h1 className="text-3xl font-medium sm:text-4xl text-slate-900 dark:text-gray-100">
          Design Inquiry
        </h1>
        <p className="mt-2 text-base sm:text-lg text-slate-500 dark:text-white/60">
          Got an idea and need design help? Reach out now
        </p>
      </div>
      {!isSubmited && !isLoading ? (
        <div className="mx-2 my-6 sm:mx-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <div className="relative z-0 flex flex-col w-full sm:w-1/2 group">
                <div className="absolute inset-0 bg-gray-200 dark:bg-white/10 rounded-md group-hover:-inset-0.5 transition-all duration-300 -z-10"></div>
                <input
                  className="px-4 py-2 transition duration-300 bg-gray-100 border border-gray-200 rounded-md outline-none dark:placeholder:text-white/50 dark:border-white/10 dark:bg-white/10"
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInput}
                  value={formData.name}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="relative z-0 flex flex-col w-full sm:w-1/2 group">
                <div className="absolute inset-0 bg-gray-200 dark:bg-white/10 rounded-md group-hover:-inset-0.5 transition-all duration-300 -z-10"></div>
                <input
                  className="px-4 py-2 transition duration-300 bg-gray-100 border border-gray-200 rounded-md outline-none dark:placeholder:text-white/50 dark:border-white/10 dark:bg-white/10"
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleInput}
                  value={formData.email}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="relative z-0 flex flex-col group">
              <div className="absolute inset-0 bg-gray-200 dark:bg-white/10 rounded-md group-hover:-inset-0.5 transition-all duration-300 -z-10"></div>
              <textarea
                className="px-4 py-2 transition duration-300 bg-gray-100 border border-gray-200 rounded-md outline-none dark:placeholder:text-white/50 dark:border-white/10 dark:bg-white/10"
                name="message"
                id="message"
                rows={10}
                onChange={handleInput}
                value={formData.message}
                placeholder="Message"
                required
              ></textarea>
            </div>
            <div className="flex flex-col mt-4">
              <button
                className="w-full py-2 text-lg font-normal text-white transition duration-300 rounded-md bg-slate-900 hover:bg-slate-800 active:bg-slate-900 dark:bg-white/10 dark:hover:bg-white/15 dark:active:bg-white/10"
                type="submit"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="relative min-h-96">
          <div className="absolute inset-0 m-auto w-fit h-fit">
            <div className="p-4 text-3xl text-white rounded-full bg-slate-900 dark:bg-white/10">
              {isLoading ? (
                <PiSpinnerGap className="animate-spin" />
              ) : (
                <PiCheck />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
