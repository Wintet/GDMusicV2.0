var audio, canvas, context, audioctx, analyser, oscillator, freqArr, barHeight, source, colorSelect, canvasC, contextC, grd1, grd2;
var windowWidth, windowHeight, topDiv, vol, myTime;
var bigBars = 0;
var colorStyle = 0;
var pastIndex = 900;
var WIDTH = 1024;
var HEIGHT = 350;
var INTERVAL = 128;
var SAMPLES = 2048;
var r = 0;
var g = 0;
var b = 255;
var x = 0;
var currVol = .3;

function initialize(){
    canvas = document.getElementById("cnv1"); 
    context = canvas.getContext("2d");
    audio = document.getElementById("audio");
    audio.volume = .3;
    vol = document.getElementById("volumeSlider");
    colorSelect = document.getElementById("colorSelect");
    

    audioctx = new AudioContext(); 
    analyser = audioctx.createAnalyser();
    analyser.fftSize = SAMPLES;
    
    oscillator = audioctx.createOscillator();
    oscillator.connect(audioctx.destination);

    source = audioctx.createMediaElementSource(audio);    
    source.connect(analyser);
    source.connect(audioctx.destination);

    freqArr = new Uint8Array(analyser.frequencyBinCount);

    barHeight = HEIGHT;
 
    canvasC = document.getElementById("circlecnv"); 
    contextC = canvasC.getContext("2d");

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    canvasC.width = windowWidth;
    canvasC.height = windowHeight;

    var canvasTop = document.getElementById("topcnv");
    var contextTop = canvasTop.getContext("2d");

    canvasTop.width = windowWidth;
    canvasTop.height = 75;

    contextTop.fillStyle = "rgb(" + 128 + "," + 128 + "," + 128 + ")";
    contextTop.fillRect(0,0, windowWidth, 75);

    topDiv = document.getElementById("UI");
    topDiv.onmouseout = function(){myTime = setTimeout(mouseOutUI, 3000)}
    
    window.requestAnimationFrame(draw);
}

file.onchange = function(){ 
    audio = document.getElementById("audio");
    var reader = new FileReader();
    reader.onload = function(e){
        audio.src = this.result;
        audio.controls = true;
        audio.crossOrigin = "anonymous";
        audio.play();
        audioctx.resume();
    }
    reader.readAsDataURL(this.files[0]);
    window.requestAnimationFrame(draw);
}

function changeColor(){
    if(colorSelect.selectedIndex == 0){
        colorStyle = 0;
    }
    else if(colorSelect.selectedIndex == 1){
        colorStyle = 1;
    }
    else if(colorSelect.selectedIndex == 2){
        colorStyle = 2;
    }
    else if(colorSelect.selectedIndex == 3){
        colorStyle = 3;
    }
    else if(colorSelect.selectedIndex == 4){
        colorStyle = 4;
    }
    else if(colorSelect.selectedIndex == 5){
        colorStyle = 5;
    }
    else if(colorSelect.selectedIndex == 6){
        colorStyle = 6;
    }
    else{
        colorStyle = 7;
    }
}



function drawSides(){
    grd1 = contextC.createRadialGradient(windowWidth/2, windowHeight/2, 800 - (bigBars*40), windowWidth/2, windowHeight/2, 2400);
    if(colorStyle == 0){
        grd1.addColorStop(1,"fuchsia");
        grd1.addColorStop(0,"black"); 
    }
    else if(colorStyle == 1){zz
        grd1.addColorStop(1,"red");
        grd1.addColorStop(0,"black"); 
    }
    else if(colorStyle == 2){
        grd1.addColorStop(1,"orange");
        grd1.addColorStop(0,"black"); 
    }
    else if(colorStyle == 3){
        grd1.addColorStop(1,"yellow");
        grd1.addColorStop(0,"black"); 
    }
    else if(colorStyle == 4){
        grd1.addColorStop(1,"LightGreen");
        grd1.addColorStop(0,"black"); 
    }
    else if(colorStyle == 5){
        grd1.addColorStop(1,"DodgerBlue");
        grd1.addColorStop(0,"black"); 
    }
    else if(colorStyle == 6){
        grd1.addColorStop(1,"Aquamarine");
        grd1.addColorStop(0,"black"); 
    }
    else{
        grd1.addColorStop(1,"fuchsia");
        grd1.addColorStop(0,"black"); 
    }
    

    contextC.fillStyle = grd1;
    contextC.fillRect(0,0,windowWidth,windowHeight);
}

function draw(){
    if(!audio.paused){
        bigBars = 0;
        r = 0;
        g = 0;
        b = 255;
        x = 0;
        context.clearRect(0,0,WIDTH, HEIGHT);
        analyser.getByteFrequencyData(freqArr);
        for(var i = 0; i < INTERVAL; i++){
            if( barHeight >= (240 )){
                bigBars++;
            }
            var num = i;
            barHeight = ((freqArr[num] - 128) * 2) + 2;
            if(barHeight <= 1){
                barHeight = 2;
            }
            
            r = r + 10; 
            if(r > 255){
                r = 255;
            }
            g = g + 1;
            if(g > 255){
                g = 255;
            }
            b = b - 2;
            if(b < 0){
            b = 0;
            }

            if(colorStyle == 0){
                context.fillStyle = "rgb(" + r + "," + g + "," + b + ")"; 
                
            }
            else if(colorStyle == 1){
                context.fillStyle = "rgb(" + ((2/3)*(barHeight)) + "," + (0*(barHeight)) + "," + (0*(barHeight)) + ")";
            }
            else if(colorStyle == 2){
                context.fillStyle = "rgb(" + (1*(barHeight)) + "," + (.6*(barHeight)) + "," + (0*(barHeight)) + ")"; 
            }
            else if(colorStyle == 3){
                context.fillStyle = "rgb(" + (.95*(barHeight)) + "," + (.85*(barHeight)) + "," + (0*(barHeight)) + ")"; 
            }
            else if(colorStyle == 4){
                context.fillStyle = "rgb(" + (0*(barHeight)) + "," + ((2/3)*(barHeight)) + "," + (0*(barHeight)) + ")"; 
            }
            else if(colorStyle == 5){
                context.fillStyle = "rgb(" + (.58*(barHeight/10)) + "," + (0*(barHeight)) + "," + (1*(barHeight)) + ")"; 
            }
            else if(colorStyle == 6){
                context.fillStyle = "rgb(" + (.127*(barHeight/10)) + "," + ( 255*(barHeight)) + "," + (212*(barHeight)) + ")"; 
            }
            else{
                context.fillStyle = "rgb(" + (1*(barHeight)) + "," + (0*(barHeight)) + "," + (1*(barHeight)) + ")"; 
            }

            context.fillRect(x, HEIGHT - barHeight, (WIDTH/INTERVAL) - 1 , barHeight);
            x = x + (WIDTH/INTERVAL);
            
        }
    }

    if(bigBars >= 1){
        drawSides();
    }
    else{
        contextC.clearRect(0,0,windowWidth,windowHeight);
    }
    window.requestAnimationFrame(draw);
}

function mouseOverUI(){
    clearTimeout(myTime);
    UI.style.opacity = 1;
}

function mouseOutUI(){
    clearTimeout(myTime);
    UI.style.opacity = 0;
}

function changeVolume(){
    currVol = (vol.value/100);
    audio.volume = currVol;
}