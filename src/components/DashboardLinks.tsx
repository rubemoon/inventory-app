import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Users2, CalendarCheck, BookOpen, Settings } from 'lucide-react';

interface DashboardLinkProps {
  id: number;
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const dashboardLinks: DashboardLinkProps[] = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Products",
    href: "/dashboard/products",
    icon: Users2,
  },
  {
    id: 2,
    name: "Suppliers",
    href: "/dashboard/suppliers",
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: "Orders",
    href: "/dashboard/orders",
    icon: BookOpen,
  },
  {
    id: 4,
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: Settings,
  },
];

const DashboardLinks: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      {dashboardLinks.map((link) => (
        <Link
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            location.pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          }`}
          key={link.id}
          to={link.href}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default DashboardLinks;