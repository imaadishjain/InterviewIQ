"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { HashLoader } from "react-spinners";
import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Router, useRouter } from "next/navigation";

function feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overAllRating, setOverallRating] = useState([]);
  const[loader,setLoader]=useState(false);

  const router = useRouter();
  const interviewId = usePathname().split("/")[3];
  useEffect(() => {
    GetFeedback();
  }, []);
  const GetFeedback = async () => {
    setLoader(true);
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
    

    let sum = 0;

    for (let i = 0; i < result.length; i++) {
      sum += parseInt(result[i].rating);
    }

    sum = sum / (5 * result.length);
    sum=sum.toPrecision(2);
    sum=sum*5;
    setOverallRating(sum);
    setLoader(false);
  };


  if (loader) {
    return (
      <div className="flex items-center justify-center mt-20">
        <HashLoader color="#4845D2" />
      </div>
    );
  }



  return (
    <div className="p-10">
      
        {feedbackList?.length==0?
        <h2 className="text-sm text-gray-500 text-xl">No interview feedback found</h2>
        :
        <>
        <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>

      <h2 className="text-primary text-lg my-3">
        Your overall interview rating:
        <strong
          className={`${overAllRating < 2 ? "text-red-500" : "text-green-500"}`}
        >
          {overAllRating}<span className="text-primary">/5</span>
        </strong>
      </h2>

      <h2 className="text-sm text-gray-500">
        Find below interview question with correct answer ,Your answer and
        feedback for improvements
      </h2>
      {feedbackList &&
        feedbackList.map((item, index) => {
          return (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="flex justify-between p-2 bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                {item.question} <ChevronsUpDown className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating:</strong>
                    {item.rating}
                    <span>/5</span>
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer :</strong>
                    {item.userAns}
                  </h2>

                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer :</strong>
                    {item.correctAns}
                  </h2>

                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                    <strong>Feedback :</strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </>
       }
       
      <Button onClick={() => router.replace("/dashboard")} className="mt-10">Go Home</Button>
    </div>
  );
}

export default feedback;
