import { Button, Card, Col, Row, Typography, Skeleton } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  GiftOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getParties } from "../api/party";
import Link from "next/link";
import moment from "moment";
const { Title, Paragraph } = Typography;
import MainLayout from "@/components/layout/MainLayout";
import styles from "@/styles/modules/Home.module.scss";
import { formatDate } from "@/utils/utils";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [parties, setParties] = useState<any>([]);

  const fetchParties = async () => {
    try {
      setLoading(true);
      await getParties({
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

  // 更新倒數計時
  useEffect(() => {
    if (!parties[0]) return;

    const calculateCountdown = () => {
      const now = moment();
      const startDate = moment(parties[0].startDate);
      const diff = startDate.diff(now);

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const duration = moment.duration(diff);
      setCountdown({
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    };

    // 初始計算
    calculateCountdown();

    // 每秒更新一次
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [parties[0]]);

  const Clock = () =>
    loading ? (
      <div className={styles.countdownContainer}>
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
    ) : parties[0] ? (
      <div className={styles.countdownContainer}>
        <div className={styles.countdownHeader}>
          <ClockCircleOutlined
            style={{ marginRight: "8px", color: "#E50914" }}
          />
          <span>Latest party is coming soon:</span>
          <Link
            href={`/party/${parties[0]._id}`}
            style={{ marginLeft: "8px", color: "#E50914" }}
          >
            {parties[0].title}
          </Link>
        </div>
        <div className={styles.countdownTimers}>
          <div className={styles.countdownItem}>
            <div className={styles.countdownValue}>{countdown.days}</div>
            <div className={styles.countdownLabel}>天</div>
          </div>
          <div className={styles.countdownItem}>
            <div className={styles.countdownValue}>{countdown.hours}</div>
            <div className={styles.countdownLabel}>時</div>
          </div>
          <div className={styles.countdownItem}>
            <div className={styles.countdownValue}>{countdown.minutes}</div>
            <div className={styles.countdownLabel}>分</div>
          </div>
          <div className={styles.countdownItem}>
            <div className={styles.countdownValue}>{countdown.seconds}</div>
            <div className={styles.countdownLabel}>秒</div>
          </div>
        </div>
      </div>
    ) : null;

  const Overview = () => (
    <div className="section">
      <Title level={2} className="section">
        Overview
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Card className={styles.featureCard}>
            <div className="primaryIconL">
              <CalendarOutlined />
            </div>
            <Title level={4}>探索派對</Title>
            <Paragraph>
              探索各種精彩派對（Online、Offline）
              <br />
              參與互動體驗，下注贏取點數獎勵
            </Paragraph>
            <Link href="/party">
              <Button type="primary">探索派對</Button>
            </Link>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className={styles.featureCard}>
            <div className="primaryIconL">
              <ShoppingOutlined />
            </div>
            <Title level={4}>點數商店</Title>
            <Paragraph>使用點數購買遊戲周邊、平台限定商品和獨家禮品</Paragraph>
            <Link href="/shop">
              <Button type="primary" disabled>
                Coming soon ...
              </Button>
            </Link>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className={styles.featureCard}>
            <div className="primaryIconL">
              <GiftOutlined />
            </div>
            <Title level={4}>每日簽到</Title>
            <Paragraph>
              每日登入簽到，獲取點數，連續簽到可獲得額外獎勵
            </Paragraph>
            <Button type="primary" disabled>
              Coming soon ...
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const Party = () => (
    <div className="section">
      <Title level={2} className="section">
        Party
      </Title>

      <Row gutter={[24, 24]}>
        {parties.length > 0 ? (
          parties.map((party: any) => (
            <Col key={party._id} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                cover={<div className={styles.eventImagePlaceholder}></div>}
                className={styles.eventCard}
              >
                <Card.Meta title={party.title} description={party.content} />
                <div className={styles.eventMeta}>
                  <span>
                    <CalendarOutlined /> {formatDate(party.startDate)} -{" "}
                    {formatDate(party.endDate)}
                  </span>
                  <Link href={`/party/${party._id}`}>
                    <Button type="primary" size="small">
                      Detail
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Card>Coming soon ...</Card>
          </Col>
        )}
      </Row>

      <div className="bottomBtn">
        <Link href="/party">
          <Button type="default" size="large">
            More Party
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <Title level={1}>
            <span className={styles.redLetter}>X</span>eno
            <span className={styles.redLetter}>P</span>hobi
            <span className={styles.redLetter}>A</span>
          </Title>
          <Paragraph className={styles.heroDescription}>
            Game players center
          </Paragraph>
          <Paragraph className={styles.heroDescription}>
            Include Assetto Corsa, CS2, APEX, and others.
          </Paragraph>
          <Clock />
        </div>
      </div>
      <Overview />
      <Party />
    </MainLayout>
  );
}
