

"use client";
import { useState } from "react";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { Navbar } from "@/components/Navbar";

import Link from "next/link";
import Image from "next/image";
import { benefitOne, benefitTwo } from "@/components/data";
import { Footer } from "@/components/Footer";

export default function Home() {
  const navigation = [
    { name: "Product", href: "" },
    { name: "Features", href: "#features" },
    { name: "Testimonial", href: "#testimonials" },
  ];

  // State to track active menu item
  const [active, setActive] = useState("Product");

  return (
    <>
      {/* Navbar */}
      <div id="" className="w-full bg-secondary fixed top-0 left-0 z-50 gap-3 ">
        <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
          
          {/* Logo */}
          <Link href="/dashboard">
            <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
              <Image src={"/logo3.png"} width={160} height={100} alt="logo" />
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              {navigation.map((menu, index) => (
                <li className="mr-3 nav__item" key={index}>
                  <Link
                    href={menu.href}
                    className={`inline-block px-4 py-2 text-lg font-normal rounded-md no-underline 
                      ${active === menu.name 
                        ? "text-indigo-500 font-semibold bg-indigo-100 dark:bg-gray-800"
                        : "text-gray-800 dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500"
                      }`}
                    onClick={() => setActive(menu.name)}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started Button */}
          <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
            <div className="hidden mr-3 lg:flex nav__item">
              <Link
                href="/dashboard"
                className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Page Content */}
      <Container>
        <Hero />

        {/* Features Section */}
        <div id="features">
          <SectionTitle
            preTitle="InterviewIQ Benefits"
            title="Why should you use this application"
          >
            Ace your interviews with personalized mock sessions, tailored questions, instant feedback, and performance ratings—all in one platform!
          </SectionTitle>

          <Benefits data={benefitOne} />
          <Benefits imgPos="right" data={benefitTwo} />
        </div>

        {/* Testimonials Section */}
        <div id="testimonials">
          <Testimonials />
        </div>

        <Footer />
      </Container>

      {/* Global CSS for Smooth Scrolling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
