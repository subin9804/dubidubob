import React, {useState, useContext, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, MapMarker, MapInfoWindow} from 'react-kakao-maps-sdk';
import {
  PieChart, 
  Pie,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";



function fetchData(searchYearCd, guGun) {

  const endPoint = 'http://apis.data.go.kr/B552061/lgStat/getRestLgStat'
  const serviceKey = process.env.REACT_APP_SERVICE_KEY;
  const type = 'json';
  const numOfRows = 13;
  const siDo = 1100;
  const pageNo = 1;

  const promise = fetch(`${endPoint}?serviceKey=${serviceKey}&searchYearCd=${searchYearCd}&siDo=${siDo}&guGun=${guGun}&type=${type}&numOfRows=${numOfRows}&pageNo=${pageNo}`)
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })

  return promise;
}


const seoulGuguns = [
  {name: "강남구", code: "1116"},
  {name: "강동구", code: "1117"},
  {name: "강북구", code: "1124"},
  {name: "강서구", code: "1111"},
  {name: "관악구", code: "1115"},
  {name: "광진구", code: "1123"},
  {name: "구로구", code: "1112"},
  {name: "금천구", code: "1125"},
  {name: "노원구", code: "1122"},
  {name: "도봉구", code: "1107"},
  {name: "동대문구", code: "1105"},
  {name: "동작구", code: "1114"}, 
  {name: "마포구", code: "1110"},
  {name: "서대문구", code: "1109"},
  {name: "서초구", code: "1119"},
  {name: "성동구", code: "1104"},
  {name: "성북구", code: "1106"},
  {name: "송파구", code: "1118"},
  {name: "양천구", code: "1120"},
  {name: "영등포구", code: "1113"},
  {name: "용산구", code: "1103"},
  {name: "은평구", code: "1108"}, 
  {name: "종로구", code: "1101"}, 
  {name: "중구", code: "1102"},
  {name: "중랑구", code: "1121"}
]

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [searchYearCd, setSearchYearCd] = useState(2021);
  const [guGun, setGuGun] = useState(1116);
    
        
  useEffect(() => {  
    setIsLoaded(false);

    fetchData(searchYearCd, guGun)
    .then(data => {
      setData(data);
    })
    .catch(error => {
      setError(error)
    })
    .finally(() => {
      setIsLoaded(true)
    })
  }, [searchYearCd, guGun])

  if (error) {
    return <p>failed to fetch</p>
  }

  if (!isLoaded) {
    return <p>fetching data...</p>
  }

  console.log(data)

// 연도별, 대상별 사고건수
  let allAcc = `${data.items.item[0].acc_cnt}`;
  console.log(searchYearCd,data.items.item[0].sido_sgg_nm,"전체사고",allAcc);

  let kidAcc = `${data.items.item[1].acc_cnt}`;
  console.log(searchYearCd,data.items.item[0].sido_sgg_nm,"어린이사고",kidAcc)

  let oldAcc = `${data.items.item[2].acc_cnt}`;
  console.log(searchYearCd,data.items.item[0].sido_sgg_nm,"노약자사고",oldAcc)

  let gugunName = `${data.items.item[0].sido_sgg_nm}`.substring(6)

  
  
  const handleSelect = (code) => {
    setGuGun(code)
  }
  
  function open() {
    const list = document.getElementById("list")
    list.classList.toggle("hidden")
  }


  return (
    <div style={{margin: "1rem"}}>
      <h1>{searchYearCd}년 서울특별시 {gugunName} 자전거 사고조회 &#128561;</h1>


      <h2>조회하실 연도를 선택하십시오</h2>
      <div className="">
        <button onClick={() => setSearchYearCd(searchYearCd - 1)}>&#10094; 이전년도</button>
        <button onClick={() => setSearchYearCd(searchYearCd + 1)} disabled={searchYearCd==2021}>다음년도 &#10095;>다음년도 &#10095;</button>
      </div>


          <h2>요약</h2>
          <p>{searchYearCd}년 전국에서 총 {data.items.item[0].tot_acc_cnt}건의 사고가 발생했습니다</p>

          
          <div className='w-28 relative'>
          <button
            className='border-solid border-2 border-indigo-600 rounded-2xl pl-4 py-2 w-28 block text-left'
            onClick={open}
          >{gugunName}   &#9661;</button>
          <div 
            id='list'
            className="bg-white absolute hidden left-1.5 w-28 z-10 border-solid border-1"
            >
            {seoulGuguns.map(gogun => (
              <button 
              onClick={() => handleSelect(gogun.code)}
              className="block hover:bg-gray-300 p-2 w-28"
              >
                {gogun.name}
              </button>
            ))}
          </div>
        </div>

          
         <h2>Chart</h2>
          <h3>{gugunName} 총 사고건수: {allAcc}</h3>
          <Rechart
            allAcc={allAcc}
            kidAcc={kidAcc}
            oldAcc={oldAcc}
            gugunName={gugunName}
          />
        </>
      
    </div>  
  )
}

function Rechart(props) {
  const chartData = [
    {
      name: `${props.gugunName}`,
      전체사고: `${props.allAcc}`,
      어린이사고: `${props.kidAcc}`,
      고령자사고: `${props.oldAcc}`
    }
  ];

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width + 20} y={y + height / 2} fill="#666" textAnchor="middle" dy={6}>{`${value}`}</text>;
  };

  return (
    <>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="50%" height="90%">
          <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 50,
              bottom: 20,
              left: 50
            }}
            >
              <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="전체사고" fill="#6D67E4" label={renderCustomBarLabel}/>
            <Bar dataKey="어린이사고" fill="#46C2CB" label={renderCustomBarLabel}/>
            <Bar dataKey="고령자사고" fill="#F2921D" label={renderCustomBarLabel}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
  </>
  );
  
}
