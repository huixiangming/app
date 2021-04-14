import React,{ useEffect, useState } from 'react'
import {Row, Col, Button} from 'antd';
import 'antd/dist/antd.css'

const Icon = [{text:'新增采购单',keys:1},
              {text:'采购明细表',keys:2}
            ]
            
const Purchase = (props)=>{

    function routes (e){
        if(e.keys==1){
            props.history.push({
            pathname:'/index/addpurchase/'
            })
        }
        if(e.keys==2){
            props.history.push({
            pathname:'/index/purchaselist/'
            })
        }
    }
  return(
    <>
        <Row>
        {
            Icon.map((item,index)=>{
            return(
                <Col span={6} onClick={()=>routes(item)} className='Index-Map'>
                <Row className='Index-Font'>
                    {item.text}
                </Row>
                </Col>
            )
            })
        }
        </Row>
    </>
  )
}

export default Purchase