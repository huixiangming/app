import React,{ useState, useEffect } from 'react'
import {Row, Col, Table, Modal, Button, Input, message, Select } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios';

const { confirm } = Modal;
const { Option } = Select;

const column = [
  {
      title: '仓库名称',
      dataIndex: 'warehouse',
      key: 'warehouse'
  },
  {
      title: '货品名称',
      dataIndex: 'name',
      key: 'name'
  },
  {
      title: '规格',
      dataIndex: 'snumberspecs',
      key: 'snumberspecs'
  },
  {
      title: '货品类别',
      dataIndex: 'family',
      key: 'family'
  },
  {
      title: '数量',
      dataIndex: 'numberunit',
      key: 'numberunit'
  },
  {
      title: '操作',
      dataIndex: 'cz',
      key: 'cz'
  }
];
const Stock = () => {

  const [uid] =useState(sessionStorage.getItem('uid'))
  const [stocklist,setstocklist] = useState([])
  const [warehouse,setwarehouse] =useState('')
  const [warehouselist,setwarehouselist] =useState([])
  const [title,settitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getstocklist()
    getwarehouselist()
  })

  const getstocklist=()=>{
    axios({
      url:'http://127.0.0.1:7001/getstock/'+uid,
      method:'get'
    }).then(
      res=>{
        setstocklist(res.data.data)
      }
    )
  }

  const getwarehouselist=()=>{
    axios({
      url:'http://127.0.0.1:7001/getwarehouse/'+uid,
      method:'get'
    }).then(
      res=>{
        setwarehouselist(res.data.data)
      }
    )
  }

  stocklist.map((item,index)=>{
    item.snumberspecs=item.snumber+item.specs
    item.numberunit=item.number+item.unit
  })

  const showModal = () => {
    settitle('修改')
    setIsModalVisible(true);
  };

  const showModals = () => {
    settitle('新增')
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk= ()=>{
    setIsModalVisible(false);
  }

  const delcustomer = (e)=>{
    confirm({
      title: '确定删除吗?',
      onOk() {
        axios({
          method:'post',
          url:'http://127.0.0.1:7001/delcustomer',
          data:{id:e.id}
        }).then(
          res=>{ 
            message.success('删除成功')
            setIsModalVisible(false);
          }
        )
      },
      onCancel() {
        setIsModalVisible(false);
      },
    });
  }

  stocklist.map((item,index)=>{
    return(
      item.cz = <div>
                  <Button onClick={()=>showModal(item)}>修改</Button>
                  <Button type="primary" onClick={()=>delcustomer(item)}>删除</Button>
                </div>
    )
  })

  return(
    <>
        <Table
        columns={column}
        pagination={{ position: ['bottomCenter'], defaultPageSize:5, showQuickJumper:false}}
        dataSource={stocklist}
        >
        </Table>
        <Button type="primary" size="large" onClick={showModals}>
        新增
        </Button>
        <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        仓库：
        <Col span={24}>
        <Select value={warehouse} size='large' onChange={setwarehouse} style={{width:'100%'}}>
            {
            warehouselist.map((item,index)=>{
                return(
                <Option 
                    value={item.name}
                >{item.name}</Option>
                )
            })
            }
        </Select>
        </Col>
        </Modal>
    </>
  )
}

export default Stock