import { FC } from "react";
import { Space, Image, Typography } from "antd";
import { DataType } from "../types";

interface Props {
  entity: DataType;
}

export const NameComponent: FC<Props> = ({ entity }) => {
  const { image, name } = entity;

  return (
    <Space align="center" size={24}>
      <Image width={32} height={32} src={image} />
      <Typography.Text>{name}</Typography.Text>
    </Space>
  );
};
