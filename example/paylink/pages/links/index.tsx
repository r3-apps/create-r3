import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { BaseRecord, HttpError } from "@refinedev/core";
import {
  useTable,
  List,
  ShowButton,
  DateField,
  useModal,
  useForm
} from "@refinedev/antd";
import {
  Table,
  Space,
  Typography,
  Tag,
  Button,
} from "antd";
import { currencyFormatter } from "src/types";
import { ModalLink } from "@components/modal";

const { Paragraph } = Typography;

export default function Links() {
  const { tableProps } = useTable< HttpError>({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
  });

  const { formProps, onFinish } = useForm({
    resource: "pay/link",
    onMutationSuccess: async () => {
      close();
    },
    successNotification: () => {
      return {
        message: "PayLink Successfully Created.",
        description: "Success with no errors",
        type: "success",
      };
    },
  });

  const { modalProps, show, close } = useModal({
    modalProps: {
      title: "Create PayLink",
      onOk(e) {
        onFinish();
      },
    },
  });

  return (
    <List
      headerProps={{
        extra: (
          <Button type="primary" onClick={show}>
            Create
          </Button>
        ),
      }}
    >
      <ModalLink modalProps={modalProps} formProps={formProps} />
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["attributes", "checkout_url"]}
          title="Link"
          render={(value) => (
            <Paragraph
              copyable={{
                tooltips: ["click here", "you clicked!!"],
              }}
            >
              {value}
            </Paragraph>
          )}
        />
        <Table.Column
          dataIndex={["attributes","created_at"]}
          title="Created At"
          render={(value: any) => <Paragraph> {<DateField value={value}/>}</Paragraph>}
        />
        <Table.Column
          dataIndex={["attributes", "status"]}
          title="Status"
          render={(value) => {
            return value === "paid" ? (
              <Tag color="success">Paid</Tag>
            ) : (
              <Tag color="warning">Unpaid</Tag>
            );
          }}
        />
        <Table.Column
          dataIndex={["attributes", "description"]}
          title="Description"
        />
        <Table.Column
          dataIndex={["attributes", "amount"]}
          title="Amount"
          render={(text) => {
            return currencyFormatter(text);
          }}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
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
