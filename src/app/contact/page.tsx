"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { useCreateMessageMutation } from "../apis/_contact_index_api";
import { toast } from "sonner";
import { contactInfo } from "@/static-data/staticdata";
import { motion, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  const [createMessage] = useCreateMessageMutation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!email || !message || !name) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const res = await createMessage({ name, email, message });
    if (res.data.status === 200) {
      target.reset();
      toast.success(res.data.message);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); 
    } else {
      toast.error(res.data.message);
    }
    setLoading(false);
  }

  return (
    <div className="w-full relative">
   
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-full p-8 shadow-xl flex flex-col items-center gap-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle2 size={80} className="text-teal-600" />
              <p className="text-xl font-bold text-baseBlack">Message Sent!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        className="bg-[#FFFBF5] py-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-teal-600 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-baseBlack/70">
          We'd love to hear from you. Send us a message!
        </p>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-12 px-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <form onSubmit={handleSubmit} className="grid gap-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-y-2">
              <label className="text-base font-semibold">Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-baseGreen/15 transition"
              />
            </div>
            <div className="grid gap-y-2">
              <label className="text-base font-semibold">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-baseGreen/15 transition"
              />
            </div>
          </div>

          <div className="grid gap-y-2">
            <label className="text-base font-semibold">Message</label>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Write your message..."
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-baseGreen/15 transition resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full py-6 text-xl bg-black hover:bg-black/80"
          >
            {loading ? <LoaderCircle size={25} className="animate-spin" /> : "Send Message"}
          </Button>
        </form>
      </motion.section>

     
      <motion.section
        className="bg-[#f9f9f9] py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          {contactInfo.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <item.icon size={40} className="text-baseGreen" />
              <h3 className="text-xl font-bold capitalize">{item.type}</h3>
              <a
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-baseBlack/70 break-words hover:underline"
              >
                {item.to}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
