import React from "react";
import { useNavigate } from 'react-router-dom';
const Index = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/books");
  }, []);
  return (
    <></>
  );
}
export default Index