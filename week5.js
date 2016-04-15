function photoOption (image, imageName) {
  this.image = image;
  this.y = 0;
  this.voteCount = 0;
  this.label = imageName;
  this.imageName = imageName;
  this.id = imageName;
}

var photos = new Array();
photos.push(new photoOption ("bag.jpg", "bag"));
photos.push(new photoOption ("banana.jpg", "banana"));
photos.push(new photoOption ("boots.jpg", "boots"));
photos.push(new photoOption ("chair.jpg", "chair"));
photos.push(new photoOption ("cthulhu.jpg", "cthulhu"));
photos.push(new photoOption ("dragon.jpg", "dragon"));
photos.push(new photoOption ("pen.jpg", "pen"));
photos.push(new photoOption ("scissors.jpg", "scissors"));
photos.push(new photoOption ("shark.jpg", "shark"));
photos.push(new photoOption ("sweep.jpg", "sweep"));
photos.push(new photoOption ("unicorn.jpg", "unicorn"));
photos.push(new photoOption ("usb.jpg", "usb"));
photos.push(new photoOption ("water_can.jpg", "water_can"));
photos.push(new photoOption ("wine_glass.jpg", "wine_glass"));

var counter = 0;

function choosePhoto() {
  var chosenPhoto = photos[Math.floor(Math.random() * 14)];
  return chosenPhoto;
}

function threeRandomPhotos() {
  var myPhotos = [];
  var photo = choosePhoto();
  myPhotos.push(photo);
  var newPhoto = choosePhoto();

  for (var i = 0; i < 3; i++) {
    while(myPhotos.indexOf(newPhoto) != -1) {
        newPhoto = choosePhoto();
    }
    myPhotos.push(newPhoto);
  }
  return myPhotos;
}

function addPhotosUI(arrayPhoto) { //adding to the page
  var myPhotos = arrayPhoto;
  var photoItem = document.getElementById("photo1");
  photoItem.innerHTML = "<img id=" + myPhotos[0].imageName +" src=" + myPhotos[0].image + " height='200px' width='200px'>";
  photoItem.addEventListener("click", registerClick);

  var photoItem = document.getElementById("photo2");
  photoItem.innerHTML = "<img id=" + myPhotos[1].imageName +" src=" + myPhotos[1].image + " height='200px' width='200px'>";
  photoItem.addEventListener("click", registerClick);

  var photoItem = document.getElementById("photo3");
  photoItem.innerHTML = "<img id=" + myPhotos[2].imageName +" src=" + myPhotos[2].image + " height='200px' width='200px'>";
  photoItem.addEventListener("click", registerClick);
}

function registerClick() {
  console.log("Photo clicked: "+event.target.id)
  for (var index=0; index < photos.length; index++){
    if (photos[index].imageName == event.target.id){
      photos[index].y++;
      counter++;
      if (counter === 15){
        photoItem.removeEventListener("click", registerClick);
        userClick.removeEventListener("click", replacePhotos);
      }
      break;
    }

  }



  var progress = document.getElementsByClassName('incomplete');
  if (progress.length > 0){
  var color = progress[0];
  color.className = 'complete'
  }
}

function replacePhotos() {
  addPhotosUI(threeRandomPhotos());
}

var userClick = document.getElementById('photos');
userClick.addEventListener("click", replacePhotos);

replacePhotos();

var el = document.getElementById("chartContainer");
var results = document.getElementById("seeChart");



results.addEventListener("click", function () {
  var chart = new CanvasJS.Chart("chartContainer", {
    title:{
      text: "Photos Clicked"
    },
    data: [
    {
      type: "column",
      dataPoints: photos
    }
    ]
  });

  chart.render();


})
