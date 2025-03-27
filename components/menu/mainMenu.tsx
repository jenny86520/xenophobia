import { Affix, Avatar, Menu } from "antd";
import {
  GlobalOutlined,
  CoffeeOutlined,
  FormatPainterOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Header } from "antd/lib/layout/layout";

export const MainMenu = () => {
  let menuSelectKeys: string[] = [];

  const items = [
    {
      label: (
        <Link href="/">
          <Avatar src="/logo_short.png" size={"large"} />
        </Link>
      ),
      key: "home",
    },
    {
      label: <Link href="/about">XPA Team</Link>,
      key: "about",
    },
    {
      label: <Link href="/online-party">Online Party</Link>,
      key: "onlineParty",
      icon: <GlobalOutlined />,
    },
    {
      label: <Link href="/offline-party">Offline Party</Link>,
      key: "offlineParty",
      icon: <CoffeeOutlined />,
    },
    {
      label: <Link href="/graffiti-wall">Graffiti Wall</Link>,
      key: "graffitiWall",
      icon: <FormatPainterOutlined />,
    },
    {
      label: <Link href="/login">Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
      danger: true,
    },
  ];

  return (
    <Affix style={{ marginBottom: "-3rem", zIndex: 2 }}>
      <Header className="header">
        <Menu
          theme="dark"
          onClick={() => {
            menuSelectKeys = [];
          }}
          mode="horizontal"
          selectedKeys={menuSelectKeys}
          className="menu"
          style={{ justifyContent: "center" }}
          items={items}
        ></Menu>
      </Header>
    </Affix>
  );
};
