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

// Blog Writer specific navigation items
const blogWriterItems: NavItem[] = [
  {
    name: "Blog Writer",
    icon: <MailIcon />,
    new: true,
    subItems: [
      { name: "Dashboard", path: "/templates/blog-writer" },
      { name: "Drafts", path: "/templates/blog-writer/drafts", new: true },
      { name: "Media Library", path: "/templates/blog-writer/media", new: true },
      { name: "Comments Management", path: "/templates/blog-writer/comments", new: true },
      { name: "Categories & Tags", path: "/templates/blog-writer/categories", new: true },
      { name: "Authors Management", path: "/templates/blog-writer/authors", new: true },
      { name: "Content Calendar", path: "/templates/blog-writer/calendar", pro: true },
      { name: "Post Analytics", path: "/templates/blog-writer/analytics", pro: true },
      { name: "SEO Tools", path: "/templates/blog-writer/seo", pro: true },
      { name: "Publishing", path: "/templates/blog-writer/publishing", pro: true },
      { name: "Team Management", path: "/templates/blog-writer/team", new: true },
      { name: "Content Templates", path: "/templates/blog-writer/templates", new: true },
      { name: "Workflows", path: "/templates/blog-writer/workflows", new: true },
      { name: "Integrations", path: "/templates/blog-writer/integrations", new: true },
    ],
  },
];

const userProfileItem: NavItem[] = [
  {
    name: "User Profile",
    icon: <UserCircleIcon />,
    path: "/templates/blog-writer/profile",
  },
];

const componentItems: NavItem[] = [
  {
    name: "Task",
    icon: <TaskIcon />,
    subItems: [
      { name: "Task List", path: "/templates/blog-writer/task-list" },
      { name: "Task Kanban", path: "/templates/blog-writer/task-kanban" },
    ],
  },
  {
    name: "Forms",
    icon: <PageIcon />,
    subItems: [
      { name: "Form Elements", path: "/templates/blog-writer/form-elements" },
      { name: "Form Layout", path: "/templates/blog-writer/form-layout" },
    ],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [
      { name: "Basic Tables", path: "/templates/blog-writer/basic-tables" },
      { name: "Data Tables", path: "/templates/blog-writer/data-tables" },
    ],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank", path: "/templates/blog-writer/blank" },
      { name: "FAQ", path: "/templates/blog-writer/faq" },
      { name: "Pricing Tables", path: "/templates/blog-writer/pricing-tables" },
      { name: "File Manager", path: "/templates/blog-writer/file-manager" },
      { name: "Integrations", path: "/templates/blog-writer/integrations" },
      { name: "Multi Tenant", path: "/templates/blog-writer/multi-tenant" },
      { name: "API Keys", path: "/templates/blog-writer/api-keys" },
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

const BlogWriterSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "support" | "others" | "blog-writer"
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
          
          {/* Sub-items - Always expanded for Blog Writer */}
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
        } xl:translate-x-0 xl:border-r xl:bg-white xl:dark:bg-gray-900 ${
          isExpanded || isHovered ? "xl:w-[290px]" : "xl:w-[90px]"
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
              {/* Blog Writer Menu */}
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
                {renderMenuItems(blogWriterItems, "blog-writer")}
              </div>

              {/* User Profile */}
              <div>
                {renderMenuItems(userProfileItem, "main")}
              </div>

              {/* Components */}
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-5 text-red-600 ${
                    !isExpanded && !isHovered
                      ? "xl:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Components"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(componentItems, "main")}
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

export default BlogWriterSidebar;
