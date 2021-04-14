'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async register(){
    let temp = this.ctx.request.body
    let username = temp.username
    const sql = "SELECT * FROM user WHERE username='"+username+"'"
    const result1 = await this.app.mysql.query(sql)
    if(result1.length>0){
      this.ctx.body={
        isSuccess:false
      }
    }else{
      const result2 = await this.app.mysql.insert('user',temp)
      const insertSuccess = result2.affectedRows === 1
      this.ctx.body={
        isSuccess:insertSuccess
      }
    }
  }

  async check(){
    let username = this.ctx.request.body.username
    let password = this.ctx.request.body.password
    const sql = "SELECT * FROM user WHERE username='"+username+"' AND password ='"+password+"'"
    const result = await this.app.mysql.query(sql)
    const id = result[0].id
    if(result.length>0){
      this.ctx.body={data:'登录成功',uid:id}
    }else{
      this.ctx.body={data:'登录失败'}
    }
  }

  async getcustomer(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM customer WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getsupplier(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM supplier WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getgoods(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM goods WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getstaff(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM staff WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getwarehouse(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM warehouse WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getgoodsclass(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM goodsclass WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getgoodsspecs(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM goodsspecs WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getgoodsunit(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM goodsunit WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getpaylist(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM pay WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getstock(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM stock WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getaddpurchase(){
    let uid = this.ctx.params.uid
    let sql='SELECT * FROM addpurchase WHERE uid='+uid
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getaddpurchases(){
    let uid = this.ctx.params.uid
    let id = this.ctx.params.id
    let sql='SELECT * FROM addpurchase WHERE id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getaddpurchasesgoods(){
    let uid = this.ctx.params.uid
    let id = this.ctx.params.id
    let sql='SELECT * FROM addpurchasegoods WHERE fid='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async addcustomer(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.insert('customer',temp)
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updatecustomer(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('customer',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }

  async delcustomer(){
    let uid = this.ctx.params.uid
    let id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('customer',{'id':id})
    this.ctx.body={data:result}
  }

  async addsupplier(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.insert('supplier',temp)
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updatesupplier(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('supplier',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }

  async delsupplier(){
    let uid = this.ctx.params.uid
    let id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('supplier',{'id':id})
    this.ctx.body={
      data:result
    }
  }

  async addgoods(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.insert('goods',temp)
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updategoods(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('goods',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }

  async delgoods(){
    let uid = this.ctx.params.uid
    let id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('goods',{'id':id})
    this.ctx.body={
      data:result
    }
  }

  async addgoodsclass(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.insert('goodsclass',temp)
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updategoodsclass(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('goodsclass',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }

  async delgoodsclass(){
    let uid = this.ctx.params.uid
    let id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('goodsclass',{'id':id})
    this.ctx.body={
      data:result
    }
  }

  async addgoodsspecs(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.insert('goodsspecs',temp)
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updategoodsspecs(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('goodsspecs',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }

  async delgoodsspecs(){
    let uid = this.ctx.params.uid
    let id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('goodsspecs',{'id':id})
    this.ctx.body={
      data:result
    }
  }

  async addgoodsunit(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.insert('goodsunit',temp)
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updategoodsunit(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('goodsunit',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }

  async delgoodsunit(){
    let uid = this.ctx.params.uid
    let id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('goodsunit',{'id':id})
    this.ctx.body={
      data:result
    }
  }

  async addstaff(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.insert('staff',temp)
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updatestaff(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('staff',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }

  async delstaff(){
    let uid = this.ctx.params.uid
    let id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('staff',{'id':id})
    this.ctx.body={
      data:result
    }
  }

  async addwarehouse(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.insert('warehouse',temp)
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updatewarehouse(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('warehouse',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }

  async delwarehouse(){
    let uid = this.ctx.params.uid
    let id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('warehouse',{'id':id})
    this.ctx.body={
      data:result
    }
  }

  async addpurchase(){
    let temp = this.ctx.request.body
    let temp1 = temp[0]
    const result = await this.app.mysql.insert('addpurchase',temp1)
    const insertId = result.insertId
    for(let i=1;i<temp.length;i++){
      let temp2 = temp[i]
      temp2.fid =insertId
      await this.app.mysql.insert('addpurchasegoods',temp2)
    }
    const insertSuccess = result.affectedRows === 1

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async addupdatestock(){
    let uid = this.ctx.params.uid
    let temp = this.ctx.request.body
    let count = temp[0].counts
    for(let i=1;i<=count;i++){
      let temp1=temp[i]
      await this.app.mysql.update('stock',temp1)
    }
    for(let i=count+1;i<temp.length;i++){
      let temp2=temp[i]
      await this.app.mysql.insert('stock',temp2)
    }
    const insertSuccess = true

    this.ctx.body={
      isSuccess:insertSuccess
    }
  }

  async updatepaylist(){
    let temp = this.ctx.request.body
    const result = await this.app.mysql.update('pay',temp)
    const updateSuccess = result.affectedRows === 1
    
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }
}

module.exports = HomeController;
