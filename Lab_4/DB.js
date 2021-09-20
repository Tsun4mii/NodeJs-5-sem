const util = require('util');
const events = require('events');

let dbData = [
    {
        id: 1,
        name: 'Yuri Shust',
        bday: '2002-05-17'
    },
    {
        id: 2,
        name: 'Yaroslav Guz',
        bday: '2001-03-05'
    },
    {
        id: 3,
        name: 'Alexis Shaboonya',
        bday: '2001-01-20'
    }
];

function DB() {
	this.getIndex = () => { return dbData.length; };
    this.select = () => { return dbData; };
    this.insert = row => { dbData.push(row); };
    this.update = row => {
        let indexOfObj = dbData.findIndex(item => item.id == row.id);
        return dbData.splice(indexOfObj, 1, row);
      }

    this.delete = id => {
		console.log(id);
	    let delIndex = dbData.findIndex(element => element.id === id);
		console.log(delIndex);
	    if(delIndex !== -1) {
	        return dbData.splice(delIndex, 1);
	    }
	    else {
	    	return JSON.parse('{"error": "no index"}');
		}
    };
}

util.inherits(DB, events.EventEmitter);
exports.DB = DB;