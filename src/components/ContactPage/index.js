import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import NavBar from "../NavBar";
import "./index.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";
import ContactItem from "../ContactItem";

const ContactPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null); // State variable to store the contact being edited
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [statusInput, setStatusInput] = useState("Active");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedContactForDetails, setSelectedContactForDetails] =
    useState(null);

  // Function to open the details modal
  const handleViewContactDetails = (contact) => {
    setSelectedContactForDetails(contact);
    setShowDetailsModal(true);
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      setContacts(updatedContacts);
      saveContactsToLocalStorage(updatedContacts); // Save updated contacts to local storage
    }
  };

  const handleShowModal = () => {
    setSelectedContact(null); // Reset selectedContact when opening the modal to add a new contact
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setStatusInput("Active");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setFirstNameInput(contact.firstName);
    setLastNameInput(contact.lastName);
    setEmailInput(contact.email);
    setStatusInput(contact.status);
    setShowModal(true);
  };

  const handleSaveContact = () => {
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const statusElement = document.querySelector(
      'input[name="status"]:checked'
    );

    if (!firstName || !lastName || !email || !statusElement) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedContacts = [...contacts];

    if (selectedContact) {
      // If selectedContact is not null, it means we're editing an existing contact
      const editedContactIndex = updatedContacts.findIndex(
        (contact) => contact.id === selectedContact.id
      );
      if (editedContactIndex !== -1) {
        updatedContacts[editedContactIndex] = {
          ...selectedContact,
          firstName,
          lastName,
          email,
          status: statusElement.value,
        };
      }
    } else {
      // If selectedContact is null, it means we're adding a new contact
      const newContact = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        status: statusElement.value,
      };
      updatedContacts.push(newContact);
    }

    setContacts(updatedContacts);
    handleCloseModal();
    saveContactsToLocalStorage(updatedContacts); // Save updated contacts to local storage
  };

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchInput.toLowerCase());
  });

  const renderContacts = () => {
    return (
      <div className="contacts-list">
        <Button className="add-contact-btn" onClick={handleShowModal}>
          Add Contact <BiAddToQueue />
        </Button>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className="pg-main-head">Add Contact</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add your contact form or content here */}
            <form className="form">
              <div className="ip">
                <div className="ip-container">
                  <label htmlFor="fname" className="n-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="n-field"
                    id="fname"
                    placeholder="Enter here"
                    value={firstNameInput}
                    onChange={(e) => setFirstNameInput(e.target.value)}
                  />
                </div>
                <div className="ip-container">
                  <label className="n-label" htmlFor="lname">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="n-field"
                    id="lname"
                    placeholder="Enter here"
                    value={lastNameInput}
                    onChange={(e) => setLastNameInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="ip-container e">
                <label className="n-label" htmlFor="email">
                  Email
                </label>
                {/* Add email input */}
                <input
                  type="email"
                  className="n-field"
                  id="email"
                  placeholder="Enter email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div className="radio-btn-card">
                <label className="lname">Status:</label>
                <div className="radio-options">
                  <div className="radio-option">
                    <input
                      className="r"
                      type="radio"
                      id="active"
                      name="status"
                      value="Active"
                      required
                    />
                    <label className="lname" htmlFor="active">
                      Active
                    </label>
                  </div>
                  <div className="radio-option">
                    <input
                      className="r"
                      type="radio"
                      id="inactive"
                      name="status"
                      value="Inactive"
                      required
                    />
                    <label htmlFor="inactive">Inactive</label>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveContact}>
              Save Contact
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Display saved contacts */}
        <ul className="saved-contacts">
          {filteredContacts.length === 0 ? (
            <li className="no-contacts-card">
              <p className="emoji">
                <BsFillEmojiFrownFill />
              </p>
              <p className="worning">
                Oops! It seems there are no contacts here. Click the{" "}
                <span className="span-add">"Add Contact"</span> button button to
                get started.
              </p>
            </li>
          ) : (
            <>
              <div className="col-names">
                <h4 className="col-name">Contact Id</h4>
                <h4 className="col-name status">Status</h4>
                <h4 className="col-name">Name</h4>
              </div>
              {filteredContacts.map((contact) => (
                <ContactItem
                  contact={contact}
                  key={contact.id}
                  onEditContact={handleEditContact}
                  onDeleteContact={handleDeleteContact}
                  onViewContactDetails={handleViewContactDetails}
                />
              ))}
            </>
          )}
        </ul>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="header">
        <h2 className="pg-main-head">Contacts</h2>
        <div className="search-box">
          <input
            type="search"
            value={searchInput}
            className="input"
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <BsSearch className="search-i" />
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Check if there are contacts in local storage
    const storedContacts = localStorage.getItem("contacts");

    if (storedContacts) {
      // If contacts exist in local storage, parse and set them as the initial state
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  // Function to save contacts to local storage
  const saveContactsToLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  return (
    <div className="contact-pg-main-container">
      <NavBar />
      <div className="contacts-container">
        {/* Header */}
        {renderHeader()}

        {/* Contacts List */}
        {renderContacts()}

        {/*Contact Details Modal */}
        {selectedContactForDetails && (
          <Modal
            show={showDetailsModal}
            onHide={() => setShowDetailsModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h2 className="pg-main-head">Contact Details</h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="contact-details">
                <FaUserCircle className="user-i" />
                <div className="details-card">
                  <p className="view-items">
                    <span className="strong">Name:</span>{" "}
                    {selectedContactForDetails.firstName}{" "}
                    {selectedContactForDetails.lastName}
                  </p>
                  <p className="view-items">
                    <span className="strong">Email:</span>{" "}
                    {selectedContactForDetails.email}
                  </p>
                  <p className="view-items">
                    <span className="strong">Status:</span>{" "}
                    {selectedContactForDetails.status}
                  </p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
