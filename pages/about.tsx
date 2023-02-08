import { Empty, Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function AboutPage() {
  return (
    <>
      <Layout className="pageLayout">
        <Content className="pageContent">
          <Layout
            id="abount"
            className="pageLayout subLayout"
            style={{ marginTop: "3rem" }}
          >
            <Empty description="尚無資料" style={{ color: "white" }} />
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
