/*"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const[loader,setLoader]=useState(false);


  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState([]);
  const [numberOfQuestion, setNumberOfQuestions] = useState();

  const { user } = useUser();

  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `
      Job Positions: ${jobPosition}, 
      Job Description: ${jobDesc}, 
      Years of Experience: ${jobExperience}. 
      Based on this information, please provide ${numberOfQuestion} technical theory interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.`;

    

    try
    {
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResponse = result.response.text();

// Remove markdown JSON formatting if present
    MockJsonResponse = MockJsonResponse.replace(/```json|```/g, "");

    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      const res = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          jobNumberOfQues: numberOfQuestion,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted id:", res);
      if (res && openDialog) {
        
        router.push("/dashboard/interview/" + res[0]?.mockId);
        setOpenDialog(false);
      }
    } else {
      console.log("Error");
    }
    setLoading(false);
    }catch(error)
    {
      setLoading(false);
      toast(error.message)
    }
    
  };

  return (
    
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md hover:cursor-pointer transition-all"
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl ">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} >
                <div>
                  <h2>
                    Add Details about your job position/role,Job Description and
                    year of experience
                  </h2>

                  <div className="mt-7 my-">
                    <label>Job Position/Job Role</label>
                    <Input
                      placeholder="Ex. Software Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>

                  <div className="mt-7 my-3">
                    <label>Job Description/Tech Stack (Inshort)</label>
                    <Textarea
                      placeholder="Ex. React, Java, Spring, AWS"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>

                  <div className="mt-7 my-3">
                    <label>Years of Experience (Inshort)</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      min="0"
                      max="100"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>

                  <div className="mt-7 my-">
                    <label>Number of Inteview Questions.</label>
                    <Input
                      placeholder="Ex. 7"
                      min="1"
                      max="10"
                      type="number"
                      required
                      onChange={(event) =>
                        setNumberOfQuestions(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-5">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;*/



"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState([]);
  const [numberOfQuestion, setNumberOfQuestions] = useState("");

  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `
      Job Positions: ${jobPosition}, 
      Job Description: ${jobDesc}, 
      Years of Experience: ${jobExperience}. 
      Based on this information, please provide ${numberOfQuestion} technical theory interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResponse = result.response.text();

      MockJsonResponse = MockJsonResponse.replace(/```json|```/g, "");

      setJsonResponse(MockJsonResponse);

      if (MockJsonResponse) {
        const res = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResponse,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            jobNumberOfQues: numberOfQuestion,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted id:", res);
        if (res && openDialog) {
          router.push("/dashboard/interview/" + res[0]?.mockId);
          setOpenDialog(false);
        }
      } else {
        console.log("Error");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
    }
  };

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md hover:cursor-pointer transition-all"
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl ">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} onKeyDown={handleKeyDown}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job Description,
                    and year of experience
                  </h2>

                  <div className="mt-7 my-">
                    <label>Job Position/Job Role</label>
                    <Input
                      placeholder="Ex. Software Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>

                  <div className="mt-7 my-3">
                    <label>Job Description/Tech Stack (Inshort)</label>
                    <Textarea
                      placeholder="Ex. React, Java, Spring, AWS"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>

                  <div className="mt-7 my-3">
                    <label>Years of Experience (Inshort)</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      min="0"
                      max="100"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>

                  <div className="mt-7 my-">
                    <label>Number of Interview Questions.</label>
                    <Input
                      placeholder="Ex. 7"
                      min="1"
                      max="10"
                      type="number"
                      required
                      onChange={(event) =>
                        setNumberOfQuestions(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-5">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
