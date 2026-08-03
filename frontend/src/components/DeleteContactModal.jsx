function DeleteContactModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-800 rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-red-500 mb-4">
          🗑️ Delete Contact
        </h2>

        <p className="text-white mb-8">
          Are you sure you want to delete this contact?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteContactModal;