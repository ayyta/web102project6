import { useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Card from './components/Card'
import List from './components/List'
import NavBar from './components/NavBar'
import DateInDetail from './routes/DateInDetail'


const convertCtoF = (c) => {
  return ((c * 9/5) + 32).toFixed(1);
}

// WeatherBit API KEY
const API_KEY = '2da3fac7519249c5b6d57a824f6d8022'



function App() {
  const listURL = `https://api.weatherbit.io/v2.0/history/daily?postal_code=92697&country=US&start_date=2023-10-12&end_date=2023-10-20&key=${API_KEY}`;
  const [listData, setListData] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [filterApplied, setFilterApplied] = useState(false);
  const [searchDate, setSearchDate] = useState(null);
  const [searchClouds, setSearchClouds] = useState(null);

  const [totalItems, setTotalItems] = useState(null);
  const [meanTemp, setMeanTemp] = useState(null);
  const [medianClouds, setMedianClouds] = useState(null);
  const callAPI = async (query) => {
    try {
      const response = await fetch(query);
      const data = await response.json();
      setListData(data);
      setFilteredData(data['data']);
      setDetailData(data['data'].map(item => ({
        datetime: item.datetime,
        clouds: item.clouds,
        temp: item.temp,
        max_temp: convertCtoF(item.max_temp),
        min_temp: convertCtoF(item.min_temp),
        wind_spd: convertCtoF(item.wind_spd)
      })))
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    callAPI(listURL);
  }, []);

  useEffect(() => {
    if (filterApplied) {
      if (searchDate.length === 0 && searchClouds.length === 0) {
        setFilteredData(listData['data']);
      } else if (searchDate.length === 0) {
        setFilteredData(listData['data'].filter((item) => item['clouds'] >= searchClouds))
      } else {
        setFilteredData(filteredData.filter((item) => item['datetime'] === searchDate))
      }
      setFilterApplied(false);
    }
  }, [searchDate])

  useEffect(() => { 
    if (filterApplied) {
      if (searchClouds.length === 0 && searchDate.length === 0) {
        setFilteredData(listData['data']);
      } else if (searchClouds.length === 0) {
        setFilteredData(listData['data'].filter((item) => item['datetime'] === searchDate))
      } else {
        setFilteredData(filteredData.filter((item) => item['clouds'] >= searchClouds))
      }
      setFilterApplied(false);
    
    }}, [searchClouds])
  
  useEffect(() => {
    if (filteredData !== null) {
      setTotalItems(filteredData.length);
    }

  }, [filteredData]);

  useEffect(() => { 
    if (filteredData !== null) {
      let total = 0;
      filteredData.forEach((item) => {
        total += item['temp'];
      })
      setMeanTemp(convertCtoF((total / filteredData.length)));
    }
  }, [filteredData])

  useEffect(() => { 
    if (filteredData !== null) { 
      let cloudList = [];
      filteredData.forEach((item) => {
        cloudList.push(item['clouds']);
      })
      cloudList.sort();
      setMedianClouds(cloudList[Math.floor(cloudList.length / 2)])
    }
  }, [filteredData])



  // datetime, clouds, max-temp, min-temp, wind-spd
  return (
    <>
    <main>

      <div className='left-container'>
        <Header/>
        <NavBar/>
      </div>
      <div className='right-container'>
        <Routes>
          <Route path="/" element={
            <>
            <div className='card-container'>
              <Card attr='Total Items' data={totalItems}/>
              <Card attr='Mean Temperature' data={meanTemp}/>
              <Card attr='Median Clouds' data={medianClouds}/>
            </div>
            <div className='data-container'>
              <div className='list-data-container'>
                {listData !== null && <List data={filteredData} filter={setFilterApplied} search={setSearchDate} clouds={setSearchClouds}/>}
              </div>
              <div className='visual-data-container'>
                Graph
              </div>
            </div>
            

          
          </>}>
          </Route>

          {detailData != null && detailData.map(item => (
            <Route path={`/${item.datetime}`} element={<DateInDetail data={item}/>}></Route>
          ))}
        </Routes>
      </div>
      


    </main>
    </>
  )
}
export default App
