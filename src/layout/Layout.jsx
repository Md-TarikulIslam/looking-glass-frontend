import { Container } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Footer } from "../components/Shared/Footer";
import { ProfileMenu } from "../components/Shared/ProfileMenu";
import { TopBar } from "../components/Shared/TopBar";
import { theme } from "../context/ThemeContext";
import { NAVIGATION } from "../static/menuLinks";

function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return React.useMemo(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (segment) => {
        const path = segment.startsWith("/") ? segment : `/${segment}`;
        navigate(path);
      },
    }),
    [location, navigate]
  );
}

export const title = `<b>Sierra</b> <i>Looking</i> Glass`;
export const CustomTitle = () => (
  <div
    style={{
      fontSize: "1.3rem",
      fontWeight: "normal",
      display: "inline-block",
    }}
    dangerouslySetInnerHTML={{ __html: title }}
  />
);

export default function Layout() {
  const router = useRouter();
  const [sidebarMini, setSidebarMini] = React.useState(false);

  const processNavigationItems = React.useCallback(
    (items, isChild = false) => {
      return items.map((item) => {
        let processedItem = { ...item };

        // Process the icon for the current item
        if (item.iconComponent) {
          const IconComponent = item.iconComponent;
          // Make child icons smaller than parent icons
          const iconSize = isChild
            ? sidebarMini
              ? 16
              : 18
            : sidebarMini
              ? 20
              : 24;
          processedItem.icon = <IconComponent size={iconSize} />;
        }

        // Add a style property for child items to make text smaller
        if (isChild) {
          processedItem.style = {
            fontSize: "0.9rem",
            paddingLeft: sidebarMini ? undefined : "8px",
          };
        }

        // Recursively process children if they exist
        if (item.children && item.children.length > 0) {
          processedItem.children = processNavigationItems(item.children, true);
        }

        return processedItem;
      });
    },
    [sidebarMini]
  );

  const dynamicNavigation = React.useMemo(() => {
    return processNavigationItems(NAVIGATION);
  }, [NAVIGATION, processNavigationItems]);

  return (
    <AppProvider
      navigation={dynamicNavigation}
      router={router}
      theme={theme}
      branding={{
        logo: "",
        title: <CustomTitle />,
        homeUrl: "/",
      }}
    >
      <DashboardLayout
        defaultMini={false}
        onMiniChange={setSidebarMini}
        slots={{
          toolbarActions: TopBar,
          toolbarAccount: () => null,
          sidebarFooter: (props) => (
            <ProfileMenu {...props} mini={sidebarMini} theme={theme} />
          ),
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            my: 2,
            mb: 16, // Add bottom margin to prevent content from being hidden behind footer
          }}
        >
          <Outlet />
        </Container>
        <Footer />
      </DashboardLayout>
    </AppProvider>
  );
}
