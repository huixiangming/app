import React,{ useEffect, useState } from 'react'
import {Row, Col, Table, Space, Modal, Button, Input, message } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'

const { confirm } = Modal;

const Staff = ()=>{

  const [uid] =useState(sessionStorage.getItem('uid'))
  const[list,setList] = useState([])
  const[id,setid] = useState(0)
  const[name,setname] = useState('')
  const[post,setpost] = useState('')
  const[phone,setphone] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '岗位名称',
      dataIndex: 'post',
      key: 'post',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: 'cz'
    }
  ];

  useEffect(() => {
    getList()
  })

  const getList=()=>{
    axios({
      method: 'get',
      url: 'http://127.0.0.1:7001/getstaff/'+uid,
    }).then(
      res=>{
        setList(res.data.data)
      }
    )
  }

  list.map((item,index)=>{
    return(
      item.cz=<div>
        <Button onClick={()=>showModal(item)}>修改</Button>
        <Button type="primary" onClick={()=>del(item)}>删除</Button>
      </div>
    )
  })

  const showModals =()=>{
    setid(0)
    setname('')
    setpost('')
    setphone('')
    setIsModalVisible(true)
  }

  const showModal =(e)=>{
    setid(e.id)
    setname(e.name)
    setpost(e.post)
    setphone(e.phone)
    setIsModalVisible(true)
  }

  const handleOk =()=>{
    if(!name){
      message.error('未输入姓名')
      return false
    }else if(!post){
      message.error('未输入岗位名称')
      return false
    }else if(!phone){
      message.error('未输入联系电话')
      return false
    }

    let dataProps ={
      name:name,
      post:post,
      phone:phone
    }

    if(id==0){
      axios({
        data:dataProps,
        method:'post',
        url:'http://127.0.0.1:7001/addstaff'
      }).then(
        res=>{
          if(res.data.isSuccess){
            message.success('添加成功')
            setIsModalVisible(false);
            getList()
          }else{
            message.error('添加失败')
            setIsModalVisible(false);
          }
        }
      )
    }else{
      dataProps.id = id
      axios({
        method:'post',
        url:'http://127.0.0.1:7001/updatestaff',
        data:dataProps
      }).then(
        res=>{
        if(res.data.isSuccess){
            message.success('修改成功')
            setIsModalVisible(false);
            getList()
        }else{
            message.error('修改失败');
            setIsModalVisible(false);
        }
        }
      )
    }
    setIsModalVisible(false)
  }

  const del = (e)=>{
    confirm({
      title: '确定删除吗?',
      onOk() {
        axios({
          method:'post',
          url:'http://127.0.0.1:7001/delstaff',
          data:{id:e.id}
        }).then(
          res=>{ 
            message.success('删除成功')
            setIsModalVisible(false);
            getList()
          }
        )
      },
      onCancel() {
        setIsModalVisible(false);
      },
    });
  }

  const handleCancel =()=>{
    setIsModalVisible(false)
  }
  return(
    <>
          <Table
            columns={columns}
            pagination={{ position: ['bottomCenter'], defaultPageSize:5, showQuickJumper:true }}
            dataSource={list}
          />
          <Button type="primary" size="large" onClick={showModals}>添加员工</Button>
          <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            姓名：
            <Input
              size='large'
              value={name}
              onChange={e=>{setname(e.target.value)}}
            />
            岗位名称：
            <Input
              size='large'
              value={post}
              onChange={e=>{setpost(e.target.value)}}
            />
            联系电话：
            <Input
              size='large'
              value={phone}
              onChange={e=>{setphone(e.target.value)}}
            />
          </Modal>
    </>
  )
}

export default Staff