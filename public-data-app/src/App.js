import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, MapMarker, MapInfoWindow} from 'react-kakao-maps-sdk';
import {
  Cell,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const seoulGuguns = [
  {name: "강남구", code: "1116", latlng: {lat:37.51711212459071, lng: 127.04726867861118}},
  {name: "강동구", code: "1117", latlng: {lat:37.53000261570808, lng:  127.12349803551115}},
  {name: "강북구", code: "1124", latlng: {lat:37.53000261570808, lng:  127.12349803551115}},
  {name: "강서구", code: "1111", latlng: {lat:37.55082005198832, lng: 126.84921718459985}},
  {name: "관악구", code: "1115", latlng: {lat:37.47822047671565 , lng: 126.95123634579787}},
  {name: "광진구", code: "1123", latlng: {lat:37.53848272752991, ling:127.08224480316936}},
  {name: "구로구", code: "1112", latlng: {lat:37.49528501960699, ling:8871889057314}},
  {name: "금천구", code: "1125", latlng: {lat: 37.456743695287145, lng: 126.89529416053222}},
  {name: "노원구", code: "1122", latlng: {lat: 37.65421775524895, lng: 127.05610399576709}},
  {name: "도봉구", code: "1107", latlng: {lat: 37.668572540460474, lng: 127.04706080878319}},
  {name: "동대문구", code: "1105", latlng: {lat: 37.57445094922791, lng:127.03951659228395}},
  {name: "동작구", code: "1114", latlng: {lat: 37.51240988759144, lng: 126.93917033610218}},
  {name: "마포구", code: "1110", latlng: {lat:37.5662104544173 , lng: 126.90179668056012}},
  {name: "서대문구", code: "1109", latlng: {lat:37.57908247946858 , lng: 126.93663459291378}},
  {name: "서초구", code: "1119", latlng: {lat: 37.56341641036982, lng: 127.03687580686145}},
  {name: "성동구", code: "1104", latlng: {lat: 37.5634618921049, lng: 127.03693525165414}},
  {name: "성북구", code: "1106", latlng: {lat: 37.58927232396706, lng: 127.01667571243007 }},
  {name: "송파구", code: "1118", latlng: {lat: 37.51445065467338, lng:127.10560080876512  }},
  {name: "양천구", code: "1120", latlng: {lat:37.51692703834044 , lng:126.86635220719805}},
  {name: "영등포구", code: "1113", latlng: {lat:37.526237358858246 , lng:  126.89619264545243 }},
  {name: "용산구", code: "1103", latlng: {lat: 37.53233011720075, lng: 126.99046016852888 }},
  {name: "은평구", code: "1108", latlng: {lat: 37.602550591128484, lng: 126.92868756725284}},
  {name: "종로구", code: "1101", latlng: {lat:37.573259109005946, lng:126.97863683810121 }},
  {name: "중구", code: "1102", latlng: {lat: 37.56376091808418, lng:  126.99753254663673 }},
  {name: "중랑구", code: "1121", latlng: {lat: 37.60648208864871 , lng:  127.09267072022928 }}
]


export default function App() {
  const endPoint = 'http://apis.data.go.kr/B552061/lgStat/getRestLgStat'
  const serviceKey = process.env.REACT_APP_SERVICE_KEY;
  const type = 'json';
  const numOfRows = 13;
  const siDo = 1100;
  const pageNo = 1;
  
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [seoulData,setseoulData] = useState(null);
  const [searchYearCd, setSearchYearCd] = useState(2021);
  const [guGun, setGuGun] = useState(1116);
  
  const url1 = `${endPoint}?serviceKey=${serviceKey}&searchYearCd=${searchYearCd}&siDo=${siDo}&guGun=${guGun}&type=${type}&numOfRows=${numOfRows}&pageNo=${pageNo}`
  const url2 = `http://apis.data.go.kr/B552061/lgStat/getRestLgStat?serviceKey=${serviceKey}&searchYearCd=${searchYearCd}&siDo=1100&guGun=&type=json&numOfRows=13&pageNo=1`

  useEffect(() => {  
    setIsLoaded(false);

    fetch(url1)
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(json => {
      setData(json);
      console.log("First", json);
      return fetch(url2);
    })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(json => {
      setseoulData(json);
      console.log("Second", json);
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
  console.log(seoulData.items.item[0].acc_cnt)

  // 구군별 총사고건수
  let allAcc = `${data.items.item[0].acc_cnt}`;
  console.log(searchYearCd,data.items.item[0].sido_sgg_nm,"전체사고",allAcc);

  // 어린이 사고건수
  let kidAcc = `${data.items.item[1].acc_cnt}`;
  console.log(searchYearCd,data.items.item[0].sido_sgg_nm,"어린이사고",kidAcc)

  // 구군 이름
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
      <h2 className='text-3xl font-bold text-center border border-black '>
        <span className='underline underline-offset-8'>
          {searchYearCd}년&nbsp;
        </span>
        서울특별시 &nbsp;
          <span id='selector'>
              <button
                onClick={open}
                className="text-xl"
              >{gugunName} &#9661;</button>
              <div id='list' className='hidden'>
                {seoulGuguns.map(gugun => (
                  <button
                  key={gugun.code}
                  onClick={() => handleSelect(gugun.code)}
                  className="block hover:bg-yellow-600 p-2 w-full text-xl"
                  >
                    {gugun.name}
                  </button>
                ))}
              </div>
          </span>
          &nbsp;어린이 사고조회
      </h2>

      {/* <h3>조회하실 연도를 선택하십시오</h3> */}
      <div className="text-center font-bold">
        <button className='p-4' onClick={() => setSearchYearCd(searchYearCd - 1)} disabled={searchYearCd==2010}>&#10094; 이전년도</button>
        <button className='p-4'onClick={() => setSearchYearCd(searchYearCd + 1)} disabled={searchYearCd==2021}>다음년도 &#10095;</button>
      </div>

      <div>
        <p id='pc-p' className='pfs'><span className='text-2xl'> {searchYearCd}년 </span> 전국에서 <span className='underline underline-offset-8'>총 {data.items.item[0].tot_acc_cnt}건</span>의 사고가 발생했습니다</p>

        <div id='pc-info' className='cm cm-bc border'>
          <div className='chart cm-bc border ch-r'>
            <h2 className='mb cm-bc td p-4 text-xl'>Chart▶</h2>
            <div className='cm-bc'>
              <h3 className='text-center mb-8'><span className='text-xl border-b-[4px] border-black p-2'><a className='font-bold text-3xl'>{gugunName}</a> 총 사고건수: {allAcc}</span></h3>
              <Rechart
                gugunName={gugunName}
                data={data.items.item}
                seoulData={seoulData.items.item}
              />
            </div>
          </div>

          <div className='chart ch-l map p-4'>
            <h2 className='mb cm-bc td text-xl'>Map▶</h2>
            <p>지도를 확대 또는 축소할 수 있습니다</p>
            <div className='kakao'>
              <KakaoMap 
                accidents={data.items.item}
                seoulData={seoulData.items.item}
                gugunName={gugunName}
                setGuGun={setGuGun}
              />
            </div>
            <p className='text-xl py-4'>선택한 지역: {gugunName}</p>
          </div>
        </div>

        <div id='mobile-info'>
          <div className='chart mo-chart cm-bc border ch-r'>
            <h2 className='mb cm-bc td p-4 text-xl mb-8'>Chart▶</h2>
            <div className='cm-bc'>
              <h3 className='text-center'><span className='text-xl border-b-[4px] border-black p-2'><a className='font-bold text-3xl'>{gugunName}</a> 총 사고건수: {allAcc}</span></h3>
              <Rechart
                gugunName={gugunName}
                data={data.items.item}
                seoulData={seoulData.items.item}
              />
            </div>

            <div className='chart mo-map cm-bc p-4'>
              <h2 className='mb cm-bc td text-xl self-start'>Map▶</h2>
              <p className='cm-bc mb-4 self-start'>지도를 확대 또는 축소할 수 있습니다</p>
              <div className='kakao'>
                <KakaoMap 
                  accidents={data.items.item}
                  seoulData={seoulData.items.item}
                  gugunName={gugunName}
                  setGuGun={setGuGun}
                />
              </div>
              <p className='text-xl py-4'>선택한 지역: {gugunName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>    
  )
}


function Rechart(props) {

  let seoulData = props.seoulData;
  let data = props.data;
  let gugunName = props.gugunName;
  let d1 = Math.round((data[0].acc_cnt/seoulData[0].acc_cnt)*100)
  let d2 = Math.round((data[1].acc_cnt/data[0].acc_cnt)*100)
  let d3 = Math.round((data[1].acc_cnt/seoulData[1].acc_cnt)*100)
  // console.log(seoulData[0].acc_cnt)
  // console.log(data[0].acc_cnt)
  // console.log(d3)

  const data01 = [
  { name: 'Group A', value: (100-d1)},
  { name: '서울시 대비 강남구 사고', value: d1},
  ];
  const data02 = [
  { name: 'Group A', value: (100-d2)},
  { name: '강남구 총사고 대비 어린이사고', value: d2 },
  ];
  const data03 = [
  { name: 'Group A', value:(100-d3)},
  { name: '서울시 대비 강남구 어린이사고', value: d3 },
  ];

  // 차트 색깔
  const COLORS = ['#000', '#F00'];

  return (
    <div id='chartStyle' style={{ height: "500px", width: "100%" }}>
      <div id="circle1">
        <h3>서울시 대비 {gugunName} 총사고</h3>
        <PieChart width={480} height={200}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data01}
            outerRadius={80}
            fill="#8884d8"
            label="post"
          >
            {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      
      <div id="circles">
        <div>
          <PieChart width={250} height={200}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data02}

              outerRadius={80}
              fill="#8884d8"
              label
              >
              {data02.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <h3>{gugunName} 총사고 대비 어린이사고</h3>
        </div> 
        <div>
          <PieChart width={250} height={200}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data03}
              outerRadius={80}
              fill="#8884d8"
              label
              >
              {data03.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <h3>서울시 대비 {gugunName} 어린이사고</h3>
        </div>
      </div>
    </div>
  );
}

function KakaoMap(props) {
  let data = props.accidents;
  let setGuGun = props.setGuGun;
  // return console.log(accidents)
  console.log(data)


  const handleSelect = (code) => {
    setGuGun(code)
  }

  return (
    <div style={{width:"100%", height:"500px"}}>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 37.56682240068373,
          lng: 126.97865225933727,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={9} // 지도의 확대 레벨
      >
        {seoulGuguns.map((position, index) => (
          <MapMarker
            key={`${position.name}-${position.latlng}`}
            position={position.latlng} // 마커를 표시할 위치
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35
              }, // 마커이미지의 크기입니다
            }}
            title={position.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            onClick={() => handleSelect(position.code)}
          />
        ))}
      </Map>
    </div>
  )
}