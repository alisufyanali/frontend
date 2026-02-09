"use client";

import React, { useRef, useEffect, useState } from 'react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';

interface VideoProduct {
  video: string;
  topImage: string;
  productImage: string;
  nameEn: string;
  nameUr: string;
  price: number | string;
  oldPrice?: number | string;
  sale?: string;
  views?: string;
  [key: string]: any;
}

interface VideoProductCardProps {
  product: VideoProduct;
}

export default function VideoProductCard({ product }: VideoProductCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current && !videoError && videoLoaded) {
        try {
          console.log('Attempting to play video:', product.video);
          videoRef.current.muted = true;
          await videoRef.current.play();
          console.log('Video playback started');
        } catch (error) {
          console.log('Autoplay prevented:', error);
        }
      }
    };

    if (videoLoaded) {
      playVideo();
    }
  }, [videoError, videoLoaded, product.video]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video failed to load:', product.video, e);
    setVideoError(true);
  };

  const handleVideoLoaded = () => {
    console.log('Video loaded successfully:', product.video);
    setVideoLoaded(true);
  };

  return (
    <div className="w-[274px] h-[495px] rounded-[18px] border border-gray-300 overflow-hidden flex flex-col bg-white">
      
      {/* Top Section - VIDEO (replaces image) */}
      <div className="relative w-full h-[323px] rounded-t-[18px] overflow-hidden bg-black">
        {/* Video Player */}
        {!videoError ? (
          <video
            ref={videoRef}
            src={product.video}
            className="w-full h-full object-cover"
            loop
            muted
            autoPlay
            playsInline
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
          />
        ) : (
          <img
            src={product.topImage}
            alt="Product"
            className="w-full h-full object-cover"
          />
        )}

        {/* Show loading indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-white">Loading video...</div>
          </div>
        )}

        {/* Views badge bottom-left */}
        {product.views && (
          <div className="absolute bottom-2 left-2 rounded-[5px] px-2 py-1 text-xs font-medium flex items-center justify-center backdrop-blur-sm bg-white/20 text-white">
            {product.views} Views
          </div>
        )}

        {/* Bottom-right icons: Share & Heart */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button 
            className="p-1 rounded bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label="Share"
          >
            <FaShareAlt size={14} />
          </button>
          <button 
            className="p-1 rounded bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label="Add to favorites"
          >
            <FaHeart size={14} />
          </button>
        </div>
      </div>

      {/* Lower Details Section */}
      <div className="flex p-2 flex-1 gap-2">
        {/* Left Side: Product thumbnail */}
        <div className="flex flex-col items-start gap-2">
          <img
            src={product.productImage}
            alt={product.nameEn}
            className="w-[61px] h-[54px] rounded-[4px] object-cover"
          />
          {product.sale && (
            <div className="text-[11px] font-medium font-poppins leading-[19.2px] text-center text-black px-1 py-0.5 rounded bg-white border border-gray-300">
              {product.sale}
            </div>
          )}
        </div>

        {/* Right Side: Product info */}
        <div className="flex-1 flex flex-col justify-center gap-1 mb-10">
          <p className="text-[14px] font-medium">{product.nameEn}</p>
          <p className="text-[14px] font-medium">{product.nameUr}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[20px] font-poppins font-semibold leading-[25.6px]">
              PKR {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                PKR {product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}