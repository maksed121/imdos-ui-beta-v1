export const sidebarItem = [
  {
    title: "Managements",
    items: [
      {
        label: "Dashboard",
        icon: "LayoutDashboard",
        url: "/admin",
      },
      {
        label: "Get Started",
        icon: "Component",
        url: "/",
        sub: [
          {
            label: "Setup Project",
            url: "/admin/get-started/setup-project",
          },
          {
            label: "Setup Sidebar",
            url: "/admin/get-started/setup-sidebar",
          },
          {
            label: "Setup Topbar",
            url: "/admin/get-started/setup-top-bar",
          },
          {
            label: "Setup User",
            url: "/admin/get-started/setup-user",
          },
        ],
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        label: "DataTable",
        icon: "Table",
        url: "/admin/datatable",
      },
      {
        label: "Loading Button",
        icon: "SquareMousePointer",
        url: "/admin/loading-button",
      },
      {
        label: "Form Validation",
        icon: "ShieldCheck",
        url: "/admin/form-validation",
      },
    ],
  },
  {
    title: "Backend Ready",
    items: [
      {
        label: "Form With DataTable",
        icon: "Table",
        url: "/admin/backend-ready/form-with-table",
      },
      {
        label: "Filter Form With DataTable",
        icon: "Search",
        url: "/admin/backend-ready/filter-form-with-table",
      },
      {
        label: "Secure Authentication",
        icon: "ShieldCheck",
        url: "/admin/backend-ready/authentication",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        label: "Form Elements",
        icon: "TextCursorInput",
        url: "/",
      },
      {
        label: "Theme Builder",
        icon: "Palette",
        url: "/",
      },
      {
        label: "Dashboard Widgets",
        icon: "Package",
        url: "/",
      },
      {
        label: "Graphs & Statistics",
        icon: "AreaChart",
        url: "/",
      },
    ],
  },
];
