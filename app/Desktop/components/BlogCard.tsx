// components/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
  id: string | number;
  image: string;
  title: string;
  content: string;
  slug: string;
}

interface BlogCardProps {
  blog: Blog;
}

// Helper function to strip HTML tags
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

// Optional: Helper function to truncate text with ellipsis
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export default function BlogCard({ blog }: BlogCardProps) {
  // Clean content by removing HTML tags
  const cleanContent = stripHtmlTags(blog.content);
  
  // Clean title by removing HTML tags
  const cleanTitle = stripHtmlTags(blog.title);

  return (
    <article className="w-[408px] h-[476px] rounded-[14px] border border-gray-300 overflow-hidden flex-shrink-0 hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="w-[384px] h-[217px] mx-auto mt-4 rounded-[14px] overflow-hidden">
        <Image
          src={blog.image}
          alt={cleanTitle}
          width={384}
          height={217}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[239px]">
        <h3 className="font-poppins font-semibold text-[20px] leading-[25.6px] capitalize mb-2 line-clamp-2">
          {cleanTitle}
        </h3>
        <p className="font-poppins font-normal text-[15px] leading-[18.6px] capitalize mb-4 line-clamp-3">
          {cleanContent}
        </p>
        <Link
          href={`/blog/${blog.slug}`}
          className="font-poppins font-medium text-[18px] underline capitalize hover:text-blue-600 transition-colors inline-flex items-center"
        >
          Read More
          <span className="ml-2">→</span>
        </Link>
      </div>
    </article>
  );
}