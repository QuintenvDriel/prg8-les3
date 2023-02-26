const video = document.getElementById("webcam");
const label = document.getElementById("ball");


const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");


labelOneBtn.addEventListener("click", () => classifier.addImage("soccerball"));
labelTwoBtn.addEventListener("click", () => console.log("button 2"));
labelThreeBtn.addEventListener("click", () => console.log("button 3"));

trainbtn.addEventListener("click", () => console.log("train"));

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

label.innerText = "Ready when you are!";

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
  console.log('The video is ready!');
}

// Add a new image with a label
classifier.addImage(document.getElementById('dogA'), 'image');

// Retrain the network
classifier.train((lossValue) => {
  console.log('Loss is', lossValue);
});

// Get a prediction for that image
classifier.classify(document.getElementById('dogB'), (err, result) => {
    console.log(result); // Should output 'dog'
  });

// // Make a prediction with a selected image
// classifier.classify(document.getElementById('image'), (err, results) => {
//   console.log(results);
//   speak(results[0].label);
// });

function gotResults(err, result) {
    if (err) {
      console.error(err);
    }
    if (result && result.value) {
      positionX = map(result.value, 0, 1, 0, width);
      slider.value(result.value);
      predict();
    }
}

let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

// function addballImage() {
//     classifier.addImage(video, 'A soccerball', ()=>{
//         console.log("added image to model!")
//     })
// }