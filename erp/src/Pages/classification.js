import React,{ useEffect, useState } from 'react'
import {Row, Col, List, Button, Modal, Input, message, Select} from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'

const { confirm } = Modal;
const { Option } = Select;

const Classification = ()=>{

  const [uid] =useState(sessionStorage.getItem('uid'))
  const [id,setid] = useState('')
  const [famliylist,setfamilylist] = useState([])
  const [specslist,setspecslist] = useState([])
  const [unitlist,setunitlist] = useState([])
  const [type,settype] = useState('')
  const [value,setvalue] = useState('')
  const [title,settitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabled,setdisabled] = useState(false)

  useEffect(()=>{
    getgoodsfamliylist()
    getgoodsspecslist()
    getgoodsunitlist()
  },[])

  const getgoodsfamliylist=()=>{
    axios({
      method: 'get',
      url: 'http://127.0.0.1:7001/getgoodsclass/'+uid,
    }).then(
      res=>{
        setfamilylist(res.data.data)
      }
    )
  }

  const getgoodsspecslist=()=>{
    axios({
      method: 'get',
      url: 'http://127.0.0.1:7001/getgoodsspecs/'+uid,
    }).then(
      res=>{
        setspecslist(res.data.data)
      }
    )
  }

  const getgoodsunitlist=()=>{
    axios({
      method: 'get',
      url: 'http://127.0.0.1:7001/getgoodsunit/'+uid,
    }).then(
      res=>{
        setunitlist(res.data.data)
      }
    )
  }

  const showModals = () => {
    setid(0)
    settitle('增加')
    setdisabled(false)
    setIsModalVisible(true);
  };

  const showModal = (e) => {
    setid(e.id)
    settype(e.type)
    setvalue(e.value)
    settitle('修改')
    setdisabled(true)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if(!type){
      message.error('未选择类型')
      return false
    }else if(!value){
      message.error('未输入内容')
      return false
    }

    if(type=='商品类别'){
      let dataProps ={
        class:value
      }

      if(id == 0){
        axios({
          method:'post',
          url:'http://127.0.0.1:7001/addgoodsclass',
          data:dataProps
        }).then(
          res=>{
            if(res.data.isSuccess){
              message.success('添加成功')
              setIsModalVisible(false);
              getgoodsfamliylist()
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
          url:'http://127.0.0.1:7001/updategoodsclass',
          data:dataProps
        }).then(
          res=>{
          if(res.data.isSuccess){
              message.success('修改成功')
              setIsModalVisible(false);
              getgoodsfamliylist()
          }else{
              message.error('修改失败');
              setIsModalVisible(false);
          }
          }
        )
      }
    }else if(type == '规格'){
      let dataProps ={
        specs:value
      }

      if(id == 0){
        axios({
          method:'post',
          url:'http://127.0.0.1:7001/addgoodsspecs',
          data:dataProps
        }).then(
          res=>{
            if(res.data.isSuccess){
              message.success('添加成功')
              setIsModalVisible(false);
              getgoodsspecslist()
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
          url:'http://127.0.0.1:7001/updategoodsspecs',
          data:dataProps
        }).then(
          res=>{
          if(res.data.isSuccess){
              message.success('修改成功')
              setIsModalVisible(false);
              getgoodsspecslist()
          }else{
              message.error('修改失败');
              setIsModalVisible(false);
          }
          }
        )
      }
    }else if(type == '计量单位'){
      let dataProps ={
        unit:value
      }

      if(id == 0){
        axios({
          method:'post',
          url:'http://127.0.0.1:7001/addgoodsunit',
          data:dataProps
        }).then(
          res=>{
            if(res.data.isSuccess){
              message.success('添加成功')
              setIsModalVisible(false);
              getgoodsunitlist()
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
          url:'http://127.0.0.1:7001/updategoodsunit',
          data:dataProps
        }).then(
          res=>{
          if(res.data.isSuccess){
              message.success('修改成功')
              setIsModalVisible(false);
              getgoodsunitlist()
          }else{
              message.error('修改失败');
              setIsModalVisible(false);
          }
          }
        )
      }
    }
  }

  const del = (e)=>{
    let deltype = 'delgoodsclass'
    if(e.type == '商品类别'){
      deltype = 'delgoodsclass'
    }else if(e.type == '规格'){
      deltype = 'delgoodsspecs'
    }else if(e.type == '计量单位'){
      deltype = 'delgoodsunit'
    }
    confirm({
      title: '确定删除吗?',
      onOk() {
        axios({
          method:'post',
          url:'http://127.0.0.1:7001/'+deltype,
          data:{id:e.id}
        }).then(
          res=>{ 
            message.success('删除成功')
            setIsModalVisible(false);
            if(deltype == 'delgoodsclass'){
              getgoodsfamliylist()
            }else if(deltype == 'delgoodsspecs'){
              getgoodsspecslist()
            }else if(deltype == 'delgoodsunit'){
              getgoodsunitlist()
            }
          }
        )
      },
      onCancel() {
        setIsModalVisible(false);
      },
    });
  }

  const handleCancel = () => {
    setvalue('')
    settype('')
    setIsModalVisible(false);
  };
  return(
    <>
          <Row>
            <Col span={8}>
              <List
                size="large"
                bordered
                header={<div style={{fontFamily:'Lisu', fontSize:'30px'}}>商品类别</div>}
                dataSource={famliylist}
                renderItem={item => 
                  <List.Item style={{fontSize:'20px'}}>
                    <Row style={{width:'100%'}}>
                      <Col span={14}>
                        {item.class}
                      </Col>
                      <Col span={10}>
                        <Button onClick={
                          item.type='商品类别',
                          item.value=item.class,
                          ()=>{showModal(item)}}>
                          修改
                        </Button>
                        <Button type="primary" onClick={
                          item.type='商品类别',
                          ()=>{del(item)}}>
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </List.Item>
                }
                pagination={{defaultPageSize:4}}
              />
            </Col>
            
            <Col span={8}>
              <List
                size="large"
                bordered
                header={<div style={{fontFamily:'Lisu', fontSize:'30px'}}>计量单位</div>}
                dataSource={unitlist}
                renderItem={item => 
                  <List.Item style={{fontSize:'20px'}}>
                    <Row style={{width:'100%'}}>
                      <Col span={14}>
                        {item.unit}
                      </Col>
                      <Col span={10}>
                        <Button onClick={
                          item.type='计量单位',
                          item.value=item.unit,
                          ()=>{showModal(item)}}>
                          修改
                        </Button>
                        <Button type="primary" onClick={
                          item.type='计量单位',
                          ()=>{del(item)}}>
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </List.Item>
                }
                pagination={{defaultPageSize:4}}
              />
            </Col>
            <Col span={8}>
              <List
                size="large"
                bordered
                header={<div style={{fontFamily:'Lisu', fontSize:'30px'}}>规格</div>}
                dataSource={specslist}
                renderItem={item => 
                  <List.Item style={{fontSize:'20px'}}>
                    <Row style={{width:'100%'}}>
                      <Col span={14}>
                        {item.specs}
                      </Col>
                      <Col span={10}>
                        <Button onClick={
                          item.type='规格',
                          item.value=item.specs,
                          ()=>{showModal(item)}}>
                          修改
                        </Button>
                        <Button type="primary" onClick={
                          item.type='规格',
                          ()=>{del(item)}}>
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </List.Item>
                }
                pagination={{defaultPageSize:4}}
              />
            </Col>
          </Row>
          <Button type="primary" size="large" onClick={showModals}>增加</Button>
          <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            选择：
            <Select disabled={disabled} size="large" value={type} onChange={settype} style={{width:'100%'}}>
              <Option value='商品类别'>
                商品类别
              </Option>
              <Option value='计量单位'>
                计量单位
              </Option>
              <Option value='规格'>
                规格
              </Option>
            </Select>
            输入内容：
            <Input size="large" value={value} onChange={e=>setvalue(e.target.value)}/>
          </Modal>
    </>
  )
}


export default Classification