import React, {useState, useContext, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, MapMarker, MapInfoWindow} from 'react-kakao-maps-sdk';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";



const seoulGuguns = {
  강남구: 1116,
  강동구: 1117,
  강북구: 1124, 
  강서구: 1111, 
  관악구: 1115,
  광진구: 1123,
  구로구: 1112,
  금천구: 1125,
  노원구: 1122,
  도봉구: 1107,
  동대문구: 1105,
  동작구: 1114, 
  마포구: 1110,
  서대문구: 1109,
  서초구: 1119,
  성동구: 1104,
  성북구: 1106,
  송파구: 1118,
  양천구: 1120,
  영등포구: 1113,
  용산구: 1103,
  은평구: 1108, 
  종로구: 1101, 
  중구: 1102,
  중랑구: 1121
}

const GUGUN = object.keys(seoulGuguns);

function fetchData(searchYearCd, Guguns) {
  const endPoint = 'http://apis.data.go.kr/B552061/lgStat/getRestLgStat'
  const serviceKey = process.env.REACT_APP_SERVICE_KEY;
  const type = 'json';
  const numOfRows = 13
  const siDo = 1100
  const pageNo = 1


  for (let guGun of seoulGuguns) {
    const url = `${endPoint}?serviceKey=${serviceKey}&searchYearCd=${searchYearCd}&siDo=${siDo}&guGun=${guGun}&type=${type}&numOfRows=${numOfRows}&pageNo=${pageNo}`
      promise = fetch(url)
       .then(res => {
         if (!res.ok) {
           throw res;
         }
         return res.json();
     })
    console.log(url);
  }  
  
  return promise;
  //total += response[0].acc_cnt
  //kidtotal += response[1].acc_cnt
  //oldtotal += response[2].acc_cnt






}

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [searchYearCd, setSearchYearCd] = useState(2019);
    //const [siDo, setSiDo] = useState(1100);
    //const [guGun, setGuGun] = useState(null);
    

    
    console.log(GUGUN);
    
  useEffect(() => {  
    setIsLoaded(false);

    fetchData(searchYearCd)
    .then(data => {
      setData(data);
    })
    .catch(error => {
      setError(error)
    })
    .finally(() => setIsLoaded(true))
  }, [searchYearCd, siDo])

  if (error) {
    return <p>failed to fetch</p>
  }

  if (!isLoaded) {
    return <p>fetching data...</p>
  }


  return (
    <div style={{margin: "1rem"}}>
      <h1>{searchYearCd}년 서울특별시 마포구 자전거 사고조회 &#128561;</h1>

      <h2>조회하실 연도를 선택하십시오</h2>
      <div className="">
        <button onClick={() => setSearchYearCd(searchYearCd - 1)}>&#10094; 이전년도</button>
        <button onClick={() => setSearchYearCd(searchYearCd + 1)}>다음년도 &#10095;</button>
      </div>

      {data.totalCount > 0 ? (
        <>
          <h2>요약</h2>
          <p>총 {data.totalCount}건의 사고가 발생했습니다</p>

          <h2>Chart</h2>
          <Rechart accidents={data.items.item} />

          <h2>지도</h2>
          <p>지도를 확대 또는 축소할 수 있습니다</p>
        </>
      ) : (
        <p>해당 년도 자료가 없습니다</p>
      )}

      <li>{GUGUN}</li>
    </div>  
  )
}

function Rechart({accidents}) {

  const chartData = accidents.map(accident => {
    return {
      name: accident.spot_nm.split(' ')[2],
      발생건수: accident.occrrnc_cnt,
      중상자수: accident.se_dnv_cnt,
      사망자수: accident.dth_dnv_cnt
    }
  })

  return (
    // <div style={{ height: "300px" }}>
    //   <ResponsiveContainer width="100%" height="100%">
    //     <BarChart
    //       width={500}
    //       height={300}
    //       data={chartData}
    //       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    //     >
    //       <CartesianGrid strokeDasharray="3 3" />
    //       <XAxis dataKey="name" />
    //       <YAxis />
    //       <Tooltip />
    //       <Legend />
    //       <Bar dataKey="발생건수" fill="#0af" />
    //       <Bar dataKey="중상자수" fill="#fa0" />
    //       <Bar dataKey="사망자수" fill="#f00" />
    //     </BarChart>
    //   </ResponsiveContainer>
    // </div>

      <ComposedChart
        layout="vertical"
        width={500}
        height={600}
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
      <CartesianGrid stroke="#00" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" scale="band" />
      <Tooltip />
      <Legend />   
      <Bar dataKey="pv" barSize={20} fill="#413ea0" />
      <Bar dataKey="uv" barSize={20} fill="#413ea0" />
    </ComposedChart>
  );
}
