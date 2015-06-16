var database = function () {
	var records,
		lastId,
		self;

	function findRecordById(id) {
		var i,
			record;
		if (!records) {
			return null;
		}
		for (i = 0; i < records.length; i += 1) {
			record = records[i];
			if (record.id === id) {
				return record;
			}
		}
		return null;
	}

	function saveRecord(record) {
		if (!lastId) {
			lastId = 0;
		}
		if (!records) {
			records = [];
		}
		record.id = ++lastId;
		records.push(record);
		return self;
	}

	function getAllRecords() {
		var clonedRecords,
			i;
		clonedRecords = [];
		clonedRecords[records.length - 1] = undefined;
		for (i = 0; i < records.length; i += 1) {
			clonedRecords[i] = records[i];
		}
		return clonedRecords;
	}

	self = {
		save: saveRecord,
		findById: findRecordById,
		getAll: getAllRecords
	};

	return self;
}();


database.save({
	name: 'Peter',
	age: 13
}).save({
	name: 'Gosho',
	age: 17
}).save(database);

console.log(database.getAll());
console.log(database.findById(3));