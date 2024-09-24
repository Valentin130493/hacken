import { FC } from "react";
import { Layout, Typography, Row, Col } from "antd";

export const ErrorMessage: FC = () => {
  return (
    <Layout
      style={{
        backgroundColor: "transparent",
      }}
    >
      <Row
        justify={"center"}
        align={"middle"}
        style={{
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <Col span={24}>
          <Typography.Title type={"danger"} style={{ textAlign: "center" }}>
            Something went wrong...
          </Typography.Title>
        </Col>
      </Row>
    </Layout>
  );
};
