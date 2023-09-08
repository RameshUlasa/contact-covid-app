import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

import { IoMdContacts } from "react-icons/io";
import { TbChartSankey } from "react-icons/tb";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import "./index.css";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="nav-mb">
        <Button variant="null" className="varinet" onClick={handleShow}>
          <AiOutlineMenuUnfold className="menu-icon" />
          <h1 className="ofcanvas-head">C - Manager</h1>
        </Button>

        <Offcanvas className="bg-dark" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton className="bg-white">
            <Offcanvas.Title>
              <h1 className="ofcanvas-head">C - Manager</h1>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Link to="/">
              <p className="a-item-mb">
                <IoMdContacts className="icon-mb" /> Contacts
              </p>
            </Link>
            <Link to="/chartsAndmaps">
              <p className="a-item-mb">
                <TbChartSankey className="icon-mb" /> Charts & Maps
              </p>
            </Link>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className="nav-lg">
        <h1 className="ofcanvas-head">C - Manager</h1>

        <div className="nav-i-container">
          <Link to="/">
            <p className="a-item-mb">
              <IoMdContacts className="icon-mb" /> Contacts
            </p>
          </Link>
          <Link to="/chartsAndmaps">
            <p className="a-item-mb">
              <TbChartSankey className="icon-mb" /> Charts & Maps
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
