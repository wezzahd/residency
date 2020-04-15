
function firebasesetup(){
	var firebaseConfig = {
		apiKey: "AIzaSyAbb8-7skMg99nzAlvUaqR6vfQvD7q_7Vs",
		authDomain: "test-a201f.firebaseapp.com",
		databaseURL: "https://test-a201f.firebaseio.com",
		projectId: "test-a201f",
		storageBucket: "test-a201f.appspot.com",
		messagingSenderId: "120555329679",
		appId: "1:120555329679:web:a8734f69a5da95480df8fa",
		measurementId: "G-QLSEEEE02P"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();

	database = firebase.database();

	var ref = database.ref('test');
	ref.on('child_added', gotData, errData);

}


function setup() {
  createCanvas(640, 480);
	firebasesetup();

}

function gotData(data) {
	//console.log(data.val());
  var test = data.val();
  // // Grab the keys to iterate over the object
var keys = Object.keys(test);
console.log(test,keys);


}

function errData(err) {
	console.log('Error!');
  	console.log(err);
}
