/**
 * Choose Arduino card : UNO or MEGA
 */
 
/**
 * Injects Blockly into a given HTML element. Reads the toolbox from an XMl
 * file.
 * @param {!Element} el Element to inject Blockly into.
 * @param {!string} toolbox_path String containing the toolbox XML file path.
 */
function injectBlockly(blockly_el, toolbox_path,rtl) {
	  // Create a an XML HTTP request
	  var request = createAJAX();

	  // If file run locally Internet explorer fails here
	  try {
	    request.open("GET", toolbox_path, false);
	  } catch(e) {
	    $('#not_running_dialog').openModal();
	  }

	  // Once file is open, inject blockly into element with the toolbox string
	  request.onreadystatechange = function() {
	    if ( (request.readyState == 4) && (request.status == 200) ) {
	      Blockly.inject(blockly_el, {media: '../media/',
	            rtl: rtl,
	            toolbox: request.responseText});
	    }
	  };

	  // If file run locally Chrome will fail here
	  try {
	    request.send();
	  } catch(e) {
	    $('#not_running_dialog').openModal();
	  }
};

 function arduino_card(){                                                                                     // modified Technozone51
  var Cacheobj=document.getElementById("pinout");
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (myFrame.profile["default"]!=myFrame.profile[Cacheobj.options[Cacheobj.selectedIndex].value]) {
  if (false || window.confirm('Supprimer tout et sélectionner une carte '+myFrame.profile[Cacheobj.options[Cacheobj.selectedIndex].value].description+' ?')) {
    myFrame.profile["default"]=myFrame.profile[Cacheobj.options[Cacheobj.selectedIndex].value];
    document.getElementById("cardpicture").innerHTML = '<img src="'+Cacheobj.options[Cacheobj.selectedIndex].value+'.png" border="0" align="left" height=50/>';
    Blockly.mainWorkspace.clear();
	renderContent();
	}
  }  // modified Technozone51
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
 * Charge le code Arduino depuis pre_arduino
 */
function getFiles(){
    var code = document.getElementById('pre_arduino').textContent;
    code=code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return {"sketch.ino": code }
}

/*
 * Verifie le code Arduino grace au compilerflasher
 */
function verifCodeArduino(){
    compilerflasher = new compilerflasher(getFiles);
    compilerflasher.on("pre_verify", function(){
		$("#debug_arduino").html(MSG['pre_verify']);
    });
    compilerflasher.on("verification_succeed", function(binary_size){
        $("#debug_arduino").html(MSG['verification_succeed'] + binary_size);
    });
    compilerflasher.on("verification_failed", function(error_output){
        $("#debug_arduino").html(MSG['verification_failed'] + error_output);
    });
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
        alert('erreur dans le fichier XML:\n' + e);
        return;
      }
      var count = Blockly.mainWorkspace.getAllBlocks().length;
      if (count && confirm('voulez-vous remplacer les blocs actuels ?\n"Annuler" les fera fusionner.')) {
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
  if (count < 2 || window.confirm('effacer tous les ' + count + ' blocs ?')) {
    Blockly.mainWorkspace.clear();
    renderContent();
  }
}

/*
 * auto save and restore blocks
 */
function auto_save_and_restore_blocks() {
  // Restore saved blocks in a separate thread so that subsequent
  // initialization is not affected from a failed load.
  window.setTimeout(restore_blocks, 0);
  // Hook a save function onto unload.
  bindEvent(window, 'unload', backup_blocks);

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

/**
 * Creates an AJAX request 
 * @return An XML HTTP Request
 */
function createAJAX() {
	  var request;
	  try {
	    // Firefox, Chrome, IE7+, Opera, Safari
	    request = new XMLHttpRequest();
	  } catch (e) {
	    try {
	      // IE6 and earlier
	      request = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	      try {
	        request = new ActiveXObject("Microsoft.XMLHTTP");
	      } catch (e) {
	        throw 'Your browser does not support AJAX. Cannot load toolbox';
	        request = null;
	      }
	    }
	  }
	  return request;
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
 * @private
 */
function bindFunctions() {
  // Navigation buttons
  bindClick('button_delete', discard);
//  bindClick('button_material', shield);
  bindClick('button_saveXML',  saveXmlFile);
  bindClick('button_saveArduino',  saveArduinoFile);
  bindClick('cb_cf_verify_btn',  verifCodeArduino);

  var loadInput = document.getElementById('load');
  bindEvent(loadInput, 'change', load);
  bindClick('button_fakeload', function() {loadInput.click(); });

  for (var i = 0; i < Code.TABS_.length; i++) {
	    var name = Code.TABS_[i];
	    bindClick('tab_' + name,
		        function(name_) {return function() {Code.tabClick(name_);};}(name));
  }

};
