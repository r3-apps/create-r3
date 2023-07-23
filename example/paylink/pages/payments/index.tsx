import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { BaseRecord, HttpError } from "@refinedev/core";
import {
  DateField,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Space, Table } from "antd";

import { currencyFormatter } from "src/types";

export default function Payments() {
  const { tableProps, tableQueryResult } = useTable<HttpError>({
    syncWithLocation: true , 
    sorters: {
      initial: [
          {
              field: "created_at",
              order: "desc",
          },
      ],
  },
  });

  const { data, isLoading } = tableQueryResult;

  if (isLoading) return <div>Loading...</div>;

  console.log(tableProps.dataSource )

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["id"]}
          title="ID"
        />
        <Table.Column
          dataIndex={[
            "created_at",
          ]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={[

            "paid",
          ]}
          title="Status"
          render={(value: any) => {
            if (value) {
              return "Paid";
            } else {
              return "Pending";
            }
          }}
        />
        <Table.Column
          dataIndex={[
            
            "billing",
            "email",
          ]}
          title="Payer"
        />
        <Table.Column dataIndex={[ "grossAmount"]} title="Amount" render={(text) => {
          return currencyFormatter(text)
        }} />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) =>
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          }
        />
      </Table>
    </List>
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