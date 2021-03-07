import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Toolbar.css";
//import NavigationItems from "../NavigationItems/NavigationItems";
import { connect } from "react-redux";
import { setCalendarMode } from "../../../store/actions/index";

const Toolbar = (props) => {
  const handleCalendarMode= ()=>{
    props.setCalendarMode(!props.calendarMode);
  };
  return(
  <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mb-0" fixed="top">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
       {/* {!props.isAuth
            ? <Nav.Link href="/auth">Login</Nav.Link>
            : <Nav.Link href="/logout">Logout</Nav.Link>} */}
            <Nav.Link href="/">Calendar</Nav.Link>
            <Nav.Link href="/stopwatch">Stopwatch</Nav.Link>
            <Nav.Link href="/countdown">Countdown</Nav.Link>
            {!props.isAuth
            ? <Nav.Link href="/auth">Login</Nav.Link>
            : <NavDropdown title="Profile">
                <NavDropdown.Item href="/changeemail">Change Email</NavDropdown.Item>
                <NavDropdown.Item href="/changepassword">Change Password</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>} 
      </Nav>
      <Nav>
        { props.calendarMode && <Nav.Link href="#" onClick={()=> handleCalendarMode()}>Day Mode</Nav.Link> }
        { !props.calendarMode && <Nav.Link href="#" onClick={()=> handleCalendarMode()}>Month Mode</Nav.Link> }
        
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)};
const mapStateToProps = (state) => {
  return {
    calendarMode: state.calendarMode,
  };
};

const mapDispatchToProps = { setCalendarMode };

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);