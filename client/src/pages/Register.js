import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input } from "antd";
import toast from 'react-hot-toast'; 
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsReducer";

const Register = () => {
const navigate=useNavigate();

const dispatch= useDispatch();

  //  Register function

  const onFinish = async(values) => {
   
    try {
      dispatch(showLoading());
      const response = await axios.post('http://localhost:5000/api/users/register', values);
      dispatch(hideLoading());
      if(response.data.success)
      {
        toast.success(response.data.message);
        toast("redirecting to Login page");
        navigate('/login');
      }
      else
      {
        toast.error(response.data.message);
      }
      
      
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  

  return (
    <div className="authentication">
      <div className="authentication-form card p-2 ">
        <h1 className="card-title">Nice To Meet U</h1>
        <Form  name="basic"
     
    
      onFinish={onFinish}
     
      
      layout="vertical"
      >
          <Form.Item 
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
          
          >
            <Input type="text" placeholder="Name" />
          </Form.Item>

          <Form.Item label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}>
            <Input type="email" placeholder="enail@email.com" />
          </Form.Item>

          <Form.Item label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button className="primary-button my-2" htmlType="submit">
            Register
          </Button>

          <Link to="/login" className="anchor">
            Click here to Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
