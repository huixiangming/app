'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/register', controller.home.register);
  router.post('/check', controller.home.check);
  router.get('/getcustomer/:uid', controller.home.getcustomer);
  router.get('/getsupplier/:uid', controller.home.getsupplier);
  router.get('/getgoods/:uid', controller.home.getgoods);
  router.get('/getstaff/:uid', controller.home.getstaff);
  router.get('/getwarehouse/:uid', controller.home.getwarehouse);
  router.get('/getgoodsclass/:uid', controller.home.getgoodsclass);
  router.get('/getgoodsspecs/:uid', controller.home.getgoodsspecs);
  router.get('/getgoodsunit/:uid', controller.home.getgoodsunit);
  router.get('/getpaylist/:uid', controller.home.getpaylist);
  router.get('/getstock/:uid', controller.home.getstock);
  router.get('/getaddpurchase/:uid', controller.home.getaddpurchase);
  router.get('/getaddpurchases/:id', controller.home.getaddpurchases);
  router.get('/getaddpurchasesgoods/:id', controller.home.getaddpurchasesgoods);

  router.post('/addcustomer', controller.home.addcustomer);
  router.post('/updatecustomer', controller.home.updatecustomer);
  router.post('/delcustomer', controller.home.delcustomer);

  router.post('/addsupplier', controller.home.addsupplier);
  router.post('/updatesupplier', controller.home.updatesupplier);
  router.post('/delsupplier', controller.home.delsupplier);

  router.post('/addgoods', controller.home.addgoods);
  router.post('/updategoods', controller.home.updategoods);
  router.post('/delgoods', controller.home.delgoods);

  router.post('/addgoodsclass', controller.home.addgoodsclass);
  router.post('/updategoodsclass', controller.home.updategoodsclass);
  router.post('/delgoodsclass', controller.home.delgoodsclass);

  router.post('/addgoodsspecs', controller.home.addgoodsspecs);
  router.post('/updategoodsspecs', controller.home.updategoodsspecs);
  router.post('/delgoodsspecs', controller.home.delgoodsspecs);

  router.post('/addgoodsunit', controller.home.addgoodsunit);
  router.post('/updategoodsunit', controller.home.updategoodsunit);
  router.post('/delgoodsunit', controller.home.delgoodsunit);

  router.post('/addstaff', controller.home.addstaff);
  router.post('/updatestaff', controller.home.updatestaff);
  router.post('/delstaff', controller.home.delstaff);

  router.post('/addwarehouse', controller.home.addwarehouse);
  router.post('/updatewarehouse', controller.home.updatewarehouse);
  router.post('/delwarehouse', controller.home.delwarehouse);

  router.post('/addpurchase', controller.home.addpurchase);
  router.post('/addupdatestock', controller.home.addupdatestock);

  router.post('/updatepaylist', controller.home.updatepaylist);
};
