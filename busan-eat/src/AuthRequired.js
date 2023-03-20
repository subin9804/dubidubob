import { Navigate } from "react-router-dom";

export default function AuthRequired(props) {
 
  const user = localStorage.getItem('user')
  if(!user) {
    return <Navigate to="/login" replace={true} />
  }

  return props.children;
}