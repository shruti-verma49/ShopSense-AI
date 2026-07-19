import { useState } from "react";

function ProductGallery({ product }) {
  const { image, images = [], icon: Icon, title } = product;
  const gallery = image ? [image, ...images] : [];
  const [selectedImage, setSelectedImage] = useState(image || "");

  if (!image) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-80 md:h-96 rounded-2xl bg-gradient-to-br from-[#6D5DF6]/10 to-[#5B8DEF]/10 flex items-center justify-center">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center">
            <Icon size={52} className="text-white" />
          </div>
        </div>

        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#6D5DF6]/10 to-[#5B8DEF]/10 border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer hover:border-[#6D5DF6] transition-all duration-200"
            >
              <Icon size={22} className="text-[#6D5DF6]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="h-80 md:h-96 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img src={selectedImage} alt={title} loading="lazy" className="w-full h-full object-cover" />
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3">
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === img ? "border-[#6D5DF6]" : "border-gray-200 dark:border-gray-700 hover:border-[#6D5DF6]/50"
              }`}
            >
              <img src={img} alt={`${title} thumbnail ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;