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
  subItems?: { 
    name: string; 
    path?: string; 
    pro?: boolean; 
    new?: boolean;
    isAccordionHeader?: boolean;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  }[];
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <GridIcon />,
    path: "/",
  },
  {
    name: "Analytics",
    icon: <PieChartIcon />,
    path: "/analytics",
  },
  {
    name: "Marketing",
    icon: <MailIcon />,
    path: "/marketing",
  },
  {
    name: "CRM",
    icon: <UserCircleIcon />,
    path: "/crm",
  },
  {
    name: "Stocks",
    icon: <BoxCubeIcon />,
    path: "/stocks",
  },
  {
    name: "Logistics",
    icon: <TaskIcon />,
    new: true,
    path: "/logistics",
  },
  {
    name: "AI Assistant",
    icon: <AiIcon />,
    new: true,
    subItems: [
      { name: "Text Generator", path: "/text-generator" },
      { name: "Code Generator", path: "/code-generator" },
      { name: "Image Generator", path: "/image-generator" },
      { name: "Video Generator", path: "/video-generator" },
    ],
  },
  {
    name: "E-commerce",
    icon: <CartIcon />,
    new: true,
    subItems: [
      { name: "Dashboard", path: "/" },
      { name: "Products List", path: "/products-list" },
      { name: "Add Product", path: "/add-product" },
      { name: "Transactions", path: "/transactions" },
      { name: "Single Transaction", path: "/single-transaction" },
      { name: "Invoices", path: "/invoices" },
      { name: "Single Invoice", path: "/single-invoice" },
      { name: "Create Invoice", path: "/create-invoice" },
      { name: "Billing", path: "/billing" },
    ],
  },
  {
    name: "Calendar",
    icon: <CalenderIcon />,
    path: "/calendar",
  },
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

// Template navigation items
const templateItems: NavItem[] = [
  {
    name: "All Templates",
    icon: <GridIcon />,
    path: "/",
  },
  {
    name: "Blog Writer",
    icon: <MailIcon />,
    new: true,
    subItems: [
      { name: "Dashboard", path: "/templates/blog-writer" },
      { 
        name: "User Profile", 
        isAccordionHeader: true,
        new: true,
        subItems: [
          { name: "User Details", path: "/templates/blog-writer/profile/details" },
          { name: "Change Password", path: "/templates/blog-writer/profile/change-password" },
          { name: "Access Control", path: "/templates/blog-writer/profile/access" },
        ]
      },
      { 
        name: "Components", 
        isAccordionHeader: true,
        new: true,
        subItems: [
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
        ]
      },
    ],
  },
  {
    name: "AI Customer Care",
    icon: <AiIcon />,
    new: true,
    subItems: [
      { name: "Dashboard", path: "/templates/ai-customer-care" },
      { 
        name: "User Profile", 
        isAccordionHeader: true,
        new: true,
        subItems: [
          { name: "User Details", path: "/templates/ai-customer-care/profile/details" },
          { name: "Change Password", path: "/templates/ai-customer-care/profile/change-password" },
          { name: "Access Control", path: "/templates/ai-customer-care/profile/access" },
        ]
      },
      { 
        name: "Components", 
        isAccordionHeader: true,
        new: true,
        subItems: [
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
        ]
      },
    ],
  },
  {
    name: "E-commerce Template",
    icon: <CartIcon />,
    path: "/templates/ecommerce",
  },
  {
    name: "Restaurant Template",
    icon: <UserCircleIcon />,
    path: "/templates/restaurant",
  },
  {
    name: "Healthcare Template",
    icon: <UserCircleIcon />,
    path: "/templates/healthcare",
  },
  {
    name: "Finance Template",
    icon: <PieChartIcon />,
    path: "/templates/finance",
  },
  {
    name: "Education Template",
    icon: <UserCircleIcon />,
    path: "/templates/education",
  },
  {
    name: "SaaS Template",
    icon: <PlugInIcon />,
    path: "/templates/saas",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "support" | "others" | "templates"
  ) => (
    <ul className="flex flex-col gap-1">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {nav.new && (isExpanded || isHovered || isMobileOpen) && (
                <span
                  className={`ml-auto absolute right-10 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "menu-dropdown-badge-active"
                      : "menu-dropdown-badge-inactive"
                  } menu-dropdown-badge`}
                >
                  new
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && nav.subItems && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem, subIndex) => (
                  <li key={subItem.name}>
                    {subItem.isAccordionHeader ? (
                      // Accordion header button
                      <button
                        onClick={() => handleNestedSubmenuToggle(subIndex, menuType, index)}
                        className={`menu-dropdown-item group cursor-pointer justify-start ${
                          openNestedSubmenu?.type === menuType && 
                          openNestedSubmenu?.index === index && 
                          openNestedSubmenu?.subIndex === subIndex
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          {subItem.name}
                          {subItem.new && (
                            <span className="menu-dropdown-badge">new</span>
                          )}
                        </span>
                        <ChevronDownIcon
                          className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                            openNestedSubmenu?.type === menuType && 
                            openNestedSubmenu?.index === index && 
                            openNestedSubmenu?.subIndex === subIndex
                              ? "rotate-180 text-brand-500"
                              : ""
                          }`}
                        />
                      </button>
                    ) : (
                      // Regular link
                      <Link
                        href={subItem.path || '#'}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path || '')
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path || '')
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path || '')
                                  ? "menu-dropdown-badge-pro-active"
                                  : "menu-dropdown-badge-pro-inactive"
                              } menu-dropdown-badge-pro `}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    )}
                    
                    {/* Render nested subItems if this is an accordion header */}
                    {subItem.isAccordionHeader && subItem.subItems && (
                      <div
                        ref={(el) => {
                          nestedSubMenuRefs.current[`${menuType}-${index}-${subIndex}`] = el;
                        }}
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          height:
                            openNestedSubmenu?.type === menuType && 
                            openNestedSubmenu?.index === index && 
                            openNestedSubmenu?.subIndex === subIndex
                              ? `${nestedSubMenuHeight[`${menuType}-${index}-${subIndex}`]}px`
                              : "0px",
                        }}
                      >
                        <ul className="mt-2 space-y-1 ml-6">
                          {subItem.subItems.map((nestedItem) => (
                            <li key={nestedItem.name}>
                              <Link
                                href={nestedItem.path}
                                className={`menu-dropdown-item ${
                                  isActive(nestedItem.path)
                                    ? "menu-dropdown-item-active"
                                    : "menu-dropdown-item-inactive"
                                }`}
                              >
                                {nestedItem.name}
                                <span className="flex items-center gap-1 ml-auto">
                                  {nestedItem.new && (
                                    <span
                                      className={`ml-auto ${
                                        isActive(nestedItem.path)
                                          ? "menu-dropdown-badge-active"
                                          : "menu-dropdown-badge-inactive"
                                      } menu-dropdown-badge `}
                                    >
                                      new
                                    </span>
                                  )}
                                  {nestedItem.pro && (
                                    <span
                                      className={`ml-auto ${
                                        isActive(nestedItem.path)
                                          ? "menu-dropdown-badge-pro-active"
                                          : "menu-dropdown-badge-pro-inactive"
                                      } menu-dropdown-badge-pro `}
                                    >
                                      pro
                                    </span>
                                  )}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others" | "templates";
    index: number;
  } | null>(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState<{
    type: "main" | "support" | "others" | "templates";
    index: number;
    subIndex: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const [nestedSubMenuHeight, setNestedSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const [userClosedSubmenu, setUserClosedSubmenu] = useState(false);
  const [userClosedNestedSubmenu, setUserClosedNestedSubmenu] = useState(false);
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const nestedSubMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Only auto-open submenus if user hasn't manually closed one
    if (userClosedSubmenu) {
      return;
    }

    // Check if the current path matches any submenu item
    let submenuMatched = false;
    
    // Check main navigation items
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (subItem.path && isActive(subItem.path)) {
            setOpenSubmenu({
              type: "main",
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });

    // Check others navigation items
    if (!submenuMatched) {
      othersItems.forEach((nav, index) => {
        if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (subItem.path && isActive(subItem.path)) {
            setOpenSubmenu({
              type: "others",
              index,
            });
            submenuMatched = true;
          }
        });
        }
      });
    }

    // Check support navigation items
    if (!submenuMatched) {
      supportItems.forEach((nav, index) => {
        if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (subItem.path && isActive(subItem.path)) {
            setOpenSubmenu({
              type: "support",
              index,
            });
            submenuMatched = true;
          }
        });
        }
      });
    }

    // Check template navigation items
    if (!submenuMatched) {
      templateItems.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem, subIndex) => {
            // Check direct path matches
            if (subItem.path && isActive(subItem.path)) {
              setOpenSubmenu({
                type: "templates",
                index,
              });
              submenuMatched = true;
            }
            // Check nested subItems for accordion headers
            if (subItem.subItems && subItem.isAccordionHeader) {
              subItem.subItems.forEach((nestedItem) => {
                if (isActive(nestedItem.path)) {
                  setOpenSubmenu({
                    type: "templates",
                    index,
                  });
                  setOpenNestedSubmenu({
                    type: "templates",
                    index,
                    subIndex,
                  });
                  submenuMatched = true;
                }
              });
            }
          });
        }
      });
    }

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive, userClosedSubmenu, userClosedNestedSubmenu]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  useEffect(() => {
    if (openNestedSubmenu !== null) {
      const key = `${openNestedSubmenu.type}-${openNestedSubmenu.index}-${openNestedSubmenu.subIndex}`;
      if (nestedSubMenuRefs.current[key]) {
        setNestedSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: nestedSubMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openNestedSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others" | "templates"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        // User is closing the submenu
        setUserClosedSubmenu(true);
        return null;
      }
      // User is opening a submenu
      setUserClosedSubmenu(false);
      return { type: menuType, index };
    });
  };

  const handleNestedSubmenuToggle = (
    subIndex: number,
    menuType: "main" | "support" | "others" | "templates",
    parentIndex: number
  ) => {
    setOpenNestedSubmenu((prevOpenNestedSubmenu) => {
      if (
        prevOpenNestedSubmenu &&
        prevOpenNestedSubmenu.type === menuType &&
        prevOpenNestedSubmenu.index === parentIndex &&
        prevOpenNestedSubmenu.subIndex === subIndex
      ) {
        // User is closing the nested submenu
        setUserClosedNestedSubmenu(true);
        return null;
      }
      // User is opening a nested submenu
      setUserClosedNestedSubmenu(false);
      return { type: menuType, index: parentIndex, subIndex };
    });
  };

  return (
    <aside
      className={`fixed flex flex-col xl:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        xl:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "xl:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {pathname.startsWith('/templates/blog-writer') 
                  ? 'Blog Writer:' 
                  : pathname.startsWith('/templates/ai-customer-care')
                  ? 'AI Customer Care:'
                  : 'TIN Admin:'}
              </span>
            </div>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto  duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {/* Main Navigation */}
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
              {renderMenuItems(navItems, "main")}
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

            {/* Templates */}
            {templateItems.length > 0 && (
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "xl:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Templates"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(templateItems, "templates")}
              </div>
            )}
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
