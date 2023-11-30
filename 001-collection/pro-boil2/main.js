/** @page JAVASCRIPT DOCUMENT
*	      UTF-8
*
*   WebHMI client.
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
@brief  Set position BitLampBlink-node relative to a case.
@param  CaseIdIn    - case ID. [STRING]
@param  BlbIdIn     - BitLampBlink-node ID. [STRING]
@param  BlbHeightIn - BitLampBlink-node height. [NUMBER]
@param  BlbWidthIn  - BitLampBlink-node weight. [NUMBER]
@return None.
*/
function Main_SetBitLampBlinkPos(CaseIdIn, BlbIdIn, BlbHeightIn, BlbWidthIn)
{
	var CaseNode = $(("#"+CaseIdIn));
	var x = (CaseNode[0].offsetLeft + (CaseNode[0].offsetWidth/2)  - (BlbWidthIn/2));
    var y = (CaseNode[0].offsetTop  + (CaseNode[0].offsetHeight/2) - (BlbHeightIn/2));
    
    var BlbNode = $(("#"+BlbIdIn));
	BlbNode.css('left', (''+x+"px"));
	BlbNode.css('top',  (''+y+"px"));
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
		var WsUri = "ws://at09.ddns.net:19100";
		var WsID  = "WsLog";
	
		var Opts = {  Ti: { DataKey:"Ti", Type:"Number", Offset:10, Round:1 },
					  Pi: { DataKey:"Pi", Type:"Number", Offset:10, Round:1 },
					  To: { DataKey:"To", Type:"Number", Offset:10, Round:1 },
					  Po: { DataKey:"Po", Type:"Number", Offset:10, Round:1 },
					  Ta: { DataKey:"Ta", Type:"Number", Offset:10, Round:1 },
					  Pc: { DataKey:"Pc", Type:"Number", Offset:10, Round:1 },
					  Gk: { DataKey:"DI1_2_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
				  K1Burn: { DataKey:"DI1_5_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
				  K2Burn: { DataKey:"DI1_6_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
				   Pump1: { DataKey:"DI1_8_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
				   Pump2: { DataKey:"DI1_8_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
			       GkLog: { DataKey:"DI1_2_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"Gk" },
			   K1BurnLog: { DataKey:"DI1_5_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"K1Burn" },
			   K2BurnLog: { DataKey:"DI1_6_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"K2Burn" },
			    Pump1Log: { DataKey:"DI1_8_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"Pump1" },
			    Pump2Log: { DataKey:"DI1_8_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"Pump2" },
			    COAl1Log: { DataKey:"DI1_1_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"COAl1", AddLocReg:"BoilAl" },
			    COAl2Log: { DataKey:"DI1_1_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"COAl2", AddLocReg:"BoilAl" },
			     CHAlLog: { DataKey:"DI1_2_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"CHAl", AddLocReg:"BoilAl" },
			     PoAlLog: { DataKey:"DI1_3_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"PoAl", AddLocReg:"BoilAl" },
		    WaterLoAlLog: { DataKey:"DI1_4_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"WaterLoAl", AddLocReg:"BoilAl" },
		     K1BurnAlLog: { DataKey:"DI1_3_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K1BurnAl", AddLocReg:"BoilAl" },
		     K2BurnAlLog: { DataKey:"DI1_4_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K2BurnAl", AddLocReg:"BoilAl" },
		        K1PAlLog: { DataKey:"DI1_5_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K1PAl", AddLocReg:"BoilAl" },
		        K1TAlLog: { DataKey:"DI1_6_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K1TAl", AddLocReg:"BoilAl" },
		        K2PAlLog: { DataKey:"DI1_7_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K2PAl", AddLocReg:"BoilAl" },
		        K2TAlLog: { DataKey:"DI1_7_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K2TAl", AddLocReg:"BoilAl" },
		          BoilAl: { DataKey:"BoilAl", Type:"BitLampBlink", LocReg:"BoilAl", Reset:true }
				 };
		
		initUI(WsUri, WsID, Opts);
		
		Main_SetBitLampBlinkPos("BoilCase", "BoilAl", 128, 128);
	}
}

