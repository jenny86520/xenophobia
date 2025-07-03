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

  const items = [
    {
      label: (
        <Link href="/">
          <span>
            <HomeOutlined /> Home
          </span>
        </Link>
      ),
      key: "/",
    },
    {
      label: (
        <Link href="/party">
          <span>
            <CalendarOutlined /> Party
          </span>
        </Link>
      ),
      key: "/party",
    },
    {
      label: (
        <Link href="/about">
          <span>
            <InfoCircleOutlined /> About
          </span>
        </Link>
      ),
      key: "/about",
    },
  ];
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
        items={items}
      ></Menu>
    </Header>
  );
};

export default AppHeader;
