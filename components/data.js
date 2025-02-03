import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";


import benefitOneImg from "../public/benefit-one.png"
import benefitTwoImg from "../public/benefit-two.png"

const benefitOne = {
  title: "Benefits of InterviewIQ",
  desc: "Whether you're a beginner or a seasoned professional, InterviewIQ adapts to your needs and helps you excel.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Realistic Mock Interviews",
      desc:"Simulate actual interview scenarios to build confidence and improve your performance under pressure.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Performance Ratings",
      desc: "Save time by focusing on relevant questions and topics instead of generic interview materials.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Time-Efficient Preparation",
      desc: "This will be your last bullet point in this section.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Some more benefits here",
  desc: "With AI-driven feedback and rating, users receive detailed insights into their strengths and areas for improvement, helping them refine their responses effectively.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Customizable",
      desc: "Easily adapt the platform to fit specific needs or integrate into existing systems.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Actionable Feedback",
      desc: "Receive detailed insights and ratings to identify strengths and areas for improvement.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Tech-Specific Focus",
      desc: "Gain the skills and assurance to excel in real interviews. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
