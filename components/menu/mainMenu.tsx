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

  return (
    <Affix style={{ marginBottom: "-3rem", zIndex: 1 }}>
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
        >
          <Menu.Item key="home" id="homeBtn">
            <Link href="/">
              <Avatar src="/logo.png" size={"large"} />
            </Link>
          </Menu.Item>
          <Menu.Item key="about" id="aboutBtn">
            <Link href="/about">XPA Team</Link>
          </Menu.Item>
          <Menu.Item
            key="onlineParty"
            id="onlinePartyBtn"
            icon={<GlobalOutlined />}
          >
            <Link href="/online-party">Online Party</Link>
          </Menu.Item>
          <Menu.Item
            key="offlineParty"
            id="offlinePartyBtn"
            icon={<CoffeeOutlined />}
          >
            <Link href="/offline-party">Offline Party</Link>
          </Menu.Item>
          <Menu.Item
            key="graffitiWall"
            id="graffitiWallBtn"
            icon={<FormatPainterOutlined />}
          >
            <Link href="/graffiti-wall">Graffiti Wall</Link>
          </Menu.Item>
          <Menu.Item key="login" id="loginBtn" icon={<LoginOutlined />} danger>
            <Link href="/login">Login</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Affix>
  );
};
