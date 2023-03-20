import { useNavigate, Link, Outlet } from "react-router-dom";

export default function Layout({setActive, setState}) {
    const user = localStorage.getItem('user');
    const navigate = useNavigate();
  
    function handleLogout() {
      localStorage.removeItem('user')
      localStorage.removeItem('like')
      setState("");
      navigate("/login", {replace: true})
    }
  
    return(
      <>
        <header className='fixed flex w-full px-4 py-2 justify-between bg-black text-white z-50'>
          <div id='hleft'>
            <button onClick={handleLogout} className='text-sm p-2 hover:bg-white hover:text-black'>로그아웃</button>
          </div>
          <div id='logo'>
            <Link to="/">
              <h2 className='text-2xl font-bold'>부산맛집지도</h2>
            </Link>
          </div>
          <div id='right' className='flex justify-between gap-2 text-white'>
            <div className='hover:bg-white  hover:text-black'>
              <p className='text-xs'>반갑습니다!</p>
              <p className='text-sm'>{user}님</p>
            </div>
            <button onClick={() => setActive(true)} className='text-sm border-x px-2 hover:bg-white hover:text-black'>맛집추천</button>
            <Link to="/">
              <button className='text-sm p-2 hover:bg-white hover:text-black'>Home</button>
            </Link>
          </div>
        </header>
        <Outlet />
      </>
    );
  }