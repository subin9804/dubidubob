import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";
import Reco from "./Reco";

const { kakao } = window

export default function Home({data, gugunNms, all, active, setActive, state, likeToggle}) {

    const [gugunNm, setGugunNm] = useState(all);
    const [position, setPosition] = useState("");
    const [center, setCenter] = useState("");
    const [activeLike, setActiveLike] = useState(false);
    const navigate = useNavigate();
  
    function open() {
      const list = document.getElementById("list")
      list.classList.toggle("hidden")
    }
  
    // 전체 지역 맛집리스트 brief
    const fullList = data.map(item => {
      return {
      id: item.UC_SEQ,
      place: item.GUGUN_NM,
      name: item.MAIN_TITLE,
      address: item.ADDR1,
      image: item.MAIN_IMG_THUMB,
      menu: item.RPRSNTV_MENU,
      lat: item.LAT,
      lng: item.LNG
      }
    })
  
    // 동일 지역 맛집 리스트
    let resList = [];
    for (let i = 0; i < fullList.length; i++) {
      if(fullList[i].place === gugunNm) {
        resList.push(fullList[i]);
      } else {
        continue;
      }
    }
   
    // 전체 식당 표시
    let everyPosition = []
    useEffect(() => {
      // 맵에 마커가 표시될 위치
      everyPosition = (gugunNm != all ? resList : fullList).map(item => {
        return {
          name: item.name,
          latlng: new kakao.maps.LatLng(item.lat, item.lng),
          id: item.id
      }})
      setPosition(everyPosition);
      
      // 중심좌표(지역이 정해지지 않았을 때는 부산지도 중심)
      const busan = {
        lat: 35.1795543,
        lng: 129.0756416,
        name: "name"
      }
      setCenter(busan);
      
    },[gugunNm])
  
  
    // 디테일 포스트페이지 이동
    function showDetails(e){
      let id = null;
      for(let i = 0; i < fullList.length; i++) {
        if(e === fullList[i].id) {
          id = e;
          navigate(`/post/${id}`)
        }
      }
      console.log(id)
    }
  
    // 맵에 선택한 식당 위치 표시
    function showMap(lat, lng, name, id) {
      setPosition(
        [{name: name, latlng: new kakao.maps.LatLng(lat, lng), id: id}]
      )
      center.name = name;
    }

    // 하트 누른 식당들 위치 표시
    function showMapLike() {
        if(activeLike) {
            setActiveLike(false)
            setGugunNm(all);
            setPosition(everyPosition)

        } else if(!activeLike) {
            setActiveLike(true)

            if(state.length > 0) {
                if (state.length === 1) {
                    setPosition(
                        [{name: state[0].name, latlng: new kakao.maps.LatLng(state[0].lat, state[0].lng), id: state[0].id}]
                    )
                    center.name = state[0].name;
                }

                let likePosition = state.map((item) => {
                    return {
                        name: item.name, 
                        latlng: new kakao.maps.LatLng(item.lat, item.lng), 
                        id: item.id
                    }
                })  
                setPosition(likePosition)
            } 
        }
    }
    console.log(gugunNm)
    console.log(activeLike)
  
    return (
      <div className='h-screen w-full pt-12'>
        <div className='flex h-full'>
          {/* 사이드바 */}
          <div className='w-1/2 lg:w-1/3 h-full relative overflow-auto border bg-white left-0'>
  
            {/* select 박스 */}
            <div className='w-full py-2 bg-white flex' id="top">
              <div className={`${activeLike ? 'border-b' : 'border-b-none'} w-0 grow border-r text-center mb-2 pb-2 relative bg-white cursor-pointer`} onClick={open} >
                <div onClick={() => setActiveLike(false)}>{gugunNm + ' ▼'}</div>
                <ul id='list' className='w-full hidden h-64 overflow-auto absolute bg-white border top-8 z-10'>
                  {gugunNms.map((item, index) => 
                    <li key={index} onClick={() => setGugunNm(item)} className='p-2 hover:bg-gray-200 border-b'>
                      {item}
                    </li>
                  )}
                </ul>
              </div>
              {/* 하트 누른 식당 보기 버튼 */}
              <div onClick={showMapLike} className={`${activeLike ? 'border-b-none' : 'border-b'} w-0 grow text-center mb-2 bg-white cursor-pointer`}>
                <i className='xi-heart'></i>
              </div>
            </div>
            {/* 식당리스트 */}
            <ul className='bottom-0 bg-white left-0 overflow-auto relative'>
              {(!activeLike ?
                (gugunNm != all ? resList : fullList) : state).map(item =>
                  <li key={item.id} className='pl-2 py-2 border-b w-full' id={item.id}>
                    <p onClick={() => showMap(item.lat, item.lng, item.name, item.id)} className='font-semibold cursor-pointer'>{item.name}</p>
                    <p className='text-sm pt-2'>주소: {item.address}</p>
                    <p className='text-sm'>메뉴: {item.menu}</p>
                    
                    <div className='w-full text-right'>
                      <button onClick={() => showDetails(item.id)}><i className='xi-search'></i></button>
                      <button className='px-2' onClick={() => likeToggle(item)}>
                        {
                          state.filter(i => i.id === item.id).length > 0 ?
                          <i className='xi-heart'></i> : <i className='xi-heart-o'></i>
                        }  
                      </button>
                    </div>
                  </li>
              )}
              <div id="tbtn" className='fixed bottom-2 left-1/3 lg:left-1/4 bg-black text-white z-50 p-1'>
                <a href="#top" className='text-sm'>Top▲</a>
              </div>
            </ul>
  
          </div>
          {/* 지도 */}
          <div className='w-full sm:2/3 h-full'>
            <KakaoMap position={position} center={center} level={9}/>
          </div>
          {active && (
              <div className='fixed top-0 w-full h-full bg-black/50 z-10'>
                <Reco active={active} setActive={setActive} fullList={fullList} />
              </div>
          )}
        </div>
      </div>
    )
  }