import * as React from "react";
import Products from "../Products/Products";
import { Routes, Route } from "react-router";
import "./Navbar.css";

export default function Navbar({ navLinks }) {
  return (
    <nav className="navbar">
      <NavLinks navLinks={navLinks} />
    </nav>
  );
}
export function NavLinks({ navLinks }) {
  return (

    <ul className="nav-links">
      {navLinks.map((link) => (
        <NavLink key={link.label} navLink={link} />
      ))}
    </ul>
  );
}
export function NavLink({ navLink }) {
  return <li className="navLink">{navLink.label}</li>;
}
