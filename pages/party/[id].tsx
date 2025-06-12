import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Divider,
  Tabs,
  Spin,
  message,
  Card,
  Select,
  Descriptions,
} from "antd";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";
import styles from "@/styles/modules/PartyDetail.module.scss";
import style_party from "@/styles/modules/Party.module.scss";
import { DateType, PartyType } from "@/enums/party.enum";
import { Party } from "@/interfaces/party";
import { formatDate, upperCaseFirstChat } from "@/utils/utils";
import { getParty } from "@/api/party";
import { getCompetitors } from "@/api/competitor";
import { Competitor } from "@/interfaces/competitor";

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
// const { Option } = Select;

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [party, setParty] = useState<Party | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPartyDetail();
    }
  }, [id]);

  const fetchPartyDetail = async () => {
    setLoading(true);
    try {
      const partyData = await getParty(id as string);
      setParty(partyData);

      // 獲取競爭者數據
      if (partyData) {
        const competitorsData = await getCompetitors({ partyId: id as string });
        setCompetitors(competitorsData);
      }
    } catch (error) {
      console.error("Failed to fetch party detail:", error);
      message.error("獲取派對詳情失敗");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="loadingContainer">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (!party) {
    return (
      <MainLayout>
        <div className="loadingContainer">
          <Title level={3}>找不到派對</Title>
          <Button type="primary" onClick={() => router.push("/party")}>
            返回派對列表
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.eventHeader}>
        <div className={styles.eventBanner}>
          <div className={styles.eventBannerContent}>
            <Tag
              color={party?.partyType === PartyType.online ? "red" : "green"}
              className={styles.eventTypeTag}
            >
              {upperCaseFirstChat(party?.partyType)}
            </Tag>
            <Title level={1} className={styles.eventTitle}>
              {party?.title}
            </Title>
            <div className={styles.eventMeta}>
              <span className={styles.eventMetaItem}>
                <CalendarOutlined />{" "}
                {`${formatDate(party?.startDate)} - ${formatDate(
                  party?.endDate
                )}`}
              </span>
              <span className={styles.eventMetaItem}>
                <EnvironmentOutlined /> {party?.address}
              </span>
              <span className={styles.eventMetaItem}>
                <TeamOutlined /> 已報名: {party?.registeredUsers?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* <div className={styles.eventActions}>
            {!isRegistered ? (
              <Button
                type="primary"
                size="large"
                onClick={handleRegister}
                loading={registering}
                disabled={party?.signUpStatus === SignUpStatus.close}
                className={styles.registerButton}
              >
                {party?.signUpStatus === SignUpStatus.close
                  ? "截止報名"
                  : "立即報名"}
              </Button>
            ) : (
              <Button type="default" size="large" disabled>
                已報名
              </Button>
            )}
          </div> */}
      </div>

      <div className={styles.eventContent}>
        <Tabs defaultActiveKey="details">
          <TabPane tab="派對詳情" key="details">
            <Descriptions
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="派對類型">
                {upperCaseFirstChat(party?.partyType)}
              </Descriptions.Item>
              <Descriptions.Item label="時間類型">
                {party?.dateType === DateType.fixed ? "已定" : "暫定"}
              </Descriptions.Item>
              <Descriptions.Item label="開始日期">
                {formatDate(party?.startDate)}
              </Descriptions.Item>
              <Descriptions.Item label="結束日期">
                {formatDate(party?.endDate)}
              </Descriptions.Item>
              <Descriptions.Item label="派對地點">
                {party?.address}
              </Descriptions.Item>
              <Descriptions.Item label="報名人員">
                {party?.registeredUsers && party.registeredUsers.length > 0
                  ? party?.registeredUsers?.map((user) => user.nickName)
                  : ""}
              </Descriptions.Item>
            </Descriptions>

            <Divider />
            <Title level={3}>Introduce</Title>

            <Paragraph>{party?.content}</Paragraph>

            {party?.subParties && party.subParties.length > 0 ? (
              <>
                <Divider />
                <Title level={3}>Schedule</Title>
                {party?.subParties.map((subParty) => (
                  <div className={styles.subEventContent} key={subParty._id}>
                    <Card>
                      <Title level={4} className={styles.eventTitle}>
                        {subParty.title}
                      </Title>
                      <Paragraph>
                        {subParty.content}
                        <CalendarOutlined />
                        {`${formatDate(subParty.startDate)} - ${formatDate(
                          subParty.endDate
                        )}`}
                      </Paragraph>
                      <div className={style_party.eventFooter}>
                        <div className={style_party.eventLocation}>
                          <EnvironmentOutlined /> {subParty.site || "代定"}
                          {` ${subParty.address}` || ""}
                        </div>
                        {/* <div className={style_party.eventCapacity}>
                              <Button
                                type="primary"
                                size="small"
                                disabled={
                                  party.signUpStatus === SignUpStatus.close
                                }
                              >
                                報名
                              </Button>
                            </div> */}
                      </div>
                    </Card>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </TabPane>

          <TabPane icon={<TrophyOutlined />} tab="參賽者" key="competitors">
            <div className={styles.competitorsSection}>
              <div className={styles.bettingIntro}>
                <Paragraph>
                  為您看好的參賽者下注，預測比賽結果，贏取豐厚點數獎勵。
                  賽事結束後，根據賽果自動結算獎勵，敬請期待！
                </Paragraph>
              </div>

              {competitors.length > 0 ? (
                <div className={styles.bettingContent}>
                  <div className={styles.actionRequired}>
                    <Divider>參賽者列表</Divider>
                    <Row gutter={[24, 24]}>
                      {competitors.map((competitor) => (
                        <Col xs={24} sm={12} md={8} key={competitor._id}>
                          <Card hoverable className={styles.competitorCard}>
                            <div className={styles.competitorAvatar}>
                              <UserOutlined />
                            </div>
                            <div className={styles.competitorInfo}>
                              <Title level={4}>{competitor.name}</Title>
                              <p>
                                <Tag
                                  color="#E50914"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  賠率：{competitor.odds}
                                </Tag>
                              </p>
                              <p>描述: {competitor.description}</p>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              ) : (
                <div className={styles.noCompetitors}>
                  <Paragraph>暫無參賽者資訊</Paragraph>
                </div>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div className="bottomBtn">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          type="default"
          size="large"
        >
          Back
        </Button>
      </div>
    </MainLayout>
  );
}
