"use client";
import React from "react";
import Image from "next/image";
import {  UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {  useClerk } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Header({setLoader}) {
  const path = usePathname().split("/").filter(Boolean).pop();


  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setLoader(true);
      await signOut();
      router.push("/");
      setLoader(false); // Redirect to the home page after sign-out
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };


  return (
    <div className="flex p-5 item-center justify-between bg-secondary shadow-sm ">
      <Image src={"/logo3.png"} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-12  ">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            
            ${path == "dashboard" && "text-primary font-bold"}

            
           `}
        >
          Dashboard
        </li>


        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            
            ${path != "feedback" && path!="dashboard" && "text-primary font-bold"}

            
            `}
        >
          AI Mock Interviews
        </li>

        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            
            ${path == "feedback"  && "text-primary font-bold"}

            
            `}
        >
          Feedback
        </li>
      </ul>
    
      <Button onClick={handleSignOut}>Sign Out</Button>
     
      <UserButton />
    </div>
  );
}

export default Header;
