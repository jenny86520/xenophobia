import { Empty, Layout } from "antd";
import { NextPage } from "next";

const { Content } = Layout;

const GraffitiWallPage: NextPage = () => {
  return (
    <>
      <Layout className="pageLayout">
        <Content className="pageContent">
          <Layout
            id="graffitiWall"
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

export default GraffitiWallPage;
