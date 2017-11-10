
// $(".carousel").carousel({
// 	interval: 2000
// });

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyAUj7AnEW2bBR3Qn7KOOKB-2ilJiMEBnms",
    authDomain: "ajd-project-4.firebaseapp.com",
    databaseURL: "https://ajd-project-4.firebaseio.com",
    projectId: "ajd-project-4",
    storageBucket: "ajd-project-4.appspot.com",
    messagingSenderId: "102488952403"
  };

firebase.initializeApp(config);

var database = firebase.database();

    var name;
	var destination;
	var freq;
	var time; 
	var remain;
	var currentTime;
	var diff;
	var timeConverted;
	var timeLeft;
	var nextTrain;

	function timeDiff(time) {
		
		timeConverted = moment(time, "hh:mm").subtract(1, "years");
		
		currentTime = moment();
		
		currentTime = moment(currentTime).format("hh:mm");

		diff = moment().diff(moment(timeConverted), "minutes");

		remain = diff % freq;

		timeLeft = freq - remain;

		return timeLeft;

	}
	
	$("#submit-btn").click(function (event) {
		event.preventDefault();

		name = $('#name').val();
		destination = $('#destination').val();
		freq = $('#freq').val();
		time = $('#time').val();
		nextTrain = (timeDiff(time));
		
		pushData(name, destination, freq, time);
	});

	function pushData (name, destination, freq, time){

		database.ref().push({
			name: name,
			destination: destination,
			freq: freq,
			time: time,	
				
		});

	}

	database.ref().on("child_added", function (snapshot) {

		var newRow = $('<tr>');

		newRow.append('<td>' + snapshot.val().name + '</td>');
		newRow.append('<td>' + snapshot.val().destination + '</td>');
		newRow.append('<td>' + snapshot.val().freq + '</td>');
		newRow.append('<td>' + snapshot.val().time + '</td>');
		newRow.append('<td>' + nextTrain + '</td>')
		
		$('#insert-data').append(newRow);
	}); 













