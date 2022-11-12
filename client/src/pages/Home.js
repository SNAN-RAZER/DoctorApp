import React, { useEffect } from 'react'
import axios from 'axios';
const Home = () => {

    const getData=async ()=>{

        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/get-user-info-by-id",
                {},
                {
                    headers:{
                        Authorization:'Bearer '+localStorage.getItem('token')
                    }
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }

        

    }

    useEffect(()=>{
        getData();
    },[]);

  return (
    <h1>Home</h1>
  )
}

export default Home