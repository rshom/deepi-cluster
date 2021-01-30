// Scripts for the deepi cluster

function changefeed(val) {
    // Change to a paticular page
    var img = document.getElementById("live-feed");
    img.src = "";		// TODO: insert loading image
    var label = document.getElementById("feed-label");
    if (val==0) {
	img.src = "http://10.0.11.1:8080/stream/video.mjpeg";
    } else {
	var feedsrc = ["http://10.0.1",val,".2:8080/stream/video.mjpeg"];
	img.src = feedsrc.join(''); // no seperator
    }
    label.textContent = ["DEEPi #", val].join('');
    return false
}
