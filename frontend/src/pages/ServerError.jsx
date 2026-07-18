import { motion } from "framer-motion";
import { ServerCrash, RefreshCw } from "lucide-react";

function ServerError() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <ServerCrash size={36} className="text-red-500" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Something went wrong</h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          We hit an unexpected error. Please try again in a moment.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
        >
          <RefreshCw size={16} />
          Reload Page
        </button>
      </motion.div>
    </div>
  );
}

export default ServerError;