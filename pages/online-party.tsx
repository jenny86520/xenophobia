import { Empty, Layout } from "antd";
import { NextPage } from "next";

const { Content } = Layout;

const OnlinePartyPage: NextPage = () => {
  return (
    <>
      <Layout className="pageLayout">
        <Content className="pageContent">
          <Layout
            id="online-party"
            className="pageLayout subLayout"
            style={{ marginTop: "3rem" }}
          >
            <Empty description="尚無資料" style={{ color: "white" }} />
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default OnlinePartyPage;
