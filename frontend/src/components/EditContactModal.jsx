import { useEffect, useState } from "react";

function EditContactModal({
  isOpen,
  onClose,
  onSave,
  contact,
}) {
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone_number: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        relationship: contact.relationship,
        phone_number: contact.phone_number,
      });
    }
  }, [contact]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-800 rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-white mb-6">
          ✏️ Edit Contact
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="w-full p-3 rounded text-black mb-4"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            required
          />

          <select
            className="w-full p-3 rounded text-black mb-4"
            value={formData.relationship}
            onChange={(e) =>
              setFormData({
                ...formData,
                relationship: e.target.value,
              })
            }
            required
          >
            <option>Mother</option>
            <option>Father</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Friend</option>
            <option>Guardian</option>
            <option>Other</option>
          </select>

          <input
            className="w-full p-3 rounded text-black mb-6"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone_number: e.target.value,
              })
            }
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditContactModal;