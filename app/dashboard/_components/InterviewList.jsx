"use client";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import InterviewItemCart from "./InterviewItemCart";

function InterviewList({ setLoader }) {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const handleRemoveInterview = (mockId) => {
    setInterviewList((prev) => prev.filter((i) => i.mockId !== mockId));
  };

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    console.log("Printing Interview list", result);
    setInterviewList(result);
  };

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  return (
    <div>
      <h2 className="font-medium text-xl mb-5">Mock Interviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCart
              key={index}
              interview={interview}
              onRemove={handleRemoveInterview}
              setLoader={setLoader}
            />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
