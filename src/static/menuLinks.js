import {
    MdDashboard,
    MdDiversity2,
    MdFiberSmartRecord,
    MdGroups3,
    MdPerson,
    MdSettings,
    MdStorage,
    MdTune,
    MdWebStories
} from "react-icons/md";

export const NAVIGATION = [
  {
    segment: "",
    title: "Dashboard",
    iconComponent: MdDashboard,
  },
  {
    segment: "dashboard/servers",
    title: "Servers",
    iconComponent: MdStorage,
  },

  {
    segment: "dashboard/system",
    title: "System",
    iconComponent: MdTune,
    children: [
      {
        segment: "users",
        title: "Users",
        iconComponent: MdGroups3,
      },
      {
        segment: "roles",
        title: "Roles",
        iconComponent: MdFiberSmartRecord,
      },
      {
        segment: "groups",
        title: "Groups",
        iconComponent: MdDiversity2,
      },
      {
        segment: "logs",
        title: "Logs",
        iconComponent: MdWebStories,
      },
      {
        segment: "settings",
        title: "Settings",
        iconComponent: MdSettings,
      },
    ],
  },
];
