import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import React from "react";
import { useShow, useParsed, HttpError } from "@refinedev/core";
import {
  Show,
  TextField,
} from "@refinedev/antd";
import { Col, Divider, Row, Space, Typography } from "antd";
import { Payments } from "src/shared/Payments";
import { currencyFormatter } from "src/types";

const { Title } = Typography;



// convert date to toLocaleDateString
const dateParser = (value: any) => {
  value = new Date(value)
  const option = { year: 'numeric', month: 'long', day: 'numeric' };
  if (value) {
    return value.toLocaleDateString('en-US',option)
  }

};


export default function PaymentShow() {

  const { queryResult } = useShow<HttpError>({
    resource: "payments",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data
  

  return (
    <Show isLoading={isLoading}>
      <Row>
        <Col span={8}>
          <Title level={4}>Payment Details</Title>
          <Row>
            <Space align="center">
              <Title level={5}>Link reference </Title>
              <TextField value={ record?.reference_number} />
            </Space>
          </Row>
          <Row>
            <Space align="center">
              <Title level={5}>Gross</Title>
              <TextField value={ currencyFormatter(record?.grossAmount as string)} />
            </Space>
          </Row>
          <Row>
            <Space align="center">
              <Title level={5}>Fees</Title>
              <TextField value={currencyFormatter(record?.fees as string)} />
            </Space>
          </Row>
          <Divider className="marginXS" />
          <Row>
            <Space align="center">
              <Title level={5}>  Net Amount </Title>
              <TextField value={currencyFormatter(record?.netAmount as string)} />
            </Space>
          </Row>

        </Col>
        <Col span={8}>
          <Title level={5}>{record?.source?.toUpperCase()}</Title>
          <TextField value={`Paid on :  ${dateParser(record?.paid)}`} />

        </Col>
        <Col span={8}>

          <Title level={4}>Billing Details</Title>
          <Space direction="vertical">
            <TextField value={record?.billing.name} />
            <TextField value={record?.billing?.email} />
            <TextField value={record?.billing?.phone} />
          </Space>
        </Col>
      </Row>
    </Show>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/links")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
