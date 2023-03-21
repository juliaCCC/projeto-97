const firebaseConfig = {
  apiKey: "AIzaSyBbZUP3PwNvs1IACrG-TB7TiwGo2eay0ig",
  authDomain: "aula-97.firebaseapp.com",
  databaseURL: "https://aula-97-default-rtdb.firebaseio.com",
  projectId: "aula-97",
  storageBucket: "aula-97.appspot.com",
  messagingSenderId: "16771666971",
  appId: "1:16771666971:web:2a52c35e61b52f70c6d4be"
};
firebase.initializeApp(firebaseConfig);
userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0
  });
  document.getElementById("msg").value = " ";
}

function getData() {
  firebase.database().ref("/" + roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebaseMessageId = childKey;
        messageData = childData;
        name = messageData['name'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";


       row = nameWithTag + messageWithTag +like_button + spanWithTag;      
       document.getElementById("output").innerHTML += row;


      }
    });
  });
}
getData();

function updateLike(m) {
  bi = m;
  likes = document.getElementById(bi).value;
  updateL = Number(likes) + 1;
  firebase.database().ref(roomName).child(m).update({
    like: updateL
  });
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
      window.location = "index.html";
  }
  