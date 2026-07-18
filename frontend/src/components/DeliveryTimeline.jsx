import { Check, Circle } from "lucide-react";

const STEPS = ["Placed", "Confirmed", "Packed", "Shipped", "Out For Delivery", "Delivered"];

function DeliveryTimeline({ currentStatus }) {
  if (currentStatus === "Cancelled") {
    return (
      <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-5">
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0">
          <Circle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="font-medium text-red-700 dark:text-red-400">Order Cancelled</p>
          <p className="text-sm text-red-500 dark:text-red-400/80">This order has been cancelled.</p>
        </div>
      </div>
    );
  }

  const currentIndex = STEPS.indexOf(currentStatus);

  return (
    <div>
      {STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  isCompleted
                    ? "bg-[#6D5DF6] text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-gray-600"
                }`}
              >
                {isCompleted ? <Check size={16} /> : <Circle size={8} className="fill-current" />}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 min-h-[32px] transition-colors duration-300 ${
                    index < currentIndex ? "bg-[#6D5DF6]" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                ></div>
              )}
            </div>
            <div className={isLast ? "pb-0" : "pb-8"}>
              <p className={`font-medium ${isCompleted ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                {step}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeliveryTimeline;