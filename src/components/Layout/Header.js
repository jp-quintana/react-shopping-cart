import { useState } from "react";

import Nav from "../Nav";
import SideNav from "../SideNav";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <SideNav toggle={toggle} isOpen={isOpen} />
      <Nav toggle={toggle} />
    </header>
  );
};

export default Header;
