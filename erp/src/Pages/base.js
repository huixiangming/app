import React, { useState } from 'react'
import {Row, Col,Layout, Menu} from 'antd';
import { Router, Route } from "react-router-dom";
import {
  TrademarkOutlined,
  ShopOutlined,
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  FunnelPlotOutlined,
  PayCircleOutlined,
  ProfileOutlined,
  PieChartOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Sider} = Layout;

const Icon = [{icon:<ShopOutlined />,text:'客户资料',keys:1},
              {icon:<TrademarkOutlined />,text:'供应商资料',keys:2},
              {icon:<ShoppingCartOutlined />,text:'商品资料',keys:3},
              {icon:<UserOutlined />,text:'员工信息',keys:4},
              {icon:<HomeOutlined />,text:'仓库资料',keys:5},
              {icon:<FunnelPlotOutlined />,text:'货品分类方法',keys:6},
              {icon:<PayCircleOutlined />,text:'账户信息',keys:7},
              {icon:<ProfileOutlined />,text:'公司信息',keys:8},
            ]
            
const Index = (props)=>{
    
    function routes (e){
        if(e.keys==1){
        console.log(e.keys)
          props.history.push({
            pathname:'/index/customer'
        })
        }
        if(e.keys==2){
        console.log(e.keys)
          props.history.push({
            pathname:'/index/supplier'
        })
        }
        if(e.keys==3){
        console.log(e.keys)
          props.history.push({
            pathname:'/index/goods'
        })
        }
        if(e.keys==4){
        console.log(e.keys)
          props.history.push({
            pathname:'/index/staff'
        })
        }
        if(e.keys==5){
        console.log(e.keys)
          props.history.push({
            pathname:'/index/warehouse'
        })
        }
        if(e.keys==6){
        console.log(e.keys)
          props.history.push({
            pathname:'/index/classification'
        })
        }
        if(e.keys==7){
        console.log(e.keys)
          props.history.push({
            pathname:'/index/account'
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
                        <Row className='Index-Icon'>
                        {item.icon}
                        </Row>
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

export default Index