function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="h-44 bg-gray-100 dark:bg-gray-700 animate-pulse"></div>

      <div className="p-5">
        <div className="h-3 w-16 rounded-full bg-gray-100 dark:bg-gray-700 animate-pulse"></div>
        <div className="mt-2 h-4 w-3/4 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse"></div>

        <div className="mt-3 h-3 w-20 rounded-full bg-gray-100 dark:bg-gray-700 animate-pulse"></div>

        <div className="mt-3 h-5 w-24 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse"></div>

        <div className="mt-4 h-10 w-full rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;