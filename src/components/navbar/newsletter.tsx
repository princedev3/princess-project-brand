"use client";

import { useCreateNewsLetterMutation } from "@/app/apis/_newsletter_index_api";
import { toast } from "sonner";
import React from "react";

const Newsletter = () => {
  const [createNewsLetter, { isLoading }] = useCreateNewsLetterMutation();

  const handleCreateNewsLetter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const target = e.target as HTMLFormElement;
      const formdata = new FormData(target);
      const email = formdata.get("email") as string;

      if (!email || email.trim() === "") {
        return toast.error("Please enter your email");
      }

      const res = await createNewsLetter({ email });
      if (res.data.status === 200) {
        target.reset();
        toast.success(res.data.message);
        return;
      }
      toast.error(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full bg-gray-800 py-16 px-4">
      <div className="container mx-auto flex flex-col items-center gap-8 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-600">
          Join Our Exclusive Community
        </h1>
        <p className="text-gray-300 max-w-2xl text-lg md:text-xl leading-relaxed">
          Subscribe to our newsletter and get early access to new arrivals, exclusive offers, and more!
        </p>

        <form
          onSubmit={handleCreateNewsLetter}
          className="w-full max-w-lg flex flex-col md:flex-row gap-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-baseGreen outline-none"
          />
          <button
            disabled={isLoading}
            type="submit"
            className="px-6 py-3 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 transition-all"
          >
            {isLoading ? "Submitting..." : "Subscribe"}
          </button>
        </form>

        <div className="bg-gray-700 w-full px-6 py-4 mt-6 rounded-lg max-w-lg">
          <p className="text-gray-400 text-center">
            We respect your privacy. Unsubscribe anytime with a single click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
