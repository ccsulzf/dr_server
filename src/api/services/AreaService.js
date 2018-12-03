/**
 * Created by wp on 2017-01-05.
 */
export class AreaService{
	constructor(transaction){
		this.transaction = transaction || null;
	}

	async save(area){
		let data = await Area.create(area, {
			transaction: this.transaction,
			raw: true,
			nest: true
		});
		return data;
	}

	async update(levelTree, areaId){
		let data = await Area.update({
			levelTree: levelTree + '.' + areaId
		}, {
			where: {
				id: areaId
			},
			transaction: this.transaction
		});
		return data;
	}

	async findById(areaId){
		let data = await Area.find({
			where: {
				id: areaId
			},
			raw: true,
			nest: true
		});
		return data;
	}

	async getSalesWin(uniqueCode){
		let data = await SalesWin.find({
			attributes: ['id'],
			where:{
				uniqueCode: uniqueCode
			},
			raw: true,
			nest: true
		});
		return data;
	}
}