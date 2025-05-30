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
// import { eventsService } from "@/services/events.service";
import styles from "@/styles/modules/Party.module.scss";
import { getParties } from "@/api/party";
import { Party } from "@/interfaces/party";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function PartyPage() {
  const [loading, setLoading] = useState(true);
  const [parties, setParties] = useState<any>([]);
  const [searchParams, setSearchParams] = useState({
    title: "",
    partyType: undefined as string | undefined,
  });

  const fetchParties = async (
    query: { title?: string; partyType?: string } = {}
  ) => {
    try {
      setLoading(true);
      await getParties({
        partyStatus: "release",
        ...query,
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

  const handleReset = () => {
    setSearchParams({
      title: "",
      partyType: undefined,
    });
    fetchParties({
      title: "",
      partyType: undefined,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW");
  };

  return (
    <MainLayout>
      <div className={styles.eventsContainer}>
        <div className={styles.searchSection}>
          <Title level={2} className={styles.pageTitle}>
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
                    allowClear
                  >
                    <Option value="online">Online</Option>
                    <Option value="offline">Offline</Option>
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

          <div className={styles.filterTags}>
            {searchParams.title && (
              <Tag
                closable
                onClose={() => setSearchParams({ ...searchParams, title: "" })}
              >
                名稱: {searchParams.title}
              </Tag>
            )}
            {searchParams.partyType !== undefined && (
              <Tag
                closable
                onClose={() =>
                  setSearchParams({ ...searchParams, partyType: undefined })
                }
              >
                類型: {searchParams.partyType}
              </Tag>
            )}
            {(searchParams.title || searchParams.partyType !== undefined) && (
              <Button
                type="link"
                onClick={handleReset}
                className={styles.resetButton}
              >
                重置篩選
              </Button>
            )}
          </div>
        </div>

        <div className={styles.eventsGrid}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          ) : parties.length > 0 ? (
            <Row gutter={[24, 24]}>
              {parties.map((party: Party) => (
                <Col xs={24} sm={12} lg={8} key={party._id}>
                  <Link href={`/events/${party._id}`}>
                    <Card
                      hoverable
                      className={styles.eventCard}
                      cover={
                        <div className={styles.eventCoverContainer}>
                          <div className={styles.eventImagePlaceholder}></div>
                          <div className={styles.eventCoverOverlay}>
                            <div className={styles.eventTags}>
                              <Tag color={party.isOnline ? "blue" : "green"}>
                                {party.isOnline ? "Online" : "Offline"}
                              </Tag>
                            </div>
                            <h3 className={styles.eventTitle}>{party.title}</h3>
                            <div className={styles.eventMeta}>
                              <span>
                                <CalendarOutlined />{" "}
                                {formatDate(party.startDate)} -{" "}
                                {formatDate(party.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div className={styles.eventContent}>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          className={styles.eventDescription}
                        >
                          {party.description}
                        </Paragraph>
                        <div className={styles.eventFooter}>
                          <div className={styles.eventLocation}>
                            <EnvironmentOutlined /> {party.location || "線上"}
                          </div>
                          <div className={styles.eventCapacity}>
                            已報名: {party.registeredUsers?.length || 0}/
                            {party.capacity}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="沒有找到符合條件的活動" />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
