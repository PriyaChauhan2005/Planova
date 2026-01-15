import React, { useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  Calendar,
  Bell,
  BarChart3,
  Settings as SettingsIcon,
  Menu,
  X,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoIcon from "../../assets/logo.png";
import brandName from "../../assets/brand.png";

const Sidebar = ({ isSynced = true }) => {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation config
  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Plan", icon: <Calendar size={20} />, path: "/plan" },
    { name: "Reminders", icon: <Bell size={20} />, path: "/reminders" },
    { name: "Progress", icon: <BarChart3 size={20} />, path: "/progress" },
    { name: "Settings", icon: <SettingsIcon size={20} />, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-5 left-5 z-50 p-2.5 bg-white rounded-xl shadow-lg border border-gray-100 text-planova-dark"
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar Panel */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 flex flex-col z-40 transition-transform duration-300 w-64 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="p-8 flex items-center gap-3">
          <img src={logoIcon} alt="Logo" className="h-8 w-auto" />
          <img src={brandName} alt="Planova" className="h-5 w-auto" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                location.pathname === item.path
                  ? "bg-planova-soft text-planova-dark"
                  : "text-gray-400 hover:bg-gray-50 hover:text-planova-dark"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User & Status Footer */}
        <div className="p-6 border-t border-gray-50 space-y-4">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100/50">
            <div className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${isSynced ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {isSynced ? "Cloud Synced" : "Offline"}
              </p>
            </div>
            {isSynced ? <Wifi size={12} className="text-green-500/50" /> : <WifiOff size={12} className="text-red-500/50" />}
          </div>

          <div className="flex items-center gap-3 p-3 bg-planova-soft rounded-2xl">
            <UserButton afterSignOutUrl="/" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-planova-dark truncate">{user?.firstName || "Student"}</p>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">Premium User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;