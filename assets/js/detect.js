var gAgent = function() {
	var agentInfo = {
		isMobile: false,
		browser : {name : "unknown", version : "unknown"},
		os			: {name : "unknown", version : "unknown"}
	};
	
	// browser
	var nVer = navigator.appVersion.toLowerCase();
	var nAgt = navigator.userAgent.toLowerCase();
	var nAppName = navigator.appName.toLowerCase();
	var nAppVer = '' + parseFloat(navigator.appVersion);
	var verOffset, ix;
	
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
		if((verOffset = nAgt.indexOf('msie')) > -1) {	// ie 7~10
			nAppName = 'ie';
			nAppVer = nAgt.substring(verOffset + 5);
		}
		else if (nAgt.indexOf('trident/') > -1) {	// ie 11
			nAppName = 'ie';
			nAppVer = nAgt.substring(nAgt.indexOf('rv:') + 3);
		}
		else if ((verOffset = nAgt.indexOf('edge')) > -1) {	// edge

			nAppName = 'edge';
			nAppVer = nAgt.substring(verOffset + 5);
		}
		else if ((verOffset = nAgt.indexOf('swing')) > -1) {	// swing
			nAppName = 'swing';
			nAppVer = nAgt.substring(verOffset + 6);
		}
		else if ((verOffset = nAgt.indexOf('whale')) > -1) {	// whale
			nAppName = 'whale';
			nAppVer = nAgt.substring(verOffset + 6);
		}		
		else if ((verOffset = nAgt.indexOf('opera')) > -1) {	// opera
			nAppName = 'opera';
			nAppVer = nAgt.substring(verOffset + 6);
			if ((verOffset = nAgt.indexOf('version')) > -1) {
				nAppVer = nAgt.substring(verOffset + 8);
			}
		}
		else if ((verOffset = nAgt.indexOf('opr')) > -1) {	// opera Next
			nAppName = 'opera';
			nAppVer = nAgt.substring(verOffset + 4);
		}
		else if ((verOffset = nAgt.indexOf('firefox')) > -1) {	// firefox
			nAppName = 'firefox';
			nAppVer = nAgt.substring(verOffset + 8);
		}
		else if ( ((verOffset = nAgt.indexOf('safari')) > -1) && (nAgt.indexOf('chrome') == -1) ) {	// safari
			nAppName = 'safari';
			nAppVer = nAgt.substring(verOffset + 7);
			if ((verOffset = nAgt.indexOf('version')) > -1) {
				nAppVer = nAgt.substring(verOffset + 8);
			}
		}
		else if ((verOffset = nAgt.indexOf('chrome')) > -1) {	// chrome
			nAppName = 'chrome';
			nAppVer = nAgt.substring(verOffset + 7);
		}
		// trim the version string
		if ((ix = nAppVer.indexOf(';')) !== -1) {
			nAppVer = nAppVer.substring(0, ix);
		}
		if ((ix = nAppVer.indexOf(' ')) !== -1) {
			nAppVer = nAppVer.substring(0, ix);
		}
		if ((ix = nAppVer.indexOf(')')) !== -1) {
			nAppVer = nAppVer.substring(0, ix);
		}

		agentInfo.browser.name = nAppName;
		agentInfo.browser.version = nAppVer;
	}

	function getOs() {
		var osName = "";
		var osVersion = "";
		var clientStr = [
			{s: 'windows 10', r:/(windows 10.0|windows nt 10.0)/},
			{s: 'windows 8.1', r:/(windows 8.1|windows nt 6.3)/},
			{s: 'windows 8', r:/(windows 8|windows nt 6.2)/},
			{s: 'windows 7', r:/(windows 7|windows nt 6.1)/},
			{s: 'windows vista', r:/windows nt 6.0/},
			{s: 'windows server 2003', r:/windows nt 5.2/},
			{s: 'windows xp', r:/(windows nt 5.1|windows xp)/},
			{s: 'windows 2000', r:/(windows nt 5.0|windows 2000)/},
			{s: 'windows me', r:/(win 9x 4.90|windows me)/},
			{s: 'windows 98', r:/(windows 98|Win98)/},
			{s: 'windows 95', r:/(windows 95|Win95|windows_95)/},
			{s: 'windows nt 4.0', r:/(windows nt 4.0|Winnt4.0|Winnt|windows nt)/},
			{s: 'windows ce', r:/windows ce/},
			{s: 'windows 3.11', r:/Win16/},
			{s: 'android', r:/android/},
			{s: 'open bsd', r:/openbsd/},
			{s: 'sun os', r:/sunos/},
			{s: 'linux', r:/(linux|X11)/},
			{s: 'ios', r:/(iphone|ipad|ipod)/},
			{s: 'mac os x', r:/mac os x/},
			{s: 'mac os', r:/(macppc|macintel|mac_powerpc|macintosh)/},
			{s: 'qnx', r:/qnx/},
			{s: 'unix', r:/unix/},
			{s: 'BeOS', r:/BeOS/},
			{s: 'OS/2', r:/OS\/2/},
			{s: 'search bot', r:/(nuhk|googlebot|yammybot|openbot|slurp|msnbot|ask jeeves\/teoma|ia_archiver)/}
		];
		for (var idx in clientStr) {
			var cs = clientStr[idx];
			if (cs.r.test(nAgt)) {
				osName = cs.s;
				break;
			}
		}
		if (/windows/.test(osName)) {
			osVersion = /windows (.*)/.exec(osName)[1];
			osName = 'windows';
		}
		switch (osName) {
			case 'mac os x':
				osVersion = /mac os X (10[\.\_\d]+)/.exec(nAgt)[1];
				break;
			case 'android':
				osVersion = /android ([\.\_\d]+)/.exec(nAgt)[1];
				break;
			case 'ios':
				osVersion = /os (\d+)_(\d+)_?(\d+)?/.exec(nVer);
				osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
				break;
		}
		agentInfo.os.name = osName;
		agentInfo.os.version = osVersion;
	}
	
	detectMobile();
	getBrowser();
	getOs();
	return agentInfo;
}