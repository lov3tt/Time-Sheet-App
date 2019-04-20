function Application() {
  let self = this

  let config = {
    apiKey: "AIzaSyDX29jSmkMwtwc0n9-8gOIY-IPXtrAQbkM",
    authDomain: "my-project-94dab.firebaseapp.com",
    databaseURL: "https://my-project-94dab.firebaseio.com",
    projectId: "my-project-94dab",
    storageBucket: "my-project-94dab.appspot.com",
    messagingSenderId: "905981696191"
  };
  firebase.initializeApp(config);
  let database = firebase.database()

  this.storeData = function () {
    let name = $('#nameInput').val().trim()
    let role = $('#roleInput').val().trim()
    let startDate = $('#startDateInput').val().trim()
    let rate = $('#rateInput').val().trim()

    // Store to firebase
    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      rate: rate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
  }

  this.addEmployeeData = function (empData) {
    console.log(empData)
    let thName = $('<th>')
      .text(empData.name)
    let tdRole = $('<td>')
      .text(empData.role)
    let tdStartDate = $('<td>')
      .text(empData.startDate)
    let tRow = $('<tr>')
      .append(thName, tdRole, tdStartDate)
    $('#tableData').append(tRow)
  }

  this.employeesToTable = function (childSnap) {

    // Clear the table
    // Get from firebase
    console.log(childSnap)

  }

  $('#addEmployee').on('click', function (event) {
    event.preventDefault()
    self.storeData()
  })

  database.ref().once("value").then(function (snapshot) {
    $('#tableData').empty()
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      self.addEmployeeData(childData)
      //console.log(childData)
    });
  })

  // This function allows you to update your page in real-time when the firebase database changes.
  database.ref().orderByChild('dateAdded').limitToLast(1).on('child_added', function (snapshot) {

    let childSnap = snapshot.val()
    self.employeesToTable(childSnap)

    // If any errors are experienced, log them to console.
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

}