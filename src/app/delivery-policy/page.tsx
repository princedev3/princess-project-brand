"use client";

import React from "react";
import { motion } from "framer-motion";

const DeliveryPolicyPage = () => {
  return (
    <div className="flex flex-col gap-16 py-10">
      {/* Header Section */}
      <section className="container mx-auto flex flex-col items-center gap-4 text-center px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-teal-600 capitalize"
        >
          Delivery Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 text-lg max-w-2xl leading-8"
        >
          At luxue&rsquo;s, we&rsquo;re committed to getting your favorite products to your doorstep quickly, safely, and reliably.
        </motion.p>
      </section>

      {/* Standard Delivery Section */}
      <section className="container mx-auto bg-[#FFFBF5] rounded-xl p-8 md:p-12 shadow-md">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold text-teal-600 capitalize">Standard Delivery</h2>
          <ul className="text-gray-700 text-lg leading-8 list-disc pl-6 space-y-3">
            <li>Orders are processed within 1-2 business days.</li>
            <li>Standard delivery typically takes 3-7 business days after dispatch.</li>
            <li>Delivery times may vary based on location, public holidays, or external circumstances.</li>
            <li>You will receive a confirmation email with tracking information once your order ships.</li>
          </ul>
        </motion.div>
      </section>

      {/* Shipping Details Section */}
      <section className="container mx-auto flex flex-col gap-8 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold text-teal-600 capitalize">Shipping Information</h2>
          <ul className="text-gray-700 text-lg leading-8 list-disc pl-6 space-y-3">
            <li>We currently offer nationwide delivery within Nigeria.</li>
            <li>Shipping fees are calculated at checkout based on your delivery location.</li>
            <li>Free shipping is available on orders over <span className="text-teal-600">₦50 000</span></li>
            <li>We do not ship to P.O. boxes at this time.</li>
          </ul>
        </motion.div>
      </section>

      {/* Delays / Issues Section */}
      <section className="container mx-auto bg-[#FFFBF5] rounded-xl p-8 md:p-12 shadow-md">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold text-teal-600 capitalize">Delays & Exceptions</h2>
          <p className="text-gray-700 text-lg leading-8">
            While we always strive to deliver on time, certain factors such as weather disruptions, increased seasonal demand, or logistic issues may cause delays. 
            We appreciate your patience and promise to keep you updated on your order status at all times.
          </p>
        </motion.div>
      </section>

      {/* Contact Us Section */}
      <section className="container mx-auto flex flex-col items-center gap-4 text-center px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-teal-600 capitalize"
        >
          Need Help?
        </motion.h2>
        <p className="text-gray-700 text-lg max-w-xl leading-8">
          If you have any questions or concerns about your delivery, feel free to reach out to our friendly support team at{" "}
          <a 
  href="mailto:support@luxue.store" 
  className="font-semibold underline text-blue-600 hover:text-blue-800"
>
support@luxue.store
</a>
        </p>
      </section>
    </div>
  );
};

export default DeliveryPolicyPage;
