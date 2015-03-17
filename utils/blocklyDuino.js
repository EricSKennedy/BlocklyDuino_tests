/**
 * Choose Arduino card : UNO or MEGA
 */
  function arduino_card(){
  var Cacheobj=document.getElementById("pinout");
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (window.profile["default"]!=window.profile[Cacheobj.options[Cacheobj.selectedIndex].value]) {
  if (false || window.confirm(MSG['arduino_card']+' '+window.profile[Cacheobj.options[Cacheobj.selectedIndex].value].description+' ?')) {
    window.profile["default"]=window.profile[Cacheobj.options[Cacheobj.selectedIndex].value];
    Blockly.mainWorkspace.clear();
	Code.renderContent();
	}
  }
}  

/**
 * Backup code blocks to localStorage.
 */
function backup_blocks() {
  if ('localStorage' in window) {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    window.localStorage.setItem('arduino', Blockly.Xml.domToText(xml));
  }
}

/**
 * Restore code blocks from localStorage.
 */
function restore_blocks() {
  if ('localStorage' in window && window.localStorage.arduino) {
    var xml = Blockly.Xml.textToDom(window.localStorage.arduino);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }
}

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
function saveXmlFile() {
	  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	  var data = Blockly.Xml.domToPrettyText(xml);
	  uri = 'data:text/xml;charset=utf-8,' + encodeURIComponent(data);
	  $(this)
	            .attr({
	            'download': "blockly_arduino.xml",
	                'href': uri,
	                'target': '_blank'
	        });
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
function saveArduinoFile() {
	  var data = Blockly.Arduino.workspaceToCode();
	  uri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);
	  $(this)
	            .attr({
	            'download': "code_arduino.ino",
	                'href': uri,
	                'target': '_blank'
	        });
}


/*
 * Loas Arduino code from component pre_arduino
 */
function getFiles(){
    var code = document.getElementById('pre_arduino').textContent;
    code=code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return {"sketch.ino": code }
}

/**
 * Load blocks from local file.
 */
function load(event) {
  var files = event.target.files;
  // Only allow uploading one file.
  if (files.length != 1) {
    return;
  }

  // FileReader
  var reader = new FileReader();
  reader.onloadend = function(event) {
    var target = event.target;
    // 2 == FileReader.DONE
    if (target.readyState == 2) {
      try {
        var xml = Blockly.Xml.textToDom(target.result);
      } catch (e) {
        alert(MSG['xmlError']+'\n' + e);
        return;
      }
      var count = Blockly.mainWorkspace.getAllBlocks().length;
      if (count && confirm(MSG['xmlLoad'])) {
        Blockly.mainWorkspace.clear();
      }
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
    // Reset value of input after loading because Chrome will not fire
    // a 'change' event if the same file is loaded again.
    document.getElementById('load').value = '';
  };
  reader.readAsText(files[0]);
}

/**
 * Discard all blocks from the workspace.
 */
function discard() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 || window.confirm(MSG['discard'].replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    Code.renderContent();
  }
}

/**
 * Bind an event to a function call.
 * @param {!Element} element Element upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {!Function} func Function to call when event is triggered.
 *     W3 browsers will call the function with the event object as a parameter,
 *     MSIE will not.
 */
function bindEvent(element, name, func) {
  if (element.addEventListener) {  // W3C
    element.addEventListener(name, func, false);
  } else if (element.attachEvent) {  // IE
    element.attachEvent('on' + name, func);
  }
}

function uploadCode(code, callback) {
    var target = document.getElementById('content_arduino');
    var spinner = new Spinner().spin(target);

    var url = "http://127.0.0.1:8080/";
    var method = "POST";

    // You REALLY want async = true.
    // Otherwise, it'll block ALL execution waiting for server response.
    var async = true;

    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState != 4) { 
            return; 
        }
        
        spinner.stop();
        
        var status = parseInt(request.status); // HTTP response status, e.g., 200 for "200 OK"
        var errorInfo = null;
        switch (status) {
        case 200:
            break;
        case 0:
            errorInfo = "code 0\n\nCould not connect to server at " + url + ".  Is the local web server running?";
            break;
        case 400:
            errorInfo = "code 400\n\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.";
            break;
        case 500:
            errorInfo = "code 500\n\nUpload failed.  Is the Arduino connected to USB port?";
            break;
        case 501:
            errorInfo = "code 501\n\nUpload failed.  Is 'ino' installed and in your path?  This only works on Mac OS X and Linux at this time.";
            break;
        default:
            errorInfo = "code " + status + "\n\nUnknown error.";
            break;
        };
        
        callback(status, errorInfo);
    };

    request.open(method, url, async);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(code);	     
}

function uploadClick() {
    var code = document.getElementById('textarea_arduino').value;

    alert("Ready to upload to Arduino.\n\nNote: this only works on Mac OS X and Linux at this time.");
    
    uploadCode(code, function(status, errorInfo) {
        if (status == 200) {
            alert("Program uploaded ok");
        } else {
            alert("Error uploading program: " + errorInfo);
        }
    });
}

function resetClick() {
    var code = "void setup() {} void loop() {}";

    uploadCode(code, function(status, errorInfo) {
        if (status != 200) {
            alert("Error resetting program: " + errorInfo);
        }
    });
}

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
function bindClick(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

/**
 * Binds functions to each of the buttons, nav links, and related.
 */
function bindFunctions() {
  // Navigation buttons
  bindClick('btn_delete', discard);
  bindClick('button_saveXML',  saveXmlFile);
  bindClick('button_saveArduino',  saveArduinoFile);

  var pinout = document.getElementById('pinout');
  bindEvent(pinout, 'change', arduino_card);

  var loadInput = document.getElementById('load');
  bindEvent(loadInput, 'change', load);
  bindClick('button_fakeload', function() {loadInput.click(); });

  for (var i = 0; i < Code.TABS_.length; i++) {
	    var name = Code.TABS_[i];
	    bindClick('tab_' + name,
		        function(name_) {return function() {Code.tabClick(name_);};}(name));
  }

  bindClick('btn_size',  Code.changeSize);
  bindClick('btn_config',  openConfigToolbox);

  bindClick('select_all',  checkAll);
  bindClick('btn_valid',  changeToolbox);
  
};

/**
 * checks all checkboxes in modal "configModal"
 */
function checkAll() {
    if(this.checked) {
        // Iterate each checkbox
        $('#modal-body input:checkbox').each(function() {
            this.checked = true;
        });
    } 
      else {
      $('#modal-body input:checkbox').each(function() {
            this.checked = false;
        });
    }
}

/**
 * Build modal to configure ToolBox
 */
function openConfigToolbox() {
	var modalbody = document.getElementById("modal-body");
	// load all xml toolboxes
	var xmls = document.getElementsByTagName("xml");
	// load the toolboxes id's stored in session
	var loadIds = window.sessionStorage.toolboxids;
	
	if (loadIds === undefined) {
		loadIds = "CAT_LOGIC";
	}

	var i, n, ligne;
	// clear modal
	modalbody.innerHTML = "";
	// create a checkbox for each toolbox 
	for (i = 0; i < xmls.length; i++) {
		n = loadIds.search(xmls[i].id);
		// checks if toolbox was already chosen
		if (n >= 0) {
			ligne = '<input type="checkbox" checked="checked" name="checkbox_'
					+ i + '" id="checkbox_' + xmls[i].id + '"/> '
					+ Blockly.Msg[xmls[i].id] + '<br/>';
		} else {
			ligne = '<input type="checkbox" name="checkbox_' + i
					+ '" id="checkbox_' + xmls[i].id + '"/> '
					+ Blockly.Msg[xmls[i].id] + '<br/>';
		}
		modalbody.innerHTML += ligne;
	}

	// checks if "selec_all" checkbox was already chosen
	n = loadIds.search("select_all");
	if (n >= 0) {
		document.getElementById("select_all").checked = true;
	}
}

/**
 * Change the ToolBox following the chosen configuration
 */
function changeToolbox() {
	// Store the blocks for the duration of the reload.
	// This should be skipped for the index page, which has no blocks and does
	// not load Blockly.
	// MSIE 11 does not support sessionStorage on file:// URLs.
	if (typeof Blockly != 'undefined' && window.sessionStorage) {
		var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		var text = Blockly.Xml.domToText(xml);
		window.sessionStorage.loadOnceBlocks = text;
	}
	
	// read the toolboxes id's from the checkboxes
	var toolboxIds = [];
	$('#modal-body input:checkbox').each(function() {
		if (this.checked == true) {
			var xmlid = this.id;
			toolboxIds.push(xmlid.replace("checkbox_", ""));
		}
	});

	if (document.getElementById("select_all").checked == true) {
			toolboxIds.push("select_all");
		}

	// store id's in session
	window.sessionStorage.toolboxids = toolboxIds;

	// reload ...
	window.location = window.location;
}
