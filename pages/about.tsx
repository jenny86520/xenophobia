import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Card,
  Divider,
  List,
  Space,
  Timeline,
} from "antd";
import {
  MailOutlined,
  TrophyOutlined,
  TeamOutlined,
  SafetyOutlined,
  GlobalOutlined,
  GiftOutlined,
  DollarOutlined,
  UserOutlined,
  ShoppingOutlined,
  DiscordOutlined,
} from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";
import styles from "@/styles/modules/About.module.scss";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

const features = [
  {
    title: "豐富的派對類型",
    description:
      "我們提供各種線上和線下的派對，從電競比賽到吃飯聚會，應有盡有。每月至少一次的派對，滿足各種遊戲愛好者的需求。",
    icon: <DiscordOutlined className="primaryIconL" />,
  },
  {
    title: "社群互動",
    description:
      "與志同道合的玩家交流，分享遊戲體驗，建立長久的友誼。我們的平台已連接超過100名玩家，形成了緊密的遊戲社群。",
    icon: <TeamOutlined className="primaryIconL" />,
  },
  {
    title: "競賽獎勵",
    description: "參與競賽贏取豐厚的點數獎勵，敬請期待日後的點數商店！",
    icon: <TrophyOutlined className="primaryIconL" />,
  },
  {
    title: "安全可靠",
    description:
      "我們的平台採用先進的安全技術，確保您的資料和交易安全。所有數據均經過加密處理，並定期進行安全審計。",
    icon: <SafetyOutlined className="primaryIconL" />,
  },
  {
    title: "全球連接",
    description: "無論您身在何處，都能參與我們的派對，與世界各地的玩家互動。",
    icon: <GlobalOutlined className="primaryIconL" />,
  },
  {
    title: "個人化體驗",
    description:
      "根據您的興趣和參與歷史，我們會推薦最適合您的派對和商品。您還可以自定義個人資料，敬請期待日後的會員機制！",
    icon: <UserOutlined className="primaryIconL" />,
  },
];

const futures = [
  {
    description: "會員機制：導入註冊/登入系統，可報名參加派對、下注等功能",
    icon: <UserOutlined className="primaryIcon" />,
  },
  {
    description: "點數商店：會員將擁有免費點數，可在商店下單各式周邊商品",
    icon: <ShoppingOutlined className="primaryIcon" />,
  },
  {
    description: "競賽下注：替支持的參賽者投下神聖一票，並獲得相應報酬",
    icon: <DollarOutlined className="primaryIcon" />,
  },
  {
    description:
      "每日簽到：沒時間參加派對賺取點數，只要每天來網站報到就可以囉！",
    icon: <GiftOutlined className="primaryIcon" />,
  },
];

const partners = [
  { name: "Yun-Ying", logo: "/partner2.jpg" },
  { name: "Dragonfly", logo: "/partner1.jpg" },
];

const milestones = [
  {
    year: "2018",
    title: "名稱創立",
    description: "XenoPhobiA 正式創立，與志同道合的玩家初期僅於 Discord 活動。",
  },
  {
    year: "2023",
    title: "網站發想",
    description:
      "為了統整與紀錄在 XPA 中的各類活動，開始構思網站，並有了雛型。",
  },
  {
    year: "2025",
    title: "網站確立",
    description: "有完整的視覺與平台架構，並組建伺服器。",
  },
];

export default function AboutPage() {
  const [mail, setMail] = useState("");

  useEffect(() => {
    setMail(process.env.NEXT_PUBLIC_SERVER_EMAIL || "");
  }, []);

  return (
    <MainLayout>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutHeader}>
          <Title level={1} className={styles.pageTitle}>
            About
          </Title>
          <Divider className={styles.divider} />
        </div>

        <div className="section">
          <Title level={2} className={styles.sectionTitle}>
            Goal
          </Title>
          <Paragraph className={styles.missionText}>
            致力於為遊戲愛好者提供一個全面的活動參與和社交平台。我們的目標是連接遊戲玩家、活動組織者和遊戲開發商，創造一個充滿活力的遊戲社群。
          </Paragraph>
          <Paragraph className={styles.missionText}>
            我們相信遊戲不僅僅是娛樂，更是一種社交方式和文化表達。通過我們的平台，玩家可以發現新的遊戲活動，參與競賽，結交志同道合的朋友，並獲得獨特的遊戲體驗。
          </Paragraph>
          <Paragraph className={styles.missionText}>
            我們的願景是成為亞太地區最大的遊戲活動社群平台，為超過100位玩家提供服務，並與全球頂尖遊戲開發商和賽事組織者建立深度合作關係。我們希望通過科技和創新，不斷提升玩家的遊戲體驗，推動遊戲文化的發展和普及。
          </Paragraph>
        </div>

        <div className="section">
          <Title level={2} className={styles.sectionTitle}>
            Milestones
          </Title>
          <div className={styles.timelineContainer}>
            <Timeline
              mode="alternate"
              items={milestones.map((milestone) => ({
                children: (
                  <div className={styles.milestoneItem}>
                    <Title level={4} className={styles.milestoneYear}>
                      {milestone.year}
                    </Title>
                    <Title level={5} className={styles.milestoneTitle}>
                      {milestone.title}
                    </Title>
                    <Paragraph className={styles.milestoneDescription}>
                      {milestone.description}
                    </Paragraph>
                  </div>
                ),
              }))}
            />
          </div>
        </div>
        <div className="section">
          <Title level={2} className={styles.sectionTitle}>
            Features
          </Title>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className={styles.featureCard}>
                  <div className={styles.featureIconContainer}>
                    {feature.icon}
                  </div>
                  <Title level={4} className={styles.featureTitle}>
                    {feature.title}
                  </Title>
                  <Paragraph className={styles.featureDescription}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className="section">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Title level={2} className={styles.sectionTitle}>
                Contact
              </Title>
              <Card className={styles.contactCard}>
                <List>
                  <List.Item>
                    <Space>
                      <MailOutlined className="primaryIcon" />
                      <Link
                        href={`mailto:${mail}`}
                        className={styles.contactLink}
                      >
                        {mail}
                      </Link>
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Row gutter={[24, 24]}>
                      {partners.map((partner, index) => (
                        <Col key={index}>
                          <Card className={styles.partnerCard}>
                            <div className={styles.partnerLogo}>
                              <div className={styles.logoPlaceholder}>
                                {partner.name.charAt(0)}
                              </div>
                            </div>
                            <Text className={styles.partnerName}>
                              {partner.name}
                            </Text>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </List.Item>
                </List>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Title level={2} className={styles.sectionTitle}>
                Futures
              </Title>
              <Card className={styles.visionCard}>
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24}>
                    <div className={styles.visionContent}>
                      <Title level={3} className={styles.visionTitle}>
                        Coming soon ...
                      </Title>
                      <List>
                        {futures.map((future, index) => (
                          <List.Item key={index}>
                            <Space>
                              {future.icon}
                              <Text>{future.description}</Text>
                            </Space>
                          </List.Item>
                        ))}
                      </List>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}
