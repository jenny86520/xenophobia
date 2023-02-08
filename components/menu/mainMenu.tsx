import { Affix, Badge, Menu } from "antd";
import { FormatPainterOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Header } from "antd/lib/layout/layout";

export const MainMenu = () => {
  let menuSelectKeys: string[] = [];

  return (
    <Affix style={{ marginBottom: "-3rem", zIndex: 1 }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          onClick={() => {
            menuSelectKeys = [];
          }}
          mode="horizontal"
          selectedKeys={menuSelectKeys}
          className="menu"
        >
           <Menu.Item key="home" id="homeBtn">
            <Link href="/">LOGO</Link>
          </Menu.Item>
          <Menu.Item key="about" id="aboutBtn">
            <Link href="/about">XPA Team</Link>
          </Menu.Item>
          <Menu.Item key="onlineParty" id="onlinePartyBtn">
            <Link href="/online-party">
              <Badge status="error" text=" " />Online Party
            </Link>
          </Menu.Item>
          <Menu.Item key="offlineParty" id="offlinePartyBtn">
            <Link href="/offline-party">
              <Badge status="default" text=" " />Offline Party
            </Link>
          </Menu.Item>
          <Menu.Item key="graffitiWall" id="graffitiWallBtn">
            <FormatPainterOutlined />{" "}
            <Link href="/graffiti-wall">Graffiti Wall</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Affix>
  );
};
