/** @page JAVASCRIPT DOCUMENT
*	      UTF-8
*
/*  WebHMI-client / Main
*
*   Copyright (C) 2022 ATgroup09 (atgroup09@gmail.com)
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
 *    + mod/hmi-v3.js.js
 *    + mod/ui-hmi-v3.js
 *    + mod/ui-hmi-v3.css
 */


/*
@brief  Set position of BitLamp-node in the center of Case-node.
@param  CaseIdIn        - Ñase ID. [STRING]
@param  BitLampIdIn     - BitLamp-node ID. [STRING]
@param  BitLampHeightIn - BitLamp-node height. [NUMBER]
@param  BitLampWidthIn  - BitLamp-node weight. [NUMBER]
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
		//URI of WebHMI-server (data-server)
		var WsIP = "ws://127.0.0.1:8101";
		
		//ID of WebHMI-server (data-server)
		var WsID = "wsCompress";
		
		//Settings of tags (link data with WebHMI-content)
		var WsOpts = {
						K1TSt: { DataKey:"K1TSt", div:10, byRiseEdge:true, setNode:"K1TSt", NodeAlg:"Text" },
					 K1TStErr: { DataKey:"K1TSt", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			    K1TStErrTitle: { DataKey:"K1TSt", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1TSt", NodeAlg:"Attr", NodeAttr:"title" },
				K1TStErrClass: { DataKey:"K1TSt", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1TSt", NodeAlg:"Attr", NodeAttr:"class" },
				  K1TStErrLog: { DataKey:"K1TSt", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["TSt"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					    K1TPd: { DataKey:"K1TPd", div:10, byRiseEdge:true, setNode:"K1TPd", NodeAlg:"Text" },
					 K1TPdErr: { DataKey:"K1TPd", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
				K1TPdErrTitle: { DataKey:"K1TPd", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1TPd", NodeAlg:"Attr", NodeAttr:"title" },
				K1TPdErrClass: { DataKey:"K1TPd", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1TPd", NodeAlg:"Attr", NodeAttr:"class" },
				  K1TPdErrLog: { DataKey:"K1TPd", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["TPd"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					   K1TOil: { DataKey:"K1TOil", div:10, byRiseEdge:true, setNode:"K1TOil", NodeAlg:"Text" },
				    K1TOilErr: { DataKey:"K1TOil", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			   K1TOilErrTitle: { DataKey:"K1TOil", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1TOil", NodeAlg:"Attr", NodeAttr:"title" },
			   K1TOilErrClass: { DataKey:"K1TOil", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1TOil", NodeAlg:"Attr", NodeAttr:"class" },
				 K1TOilErrLog: { DataKey:"K1TOil", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["TOil"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  K1LvOil: { DataKey:"K1LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], byRiseEdge:true, setNode:"K1LvOil", NodeAlg:"Text" },	
				   K1LvOilErr: { DataKey:"K1LvOil", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			  K1LvOilErrClass: { DataKey:"K1LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOilErrClass"], Default:"", byRiseEdge:true, setNode:"K1LvOil", NodeAlg:"Attr", NodeAttr:"class" },
			       K1LvOilLog: { DataKey:"K1LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["LvOil"]), LogColor:G_RES[G_LANG]["LvOilColor"] },
					   K1PAir: { DataKey:"K1PAir", div:100, byRiseEdge:true, setNode:"K1PAir", NodeAlg:"Text" },
					K1PAirErr: { DataKey:"K1PAir", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			   K1PAirErrTitle: { DataKey:"K1PAir", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1PAir", NodeAlg:"Attr", NodeAttr:"title" },
			   K1PAirErrClass: { DataKey:"K1PAir", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1PAir", NodeAlg:"Attr", NodeAttr:"class" },
				 K1PAirErrLog: { DataKey:"K1PAir", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["PAir"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  K1FlAir: { DataKey:"K1FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], byRiseEdge:true, setNode:"K1FlAir", NodeAlg:"Text" }, 
				   K1FlAirErr: { DataKey:"K1FlAir", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			  K1FlAirErrClass: { DataKey:"K1FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAirErrClass"], Default:"", byRiseEdge:true, setNode:"K1FlAir", NodeAlg:"Attr", NodeAttr:"class" },
			       K1FlAirLog: { DataKey:"K1FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["FlAir"]), LogColor:G_RES[G_LANG]["FlAirColor"] },   
					      K1A: { DataKey:"K1A", byRiseEdge:true, setNode:"K1A", NodeAlg:"Text" },
				       K1AErr: { DataKey:"K1A", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			      K1AErrTitle: { DataKey:"K1A", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K1A", NodeAlg:"Attr", NodeAttr:"title" },
			      K1AErrClass: { DataKey:"K1A", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K1A", NodeAlg:"Attr", NodeAttr:"class" },
				    K1AErrLog: { DataKey:"K1A", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K1"] + " / " + G_RES[G_LANG]["Sens"]["A"]), LogColor:G_RES[G_LANG]["SensErrColor"] },		  
					   K1Mode: { DataKey:"K1Mode", fromArray:G_RES[G_LANG]["Mode"], Default:"---", byRiseEdge:true, setNode:"K1Mode", NodeAlg:"Text" },
				    K1ModeErr: { DataKey:"K1Mode", bySetpoint:2, SetpointAlg:"equ", Break:true, setLocCntr:"K1Alarm", LocCntrAlg:"Inc" },
			   K1ModeErrClass: { DataKey:"K1Mode", fromArray:G_RES[G_LANG]["ModeErrClass"], Default:"", byRiseEdge:true, setNode:"K1Mode", NodeAlg:"Attr", NodeAttr:"class" },
					K1ModeLog: { DataKey:"K1Mode", fromArray:G_RES[G_LANG]["Mode"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:G_RES[G_LANG]["K1"], LogColor:G_RES[G_LANG]["ModeColor"] },
				  K1AlarmCntr: { DataKey:"K1Alarm", setNode:"K1AlarmCntr", NodeAlg:"Text" },
					  K1Alarm: { DataKey:"K1Alarm", bySetpoint:0, SetpointAlg:"gtr", setNode:"K1Alarm", NodeAlg:"BitLampBlink", rstLocCntr:"K1Alarm" },
					  
					    K2TSt: { DataKey:"K2TSt", div:10, byRiseEdge:true, setNode:"K2TSt", NodeAlg:"Text" },
					 K2TStErr: { DataKey:"K2TSt", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K2Alarm", LocCntrAlg:"Inc" },
			    K2TStErrTitle: { DataKey:"K2TSt", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K2TSt", NodeAlg:"Attr", NodeAttr:"title" },
				K2TStErrClass: { DataKey:"K2TSt", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K2TSt", NodeAlg:"Attr", NodeAttr:"class" },
				  K2TStErrLog: { DataKey:"K2TSt", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K2"] + " / " + G_RES[G_LANG]["Sens"]["TSt"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					    K2TPd: { DataKey:"K2TPd", div:10, byRiseEdge:true, setNode:"K2TPd", NodeAlg:"Text" },
					 K2TPdErr: { DataKey:"K2TPd", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K2Alarm", LocCntrAlg:"Inc" },
				K2TPdErrTitle: { DataKey:"K2TPd", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K2TPd", NodeAlg:"Attr", NodeAttr:"title" },
				K2TPdErrClass: { DataKey:"K2TPd", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K2TPd", NodeAlg:"Attr", NodeAttr:"class" },
				  K2TPdErrLog: { DataKey:"K2TPd", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K2"] + " / " + G_RES[G_LANG]["Sens"]["TPd"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					   K2TOil: { DataKey:"K2TOil", div:10, byRiseEdge:true, setNode:"K2TOil", NodeAlg:"Text" },
				    K2TOilErr: { DataKey:"K2TOil", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K2Alarm", LocCntrAlg:"Inc" },
			   K2TOilErrTitle: { DataKey:"K2TOil", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K2TOil", NodeAlg:"Attr", NodeAttr:"title" },
			   K2TOilErrClass: { DataKey:"K2TOil", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K2TOil", NodeAlg:"Attr", NodeAttr:"class" },
				 K2TOilErrLog: { DataKey:"K2TOil", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K2"] + " / " + G_RES[G_LANG]["Sens"]["TOil"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  K2LvOil: { DataKey:"K2LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], byRiseEdge:true, setNode:"K2LvOil", NodeAlg:"Text" },	
				   K2LvOilErr: { DataKey:"K2LvOil", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K2Alarm", LocCntrAlg:"Inc" },
			  K2LvOilErrClass: { DataKey:"K2LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOilErrClass"], Default:"", byRiseEdge:true, setNode:"K2LvOil", NodeAlg:"Attr", NodeAttr:"class" },
			       K2LvOilLog: { DataKey:"K2LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K2"] + " / " + G_RES[G_LANG]["Sens"]["LvOil"]), LogColor:G_RES[G_LANG]["LvOilColor"] },
					   K2PAir: { DataKey:"K2PAir", div:100, byRiseEdge:true, setNode:"K2PAir", NodeAlg:"Text" },
					K2PAirErr: { DataKey:"K2PAir", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K2Alarm", LocCntrAlg:"Inc" },
			   K2PAirErrTitle: { DataKey:"K2PAir", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K2PAir", NodeAlg:"Attr", NodeAttr:"title" },
			   K2PAirErrClass: { DataKey:"K2PAir", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K2PAir", NodeAlg:"Attr", NodeAttr:"class" },
				 K2PAirErrLog: { DataKey:"K2PAir", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K2"] + " / " + G_RES[G_LANG]["Sens"]["PAir"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  K2FlAir: { DataKey:"K2FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], byRiseEdge:true, setNode:"K2FlAir", NodeAlg:"Text" }, 
				   K2FlAirErr: { DataKey:"K2FlAir", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K2Alarm", LocCntrAlg:"Inc" },
			  K2FlAirErrClass: { DataKey:"K2FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAirErrClass"], Default:"", byRiseEdge:true, setNode:"K2FlAir", NodeAlg:"Attr", NodeAttr:"class" },
			       K2FlAirLog: { DataKey:"K2FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K2"] + " / " + G_RES[G_LANG]["Sens"]["FlAir"]), LogColor:G_RES[G_LANG]["FlAirColor"] },   
					      K2A: { DataKey:"K2A", byRiseEdge:true, setNode:"K2A", NodeAlg:"Text" },
				       K2AErr: { DataKey:"K2A", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K2Alarm", LocCntrAlg:"Inc" },
			      K2AErrTitle: { DataKey:"K2A", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K2A", NodeAlg:"Attr", NodeAttr:"title" },
			      K2AErrClass: { DataKey:"K2A", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K2A", NodeAlg:"Attr", NodeAttr:"class" },
				    K2AErrLog: { DataKey:"K2A", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K2"] + " / " + G_RES[G_LANG]["Sens"]["A"]), LogColor:G_RES[G_LANG]["SensErrColor"] },		  
					   K2Mode: { DataKey:"K2Mode", fromArray:G_RES[G_LANG]["Mode"], Default:"---", byRiseEdge:true, setNode:"K2Mode", NodeAlg:"Text" },
				    K2ModeErr: { DataKey:"K2Mode", bySetpoint:2, SetpointAlg:"equ", Break:true, setLocCntr:"K2Alarm", LocCntrAlg:"Inc" },
			   K2ModeErrClass: { DataKey:"K2Mode", fromArray:G_RES[G_LANG]["ModeErrClass"], Default:"", byRiseEdge:true, setNode:"K2Mode", NodeAlg:"Attr", NodeAttr:"class" },
					K2ModeLog: { DataKey:"K2Mode", fromArray:G_RES[G_LANG]["Mode"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:G_RES[G_LANG]["K2"], LogColor:G_RES[G_LANG]["ModeColor"] },
				  K2AlarmCntr: { DataKey:"K2Alarm", setNode:"K2AlarmCntr", NodeAlg:"Text" },
					  K2Alarm: { DataKey:"K2Alarm", bySetpoint:0, SetpointAlg:"gtr", setNode:"K2Alarm", NodeAlg:"BitLampBlink", rstLocCntr:"K2Alarm" },
					  
					    K3TSt: { DataKey:"K3TSt", div:10, byRiseEdge:true, setNode:"K3TSt", NodeAlg:"Text" },
					 K3TStErr: { DataKey:"K3TSt", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K3Alarm", LocCntrAlg:"Inc" },
			    K3TStErrTitle: { DataKey:"K3TSt", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K3TSt", NodeAlg:"Attr", NodeAttr:"title" },
				K3TStErrClass: { DataKey:"K3TSt", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K3TSt", NodeAlg:"Attr", NodeAttr:"class" },
				  K3TStErrLog: { DataKey:"K3TSt", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K3"] + " / " + G_RES[G_LANG]["Sens"]["TSt"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					    K3TPd: { DataKey:"K3TPd", div:10, byRiseEdge:true, setNode:"K3TPd", NodeAlg:"Text" },
					 K3TPdErr: { DataKey:"K3TPd", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K3Alarm", LocCntrAlg:"Inc" },
				K3TPdErrTitle: { DataKey:"K3TPd", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K3TPd", NodeAlg:"Attr", NodeAttr:"title" },
				K3TPdErrClass: { DataKey:"K3TPd", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K3TPd", NodeAlg:"Attr", NodeAttr:"class" },
				  K3TPdErrLog: { DataKey:"K3TPd", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K3"] + " / " + G_RES[G_LANG]["Sens"]["TPd"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					   K3TOil: { DataKey:"K3TOil", div:10, byRiseEdge:true, setNode:"K3TOil", NodeAlg:"Text" },
				    K3TOilErr: { DataKey:"K3TOil", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K3Alarm", LocCntrAlg:"Inc" },
			   K3TOilErrTitle: { DataKey:"K3TOil", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K3TOil", NodeAlg:"Attr", NodeAttr:"title" },
			   K3TOilErrClass: { DataKey:"K3TOil", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K3TOil", NodeAlg:"Attr", NodeAttr:"class" },
				 K3TOilErrLog: { DataKey:"K3TOil", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K3"] + " / " + G_RES[G_LANG]["Sens"]["TOil"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  K3LvOil: { DataKey:"K3LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], byRiseEdge:true, setNode:"K3LvOil", NodeAlg:"Text" },	
				   K3LvOilErr: { DataKey:"K3LvOil", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K3Alarm", LocCntrAlg:"Inc" },
			  K3LvOilErrClass: { DataKey:"K3LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOilErrClass"], Default:"", byRiseEdge:true, setNode:"K3LvOil", NodeAlg:"Attr", NodeAttr:"class" },
			       K3LvOilLog: { DataKey:"K3LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K3"] + " / " + G_RES[G_LANG]["Sens"]["LvOil"]), LogColor:G_RES[G_LANG]["LvOilColor"] },
					   K3PAir: { DataKey:"K3PAir", div:100, byRiseEdge:true, setNode:"K3PAir", NodeAlg:"Text" },
					K3PAirErr: { DataKey:"K3PAir", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K3Alarm", LocCntrAlg:"Inc" },
			   K3PAirErrTitle: { DataKey:"K3PAir", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K3PAir", NodeAlg:"Attr", NodeAttr:"title" },
			   K3PAirErrClass: { DataKey:"K3PAir", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K3PAir", NodeAlg:"Attr", NodeAttr:"class" },
				 K3PAirErrLog: { DataKey:"K3PAir", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K3"] + " / " + G_RES[G_LANG]["Sens"]["PAir"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  K3FlAir: { DataKey:"K3FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], byRiseEdge:true, setNode:"K3FlAir", NodeAlg:"Text" }, 
				   K3FlAirErr: { DataKey:"K3FlAir", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K3Alarm", LocCntrAlg:"Inc" },
			  K3FlAirErrClass: { DataKey:"K3FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAirErrClass"], Default:"", byRiseEdge:true, setNode:"K3FlAir", NodeAlg:"Attr", NodeAttr:"class" },
			       K3FlAirLog: { DataKey:"K3FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K3"] + " / " + G_RES[G_LANG]["Sens"]["FlAir"]), LogColor:G_RES[G_LANG]["FlAirColor"] },   
					      K3A: { DataKey:"K3A", byRiseEdge:true, setNode:"K3A", NodeAlg:"Text" },
				       K3AErr: { DataKey:"K3A", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K3Alarm", LocCntrAlg:"Inc" },
			      K3AErrTitle: { DataKey:"K3A", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K3A", NodeAlg:"Attr", NodeAttr:"title" },
			      K3AErrClass: { DataKey:"K3A", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K3A", NodeAlg:"Attr", NodeAttr:"class" },
				    K3AErrLog: { DataKey:"K3A", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K3"] + " / " + G_RES[G_LANG]["Sens"]["A"]), LogColor:G_RES[G_LANG]["SensErrColor"] },		  
					   K3Mode: { DataKey:"K3Mode", fromArray:G_RES[G_LANG]["Mode"], Default:"---", byRiseEdge:true, setNode:"K3Mode", NodeAlg:"Text" },
				    K3ModeErr: { DataKey:"K3Mode", bySetpoint:2, SetpointAlg:"equ", Break:true, setLocCntr:"K3Alarm", LocCntrAlg:"Inc" },
			   K3ModeErrClass: { DataKey:"K3Mode", fromArray:G_RES[G_LANG]["ModeErrClass"], Default:"", byRiseEdge:true, setNode:"K3Mode", NodeAlg:"Attr", NodeAttr:"class" },
					K3ModeLog: { DataKey:"K3Mode", fromArray:G_RES[G_LANG]["Mode"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:G_RES[G_LANG]["K3"], LogColor:G_RES[G_LANG]["ModeColor"] },
				  K3AlarmCntr: { DataKey:"K3Alarm", setNode:"K3AlarmCntr", NodeAlg:"Text" },
					  K3Alarm: { DataKey:"K3Alarm", bySetpoint:0, SetpointAlg:"gtr", setNode:"K3Alarm", NodeAlg:"BitLampBlink", rstLocCntr:"K3Alarm" },

					    K4TSt: { DataKey:"K4TSt", div:10, byRiseEdge:true, setNode:"K4TSt", NodeAlg:"Text" },
					 K4TStErr: { DataKey:"K4TSt", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K4Alarm", LocCntrAlg:"Inc" },
			    K4TStErrTitle: { DataKey:"K4TSt", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K4TSt", NodeAlg:"Attr", NodeAttr:"title" },
				K4TStErrClass: { DataKey:"K4TSt", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K4TSt", NodeAlg:"Attr", NodeAttr:"class" },
				  K4TStErrLog: { DataKey:"K4TSt", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K4"] + " / " + G_RES[G_LANG]["Sens"]["TSt"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					    K4TPd: { DataKey:"K4TPd", div:10, byRiseEdge:true, setNode:"K4TPd", NodeAlg:"Text" },
					 K4TPdErr: { DataKey:"K4TPd", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K4Alarm", LocCntrAlg:"Inc" },
				K4TPdErrTitle: { DataKey:"K4TPd", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K4TPd", NodeAlg:"Attr", NodeAttr:"title" },
				K4TPdErrClass: { DataKey:"K4TPd", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K4TPd", NodeAlg:"Attr", NodeAttr:"class" },
				  K4TPdErrLog: { DataKey:"K4TPd", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K4"] + " / " + G_RES[G_LANG]["Sens"]["TPd"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					   K4TOil: { DataKey:"K4TOil", div:10, byRiseEdge:true, setNode:"K4TOil", NodeAlg:"Text" },
				    K4TOilErr: { DataKey:"K4TOil", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K4Alarm", LocCntrAlg:"Inc" },
			   K4TOilErrTitle: { DataKey:"K4TOil", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K4TOil", NodeAlg:"Attr", NodeAttr:"title" },
			   K4TOilErrClass: { DataKey:"K4TOil", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K4TOil", NodeAlg:"Attr", NodeAttr:"class" },
				 K4TOilErrLog: { DataKey:"K4TOil", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K4"] + " / " + G_RES[G_LANG]["Sens"]["TOil"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  K4LvOil: { DataKey:"K4LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], byRiseEdge:true, setNode:"K4LvOil", NodeAlg:"Text" },	
				   K4LvOilErr: { DataKey:"K4LvOil", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K4Alarm", LocCntrAlg:"Inc" },
			  K4LvOilErrClass: { DataKey:"K4LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOilErrClass"], Default:"", byRiseEdge:true, setNode:"K4LvOil", NodeAlg:"Attr", NodeAttr:"class" },
			       K4LvOilLog: { DataKey:"K4LvOil", toBoolNum:true, fromArray:G_RES[G_LANG]["LvOil"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K4"] + " / " + G_RES[G_LANG]["Sens"]["LvOil"]), LogColor:G_RES[G_LANG]["LvOilColor"] },
					   K4PAir: { DataKey:"K4PAir", div:100, byRiseEdge:true, setNode:"K4PAir", NodeAlg:"Text" },
					K4PAirErr: { DataKey:"K4PAir", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K4Alarm", LocCntrAlg:"Inc" },
			   K4PAirErrTitle: { DataKey:"K4PAir", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K4PAir", NodeAlg:"Attr", NodeAttr:"title" },
			   K4PAirErrClass: { DataKey:"K4PAir", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K4PAir", NodeAlg:"Attr", NodeAttr:"class" },
				 K4PAirErrLog: { DataKey:"K4PAir", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K4"] + " / " + G_RES[G_LANG]["Sens"]["PAir"]), LogColor:G_RES[G_LANG]["SensErrColor"] },
					  K4FlAir: { DataKey:"K4FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], byRiseEdge:true, setNode:"K4FlAir", NodeAlg:"Text" }, 
				   K4FlAirErr: { DataKey:"K4FlAir", toBoolNum:true, bySetpoint:0, SetpointAlg:"equ", Break:true, setLocCntr:"K4Alarm", LocCntrAlg:"Inc" },
			  K4FlAirErrClass: { DataKey:"K4FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAirErrClass"], Default:"", byRiseEdge:true, setNode:"K4FlAir", NodeAlg:"Attr", NodeAttr:"class" },
			       K4FlAirLog: { DataKey:"K4FlAir", toBoolNum:true, fromArray:G_RES[G_LANG]["FlAir"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K4"] + " / " + G_RES[G_LANG]["Sens"]["FlAir"]), LogColor:G_RES[G_LANG]["FlAirColor"] },   
					      K4A: { DataKey:"K4A", byRiseEdge:true, setNode:"K4A", NodeAlg:"Text" },
				       K4AErr: { DataKey:"K4A", bySetpoint:32000, SetpointAlg:"geq", Break:true, setLocCntr:"K4Alarm", LocCntrAlg:"Inc" },
			      K4AErrTitle: { DataKey:"K4A", fromArray:G_RES[G_LANG]["SensErr"], Default:"", byRiseEdge:true, setNode:"K4A", NodeAlg:"Attr", NodeAttr:"title" },
			      K4AErrClass: { DataKey:"K4A", fromArray:G_RES[G_LANG]["SensErrClass"], Default:"", byRiseEdge:true, setNode:"K4A", NodeAlg:"Attr", NodeAttr:"class" },
				    K4AErrLog: { DataKey:"K4A", fromArray:G_RES[G_LANG]["SensErr"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:(G_RES[G_LANG]["K4"] + " / " + G_RES[G_LANG]["Sens"]["A"]), LogColor:G_RES[G_LANG]["SensErrColor"] },		  
					   K4Mode: { DataKey:"K4Mode", fromArray:G_RES[G_LANG]["Mode"], Default:"---", byRiseEdge:true, setNode:"K4Mode", NodeAlg:"Text" },
				    K4ModeErr: { DataKey:"K4Mode", bySetpoint:2, SetpointAlg:"equ", Break:true, setLocCntr:"K4Alarm", LocCntrAlg:"Inc" },
			   K4ModeErrClass: { DataKey:"K4Mode", fromArray:G_RES[G_LANG]["ModeErrClass"], Default:"", byRiseEdge:true, setNode:"K4Mode", NodeAlg:"Attr", NodeAttr:"class" },
					K4ModeLog: { DataKey:"K4Mode", fromArray:G_RES[G_LANG]["Mode"], Break:true, byRiseEdge:true, execFunc:onFuncWsLog, LogTarget:G_RES[G_LANG]["K4"], LogColor:G_RES[G_LANG]["ModeColor"] },
				  K4AlarmCntr: { DataKey:"K4Alarm", setNode:"K4AlarmCntr", NodeAlg:"Text" },
					  K4Alarm: { DataKey:"K4Alarm", bySetpoint:0, SetpointAlg:"gtr", setNode:"K4Alarm", NodeAlg:"BitLampBlink", rstLocCntr:"K4Alarm" }
				   	 };
		
		//Init. WebHMI-client
		initUI(WsIP, WsID, WsOpts);
		
		//Set position of Alarm BitLamp-nodes in the center of Case-node
		Main_SetBitLampBlinkPos("K1Case", "K1Alarm", 128, 128);
		Main_SetBitLampBlinkPos("K2Case", "K2Alarm", 128, 128);
		Main_SetBitLampBlinkPos("K3Case", "K3Alarm", 128, 128);
		Main_SetBitLampBlinkPos("K4Case", "K4Alarm", 128, 128);
	}
}
