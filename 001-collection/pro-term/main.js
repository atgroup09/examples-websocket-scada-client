/*	JAVASCRIPT DOCUMENT
*	UTF-8
*/

/*  WebHMI client: TRG(P).
*
*   Copyright (C) 2019  ATgroup09 (atgroup09@gmail.com)
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


/* Include:
*      + ../mod/hmi-v2-main.js
*/


//** GLOBAL VARIABLES

//* URI-parts
var G_URI_BASE_ADDR	= "base_addr";


//** FUNCTIONS

/*
@brief  Get device base address from URI.
@param  None.
@return Device base address from URI or 0. [NUMBER]
*/
function getBaseAddr()
{
	var Value = $.url('?' + G_URI_BASE_ADDR);
	return ((typeof Value == "number" || typeof Value == "string") ? (Value-0) : 0);
}


/*
@brief  Init. main title.
@param  None.
@return None.
*/
function initMainTitle()
{
	var MainTitle  = $("#MainTitle");
	var MainTitleU = MainTitle.find("u");
	
	if(MainTitleU)
	{
		if(MainTitleU.length)
		{
			var Value = getBaseAddr();
			MainTitleU.text(MainTitleU.text().replace(/\{0\}/g, ''+Value));
			
			MainTitle.trigger("create");
			$("title").html(MainTitle.text());
		}
	}
}


/*
@brief  Inititialize UI.
@param  None.
@return None.
*/
function initUI()
{
	G_WS_SERVER_URI = "ws://at09.myddns.me:18102";
	G_WS_SERVER_ID	= "WsLogTerm";
	G_LANG 			= "ru";
	G_DEBUG         = false;
	G_DEVICE_ADDR   = getBaseAddr();
	
	if(typeof HMI == "function")
	{
		G_HMI = new HMI();
		G_HMI["Options"] = {      Mo: { DataKey:"Mo", Type:"ArrayIDx", Arr:G_RES[G_LANG]["MoSrc"], NodeAttr:"src", DefaultValue:"images/mode-m.png" },
							   MoLog: { DataKey:"Mo", Type:"Func", RiseEdge:true, Func:onBitFuncWsYellowLog, NodeID:"Mo" },
							      Ty: { DataKey:"Ty", Type:"ArrayIDx", Arr:G_RES[G_LANG]["TySrc"], NodeAttr:"src", DefaultValue:"images/mode-g.png" },
							   TyLog: { DataKey:"Ty", Type:"Func", RiseEdge:true, Func:onBitFuncWsYellowLog, NodeID:"Ty" },
							      Er: { DataKey:"WsEr", Type:"BitLampBlink", BoolNum:true },
							  WsEr_0: { DataKey:"WsEr", Type:"BitFunc", AndMask:1, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"TrgLog" },
							  WsEr_1: { DataKey:"WsEr", Type:"BitFunc", AndMask:2, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"TrgLog" },
							  WsEr_2: { DataKey:"WsEr", Type:"BitFunc", AndMask:4, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"TrgLog" },
							WsErIO_0: { DataKey:"WsErIO", Type:"BitFunc", AndMask:1, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErIO_1: { DataKey:"WsErIO", Type:"BitFunc", AndMask:2, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErIO_2: { DataKey:"WsErIO", Type:"BitFunc", AndMask:4, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErIO_3: { DataKey:"WsErIO", Type:"BitFunc", AndMask:8, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErIO_4: { DataKey:"WsErIO", Type:"BitFunc", AndMask:16, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErIO_5: { DataKey:"WsErIO", Type:"BitFunc", AndMask:32, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_0: { DataKey:"WsErEm", Type:"BitFunc", AndMask:1, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_1: { DataKey:"WsErEm", Type:"BitFunc", AndMask:2, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_2: { DataKey:"WsErEm", Type:"BitFunc", AndMask:4, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_3: { DataKey:"WsErEm", Type:"BitFunc", AndMask:8, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_4: { DataKey:"WsErEm", Type:"BitFunc", AndMask:16, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_5: { DataKey:"WsErEm", Type:"BitFunc", AndMask:32, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_6: { DataKey:"WsErEm", Type:"BitFunc", AndMask:64, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_7: { DataKey:"WsErEm", Type:"BitFunc", AndMask:128, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_8: { DataKey:"WsErEm", Type:"BitFunc", AndMask:256, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							WsErEm_9: { DataKey:"WsErEm", Type:"BitFunc", AndMask:512, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErEm_10: { DataKey:"WsErEm", Type:"BitFunc", AndMask:1024, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErEm_11: { DataKey:"WsErEm", Type:"BitFunc", AndMask:2048, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErPro_0: { DataKey:"WsErPro", Type:"BitFunc", AndMask:1, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErPro_1: { DataKey:"WsErPro", Type:"BitFunc", AndMask:2, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErPro_2: { DataKey:"WsErPro", Type:"BitFunc", AndMask:4, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErPro_3: { DataKey:"WsErPro", Type:"BitFunc", AndMask:8, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErPro_4: { DataKey:"WsErPro", Type:"BitFunc", AndMask:16, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErPro_5: { DataKey:"WsErPro", Type:"BitFunc", AndMask:32, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						   WsErPro_6: { DataKey:"WsErPro", Type:"BitFunc", AndMask:64, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						  WsErPro_11: { DataKey:"WsErPro", Type:"BitFunc", AndMask:2048, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						  WsErPro_12: { DataKey:"WsErPro", Type:"BitFunc", AndMask:4096, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						  WsErPro_13: { DataKey:"WsErPro", Type:"BitFunc", AndMask:8192, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						  WsErPro_14: { DataKey:"WsErPro", Type:"BitFunc", AndMask:16384, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
						  WsErPro_15: { DataKey:"WsErPro", Type:"BitFunc", AndMask:32768, RiseEdge:true, BitFunc:onBitFuncWsRedLog, NodeID:"Er" },
							      Wa: { DataKey:"WsWa", Type:"BitLampBlink", BoolNum:true },
						   WsWaPro_0: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:1, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						   WsWaPro_1: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:2, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						   WsWaPro_2: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:4, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						   WsWaPro_3: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:8, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						   WsWaPro_4: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:16, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						   WsWaPro_5: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:32, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						   WsWaPro_6: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:64, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						   WsWaPro_7: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:128, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						  WsWaPro_15: { DataKey:"WsWaPro", Type:"BitFunc", AndMask:32768, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"Wa" },
						      WsSt_0: { DataKey:"WsSt", Type:"BitFunc", AndMask:1, RiseEdge:true, BitFunc:onBitFuncWsGreenLog, NodeID:"TrgLog" },
							  WsSt_1: { DataKey:"WsSt", Type:"BitFunc", AndMask:2, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgLog" },
							  WsSt_2: { DataKey:"WsSt", Type:"BitFunc", AndMask:4, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"RegLog" },
							  WsSt_3: { DataKey:"WsSt", Type:"BitFunc", AndMask:8, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"RegLog" },
							  WsSt_4: { DataKey:"WsSt", Type:"BitFunc", AndMask:16, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"RegLog" },
							  WsSt_5: { DataKey:"WsSt", Type:"BitFunc", AndMask:32, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"RegLog" },
							  WsSt_6: { DataKey:"WsSt", Type:"BitFunc", AndMask:64, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"RegLog" },
							  WsSt_9: { DataKey:"WsSt", Type:"BitFunc", AndMask:512, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgLog" },
							 WsSt_10: { DataKey:"WsSt", Type:"BitFunc", AndMask:1024, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgLog" },
							 WsSt_11: { DataKey:"WsSt", Type:"BitFunc", AndMask:2048, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgLog" },
							 WsSt_12: { DataKey:"WsSt", Type:"BitFunc", AndMask:4096, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgLog" },
							 WsSt_14: { DataKey:"WsSt", Type:"BitFunc", AndMask:16384, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"TrgLog" },
							 WsSt_15: { DataKey:"WsSt", Type:"BitFunc", AndMask:32768, RiseEdge:true, BitFunc:onBitFuncWsYellowLog, NodeID:"TrgLog" },
						   WsStNot_0: { DataKey:"WsSt", Type:"BitFunc", AndMask:1, RiseEdge:true, BitFunc:onBitFuncWsGreenLog, NodeID:"TrgNotLog", Not:true },
						   WsStNot_1: { DataKey:"WsSt", Type:"BitFunc", AndMask:2, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgNotLog", Not:true },
						   WsStNot_9: { DataKey:"WsSt", Type:"BitFunc", AndMask:512, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgNotLog", Not:true },
						  WsStNot_10: { DataKey:"WsSt", Type:"BitFunc", AndMask:1024, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgNotLog", Not:true },
						  WsStNot_11: { DataKey:"WsSt", Type:"BitFunc", AndMask:2048, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgNotLog", Not:true },
						  WsStNot_12: { DataKey:"WsSt", Type:"BitFunc", AndMask:4096, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgNotLog", Not:true },
						  WsStNot_14: { DataKey:"WsSt", Type:"BitFunc", AndMask:16384, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgNotLog", Not:true },
						  WsStNot_15: { DataKey:"WsSt", Type:"BitFunc", AndMask:32768, RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"TrgNotLog", Not:true },
							 FlameBl: { DataKey:"WsSt", Type:"BitLamp", Bit:15 },
							   Flame: { DataKey:"WsSt", Type:"BitLamp", Bit:15 },
							   Body1: { DataKey:"WsSt", Type:"BitLamp", Bit:0 },
							   Body2: { DataKey:"WsSt", Type:"BitLamp", Bit:0 },
							   Body3: { DataKey:"WsSt", Type:"BitLamp", Bit:0 },
							   Body4: { DataKey:"WsSt", Type:"BitLamp", Bit:0 },
							   Body5: { DataKey:"WsSt", Type:"BitLamp", Bit:0 },
							   Body6: { DataKey:"WsSt", Type:"BitLamp", Bit:0 },
							   Body7: { DataKey:"WsSt", Type:"BitLamp", Bit:0 },
							   Body8: { DataKey:"WsSt", Type:"BitLamp", Bit:0 },
							  BlowBl: { DataKey:"WsSt", Type:"BitLamp", Bit:9 },
							    Blow: { DataKey:"WsSt", Type:"BitLamp", Bit:9 },
							 SparkBl: { DataKey:"WsSt", Type:"BitLamp", Bit:14 },
							   Spark: { DataKey:"WsSt", Type:"BitLamp", Bit:14 },
							   IgnRe: { DataKey:"WsWaPro", Type:"BitLamp", Bit:15 },
					      IgnReNumBl: { DataKey:"WsWaPro", Type:"BitLamp", Bit:15, NodeID:"IgnReNum" },
						    IgnReNum: { DataKey:"IgnReNum", Type:"Number" },
						       AirVl: { DataKey:"AirVlPos", Type:"BitLamp", BoolNum:true },
						    AirVlPos: { DataKey:"AirVlPos", Type:"Number" },
						       GasVl: { DataKey:"GasVlPos", Type:"BitLamp", BoolNum:true },
						    GasVlPos: { DataKey:"GasVlPos", Type:"Number" },
						       VapVl: { DataKey:"VapVlPos", Type:"BitLamp", BoolNum:true },
						    VapVlPos: { DataKey:"VapVlPos", Type:"Number", Offset:100, Round:2 },
						        Y1Vl: { DataKey:"WsSt", Type:"BitLamp", Bit:10 },
						        Y2Vl: { DataKey:"WsSt", Type:"BitLamp", Bit:11 },
						        Y3Vl: { DataKey:"WsSt", Type:"BitLamp", Bit:12 },
						     TdrySet: { DataKey:"WsStPro", Type:"BitLamp", Bit:3 },
						    TprodSet: { DataKey:"WsStPro", Type:"BitLamp", Bit:3, Inverted:true },
						        Tdry: { DataKey:"Tdry", Type:"Number", Offset:10, Round:1 },
						        Twet: { DataKey:"Twet", Type:"Number", Offset:10, Round:1 },
						          Rh: { DataKey:"Rh", Type:"Number", Offset:10, Round:1 },
						       Tprod: { DataKey:"Tprod", Type:"Number", Offset:10, Round:1 },
						          Hz: { DataKey:"Hz", Type:"Number", Offset:1, Round:1 },
						         Vac: { DataKey:"Vac", Type:"Number", Offset:10, Round:1 },
						          Pg: { DataKey:"Pg", Type:"Number", Offset:10, Round:1 },
						          Pi: { DataKey:"Pi", Type:"Number", Offset:10, Round:1 },
						        Prog: { DataKey:"Prog", Type:"Number", IncAfter:1 },
						        Step: { DataKey:"Step", Type:"Number", IncAfter:1 },
						       Steps: { DataKey:"Steps", Type:"Number" },
						     RefCurr: { DataKey:"RefCurr", Type:"Number" },
						     RefTarg: { DataKey:"RefTarg", Type:"Number" },
						     StmCurr: { DataKey:"StmCurr", Type:"Number" },
						     StmTarg: { DataKey:"StmTarg", Type:"Number" },
						       Stage: { DataKey:"Stage", Type:"ArrayIDx", Arr:G_RES[G_LANG]["Stages"], DefaultValue:"---" },
						        RegY: { DataKey:"RegY", Type:"Number" },
						    RegDuPls: { DataKey:"RegDuPls", Type:"Number", Offset:10, Round:1 },
						         Reg: { DataKey:"Reg", Type:"Number" },
						         Plс: { DataKey:"Plc", Type:"Number" },
							    OpTm: { DataKey:"OpTm", Type:"IsoTime", DefaultValue:"---" },
								SeTm: { DataKey:"SeTm", Type:"IsoTime", DefaultValue:"---" }
							};
		
		G_HMI["DefaultValue"] = G_RES[G_LANG]["None"];
		G_HMI.init();
	}
	
	if(typeof jsLog == "function")
	{
		G_LOG = new jsLog("LogTable");
		G_LOG.LimRows           = G_LOG_LIM_ROWS;
		G_LOG.AllowRotate       = true;
		G_LOG.AllowCurrentStamp = true;
		G_LOG.CaseID            = "LogCase";
	}
	
	initMainTitle();
	initPopupBasic();
	initFormSet();
	
	refreshWsServerDesc();
	
	$("#FormSetConnect").trigger("click");
	
	G_WATCHDOG_TIMER = setInterval(onWatchdogTimerElapsed, G_WATCHDOG_TM*1000);
}

