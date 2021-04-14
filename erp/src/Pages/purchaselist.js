import React,{ useEffect, useState } from 'react'
import {Row, Col, Button, Select, DatePicker, Input, Modal, Table, Checkbox, message} from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const column = [
    {
        title: '供应商',
        dataIndex: 'supplier',
        key: 'supplier'
    },
    {
        title: '日期',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: '单据编号',
        dataIndex: 'number',
        key: 'number'
    },
    {
        title: '应付金额',
        dataIndex: 'sum',
        key: 'sum'
    },
    {
        title: '实付金额',
        dataIndex: 'suma',
        key: 'suma'
    },
    {
        title:'操作',
        dataIndex: 'cz',
        key: 'cz'
    }
];

const Purchaselist=(props)=>{

    const [uid] =useState(sessionStorage.getItem('uid'))
    const [list,setlist] =useState([])

    useEffect(() => {
        getlist()
    })
    const getlist=()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:7001/getaddpurchase/'+uid
        }).then(
            res=>{
                setlist(res.data.data)
            }
        )
    }

    function routes(e){
        props.history.push({
            pathname:'/index/purchasedetail/'+e.id,
        })
    }

    list.map((item,index)=>{
        item.cz=<Button onClick={()=>routes(item)}>查看</Button>
    })
    return(
        <>
            <Table
                columns={column}
                pagination={{ position: ['bottomCenter'], defaultPageSize:6, showQuickJumper:false, hideOnSinglePage:true}}
                dataSource={list}
            />
        </>
    )
}

export default Purchaselist