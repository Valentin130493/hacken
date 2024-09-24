import {FC, useMemo, useState} from "react";
import {
    Row,
    Col,
    Typography,
    Select,
    Table,
    Layout,
    TablePaginationConfig,
    Space,
} from "antd";


import {ColumnsType} from "antd/lib/table";

import {DataType, TableParams} from "./types.ts";
import {defaultPaginationParams} from "./static/defaultStates.ts";
import {useGetData} from "./hooks/useGetData.ts";
import {NameComponent} from "./components/NameComponent.tsx";
import {ErrorMessage} from "./components/ErrorMessage.tsx";
import {currencyOptions, orderOptions} from "./static/selectOptions.ts";


const App: FC = () => {
    const [currency, setCurrency] = useState("usd");
    const [order, setOrder] = useState("market_cap_desc");
    const [tableParams, setTableParams] = useState<TableParams>(
        defaultPaginationParams,
    );
    const {loading, error, data} = useGetData<DataType>(
        currency,
        order,
        tableParams.pagination,
    );

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: "Name",
                render: (entity) => <NameComponent entity={entity}/>,
                width: "40%",
            },
            {
                title: "Current Price",
                dataIndex: "current_price",
                render: (price) => (
                    <Typography.Paragraph style={{margin: 0}}>
                        {price} {currency}
                    </Typography.Paragraph>
                ),
                width: "30%",
            },
            {
                title: "Circulating Supply",
                dataIndex: "circulating_supply",
                width: "30%",
            },
        ],
        [currency],
    );

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setTableParams((prev) => ({
            ...prev,
            pagination,
        }));
    };
    const handleCurrencyChange = (value: string) => {
        setCurrency(value);
    };
    const handleOrderChange = (value: string) => {
        setOrder(value);
    };

    if (error) {
        return <ErrorMessage/>;
    }
    return (
        <Layout style={{margin: 8, backgroundColor: "transparent"}}>
            <Space direction="vertical" size="large" style={{width: "100%"}}>
                <Typography.Title level={2} style={{margin: 0}}>
                    Coins & Markets
                </Typography.Title>
                <Row gutter={12}>
                    <Col span={4}>
                        <Select
                            style={{width: "100%"}}
                            onChange={handleCurrencyChange}
                            options={currencyOptions}
                            defaultValue={currency}
                        />
                    </Col>
                    <Col span={4}>
                        <Select
                            options={orderOptions}
                            defaultValue={order}
                            onChange={handleOrderChange}
                            style={{width: "100%"}}
                        />
                    </Col>
                </Row>
                <Row>
                    <Table
                        key="id"
                        style={{width: "100%"}}
                        onChange={handleTableChange}
                        columns={columns}
                        loading={loading}
                        dataSource={data || []}
                        pagination={tableParams.pagination}
                        rowKey={"id"}
                    />
                </Row>
            </Space>
        </Layout>
    );
};

export default App;
