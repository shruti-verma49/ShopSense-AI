import { Loader2 } from "lucide-react";

const variantStyles = {
  primary: "bg-[#6D5DF6] text-white hover:bg-[#5b4de0] shadow-sm hover:shadow-md",
  secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700",
  outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-[#6D5DF6] hover:text-[#6D5DF6]",
  danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md",
};

function Button({ variant = "primary", isLoading = false, disabled = false, children, className = "", ...props }) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export default Button;