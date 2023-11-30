/** @page JAVASCRIPT DOCUMENT
*	      UTF-8
*
/*  WebHMI client: Boiler - BH50.
*
*   Copyright (C) 2020 ATgroup09 (atgroup09@gmail.com)
*
*   The JavaScript code in this page is free software: you can
*   redistribute it and/or modify it under the terms of the GNU
*   General Public License (GNU GPL) as published by the Free Software
*   Foundation, either version 3 of the License, or (at your option)
*   any later version.  The code is distributed WITHOUT ANY WARRANTY;
*   without even the implied warranty of MERCHANTABILITY or FITNESS
*   FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
*
*   As additional permission under GNU GPL version 3 section 7, you
*   may distribute non-source (e.g., minimized or compacted) forms of
*   that code without the copy of the GNU GPL normally required by
*   section 4, provided you include this license notice and a URL
*   through which recipients can access the Corresponding Source.
*/

/** Dependencies:
 *    + mod/ui-hmi-v2.min.js
 *    + mod/ui-hmi-v2.min.css
 */


/*
@brief  Set position of BitLamp-node in the center of Case-node.
@param  CaseIdIn        - case ID. [STRING]
@param  BitLampIdIn     - BitLampBlink-node ID. [STRING]
@param  BitLampHeightIn - BitLampBlink-node height. [NUMBER]
@param  BitLampWidthIn  - BitLampBlink-node weight. [NUMBER]
@return None.
*/
function Main_SetBitLampBlinkPos(CaseIdIn, BitLampIdIn, BitLampHeightIn, BitLampWidthIn)
{
	var CaseNode = $(("#"+CaseIdIn));
	var x = (CaseNode[0].offsetLeft + (CaseNode[0].offsetWidth/2)  - (BitLampWidthIn/2));
    var y = (CaseNode[0].offsetTop  + (CaseNode[0].offsetHeight/2) - (BitLampHeightIn/2));
    
    var BitLampNode = $(("#"+BitLampIdIn));
	BitLampNode.css('left', (''+x+"px"));
	BitLampNode.css('top',  (''+y+"px"));
	BitLampNode.hide();
}


/*
@brief  Inititialize UI.
@param  None.
@return None.
*/
function Main_InitUI()
{
	if(typeof initUI == "function")
	{
		var WsUri = "ws://127.0.0.1:8100";
		var WsID  = "wsSCADA";
	
		var WsOpts = {
						K1TSt: { DataKey:"K1TSt", div:10, byRiseEdge:true, setNode:"K1TSt", NodeAlg:"Text" },
						K1TPd: { DataKey:"K1TPd", div:10, byRiseEdge:true, setNode:"K1TPd", NodeAlg:"Text" },
					   K1TOil: { DataKey:"K1TOil", div:10, byRiseEdge:true, setNode:"K1TOil", NodeAlg:"Text" },
					   K1PAir: { DataKey:"K1PAir", div:100, byRiseEdge:true, setNode:"K1PAir", NodeAlg:"Text" },
					   K1Mode: { DataKey:"K1Mode", fromArray:G_RES[G_LANG]["Mode"], Default:"---", byRiseEdge:true, setNode:"K1Mode", NodeAlg:"Text" },
					  K1FlAir: { DataKey:"K1FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], byRiseEdge:true, setNode:"K1FlAir", NodeAlg:"Text" },
					  K1LvOil: { DataKey:"K1LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], byRiseEdge:true, setNode:"K1LvOil", NodeAlg:"Text" },
					  
				    K1ModeErr: { DataKey:"K1Mode", bySetpoint:2, SetpointAlg:"equ", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			   K1ModeErrClass: { DataKey:"K1Mode", fromArray:G_RES[G_LANG]["ModeErrClass"], Default:"", byRiseEdge:true, setNode:"K1Mode", NodeAlg:"Attr", NodeAttr:"class" },
					K1ModeLog: { DataKey:"K1Mode", fromArray:G_RES[G_LANG]["Mode"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:G_RES[G_LANG]["K1"], LogColor:G_RES[G_LANG]["ModeColor"] },
			   
				   K1FlAirErr: { DataKey:"K1FlAir", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			  K1FlAirErrClass: { DataKey:"K1FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAirErrClass"], Default:"", byRiseEdge:true, setNode:"K1FlAir", NodeAlg:"Attr", NodeAttr:"class" },
			       K1FlAirLog: { DataKey:"K1FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["FlAir"]), LogColor:G_RES[G_LANG]["FlAirColor"] },
			  
				   K1LvOilErr: { DataKey:"K1LvOil", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			  K1LvOilErrClass: { DataKey:"K1LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOilErrClass"], Default:"", byRiseEdge:true, setNode:"K1LvOil", NodeAlg:"Attr", NodeAttr:"class" },
			       K1LvOilLog: { DataKey:"K1LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["LvOil"]), LogColor:G_RES[G_LANG]["LvOilColor"] },
					 
					 K1TStErr: { DataKey:"K1TSt", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			    K1TStErrTitle: { DataKey:"K1TSt", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1TSt", NodeAlg:"Attr", NodeAttr:"title" },
				K1TStErrClass: { DataKey:"K1TSt", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1TSt", NodeAlg:"Attr", NodeAttr:"class" },
				  K1TStErrLog: { DataKey:"K1TSt", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["TSt"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
			         
					 K1TPdErr: { DataKey:"K1TPd", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
				K1TPdErrTitle: { DataKey:"K1TPd", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1TPd", NodeAlg:"Attr", NodeAttr:"title" },
				K1TPdErrClass: { DataKey:"K1TPd", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1TPd", NodeAlg:"Attr", NodeAttr:"class" },
				  K1TPdErrLog: { DataKey:"K1TPd", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["TPd"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  
				    K1TOilErr: { DataKey:"K1TOil", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			   K1TOilErrTitle: { DataKey:"K1TOil", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1TOil", NodeAlg:"Attr", NodeAttr:"title" },
			   K1TOilErrClass: { DataKey:"K1TOil", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1TOil", NodeAlg:"Attr", NodeAttr:"class" },
				 K1TOilErrLog: { DataKey:"K1TOil", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["TOil"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					 
					K1PAirErr: { DataKey:"K1PAir", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			   K1PAirErrTitle: { DataKey:"K1PAir", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1PAir", NodeAlg:"Attr", NodeAttr:"title" },
			   K1PAirErrClass: { DataKey:"K1PAir", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1PAir", NodeAlg:"Attr", NodeAttr:"class" },
				 K1PAirErrLog: { DataKey:"K1PAir", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["PAir"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					 
					  K1Alarm: { DataKey:"K1Alarm", bySetpoint:0, SetpointAlg:"gtr", setNode:"K1Alarm", NodeAlg:"BitLampBlink" },
				  K1AlarmText: { DataKey:"K1Alarm", setNode:"K1AlarmText", NodeAlg:"Text", rstLocCntr:"K1Alarm" }
				 };
		
		initUI(WsUri, WsID, WsOpts);
		
		Main_SetBitLampBlinkPos("K1Case", "K1Alarm", 128, 128);
	}
}

