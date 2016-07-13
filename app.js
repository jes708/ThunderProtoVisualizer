var audio = new Audio();
audio.src = './Audio/Stress.m4a'
audio.controls = true;
audio.loop = true;
audio.autoplay = true;

var canvas, totalTime, bufferLength, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

function initMp3Player(){
  document.getElementById('audio_box').appendChild(audio);
  context = new AudioContext(); // AudioContext object instance
  analyser = context.createAnalyser(); // AnalyserNode method
  canvas = document.getElementById('analyser_render');
  ctx = canvas.getContext('2d');
  // Re-route audio playback into the processing graph of the AudioContext
  source = context.createMediaElementSource(audio); 
  source.connect(analyser);
  analyser.connect(context.destination);
  totalTime = Math.ceil(document.getElementById('audio_box').children[0].duration);
  console.log('totalTime : ', totalTime);
  bufferLength = analyser.frequencyBinCount
  
  
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  frameLooper();

}

function frameLooper(){
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  analyser.getByteFrequencyData(fbc_array);
  var my_gradient = ctx.createLinearGradient(0,0,0,170);
  my_gradient.addColorStop(0,"#0CF");
  my_gradient.addColorStop(1,"#167AD0");
  ctx.fillStyle = my_gradient;
  ctx.fillStyle = '#00CCFF'; // Color of the bars
    var circleRadius = canvas.height/4
    var frequencyWidth = ((2* Math.PI) / bufferLength), frequencyHeight = 0, x = 0;
    console.log("FW", frequencyWidth);

  for (var i = 0; i < bufferLength; i+=5) {
    frequencyHeight = fbc_array[i] * (canvas.height * .003)/4
    ctx.beginPath();
    var ax  = canvas.width/2 +(circleRadius* Math.cos(x*1000));
    var ay  = canvas.height/2 +(circleRadius* Math.sin(x*1000));
    var bx  = canvas.width/2 +((circleRadius+frequencyHeight)* Math.cos(x*1000));
    var by = canvas.height/2 +((circleRadius+frequencyHeight)* Math.sin(x*1000));
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#4d6db0";
    ctx.stroke();

    x += (2*Math.PI)/(bufferLength);
  }


  call = window.requestAnimationFrame(frameLooper);
}

window.addEventListener("load", initMp3Player, false);
