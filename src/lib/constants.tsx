import vector from "../assets/icons/vector.svg";
import quiz from "../assets/icons/quiz.svg";
import users from "../assets/icons/user-groups.svg";
import assignments from "../assets/icons/assignments.svg";
import getStarted from "../assets/icons/get-started.svg";
import settings from "../assets/icons/settings.svg";
import { Option, SidebarTabGroup } from "./types";

export const MS_ONE_SECOND = 1 * 1000;
export const MS_ONE_MINUTE = 1 * 1000 * 60;
export const MS_ONE_HOUR = 1 * 1000 * 60 * 60;
export const MS_ONE_DAY = 1 * 1000 * 60 * 60 * 24;

export const DASHBOARD_SIDEBAR_LINKS: SidebarTabGroup[] = [
  {
    key: "main",
    label: "",
    tabs: [
      {
        key: "reports",
        label: "Reports",
        path: "/reports",
        icon: ({ className }: { className?: string }) => (
          <img src={vector} alt="" className={className} />
        ),
      },
      {
        key: "insights",
        label: "Insights",
        path: "/insights",
        icon: ({ className }: { className: string }) => (
          <img src={quiz} alt="" className={className} />
        ),
      },
      {
        key: "users",
        label: "Users",
        path: "/users",
        icon: ({ className }: { className: string }) => (
          <img src={users} alt="" className={className} />
        ),
      },
      {
        key: "activities",
        label: "Activities",
        path: "/activities",
        icon: ({ className }: { className: string }) => (
          <img src={assignments} alt="" className={className} />
        ),
      },
    ],
  },
  {
    key: "support",
    label: "Support",
    tabs: [
      {
        key: "get-started",
        label: "Get Started",
        path: "/get-started",
        icon: ({ className }: { className: string }) => (
          <img src={getStarted} alt="" className={className} />
        ),
      },
      {
        key: "settings",
        label: "Settings",
        path: "/settings",
        icon: ({ className }: { className: string }) => (
          <img src={settings} alt="" className={className} />
        ),
      },
    ],
  },
];

export const FILTER_TIMEFRAME_OPTIONS: Option[] = [
  {
    label: "Past 30 days",
    value: 30,
    disabled: false,
  },
  {
    label: "Past 60 days",
    value: 60,
    disabled: false,
  },
  {
    label: "Past 90 days",
    value: 90,
    disabled: false,
  },
];

export const FILTER_TRAIN_OPTIONS: Option[] = [
  {
    label: "All",
    value: -1,
    disabled: false,
  },
];

export const FILTER_TOPIC_OPTIONS: Option[] = [
  {
    label: "All",
    value: -1,
    disabled: false,
  },
];
