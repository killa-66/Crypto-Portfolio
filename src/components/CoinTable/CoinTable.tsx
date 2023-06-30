import { Table, Pagination, Tag } from "antd";
import { api } from "../../Api/Api";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { selectSearch, addSavedCoin, setCoinsData, selectCoinsData, selectPageSize, selectCurrentPage, setCurrentPage, setPageSize, selectSavedCoins } from "../../store/mainSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const savedCoins = useSelector(selectSavedCoins);
  const coinsData = useSelector(selectCoinsData)
  const [coinData, setCoinData] = useState<CoinData | null>(null); 
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  
  useEffect(() => {
    fetchCoinData()
  }, [currentPage]);

  useEffect(() => {
    filterCoinsData()
  }, [search])

  const handleAddToWatchList = useCallback((record: CoinData) => {
    dispatch(addSavedCoin(record));
    toast.success("Coin added to watchlist!");
  }, []);

  const fetchCoinData = async (): Promise<void> => {
    try {
      const response = await api.getCoins(currentPage, pageSize);
      const data = response.data
      dispatch(setCoinsData(data))
    } catch(e) {
      console.log(e)
    }
  }

  const filterCoinsData = (): void => {
    const filteredData = coinsData.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
    setCoinData(filteredData[0] || null);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch(setCurrentPage(page));
    dispatch(setPageSize(pageSize));
  };
  
  const columns = useMemo(() => ([
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
      render: (price: string) => parseFloat(price).toFixed(2)
    },
    {
      title: 'MaxSupply',
      dataIndex: 'maxSupply',
      key: 'maxSupply',
      render: (price: string) => {
        if(isNaN(parseFloat(price))) {
          return '-'
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
      render: (text: any, record: CoinData) => {
        const isCoinSaved = savedCoins.some(coin => coin.name === record.name);
        return (
          <button 
            onClick={() => {
              handleAddToWatchList(record);
            }} 
            disabled={isCoinSaved}
          >
            Add to WatchList
          </button>
        );
      },
    }
  ]), [handleAddToWatchList, savedCoins]);

  return (
    <>
        <>
          <Table 
            dataSource={coinsData} 
            columns={columns} 
            pagination={false} />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={100}
            onChange={handlePaginationChange}
          />
        </>
    </>
  )
}

export default CoinTable