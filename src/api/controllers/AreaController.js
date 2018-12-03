/**
 * Created by wp on 2016-12-13.
 */

import {
	AreaEmployeeService,
	AreaService,
	EmployeeService
} from "../services";
import _ from "lodash";
import * as error from '../../config/errors';

export async function checkArea(ctx, next) {
	let areaId = ctx.query.areaId;
	let modelName = ctx.query.modelName;
	if (!modelName) {
		ctx.throw(error.BaseSettings.NotModelName);
		return;
	}

	try {
		let modelInfo = await db.sequelize.models[modelName].findAll({
			where: {
				areaId: areaId
			},
			raw: true,
			nest: true
		});
		if (modelInfo.length > 0) {
			ctx.body = modelInfo;
		} else {
			ctx.body = [];
		}
	} catch (err) {
		ctx.throw(err);
	}
}



export async function checkChildArea(ctx, next) {
	let parentId = ctx.query.parentId;
	try {
		let areas = await Area.findAll({
			where: {
				parentId: parentId
			},
			raw: true,
			nest: true
		});
		if (areas.length > 0) {
			ctx.body = areas;
		} else {
			ctx.body = [];
		}
	} catch (err) {
		ctx.throw(err);
	}
}

export async function getAreaList(ctx, next) {
	let salesSiteId = ctx.query.salesSiteId;

	if(!salesSiteId){
		ctx.throw(error.BaseSettings.NotSaleSiteId);
		return ;
	}

	let areaId = null;
	try {
		let salesSite = await SalesSite.findAll({
			where: {
				id: salesSiteId
			},
			raw: true,
			nest: true
		});
		if (salesSite.length > 0) {
			areaId = salesSite[0].areaId;
		} else {
			ctx.body = [];
		}

		let areaList = await Area.findAll({
			where: {
				$or: [{
					id: areaId
				}, {
					parentId: areaId
				}]
			},
			raw: true,
			nest: true
		});
		if (areaList.length > 0) {
			ctx.body = areaList;
		} else {
			ctx.body = [];
		}
	} catch (err) {
		ctx.throw(err);
	}
}


export async function saveArea(ctx, next) {
	let areaInfo = ctx.request.body.areaInfo;
	let transaction = await db.sequelize.transaction();
	let areaService = new AreaService(transaction);
	try {
		let levelInfo = await Area.find({
			attribute: ['level', 'levelTree'],
			where: {
				id: areaInfo.parentId
			},
			raw: true,
			nest: true
		});
		if(levelInfo){
			areaInfo.level = levelInfo.level + 1;
			areaInfo.levelTree = levelInfo.levelTree;
			let area = await areaService.save(areaInfo);
			let data = await areaService.update(areaInfo.levelTree, area.id);
			await transaction.commit();
			ctx.body = true;
		}else{
			ctx.body = false;
		}
	} catch (err) {
		await transaction.rollback();
		ctx.throw(err);
	}
}

export async function saveAreaEmployee(ctx, next) {
	let areaId = ctx.request.body.areaId;
	let employee = ctx.request.body.employee;

	if(!areaId){
		ctx.throw(error.BaseSettings.NotAreaId);
		return ;
	}

	let transaction = await db.sequelize.transaction();
	let areaEmployeeService = new AreaEmployeeService(transaction);
	try{
		let deleteData = await areaEmployeeService.delete({areaId: areaId});
		let areaEmployee = await areaEmployeeService.bulkSave(areaId, employee);
		await transaction.commit();
		ctx.body = true;
	}catch (err){
		await transaction.rollback();
		ctx.throw(err);
	}
}

export async function getAreaEmployee(ctx, next) {
	let areaId = ctx.query.areaId;

	if(!areaId){
		ctx.throw(error.BaseSettings.NotAreaId);
		return ;
	}

	try{
		let areaService = new AreaService();
		let employeeService = new EmployeeService();
		let areaEmployeeService = new AreaEmployeeService();
		let area = await areaService.findById(areaId);
		if(area){
			let areaEmployee = await areaEmployeeService.findById(areaId, null);
			if(areaEmployee.length > 0){
				let employeeIds = _.map(areaEmployee, 'employeeId');
				let employee = await employeeService.findById(employeeIds);
				area.Employees = employee;
			}else{
				area.Employees = [];
			}
			ctx.body = area;
		}else{
			ctx.body = {};
		}
	}catch (err){
		ctx.throw(err);
	}
}



