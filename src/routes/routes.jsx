/* eslint-disable no-unused-vars */
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Loading from "../components/UI/Loading";
import Layout from "../layout/Layout";
import LoginPage from "../pages/Dashboard/LoginPage";
import ServerCPUPage from "../pages/Dashboard/ServerDetails/ServerCPUPage";
import ServerOverviewPage from "../pages/Dashboard/ServerDetails/ServerOverviewPage";
import PrivateRoute from "./PrivateRoute";
import ServerRAMPage from "../pages/Dashboard/ServerDetails/ServerRAMPage";
import ServerDisksPage from "../pages/Dashboard/ServerDetails/ServerDisksPage";
import ServerNetworkPage from "../pages/Dashboard/ServerDetails/ServerNetworkPage";
import ServerProcessesPage from "../pages/Dashboard/ServerDetails/ServerProcessesPage";
import ServerIncidentsPage from "../pages/Dashboard/ServerDetails/ServerIncidentsPage";
import ServerAlertingPage from "../pages/Dashboard/ServerDetails/ServerAlertingPage";

// Lazy load components all
const DashboardPage = lazy(() => import("../pages/Dashboard/DashboardPage"));
const ServersPage = lazy(() => import("../pages/Dashboard/ServersPage"));
const GroupsPage = lazy(() => import("../pages/Dashboard/GroupsPage"));
const SettingsPage = lazy(
  () => import("../pages/Dashboard/System/Settings/SettingsPage")
);
const GeneralPage = lazy(
  () => import("../pages/Dashboard/System/Settings/GeneralPage")
);
const RolesPage = lazy(() => import("../pages/Dashboard/System/RolesPage"));
const UsersPage = lazy(() => import("../pages/Dashboard/System/UsersPage"));
const CreateRolePage = lazy(
  () => import("../pages/Dashboard/System/CreateRolePage")
);
const MonitoringPage = lazy(
  () => import("../pages/Dashboard/System/Settings/MonitoringPage")
);
const LocalizationPage = lazy(
  () => import("../pages/Dashboard/System/Settings/LocalizationPage")
);
const EmailPage = lazy(
  () => import("../pages/Dashboard/System/Settings/EmailPage")
);
const SMSGatewayPage = lazy(
  () => import("../pages/Dashboard/System/Settings/SMSGatewayPage")
);
const LogsPage = lazy(
  () => import("../pages/Dashboard/System/LogsMenu/LogsPage")
);
const ActivityLogPage = lazy(
  () => import("../pages/Dashboard/System/LogsMenu/ActivityLogPage")
);
const EmailMessageLogPage = lazy(
  () => import("../pages/Dashboard/System/LogsMenu/EmailMessageLogPage")
);
const SMSMessageLogPage = lazy(
  () => import("../pages/Dashboard/System/LogsMenu/SMSMessageLogPage")
);
const CronLogPage = lazy(
  () => import("../pages/Dashboard/System/LogsMenu/CronLogPage")
);
const ServerDetailsPage = lazy(
  () => import("../pages/Dashboard/ServerDetails/ServerDetailsPage")
);

const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: withSuspense(DashboardPage),
          },
          {
            path: "*",
            element: withSuspense(ErrorPage),
          },
          {
            path: "/dashboard/servers",
            element: withSuspense(ServersPage),
          },
          {
            path: "/dashboard/system/groups",
            element: withSuspense(GroupsPage),
          },
          {
            path: "/dashboard/system/roles",
            element: withSuspense(RolesPage),
          },
          {
            path: "/dashboard/system/roles/create-role",
            element: withSuspense(CreateRolePage),
          },
          {
            path: "/dashboard/system/users",
            element: withSuspense(UsersPage),
          },
          {
            path: "/dashboard/system/settings",
            element: withSuspense(SettingsPage),
            children: [
              {
                index: true,
                element: (
                  <Navigate to="/dashboard/system/settings/general" replace />
                ),
              },
              {
                path: "general",
                element: withSuspense(GeneralPage),
              },
              {
                path: "monitoring",
                element: withSuspense(MonitoringPage),
              },
              {
                path: "localization",
                element: withSuspense(LocalizationPage),
              },
              {
                path: "email",
                element: withSuspense(EmailPage),
              },
              {
                path: "email",
                element: withSuspense(EmailPage),
              },
              {
                path: "sms",
                element: withSuspense(SMSGatewayPage),
              },
            ],
          },
          {
            path: "/dashboard/system/logs",
            element: withSuspense(LogsPage),
            children: [
              {
                index: true,
                element: (
                  <Navigate to="/dashboard/system/logs/activity-log" replace />
                ),
              },
              {
                path: "activity-log",
                element: withSuspense(ActivityLogPage),
              },
              {
                path: "email-message-log",
                element: withSuspense(EmailMessageLogPage),
              },
              {
                path: "sms-message-log",
                element: withSuspense(SMSMessageLogPage),
              },
              {
                path: "cron-log",
                element: withSuspense(CronLogPage),
              },
            ],
          },
          {
            path: "/dashboard/servers/server-details/:id",
            element: withSuspense(ServerDetailsPage),
            children: [
              {
                index: true,
                element: <Navigate to="overview" replace />,
              },
              {
                path: "overview",
                element: <ServerOverviewPage />,
              },
              {
                path: "cpu",
                element: <ServerCPUPage />,
              },
              {
                path: "ram",
                element: <ServerRAMPage />,
              },
              {
                path: "disks",
                element: <ServerDisksPage />,
              },
              {
                path: "network",
                element: <ServerNetworkPage />,
              },
              {
                path: "processes",
                element: <ServerProcessesPage />,
              },
              {
                path: "alerting",
                element: <ServerAlertingPage />,
              },
              {
                path: "incidents",
                element: <ServerIncidentsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
