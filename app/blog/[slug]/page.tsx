// app/blog/[slug]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "../../Desktop/data/blogposts";
import { 
  FaCalendar, 
  FaClock,
  FaUser,
  FaTag,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";

// Skeletal Loading Component for Blog Detail
function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Back Button Skeleton */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Article Content Skeleton */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Skeleton */}
        <div className="mb-6">
          <div className="w-32 h-8 bg-gray-200 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="h-12 bg-gray-300 rounded w-full mb-6"></div>

        {/* Meta Information Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="flex gap-3">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="mb-12">
          <div className="w-full h-[400px] bg-gray-300 rounded-xl"></div>
        </div>

        {/* Article Content Skeleton */}
        <div className="space-y-4 mb-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 bg-gray-200 rounded ${i % 3 === 0 ? 'w-full' : 'w-11/12'}`}></div>
              <div className={`h-4 bg-gray-200 rounded ${i % 3 === 0 ? 'w-11/12' : 'w-full'}`}></div>
              <div className={`h-4 bg-gray-200 rounded ${i % 3 === 0 ? 'w-4/5' : 'w-10/12'}`}></div>
            </div>
          ))}
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-20 h-8 bg-gray-200 rounded-lg"></div>
          ))}
        </div>

        {/* Author Bio Skeleton */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="space-y-3 flex-1">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded w-10/12"></div>
            </div>
          </div>
        </div>

        {/* Related Articles Skeleton */}
        <div className="mb-12">
          <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="text-center">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto"></div>
        </div>
      </article>
    </div>
  );
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [isLoading, setIsLoading] = useState(true);
  
  const post = blogPosts.find(post => post.slug === slug);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;

  // Get related posts
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors text-sm font-medium"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category */}
        <div className="mb-6">
          <span className="px-4 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Share Buttons - Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">Share:</span>
            {[
              { icon: FaFacebook, color: 'bg-blue-600 hover:bg-blue-700', label: 'Facebook' },
              { icon: FaTwitter, color: 'bg-sky-500 hover:bg-sky-600', label: 'Twitter' },
              { icon: FaLinkedin, color: 'bg-blue-700 hover:bg-blue-800', label: 'LinkedIn' },
              { icon: FaWhatsapp, color: 'bg-green-600 hover:bg-green-700', label: 'WhatsApp' },
            ].map((social, index) => (
              <a
                key={index}
                href={`${social.icon === FaWhatsapp ? `https://wa.me/?text=${shareTitle} ${shareUrl}` : 
                       social.icon === FaFacebook ? `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` :
                       social.icon === FaTwitter ? `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}` :
                       `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 ${social.color} text-white rounded-full flex items-center justify-center transition-colors`}
                aria-label={`Share on ${social.label}`}
              >
                <social.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={500}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
          <span className="flex items-center gap-1 text-gray-600">
            <FaTag className="w-3 h-3" />
            Tags:
          </span>
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={80}
              height={80}
              className="rounded-full flex-shrink-0"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author.name}</h3>
              <p className="text-gray-700">{post.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-green-700 mb-1">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
          >
            <FaArrowRight />
            Explore More Articles
          </Link>
        </div>
      </article>
    </div>
  );
}