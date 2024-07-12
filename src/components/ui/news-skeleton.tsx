export default function NewsItemSkeleton() {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-video w-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }