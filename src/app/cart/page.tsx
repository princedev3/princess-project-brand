"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/static-data/cart-store";
import Link from "next/link";
import { userStore } from "@/static-data/user-session";
import { nigeriaStates } from "@/static-data/staticdata";
import confetti from "canvas-confetti";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaystackButton } from "react-paystack";
import { useCreateOrderMutation } from "../apis/_order_index.api";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { useGetCouponQuery } from "../apis/_coupon_index_api";
import LoadingPage from "@/components/navbar/loading";
import { motion } from "framer-motion";
import EmptyCart from "@/components/navbar/empty-cart";

const Cart = () => {
  const router = useRouter();
  const { data, isLoading } = useGetCouponQuery(null);
  const [createOrder] = useCreateOrderMutation();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const session = userStore((state) => state.session);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [openCheckout, setOpenCheckout] = useState(false);
  const addressRef = useRef("");
  const phoneRef = useRef("");
  const noteRef = useRef("");
  const emailRef = useRef("");
  const nameRef = useRef("");
  const isCouponValid =
    data?.existingCoupon &&
    new Date(data.existingCoupon.expiryDate) > new Date();

  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };
  const debouncedSetAddress = useDebouncedCallback((val: string) => {
    setAddress(val);
  }, 300);
  const debouncedSetEmail = useDebouncedCallback((val: string) => {
    setEmail(val);
  }, 300);
  const debouncedSetNote = useDebouncedCallback((val: string) => {
    setNote(val);
  }, 400);
  const debouncedPhoneNumber = useDebouncedCallback((val: string) => {
    setPhoneNumber(val);
  }, 300);
  const debouncedSetName = useDebouncedCallback((val: string) => {
    setName(val);
  }, 300);

  const selectedPrice: number | null = selectedState
    ? nigeriaStates[selectedState as keyof typeof nigeriaStates]
    : 0;

  const product = useCartStore((state) => state.products);
  const remove = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const itemCount = useCartStore((state) => state.totalItems);
  const discountPercent = isCouponValid
    ? Number(data?.existingCoupon?.code.match(/\d+/)?.[0] || "0")
    : 0;

  const validDiscountPercent = isNaN(discountPercent) ? 0 : discountPercent;

  const finalPrice = product.reduce((acc, cur) => acc + cur.price, 0);

  const discountedPrice =
    finalPrice - (finalPrice * validDiscountPercent) / 100;

  const deliveryFee = selectedPrice ?? 0;
  const totalAmount = discountedPrice + deliveryFee;

  const componentProps = {
    email: session ? (session?.user?.email as string) : emailRef.current,
    amount: totalAmount * 100,
    metadata: {
      name: session ? (session?.user?.name as string) : nameRef.current,
      phoneNumber: phoneNumber ? phoneNumber : "",
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    text: "Payment for purchase",
    onSuccess: () => {
      alert("thank you for purchase");
    },
    onclose: () => alert("are u sure"),
  };

  const handleSuccess = async (payStackId: string, paymentStatus: string) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.95, y: 0.05 },
      angle: 180,
      startVelocity: 40,
    });
    const order = await createOrder({
      amount: totalAmount,
      // amount: finalPrice + (selectedPrice !== null ? selectedPrice : 0),
      userId: session?.user?.id as string,
      orderAddress: addressRef.current,
      phoneNumber: phoneRef.current,
      note: noteRef.current,
      email: session ? session.user?.email : emailRef.current,
      name: session ? session.user?.name : nameRef.current,
      product,
      payStackId,
      paymentStatus,
    });
    if (order.data.status === 200) {
      router.push(`/order/${order.data.orderId}`);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!product.length) {
    return (
     <EmptyCart/>
    )
  }
  return (
    <div>
      <h1 className="text-center mb-4 text-xl font-semibold text-teal-600 my-6 overflow-x-hidden">
        Checkout (<span className="text-teal-600/80">{itemCount} items</span>){" "}
      </h1>
      <div className="grid md:grid-flow-col md:grid-cols-[2fr_1.2fr] gap-4 ">
        <div className="grid gap-y-4 self-start ">
          {product.map((item) => (
            <div
              className="border grid grid-flow-col justify-between p-3 rounded-lg"
              key={item.id}
            >
              <div className="grid grid-flow-col auto-cols-max gap-3 ">
                <div className="relative w-[120px] h-full ">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="grid gap-[1px] auto-rows-max ">
                  <span className="capitalize font-medium text-lg text-gray-700">
                    {item.name}{" "}
                  </span>
                  <span className="text-gray-700">
                    QTY: <span className="ml-2">{item.quantity}</span>{" "}
                  </span>
                  <span className="text-gray-700">
                    size: <span className="ml-2">{item.size}</span>{" "}
                  </span>
                  <div className="text-gray-700 capitalize flex items-center gap-2">
                    color:{" "}
                    <div
                      style={{ backgroundColor: item.color }}
                      className={`w-4 h-4 rounded-full`}
                    />
                  </div>
                  <div className="text-gray-700 capitalize">
                    price:
                    <span className="font-semibold text-xl ml-2">
                      ₦{" "}
                      <span className="text-base">
                        {item.price.toLocaleString()}
                      </span>
                    </span>{" "}
                  </div>
                  <span
                    className="text-red-600 cursor-pointer"
                    onClick={() => remove(item)}
                  >
                    remove
                  </span>
                </div>
              </div>
              <span className="justify-end text-xl">
                <Plus
                  onClick={() => {
                    if (item.quantity < item.initialQuantity) {
                      incrementQuantity(item.id);
                    } else {
                      toast.warning(
                        "You've reached the maximum available quantity."
                      );
                    }
                  }}
                  className={`w-7 h-7 ${
                    item.quantity >= item.initialQuantity
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer"
                  }`}
                  size={30}
                />
              </span>
            </div>
          ))}
        </div>
        {openCheckout === false ? (
          <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="border rounded-lg p-3 self-start grid gap-y-5">
            <h1 className="text-lg font-semibold text-teal-600">
              Billing Details
            </h1>
            <>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Name <span className="text-red-600">*</span>
                </div>
                <input
                  type="text"
                  defaultValue={
                    session ? (session?.user?.name as string) : name
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    nameRef.current = val;
                    debouncedSetName(val);
                  }}
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Email <span className="text-red-600">*</span>
                </div>
                <input
                  type="email"
                  defaultValue={
                    session ? (session?.user?.email as string) : email
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    emailRef.current = val;
                    debouncedSetEmail(val);
                  }}
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid gap-2 items-center">
                <div className="w-full text-gray-700 capitalize text-lg">
                  State <span className="text-red-600">*</span>
                </div>
                <Select onValueChange={handleStateChange}>
                  <SelectTrigger className="w-full py-6 outline-none active:outline-none focus:outline-none">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(nigeriaStates).map(
                      ([state, price], indx) => (
                        <SelectItem
                          className="outline-none"
                          key={indx}
                          value={state}
                        >
                          {state} - {price.toLocaleString()}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Address <span className="text-red-600">*</span>
                </div>
                <input
                  type="text"
                  defaultValue={address}
                  onChange={(e) => {
                    const val = e.target.value;
                    addressRef.current = val;
                    debouncedSetAddress(val);
                  }}
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Phone <span className="text-red-600">*</span>
                </div>

                <input
                  type="number"
                  defaultValue={phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!/^\d*$/.test(val)) return;
                    if (val.length > 11) return;
                    phoneRef.current = val;
                    debouncedPhoneNumber(val);
                  }}
                  placeholder="09030300300"
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">Note</div>
                <input
                  defaultValue={note}
                  onChange={(e) => {
                    const val = e.target.value;
                    noteRef.current = val;
                    debouncedSetNote(val);
                  }}
                  type="text"
                  name="note"
                  placeholder="Note"
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
            </>

            <motion.button
              disabled={!phoneNumber || !selectedPrice || !selectedState}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenCheckout(true)}
              className={`bg-teal-600 font-semibold w-full rounded-[30px] pointer-events-auto text-white text-lg cursor-pointer py-3 disabled:cursor-not-allowed disabled:bg-teal-600/80`}
            >
              Proceed to checkout
            </motion.button>
          </motion.div>
        ) : (
          <div className="border rounded-lg p-3 text-[19px] self-start grid gap-y-3">
            <h1 className="text-xl font-semibold text-teal-600">
              Order Summary
            </h1>
            <div className="grid grid-flow-col  justify-between text-gray-700 items-center">
              <span className="w-full">Total Item</span>
              <span className="">{itemCount} </span>
            </div>
            <div className="grid grid-flow-col justify-between text-gray-700 items-center">
              <span className="w-full">Shipping & handling</span>
              <span className="">
                ₦{deliveryFee === 0 ? "-" : deliveryFee}{" "}
              </span>
            </div>
            <div className="grid grid-flow-col justify-between text-gray-700 items-center">
              <span className="w-full">Estimated Tax</span>
              <span className="">vax (inclusive) </span>
            </div>

            <Separator className="my-3" />
            <div className="">
              <div className="grid grid-flow-col justify-between items-center">
                <span className="w-full font-semibold text-baseBlack">
                  Product price
                </span>
                <span className="font-semibold text-baseBlack">
                  <span className="font-semibold text-xl">₦</span>{" "}
                  {finalPrice.toLocaleString()}{" "}
                </span>
              </div>
              <div className="grid grid-flow-col justify-between  items-center">
                <span className="w-full font-semibold text-baseBlack">
                  Total{" "}
                </span>
                <span className="font-semibold text-baseBlack">
                  <span className="font-semibold text-xl">₦</span>{" "}
                  {totalAmount.toLocaleString()}
                </span>
              </div>
              {validDiscountPercent > 0 && (
                <div className="grid grid-flow-col justify-between  items-center">
                  <span className="w-full text-baseOrange">
                    Discount ({validDiscountPercent}%)
                  </span>
                  <div className="text-baseOrange">
                    <span className="font-semibold text-xl">-₦</span>{" "}
                    {(
                      (finalPrice * validDiscountPercent) /
                      100
                    ).toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            <PaystackButton
              disabled={!phoneNumber || !selectedPrice || !selectedState}
              {...componentProps}
              className="w-full bg-teal-600 py-4 font-semibold text-xl  rounded-3xl text-white hover:bg-teal-600/90 disabled:cursor-not-allowed"
              metadata={{
                name: componentProps.metadata.name,
                phoneNumber: componentProps.metadata.phoneNumber,
                custom_fields: [
                  {
                    display_name: "Phone Number",
                    variable_name: "phone_number",
                    value: componentProps.metadata.phoneNumber,
                  },
                ],
              }}
              onSuccess={(transaction) => {
                setPhoneNumber("");
                setAddress("");
                clearCart();
                toast.success("Payment successful, Thank you");
                handleSuccess(transaction.reference, transaction.status);
              }}
              onClose={() => {}}
            />
          </div>
        )}
      </div>
      <div className="my-5 text-center text-xl text-teal-600 font-medium">
        We ship to anywhere within nigeria...
      </div>
    </div>
  );
};

export default Cart;

{
  /* <div className="border rounded-lg p-3 self-start grid gap-y-3">
          <h1 className="text-lg font-semibold text-teal-600">
            Order Summary
          </h1>
          <div className="grid grid-flow-col justify-between text-gray-700 items-center">
            <span className="w-full">Total Item</span>
            <span className="">{itemCount} </span>
          </div>
          <div className="grid grid-flow-col justify-between text-gray-700 items-center">
            <span className="w-full">Shipping & handling</span>
            <span className="">-</span>
          </div>
          <div className="grid grid-flow-col justify-between text-gray-700 items-center">
            <span className="w-full">Estimated Tax</span>
            <span className="">vax (inclusive) </span>
          </div>
          {session ? (
            <>
              <div className="grid grid-cols-[100px,1fr] gap-4 items-center">
                <div className="w-full text-gray-700">
                  State <span className="text-red-600">*</span>
                </div>
                <Select onValueChange={handleStateChange}>
                  <SelectTrigger className="w-full outline-none active:outline-none focus:outline-none">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(nigeriaStates).map(
                      ([state, price], indx) => (
                        <SelectItem
                          className="outline-none"
                          key={indx}
                          value={state}
                        >
                          {state} - {price.toLocaleString()}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-[100px,1fr] gap-4 items-center">
                <div className="w-full text-gray-700">
                  Address <span className="text-red-600">*</span>
                </div>
                <input
                  type="text"
                  defaultValue={address}
                  onChange={(e) => {
                    const val = e.target.value;
                    addressRef.current = val;
                    debouncedSetAddress(val);
                  }}
                  className="w-full outline-none p-1 rounded-sm border"
                />
              </div>
              <div className="grid grid-cols-[100px,1fr] gap-4 items-center">
                <div className="w-full text-gray-700">
                  Phone <span className="text-red-600">*</span>
                </div>

                <input
                  type="number"
                  defaultValue={phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!/^\d*$/.test(val)) return;
                    if (val.length > 11) return;
                    phoneRef.current = val;
                    debouncedPhoneNumber(val);
                  }}
                  placeholder="09030300300"
                  className="w-full outline-none p-1 rounded-sm border"
                />
              </div>
            </>
          ) : null}

          <Separator className="my-3" />
          <div className="">
            <div className="grid grid-flow-col justify-between items-center">
              <span className="w-full text-baseOrange ">Product price</span>
              <span className="text-baseOrange">
                <span className="font-semibold text-xl">#</span>{" "}
                {finalPrice.toLocaleString()}{" "}
              </span>
            </div>
            <div className="grid grid-flow-col justify-between  items-center">
              <span className="w-full text-baseOrange">Total Price</span>
              <span className="text-baseOrange">
                <span className="font-semibold text-xl">#</span>{" "}
                {totalAmount.toLocaleString()}
              </span>
            </div>
            {validDiscountPercent > 0 && (
              <div className="grid grid-flow-col justify-between  items-center">
                <span className="w-full text-baseOrange">
                  Discount ({validDiscountPercent}%)
                </span>
                <div className="text-baseOrange">
                  <span className="font-semibold text-xl">-#</span>{" "}
                  {((finalPrice * validDiscountPercent) / 100).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          <PaystackButton
            disabled={!phoneNumber || !selectedPrice || !selectedState}
            {...componentProps}
            className="w-full bg-teal-600 py-2 rounded-lg text-white hover:bg-teal-600/90 disabled:cursor-not-allowed"
            metadata={{
              name: componentProps.metadata.name,
              phoneNumber: componentProps.metadata.phoneNumber,
              custom_fields: [
                {
                  display_name: "Phone Number",
                  variable_name: "phone_number",
                  value: componentProps.metadata.phoneNumber,
                },
              ],
            }}
            onSuccess={(transaction) => {
              setPhoneNumber("");
              setAddress("");
              clearCart();
              toast.success("Payment successful, Thank you");
              handleSuccess(transaction.reference, transaction.status);
            }}
            onClose={() => {}}
          />
        </div> */
}
