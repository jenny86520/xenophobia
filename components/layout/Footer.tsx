import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { MailOutlined } from "@ant-design/icons";
import styles from "@/styles/modules/Footer.module.scss";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  const [mail, setMail] = useState("");

  useEffect(() => {
    setMail(process.env.NEXT_PUBLIC_SERVER_EMAIL || "");
  }, []);
  return (
    <Footer className={styles.footer}>
      <div className={styles.footerContent}>
        <a href={`mailto:${mail}`} className={styles.emailLink}>
          <MailOutlined /> {mail}
        </a>
      </div>
    </Footer>
  );
};

export default AppFooter;
