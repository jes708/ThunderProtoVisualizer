var audio = new Audio();
audio.src = './Audio/Stress.m4a'
audio.controls = true;
audio.loop = true;
audio.autoplay = true;

//definitions:
//audio = Stress, loop, autoplay
//canvas = drawing space
//ctx = 2d context
//context = enables audio processing and features
//



var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
  document.getElementById('audio_box').appendChild(audio);
  context = new AudioContext(); // AudioContext object instance
  analyser = context.createAnalyser(); // AnalyserNode method
  canvas = document.getElementById('analyser_render');
  ctx = canvas.getContext('2d');
  canvas.width = 1000;
  // Re-route audio playback into the processing graph of the AudioContext
  source = context.createMediaElementSource(audio); 
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();

}
//frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
  //uses frameLooper to draw frame by frame
  window.requestAnimationFrame(frameLooper);
  //stores an array of bits, representing the data values of the FFT/visualization
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  //copies current frequency data of bytes to fbc_array
  analyser.getByteFrequencyData(fbc_array);
  //erases previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  var my_gradient = ctx.createLinearGradient(0,0,0,170);
  my_gradient.addColorStop(0,"#0CF");
  my_gradient.addColorStop(1,"#167AD0");
  ctx.fillStyle = my_gradient;
  // ctx.fillStyle = '#00CCFF'; // Color of the bars
  bars = 1000;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 1;
    bar_width = 1;
    bar_height = -(fbc_array[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}

// function frameLooperCircle(){
//   window.requestAnimationFrame(frameLooperCircle);
//   fbc_array = new Uint8Array(analyser.frequencyBinCount);
//   analyser.getByteFrequencyData(fbc_array);
//   //ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//   var my_gradient = ctx.createLinearGradient(0,0,0,170);
//   my_gradient.addColorStop(0,"#0CF");
//   my_gradient.addColorStop(1,"#167AD0");
//   ctx.fillStyle = my_gradient;
//   // ctx.fillStyle = '#00CCFF'; // Color of the bars
//   bars = 1000;
//   bar_width = 1;
//   barSpacing = 1;


//   var radius = 140;
//   //The number of bars is determined by the circumference / by the bar width and bar padding
//   var maxBarNum = Math.floor((radius * 2 * Math.PI) / (bar_width + barSpacing));
//   // The top 4th is removed
//   var slicedPercent = Math.floor((maxBarNum * 25) / 100);
//   // by subtracting 25% of the lines
//   var barNum = maxBarNum - slicedPercent;
//   // how much freq data is represented by a single bar
//   // frequencyData might correspond to fbc_array
//   var freqJump = Math.floor(fbc_array.length / maxBarNum);

//   for (var i = 0; i < bars; i++) {
//     // bar_x = i * 1;
//     bar_height = -(fbc_array[i] / 2);
//     // //  fillRect( x, y, width, height ) // Explanation of the parameters below
//     // ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);

//     var amplitude = fbc_array[i * freqJump];
//     var alfa = (i * 2 * Math.PI ) / maxBarNum;
//     var beta = (3 * 45 - bar_width) * Math.PI / 180;
//     var x = 0;
//     var y = radius - (amplitude / 12 - bar_height);
//     var w = bar_width;
//     var h = amplitude / 6 + bar_height;

//     //ctx
//     ctx.save();
//     ctx.translate(cx + barSpacing, (canvas.height / 2) + barSpacing);
//     ctx.rotate(alfa - beta);
//     ctx.fillRect(x, y, w, h);
//     ctx.restore();
//   }
// }

// //Disable
//     Visualizer.prototype.renderLounge = function () {

//         var cx = this.canvas.width / 2;
//         var cy = this.canvas.height / 2;
//         //circle's size is 140
//         var radius = 140;
//         //The number of bars is determined by the circumference / by the bar width and bar padding
//         var maxBarNum = Math.floor((radius * 2 * Math.PI) / (this.barWidth + this.barSpacing));
//         // The top 4th is removed
//         var slicedPercent = Math.floor((maxBarNum * 25) / 100);
//         // by subtracting 25% of the lines
//         var barNum = maxBarNum - slicedPercent;
//         // how much freq data is represented by a single bar
//         // frequencyData might correspond to fbc_array
//         var freqJump = Math.floor(this.frequencyData.length / maxBarNum);

//         for (var i = 0; i < barNum; i++) {
            
//             var amplitude = this.frequencyData[i * freqJump];
//             var alfa = (i * 2 * Math.PI ) / maxBarNum;
//             var beta = (3 * 45 - this.barWidth) * Math.PI / 180;
//             var x = 0;
//             var y = radius - (amplitude / 12 - this.barHeight);
//             var w = this.barWidth;
//             var h = amplitude / 6 + this.barHeight;

//             //ctx
//             this.canvasCtx.save();
//             this.canvasCtx.translate(cx + this.barSpacing, cy + this.barSpacing);
//             this.canvasCtx.rotate(alfa - beta);
//             this.canvasCtx.fillRect(x, y, w, h);
//             this.canvasCtx.restore();
//         }
//     };

// //python pydub