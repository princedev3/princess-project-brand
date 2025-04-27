
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { FacebookIcon, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div className=" bg-[#000] p-5 md:p-20 text-white grid gap-y-5 ">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))] gap-[50px] ">
        <div className="grid gap-y-4">
          <Link href={"/"}>
            <Image
              src={"/white-Logo.png"}
              className="object-contain w-[100px] h-[100px] cursor-pointer"
              alt=""
              width={100}
              height={100}
            />
          </Link>
          <span className="text-lg text-white">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </span>
        </div>
        <div className="grid gap-y-4 self-start text-white">
           <span className=" text-xl font-semibold uppercase">
             Navigation
           </span>
           <Link
             href={"/policy"}
             className="  text-lg cursor-pointer"
           >
             Policy
           </Link>
           <Link
             href={"/about"}
             className="  text-lg cursor-pointer"
           >
             About us{" "}
           </Link>
           <Link
             href={"/contact"}
             className=" text-lg cursor-pointer"
           >
             Contact us{" "}
           </Link>
           <Link
             href={"/delivery-policy"}
             className=" text-lg cursor-pointer"
           >
           Delivery Guide
           </Link>
         </div>
         <div className="grid gap-y-4 self-start text-white ">
          <span className=" text-xl font-semibold uppercase">
            Payment
          </span>
          <ul className="flex flex-col gap-4">
            <span className="  text-lg cursor-pointer">
              Paystack Integration
            </span>
            <li className="  text-lg cursor-pointer capitalize">
              fast
            </li>
            <li className=" text-lg cursor-pointer capitalize">
              reliable
            </li>
            <li className=" text-lg cursor-pointer capitalize">
              secured
            </li>
          </ul>
        </div>
      
      </div>
      <Separator className="my-3 bg-slate-800" />
      <div className="grid gap-y-5 self-start text-white">
           <span className="text-xl font-semibold uppercase">
             FOLLOW US
           </span>
           <div className="flex items-center gap-4">
             <a
               href="https://www.facebook.com/share/17n56qzU3S/?mibextid=wwXIfr"
               target="_blank"
               rel="noopener noreferrer"
               className="border p-2 rounded-full group hover:bg-baseBlue cursor-pointer flex items-center justify-center"
             >
               <FacebookIcon
                 size={30}
                 className="text-white group-hover:text-white"
               />
             </a>
             <div className="border p-2 rounded-full group hover:bg-baseBlue/65 flex items-center justify-center">
               <a
                 href="https://www.instagram.com/ashabiade_ope/profilecard/?igsh=MXg0ZTZld3NqbnN6ag=="
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-white group-hover:text-white"
                 // className="border p-2 rounded-full group hover:bg-baseBlue cursor-pointer flex items-center justify-center"
               >
                 <Instagram
                   size={30}
                   className="text-white group-hover:text-white"
                 />
               </a>
             </div>
             <div className="border p-2 rounded-full group hover:bg-pink-500 flex items-center justify-center">
               <a
                 href="https://www.tiktok.com/@lollys.collection7"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <FaTiktok
                   size={30}
                   className="text-white group-hover:text-white"
                 />
               </a>
             </div>
           </div>
         </div>
    </div>
  );
};

export default Footer;


// "use client";
// import Image from "next/image";
// import React from "react";
// import { FacebookIcon, Instagram, Twitter } from "lucide-react";
// import { FaTiktok } from "react-icons/fa";
// import Link from "next/link";

// const Footer = () => {
//   return (


    
//     <div className="grid gap-y-10 relative pt-5 pb-10 bg-black z-0">
//       {/* top */}
//       <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
//         <div className="self-start grid gap-y-3 z-20">
//           <Link href={"/"}>
//             <Image
//               src={"/logo.svg"}
//               width={70}
//               height={70}
//               alt=""
//               className="object-cover w-[70px] h-[70px]"
//             />
//           </Link>
//           <span className="text-white text-lg">
//             A great accessory isn&rsquo;t just about the look; its about the
//             attitude it brings. Wear it with confidence, and let the world
//             wonder about the story you&rsquo;re telling. Embrace your style, and
//             let every step you take be a statement of who you are. 💡
//           </span>
//         </div>
//         <div className="grid gap-y-4 self-start text-white">
//           <span className=" text-xl font-semibold uppercase">
//             Navigation
//           </span>
//           <Link
//             href={"/policy"}
//             className="  text-lg cursor-pointer"
//           >
//             Policy
//           </Link>
//           <Link
//             href={"/about"}
//             className="  text-lg cursor-pointer"
//           >
//             About us{" "}
//           </Link>
//           <Link
//             href={"/contact"}
//             className=" text-lg cursor-pointer"
//           >
//             Contact us{" "}
//           </Link>
//         </div>

//         <div className="grid gap-y-5 self-start text-white">
//           <span className="text-xl font-semibold uppercase">
//             FOLLOW US
//           </span>
//           <div className="flex items-center gap-4">
//             <a
//               href="https://www.facebook.com/share/17n56qzU3S/?mibextid=wwXIfr"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="border p-2 rounded-full group hover:bg-baseBlue cursor-pointer flex items-center justify-center"
//             >
//               <FacebookIcon
//                 size={30}
//                 className="text-white group-hover:text-white"
//               />
//             </a>
//             <div className="border p-2 rounded-full group hover:bg-baseBlue/65 flex items-center justify-center">
//               <a
//                 href="https://www.instagram.com/ashabiade_ope/profilecard/?igsh=MXg0ZTZld3NqbnN6ag=="
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white group-hover:text-white"
//                 // className="border p-2 rounded-full group hover:bg-baseBlue cursor-pointer flex items-center justify-center"
//               >
//                 <Instagram
//                   size={30}
//                   className="text-white group-hover:text-white"
//                 />
//               </a>
//             </div>
//             <div className="border p-2 rounded-full group hover:bg-pink-500 flex items-center justify-center">
//               <a
//                 href="https://www.tiktok.com/@lollys.collection7"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaTiktok
//                   size={30}
//                   className="text-white group-hover:text-white"
//                 />
//               </a>
//             </div>
//           </div>
//         </div>

//       {/* middle */}
//       {/* <div className="grid gap-y-2">
//         <h1 className="text-xl font-semibold">OPENING HOURS</h1>
//         <div className="grid  grid-flow-col auto-cols-max gap-8">
//           <div className="self-start grid gap-y-3">
//             <span className="text-lg">Monday - Saturday</span>
//             <span className="text-lg"> 8:00 am to 9:00 pm</span>
//           </div>
//           <div className="self-start grid gap-y-3">
//             <span className="text-lg">Sunday </span>
//             <span className="text-[#AA0000] text-lg">CLOSED</span>
//           </div>
//         </div>
//       </div> */}

//       <div className="w-full border-b-[1px] border-gray-300"></div>

//       <div className="grid gap-y-2 sm:grid-flow-col">
//         <div className="">
//           <span className="text-gray-300 text-lg">
//             &copy; 2025 Restaurants. All Right Reserved. Designed by Prince
//           </span>
//         </div>
//         <div className="grid grid-flow-col auto-cols-max gap-5 sm:justify-end">
//           <Link
//             href={"/policy"}
//             className="text-gray-300 text-lg cursor-pointer font-semibold"
//           >
//             Terms of Service
//           </Link>
//           <Link
//             href={"/policy"}
//             className="text-gray-300 text-lg cursor-pointer font-semibold"
//           >
//             Privacy Policy
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
