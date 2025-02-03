"use client";
import { MockInterview } from "@/utils/schema";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb} from "lucide-react";
import { BiSolidWebcam } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Interview({ params }) {
  const interviewId = usePathname().split("/")[3];
  const [interviewData, setInterviewData] = useState([]);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 flex flex-col ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          
          <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Position</strong>:{" "}
              <span>{interviewData.jobPosition}</span>
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack</strong>:{" "}
              <span>{interviewData.jobDesc}</span>
            </h2>
            <h2 className="text-lg">
              <strong>Year of Experience</strong>:{" "}
              <span>{interviewData.jobExperience}</span>
            </h2>
            <h2 className="text-lg">
              <strong>Total Number of Interview Questions</strong>:{" "}
              <span>{interviewData.jobNumberOfQues}</span>
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                  <h2 className="flex gap-2 items-center text-yellow-500"><Lightbulb/><strong>Information</strong></h2>
                  <h2 className="'mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>

        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              style={{
                height: 300,
                width: 300,
              }}
              mirrored="true"
            />
          ) : (
            <>
              <BiSolidWebcam className="h-72 w-full p-20 my-7 bg-secondary  rounded-lg border" />
              <Button variant="ghost" onClick={() => setWebCamEnabled(true)} className="w-full">
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">

      <Link href={'/dashboard/interview/'+interviewId+'/start'}>
      <Button>Start Interview</Button>
      </Link>
     
      </div>
    
    </div>
  );
}

export default Interview;
