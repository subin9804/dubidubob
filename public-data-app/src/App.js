import React, {useState, useContext, useEffect, useRef, PureComponent} from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, MapMarker, MapInfoWindow} from 'react-kakao-maps-sdk';
import {
  Cell,
  Sector,
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

  let gugunName = `${data.items.item[0].sido_sgg_nm}`.substring(6)

  console.log(data.items.item[1].tot_acc_cnt)

  const handleSelect = (code) => {
    setGuGun(code)
  }
 

  function open() {
    const list = document.getElementById("list")
    list.classList.toggle("hidden")
  }


  return (
    <div style={{margin: "1rem"}}>
      <h2>{searchYearCd}년 서울특별시 {gugunName} 자전거 사고조회 &#128561;</h2>

      {/* <h3>조회하실 연도를 선택하십시오</h3> */}
      <div className="">
        <button onClick={() => setSearchYearCd(searchYearCd - 1)}>&#10094; 이전년도</button>
        <button onClick={() => setSearchYearCd(searchYearCd + 1)} disabled={searchYearCd==2021}>다음년도 &#10095;</button>
      </div>
       

        <>
          <p id='pc-p' className='pfs'>{searchYearCd}년 전국에서 총 {data.items.item[0].tot_acc_cnt}건의 사고가 발생했습니다</p>

        <div id='selector'>
          <button
            onClick={open}
          >{gugunName}   &#9661;</button>
          <div id='list' className='hidden'>
            {seoulGuguns.map(gogun => (
              <button
              onClick={() => handleSelect(gogun.code)}
              className="block hover:bg-yellow-600 p-2 w-full"
              >
                {gogun.name}
              </button>
            ))}
          </div>
        </div>
       
        <div id='pc-info' className='cm cm-bc border'>
          <div className='chart cm-bc border ch-r'>
            <h2 className='h2pl mb cm-bc td'>Chart</h2>
            <div className='cm-bc'>
              <h3>{gugunName} 총 사고건수: {allAcc}</h3>
              <Rechart
                allAcc={allAcc}
                kidAcc={kidAcc}
                gugunName={gugunName}
                accidents={data.items}
                searchYearCd={searchYearCd}
              />
            </div>
          </div>

         <div className='chart ch-l map'>
          <h2 className='h2pl td'>지도</h2>
            <p className='h2pl'>지도를 확대 또는 축소할 수 있습니다</p>
            {/* <KakaoMap accidents={data.items.item} /> */}
          </div>
        </div>

      <div id='mobile-info'>
        <div className='chart mo-chart cm-bc border ch-r'>
         <h2 className='h2pl mb cm-bc td'>Chart</h2>
         <div className='cm-bc'>
          <h3>{gugunName} 총 사고건수: {allAcc}</h3>
          {/* <Rechart
            gugunData={data}
            gugunName={gugunName}/> */}
          </div>

          <div className='chart mo-map cm-bc'>
          <h2 className='h2pl td cm-bc'>지도</h2>
            <p className='h2pl cm-bc'>지도를 확대 또는 축소할 수 있습니다</p>
            {/* <KakaoMap accidents={data.items.item} /> */}
          </div>
        </div>
      </div>

      </>
    </div>
       
  )
}

function fData(searchYearCd) {
  const serviceKey = process.env.REACT_APP_SERVICE_KEY;
  const promise = fetch(`http://apis.data.go.kr/B552061/lgStat/getRestLgStat?serviceKey=${serviceKey}&searchYearCd=${searchYearCd}&siDo=1100&guGun=&type=json&numOfRows=13&pageNo=1`)
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
  return promise;
}

function Rechart(props) {
  const [sidoData, setSidoData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {  
    fData(props.searchYearCd)
    .then(data => {
      setSidoData(data);
    })
    .catch(error => {
      setError(error)
    })
  }, [])
  if (error) {
    return <p>failed to fetch</p>
  }

  console.log(sidoData.items.item[0].acc_cnt);


  console.log(`${props.allAcc}`);
 
  const data01 = [
  { name: 'Group A', value:300},
  { name: 'Group B', value: 300 },
  ];


  // const data02 = [
  //   {name: "Group A", value: 400},
  //   {name: "전국대비 강남구 어린이사고", value: `${props.kidAcc/props.accidents.item[1].tot_acc_cnt}`,}
    
  // ];
  // const data03 = [
  //   {name: "a", value: 99}
  //   {name: "강남구 사고 대비 어린이사고 비율", value: `${props.kidAcc/props.allAcc}`}
  // ];


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx={500}
            cy={350}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx={150}
            cy={350}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx={300}
            cy={150}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
  
}