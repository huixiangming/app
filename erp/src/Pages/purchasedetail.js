import React,{ useEffect, useState } from 'react'
import {Row, Col, Button, Select, DatePicker, Input, Modal, Table, Checkbox, message} from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const columns = [
    {
        title: '选择',
        dataIndex: 'select',
        key: 'select'
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
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit'
    }
];

const column = [
    {
        title: '货品名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '规格',
        dataIndex: 'snumber',
        key: 'snumber'
    },
    {
        title: '货品类别',
        dataIndex: 'family',
        key: 'family'
    },
    {
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit'
    },
    {
        title: '仓库',
        dataIndex: 'warehouses',
        key: 'warehouses'
    },
    {
        title: '数量',
        dataIndex: 'addnumbers',
        key: 'addnumbers'
    },
    {
        title: '单价',
        dataIndex: 'prices',
        key: 'prices'
    }
];

const AddPurchase = (props)=>{

    const [uid] =useState(sessionStorage.getItem('uid'))
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [supplier,setsupplier] = useState('')
    const [supplierlist,setsupplierlist] = useState([])
    const [date,setdate] = useState('')
    const [number,setnumber] = useState('')
    const [goodslist,setgoodslist] = useState([])
    const [goodslists,setgoodslists] = useState([])
    const [warehouselist,setwarehouselist] = useState([])
    const [sum,setsum] = useState(0)
    const [suma,setsuma] = useState(0)
    const [sumb,setsumb] = useState(0)
    const [paylist,setpaylist] = useState([])
    const [pay,setpay] = useState('')
    const [disabled,setdisabled] = useState(false)
    const [stocklist,setstocklist] =useState([])

    useEffect(() => {
        let id =props.match.params.id
        if(id){
            getaddpurchase(id)
            getaddpurchasesgoods(id)
        }
        getsupplierlist()
        getgoodslist()
        getwarehouselist()
        getpaylist()
        getstock()
    },[])

    const getaddpurchase=(id)=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:7001/getaddpurchases/'+id
        }).then(
            res=>{
                let temp =res.data.data[0]
                setsupplier(temp.supplier)
                setdate(temp.date)
                setnumber(temp.number)
                setsum(temp.sum)
                setsuma(temp.suma)
                setsumb(temp.sumb)
                setpay(temp.pay)
            }
        )
    }

    const getaddpurchasesgoods=(id)=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:7001/getaddpurchasesgoods/'+id
        }).then(
            res=>{
                setgoodslists(res.data.data)
                console.log(res.data.data)
            }
        )
    }

    const getsupplierlist =()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:7001/getsupplier/'+uid
        }).then(
            res=>{
                setsupplierlist(res.data.data)
            }
        )
    }

    const getgoodslist =()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:7001/getgoods/'+uid
        }).then(
            res=>{
                setgoodslist(res.data.data)
            }
        )
    }

    const getwarehouselist =()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:7001/getwarehouse/'+uid
        }).then(
            res=>{
                setwarehouselist(res.data.data)
            }
        )
    }

    const getpaylist =()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:7001/getpaylist/'+uid
        }).then(
            res=>{
                setpaylist(res.data.data)
            }
        )
    }

    const getstock =()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:7001/getstock/'+uid
        }).then(
            res=>{
                setstocklist(res.data.data)
            }
        )
    }

    const change=(e)=>{
        setsuma(e.target.value)
        setsumb(sum-e.target.value)
    }

    goodslist.map((item,index)=>{
        item.select =<div>
            <Checkbox onChange={(e)=>{item.checked=e.target.checked}}></Checkbox>
        </div>
    })

    goodslist.map((item,index)=>{
        item.snumberspecs = item.snumber+item.specs
    })

    return(
        <>
                <Row>
                    <Col span={8}>
                        <Row>
                            <Col span={24} className='Index-Font'>
                                供应商
                            </Col>
                            <Col span={24} className='Foot'>
                                <Select disabled value={supplier} style={{ width:'80%' }} size='large' onChange={setsupplier}>
                                    {
                                        supplierlist.map((item,index)=>{
                                            return(
                                                <Option value={item.name}>{item.name}</Option>
                                            )   
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row> 
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={24} className='Index-Font'>
                            单据日期
                            </Col>
                            <Col span={24} className='Foot'>
                            <Input disabled value={date} picker={'date'} style={{ width: '80%' }} size='large' onChange={setdate}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={24} className='Index-Font'>
                            单据编号
                            </Col>
                            <Col span={24} className='Foot'>
                            <Input disabled placeholder={number} size='large' style={{ width: '80%' }}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col span={24}>
                        <Table
                            columns={column}
                            pagination={{ position: ['bottomCenter'], defaultPageSize:10, showQuickJumper:false, hideOnSinglePage:true}}
                            dataSource={goodslists}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                应付金额
                            </Col>
                            <Col>
                                <Input value={sum} disabled/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                实付金额
                            </Col>
                            <Col>
                                <Input disabled value={suma} onChange={change}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                欠款金额
                            </Col>
                            <Col>
                                <Input disabled value={sumb}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                付款账户
                            </Col>
                            <Col span={24}>
                            <Select style={{width:'60%'}} value={pay} onChange={setpay} disabled>
                                {
                                    paylist.map((item,index)=>{
                                        return(
                                            <Option value={item.name}>{item.name}</Option>
                                        )  
                                    })
                                }
                            </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </>
    )
}

export default AddPurchase