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
	BlbNode.hide();
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
		var WsUri = "ws://at09.ddns.net:19101";
		var WsID  = "WsLog";
	
		var Opts = {  Ti: { DataKey:"Ti",  Offset:10,  Round:1, Type:"Number" },
					TiAl: { DataKey:"DI0", Bit:8,  BoolNum:true, AddLocReg:"BoilAl" },
				 TiAlLog: { DataKey:"DI0", Bit:8,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"TiAl", AddLocReg:"TiErrLoc", RiseEdge:true },
				  TiHiAl: { DataKey:"DI2", Bit:6,  BoolNum:true, AddLocReg:"BoilAl" },
			   TiHiAlLog: { DataKey:"DI2", Bit:6,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"TiHiAl", AddLocReg:"TiErrLoc", RiseEdge:true },
				  TiLoAl: { DataKey:"DI2", Bit:7,  BoolNum:true, AddLocReg:"BoilAl" },
			   TiLoAlLog: { DataKey:"DI2", Bit:7,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"TiLoAl", AddLocReg:"TiErrLoc", RiseEdge:true },
			       TiErr: { DataKey:"TiErr",       BoolNum:true, AddLocReg:"BoilAl" },
			    TiErrLog: { DataKey:"TiErr",       BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"TiErr", AddLocReg:"TiErrLoc", RiseEdge:true },
			    TiErrLoc: { DataKey:"TiErrLoc",  LocReg:"TiErrLoc",  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", Reset:true, NodeID:"Ti" },
					  Pi: { DataKey:"Pi",  Offset:100, Round:1, Type:"Number" },
				  PiHiAl: { DataKey:"DI2", Bit:9,  BoolNum:true, AddLocReg:"BoilAl" },
		       PiHiAlLog: { DataKey:"DI2", Bit:9,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"PiHiAl", AddLocReg:"PiErrLoc", RiseEdge:true },
		        PiErrLoc: { DataKey:"PiErrLoc",  LocReg:"PiErrLoc",  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", Reset:true, NodeID:"Pi" },
					  To: { DataKey:"To",  Offset:10,  Round:1, Type:"Number" },
				   ToErr: { DataKey:"ToErr",       BoolNum:true, AddLocReg:"BoilAl" },
		        ToErrLog: { DataKey:"ToErr",       BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"ToErr", AddLocReg:"ToErrLoc", RiseEdge:true },
		        ToErrLoc: { DataKey:"ToErrLoc",  LocReg:"ToErrLoc",  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", Reset:true, NodeID:"To" },
					  Po: { DataKey:"Po",  Offset:100, Round:1, Type:"Number" },
				  PoHiAl: { DataKey:"DI2", Bit:8,  BoolNum:true, AddLocReg:"BoilAl" },
			   PoHiAlLog: { DataKey:"DI2", Bit:8,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"PoHiAl", AddLocReg:"PoErrLoc", RiseEdge:true },
			      PoLoAl: { DataKey:"DI2", Bit:10, BoolNum:true, AddLocReg:"BoilAl" },
			   PoLoAlLog: { DataKey:"DI2", Bit:10, BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"PoLoAl", AddLocReg:"PoErrLoc", RiseEdge:true },
			    PoErrLoc: { DataKey:"PoErrLoc",  LocReg:"PoErrLoc",  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", Reset:true, NodeID:"Po" },
					  Pd: { DataKey:"Pd",  Offset:100, Round:1, Type:"Number" },
			      PdLoAl: { DataKey:"DI2", Bit:11, BoolNum:true, AddLocReg:"BoilAl" },
			   PdLoAlLog: { DataKey:"DI2", Bit:11, BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"PdLoAl", AddLocReg:"PdErrLoc", RiseEdge:true },
			    PdErrLoc: { DataKey:"PdErrLoc",  LocReg:"PdErrLoc",  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", Reset:true, NodeID:"Pd" },
					  Ta: { DataKey:"Ta",  Offset:10,  Round:1, Type:"Number" },
				   TaErr: { DataKey:"TaErr",       BoolNum:true, AddLocReg:"BoilAl" },
		        TaErrLog: { DataKey:"TaErr",       BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"TaErr", AddLocReg:"TaErrLoc", RiseEdge:true },
		        TaErrLoc: { DataKey:"TaErrLoc",  LocReg:"TaErrLoc",  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", Reset:true, NodeID:"Ta" },
					  Y3: { DataKey:"Y3",  Offset:100, Round:1, Type:"Number" },
					 Fq1: { DataKey:"Fq1", Offset:100, Round:1, Type:"Number" },
					G1Al: { DataKey:"DI0", Bit:0,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", AddLocReg:"BoilAl" },
				 G1AlLog: { DataKey:"DI0", Bit:0,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"G1Al", RiseEdge:true },
					G2Al: { DataKey:"DI0", Bit:1,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", AddLocReg:"BoilAl" },
				 G2AlLog: { DataKey:"DI0", Bit:1,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"G2Al", RiseEdge:true },
				 	  K1: { DataKey:"DI1", Bit:3,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"" },
				   K1Log: { DataKey:"DI1", Bit:3,  BoolNum:true, Type:"Func",     Func:onBitFuncWsLog, NodeID:"K1", RiseEdge:true },
					K1Al: { DataKey:"DI0", Bit:2,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", AddLocReg:"BoilAl" },
				 K1AlLog: { DataKey:"DI0", Bit:2,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"K1Al", RiseEdge:true },
				     K1Y: { DataKey:"DI1", Bit:11, BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"" },
				  K1YLog: { DataKey:"DI1", Bit:11, BoolNum:true, Type:"Func",     Func:onBitFuncWsLog, NodeID:"K1Y", RiseEdge:true },
				     K1N: { DataKey:"DI2", Bit:2,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"" },
				  K1NLog: { DataKey:"DI2", Bit:2,  BoolNum:true, Type:"Func",     Func:onBitFuncWsLog, NodeID:"K1N", RiseEdge:true },
				      K2: { DataKey:"DI1", Bit:4,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"" },
				   K2Log: { DataKey:"DI1", Bit:4,  BoolNum:true, Type:"Func",     Func:onBitFuncWsLog, NodeID:"K2", RiseEdge:true },
					K2Al: { DataKey:"DI0", Bit:3,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", AddLocReg:"BoilAl" },
				 K2AlLog: { DataKey:"DI0", Bit:3,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"K2Al", RiseEdge:true },
				     K2Y: { DataKey:"DI1", Bit:12, BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"" },
				  K2YLog: { DataKey:"DI1", Bit:12, BoolNum:true, Type:"Func",     Func:onBitFuncWsLog, NodeID:"K2Y", RiseEdge:true },
				     K2N: { DataKey:"DI2", Bit:5,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"" },
			      K2NLog: { DataKey:"DI2", Bit:5,  BoolNum:true, Type:"Func",     Func:onBitFuncWsLog, NodeID:"K2N", RiseEdge:true },
				      N1: { DataKey:"DI1", Bit:9,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"" },
				   N1Log: { DataKey:"DI1", Bit:9,  BoolNum:true, Type:"Func",     Func:onBitFuncWsLog, NodeID:"N1", RiseEdge:true },
					N1Al: { DataKey:"DI0", Bit:4,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", AddLocReg:"BoilAl" },
				 N1AlLog: { DataKey:"DI0", Bit:4,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"N1Al", RiseEdge:true },
				      N2: { DataKey:"DI1", Bit:10, BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["StClass"], NodeAttr:"class", DefaultValue:"" },
				   N2Log: { DataKey:"DI1", Bit:10, BoolNum:true, Type:"Func",     Func:onBitFuncWsLog, NodeID:"N2", RiseEdge:true },
					N2Al: { DataKey:"DI0", Bit:5,  BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", AddLocReg:"BoilAl" },
				 N2AlLog: { DataKey:"DI0", Bit:5,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"N2Al", RiseEdge:true },
			        DOAl: { DataKey:"DI1", Bit:2,  BoolNum:true, AddLocReg:"BoilAl" },
			     DOAlLog: { DataKey:"DI1", Bit:2,  BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"DOAl", RiseEdge:true },
			          CO: { DataKey:"DI1", Bit:13, BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", AddLocReg:"BoilAl" },
				   COLog: { DataKey:"DI1", Bit:13, BoolNum:true, Type:"BitFunc",  RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"CO" },
					 CH4: { DataKey:"DI1", Bit:14, BoolNum:true, Type:"ArrayIDx", Arr:G_RES[G_LANG]["AlClass"], NodeAttr:"class", DefaultValue:"", AddLocReg:"BoilAl" },
				  CH4Log: { DataKey:"DI1", Bit:14, BoolNum:true, Type:"BitFunc",  RiseEdge:true, BitFunc:onBitFuncWsLog, NodeID:"CH4" },
			      Tk1Err: { DataKey:"Tk1Err",      BoolNum:true, AddLocReg:"BoilAl" },
		       Tk1ErrLog: { DataKey:"Tk1Err",      BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"Tk1Err", RiseEdge:true },
			      Tk2Err: { DataKey:"Tk2Err",      BoolNum:true, AddLocReg:"BoilAl" },
			   Tk2ErrLog: { DataKey:"Tk2Err",      BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"Tk2Err", RiseEdge:true },
			   ExpBusErr: { DataKey:"ExpBusErr",   BoolNum:true, AddLocReg:"BoilAl" },
			ExpBusErrLog: { DataKey:"ExpBusErr",   BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"ExpBusErr", RiseEdge:true },
			      V24Err: { DataKey:"V24Err",      BoolNum:true, AddLocReg:"BoilAl" },
		       V24ErrLog: { DataKey:"V24Err",      BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"V24Err", RiseEdge:true },
			        VErr: { DataKey:"VErr",        BoolNum:true, AddLocReg:"BoilAl" },
			     VErrLog: { DataKey:"VErr",        BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"VErr", RiseEdge:true },
			   V24BusErr: { DataKey:"V24BusErr",   BoolNum:true, AddLocReg:"BoilAl" },
		    V24BusErrLog: { DataKey:"V24BusErr",   BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"V24BusErr", RiseEdge:true },
			       V5Err: { DataKey:"V5Err",       BoolNum:true, AddLocReg:"BoilAl" },
			    V5ErrLog: { DataKey:"V5Err",       BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"V5Err", RiseEdge:true },
			       Alarm: { DataKey:"Alarm",       BoolNum:true, AddLocReg:"BoilAl" },
			    AlarmLog: { DataKey:"Alarm",       BoolNum:true, Type:"BitFunc",  BitFunc:onBitFuncWsLog, NodeID:"Alarm", RiseEdge:true },
			      BoilAl: { DataKey:"BoilAl", LocReg:"BoilAl", Reset:true, Type:"BitLampBlink" }
				 };
		
		initUI(WsUri, WsID, Opts);
		
		Main_SetBitLampBlinkPos("BoilCase", "BoilAl", 128, 128);
	}
}

