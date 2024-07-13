import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { SidebarTabItem } from "../../lib/types";

export const linkClass =
  "w-fit md:w-full md:flex items-center gap-2 font-light p-3 hover:bg-blue-50 hover:no-underline active:bg-blue-100 rounded-lg text-sm font-semibold duration-200";

interface SidebarLinkProps {
  item: SidebarTabItem;
}

const SidebarLink = ({ item }: SidebarLinkProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === item.path;
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className={classNames(
        isActive ? "bg-blue-100 text-blue-500" : "text-gray-700",
        linkClass
      )}
    >
      <span
        className={classNames(
          isActive ? "text-blue-500" : "text-gray-700",
          "text-xl"
        )}
      >
        <Icon className={!isActive ? "brightness-0 opacity-80" : ""} />
      </span>
      <span className="hidden md:inline">{item.label}</span>
    </Link>
  );
};

export default SidebarLink;
