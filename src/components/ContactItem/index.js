import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

import "./index.css";

const ContactItem = (props) => {
  const { contact, onEditContact, onDeleteContact, onViewContactDetails } =
    props; // Pass onEditContact function from parent

  const { firstName, lastName, email, status, id } = contact;
  const last4CharsOfId = id.slice(-4);

  return (
    <div className="contact-item">
      <p className="col-value w-a">{last4CharsOfId}......</p>
      <p className="col-value status">{status}</p>
      <p className="col-value w-a">
        {firstName} {lastName}
      </p>

      <button
        className="btnn view-btn"
        onClick={() => onViewContactDetails(contact)}
      >
        <BsEye />
      </button>
      <button className="btnn edit-btn" onClick={() => onEditContact(contact)}>
        <BiEditAlt />
      </button>
      <button className="btnn delet-btn" onClick={() => onDeleteContact(id)}>
        <RiDeleteBin6Line />
      </button>
    </div>
  );
};

export default ContactItem;
