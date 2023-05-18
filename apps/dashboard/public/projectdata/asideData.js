import { MdSpaceDashboard, MdRateReview } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";

export const items = [
  {
    id: 1,
    name: "Dashboard",
    to: "/",
    icon: <MdSpaceDashboard />,
  },
  {
    id: 2,
    name: "All Blogs",
    to: "/blogs",
    icon: <FaListAlt />,
  },
  {
    id: 3,
    name: "Create Blog",
    to: "/newblog",
    icon: <IoIosCreate />,
  },
  {
    id: 4,
    name: "Reviews",
    to: "/reviews",
    icon: <MdRateReview />,
  },
];
