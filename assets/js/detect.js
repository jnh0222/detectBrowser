var gAgent = function() {
	//final value
	var agentInfo = {
		isMobile: false,
		browser : {name : "unknown", version : -1}
	};
	
	//variables
	var nVer = navigator.appVersion.toLowerCase();
	var nAgt = navigator.userAgent.toLowerCase();
	var nAppName = "";
	var nAppVer = "";
	var verOffset = -1;
	var ix = -1;
	
	function detectMobile() {
		var pfm = navigator.platform.toLowerCase();
		var filter = "win16|win32|win64|mac|macintel";
		if(pfm) {
			if (filter.indexOf(pfm) < 0) {
				agentInfo.isMobile = true;
				return;
			}else {
				agentInfo.isMobile = false;
			}
		}
	}
	
	function getBrowser() {
		if((verOffset = nAgt.indexOf('msie')) > -1) {	// ie 6~10
			nAppName = 'ie';
			nAppVer = nAgt.substring(verOffset + 5);
		}
		else if(nAgt.indexOf('trident/') > -1) {	// ie 11
			nAppName = 'ie';
			nAppVer = nAgt.substring(nAgt.indexOf('rv:') + 3);
		}
		else if((verOffset = nAgt.indexOf('edge')) > -1) {	// edge
			nAppName = 'edge';
			nAppVer = nAgt.substring(verOffset + 5);
		}
		else if((verOffset = nAgt.indexOf('swing')) > -1) {	// swing
			nAppName = 'swing';
			nAppVer = nAgt.substring(verOffset + 6);
		}
		else if((verOffset = nAgt.indexOf('whale')) > -1) {	// whale
			nAppName = 'whale';
			nAppVer = nAgt.substring(verOffset + 6);
		}		
		else if((verOffset = nAgt.indexOf('opera')) > -1) {	// opera
			nAppName = 'opera';
			nAppVer = nAgt.substring(verOffset + 6);
			if ((verOffset = nAgt.indexOf('version')) > -1) {
				nAppVer = nAgt.substring(verOffset + 8);
			}
		}
		else if((verOffset = nAgt.indexOf('opr')) > -1) {	// opera Next
			nAppName = 'opera';
			nAppVer = nAgt.substring(verOffset + 4);
		}
		else if((verOffset = nAgt.indexOf('firefox')) > -1) {	// firefox
			nAppName = 'firefox';
			nAppVer = nAgt.substring(verOffset + 8);
		}
		else if( ((verOffset = nAgt.indexOf('safari')) > -1) && (nAgt.indexOf('chrome') == -1) ) {	// safari
			nAppName = 'safari';
			nAppVer = nAgt.substring(verOffset + 7);
			if ((verOffset = nAgt.indexOf('version')) > -1) {
				nAppVer = nAgt.substring(verOffset + 8);
			}
		}
		else if((verOffset = nAgt.indexOf('chrome')) > -1) {	// chrome
			nAppName = 'chrome';
			nAppVer = nAgt.substring(verOffset + 7);
		}
		// trim the version string
		if((ix = nAppVer.indexOf(' ')) > -1) {
			nAppVer = nAppVer.substring(0, ix);
		}
		if((ix = nAppVer.indexOf(')')) > -1) {
			nAppVer = nAppVer.substring(0, ix);
		}
		if((ix = nAppVer.indexOf(')')) > -1) {
			nAppVer = nAppVer.substring(0, ix);
		}		
		agentInfo.browser.name = nAppName;
	}
	
	detectMobile();
	getBrowser();
	return agentInfo;
}