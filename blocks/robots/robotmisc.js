/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview Helper functions for generating sensor blocks - sumo robots
 * Written to facilitate programming of sumo and mini-sumo robots
 * Thanks to Fred Lin for building BlockyDuino!
 * @author erickennedy@outlook.com  Eric Kennedy
 */

goog.provide('Blockly.Blocks.sensors');

goog.require('Blockly.Blocks');

Blockly.Blocks['setup_button_wait_il'] = {
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ROBOTS_MISC_SETUP_GEN_TITLE)
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setTooltip(Blockly.Msg.ROBOTS_MISC_SETUP_GEN_TOOLTIP);
 this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
 }
};

Blockly.Blocks['setup_button_wait_iph'] = {
  init: function() {
	this.setHelpUrl(Blockly.Msg.ROBOTS_MISC_ZUMO_HELPURL);
    this.setColour(190);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ROBOTS_MISC_SETUP_ZUMO_TITLE)
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setTooltip(Blockly.Msg.ROBOTS_MISC_SETUP_ZUMO_TOOLTIP );
 this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
 }
};

Blockly.Blocks['fourpin_ranger'] = {
  init: function() {
    this.setColour(190);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.ROBOTS_MISC_FOUR_PIN_RANGER_TITLE)
		.appendField(Blockly.Msg.ROBOTS_MISC_TRIGGER_PIN)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
		this.setInputsInline(false);
	this.appendDummyInput()
		.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/robots/fourpin_range.jpg', 40, 40)) 
		.appendField(Blockly.Msg.ROBOTS_MISC_ECHO_PIN )
       .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN2")
	   .setAlign(Blockly.ALIGN_RIGHT)
	this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.ROBOTS_MISC_FOUR_PIN_RANGER_TOOLTIP);
  }
};

Blockly.Blocks['play_notes_z'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.ROBOTS_MISC_ZUMO_BUZZER_HELPURL);
    this.setColour(210);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.ROBOTS_MISC_ZUMO_BUZZER_TITLE)
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_C(3)", "NOTE_C(3)"],[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_D(3)", "NOTE_D(3)"],
		[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_E(3)", "NOTE_E(3)"],[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_F(3)", "NOTE_F(3)"],[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_G(3)", "NOTE_G(3)"],
		[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_A(3)", "NOTE_A(3)"],[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_B(3)", "NOTE_B(3)"],[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_C(2)", "NOTE_C(2)"],
		[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_D(2)", "NOTE_D(2)"],[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_E(2)", "NOTE_E(2)"],[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_F(2)", "NOTE_F(2)"],
		[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_G(2)", "NOTE_G(2)"], [Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_A(2)", "NOTE_A(2)"],[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_B(1)", "NOTE_B(1)"],
		[Blockly.Msg.ROBOTS_MISC_BUZZER_NOTE+"_C(1)", "NOTE_C(1)"]]), "NOTE");
	this.setInputsInline(true) ;
    this.appendValueInput("DUR", 'Number')
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ROBOTS_MISC_BUZZER_DURATION)
    this.appendValueInput("VOL", 'Number')
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ROBOTS_MISC_BUZZER_VOLUME)
     this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ROBOTS_MISC_ZUMO_BUZZER_TOOLTIP);
  }
};



