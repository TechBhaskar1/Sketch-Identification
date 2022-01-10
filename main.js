function preload(){
    classifier= ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classify_canvas);
    synth=window.speechSynthesis;
}
function draw(){
    strokeWeight(5);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function clear1(){
    background("white");
}
function classify_canvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    console.log(results);

    document.getElementById("label").innerHTML="Label :-"+results[0].label;
    document.getElementById("confidence").innerHTML="Confidence :-"+Math.round(results[0].confidence*100);

    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}