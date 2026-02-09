import React from 'react';

interface Review {
  title: string;
  text: string;
  name: string;
  designation: string;
  img: string;
  rating?: number;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const rating = review.rating || 5.0;
  
  return (
    <div className="w-[412px] h-[303px] rounded-[21px] border border-gray-300 p-6 flex flex-col justify-between bg-white">
      {/* Review Title */}
      <h3
        className="font-poppins font-semibold text-[18px] leading-[25.6px] capitalize"
        style={{ letterSpacing: 0 }}
      >
        {review.title}
      </h3>

      {/* Review Text */}
      <p
        className="font-poppins font-normal text-[15px] leading-[20.6px] mt-3 capitalize text-gray-700"
        style={{ letterSpacing: 0 }}
      >
        {review.text}
      </p>

      {/* Reviewer Info */}
      <div className="mt-6 flex items-center gap-3">
        {/* Reviewer Picture with green border */}
        <div className="w-12 h-12 rounded-full border-2 border-[#197B33] p-0.5">
          <img
            src={review.img} 
            alt={review.name} 
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Reviewer Name & Designation */}
        <div>
          <p className="font-poppins font-semibold text-[16px]">{review.name}</p>
          <p className="font-poppins font-normal text-[14px] text-gray-600">{review.designation}</p>
          
          {/* Yellow Stars Rating - BELOW the name & designation */}
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 00-1.176 0l-3.376 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.048 9.384c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
            <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}