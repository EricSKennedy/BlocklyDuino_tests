//http://www.seeedstudio.com/wiki/GROVE_System
//http://www.seeedstudio.com/depot/index.php?main_page=advanced_search_result&search_in_description=1&keyword=grovefamily
//support starter bundle example http://www.seeedstudio.com/wiki/GROVE_-_Starter_Kit_V1.1b

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
 * @fileoverview Helper functions for generating seeeduino grove blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

goog.provide('Blockly.Blocks.grove');

goog.require('Blockly.Blocks');

Blockly.Blocks['grove_led'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_LED_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_LED_INPUT1)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e0/LED1.jpg/400px-LED1.jpg", 64, 64))
	this.appendValueInput("NUM", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.GROVE_INOUT_LED_INPUT2);		
    //this.setInputsInline(true);
	this.appendDummyInput("")
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.GROVE_INOUT_LED_INPUT3)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.GROVE_INOUT_LED_TOOLTIP);
  }
};

Blockly.Blocks['grove_button'] = {
  init: function() {
    this.setColour(190);
    this.setHelpUrl(Blockly.Msg.GROVE_INOUT_BUTTON_HELPURL);
	this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_BUTTON_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/9/93/Button1.jpg/400px-Button1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_BUTTON_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN');
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.GROVE_INOUT_BUTTON_TOOLTIP);
  }
};

Blockly.Blocks['grove_rotary_angle'] = {
  init: function() {
    this.setColour(10);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_ROT_ANGLE_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_ROT_ANGLE_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/5/59/Potentiometer1.jpg/400px-Potentiometer1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_ROT_ANGLE_INPUT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "PIN");
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.GROVE_INOUT_ROT_ANGLE_TOOLTIP);
  }
};

Blockly.Blocks['grove_tilt_switch'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_TILT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_TILT_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/9/95/Tilt1.jpg/400px-Tilt1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_TILT_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.GROVE_INOUT_TILT_TOOLTIP);
  }
};

Blockly.Blocks['grove_piezo_buzzer'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_BUZZER_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_BUZZER_TEXT1)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/ed/Buzzer1.jpg/400px-Buzzer1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_BUZZER_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendField(Blockly.Msg.GROVE_INOUT_BUZZER_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.GROVE_INOUT_BUZZER_TOOLTIP);
  }
};

Blockly.Blocks['grove_relay'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_RELAY_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_RELAY_TEXT1)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/0/04/Twig-Relay1.jpg/400px-Twig-Relay1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_RELAY_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendField(Blockly.Msg.GROVE_INOUT_RELAY_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.GROVE_INOUT_RELAY_TOOLTIP);
  }
};

Blockly.Blocks['grove_temporature_sensor'] = {
  init: function() {
    this.setColour(10);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_TEMP_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_TEMP_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/b/b0/Temperature1.jpg/400px-Temperature1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_TEMP_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN")
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.GROVE_INOUT_TEMP_TOOLTIP);
  }
};

Blockly.Blocks['grove_serial_lcd_print'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_LCD_PRINT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_PRINT_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/6/6a/LCD1.jpg/400px-LCD1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_PRINT_INPUT1)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendValueInput("TEXT", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_PRINT_INPUT2);
    this.appendValueInput("TEXT2", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_PRINT_INPUT3)
    this.appendValueInput("DELAY_TIME", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_PRINT_INPUT4);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.GROVE_INOUT_LCD_PRINT_TOOLTIP);
  }
};

//grove lcd power on/off
Blockly.Blocks['grove_serial_lcd_power'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_LCD_POWER_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_POWER_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/6/6a/LCD1.jpg/400px-LCD1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_POWER_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_POWER_STATE)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN_ONOFF), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.GROVE_INOUT_LCD_POWER_TOOLTIP);
  }
};

//scroll left/right/no scroll/blink/noblink
Blockly.Blocks['grove_serial_lcd_effect'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_LCD_EFFECT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_EFFECT_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/6/6a/LCD1.jpg/400px-LCD1.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_EFFECT_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.GROVE_INOUT_LCD_EFFECT_EFFECT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.GROVE_INOUT_LCD_EFFECT_EFFECT_EFFECT), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.GROVE_INOUT_LCD_EFFECT_TOOLTIP);
  }
};

Blockly.Blocks['grove_sound_sensor'] = {
  init: function() {
    this.setColour(10);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_SOUND_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_SOUND_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e3/Twig-Sound-sensor.jpg/400px-Twig-Sound-sensor.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_SOUND_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN")
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.GROVE_INOUT_SOUND_TOOLTIP);
  }
};

Blockly.Blocks['grove_pir_motion_sensor'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_PIR_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_PIR_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/f/fd/Twig-PIR_Motion_Sensor.jpg/400px-Twig-PIR_Motion_Sensor.jpg", 64, 64))
        .appendField(Blockly.Msg.GROVE_INOUT_PIR_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.GROVE_INOUT_PIR_TOOLTIP);
  }
};

Blockly.Blocks['grove_line_finder'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_LINE_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_LINE_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/8/82/Grovelinefinder1.jpg/400px-Grovelinefinder1.jpg", 64, 64))
	      .appendField("PIN#")
	      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.GROVE_INOUT_LINE_TOOLTIP);
  }
};

Blockly.Blocks['grove_ultrasonic_ranger'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_ULTRASONIC_HELPURL);
    this.appendDummyInput()
	      .appendField(Blockly.Msg.GROVE_INOUT_ULTRASONIC_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/b/b0/Twig_-_Ultrasonic_Ranger2.jpg/200px-Twig_-_Ultrasonic_Ranger2.jpg", 64, 64))
	      .appendField(Blockly.Msg.GROVE_INOUT_ULTRASONIC_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendField(Blockly.Msg.GROVE_INOUT_ULTRASONIC_UNIT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.GROVE_INOUT_ULTRASONIC_UNIT_CHOICE), "UNIT");
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.GROVE_INOUT_ULTRASONIC_TOOLTIP);
  }
};

Blockly.Blocks['grove_motor_shield'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_MOTOR_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.GROVE_INOUT_MOTOR_TEXT)
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/4/4d/Smotoshield2.jpg/400px-Smotoshield2.jpg", 64, 64))
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.GROVE_INOUT_MOTOR_CHOICE), "DIRECTION");
    /*this.appendValueInput("SPEED", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed");*/
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.GROVE_INOUT_MOTOR_TOOLTIP);
  }
};

Blockly.Blocks['grove_thumb_joystick'] = {
  helpUrl: 'http://www.seeedstudio.com/wiki/Grove_-_Thumb_Joystick',
  init: function() {
    this.setColour(10);
    this.appendDummyInput()
	.appendField("Thumb Joystick")
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e0/Twig_-_Thumb_Joystick_v0.9b.jpg/200px-Twig_-_Thumb_Joystick_v0.9b.jpg", 64, 64))
	.appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN")
        .appendField("axis")
        .appendField(new Blockly.FieldDropdown([["x", "x"],  ["y", "y"]]), "AXIS");
    this.setOutput(true, 'Number');
this.setTooltip('output two analog values(200~800) representing two directions');
  }
};

Blockly.Blocks['grove_rgb_led'] = {
  helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=Twig_-_Chainable_RGB_LED',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
  .appendField("Chainable RGB LED")
        .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/chanbalelednb1.jpg", 64, 64))
  .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendDummyInput("COLOR0")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color 1")
        .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    this.setMutator(new Blockly.Mutator(['grove_rgb_led_item']));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('256 color LED, currently Chainable feature is not support');
    this.itemCount_ = 1;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    for (var x = 0; x < this.itemCount_; x++) {
      var colour_rgb = this.getFieldValue('RGB0');
      //alert(colour_rgb);
      container.setAttribute('RGB' + x, colour_rgb);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('COLOR' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var color = window.parseInt(xmlElement.getAttribute('RGB'+x), "#00ff00");
      var input = this.appendDummyInput('COLOR' + x);
      //if (x == 0) {
        input.setAlign(Blockly.ALIGN_RIGHT)
             .appendField("Color "+(x+1))
             .appendField(new Blockly.FieldColour(color), "RGB" + x);
      //}
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('COLOR0')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Color 1")
          .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'grove_rgb_led_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'grove_rgb_led_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('COLOR0');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        //console.log("cnt:"+x);
        this.removeInput('COLOR' + x);
      }
    }
    /*var top;
    if(this.itemCount_ > 0){
      top = this.itemCount_-1;
    } else {
      top = 0;
    }
    console.log("top:"+top);*/
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var colour_rgb = this.getFieldValue('RGB' + this.itemCount_);
      if(colour_rgb==null){
          colour_rgb = "00ff00";
      }
      //console.log("blk:"+this.itemCount_);
      /*if(top>this.itemCount_){
        this.removeInput('COLOR' + this.itemCount_);
      }*/
      var input = this.appendDummyInput('COLOR' + this.itemCount_);
      //if (this.itemCount_ == 0) {
        input.setAlign(Blockly.ALIGN_RIGHT)
             .appendField("Color " + (this.itemCount_+1))
             .appendField(new Blockly.FieldColour(colour_rgb), "RGB" + this.itemCount_);
      //}
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('COLOR0')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Color 1")
          .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    }
  }
  /*saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('COLOR' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }*/
};

Blockly.Blocks['grove_rgb_led_container'] = {
  // Container.
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Container");
    this.appendStatementInput('STACK');
    this.setTooltip("Add, remove items to reconfigure this chain");
    this.contextMenu = false;
  }
};

Blockly.Blocks['grove_rgb_led_item'] = {
  // Add items.
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add an item to the chain");
    this.contextMenu = false;
  }
};

Blockly.Blocks['grove_bluetooth_slave'] = {
  init: function() {
    this.setColour(190);
	this.setHelpUrl(Blockly.Msg.GROVE_INOUT_BT_HELPURL);
    this.appendDummyInput()
      .appendField(Blockly.Msg.GROVE_INOUT_BT_COMM1)
      .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/6/66/Twigbt00.jpg", 64, 64))
      .appendField(Blockly.Msg.GROVE_INOUT_BT_COMM2)
      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.GROVE_INOUT_BT_COMM3)
      .appendField(new Blockly.FieldTextInput('blocklyduino'), 'NAME');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.GROVE_INOUT_BT_COMM4)
      .appendField(new Blockly.FieldTextInput('0000'), 'PINCODE');
    this.appendStatementInput("RCV")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.GROVE_INOUT_BT_COMM5);
    this.appendStatementInput("SNT")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.GROVE_INOUT_BT_COMM6);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Bluetooth V2.0+EDR slave. Support single slave per board');
  }
};