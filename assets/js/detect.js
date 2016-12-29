var myAgent = function() {
	//final value
	var agentInfo = {};
	
	var browserPool = [
		{detectStr: "msie", name: "ie"},
		{detectStr: "trident", name: "ie"},
		{detectStr: "edge", name: "edge"},
		{detectStr: "firefox", name: "firefox"},
		{detectStr: "opr", name: "opera"},
		{detectStr: "chrome", name: "chrome"},
		{detectStr: "safari", name: "safari"}
	]

	function detectMobile() {
		var pfm = navigator.platform.toLowerCase();
		var detectStr = "win16|win32|win64|mac|macintel";
		return (detectStr.indexOf(pfm)<0) ? true : false;
	}	
	
	function detectBrowser() {
		var ua = navigator.userAgent.toLowerCase();
		var n, v, vOffset;
		for(var i in browserPool) {
			if((vOffset = ua.indexOf(browserPool[i].detectStr)) > -1) {
				n = browserPool[i].name;
				if(browserPool[i].detectStr == 'trident') { //ie11
					v = ua.substr(ua.indexOf('rv:') + 3);
					v = parseFloat(v.split(')')[0]);
				}
				else if(browserPool[i].detectStr == 'safari') {
					v = ua.substr(ua.indexOf('version/') + 8);
					v = parseFloat(v.split('/')[0]);
				}
				else {
					v = ua.substr(vOffset + browserPool[i].detectStr.length + 1);
					v = parseFloat(v.split(' ')[0]);	
				}
				break;
			}else {
				n = "unknown";
				v = 0;
			}
		}
		return {name: n, version: v};
		
	}
	agentInfo.isMobile = detectMobile();
	agentInfo.browser = detectBrowser();
	return agentInfo;
}