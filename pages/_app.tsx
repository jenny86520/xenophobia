import Head from "next/head";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider, theme as antTheme } from "antd";

// 創建React Query客戶端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// 自定義Ant Design主題
const { darkAlgorithm, defaultAlgorithm } = antTheme;

const customTheme = {
  token: {
    colorPrimary: "#FF3040",
    colorLink: "#64B5F6",
    colorText: "#F0F0F0",
    colorTextSecondary: "rgba(255, 255, 255, 0.85)",
    colorBgContainer: "#252525",
    colorBorder: "#444444",
    colorBgElevated: "#252525",
    borderRadius: 4,
  },
  components: {
    Menu: {
      darkItemBg: "transparent",
      darkItemHoverBg: "rgba(255, 255, 255, 0.05)",
      darkItemSelectedBg: "transparent",
      darkItemSelectedColor: "#FF3040",
    },
    Card: {
      colorBgContainer: "#252525",
      colorBorderSecondary: "#444444",
    },
    Button: {
      colorPrimaryHover: "#FF4D5F",
    },
    Table: {
      colorBgContainer: "#252525",
      headerBg: "#1A1A1A",
      headerColor: "#F0F0F0",
      borderColor: "#444444",
      rowHoverBg: "#333333",
    },
  },
  algorithm: darkAlgorithm,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={customTheme}>
        {/*  <AuthProvider> */}
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="XPA main website. Game players center."
          />
          <meta
            name="keywords"
            content="game, XPA, XenoPhobiA, 遊戲, 活動, 電競, 下注, 競猜, 點數, 商店"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>XenoPhobiA</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}
