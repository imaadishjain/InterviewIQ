import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

import userOneImg from "../public/user1.jpg";
import userTwoImg from "../public/user2.jpg";
import userThreeImg from "../public/user3.jpg";

export const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
            Great tool! The personalized questions and feedback helped me improve my interview skills effectively.
            </p>

            <Avatar image={userOneImg} name="Sarah Steiner" title="VP Sales at Google" />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
            Loved the mock interviews! The AI-generated questions felt real, and the feedback was very useful.
            </p>

            <Avatar image={userTwoImg} name="Dylan Ambrose" title="Lead marketer at Netflix" />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
            Highly recommended! The question accuracy, feedback, and rating system made my prep seamless.
            </p>

            <Avatar image={userThreeImg} name="Gabrielle Winn" title="Co-founder of Acme Inc" />
          </div>
        </div>
      </div>
    </Container>
  );
};

function Avatar({ image, name, title }) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image src={image} width="40" height="40" alt="Avatar" placeholder="blur" />
      </div>
      <div>
        <div className="text-lg font-medium">{name}</div>
        <div className="text-gray-600 dark:text-gray-400">{title}</div>
      </div>
    </div>
  );
}

function Mark({ children }) {
  return (
    <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
      {children}
    </mark>
  );
}
