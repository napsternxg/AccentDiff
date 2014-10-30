var layout = d3.select("body").append("svg");
	layout.attr("width", 800)
		.attr("height", 300)
		.classed("waveform", true);

/*var layout = container
			.append("svg")
			.attr("width", 800)
			.attr("height", 300);*/

function drawWaveForm(datafile, name, cssClass){
	d3.json(datafile, function (error, data) {
	// body...
		var filename = datafile.replace(/^.*\/|\.[^.]*$/g, '');
		console.log(filename);

		if(cssClass === undefined){
			cssClass = "";
		}
		var waveform = WaveformData.create(data);
		console.log(waveform.duration);
		var container = d3.select("body")
			.append("div")
			.classed("container", true);
		container.append("h3")
			.text(name+": "+cssClass)


		var graph = layout.append("g")
			//.attr("transform", function(){ return "translate(0, "+nextY+")"; });
		var x = d3.scale.linear();
		var y = d3.scale.linear();
		var offsetX = 100;
		//nextY += 3*offsetX;

		//x.domain([0, waveform.adapter.length]).rangeRound([0, 1024]);
		//All waveforms of same length
		x.domain([0, 2000]).rangeRound([0, 1024]);
		//y.domain([d3.min(waveform.min), d3.max(waveform.max)]).rangeRound([offsetX, -offsetX]);
		// All waveform center on same horizontal line.
		y.domain([-d3.max(waveform.max), d3.max(waveform.max)]).rangeRound([offsetX, -offsetX]);

		var area = d3.svg.area()
		  .x(function(d, i){ return x(i) })
		  .y0(function(d, i){ return y(waveform.min[i]) })
		  .y1(function(d, i){ return y(d) });


		graph.append("path")
		  .datum(waveform.max)
		  .attr("transform", function(){ return "translate(0, "+offsetX+")"; })
		  .classed("area", true)
		  .classed(cssClass, true)
		  .attr("d", area);
		var audioElm = container.append("audio")
			.attr("controls", "controls");
		audioElm.append("source")
			.attr("src", "./DATA/MP3/"+filename+".mp3");
	});
}

drawWaveForm("./DATA/JSON/tamil2.json", "Native Tamil");
drawWaveForm("./DATA/JSON/english2.json", "Native English", "base");