import { Table, Pagination, Tag } from "antd";
import { api } from "../../Api/Api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { selectSearch, addSavedCoin } from "../../store/mainSlice";
import classes from "./styles.module.css"

export interface CoinData {
  rank: number;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  volumeUsd24Hr: string;
  priceUsd: string;
}

const CoinTable = () => {
  const dispatch = useDispatch()
  const search = useSelector(selectSearch)
  const [coinsData, setCoinsData] = useState<CoinData[]>([]);
  const [coinData, setCoinData] = useState<CoinData | null>(null); 
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  useEffect(() => {
    fetchCoinData()
  }, [pagination.current]);
  useEffect(() => {
    filterCoinsData()
  }, [search])

  const handleAddToWatchList = (record: CoinData) => {
    dispatch(addSavedCoin(record));
  }

  const fetchCoinData = async (): Promise<void> => {
    try {
      const response = await api.getCoins(pagination.current, pagination.pageSize);
      const data = response.data
      setCoinsData(data)
    } catch(e) {
      console.log(e)
    }
  }

  const filterCoinsData = (): void => {
    const filteredData = coinsData.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
    setCoinData(filteredData[0] || null);
  };

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
    {
      title: 'Watchlist',
      key: 'Watchlist',
      render: (text: any, record: CoinData) => (
        <button onClick={() => handleAddToWatchList(record)}>Add to WatchList</button>
      ),
    }
  ];

  return (
    <>
      {coinData ? (
        <>
          <Table 
            dataSource={[coinData]} 
            columns={columns} 
            pagination={false} />
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={100}
            onChange={handlePaginationChange}
          />
        </>
      ) : (
        <>
          <Table 
            dataSource={coinsData} 
            columns={columns} 
            pagination={false} />
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={100}
            onChange={handlePaginationChange}
          />
        </>
      )}
    </>
  )
}

export default CoinTable