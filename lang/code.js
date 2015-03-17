/**
 * Based on 
 * 
 * Blockly Demos: Code
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
  'ar': 'العربية',
  'be-tarask': 'Taraškievica',
  'br': 'Brezhoneg',
  'ca': 'Català',
  'cs': 'Česky',
  'da': 'Dansk',
  'de': 'Deutsch',
  'el': 'Ελληνικά',
  'en': 'English',
  'es': 'Español',
  'fa': 'فارسی',
  'fr': 'Français',
  'he': 'עברית',
  'hrx': 'Hunsrik',
  'hu': 'Magyar',
  'ia': 'Interlingua',
  'is': 'Íslenska',
  'it': 'Italiano',
  'ja': '日本語',
  'ko': '한국어',
  'mk': 'Македонски',
  'ms': 'Bahasa Melayu',
  'nb': 'Norsk Bokmål',
  'nl': 'Nederlands, Vlaams',
  'oc': 'Lenga d\'òc',
  'pl': 'Polski',
  'pms': 'Piemontèis',
  'pt-br': 'Português Brasileiro',
  'ro': 'Română',
  'ru': 'Русский',
  'sc': 'Sardu',
  'sk': 'Slovenčina',
  'sr': 'Српски',
  'sv': 'Svenska',
  'th': 'ภาษาไทย',
  'tlh': 'tlhIngan Hol',
  'tr': 'Türkçe',
  'uk': 'Українська',
  'vi': 'Tiếng Việt',
  'zh-hans': '簡體中文',
  'zh-hant': '正體中文'
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he'];

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'arduino', 'term', 'xml'];

Code.selected = 'blocks';

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function(name, defaultValue) {
  var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function() {
  var lang = Code.getStringParamFromUrl('lang', '');
  if (Code.LANGUAGE_NAME[lang] === undefined) {
    // Default to English.
    lang = 'en';
  }
  return lang;
};

/*
 * Build the xml using toolboxes checked in config modal and stored in session 
 */
Code.buildToolbox = function() {
	var loadIds = window.sessionStorage.toolboxids;

	// set the default toolbox if none in session
	if (loadIds === undefined || loadIds === "") {
		loadIds = "CAT_LOGIC,CAT_LOOPS";
		window.sessionStorage.toolboxids = loadIds;
	}
	
	var xmlValue = '<xml>';
	var xmlids = loadIds.split(",");
	var element;
	for (var i = 0; i < xmlids.length; i++) {
		element = document.getElementById(xmlids[i]);
		if (element != null) {
			xmlValue += element.innerHTML;
		}
	}
	xmlValue += '</xml>';

	return xmlValue;
};

/**
 * Get the size selected from the URL.
 * 
 * @return {int} selectd size.
 */
Code.getSize = function() {
  var size = Code.getStringParamFromUrl('size', '');
  if (size != 'max') {
	  size = '';
  }
  return size;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function() {
  return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function(defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if (loadOnce) {
    // Language switching stores the blocks during the reload.
	delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } 
};

/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function() {
  // Store the blocks for the duration of the reload.
  // This should be skipped for the index page, which has no blocks and does
  // not load Blockly.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (typeof Blockly != 'undefined' && window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var languageMenu = document.getElementById('languageMenu');
  var newLang = encodeURIComponent(
      languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
    search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + search;
};

/**
 * Maximize/Minimize content blocks div 
 */
Code.changeSize = function() {
  // Store the blocks for the duration of the reload.
  // This should be skipped for the index page, which has no blocks and does
  // not load Blockly.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (typeof Blockly != 'undefined' && window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var search = window.location.search;
  if (search.length <= 1) {
    search = '?size=max';
  } else if (search.match(/[?&]size=[^&]*/)) {
    search = search.replace(/([?&]size=)[^&]*/, '');
    search = search.replace(/\&/, '?');
  } else {
    search = search.replace(/\?/, '?size=max&');
  }

  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + search;
};

/**
 * User's language (e.g. "en").
 * @type string
 */
Code.LANG = Code.getLang();

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function(clickedName) {
  Code.selected = clickedName;

  Code.renderContent();
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  
  if (content.id == 'content_blocks') {
	    // If the workspace was changed by the XML tab, Firefox will have performed
	    // an incomplete rendering due to Blockly being invisible.  Rerender.
	    Blockly.mainWorkspace.render();
	  } else if (content.id == 'content_xml') {
		var xml_content = document.getElementById('pre_xml');
	    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	    xml_content.textContent = Blockly.Xml.domToPrettyText(xmlDom);
	    if (typeof prettyPrintOne == 'function') {
	      var code_html = prettyPrintOne(xml_content.innerHTML, 'xml');
	      xml_content.innerHTML = code_html;
	    }
	  } else if (content.id == 'content_arduino') {
	    var arduino_content = document.getElementById('pre_arduino');
	    arduino_content.textContent = Blockly.Arduino.workspaceToCode();
	    if (typeof prettyPrintOne == 'function') {
	      var code_html = prettyPrintOne(arduino_content.innerHTML, 'cpp');
	      arduino_content.innerHTML = code_html;
	    }
	  }
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
	Code.initLanguage();

	if (Code.getSize() == 'max') {
		// place div on top
		var divBody = document.getElementById("divBody");
		divBody.style.top = "0px";

		// maximize div
		var divTabpanel = document.getElementById("divTabpanel");
		divTabpanel.style.width = "100%";
		divTabpanel.style.height = "100%";
		divTabpanel.style.position = "absolute";
		divTabpanel.style.paddingTop = "0px";

		// hide Title
		var divTitle = document.getElementById("divTitre");
		divTitle.style.display = "none";

		// hide footer
		var divFooter = document.getElementById("divFooter");
		divFooter.style.display = "none";

		// change maximize to minimize
		var icon_btn_size = document.getElementById("icon_btn_size");
		icon_btn_size.className += " rotate180";
	}

	// build Blockly ...
	Blockly.inject(document.getElementById('content_blocks'), {
		media : 'media/',
		rtl : Code.isRtl(),
		toolbox : Code.buildToolbox()
	});

	// set the tab
	Code.tabClick(Code.selected);

	// load blocks stored in session
	Code.loadBlocks('');

	// bind events to html elements
	bindFunctions();

	// load the compilerflasher module
	$(document).ready(
			function() {
				compilerflasher = new compilerflasher(getFiles);
				compilerflasher.on("pre_verify", function() {
					$("#debug_arduino").html(MSG['pre_verify']);
				});
				compilerflasher.on("verification_succeed",
						function(binary_size) {
							$("#debug_arduino").html(
									MSG['verification_succeed'] + binary_size);
						});
				compilerflasher.on("verification_failed",
						function(error_output) {
							$("#debug_arduino").html(
									MSG['verification_failed'] + error_output);
						});
			});
};

/**
 * Initialize the page language.
 */
Code.initLanguage = function() {
  // Set the HTML's language and direction.
  // document.dir fails in Mozilla, use document.body.parentNode.dir instead.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=151407
  var rtl = Code.isRtl();
  document.head.parentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  document.head.parentElement.setAttribute('lang', Code.LANG);

  // Sort languages alphabetically.
  var languages = [];
  for (var lang in Code.LANGUAGE_NAME) {
    languages.push([Code.LANGUAGE_NAME[lang], lang]);
  }
  var comp = function(a, b) {
    // Sort based on first argument ('English', 'Русский', '简体字', etc).
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  };
  languages.sort(comp);

// Populate the language selection menu.
  var languageMenu = document.getElementById('languageMenu');
  languageMenu.options.length = 0;
  for (var i = 0; i < languages.length; i++) {
    var tuple = languages[i];
    var lang = tuple[tuple.length - 1];
    var option = new Option(tuple[0], lang);
    if (lang == Code.LANG) {
      option.selected = true;
    }
    languageMenu.options.add(option);
  }
  languageMenu.addEventListener('change', Code.changeLanguage, true);

  // Inject language strings.
  document.getElementById('title').textContent = MSG['title'];

  document.getElementById('span_config').textContent = MSG['span_config'];
  document.getElementById('labelArduinoCard').textContent = MSG['labelArduinoCard'];

  document.getElementById('span_delete').textContent = MSG['span_delete'];
  document.getElementById('span_saveXML').textContent = MSG['span_saveXML'];
  document.getElementById('span_fakeload').textContent = MSG['span_fakeload'];

  document.getElementById('a_blocks').textContent = MSG['a_blocks'];
  document.getElementById('a_arduino').textContent = MSG['a_arduino'];
  document.getElementById('a_term').textContent = MSG['a_term'];
  document.getElementById('a_xml').textContent = MSG['a_xml'];

  document.getElementById('cb_cf_verify_btn').textContent = MSG['cb_cf_verify_btn'];
  document.getElementById('cb_cf_flash_btn').textContent = MSG['cb_cf_flash_btn'];
  document.getElementById('button_saveArduino').textContent = MSG['button_saveArduino'];
  document.getElementById('cb_cf_serial_monitor_connect').textContent = MSG['cb_cf_serial_monitor_connect'];

  document.getElementById('configModalLabel').textContent = MSG['configModalLabel'];
  document.getElementById('span_select_all').textContent = MSG['span_select_all'];
  document.getElementById('btn_close').textContent = MSG['btn_close'];
  document.getElementById('btn_valid').textContent = MSG['btn_valid'];

};

//Load the Code demo's language strings.
document.write('<script src="lang/msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="lang/blocks/' + Code.LANG + '.js"></script>\n');

window.addEventListener('load', Code.init);
