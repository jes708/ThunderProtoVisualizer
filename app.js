$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  // var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(300);

  var svgHeight = window.innerHeight
  var svgWidth =  window.innerWidth
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent)
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      // .attr('viewbox', '0 0 ' + width + ' ' + height)
      // .attr('preserveAspectRatio', 'xMidYMid')
      .append('g')
      .attr('transform', 'translate(0, -100)')
      // .attr('height', height * 1.5)
      // .attr('width', width * 1.5)
      // .attr('transform', function () {
      //   // return 'scale(0.5) translate(0,' + svgHeight/2 + ')'
      //   console.log(svgWidth, svgHeight)
      //   return 'scale(0.25) translate(' + 500 + ',' + svgHeight / 3 + ')'
      //   // return 'scale(0.25)'
      // })
  }

  d3.select(window).on('resize', function () {
    svgHeight = window.innerHeight
    svgWidth =  window.innerWidth
    d3.select('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)
    // d3.select('g')
    // .attr('height', svgHeight * 1.5)
    // .attr('width', svgWidth * 1.5)
  })

  var svg = createSvg('#mp3_player', svgHeight, svgWidth);

  // Create circle
  // svg.selectAll('circle')
  //    .data(frequencyData)
  //    .enter()
  //    .append('circle')
  //    .attr('cx', svgWidth / 2)
  //    .attr('cy', svgHeight / 2)
  //    .attr('r', svgHeight / 4)
  //    .attr('stroke', 'red')
  //    .attr('fill', 'white')

  // Create our initial D3 chart.

  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     // .attr('x', function (d, i) {
     //   // return i * (svgWidth / frequencyData.length);
     //    // return (svgWidth / 2) + (Math.cos((2 * Math.PI) * (i / frequencyData.length)))
     //   return svgWidth / 2
     // })
     // .attr('y', function (d, i) {
     //    return (svgHeight / 2) + (Math.sin((2 * Math.PI) * (i / frequencyData.length)))
     // })
     // .attr('transform', function (d, i) {
     //   return 'rotate(180)'
     // })

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);
     // var color = d3.scale.category10().domain([0, frequencyData.length])
     var color = d3.scale.linear().domain([0, frequencyData.length / 4, frequencyData.length / 2, frequencyData.length * 0.75, frequencyData.length]).range(['#6157D4', '#AEDD46', '#D71A75', '#FFDA0C', '#2FE2D9'])
     // Update d3 chart with new data.
     svg.selectAll('rect')
         .data(frequencyData)
         .attr('width', 1000 / frequencyData.length)
         .attr('x', function () {
           // return i * (svgWidth / frequencyData.length);
           return svgWidth / 2
           // return (svgWidth / 2) + (radius - d) * (Math.cos(i * 2 * Math.PI / 300))
         })
         .attr('y', function() {
           // return  (svgHeight / 2) + (radius - d) * (Math.sin(i * 2 * Math.PI / 300))
           return svgHeight * 0.7;
        })
        .attr('height', function(d) {
          return d * 0.5;
        })
        .attr('fill', function(d, i) {
          // return 'rgb(0, 0, ' + d + ')';
          return color(i)
        })
        // .attr('transform', 'translate(0, -250)')
       .attr('transform', function (d, i) {
         return 'rotate(' + ((i/frequencyData.length) * 360) + ',' + svgWidth / 2 + ',' + svgHeight / 2 + ')'
       })
  }

  // Run the loop
  renderChart();

});
