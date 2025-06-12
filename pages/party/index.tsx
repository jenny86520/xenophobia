import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  Button,
  Tag,
  Typography,
  Spin,
  Empty,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import styles from "@/styles/modules/Party.module.scss";
import { getParties } from "@/api/party";
import { Party } from "@/interfaces/party";
import { PartyType } from "@/enums/party.enum";
import { formatDate, upperCaseFirstChat } from "@/utils/utils";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function PartyPage() {
  const [loading, setLoading] = useState(true);
  const [parties, setParties] = useState<any>([]);
  const [searchParams, setSearchParams] = useState({
    title: "",
    partyType: "",
  });

  const fetchParties = async (
    query: { title?: string; partyType?: string } = {}
  ) => {
    try {
      const q = { ...query };
      if (!q.partyType) delete q.partyType;
      setLoading(true);
      await getParties({
        ...q,
        partyStatus: "release",
      }).then((result) => {
        setParties(result);
      });
    } catch (error) {
      console.error("Failed to fetch parties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const handleSearch = () => {
    fetchParties(searchParams);
  };

  return (
    <MainLayout>
      <div className={styles.searchSection}>
        <Title level={1} className={styles.pageTitle}>
          Party
        </Title>
        <Row gutter={[16, 16]} className={styles.searchForm}>
          <Col xs={24} sm={12} md={14} lg={16}>
            <Input
              placeholder="搜尋派對名稱"
              value={searchParams.title}
              onChange={(e) =>
                setSearchParams({ ...searchParams, title: e.target.value })
              }
              prefix={<SearchOutlined />}
              className={styles.searchInput}
              size="large"
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={10} lg={8}>
            <Row gutter={[8, 8]}>
              <Col span={16}>
                <Select
                  placeholder="派對類型"
                  value={searchParams.partyType}
                  onChange={(value) =>
                    setSearchParams({ ...searchParams, partyType: value })
                  }
                  className={styles.selectFilter}
                  size="large"
                  defaultValue=""
                >
                  <Option value="">All</Option>
                  {Object.keys(PartyType).map((type) => (
                    <Option value={type}>{upperCaseFirstChat(type)}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Button
                  type="primary"
                  onClick={handleSearch}
                  className={styles.searchButton}
                  size="large"
                >
                  搜尋
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      ) : parties.length > 0 ? (
        <Row gutter={[24, 24]}>
          {parties.map((party: Party) => (
            <Col xs={24} sm={12} lg={8} key={party._id}>
              <Link href={`/party/${party._id}`}>
                <Card
                  hoverable
                  className={styles.eventCard}
                  cover={
                    <div className={styles.eventCoverContainer}>
                      <div className={styles.eventImagePlaceholder}></div>
                      <div className={styles.eventCoverOverlay}>
                        <div className={styles.eventTags}>
                          <Tag
                            color={
                              party.partyType === PartyType.online
                                ? "red"
                                : "green"
                            }
                          >
                            {upperCaseFirstChat(party.partyType)}
                          </Tag>
                        </div>
                        <Title level={3}>{party.title}</Title>
                      </div>
                    </div>
                  }
                >
                  <div className={styles.eventContent}>
                    <Paragraph>
                      <span className={styles.eventDescription}>
                        <CalendarOutlined />
                        {`${formatDate(party.startDate)} - ${formatDate(
                          party.endDate
                        )}`}
                      </span>
                    </Paragraph>
                    <div className={styles.eventFooter}>
                      <div className={styles.eventLocation}>
                        <EnvironmentOutlined /> {party.site || "代定"}
                      </div>
                      {/* <div className={styles.eventCapacity}>
                        <div
                          className={`${styles.enrollmentRibbon} ${
                            styles[party.signUpStatus]
                          }`}
                        >
                          {party.signUpStatus === SignUpStatus.open
                            ? "開放報名"
                            : "截止報名"}
                        </div>
                      </div> */}
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="沒有找到符合條件的派對" />
      )}
    </MainLayout>
  );
}
