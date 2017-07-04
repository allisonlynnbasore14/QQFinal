


// // var Database = module.exports = {

// //     // data: [{name:'Sam'},{name: 'Mike'},{name:'Sally'},{name: 'Minny'}],

// //     data: [{id: 'Sam', score: '80%'},{id: 'Pam', score: '70%'}],

// //     add: function(obj) {
// //         //adds item to end of array holding data
// //         Database.data.push(obj);
// //     },

// //     getAll: function() {
// //         //returns copy of array of all items in the database
// //         return Database.data.slice();
// //     },

// //     remove: function(index) {
// //         //removes item located at index in array and returns it
// //         return Database.data.splice(index,1);
// //     }
// // }

// var friends = TAFFY([
//     {"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active"},
//     {"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active"},
//     {"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active"},
//     {"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active"}   
// ]);
// // Find all the friends in Seattle
// friends({city:"Seattle, WA"});

// // Find John Smith, by ID
// friends({id:1});

// // Find John Smith, by Name
// friends({first:"John",last:"Smith"});


// // Move John Smith to Las Vegas
// friends({first:"John",last:"Smith"}).update({city:"Las Vegas, NV:"});

// // Remove Jennifer Gill as a friend
// friends({id:4}).remove();

// // insert a new friend
// friends.insert({"id":5,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active"});

// // Find all the friends in Seattle
// friends({city:"Seattle, WA"});

// // Find John Smith, by ID
// friends({id:1});

// // Find John Smith, by Name
// friends({first:"Jennifer",last:"Gill"});

