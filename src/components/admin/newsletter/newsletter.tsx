"use client"
import { Button } from "@/components/ui/button";
import { LoaderCircle} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminNewsLetterMutation } from "@/app/apis/_newsletter_index_api";

const Newsletter = () => {
    const [adminNewsLetter,{isLoading}]=useAdminNewsLetterMutation()
    
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
const target = e.target as HTMLFormElement
const formdata = new FormData(target)
const title= formdata.get("title")
const message= formdata.get("message")
const res = adminNewsLetter({title,message})
console.log(res)
    }
  return (
    <motion.section
          className="py-12 px-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <form onSubmit={handleSubmit} className="grid gap-y-6">
            <div className="grid gap-6">
              <div className="grid gap-y-2">
                <label className="text-base font-semibold">Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="title"
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
              disabled={isLoading}
              className="w-full rounded-full py-6 text-xl bg-black hover:bg-black/80"
            >
              {isLoading ? <LoaderCircle size={25} className="animate-spin" /> : "Send Message"}
            </Button>
          </form>
        </motion.section>
  
  )
}

export default Newsletter