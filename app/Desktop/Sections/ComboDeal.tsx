"use client";

import { useRef, useState, useEffect } from "react";
import ProductCard2 from '@components/ProductCard2';
import ForwardArrow from '@components/ForwardArrow';
import BackwardArrow from '@components/BackwardArrow';

export default function ComboDeal() {
  const banner4Img = '/images/Banner4.png';
  const productImg = '/images/product.png'; 
  const hoverimg = '/images/category.png'; // Added leading slash
  
  const comboProducts = [
    { img: productImg, nameEn: 'Hibiscus Tea', nameUr: 'ہیبسکس چائے', description: 'Natural Tea', rating: 4.7, reviews: 406, price: 1149, oldPrice: 1299, sale: '20% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Green Tea', nameUr: 'گرین ٹی', description: 'Organic Tea', rating: 4.5, reviews: 320, price: 999, oldPrice: 1200, sale: '15% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Black Tea', nameUr: 'کالی چائے', description: 'Strong Tea', rating: 4.8, reviews: 512, price: 1149, oldPrice: 1399, sale: '18% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Chamomile Tea', nameUr: 'کملی چائے', description: 'Relaxing Tea', rating: 4.6, reviews: 280, price: 899, oldPrice: 1099, sale: '10% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Hibiscus Tea', nameUr: 'ہیبسکس چائے', description: 'Natural Tea', rating: 4.7, reviews: 406, price: 1149, oldPrice: 1299, sale: '20% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Green Tea', nameUr: 'گرین ٹی', description: 'Organic Tea', rating: 4.5, reviews: 320, price: 999, oldPrice: 1200, sale: '15% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Black Tea', nameUr: 'کالی چائے', description: 'Strong Tea', rating: 4.8, reviews: 512, price: 1149, oldPrice: 1399, sale: '18% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Hibiscus Tea', nameUr: 'ہیبسکس چائے', description: 'Natural Tea', rating: 4.7, reviews: 406, price: 1149, oldPrice: 1299, sale: '20% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Green Tea', nameUr: 'گرین ٹی', description: 'Organic Tea', rating: 4.5, reviews: 320, price: 999, oldPrice: 1200, sale: '15% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Black Tea', nameUr: 'کالی چائے', description: 'Strong Tea', rating: 4.8, reviews: 512, price: 1149, oldPrice: 1399, sale: '18% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Green Tea', nameUr: 'گرین ٹی', description: 'Organic Tea', rating: 4.5, reviews: 320, price: 999, oldPrice: 1200, sale: '15% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Black Tea', nameUr: 'کالی چائے', description: 'Strong Tea', rating: 4.8, reviews: 512, price: 1149, oldPrice: 1399, sale: '18% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Green Tea', nameUr: 'گرین ٹی', description: 'Organic Tea', rating: 4.5, reviews: 320, price: 999, oldPrice: 1200, sale: '15% OFF', hoverimg: hoverimg },
    { img: productImg, nameEn: 'Black Tea', nameUr: 'کالی چائے', description: 'Strong Tea', rating: 4.8, reviews: 512, price: 1149, oldPrice: 1399, sale: '18% OFF', hoverimg: hoverimg },
  ];

  // Scroll state
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scroll = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = 300; // single card width
    const gap = 24; // gap between cards
    el.scrollBy({ 
      left: direction === "right" ? cardWidth + gap : -(cardWidth + gap), 
      behavior: "smooth" 
    });
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="mt-12">
      {/* Banner before Combo Deals - Full width */}
      <section
        className="w-full relative"
        style={{
          backgroundImage: `url(${banner4Img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '1104px',
          width: '100%',
        }}
      ></section>

      {/* Content with 4% margins */}
      <div className="mx-[4%]">
        {/* Section Heading with Arrows */}
        <div className="flex items-center justify-between mt-12 mb-4">
          <h2 className="text-3xl font-semibold font-poppins">
            Combo <span className="text-[#197B33]">Deals</span>
          </h2>

          <div className="flex gap-2">
            <BackwardArrow disabled={!canScrollLeft} onClick={() => scroll("left")} />
            <ForwardArrow disabled={!canScrollRight} onClick={() => scroll("right")} />
          </div>
        </div>

        {/* Product Cards */}
        <div 
          ref={sliderRef} 
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-20"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {comboProducts.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-[300px]">
              <ProductCard2 product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}