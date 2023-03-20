import { useParams } from "react-router-dom";
import KakaoMap from "./KakaoMap";
const {kakao} = window;

export default function Posts({data, state, likeToggle}) {
    let {postId} = useParams();
    // console.log(data)
  
    // id로 해당 가게정보 검색
    let post = '';
    for (let i = 0; i < data.length; i++) {
      if(data[i].UC_SEQ === parseInt(postId)) {
        post = data[i];
      }
    }
    console.log(postId)
  
    let name = post.MAIN_TITLE;
    let address = post.ADDR1;
    let image = post.MAIN_IMG_NORMAL;
    let thumb = post.MAIN_IMG_THUMB;
    let explanation = post.ITEMCNTNTS;
    let menu = post.RPRSNTV_MENU;
    let tel = post.CNTCT_TEL;
    let runtime = post.USAGE_DAY_WEEK_AND_TIME;
    let homepage = post.HOMEPAGE_URL;
    let lat = post.LAT;
    let lng = post.LNG;
  
    let like = {
      id: post.UC_SEQ,
      place: post.GUGUN_NM,
      name: name,
      address: address,
      image: thumb,
      menu: menu,
      lat: lat,
      lng: lng
    }
  
    // 맵에 마커가 표시될 위치
    let position  = [
      {
        name: name,
        latlng: new kakao.maps.LatLng(lat, lng)
      }
    ]
  
    // 지도의 중심좌표
    let center = {lat: lat, lng: lng, name: name}
  
    return (
      <div>
        {/* 메인이미지 */}
        <div className='w-full h-72 relative' >
          <h1 className='w-full text-center bottom-8 font-bold text-2xl absolute text-white z-10'>| {name} |</h1>
          <div className='w-full h-full bg-gradient-to-b from-transparent to-black absolute'></div>
          <img src={image} className='w-full h-72 object-cover' />
        </div>
  
        <div className=' border mx-auto max-w-4xl p-8'>
          <div className='flex justify-between gap-8'>
            {/* 썸네일이미지 */}
            <div className='relative'>
              <img src={thumb} className='w-full h-80 object-cover' />
              <div onClick={() => likeToggle(like)} className='absolute top-0 left-0 text-4xl bg-black text-white p-2'>
                {
                  state.filter(i => i.id === like.id).length > 0 ?
                  <i className='xi-heart'></i> : <i className='xi-heart-o'></i>
                } 
              </div>
            </div>
            {/* 식당 상세정보 */}
            <div className='w-1/2 flex flex-col gap-2'>
              <dl>
                <dt className='text-white bg-black inline-block font-semibold px-1'>상호명 </dt>
                <dd className='pl-8'>{name}</dd>
              </dl>
              <dl>
                <dt className='text-white bg-black inline-block font-semibold px-1'>주소 </dt>
                <dd className='pl-8'>{address}</dd>
              </dl>
              <dl>
                <dt className='text-white bg-black inline-block font-semibold px-1'>소개</dt>
                <dd className='pl-8'>{explanation}</dd>
              </dl>
              <dl>
                <dt className='text-white bg-black inline-block font-semibold px-1'>대표메뉴</dt>
                <dd className='pl-8'>{menu}</dd>
              </dl>
              <dl>
                <dt className='text-white bg-black inline-block font-semibold px-1'>문의</dt>
                <dd className='pl-8'>{tel}</dd>
              </dl>
              <dl>
                <dt className='text-white bg-black inline-block font-semibold px-1'>운영시간</dt>
                <dd className='pl-8'>{runtime}</dd>
              </dl>
              {
                !homepage ? <p className='text-gray-500 bg-black font-semibold text-center'>공식 홈페이지 없음</p> : <a href={homepage} className='text-white bg-black text-center font-semibold'>홈페이지 바로가기▶</a>
              }
            </div>
          </div>
          
          {/* 식당 위치 */}
          <div>
            <div id='map' className='w-full max-w-4xl h-80 mx-auto px-8 mt-4'>
              <KakaoMap center={center} position={position} level={3}/>
            </div>
          </div>
          
        </div>
  
      </div>
    );
  }