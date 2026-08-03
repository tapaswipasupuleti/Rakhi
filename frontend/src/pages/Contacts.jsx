import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import EditContactModal from "../components/EditContactModal";
import DeleteContactModal from "../components/DeleteContactModal";
import api from "../services/api";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Delete Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const token = localStorage.getItem("access");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts/", config);
      setContacts(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load contacts");
    }
  };

  const addContact = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/contacts/",
        {
          name,
          relationship,
          phone_number: phoneNumber,
        },
        config
      );

      setName("");
      setRelationship("");
      setPhoneNumber("");

      fetchContacts();

      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Unable to add contact");
    }
  };

  // ---------- Edit Contact ----------

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
  };

  const saveEditedContact = async (updatedContact) => {
    try {
      await api.put(
        `/contacts/${selectedContact.id}/`,
        updatedContact,
        config
      );

      fetchContacts();

      toast.success("Contact Updated Successfully");

      closeEditModal();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Unable to update contact");
    }
  };

  // ---------- Delete Contact ----------

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/contacts/${deleteId}/`, config);

      fetchContacts();

      toast.success("Contact Deleted Successfully");

      closeDeleteModal();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Unable to delete contact");
    }
  };
    return (
    <Layout>
      <div className="text-white">

        <EditContactModal
          isOpen={isModalOpen}
          onClose={closeEditModal}
          onSave={saveEditedContact}
          contact={selectedContact}
        />

        <DeleteContactModal
          isOpen={isDeleteOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />

        <h1 className="text-4xl font-bold mb-8">
          Emergency Contacts
        </h1>

        <form
          onSubmit={addContact}
          className="bg-slate-800 p-6 rounded-xl mb-10 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-5">

            <input
              className="p-3 rounded text-black"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <select
              className="p-3 rounded text-black"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
            >
              <option value="">Select Relationship</option>
              <option>Mother</option>
              <option>Father</option>
              <option>Brother</option>
              <option>Sister</option>
              <option>Friend</option>
              <option>Guardian</option>
              <option>Other</option>
            </select>

            <input
              className="p-3 rounded text-black"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
          >
            Add Contact
          </button>

        </form>

        <div className="space-y-5">

          {contacts.map((contact) => (

            <div
              key={contact.id}
              className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center"
            >

              <div>

                <h2 className="text-2xl font-bold">
                  {contact.name}
                </h2>

                <p className="mt-2">
                  <strong>Relationship:</strong> {contact.relationship}
                </p>

                <p className="mt-2">
                  📞 {contact.phone_number}
                </p>

              </div>

              <div className="flex gap-3 mt-5 md:mt-0">

                <button
                  type="button"
                  onClick={() => openEditModal(contact)}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => openDeleteModal(contact.id)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </Layout>
  );
}

export default Contacts;