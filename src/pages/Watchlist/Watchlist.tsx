import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Table } from "antd";
import { selectSavedCoins } from "../../store/mainSlice";

const WatchList: FC = () => {
  const selectedCoins = useSelector(selectSavedCoins);

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Supply',
      dataIndex: 'supply',
      key: 'supply',
      render: (supply: string) => parseFloat(supply).toFixed(2)
    },
    {
      title: 'MaxSupply',
      dataIndex: 'maxSupply',
      key: 'maxSupply',
      render: (maxSupply: string) => {
        if (isNaN(parseFloat(maxSupply))) {
          return 'Unknown'
        }
        return parseFloat(maxSupply).toFixed(0)
      }
    },
    {
      title: 'Volume',
      dataIndex: 'volumeUsd24Hr',
      key: 'volumeUsd24Hr',
      render: (volume: string) => parseFloat(volume).toFixed(2)
    },
    {
      title: 'Price',
      dataIndex: 'priceUsd',
      key: 'priceUsd',
      render: (price: string) => parseFloat(price).toFixed(2)
    },
  ];

  return (
    <div>
      <h1>Saved Coins</h1>
      <Table
        dataSource={selectedCoins}
        columns={columns}
        pagination={false}
        rowKey="rank"
      />
    </div>
  )
};

export default WatchList;
