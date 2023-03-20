import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const {kakao} = window;

export default function KakaoMap({position, center, level}) {

    // console.log(position)
    // console.log(center)
    const navigate = useNavigate();
  
    useEffect(() => {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(center.lat, center.lng),  // 지도의 중심좌표
        level: level
      }
      
      const map = new kakao.maps.Map(container, options)
  
  
      // 마커 이미지 주소
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  
      let markers = []
      for (let i = 0; i < position.length; i++) {
  
        // 마커 이미지의 이미지 크기
        const imageSize = new kakao.maps.Size(24, 35); 
  
        // 마커를 생성
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  
        // 마커가 지도 위에 표시되도록 설정
        let marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: position[i].latlng, // 마커를 표시할 위치
          title : position[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage, // 마커 이미지 
        });
  
        markers.push(marker);
      }
  
      // console.log(markers)
  
      // 상세페이지에서 해당식당 인포창 띄우기
      if(position.length === 1) {
        
        // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        let iwContent = `<div style="padding:5px; text-align:center;">${center.name}<br><a href="https://map.kakao.com/link/map/${center.name},${center.lat},${center.lng}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${center.name},${center.lat},${center.lng} style="color:blue" target="_blank">길찾기</a></div>`,
        //인포윈도우 표시 위치
        iwPosition = new kakao.maps.LatLng(center.lat, center.lng);
        
        // 인포윈도우를 생성
        let infowindow = new kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent
        });
  
        // 마커 위에 인포윈도우를 표시. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, markers[0]); 
      } 
  
      // 전체지도에서 클릭시 인포창 띄우기
      if(position.length > 1) {
        
        for (let i=0; i<markers.length; i++) {
  
          // 디테일 포스트페이지 이동
          let id = null;
          for(let j = 0; j < position.length; j++) {
            if(markers[i].Gb === position[j].name) {
              id = position[i].id;
              break;
            }
          }
  
          let iwContent = `<div style="padding:5px; text-align:center; font-weight:700">${markers[i].Gb}<br><a href="#${id}"><p style="color:blue;font-size:small" target="_self">목록에서 보기</p></a>`,
          iwRemoveable = true;
          
          // 인포윈도우를 생성
          let infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable : iwRemoveable
          });
    
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(markers[i], 'click', function() {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(map, markers[i]);  
          });
        }
      }
      
    }, [position])
    
    return (
      <div id='map' style={{width: '100%', height: '100%'}}></div>
    )
  }