var img;

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



}


function setup() {
  createCanvas(640, 480);
  img = createCapture(VIDEO);
  img.size(width,height);
  img.hide();
	firebasesetup();

}

function draw() {
image(img,0,0);
 }

 function mousePressed() {
 saveFrames('out', 'png', 1, 1, data => {
	 var test = database.ref('test');

	 test.push(data);
 });
 }
