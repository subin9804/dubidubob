import React, {useState, useEffect, useContext, createContext, useReducer} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Outlet, useParams, useNavigate, Navigate} from "react-router-dom";
import Spinner from './Spinner';
import AuthProvider from './AuthProvider';
import AuthRequired from './AuthRequired';
import Layout from './Layout';
import Home from './Home';
import Posts from './Posts';
import Login from './Login';
import './App.css';

const { kakao } = window

function fetchData() {

  const serviceKey = process.env.REACT_APP_SERVICE_KEY;
  const url = `https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${serviceKey}&pageNo=1&numOfRows=150&resultType=json`;
 
  const promise = fetch(url)
    .then(res => {
      if(!res.ok) {
        throw res;
      }
      return res.json();
    })
    return promise;
}

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [active, setActive] = useState(false);
  const [state, setState] = useState([]);


  useEffect(() => {
    setIsLoaded(false);

    fetchData()
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.log(error)
      setError(error)
    })
    .finally(() => {
      setIsLoaded(true);
    }) 
  }, [])

  if(error) {
    return <p>failed to fetch</p>;
  }
  if(!isLoaded) {
    return <Spinner />
  }
  
  //console.log(data)

  // 맛집 객체 리스트
  const list = data.getFoodKr.item;
  
  // 지역이름 리스트
  const gugunNms = [];
  const all = "전체"
  gugunNms.push(all)
  for(let i = 0; i < list.length; i++) {
    if(gugunNms.includes(list[i].GUGUN_NM)) {
      continue;
    }
    gugunNms.push(list[i].GUGUN_NM);
  }

  // 하트 누른 가게를 localStorage에 저장  
  let localData = [];
  function likeToggle (item) {
    console.log([item])

    if(state.length > 0) {
      const exist = state.filter(i => i.id === item.id);
  
      if(exist.length < 1) {    // 존재하지 않으면 추가
        let newState = [...state, item]
        setState(newState);
        localStorage.setItem("like", JSON.stringify(state))

      } else {     // 존재하면 삭제  
        let newState = state.filter(i => i.id != item.id)
        setState(newState);
        localStorage.setItem("like", JSON.stringify(state))
      }

    } else{
      setState([item])
      localStorage.setItem("like", JSON.stringify(item))
    }

    localData = JSON.parse(localStorage.getItem("like"));
    console.log(localData)
    console.log(state);
  };

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AuthRequired><Layout setActive={setActive} setState={setState} /></AuthRequired>}>
              <Route index element={<Home 
                                      data={list} 
                                      gugunNms={gugunNms} 
                                      all={all}
                                      active={active} 
                                      setActive={setActive} 
                                      setState={setState} 
                                      state={state} 
                                      localData={localData}
                                      likeToggle={likeToggle}/>} 
                                    />
              <Route path="/post/:postId" element={<Posts data={list} state={state} likeToggle={likeToggle}/>} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}
export default App;