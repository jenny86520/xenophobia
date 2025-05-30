import { Layout, Menu, Avatar } from "antd";
import {
  MenuOutlined,
  CalendarOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/modules/Header.module.scss";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const router = useRouter();

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Avatar src="/logo.png" size={"large"} />
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[router.pathname]}
        className={styles.menu}
      >
        <Menu.Item key="/">
          <Link href="/">
            <span>
              <HomeOutlined /> Home
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/party">
          <Link href="/party">
            <span>
              <CalendarOutlined /> Party
            </span>
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="/shop">
          <Link href="/shop">
            <span>
              <ShoppingOutlined /> Shop
            </span>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="/about">
          <Link href="/about">
            <span>
              <InfoCircleOutlined /> About
            </span>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
