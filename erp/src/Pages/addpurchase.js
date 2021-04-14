import React,{ useEffect, useState } from 'react'
import {Row, Col, Button, Select, DatePicker, Input, Modal, Table, Checkbox, message} from 'antd';
import 'antd/dist/antd.css'
import moment from 'moment'
import axios from 'axios';

const { Option } = Select;
// const CheckboxGroup = Checkbox.Group;

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
    },
    {
        title: '仓库',
        dataIndex: 'warehouse',
        key: 'warehouse'
    },
    {
        title: '数量',
        dataIndex: 'addnumber',
        key: 'addnumber'
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price'
    }
];

const AddPurchase = ()=>{

    const [uid] =useState(sessionStorage.getItem('uid'))
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [supplier,setsupplier] = useState('')
    const [supplierlist,setsupplierlist] = useState([])
    const [date,setdate] = useState('')
    const [number] = useState(moment().format("YYYYMMDDHHmmss"))
    const [goodslist,setgoodslist] = useState([])
    const [goodslists,setgoodslists] = useState([])
    const [warehouselist,setwarehouselist] = useState([])
    const [sum,setsum] = useState(0)
    const [suma,setsuma] = useState(0)
    const [sumb,setsumb] = useState(0)
    const [paylist,setpaylist] = useState([])
    const [pay,setpay] = useState('')
    const [payid,setpayid] =useState()
    const [paymoney,setpaymoney] =useState()
    const [disabled,setdisabled] = useState(false)
    const [stocklist,setstocklist] =useState([])

    useEffect(() => {
        getsupplierlist()
        getgoodslist()
        getwarehouselist()
        getpaylist()
        getstock()
    },[])

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

    goodslists.map((item,index)=>{
        item.warehouse =<div>
            <Select size='large' disabled={disabled} onChange={(value)=>{item.warehouses=value}}
            style={{width:'100'}}>
                {
                    warehouselist.map((item,index)=>{
                        return(
                            <Option value={item.name}>{item.name}</Option>
                        )
                    })
                }
            </Select>
        </div>
    })

    goodslists.map((item,index)=>{
        item.addnumber =<div>
            <Input 
                size='large'
                disabled={disabled}
                onChange={e=>{item.addnumbers=e.target.value}}
            />
        </div>
    })

    goodslists.map((item,index)=>{
        item.price =<div>
            <Input 
                size='large'
                disabled={disabled}
                onChange={e=>{item.prices=e.target.value}}
            />
        </div>
    })

    const addsum=()=>{
        let a =[]
        for(let i=0;i<goodslists.length;i++){
            a.push(goodslists[i].prices*goodslists[i].addnumbers)
            if(goodslists[i].prices==undefined||goodslists[i].prices==''
            ||goodslists[i].addnumbers==undefined||goodslists[i].addnumbers==''){
                message.error('未输入价格或单价')
                return false
            }
        }
        let temp =0
        for(let i=0;i<a.length;i++){
            temp+=a[i]
        }
        setdisabled(!disabled)
        setsumb(temp)
        setsum(temp)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };
  
    const handleOk = () => {
        let list = []
        goodslist.map((item,index)=>{
            if(item.checked == true){
                list.push(item)
            }

        })
        setgoodslists(list)
        setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const submit =()=>{
        if(!supplier){
            message.error('未选择供应商')
            return false
        }else if(!date){
            message.error('未选择日期')
            return false
        }else if(!pay){
            message.error('未选择付款账户')
            return false
        }else if(!disabled){
            message.error('未锁定商品')
            return false
        }

        let addlist = []
        let reviselist = []
        let count = 0

        for(let i=0;i<goodslists.length;i++){
            for(let j=0;j<stocklist.length;j++){
                if(goodslists[i].warehouses==stocklist[j].warehouse && goodslists[i].id==stocklist[j].goodsid){
                    stocklist[j].number=parseInt(stocklist[j].number)+parseInt(goodslists[i].addnumbers)
                    reviselist.push(stocklist[j])
                    count+=1
                    break
                }
                if(j==stocklist.length-1){
                    addlist.push(goodslists[i])
                }
            } 
        }
        console.log(goodslists,stocklist,reviselist,addlist)
        let dataPrpos1=[{counts:count}]

        dataPrpos1.push.apply(dataPrpos1,reviselist)

        addlist.map((item,index)=>{
            let data ={
                goodsid:item.id,
                warehouse:item.warehouses,
                family:item.family,
                name:item.name,
                snumber:item.snumber,
                specs:item.specs,
                unit:item.unit,
                number:item.addnumbers
            }
            dataPrpos1.push(data)
        })

        let dataProps=[
            {
                supplier:supplier,
                date:date,
                number:number,
                sum:sum,
                suma:suma,
                sumb:sumb,
                pay:pay
            },
        ]
        goodslists.map((item,index)=>{
            let datas ={
                name:item.name,
                snumber:item.snumber,
                specs:item.specs,
                family:item.family,
                unit:item.unit,
                warehouses:item.warehouses,
                addnumbers:item.addnumbers,
                prices:item.prices
            }
            dataProps.push(datas)
        })

        let dataProps2={
            id:payid,
            money:paymoney,
            uid:uid,
            name:pay
        }

        axios({
            method:'post',
            url:'http://127.0.0.1:7001/updatepaylist',
            data:dataProps2
        }).then(
            res=>{
                if(res.data.isSuccess){
                    message.success('账户修改成功')
                }else{
                    message.error('账户修改成功')
                }
            }
        )

        axios({
            method:'post',
            url:'http://127.0.0.1:7001/addupdatestock',
            data:dataPrpos1
        }).then(
            res=>{
                if(res.data.isSuccess){
                    message.success('添加到仓库成功')
                }else{
                    message.error('添加到仓库失败')
                }
            }
        )

        axios({
            method:'post',
            url:'http://127.0.0.1:7001/addpurchase',
            data:dataProps
        }).then(
            res=>{
                if(res.data.isSuccess){
                    message.success('添加到表单成功')
                }else{
                    message.error('添加到表单失败')
                }
            }
        )
    }

    function handleChange(value) {
        setpay(value.label)
        setpayid(value.key)
        console.log(value.label)
        for(let i=0;i<paylist.length;i++){
            if(paylist[i].id==value.key){
                setpaymoney(paylist[i].money-suma)
                console.log(paymoney)
            }
        }
    }
    return(
        <>

                <Row>
                    <Col span={8}>
                        <Row>
                            <Col span={24} className='Index-Font'>
                                供应商
                            </Col>
                            <Col span={24} className='Foot'>
                                <Select value={supplier} style={{ width:'80%' }} size='large' onChange={setsupplier}>
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
                            <DatePicker value={date} picker={'date'} style={{ width: '80%' }} size='large' onChange={setdate}/>
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
                    <Col>
                        <Button disabled={disabled} onClick={showModal}>添加采购商品</Button>
                        <Modal title="添加商品" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Table
                                columns={columns}
                                pagination={{ position: ['bottomCenter'], defaultPageSize:10, showQuickJumper:false, hideOnSinglePage:true}}
                                dataSource={goodslist}
                            />
                        </Modal>
                    </Col>
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
                                <Input value={suma} onChange={change}/>
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
                            <Select labelInValue style={{width:'60%'}} onChange={handleChange}>
                                {
                                    paylist.map((item,index)=>{
                                        return(
                                            <Option value={item.id}>{item.name}</Option>
                                        )  
                                    })
                                }
                            </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Row>
                            <Col span={24}>
                            <Button size='large' type={disabled?'primary':'default'} onClick={addsum}>{!disabled?'商品锁定':'商品解锁'}</Button>
                            </Col>
                            <Col span={24}>
                            <Button size='large' onClick={submit}>添加此采购单</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </>
    )
}

export default AddPurchase