/**
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

Code.TOOLBOX_NAME = {
		'standard':'standard',
		'arduino':'Arduino',
		'grove':'Grove',		
		'technozone51':'TechnoZone51'
};
/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he'];

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

/**
 * Get the toolbox selected from the URL.
 * @return {string} selectd toolbox.
 */
Code.getToolbox = function() {
  var toolbox = Code.getStringParamFromUrl('toolbox', '');
  if (Code.TOOLBOX_NAME[toolbox] === undefined) {
    // Default to Arduino.
	  toolbox = 'arduino';
  }
  return toolbox;
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
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
	delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
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
 * Save the blocks and reload with a different toolbox.
 */
Code.changeToolbox = function() {
  // Store the blocks for the duration of the reload.
  // This should be skipped for the index page, which has no blocks and does
  // not load Blockly.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (typeof Blockly != 'undefined' && window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var toolboxMenu = document.getElementById('toolboxMenu');
  var newToolbox = encodeURIComponent(
		  toolboxMenu.options[toolboxMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?toolbox=' + newToolbox;
  } else if (search.match(/[?&]toolbox=[^&]*/)) {
    search = search.replace(/([?&]toolbox=)[^&]*/, '$1' + newToolbox);
  } else {
    search = search.replace(/\?/, '?toolbox=' + newToolbox + '&');
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
 * User's toolbox (e.g. "standard").
 * @type string
 */
Code.TOOLBOX = Code.getToolbox();

/**
 * List of tab names.
 * @private
 */
//Code.TABS_ = ['blocks', 'javascript', 'python', 'dart', 'xml'];
Code.TABS_ = ['blocks', 'arduino', 'term', 'xml'];

Code.selected = 'blocks';

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

  // Disable the link button if page isn't backed by App Engine storage.
  var linkButton = document.getElementById('linkButton');
  if ('BlocklyStorage' in window) {
    BlocklyStorage['HTTPREQUEST_ERROR'] = MSG['httpRequestError'];
    BlocklyStorage['LINK_ALERT'] = MSG['linkAlert'];
    BlocklyStorage['HASH_ERROR'] = MSG['hashError'];
    BlocklyStorage['XML_ERROR'] = MSG['xmlError'];
    bindClick(linkButton, BlocklyStorage.link);
  } else if (linkButton) {
    linkButton.className = 'disabled';
  }

  injectBlockly(document.getElementById('content_blocks'), 'blocks/toolbox/'+ Code.getToolbox() + '.xml', Code.isRtl());
  
  Code.tabClick(Code.selected);
  Blockly.fireUiEvent(window, 'resize');
  
  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload();
  }

  Code.loadBlocks('');

  bindFunctions();
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

  // Populate the toolbox selection menu.
  var toolboxes = [];
  for (var toolbox in Code.TOOLBOX_NAME) {
    toolboxes.push([Code.TOOLBOX_NAME[toolbox], toolbox]);
  }
  var toolboxMenu = document.getElementById('toolboxMenu');
  toolboxMenu.options.length = 0;
  for (var i = 0; i < toolboxes.length; i++) {
    var tuple = toolboxes[i];
    var option = new Option(tuple[0], tuple[1]);
    if (tuple[1] == Code.TOOLBOX) {
      option.selected = true;
    }
    toolboxMenu.options.add(option);
  }
  toolboxMenu.addEventListener('change', Code.changeToolbox,true);
  
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

  document.getElementById('labelToolbox').textContent = MSG['labelToolbox'];
  document.getElementById('labelArduinoCard').textContent = MSG['labelArduinoCard'];

  document.getElementById('span_material').textContent = MSG['span_material'];
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

};

//Load the Code demo's language strings.
document.write('<script src="lang/msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="lang/blocks/' + Code.LANG + '.js"></script>\n');

window.addEventListener('load', Code.init);
