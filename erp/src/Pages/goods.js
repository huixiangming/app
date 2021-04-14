import React,{ useEffect, useState } from 'react'
import {Row, Col, Table, Select, Modal, Button, Input, message} from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'

const { confirm } = Modal;
const { Option } = Select;

const Goods = ()=>{

  const [uid] =useState(sessionStorage.getItem('uid'))
  const [list,setList]=useState([])
  const [id,setid] = useState(0)
  const [name,setname] = useState('')
  const [snumber,setsnumber] = useState('')
  const [specs,setspecs] = useState()
  const [specslist,setspecslist] = useState([])
  const [snumberspecs,setsnumberspecs] = useState('')
  const [family,setfamily] = useState('')
  const [familylist,setfamilylist] = useState([])
  const [number,setnumber] = useState('')
  const [unit,setunit] = useState('')
  const [unitlist,setunitlist] = useState([])
  const [numberunit,setnumberunit] = useState('')
  const [title,settitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: '货品名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '规格',
      dataIndex: 'snumberspecs',
      key: 'snumberspecs',
    },
    {
      title: '商品类别',
      dataIndex: 'family',
      key: 'family'
    },
    {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: 'cz'
    }
  ];

  useEffect(()=>{
    getList()
  },[])

  const getList=()=>{
    axios({
      method: 'get',
      url: 'http://127.0.0.1:7001/getgoods/'+uid,
    }).then(
      res=>{
        setList(res.data.data)
      }
    )
  }

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

  list.map((item,index)=>{
    item.snumberspecs = item.snumber+item.specs
  })

  list.map((item,index)=>{
    return(
      item.cz = <div>
                  <Button onClick={()=>showModal(item)}>修改</Button>
                  <Button type="primary" onClick={()=>del(item)}>删除</Button>
                </div>
    )
  })

  const handleOk = () => {
    if(!name){
      message.error('未输入商品名称')
      return false
    }else if(!snumber){
      message.error('未输入商品规格')
      return false
    }else if(!specs){
      message.error('未选择商品规格单位')
      return false
    }else if(!family){
      message.error('未选择商品类别')
      return false
    }else if(!unit){
      message.error('未选择商品计量单位')
      return false
    }

    let dataProps = {
      name:name,
      snumber:snumber,
      specs:specs,
      family:family,
      unit:unit
    }

    if(id == 0){
      axios({
        method:'post',
        url:'http://127.0.0.1:7001/addgoods',
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
        url:'http://127.0.0.1:7001/updategoods',
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
          url:'http://127.0.0.1:7001/delgoods',
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

  const showModal = (e) => {
    setid(e.id)
    setname(e.name)
    setsnumber(e.snumber)
    setspecs(e.specs)
    setfamily(e.family)
    setunit(e.unit)
    settitle('修改商品')
    getgoodsfamliylist()
    getgoodsspecslist()
    getgoodsunitlist()
    setIsModalVisible(true);
  };

  const showModals = () => {
    setid(0)
    setname('')
    setsnumber('')
    setspecs('')
    setfamily('')
    setunit('')
    settitle('新增商品')
    getgoodsfamliylist()
    getgoodsspecslist()
    getgoodsunitlist()
    setIsModalVisible(true);
  };
  
  return(
    <>
          <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            商品名称：
            <Input 
              size='large'
              value={name}
              onChange={e=>{setname(e.target.value)}}
            />
            商品规格：
            <Row>
              <Col span={12}>
                <Input
                  size='large'
                  value={snumber}
                  onChange={e=>{setsnumber(e.target.value)}}
                />
              </Col>
              <Col span={12}>
                <Select value={specs} size='large' style={{width:'100%'}} onChange={setspecs}>
                  {
                    specslist.map((item,index)=>{
                      return(
                        <Option
                          value={item.specs}
                        >{item.specs}</Option>
                      )
                    })
                  }
                </Select>
              </Col>
            </Row>
            商品类别：
            <Col span={24}>
            <Select value={family} size='large' onChange={setfamily} style={{width:'100%'}}>
              {
                familylist.map((item,index)=>{
                  return(
                    <Option 
                      value={item.class}
                    >{item.class}</Option>
                  )
                })
              }
            </Select>
            </Col>
            库存数量：
            <Row>
              <Col span={24}>
                <Select value={unit} size='large' onChange={setunit} style={{width:'100%'}}>
                  {
                    unitlist.map((item,index)=>{
                      return(
                        <Option 
                          value={item.unit}
                          onChange={e=>{setunit(e.target.value)}}
                        >{item.unit}</Option>
                      )
                    })
                  }
                </Select>
              </Col>
            </Row>
          </Modal>
          <Table
            columns={columns}
            pagination={{ position: ['bottomCenter'], defaultPageSize:5, showQuickJumper:true }}
            dataSource={list}
          />
          <Button type="primary" size="large" onClick={showModals}>
            新增商品
          </Button>
    </>
  )
}

export default Goods