import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bgImage from './assets/bg-image.jpg';

const API_URL = 'https://contact-manger-server.onrender.com/contacts';

const App = () => {

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '', address: '' });
  const [editContact, setEditContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  console.log(contacts);
  

  const fetchContacts = async () => {
    const response = await axios.get(API_URL);
    setContacts(response.data);
  };

  const createContact = async () => {
    const { name, phone, email, address } = newContact;
    if (name && phone && email && address) {
      await axios.post(API_URL, newContact);
      fetchContacts();
      setNewContact({ name: '', phone: '', email: '', address: '' });
    } else {
      alert("Please fill in all fields before adding a contact.");
    }
  };

  const openEditModal = (contact) => {
    setEditContact(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditContact(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditContact({ ...editContact, [name]: value });
  };

  const updateContact = async () => {
    if (editContact) {
      await axios.put(`${API_URL}/${editContact.id}`, editContact);
      fetchContacts();
      closeModal();
    }
  };

  const deleteContact = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchContacts();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 className="text-light mt-4 mb-4">Contact Manager</h1>

      {/* Add Contact Form */}
      <div
        className="card mt-3 p-4 mb-5 w-50 shadow-sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(5px)',
          borderRadius: '8px',
        }}
      >
        <h2 className="mb-3">Add New Contact</h2>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={newContact.address}
            onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
          />
        </div>
        <button className="btn btn-primary" onClick={createContact}>Add Contact</button>
      </div>

      {/* Contact List */}
      <div className="container card p-4 w-75 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
  <h2 className="mb-4 text-center" style={{ color: '#333' }}>Contact List</h2>
  <ul className="list-group">
    {contacts.map((contact) => (
      <li
        key={contact.id}
        className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3"
        style={{
          borderRadius: '8px',
          border: '1px solid #ddd',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div>
          <h5 className="fw-bold" style={{ color: '#007bff' }}>{contact.name}</h5>
          <p className="mb-1" style={{ fontSize: '0.9rem', color: '#555' }}>Phone: {contact.phone}</p>
          <p className="mb-1" style={{ fontSize: '0.9rem', color: '#555' }}>Email: {contact.email}</p>
          <p className="mb-1" style={{ fontSize: '0.9rem', color: '#555' }}>Address: {contact.address}</p>
        </div>
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            style={{ fontWeight: '500', color: '#fff' }}
            onClick={() => openEditModal(contact)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            style={{ fontWeight: '500' }}
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>



      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Contact</h5>
              </div>
              <div className="modal-body">
                <div className="form-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editContact.name}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={editContact.phone}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={editContact.email}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={editContact.address}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={updateContact}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
