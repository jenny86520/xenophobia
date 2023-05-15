import { Empty, Layout } from "antd";
import { NextPage } from "next";
import { getMessage } from "./api/hello";

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
            onClick={getMessage}
          >
            <Empty description="尚無資料" style={{ color: "white" }} />
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default GraffitiWallPage;
