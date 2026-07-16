function ProductGallery({ icon: Icon }) {
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
            className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#6D5DF6]/10 to-[#5B8DEF]/10 border border-gray-200 flex items-center justify-center cursor-pointer hover:border-[#6D5DF6] transition-all duration-200"
          >
            <Icon size={22} className="text-[#6D5DF6]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;