// app/Desktop/Sections/Blog.tsx
"use client";

import { blogPosts } from '../data/blogposts';
import BlogCard from '../components/BlogCard';
import Link from 'next/link';

export default function Blog() {
  // Get latest 3 blog posts
  const latestBlogs = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="my-16 mx-[4%]">
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl text-gray-900 mb-2">
            Wellness Blog
          </h2>
          <p className="text-gray-600">
            Health tips, wellness advice, and natural remedies
          </p>
        </div>
        <Link
          href="/blog"
          className="mt-4 md:mt-0 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors inline-flex items-center gap-2"
        >
          View All Articles
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="relative">
        <div 
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        
        {/* Gradient Fade - Right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        
        {/* Gradient Fade - Left (only visible when scrolled) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-0" />
      </div>

      {/* View All (Mobile) */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/blog"
          className="inline-block px-8 py-3 border border-green-700 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors"
        >
          See All Articles
        </Link>
      </div>
    </section>
  );
}