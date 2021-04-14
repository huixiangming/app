import React,{ useEffect, useState } from 'react'
import {Row, Col, Table, Modal, Button, Input, message } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'
const { confirm } = Modal;
const Supplier = ()=>{

  const [uid] =useState(sessionStorage.getItem('uid'))
  const [list,setList]=useState([])
  const [id,setid] = useState(0)
  const [name,setname] = useState('')
  const [address,setaddress] = useState('')
  const [phone,setphone] = useState('')
  const [title,settitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: '供应商名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '供应商地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: 'cz',
    }
  ];

  useEffect(()=>{
    getList()
  },[])

  const getList=()=>{
    axios({
      method: 'get',
      url: 'http://127.0.0.1:7001/getsupplier/'+uid,
    }).then(
      res=>{
        setList(res.data.data)
      }
    )
  }

  list.map((item,index)=>{
    return(
      item.cz = <div>
                <Button onClick={()=>showModal(item)}>修改</Button>
                <Button type="primary" onClick={()=>del(item)}>删除</Button>
              </div>
    )
  }) 

  const showModal = (e) => {
    setid(e.id)
    setname(e.name)
    setaddress(e.address)
    setphone(e.phone)
    settitle('修改供应商资料')
    setIsModalVisible(true);
  };

  const showModals = () => {
    setid(0)
    setname('')
    setaddress('')
    setphone('')
    settitle('新增供应商')
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if(!address){
      message.error('未输入地址')
      return false
    }else if(!phone){
      message.error('未输入联系电话')
      return false
    }

    let dataProps = {
      name:name,
      address:address,
      phone:phone
    }
    
    if(id == 0){
      axios({
        method:'post',
        url:'http://127.0.0.1:7001/addsupplier',
        data:dataProps
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
        url:'http://127.0.0.1:7001/updatesupplier',
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
  };

  const del = (e)=>{
    confirm({
      title: '确定删除吗?',
      onOk() {
        axios({
          method:'post',
          url:'http://127.0.0.1:7001/delsupplier',
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  return(
    <>
     
          <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            供应商名称：
            <Input 
              size='large'
              value={name}
              onChange={e=>{setname(e.target.value)}}
            />
            供应商地址：
            <Input 
              size='large'
              value={address}
              onChange={e=>{setaddress(e.target.value)}}
            />
            联系电话：
            <Input 
              size='large'
              value={phone}
              onChange={e=>{setphone(e.target.value)}}
            />
          </Modal>
          <Table
            columns={columns}
            pagination={{ position: ['bottomCenter'], defaultPageSize:5, showQuickJumper:true }}
            dataSource={list}
          />
          <Button type="primary" size="large" onClick={showModals}>
            新增供应商
          </Button>
   
    </>
  )
}

export default Supplier