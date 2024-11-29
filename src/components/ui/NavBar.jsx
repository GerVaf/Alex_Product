/* eslint-disable react/prop-types */
import { IconArrowRight, IconMenu } from "@tabler/icons-react";
import useSidebarStore from "../../store/useSidebarStore";
import { Link } from "react-router-dom";

const NavBar = ({ padding }) => {
  const { isSidebarVisible, toggleSidebar } = useSidebarStore();
  return (
    <div className={`w-full flex justify-between ${padding} `}>
      {/* Toggle button for Sidebar */}
      <button onClick={() => toggleSidebar(!isSidebarVisible)}>
        <IconMenu />
      </button>
      <Link to={"/blog"} className="primary-btn gap-5 ">
        <p>Read Blog</p> <IconArrowRight size={20} />
      </Link>
    </div>
  );
};

export default NavBar;
