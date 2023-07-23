
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import React from "react";
import { useShow } from "@refinedev/core";
import {
  Show,
  TextField,
} from "@refinedev/antd";
import {  Card, Col, Row, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { currencyFormatter } from "src/types";

const { Title, Paragraph } = Typography;

export default function LinkShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <>
      <Show title={record?.id} isLoading={isLoading} canEdit={false}>
        <Row gutter={50}>
          <Col span={12}>
            <Card
              title="Details"
            >
              <Title level={5}>Reference Id</Title>
              <TextField value={record?.attributes.reference_number} />
              <Title level={5}>Archive</Title>
              <TextField value={record?.attributes.archived ? 'Yes':'No'} />
              <Title level={5}>Link URL</Title>
              <Paragraph copyable={{
                tooltips: ['copy', 'copied!!'],
              }}  >
              {record?.attributes.checkout_url}
                </Paragraph>
              <Title level={5}>Amount</Title>
              <TextField value={ currencyFormatter(record?.attributes.amount)} />
              <Title level={5}>Description</Title>
              <TextField value={record?.attributes.description} />
              <Title level={5}>Remarks</Title>
              <TextField value={record?.attributes.remarks} />
              <Title level={5}>Created Date</Title>
              <TextField value={dayjs(record?.created_at).format('MMMM D, YYYY: h:mm A')} />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Transaction Logs"
            >
              { record?.attributes.payments[0] ? record?.attributes.payments.map((payment:any) => {
                const date = dayjs(payment.data.attributes.credited_at).format('MMMM D, YYYY: h:mm A')
                return (
                  <Row>
                    <Col span={12}>
                      <Space direction={"vertical"}>
                      <Tag color="success">{payment.data.attributes.status}</Tag>
                      <TextField value={payment.data.attributes.billing.email} />
                      <TextField value={payment.data.id} />
                      <TextField value={payment.data.attributes.source.type} />
                      <TextField value={date} />
                      </Space>
                    </Col>
                
                  </Row>
                );
              }) : <TextField value={"No Transaction Logs"} />}
            
            </Card>
          </Col>
        </Row>


      </Show>
    </>
  );
};


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