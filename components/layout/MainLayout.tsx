import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from './Header';
// import Footer from './Footer';
// import BackToTop from '../BackToTop';
import styles from '@/styles/modules/MainLayout.module.scss';
import Footer from './Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Content className={styles.content}>
        <div className={styles.container}>
          {children}
        </div>
      </Content>
      <Footer />
      {/* <BackToTop /> */}
    </Layout>
  );
};

export default MainLayout;
