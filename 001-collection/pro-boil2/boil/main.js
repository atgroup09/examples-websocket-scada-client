/*	JAVASCRIPT DOCUMENT
*	UTF-8
*/

/*  WebHMI client: Boiler - UD1A.
*
*   Copyright (C) 2020  ATgroup09 (atgroup09@gmail.com)
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
				      Gk: { DataKey:"DI1_2_12", Type:"BitLamp", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true },
				    GkAl: { DataKey:"DI1_2_12", Type:"BitLampBlink", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, Not:true },
				   GkLog: { DataKey:"DI1_2_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"Gk" },
				  K1Burn: { DataKey:"DI1_5_12", Type:"BitLamp", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true },
			   K1BurnLog: { DataKey:"DI1_5_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"K1Burn" },
			 K1BurnAlLog: { DataKey:"DI1_3_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K1BurnAl", AddLocReg:"K1Al" },
				  K2Burn: { DataKey:"DI1_6_12", Type:"BitLamp", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true }, 
			   K2BurnLog: { DataKey:"DI1_6_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"K2Burn" },
			 K2BurnAlLog: { DataKey:"DI1_4_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K2BurnAl", AddLocReg:"K2Al" },
			    K1PAlLog: { DataKey:"DI1_5_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K1PAl", AddLocReg:"K1Al" },
		        K1TAlLog: { DataKey:"DI1_6_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K1TAl", AddLocReg:"K1Al" },
		        K2PAlLog: { DataKey:"DI1_7_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K2PAl", AddLocReg:"K2Al" },
		        K2TAlLog: { DataKey:"DI1_7_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"K2TAl", AddLocReg:"K2Al" },
		           Pump1: { DataKey:"DI1_8_12", Type:"BitLamp", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true },
	            Pump1Log: { DataKey:"DI1_8_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"Pump1" },
	               Pump2: { DataKey:"DI1_8_12", Type:"BitLamp", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true },
	            Pump2Log: { DataKey:"DI1_8_12", Type:"Func", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, Func:onBitFuncWsLog, NodeID:"Pump2" },
	               COAl1: { DataKey:"DI1_1_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
		        COAl1Log: { DataKey:"DI1_1_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"COAl1", AddLocReg:"BoilAl" },
		           COAl2: { DataKey:"DI1_1_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
			    COAl2Log: { DataKey:"DI1_1_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:2, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"COAl2", AddLocReg:"BoilAl" },
			        CHAl: { DataKey:"DI1_2_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
			     CHAlLog: { DataKey:"DI1_2_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"CHAl", AddLocReg:"BoilAl" },
			        PoAl: { DataKey:"DI1_3_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
			     PoAlLog: { DataKey:"DI1_3_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"PoAl", AddLocReg:"BoilAl" },
			   WaterLoAl: { DataKey:"DI1_4_12", Type:"ArrayIDx", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"ui-table-title" },
		    WaterLoAlLog: { DataKey:"DI1_4_12", Type:"BitFunc", Offset:10, Floor:true, Dec:1, AndMask:1, BoolNum:true, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"WaterLoAl", AddLocReg:"BoilAl" },
				    K1Al: { DataKey:"K1Al", Type:"BitLampBlink", LocReg:"K1Al", Reset:true },
				    K2Al: { DataKey:"K2Al", Type:"BitLampBlink", LocReg:"K2Al", Reset:true },
				  BoilAl: { DataKey:"BoilAl", Type:"BitLampBlink", LocReg:"BoilAl", Reset:true }
				 };
		
		initUI(WsUri, WsID, Opts);
	}
}

