a = ""
b = ""
Webcam.set({
    width:480,
    height:360,
    img_format: "png",
    png_quality: 90
})

camera = document.getElementById("webcam");

Webcam.attach(camera);

function snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML= "<img id = 'pic' src = '" + data_uri + "'>";
    })
}

console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/aqMxLUTL8/model.json",ModelLoaded);

function ModelLoaded(){
    console.log("Loaded");
}

function identify(){
    img = document.getElementById("pic");
    classifier.classify(img, gotResult);
}

function speech(){
var synth = window.speechSynthesis;
words = "The first prediction is " + a + " and the second prediction is " + b + " .";
var utterThis = new SpeechSynthesisUtterance(words);
synth.speak(utterThis);
}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("Result1").innerHTML = result[0].label;
        document.getElementById("Result2").innerHTML = result[1].label;
        a = result[0].label;
        b = result[1].label;
        speech();
    }
}