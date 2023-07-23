import { Form, InputNumber, Modal, Input } from 'antd';

import React from 'react';

const { TextArea } = Input;

interface Props {
    modalProps: any;
    formProps: any;
}

export const ModalLink: React.FC<Props> = ({ modalProps, formProps }) => {

    return (
        <>
            <Modal {...modalProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item
                        label="Amount"
                        name={["amount"]}
                        rules={[
                            {
                                required: true,
                                validator: (_, value) => {
                                    if (value < 100) {
                                        return Promise.reject("Amount must be greater than 100");
                                    }
                                },
                            },
                        ]}
                    >
                        <InputNumber addonBefore="PHP" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name={["description"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Remarks"
                        name={["remarks"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}