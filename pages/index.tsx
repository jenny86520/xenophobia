import { Button, Card, Col, Layout, Row, Typography } from "antd";
import { CoffeeOutlined, GlobalOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
const { Title } = Typography;

export default function Home() {
  const About = () => (
    <Row justify="center">
      <Col span={22} lg={18}>
        <Card>
          <Typography style={{ textAlign: "center" }}>
            <Title className="title">XPA Team</Title>
            <Title level={3}>Game players center</Title>
            <Title level={4}>Include CS:GO, APEX, and others.</Title>
            <Button>
              <Link href="/about">More...</Link>
            </Button>
          </Typography>
        </Card>
      </Col>
    </Row>
  );
  const OnlineParty = () => (
    <Row justify="center">
      <Col span={22} lg={18}>
        <Card className="cardStyles">
          <Typography>
            <Title className="title">
              <GlobalOutlined /> Online Party
              <Button style={{ float: "right" }}>
                <Link href="/online-party">More...</Link>
              </Button>
            </Title>
            <Card>Coming soon ...</Card>
          </Typography>
        </Card>
      </Col>
    </Row>
  );
  const OfflineParty = () => (
    <Row justify="center">
      <Col span={22} lg={18}>
        <Card className="cardStyles">
          <Typography>
            <Title className="title">
              <CoffeeOutlined /> Offline Party
              <Button style={{ float: "right" }}>
                <Link href="/offline-party">More...</Link>
              </Button>
            </Title>
            <Card>Coming soon ...</Card>
          </Typography>
        </Card>
      </Col>
    </Row>
  );

  return (
    <>
      <Layout className="pageLayout">
        <Content className="pageContent">
          <Layout
            id="abount"
            className="pageLayout subLayout"
            style={{ marginTop: "3rem" }}
          >
            <About />
          </Layout>
          <Layout id="onlineParty" className="pageLayout subLayout">
            <OnlineParty />
          </Layout>
          <Layout id="offlineParty" className="pageLayout subLayout">
            <OfflineParty />
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
