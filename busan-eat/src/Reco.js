import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Reco({setActive, fullList}) {

    const navigate = useNavigate();
    const [count, setCount] = useState(0);
  
    // 랜덤 index를 뽑아 식당 선정
    function close(e) {
      if(e.target === e.currentTarget) {
        setActive(false)
      }
    }

    function showDetails() {
      navigate(`/post/${randomContent.id}`)
      setActive(false)
    }
  
    let randomIndex = Math.ceil(Math.random() * fullList.length);
    let randomContent = fullList[randomIndex];
  
    return(
      <div className='bg-white w-96 relative top-40 mx-auto p-4 rounded-lg'>
        <p onClick={close} className='float-right font-semibold text-xl cursor-pointer'>&times;</p>
        <h1 className='font-semibold text-center my-4'>! 맛집 랜덤 추천 !</h1>
        
        {/* 간단한 식당 정보 */}
        <div className='flex gap-4'>
          <img src={randomContent.image} className="w-1/2 object-cover pt[100%]"/>
          <div className='w-1/2'>
            <dl>
              <dt className='text-white bg-black text-center font-semibold px-1'>상호명 </dt>
              <dd className=''>{randomContent.name}</dd>
            </dl>
            <dl>
              <dt className='text-white bg-black text-center font-semibold px-1'>주소 </dt>
              <dd className=''>{randomContent.address}</dd>
            </dl>
            <dl>
              <dt className='text-white bg-black text-center font-semibold px-1'>대표메뉴</dt>
              <dd className=''>{randomContent.menu}</dd>
            </dl>
          </div>
        </div>
  
        {/* 버튼 */}
        <div className='flex justify-between gap-2'>
          <button
            type="button"
            onClick={showDetails} 
            className='mt-4 grow font-semibold bg-blue-500 p-2 rounded-lg'
          >
            상세페이지 바로가기▶
          </button>
          <button
            type="button"
            className='grow mt-4 font-semibold bg-blue-500 p-2 rounded-lg'
            onClick={() => setCount(count + 1)}
          >
            다시 추천
          </button>
        </div>
        
      </div>
    );
  }