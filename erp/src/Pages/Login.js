import React , {useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon, Button, Spin, message } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';
import axios from 'axios'

function Login(props){
    const [username , setusername] = useState('')
    const [password , setpassword] = useState('')
    const [inusername , setinusername] = useState('')
    const [inpassword , setinpassword] = useState('')

    const toregister =()=>{
        if(!inusername||inusername.length>10){
            message.error('用户名不能为空，长度不能超过10')
            return false
        }else if(!inpassword){
            message.error('密码不能为空，长度不能超过10')
            return false
        }
        let dataProps = {
            username:inusername,
            password:inpassword
        }
        axios({
            method:'post',
            url:'http://127.0.0.1:7001/register',
            data:dataProps
        }).then(
            res=>{
                if(res.data.isSuccess){
                    message.success('注册成功')
                }else{
                    message.error('用户名已被注册')
                }
            }
        )
    }

    const checkLogin = ()=>{
        if(!username||username.length>10){
            message.error('用户名不为空，长度不超过10')
            return false
        }else if(!password){
            message.error('密码不为空，长度不超过10')
            return false
        }
        let dataProps = {
            username:username,
            password:password
        }
        axios({
            method:'post',
            url:'http://127.0.0.1:7001/check',
            data:dataProps
        }).then(
            res=>{
                if(res.data.data=='登录成功'){
                    let uid = res.data.uid.toString()
                    sessionStorage.setItem('uid', uid)
                    props.history.push('/index')
                }else{
                    message.error('用户名密码错误')
                }
           }
        )
    }

    const changeusername =(e)=>{
        console.log(e.target.value)
        setusername(e.target.value)
        setinusername(e.target.value)
    }

    const changepassword =(e)=>{
        setpassword(e.target.value)
        setinpassword(e.target.value)
    }

    return (
        <div style={{margin:'150px',display:'flex',justifyContent:'center'}}>
            <Card title="进销存管理系统" bordered={true} style={{ width: 400}} >
                <Input
                    id="username"
                    size="large"
                    placeholder="输入用户名"
                    prefix={<UserOutlined type="user" style={{color:'rgba(0,0,0,.25)'}}/>}
                    onChange={changeusername}
                /> 
                <br/><br/>
                <Input.Password
                    id="password"
                    size="large"
                    placeholder="输入密码"
                    prefix={<UserOutlined type="user" style={{color:'rgba(0,0,0,.25)'}}/>}
                    onChange={changepassword}
                />     
                <br/><br/>
                <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
                <Button type="primary" size="large" block onClick={toregister} style={{marginTop:'20px'}}>注册</Button>
            </Card>
        </div>
    )
}

export default Login