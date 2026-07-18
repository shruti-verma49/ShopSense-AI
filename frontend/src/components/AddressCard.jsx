import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";

function AddressCard({ address, onEdit, onDelete, onSetDefault, selectable, isSelected, onSelect }) {
  return (
    <div
      onClick={selectable ? () => onSelect(address._id) : undefined}
      className={`rounded-2xl border p-5 transition-all duration-200 ${selectable ? "cursor-pointer" : ""} ${
        isSelected
          ? "border-[#6D5DF6] bg-[#6D5DF6]/5"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {selectable && (
            <div className="mt-1 shrink-0">
              {isSelected ? (
                <CheckCircle2 size={20} className="text-[#6D5DF6]" />
              ) : (
                <Circle size={20} className="text-gray-300 dark:text-gray-600" />
              )}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">{address.fullName}</span>
              {address.isDefault && (
                <span className="px-2 py-0.5 rounded-full bg-[#6D5DF6]/10 text-[#6D5DF6] text-xs font-medium">
                  Default
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {address.houseNo}, {address.street}
              {address.landmark ? `, ${address.landmark}` : ""}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {address.city}, {address.state} - {address.pincode}, {address.country}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">Phone: {address.phone}</p>
          </div>
        </div>

        {!selectable && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(address); }}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#6D5DF6] transition-colors duration-200"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(address._id); }}
              className="p-2 rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {!selectable && !address.isDefault && (
        <button
          onClick={(e) => { e.stopPropagation(); onSetDefault(address._id); }}
          className="mt-3 text-sm text-[#6D5DF6] font-medium hover:underline"
        >
          Set as Default
        </button>
      )}
    </div>
  );
}

export default AddressCard;