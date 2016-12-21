/*
 * Jai Shree Ram
 */

var recognition;
var actionSpeech = "";
var body = document.getElementById("body");
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");
var colors = ["blue", "green", "red", "yellow", "black"];
var box = ["one", "two", "three", "four"];

var actions = [{
    words: ["color", "colour"],
    method: function(param){changeColor(param)}
},{
    
    words: ["text"],
    method: function(param, id){changeText(param, id)}
}];

if (!('webkitSpeechRecognition' in window)) {
    //Speech API not supported here…
    console.log("Bro ure missing something");
} else { //Let’s do some cool stuff :)
    recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
    recognition.continuous = false;   //Suitable for dictation. 
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "en-US"; 
    recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
}

recognition.onstart = function(){
    console.log(" Speech Started");
}

recognition.onend = function(){
    stop();
    console.log("speech ended");
}

recognition.onresult = function(event){
    if(typeof(event.results) == "undefined"){
        console.error("errorn in results");
        stop();
        return;
    }

    var word = "";
    var sentence = "";

    for( var i = event.resultIndex ; i < event.results.length ; ++i){
        if(true){
            word = event.results[i][0].transcript;
            if(word.toLowerCase() == "stop"){
                stop();
            }
            else{
                sentence += " " + word;
                lookAction(sentence);
            }
        }
    }
}



function startButton(event) {
    recognition.start();
    start_img.src = 'images/loading.gif';
}

var stop = function(){
    recognition.stop();
    start_img.src = 'images/mic-img.png';
    setAction();
}

var lookAction = function(sentence){
    //console.log(sentence);
    actionSpeech = sentence.toLowerCase();
}

var setAction = function(){
    console.log(actionSpeech);
    var targetObj = body;
    var boxId = searchBox();
    if(boxId != -1){
        targetObj = document.getElementById("b"+boxId);
    }
    
    for(var i = 0 ; i < actions.length ; i++ ){
        for(var j = 0; j < actions[i].words.length ; j++){
            if(actionSpeech.indexOf(actions[i].words[j]) != -1){
                actions[i].method(targetObj, boxId);
                return;
            }
        }
    }

}

var searchBox = function(){
    if(actionSpeech.indexOf("box") != -1){
        for(var i=0 ; i< box.length ; i++){
            if(actionSpeech.indexOf(box[i]) != -1 || actionSpeech.indexOf((i+1)) != -1){
                return i+1;
            }
        }
    }
    return -1;
}

var changeColor = function(targetObj){
    for(var i = 0 ; i < colors.length ; i++ ){
        if(actionSpeech.indexOf(colors[i]) != -1){
            targetObj.style.backgroundColor = colors[i];
            break;
        }
    }
}

var changeText = function(targetObj, id){
    console.log("b"+id+"Text");
    var targetObj = document.getElementById("b"+id+"Text");
    var txt = actionSpeech.split('to');
    if(txt.length == 0){
        txt = actionSpeech.split(2);
    }
    if(txt.length != 0);
    targetObj.innerHTML = txt[txt.length -1];
    console.log(txt[txt.length -1]);
}
