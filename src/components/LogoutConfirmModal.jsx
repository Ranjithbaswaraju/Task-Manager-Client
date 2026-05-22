import { LogOut } from "lucide-react";

const LogoutConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <button
        type="button"
        aria-label="Close logout confirmation"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-md bg-[#1E293B] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-red-500/10 flex items-center justify-center">
            <LogOut className="text-red-400" size={22} />
          </div>
          <h2
            id="logout-modal-title"
            className="text-xl sm:text-2xl font-bold text-white"
          >
            Confirm Logout
          </h2>
        </div>

        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          Are you sure you want to logout?
        </p>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:flex-1 py-3 rounded-xl font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 transition-all duration-300"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
