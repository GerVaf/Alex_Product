/* eslint-disable react/prop-types */
import { IconMenu } from "@tabler/icons-react";
import useSidebarStore from "../../store/useSidebarStore";

const NavBar = ({ padding }) => {
  const { isSidebarVisible, toggleSidebar } = useSidebarStore();
  return (
    <div className={`w-full flex justify-between ${padding} `}>
      {/* Toggle button for Sidebar */}
      <button onClick={() => toggleSidebar(!isSidebarVisible)}>
        <IconMenu />
      </button>
      <button className="primary-btn">Contact</button>
    </div>
  );
};

export default NavBar;
