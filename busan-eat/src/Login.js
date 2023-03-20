import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";


export default function Login() {

    const auth = useContext(AuthContext);
    const user = auth.user;
    const navigate = useNavigate();
  
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const formData = new FormData(e.target);
  
      auth.login(formData.get('user'));
  
      console.log(formData.get('user'))
      navigate("/", {replace:"true"})
    }
  
    return (
      <>
        <form onSubmit={handleSubmit} className='pt-20 text-center'>
          <h1 className='text-2xl font-bold inline-block mb-16 bg-black text-white'>▶ Busan-Eat Login Page ◀</h1>
          
          <div className='max-w-sm my-0 mx-auto text-center'>
            <p className=''>닉네임을 입력해주세요</p> 
            <input type="text" name="user" value={user}  className='border-b-2 border-black'/>
            <button type='submit' className='ml-2 p-1 border-2 rounded-full border-black font-semibold'>Go!</button>
          </div>
        </form>
      </>
    );
  }