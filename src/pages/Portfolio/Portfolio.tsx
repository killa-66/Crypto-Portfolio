import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectPortfolio } from '../../store/mainSlice';
import { Table } from 'antd';


const Portfolio: FC = () => {

  const portfolioCoin = useSelector(selectPortfolio)

  const columns = [
    {
      title: 'Coin Name',
      dataIndex: 'coinName',
      key: 'coinName',
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
      render: (purchasePrice: string) => `${parseFloat(purchasePrice).toFixed(2)} $`
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (totalCost: string) => `${parseFloat(totalCost).toFixed(2)} $`
    },
  ];

  return (
    <div>
      <h1>Portfolio</h1>
      <Table
        dataSource={portfolioCoin}
        columns={columns}
        rowKey="coinName"
      />
    </div>
  );
};

export default Portfolio;