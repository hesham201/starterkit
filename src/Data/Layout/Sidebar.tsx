import { MenuItem } from "../../Types/Layout/Sidebar";

export const MenuList: MenuItem[] = [
  {
    title: "Pages",
    Items: [
      {
        id: 1,
        title: "Sample Page",
        path: `/pages/samplepage`,
        icon: "sample-page",
        type: "link",
        bookmark: true,
      },
    ],
  },
  {
    title: "Applications",
    lanClass: "lan-8",
    Items: [
      {
        title: "Users",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/users/userprofile`,
            type: "link",
            title: "User Profile",
          },
          {
            path: `/users/cards`,
            type: "link",
            title: "User Cards",
          },
          {
            path: `/users/add`,
            type: "link",
            title: "Add User",
          },
        ],
      },
      {
        title: "Authors",
        icon: "author",
        type: "sub",
        active: false,
        children: [
          {
            path: `/authors/userprofile`,
            type: "link",
            title: "Author Profile",
          },
          {
            path: `/authors/useredit`,
            type: "link",
            title: "Author Edit",
          },
          {
            path: `/authors/cards`,
            type: "link",
            title: "Author Cards",
          },
          {
            path: `/authors/add`,
            type: "link",
            title: "Add Author",
          },
        ],
      },
      {
        title: "Blog",
        icon: "author",
        type: "sub",
        active: false,
        children: [
          {
            path: `/blogs/add`,
            type: "link",
            title: "Add Blogs",
          },
          {
            path: `/blogs/cards`,
            type: "link",
            title: "Blogs Cards",
          },
        ],
      },
    ],
  },
  {
    title: "Support Ticket",
    Items: [
      {
        id: 2,
        title: "Raised Ticket",
        path: `https://support.pixelstrap.com/`,
        icon: "support-tickets",
        type: "link",
        bookmark: true,
      },
    ],
  },
];
