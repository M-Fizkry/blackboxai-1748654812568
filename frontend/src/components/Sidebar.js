import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', to: '/' },
  { name: 'Raw Materials', to: '/materials' },
  { name: 'Semi-Finished', to: '/semi-finished' },
  { name: 'Finished Goods', to: '/finished-goods' },
  { name: 'BOM', to: '/bom' },
  {
    name: 'Planning',
    to: '/planning',
    subItems: [
      {
        name: 'Plan 1',
        items: [
          { name: '9110', to: '/planning/9110' }
        ]
      },
      {
        name: 'Plan 2',
        items: [
          { name: '9210', to: '/planning/9210' },
          { name: '9220', to: '/planning/9220' },
          { name: '9230', to: '/planning/9230' }
        ]
      },
      {
        name: 'Plan 3',
        items: [
          { name: '9310', to: '/planning/9310' }
        ]
      }
    ]
  },
  { name: 'Production Result', to: '/production-result' },
  { name: 'Settings', to: '/settings' }
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleSubMenu = (menuName) => {
    if (expandedMenu === menuName) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuName);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`flex flex-col h-screen bg-gray-800 text-gray-100 transition-width duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        {!collapsed && <span className="text-lg font-bold">Inventory Control</span>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto mt-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              // Menu item with submenu
              <div>
                <button
                  onClick={() => !collapsed && toggleSubMenu(item.name)}
                  className={`w-full flex items-center px-4 py-3 mx-2 my-1 rounded-md hover:bg-gray-700 ${
                    location.pathname.startsWith(item.to) ? 'bg-gray-900 text-white' : 'text-gray-300'
                  }`}
                >
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
                      <svg
                        className={`h-4 w-4 transition-transform ${expandedMenu === item.name ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                  {collapsed && <span className="w-full text-center">{item.name.charAt(0)}</span>}
                </button>
                {!collapsed && expandedMenu === item.name && (
                  <div className="ml-4 pl-4 border-l border-gray-700">
                    {item.subItems.map((subItem) => (
                      <div key={subItem.name} className="mb-2">
                        <div className="text-sm font-medium text-gray-400 py-2">{subItem.name}</div>
                        {subItem.items.map((subSubItem) => (
                          <Link
                            key={subSubItem.name}
                            to={subSubItem.to}
                            className={`flex items-center pl-4 py-2 text-sm rounded-md hover:bg-gray-700 ${
                              isActive(subSubItem.to) ? 'bg-gray-900 text-white' : 'text-gray-300'
                            }`}
                          >
                            {subSubItem.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Regular menu item
              <Link
                to={item.to}
                className={`flex items-center px-4 py-3 mx-2 my-1 rounded-md hover:bg-gray-700 ${
                  isActive(item.to) ? 'bg-gray-900 text-white' : 'text-gray-300'
                }`}
              >
                {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
                {collapsed && <span className="w-full text-center">{item.name.charAt(0)}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
