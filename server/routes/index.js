module.exports = app => {
	
	const express = require('express');
	
	// 引入表格模块的数据
  const TableDatas = require('../models/TableDatas');
  const WeekPlans = require('../models/WeekPlans');
	
	app.get('/api/table-datas', async (req, res) => {
		const data = await TableDatas.find();
		res.send(data);
	})
	
	app.post('/api/table-datas', async (req, res) => {
		const tableDatas = await TableDatas.create(req.body);
		res.send(tableDatas);
	});
	
	app.put('/api/table-datas/:id', async (req, res) => {
		await TableDatas.findByIdAndUpdate(req.params.id, req.body);
		res.send({
			status: 200,
			message: 'ok'
		});
	});
	
	app.get('/api/table-datas/:id', async (req, res) => {
		const model = await TableDatas.findById(req.params.id);
		res.send(model);
	});
	
	app.delete('/api/table-datas/:id', async (req, res) => {
		await TableDatas.findByIdAndRemove(req.params.id, req.body);
		res.send({
			status: 200,
			message: 'Delete successfully'
		});
  });
  
  app.get('/api/week-plans', async (req, res) => {
    const data = await WeekPlans.find();
    res.send(data);
  })

  app.post('/api/week-plans', async (req, res) => {
		const weekPlans = await WeekPlans.create(req.body);
		res.send(weekPlans);
	});

  app.get('/api/week-plans/:id', async (req, res) => {
    const model = await WeekPlans.findById(req.params.id);
    res.send(model);
  })

  app.put('/api/week-plans/:id', async (req, res) => {
		await WeekPlans.findByIdAndUpdate(req.params.id, req.body);
		res.send({
			status: 200,
			message: 'ok'
		});
	});

  app.delete('/api/week-plans/:id', async (req, res) => {
		await WeekPlans.findByIdAndRemove(req.params.id, req.body);
		res.send({
			status: 200,
			message: 'Delete successfully'
		});
  });

}