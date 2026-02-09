import VideoProductCard2 from "../../components/VideoProductCard2";
import { videoProducts } from "../../data/videoProducts";

export default function VideoProductsSection() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center sm:text-left">
        Related Products
      </h2>
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {videoProducts.map((videoProduct) => (
          <div key={videoProduct.id} className="w-full flex justify-center sm:justify-start">
            <VideoProductCard2 product={videoProduct} />
          </div>
        ))}
      </div>
    </div>
  );
}