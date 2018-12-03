import {expect} from 'chai';

describe('Post Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return Post.create({
	            code: 'amber1',
	            name: 'amber1',
            }).then((data) => {
	            console.log(data);
                expect(data.name).to.equal('amber');
            });
        });
    });

	describe('FindAll', () => {
		it('should create user success', () => {
			return Post.findAll().then((data) => {
				console.log(data);
			});
		});
	});

	describe('Find', () => {
		it('should create user success', () => {
			return Post.find().then((data) => {
				console.log(data.dataValues);
				Post.removeAttribute('creator');

				Post.findOne({raw:true}).then((ss) => {
					console.log('..222::.'+JSON.stringify(ss));
				});
			});
		});
	});
	describe('FindById', () => {
		it('should create Post success', () => {
			return Post.findById(6).then((data) => {
				console.log(data);
			});
		});
	});
	describe('FindOne', () => {
		it('should create Post success', () => {
			return Post.findOne({where: {id:1}}).then((data) => {
				console.log(data);
			});
		});
	});
	describe('Drop', () => {
		it('should create Post success', () => {
			return Post.drop(Post, Post.cascade=false).then((data) => {
				console.log(data);
			});
		});
	});

	describe('GetTableName', () => {
		it('should create Post success', () => {
			return Post.getTableName(Post).then((data) => {
				console.log(data);
			});
		});
	});

	describe('Aggregate', () => {
		it('should create Post success', () => {
			return Post.aggregate('*', 'count').then((data) => {
				console.log(data);
			});
		});
	});

	describe('Count', () => {
		it('should create Post success', () => {
			return Post.count('*').then((data) => {
				console.log(data);
			});
		});
	});

	describe('FindAndCountAll', () => {
		it('should create Post success', () => {
			return Post.findAndCountAll({limit: 1, offset: 0}).then((data) => {
				console.log(data.rows[0].dataValues);
			});
		});
	});

	describe('Max', () => {
		it('should create Post success', () => {
			return Post.max('id').then((data) => {
				console.log(data);
			});
		});
	});

	describe('Min', () => {
		it('should create Post success', () => {
			return Post.min('id').then((data) => {
				console.log(data);
			});
		});
	});

	describe('Sum', () => {
		it('should create Post success', () => {
			return Post.sum('id').then((data) => {
				console.log('sum::'+data);
			});
		});
	});

	describe('Build', () => {
		it('should create Post success', () => {
			let data = Post.build({code: '006', name: '岗位一6'});
			console.log('build::'+data);
			return data;
		});
	});

	describe('FindOrInitialize', () => {
		it('should create Post success', () => {
			return Post.findOrInitialize({where: {id: 2}}).then((data) => {
				console.log('findOrInitialize::'+data);
			});
		});
	});

	describe('FindOrCreate', () => {
		it('should create Post success', () => {
			return Post.findOrCreate({
				where: {code: '001', name: '岗位一'}
			}).then((data) => {
				console.log('findOrInitialize::'+data);
			});
		});
	});

	describe('FindCreateFind', () => {
		it('should create Post success', () => {
			return Post.findCreateFind({
				where: {code: '002', name: '岗位二'}
			}).then((data) => {
				console.log('findCreateFind::'+data);
			});
		});
	});

	describe('Upsert', () => {
		it('should create Post success', () => {
			return Post.upsert({
				code: '002', name: '岗位二'
			}).then((data) => {
				console.log(data);
			});
		});
	});

	describe('BulkCreate', () => {
		it('should create Post success', () => {
			return Post.bulkCreate([{
				code: '003', name: '岗位三'
			},{
				code: '004', name: '岗位四'
			}]).then((data) => {
				console.log(data[0].dataValues);
			});
		});
	});

	describe('Truncate', () => {
		it('should create Post success', () => {
			return Post.truncate().then((data) => {
				console.log(data);
			});
		});
	});

	describe('Destroy', () => {
		it('should create Post success', () => {
			return Post.destroy({where:{id:6}}
			).then((data) => {
				console.log(data);
			});
		});
	});

	describe('Restore', () => {
		it('should create Post success', () => {
			return Post.restore().then((data) => {
				console.log(data);
			});
		});
	});

	describe('Update', () => {
		it('should create Post success', () => {
			return Post.update({code: '005',name:'岗位五'},{where:{id:6}}
			).then((data) => {
				console.log(data);
			});
		});
	});

	describe('Describe', () => {
		it('should create Post success', () => {
			return Post.describe().then((data) => {
				console.log(data);
			});
		});
	});

	
});
