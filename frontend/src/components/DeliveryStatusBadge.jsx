const STATUS_STYLES = {
  Placed: { dot: "bg-blue-500", text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
  Confirmed: { dot: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
  Packed: { dot: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20" },
  Shipped: { dot: "bg-purple-500", text: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" },
  "Out For Delivery": { dot: "bg-yellow-500", text: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
  Delivered: { dot: "bg-green-500", text: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
  Cancelled: { dot: "bg-red-500", text: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" },
};

function DeliveryStatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Placed;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
      {status}
    </span>
  );
}

export default DeliveryStatusBadge;