import React, { useState } from 'react'
import {Row, Col,Layout, Menu} from 'antd';
import 'antd/dist/antd.css'
import '../static/index.css'
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
import Base from './base';
import Purchase from './purchase';
import Warehouse from './warehouse';
import Customer from './customer'
import Supplier from './supplier';
import Goods from './goods';
import Staff from './staff';
import Stock from './stock';
import Classification from './classification';
import Account from './account';
import AddPurchase from './addpurchase';
import Purchaselist from './purchaselist';
import Purchasedetail from './purchasedetail'

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

    const [defaultSelectedKeys,setdefaultSelectedKeys] =useState("1")
    function route(e){
        if(e.key=='1'){
          props.history.push({
            pathname:'/index/base'
          })
        }
        if(e.key=='2'){
          props.history.push({
            pathname:'/index/purchase'
          })
        }
        if(e.key=='3'){
          props.history.push({
            pathname:'/sale'
          })
        }
        if(e.key=='4'){
          props.history.push({
            pathname:'/index/stock'
          })
        }
      }
    
    return(
        <>
        <Row className='Header-Row'> 
                <Col push={4} className='Header-Col1'>
                    向明软件
                </Col>
                <Col push={12} className='Header-Col1'>
                    进销存管理
                </Col>
                <Col span={24} className='Header-Col2'>
                    进销存管理
                </Col>
            </Row>
        <Row className='Center-Row'>
            <Sider theme="light" width='10vw' className='Sider'>
                <Menu defaultSelectedKeys={[defaultSelectedKeys]} mode="inline" onClick={route}>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    基础资料
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    采购管理
                </Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined />}>
                    销售管理
                </Menu.Item>
                <Menu.Item key="4" icon={<HomeOutlined />}>
                    库存管理
                </Menu.Item>
                </Menu>
            </Sider>
            <Col className='Center-Col'>
                <div>
                  <Route path="/index/base/" component={Base} />
                  <Route path="/index/purchase/" component={Purchase} />
                  <Route path="/index/warehouse/" component={Warehouse} />
                  <Route path="/index/customer/" component={Customer} />
                  <Route path="/index/supplier/" component={Supplier} />
                  <Route path="/index/goods/" component={Goods} />
                  <Route path="/index/staff/" component={Staff} />
                  <Route path="/index/stock/" component={Stock} />
                  <Route path="/index/classification/" component={Classification} />
                  <Route path="/index/account/" component={Account} />
                  <Route path="/index/addpurchase/" component={AddPurchase} />
                  <Route path="/index/purchaselist/" component={Purchaselist} />
                  <Route path="/index/purchasedetail/:id" component={Purchasedetail} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col span={24} className='Foot'>
                return_to_ming
            </Col>
        </Row>
        </>
    )
    }

export default Index