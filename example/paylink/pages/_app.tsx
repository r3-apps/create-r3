import {
  ThemedLayoutV2,
  ThemedSiderV2,
  notificationProvider,
} from "@refinedev/antd";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import "@refinedev/antd/dist/reset.css";
import { authProvider } from "src/authProvider";
import { remultDataProvider } from "src/providers/dataProvider";
import { entities } from "src/shared";

import { CreditCardOutlined, LinkOutlined, DashboardOutlined } from "@ant-design/icons";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }
    return (
      <ThemedLayoutV2
        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <>
      <GitHubBanner />
      <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={remultDataProvider(entities)}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            resources={[
              {
                name: "links",
                list: "/links",
                create: "/links/create",
                show: "/links/show/:id",
                meta: {
                  icon: <LinkOutlined />,
                },
              },{
                name: "payments",
                list: "/payments",
                show: "/payments/show/:id",
                meta: {
                  icon: <CreditCardOutlined />,
                },
              }
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            {renderComponent()}
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
      </RefineKbarProvider>
    </>
  );
}

export default MyApp;
