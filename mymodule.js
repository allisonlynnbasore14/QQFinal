

var fs = require('fs')

module.exports = function(dir, ex, callback){
var total = []
var fill = fs.readdir(dir, callback)
for (i=0;i<dir.length;i++){
	if (dir[i].endsWith('.'+ex)){
		total = total + dir[i]
		console.log(dir[i])

	}
return total
}

}

//var module.exports = fs.readdir(path, callback)