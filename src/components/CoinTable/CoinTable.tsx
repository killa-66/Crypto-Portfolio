import { Table, Pagination, Tag } from "antd";
import { api } from "../../Api/Api";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { selectSearch } from "../../store/mainSlice";
import classes from "./styles.module.css"


const CoinTable = () => {
  const search = useSelector(selectSearch)

  console.log("search 1 ", search)
  const [coinsData, setCoinsData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  useEffect(() => {
    fetchCoinData()
  }, [pagination.current]);

  const fetchCoinData = async (): Promise<void> => {
    try {
      const response = await api.getCoins(pagination.current, pagination.pageSize);
      const data = response.data
      setCoinsData(data)
    } catch(e) {
      console.log(e)
    }
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page});
  };
  
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
      render: ( name: string ) => (
        <>
          {name === search ? <div className={classes.greenCeil}>{name}</div> : <div>{name}</div>}
        </>
      ),
    },
    {
      title: 'Supply',
      dataIndex: 'supply',
      key: 'supply',
      render: (price: string) => parseFloat(price).toFixed(2)
    },
    {
      title: 'MaxSupply',
      dataIndex: 'maxSupply',
      key: 'maxSupply',
      render: (price: string) => {
        if(isNaN(parseFloat(price))) {
          return 'Unknown'
        } 
        return parseFloat(price).toFixed(0)
      }
    },
    {
      title: 'Volume',
      dataIndex: 'volumeUsd24Hr',
      key: 'volumeUsd24Hr',
      render: (price: string) => parseFloat(price).toFixed(2)
    },
    {
      title: 'Price',
      dataIndex: 'priceUsd',
      key: 'priceUsd',
      render: (price: string) => parseFloat(price).toFixed(2)
    },
  ];

  return (
    <>
      <Table
        dataSource={coinsData}
        columns={columns}
        pagination={false} 
      />
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={100} 
        onChange={handlePaginationChange}
      />
    </>
  )
}

export default CoinTable