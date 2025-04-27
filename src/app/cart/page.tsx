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
      <div className="w-full h-[400px] bg-gray-50 shadow-md rounded-lg my-8 flex items-center justify-center ">
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="bg-gray-100 w-[120px] h-[120px] p-4  rounded-full flex items-center justify-center relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#17CF97"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#17CF97"
              className="size-24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-gradient-to-tr from-gray-50 to-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#17CF97"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#17CF97"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-medium text-gray-700">
            Your cart is empty!
          </h1>
          <p className="text-sm text-gray-600">
            Browse our categories and discover our best deal
          </p>
          <Button className="relative overflow-hidden bg-baseGreen p-5 hover:bg-baseGreen cursor-pointer capitalize text-xl font-medium group">
            <Link href={"/product"} className="relative z-10">
              Start Shopping
            </Link>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></span>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center mb-4 text-xl font-semibold text-baseGreen my-6 overflow-x-hidden">
        Checkout (<span className="text-baseGreen/80">{itemCount} items</span>){" "}
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
                    className="object-contain rounded-md"
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
            <h1 className="text-lg font-semibold text-baseGreen">
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
              className={`bg-baseGreen font-semibold w-full rounded-[30px] pointer-events-auto text-white text-lg cursor-pointer py-3 disabled:cursor-not-allowed disabled:bg-baseGreen/80`}
            >
              Proceed to checkout
            </motion.button>
          </motion.div>
        ) : (
          <div className="border rounded-lg p-3 text-[19px] self-start grid gap-y-3">
            <h1 className="text-xl font-semibold text-baseGreen">
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
              className="w-full bg-baseGreen py-4 font-semibold text-xl  rounded-3xl text-white hover:bg-baseGreen/90 disabled:cursor-not-allowed"
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
      <div className="my-5 text-center text-xl text-baseGreen font-medium">
        We ship to anywhere within nigeria...
      </div>
    </div>
  );
};

export default Cart;

{
  /* <div className="border rounded-lg p-3 self-start grid gap-y-3">
          <h1 className="text-lg font-semibold text-baseGreen">
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
            className="w-full bg-baseGreen py-2 rounded-lg text-white hover:bg-baseGreen/90 disabled:cursor-not-allowed"
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
