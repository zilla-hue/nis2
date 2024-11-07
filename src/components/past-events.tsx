import React from "react";
import Carousel from "react-multi-carousel";

interface PastEventProps {
  title: string;
  date: string;
  description: string;
  imageSrc: string;
}

const PastEvent: React.FC<PastEventProps> = ({
  title,
  date,
  description,
  imageSrc,
}) => (
  <div
    data-aos="fade-up"
    data-aos-anchor-placement="top-center"
    data-aos-delay={100}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <img
      src={imageSrc}
      alt={title}
      width={400}
      height={250}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{date}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
// varius enim in eros elementum tristique.

const PastEventsSection = () => {
  const pastEvents = [
    {
      title: "Lorem ipsum dolor sit amet",
      date: "June 15, 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      imageSrc: "/images/financial-literacy-workshop.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      date: "August 1, 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      imageSrc: "/images/app-launch-party.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      date: "September 20, 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      imageSrc: "/images/small-business-meetup.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      date: "October 10, 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      imageSrc: "/images/community-outreach.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      date: "November 5-30, 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      imageSrc: "/images/youth-savings-challenge.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      date: "December 15, 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      imageSrc: "/images/customer-appreciation-day.jpg",
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div data-aos="fade-up" className="flex items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mr-auto text-gray-900 dark:text-white">
            Past Events
          </h2>
          <hr className="flex-grow border-t border-black dark:border-white" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((event, index) => (
            <PastEvent key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEventsSection;

// import React from "react";
// import BidSlider from "../helpers/bid-slider";

// const PastEventsPage = () => {
//   return (
//     <div className="pt-[5rem] pb-[3rem] dark:bg-blue-900">
//       <div className="text-center">
//         <p className="heading__mini text-black dark:text-white">Past Events</p>
//         <h1 className="heading__primary mt-[0.5rem] text-slate-600 dark:text-white">
//           View <span className="dark:text-yellow-300 text-yellow-600">Gallary</span>
//         </h1>
//       </div>
//       <div className="w-[80%] mx-auto pt-[5rem]">
//         <BidSlider />
//       </div>
//     </div>
//   );
// };

// export default PastEventsPage;
