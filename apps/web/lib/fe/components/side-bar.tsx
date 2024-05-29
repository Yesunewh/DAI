"use client"

import { Avatar, Button, Dropdown, Flowbite, Sidebar as FlowbiteSidebar } from "flowbite-react";
import type {  CustomFlowbiteTheme, FlowbiteSidebarTheme } from "flowbite-react"; 
import {
  HiArrowRight,
  HiArrowLeft,
  HiChatAlt2,
  HiPlus,
  HiOutlineCog,
  HiFolder,
  HiTable,
  HiChartPie,
HiViewBoards, 
HiInbox,
HiUser,
HiShoppingBag,
HiArrowSmRight
} from "react-icons/hi";
import { tw } from "twind";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { FrontendRoutes } from "lib/fe/routes";
import { TokenUser } from "lib/types/core/token-user";
import { getInitials } from "lib/core/name-utils";

import { clip } from "@repo/core";
import { Sidebar as SidebarAI } from "flowbite-react";

type ActiveItem = "new-chat" | "chat-history" | "document-collections";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
    },
  },
};

export function Sidebar({
  orgSlug,
  activeItem,
}: {
  orgSlug: string;
  activeItem?: ActiveItem;
}) {
  const { data: session, status: sessionStatus } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const user: TokenUser | undefined =
    session && sessionStatus === "authenticated"
      ? (session.user as TokenUser)
      : undefined;


      const dataSenseTheme : FlowbiteSidebarTheme ={
  "root": {
    "base": "h-full",
    "collapsed": {
      "on": "w-16",
      "off": "w-64"
    },
    "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-bubble-gum-500 px-3 py-4 dark:bg-gray-800"
  },
  "collapse": {
    "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    "icon": {
      "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "open": {
        "off": "",
        "on": "text-gray-900"
      }
    },
    "label": {
      "base": "ml-3 flex-1 whitespace-nowrap text-left",
      "icon": {
        "base": "h-6 w-6 transition delay-0 ease-in-out",
        "open": {
          "on": "rotate-180",
          "off": ""
        }
      }
    },
    "list": "space-y-2 py-2"
  },
  "cta": {
    "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
    "color": {
      "blue": "bg-cyan-50 dark:bg-cyan-900",
      "dark": "bg-dark-50 dark:bg-dark-900",
      "failure": "bg-red-50 dark:bg-red-900",
      "gray": "bg-alternative-50 dark:bg-alternative-900",
      "green": "bg-green-50 dark:bg-green-900",
      "light": "bg-light-50 dark:bg-light-900",
      "red": "bg-red-50 dark:bg-red-900",
      "purple": "bg-purple-50 dark:bg-purple-900",
      "success": "bg-green-50 dark:bg-green-900",
      "yellow": "bg-yellow-500 dark:bg-yellow-900",
      "warning": "bg-yellow-50 dark:bg-yellow-900"
    }
  },
  "item": {
    "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    "active": "bg-gray-100 dark:bg-gray-700",
    "collapsed": {
      "insideCollapse": "group w-full pl-8 transition duration-75",
      "noIcon": "font-bold"
    },
    "content": {
      "base": "flex-1 whitespace-nowrap px-3"
    },
    "icon": {
      "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "active": "text-gray-700 dark:text-gray-100"
    },
    "label": "",
    "listItem": ""
  },
  "items": {
    "base": ""
  },
  "itemGroup": {
    "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
  },
  "logo": {
    "base": "mb-5 flex items-center pl-2.5",
    "collapsed": {
      "on": "hidden",
      "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    },
    "img": "mr-3 h-6 sm:h-7"
  }
}
  

  return (
    <> 
    <SidebarAI 
     theme={ dataSenseTheme }
     className={tw("h-screen border-r", collapsed ? "" : "w-80")}
     collapsed={collapsed}>
      <SidebarAI.Items>
        <SidebarAI.ItemGroup>

      <SidebarAI.Logo
        href={FrontendRoutes.APP_HOME}
        img="/logo.png"
        imgAlt="DataSense logo"
        className={tw("mt-8")}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Data Sense 
      </SidebarAI.Logo>
          <SidebarAI.Item 
          href={FrontendRoutes.getOrgHomeRoute(orgSlug)} 
          icon={HiChartPie}>
            New Chat
          </SidebarAI.Item>

          <SidebarAI.Item  
            href={FrontendRoutes.getDocumentCollectionsRoute(orgSlug)}
            icon={HiFolder}
            className={tw("mt-2")}
            active={activeItem === "document-collections"}
          >
            Document Collections
          </SidebarAI.Item>

          <SidebarAI.Item 
            href={FrontendRoutes.getChatHistoryRoute(orgSlug)}
            icon={HiChatAlt2}
            className={tw("mt-2")}
            active={activeItem === "chat-history"}
          >
            Chat History
          </SidebarAI.Item>

          <SidebarAI.Item href={`#`} 
            className={tw("mt-4")}
            active={activeItem === "new-chat"}
          >
            Document Management
          </SidebarAI.Item>


          <SidebarAI.Item  
            href={FrontendRoutes.getPromptLibraryRoute(orgSlug)}
            icon={HiFolder}
            className={tw("mt-2")}
            active={activeItem === "document-collections"}>
          
            Prompts Library
          </SidebarAI.Item>


          {/* <SidebarAI.Item href="#" icon={HiShoppingBag}>
            Products
          </SidebarAI.Item>
          <SidebarAI.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarAI.Item>
          <SidebarAI.Item href="#" icon={HiTable}>
            Sign Up
          </SidebarAI.Item> */}

        </SidebarAI.ItemGroup>
        <SidebarAI.ItemGroup
          className={tw("absolute bottom-0 mb-12 border-t-0")}
        >
          <SidebarAI.Item
            href="#"
            icon={collapsed ? HiArrowRight : HiArrowLeft}
            onClick={() => {
              setCollapsed((oldValue) => {
                return !oldValue;
              });
            }}
            className={tw("mb-2")}
          >
            {collapsed ? "Expand" : "Collapse"}
          </SidebarAI.Item>
          <Avatar
            placeholderInitials={getInitials(user)}
            rounded
            className={tw("ml-1")}
          >
            {collapsed ? null : (
              <div className={tw("font-medium dark:text-white overflow-clip")}>
                <div className={tw("flex flex-row items-center")}>
                  {user?.firstName} {user?.lastName}
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <HiOutlineCog
                        className={tw("ml-1 h-4 w-4 cursor-pointer")}
                      />
                    )}
                    className={tw("z-50")}
                    placement="top"
                  >
                    <Dropdown.Item
                      as="a"
                      href={FrontendRoutes.getOrgSettingsRoute(orgSlug)}
                    >
                      Organization settings
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="a"
                      href={FrontendRoutes.getOrgUsersRoute(orgSlug)}
                    >
                      Organization users
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="a"
                      href={FrontendRoutes.getDataSourcesRoute(orgSlug)}
                    >
                      Data sources
                    </Dropdown.Item>
                    <Dropdown.Item as="a" href={FrontendRoutes.USER_SETTINGS}>
                      User settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="a" href={FrontendRoutes.LOG_OUT}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown>
                </div>
                <div className={tw("text-xs text-gray-500 dark:text-gray-400")}>
                  {clip(user?.email ?? "", 24)}
                </div>
              </div>
            )}
          </Avatar>
        </SidebarAI.ItemGroup>
      </SidebarAI.Items>
    </SidebarAI>
{/* 
    <FlowbiteSidebar   theme={ dataSenseTheme }
      className={tw("h-screen border-r", collapsed ? "" : "w-80")}
      collapsed={collapsed}
    >
      <FlowbiteSidebar.Logo
        href={FrontendRoutes.APP_HOME}
        img="/logo.png"
        imgAlt="Data Sense AI logo"
        className={tw("mt-8")}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Data Sense
        
      </FlowbiteSidebar.Logo>
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item
            href={FrontendRoutes.getOrgHomeRoute(orgSlug)}
            icon={HiPlus}
            className={tw("mt-16")}
            active={activeItem === "new-chat"}
          >
            New Chat_s
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item
            href={FrontendRoutes.getChatHistoryRoute(orgSlug)}
            icon={HiChatAlt2}
            className={tw("mt-2")}
            active={activeItem === "chat-history"}
          >
            Chat History
          </FlowbiteSidebar.Item>
          {/* <FlowbiteSidebar.Item
            href={FrontendRoutes.getDocumentCollectionsRoute(orgSlug)}
            icon={HiFolder}
            className={tw("mt-2")}
            active={activeItem === "document-collections"}
          >
            Document Collections
          </FlowbiteSidebar.Item> */}
        {/* </FlowbiteSidebar.ItemGroup>  
        <FlowbiteSidebar.ItemGroup
          className={tw("absolute bottom-0 mb-12 border-t-0")}
        >
          <FlowbiteSidebar.Item
            href="#"
            icon={collapsed ? HiArrowRight : HiArrowLeft}
            onClick={() => {
              setCollapsed((oldValue) => {
                return !oldValue;
              });
            }}
            className={tw("mb-2")}
          >
            {collapsed ? "Expand" : "Collapse"}
          </FlowbiteSidebar.Item>
          <Avatar
            placeholderInitials={getInitials(user)}
            rounded
            className={tw("ml-1")}
          >
            {collapsed ? null : (
              <div className={tw("font-medium dark:text-white overflow-clip")}>
                <div className={tw("flex flex-row items-center")}>
                  {user?.firstName} {user?.lastName}
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <HiOutlineCog
                        className={tw("ml-1 h-4 w-4 cursor-pointer")}
                      />
                    )}
                    className={tw("z-50")}
                    placement="top"
                  >
                    <Dropdown.Item
                      as="a"
                      href={FrontendRoutes.getOrgSettingsRoute(orgSlug)}
                    >
                      Organization settings
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="a"
                      href={FrontendRoutes.getOrgUsersRoute(orgSlug)}
                    >
                      Organization users
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="a"
                      href={FrontendRoutes.getDataSourcesRoute(orgSlug)}
                    >
                      Data sources
                    </Dropdown.Item>
                    <Dropdown.Item as="a" href={FrontendRoutes.USER_SETTINGS}>
                      User settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="a" href={FrontendRoutes.LOG_OUT}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown>
                </div>
                <div className={tw("text-xs text-gray-500 dark:text-gray-400")}>
                  {clip(user?.email ?? "", 24)}
                </div>
              </div>
            )}
          </Avatar>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar> */}
    </>
  );
}
