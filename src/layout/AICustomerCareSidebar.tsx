"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  AiIcon,
  BoxCubeIcon,
  CalenderIcon,
  CallIcon,
  CartIcon,
  ChatIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  MailIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  TaskIcon,
  UserCircleIcon,
} from "../icons";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  new?: boolean;
  pro?: boolean;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// AI Customer Care specific navigation items
const aiCustomerCareItems: NavItem[] = [
  {
    name: "AI Customer Care",
    icon: <AiIcon />,
    new: true,
    subItems: [
      { name: "Dashboard", path: "/templates/ai-customer-care" },
      { name: "Chat Agent", path: "/templates/ai-customer-care/agents/chat", new: true },
      { name: "Voice Agent", path: "/templates/ai-customer-care/agents/voice", new: true },
      { name: "Knowledge Base", path: "/templates/ai-customer-care/knowledge", new: true },
      { name: "Conversation Flows", path: "/templates/ai-customer-care/flows", new: true },
      { name: "Call History", path: "/templates/ai-customer-care/calls/history", new: true },
      { name: "Analytics", path: "/templates/ai-customer-care/analytics", pro: true },
      { name: "Quality Control", path: "/templates/ai-customer-care/quality", pro: true },
      { name: "Monitoring", path: "/templates/ai-customer-care/monitoring", pro: true },
      { name: "Phone Numbers", path: "/templates/ai-customer-care/numbers", new: true },
      { name: "Integrations", path: "/templates/ai-customer-care/integrations", new: true },
      { name: "API Playground", path: "/templates/ai-customer-care/api-playground", new: true },
      { name: "Webhooks", path: "/templates/ai-customer-care/webhooks", new: true },
      { name: "Users", path: "/templates/ai-customer-care/users", new: true },
      { name: "Settings", path: "/templates/ai-customer-care/settings", new: true },
      { name: "Tenant Settings", path: "/templates/ai-customer-care/tenant-settings", pro: true },
    ],
  },
];

const otherItems: NavItem[] = [
  {
    name: "User Profile",
    icon: <UserCircleIcon />,
    path: "/profile",
  },
  {
    name: "Task",
    icon: <TaskIcon />,
    subItems: [
      { name: "Task List", path: "/task-list" },
      { name: "Task Kanban", path: "/task-kanban" },
    ],
  },
  {
    name: "Forms",
    icon: <PageIcon />,
    subItems: [
      { name: "Form Elements", path: "/form-elements" },
      { name: "Form Layout", path: "/form-layout" },
    ],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [
      { name: "Basic Tables", path: "/basic-tables" },
      { name: "Data Tables", path: "/data-tables" },
    ],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank", path: "/blank" },
      { name: "FAQ", path: "/faq" },
      { name: "Pricing Tables", path: "/pricing-tables" },
      { name: "File Manager", path: "/file-manager" },
      { name: "Integrations", path: "/integrations" },
      { name: "Multi Tenant", path: "/multi-tenant" },
      { name: "API Keys", path: "/api-keys" },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    name: "Email",
    icon: <MailIcon />,
    subItems: [
      { name: "Inbox", path: "/inbox" },
      { name: "Inbox Details", path: "/inbox-details" },
    ],
  },
  {
    name: "Chart",
    icon: <PieChartIcon />,
    subItems: [
      { name: "Bar Chart", path: "/bar-chart" },
      { name: "Line Chart", path: "/line-chart" },
      { name: "Pie Chart", path: "/pie-chart" },
    ],
  },
  {
    name: "Support",
    icon: <CallIcon />,
    subItems: [
      { name: "Support Tickets", path: "/support-tickets" },
      { name: "Support Ticket Reply", path: "/support-ticket-reply" },
    ],
  },
];

const supportItems: NavItem[] = [
  {
    name: "Chat",
    icon: <ChatIcon />,
    path: "/chat",
  },
];

const AICustomerCareSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "support" | "others" | "ai-customer-care"
  ) => (
    <ul className="flex flex-col gap-1">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                pathname === nav.path
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              } ${!isExpanded && !isHovered ? "xl:justify-center xl:px-2" : ""}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`flex-shrink-0 ${!isExpanded && !isHovered ? "xl:w-5 xl:h-5" : ""}`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="truncate flex-1 flex items-center gap-2">
                    {nav.name}
                    {nav.new && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        NEW
                      </span>
                    )}
                  </span>
                )}
              </div>
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon className="w-4 h-4 flex-shrink-0" />
              )}
            </button>
          ) : (
            <Link
              href={nav.path || "#"}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                pathname === nav.path
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              } ${!isExpanded && !isHovered ? "xl:justify-center xl:px-2" : ""}`}
            >
              <span className={`flex-shrink-0 ${!isExpanded && !isHovered ? "xl:w-5 xl:h-5" : ""}`}>
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="truncate flex-1 flex items-center gap-2">
                  {nav.name}
                  {nav.new && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                      NEW
                    </span>
                  )}
                </span>
              )}
            </Link>
          )}
          
          {/* Sub-items - Always expanded for AI Customer Care */}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <ul className="mt-1 ml-6 space-y-1">
              {nav.subItems.map((subItem) => (
                <li key={subItem.name}>
                  <Link
                    href={subItem.path}
                    className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                      pathname === subItem.path
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {subItem.name}
                      {subItem.new && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                          NEW
                        </span>
                      )}
                      {subItem.pro && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                          PRO
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isMobileOpen
      ) {
        // Close mobile sidebar when clicking outside
        const { toggleMobileSidebar } = useSidebar.getState();
        toggleMobileSidebar();
      }
    },
    [isMobileOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0 w-80" : "-translate-x-full w-80"
        } xl:relative xl:translate-x-0 xl:border-r xl:bg-white xl:dark:bg-gray-900 ${
          isExpanded || isHovered ? "xl:w-80" : "xl:w-20"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700 px-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  TailAdmin
                </span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-8">
              {/* AI Customer Care Menu */}
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "xl:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Menu"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(aiCustomerCareItems, "ai-customer-care")}
              </div>

              {/* Other Menu Items */}
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "xl:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Menu"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(otherItems, "main")}
              </div>

              {/* Other Pages */}
              {othersItems.length > 0 && (
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "xl:justify-center"
                        : "justify-start"
                    }`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? (
                      "Others"
                    ) : (
                      <HorizontaLDots />
                    )}
                  </h2>
                  {renderMenuItems(othersItems, "others")}
                </div>
              )}

              {/* Support */}
              {supportItems.length > 0 && (
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "xl:justify-center"
                        : "justify-start"
                    }`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? (
                      "Support"
                    ) : (
                      <HorizontaLDots />
                    )}
                  </h2>
                  {renderMenuItems(supportItems, "support")}
                </div>
              )}
            </nav>
          </div>

          {/* Sidebar Widget */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <SidebarWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default AICustomerCareSidebar;
