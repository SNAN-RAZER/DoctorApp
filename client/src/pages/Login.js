import React from 'react'
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {  useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsReducer';
const Login = () => {

  const dispatch = useDispatch();
  
  const navigate=useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading);
      const response = await axios.post('http://localhost:5000/api/users/login', values);
      dispatch(hideLoading);
      if(response.data.success)
      {
        localStorage.setItem('token',response.data.data);
        toast.success(response.data.message);
        toast("redirecting to Home  page");
        navigate('/');
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-2 ">
        <h1 className="card-title">Nice To Meet U</h1>
        <Form  name="basic"
     
    
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      
      layout="vertical"
      >
         

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
            Login
          </Button>

          <Link to="/register" className="anchor">
            Click here to Register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login