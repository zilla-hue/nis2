import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { colors } from './colors';

interface EventCardProps {
  date: number;
  month: string;
  title: string;
  description: string;
  price: string;
  backgroundImage: string;
}

const EventCard: React.FC<EventCardProps> = ({
  date,
  month,
  title,
  description,
  price,
  backgroundImage,
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      data-aos-delay={100}
      className="relative w-full h-[300px] rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
    >
      <img
        src={backgroundImage}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 mr-2" color={colors.light.accent} />
            <span className="text-sm font-medium">
              {month} {date}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm line-clamp-2 mb-2">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <span
            className="text-lg font-bold"
            style={{ color: colors.light.accent }}
          >
            {price}
          </span>
          <button
            className="flex items-center px-4 py-2 rounded text-sm font-medium transition-all duration-300 hover:bg-white/20"
            style={{
              backgroundColor: colors.light.accent,
              color: colors.light.secondary.main,
            }}
          >
            Get Ticket
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
