"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoaderCircle } from "lucide-react";
import { couponSchema } from "@/static-data/types";
import { useCreateCouponMutation } from "@/app/apis/_coupon_index_api";
import { toast } from "sonner";

const CreateCoupons = () => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      duration: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof couponSchema>) {
    const res = await createCoupon(values);
    if (res.data.status === 200) {
      form.reset();
      toast.success(res.data.message);
    }
    toast.success(res.data.message);
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid  grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] mx-auto gap-5 items-center"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Coupon code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Coupon duration"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="md:mt-7 bg-baseGreen hover:bg-baseGreen "
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin text-center" size={20} />
            ) : (
              "create token"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default CreateCoupons;
