/*	JAVASCRIPT DOCUMENT
*	TEXT CODING - UTF-8
*/

/*   WebHMI сlient - Compressors.
*
*    Copyright (C) 2018  ATgroup09 (atgroup09@gmail.com)
*
*    The JavaScript code in this page is free software: you can
*    redistribute it and/or modify it under the terms of the GNU
*    General Public License (GNU GPL) as published by the Free Software
*    Foundation, either version 3 of the License, or (at your option)
*    any later version.  The code is distributed WITHOUT ANY WARRANTY;
*    without even the implied warranty of MERCHANTABILITY or FITNESS
*    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
*
*    As additional permission under GNU GPL version 3 section 7, you
*    may distribute non-source (e.g., minimized or compacted) forms of
*    that code without the copy of the GNU GPL normally required by
*    section 4, provided you include this license notice and a URL
*    through which recipients can access the Corresponding Source.
*/


//** GLOBAL VARIABLES

//* WebSocket Server
var G_WS_SERVER_URI	    	= "ws://at09.myddns.me:18103";
var G_WS_SERVER_ID	    	= "WsLogComp";
var G_WS_SERVER_STAMP		= 0;

//* WebSocket
var G_WS 	    			= null;

//* Time of Watchdog
var G_WATCHDOG_TM			= 60; //seconds > 1 min
var G_WATCHDOG_TIMER		= 0;
var G_WATCHDOG_DATA_STAMP	= 0;
var G_WATCHDOG_DATA_LOGGED  = false;
var G_WATCHDOG_CONN_LOGGED  = false;

//* PopupBasic dialog
var G_POPUP_BASIC			= null;

//* ID of Nodes
var G_ROOT_CASE				= "RootCase";

//* UI Language
var G_LANG 					= "ru";

//* forms
var G_FORM_SET				= null;

//* HMI
var G_HMI					= null;

//* Alarm-bitlamp image
var G_AL_IMG				= "images/warning-1.png";
var G_AL_IMG_WIDTH			= 128;
var G_AL_IMG_HEIGHT			= 128;

var G_DEBUG 				= false;

//* Data fields
var G_FIELD__ID				= "ID";
var G_FIELD__STAMP			= "Stamp";
var G_FIELD__NETWORKS		= "Networks";
var G_FIELD__DEVICES		= "Devices";

//* Log
var G_LOG					= null;


//** FUNCTIONS

/*
@brief  Function: Get ID of top nodes by class.
@param  OptsIn - case options; [OBJECT]
@param  ItemOptsIn - case item options or NULL; [OBJECT || NULL]
@param  HmiClassIn - node class: [STRING]
				= "case"
				= "case-bar"
				= "case-table-row"
				= "bitlampblink"
@return ID or NULL. [STRING || NULL]
*/
function getNodeID(OptsIn, ItemOptsIn, HmiClassIn)
{
	var NodeID = null;
	
	if(typeof OptsIn == "object" && typeof HmiClassIn == "string")
	{
		if(OptsIn)
		{
			if(typeof OptsIn["ID"] == "string" || typeof OptsIn["ID"] == "number")
			{
				switch(HmiClassIn)
				{
					case "case":
					case "case-bar":
						
						NodeID = ((typeof OptsIn["PreID"] == "string") ? (OptsIn["PreID"] + OptsIn["ID"]) : OptsIn["ID"]);
						if(HmiClassIn == "case-bar") NodeID+= "Bar";
						break;
						
					case "case-table-row":
					case "bitlampblink":
						
						if(typeof ItemOptsIn == "object")
						{
							if(ItemOptsIn)
							{
								if(typeof ItemOptsIn["PreID"] == "string")
								{
									if(ItemOptsIn["PreID"].length)
									{
										NodeID = (ItemOptsIn["PreID"] + OptsIn["ID"]);
										if(HmiClassIn == "bitlampblink") NodeID+= "BitLampBlink";
									}
								}
							}
						}
				}
			}
		}
	}
	
	return (NodeID);
}


/*
@brief  Function: Get new BitLampBlink Nodes.
@param  NodeIn - case node; [OBJECT]
@param  OptsIn - case options; [OBJECT]
@param  ItemOptsIn - array of case item options. [ARRAY]
@return The number of added rows. [NUMBER]
*/
function addCaseBitLampBlink(NodeIn, OptsIn, ItemOptsIn)
{
	var Num = 0;
	
	if(NodeIn && ItemOptsIn && typeof is_array == "function")
	{
		if(is_array(ItemOptsIn))
		{
			var Node = null;
			var x    = (NodeIn[0].offsetLeft + (NodeIn[0].offsetWidth/2)  - (G_AL_IMG_WIDTH/2));
			var y    = (NodeIn[0].offsetTop  + (NodeIn[0].offsetHeight/2) - (G_AL_IMG_HEIGHT/2));
			
			for(var i=0; i<ItemOptsIn.length; i++)
			{
				if(ItemOptsIn[i])
				{
					NodeID = getNodeID(OptsIn, ItemOptsIn[i], "bitlampblink");
					
					if(NodeID)
					{
						Node = $('<div hmi="bitlampblink" id="' + NodeID + '" style="position:absolute;left:' + x + 'px;top:' + y + 'px;z-index:200;display:none;"><img src="' + G_AL_IMG + '" /></div>');
						Node.appendTo(NodeIn);
						Num++;
						
						if(G_HMI && typeof ItemOptsIn[i]["HmiOptions"] == "object") G_HMI.setOptionsFrom(NodeID, OptsIn["ID"], ItemOptsIn[i]["HmiOptions"]);
					}
				}
			}
		}
	}
	
	return (Num);
}


/*
@brief  Function: Add new rows into table of Case Node.
@param  NodeIn - case table node; [OBJECT]
@param  OptsIn - case options; [OBJECT]
@param  ItemOptsIn - array of case item options. [ARRAY]
@return The number of added rows. [NUMBER]
*/
function addCaseTableRows(NodeIn, OptsIn, ItemOptsIn)
{
	var Num = 0;
	
	if(NodeIn && ItemOptsIn && typeof is_array == "function")
	{
		if(is_array(ItemOptsIn))
		{
			var TbodyNode = NodeIn.find("tbody");
			
			if(TbodyNode)
			{
				var NodeID     = null;
				var UseColspan = false;
				var Node       = null;
				var TitleClass = null;
				
				for(var i=0; i<ItemOptsIn.length; i++)
				{
					if(ItemOptsIn[i])
					{
						NodeID = getNodeID(OptsIn, ItemOptsIn[i], "case-table-row");
						
						if(NodeID)
						{
							if(typeof ItemOptsIn[i]["Colspan"] == "boolean") UseColspan = ItemOptsIn[i]["Colspan"];
							
							if(!UseColspan)
							{
								TitleClass = "ui-table-title ui-table-td-55";
								
								if(typeof ItemOptsIn[i]["Kpi"] == "boolean")
								{
									if(ItemOptsIn[i]["Kpi"]) TitleClass+= " ui-kpi";
								}
								
								Node = $('<tr hmi="case-table-row">'
									   +   '<td class="' + TitleClass + '"' + ((typeof ItemOptsIn[i]["Title_t"] == "string") ? 'title="' + ItemOptsIn[i]["Title_t"] + '"' : '') + '>' + ((typeof ItemOptsIn[i]["Title"] == "string") ? ItemOptsIn[i]["Title"] : G_RES[G_LANG]["None"]) + '</td>'
									   +   '<td hmi="value" class="ui-table-td-30" id="' + NodeID + '">---</td>'
									   +   '<td class="ui-table-title ui-table-td-15">' + ((typeof ItemOptsIn[i]["MUnit"] == "string") ? ItemOptsIn[i]["MUnit"] : G_RES[G_LANG]["None"]) + '</td>'
									   + '</tr>');
							}
							else
							{
								Node = $('<tr hmi="case-table-row">'
									   +   '<td hmi="value" colspan="3" id="' + NodeID + '">---</td>'
									   + '</tr>');
							}
							
							Node.appendTo(TbodyNode);
							Num++;
							
							if(G_HMI && typeof ItemOptsIn[i]["HmiOptions"] == "object") G_HMI.setOptionsFrom(NodeID, OptsIn["ID"], ItemOptsIn[i]["HmiOptions"]);
						}
					}
				}
			}
		}
	}
	
	return (Num);
}


/*
@brief  Function: Get new case table.
@param  None.
@return Table Node in Case or NULL. [OBJECT || NULL]
*/
function newCaseTable()
{
	var Node = $('<table hmi="case-table" class="ui-table-z">'
				+	'<caption />'
				+	'<thead />'
				+	'<tfoot />'
				+	'<tbody>'
				+   '</tbody>'
				+'</table>');
	
	return (Node);
}


/*
@brief  Function: Create case.
@param  OptsIn - case options. [OBJECT]
@return New Case Node or NULL. [OBJECT || NULL]
*/
function newCase(OptsIn)
{
	var CaseNode   = null;
	var CaseNodeID = getNodeID(OptsIn, null, "case");
	var BarNodeID  = getNodeID(OptsIn, null, "case-bar");
	
	if(CaseNodeID && BarNodeID)
	{
		CaseNode = $('<div hmi="case" class="ui-block-a" id="' + CaseNodeID + '">'
					+	'<div hmi="case-bar" class="ui-bar ui-bar-a" id="' + BarNodeID + '">'
					+		'<div class="ui-corner-all custom-corners">'
					+			'<div class="ui-bar ui-bar-y">'
					+				'<h3>' + ((typeof OptsIn["Title"] == "string") ? OptsIn["Title"] : G_RES[G_LANG]["None"]) + '</h3>'
					+			'</div>'
					+			'<div hmi="case-body" class="ui-body ui-body-a">'
					+			'</div>'
					+		'</div>'
					+	'</div>'
					+ '</div>');
		
		//init. list of HMI-targets
		if(G_HMI && typeof OptsIn["HmiOptions"] == "object") G_HMI.setOptionsFrom(BarNodeID, OptsIn["ID"], OptsIn["HmiOptions"]);
	}
	
	return (CaseNode);
}


/*
@brief  Function: Inititialize cases.
@param  RootIn - Root Node; [OBJECT]
@param  CaseOptsIn - array of case options; [OBJECT]
@param  ItemClassesIn - list of options of case items by classes. [OBJECT]
@return None.
*/
function initCases(RootIn, CaseOptsIn, ItemClassesIn)
{
	if(typeof RootIn == "object" && typeof CaseOptsIn == "object" && typeof is_array == "function")
	{
		if(RootIn && is_array(CaseOptsIn))
		{
			var BlockClassSuff  = ['a', 'b', 'c', 'd'];
			var BlockClassIDx   = 0;
			var CaseNode        = null;
			var CaseClass       = null;
			var UseTableRow     = false;
			var UseBitLampBlink = false;
			var Node            = null;
			
			for(var i=0; i<CaseOptsIn.length; i++)
			{
				if(CaseOptsIn[i])
				{
					CaseNode = newCase(CaseOptsIn[i]);
					
					if(CaseNode)
					{
						CaseNode.attr("class", ("ui-block-" + BlockClassSuff[BlockClassIDx]));
						BlockClassIDx = ((BlockClassIDx < BlockClassSuff.length-1) ? (BlockClassIDx+1) : 0);
						
						UseTableRow = false;
						UseBitLamps = false;
						
						if(typeof CaseOptsIn[i]["Class"] == "string" && typeof ItemClassesIn == "object")
						{
							if(ItemClassesIn)
							{
								CaseClass = CaseOptsIn[i]["Class"];
								
								if(typeof ItemClassesIn[CaseClass] == "object")
								{
									if(ItemClassesIn[CaseClass])
									{
										if(typeof ItemClassesIn[CaseClass]["TableRows"] == "object")
										{
											if(ItemClassesIn[CaseClass]["TableRows"]) UseTableRow = true;
										}
										
										if(typeof ItemClassesIn[CaseClass]["BitLampBlink"] == "object")
										{
											if(ItemClassesIn[CaseClass]["BitLampBlink"]) UseBitLampBlink = true;
										}
									}
								}
							}
						}
						
						if(UseTableRow)
						{
							Node = newCaseTable();
							Node = CaseNode.find("div[hmi='case-body']").append(Node);
							addCaseTableRows(Node, CaseOptsIn[i], ItemClassesIn[CaseClass]["TableRows"]);
						}
						
						CaseNode = CaseNode.appendTo(RootIn);
						CaseNode.trigger("create");
						
						if(UseBitLampBlink)
						{
							addCaseBitLampBlink(CaseNode, CaseOptsIn[i], ItemClassesIn[CaseClass]["BitLampBlink"]);
						}
					}
				}
			}
		}
	}
}


/*
@brief  Function: Get node of target block.
@param  IdIn - target ID (number of item in G_TARGETS). [NUMBER]
@return Node or NULL.	[OBJECT || NULL]
*/
function getTargetBlockNode(IdIn)
{
	printDebug(G_DEBUG, "#TargetBlock"+IdIn);
	return ((IdIn >= 0 && IdIn < G_TARGETS.length) ? ($("#TargetBlock"+IdIn)) : null);
}


/*
@brief  Function: Get node of target bar.
@param  IdIn - target ID (number of item in G_TARGETS). [NUMBER]
@return Node or NULL.	[OBJECT || NULL]
*/
function getTargetBarNode(IdIn)
{
	var Node = getTargetBlockNode(IdIn);
	if(Node)
	{
		printDebug(G_DEBUG, "Block.class = " + Node.attr("class"));
		var Bar = Node.find("div[class^='ui-bar ui-bar-a']");
		if(Bar) return (Bar);
	}
	
	return (null);
}


/*
@brief  Function: Get state of connection with WsServer.
@param  None.
@return state ID: [NUMBER]
		= 0 - connecting
		= 1 - open
		= 2 - closing
		= 3 - closed
		= 4 - unknown
*/
function getWsServerState()
{
	if(G_WS != null)
	{
		if(G_WS.readyState >= 0 || G_WS.readyState < 4) return (G_WS.readyState);
	}
	
	return (4);
}


/*
@brief  Function: Check connection with WsServer.
@param  None.
@return True if the connection has established, otherwise - False.
*/
function hasWsServerOpened()
{
	var State = getWsServerState();
	return ((State == 1) ? true : false);
}


/*
@brief  Function: Refresh description about WsServer.
@param  None.
@return None.
*/
function refreshWsServerDesc()
{
	var State = getWsServerState();
	var Node  = null;
	
	Node = $("#WsServerID");
	if(Node) Node.text(G_WS_SERVER_ID);
	
	Node = $("#WsServerUri");
	if(Node)
	{
		Node.text(G_WS_SERVER_URI);
		Node.attr("title", G_WS_SERVER_URI);
	}
	
	Node = $("#WsServerState");
	if(Node) Node.text(G_RES[G_LANG]["ConnStates"][State]);
	
	var Arr = [$("#FormSetConnect"), $("#ConnectState")];
	
	for(var i=0; i<Arr.length; i++)
	{
		if(Arr[i])
		{
			Arr[i].removeClass("ui-icon-disconnected");
			Arr[i].removeClass("ui-icon-connected");
			
			Arr[i].addClass(((State == 1) ? "ui-icon-connected" : "ui-icon-disconnected"));
			Arr[i].text(((State == 1) ? G_RES[G_LANG]["Disconnect"] : G_RES[G_LANG]["Connect"]));
			Arr[i].attr("title", ((State == 1) ? G_RES[G_LANG]["Disconnect"] : G_RES[G_LANG]["Connect"]));
		}
	}
}


/*
@brief  Function: Refresh HMI.
@param  DataIn - data for HMI.	[OBJECT]
@return None.
*/
function refreshHMI(DataIn)
{
	if(DataIn && G_HMI)
	{
		G_HMI.refresh(DataIn);
	}
}


/*
@brief  Function: Close connection with WebSocket Server.
@param  None.
@return None.
*/
function closeWsServer()
{
	if(G_WS) G_WS.close();
}


/*
@brief  Function: Handler of event Window.unload.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onWindowBeforeUnload(event)
{
	closeWsServer();
	return (null);
}


/*
@brief  Function: Handler of event WebSocket.onopen.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onWebSocketOpened(event)
{
	G_WATCHDOG_DATA_LOGGED = false;
	G_WATCHDOG_CONN_LOGGED = false;
	
	G_LOG.add(null, G_RES[G_LANG]["WebSocket"], G_RES[G_LANG]["Connected"], null);
	printDebug(G_DEBUG, "CONNECTED");
	
	refreshWsServerDesc();
}


/*
@brief  Function: Handler of event WebSocket.onclose.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onWebSocketClosed(event)
{
	if(!G_WATCHDOG_CONN_LOGGED)
	{
		G_LOG.add(null, G_RES[G_LANG]["WebSocket"], G_RES[G_LANG]["Disconnected"], null);
		printDebug(G_DEBUG, "DISCONNECTED");
	}
	
	refreshWsServerDesc();
}


/*
@brief  Function: Check array of networks in a server answer (JSON).
@param  JsonIn - server answer (JSON).	[OBJECT]
@return True if a server answer contains array of networks, otherwise - False.	[BOOLEAN]
@details JsonIn[G_FIELD__ID] == G_WS_SERVER_ID, JsonIn[G_FIELD__STAMP], isArray(JsonIn[G_FIELD__NETWORKS])
*/
function isAnswerNet(JsonIn)
{
	if(typeof JsonIn == "object" && typeof is_array == "function")
	{
		if(JsonIn)
		{
			if(typeof JsonIn[G_FIELD__ID] == "string" && typeof JsonIn[G_FIELD__STAMP] == "number" && typeof JsonIn[G_FIELD__NETWORKS] == "object")
			{
				if(JsonIn[G_FIELD__ID] == G_WS_SERVER_ID)
				{
					return (is_array(JsonIn[G_FIELD__NETWORKS]));
				}
			}
		}
	}
	
	return (false);
}


/*
@brief  Function: Check array of network devices.
@param  JsonNetIn - network.	[OBJECT]
@return True if a network contains array of devices, otherwise - False.	[BOOLEAN]
@details isArray(JsonNetIn[G_FIELD__DEVICES])
*/
function isAnswerNetDev(JsonNetIn)
{
	if(typeof JsonNetIn == "object" && typeof is_array == "function")
	{
		if(JsonNetIn)
		{
			if(typeof JsonNetIn[G_FIELD__DEVICES] == "object")
			{
				return (is_array(JsonNetIn[G_FIELD__DEVICES]));
			}
		}
	}
	
	return (false);
}


/*
@brief  Function: Handler of event WebSocket.onmessage.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onWebSocketMsgReceived(event)
{
	var JsonParse = JSON.parse(event.data);
	
	printDebug(G_DEBUG, "MESSAGE: " + event.data);
	//printDebug(G_DEBUG, JsonParse);
	
	if(isAnswerNet(JsonParse))
	{
		G_WS_SERVER_STAMP      = JsonParse[G_FIELD__STAMP];
		G_WATCHDOG_DATA_LOGGED = false;
		
		var i = 0, j = 0;
		
		for(i=0; i<JsonParse[G_FIELD__NETWORKS].length; i++)
		{
			if(isAnswerNetDev(JsonParse[G_FIELD__NETWORKS][i]))
			{
				printDebug(G_DEBUG, JsonParse[G_FIELD__NETWORKS][i]);
				
				for(j=0; j<JsonParse[G_FIELD__NETWORKS][i][G_FIELD__DEVICES].length; j++)
				{
					printDebug(G_DEBUG, JsonParse[G_FIELD__NETWORKS][i][G_FIELD__DEVICES][j]);
					refreshHMI(JsonParse[G_FIELD__NETWORKS][i][G_FIELD__DEVICES][j]);
				}
			}
		}
	}
}


/*
@brief  Function: Handler of event WebSocket.onerror.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onWebSocketErrReceived(event)
{
	if(!G_WATCHDOG_CONN_LOGGED)
	{
		var Str = G_RES[G_LANG]["SrvConnErr"].replace(/\{0\}/g, G_WS_SERVER_URI);
	
		printDebug(G_DEBUG, Str);
		G_LOG.add(null, G_RES[G_LANG]["WebSocket"], Str, "yellow");
		if(!G_LOG.isCaseVisible()) G_POPUP_BASIC.showBasic(Str);
	}
}


/*
@brief  Function: Open connection with WebSocket Server.
@param  None.
@return None.
*/
function openWsServer()
{
	try
	{
		if(typeof MozWebSocket == "function") WebSocket = MozWebSocket;
		if(G_WS && G_WS.readyState == 1) G_WS.close();
		
		if(!G_WS) window.onbeforeunload = onWindowBeforeUnload;
		
		if(typeof WebSocket != "undefined")
		{
			G_WS = new WebSocket(G_WS_SERVER_URI);
			G_WS.onopen    = onWebSocketOpened;
			G_WS.onclose   = onWebSocketClosed;
			G_WS.onmessage = onWebSocketMsgReceived;
			G_WS.onerror   = onWebSocketErrReceived;
		}
		else
		{
			printDebug(G_DEBUG, "Error! Websocket is not supported in your browser!");
			G_LOG.add(null, G_RES[G_LANG]["WebSocket"], G_RES[G_LANG]["WsNotSupportErr"], null);
			if(!G_LOG.isCaseVisible()) G_POPUP_BASIC.showBasic(G_RES[G_LANG]["WsNotSupportErr"]);
		}
	}
	catch (exception)
	{
		printDebug(G_DEBUG, "Exception! " + exception);
		G_LOG.add(null, G_RES[G_LANG]["WebSocket"], "Exception! " + exception, null);
		if(!G_LOG.isCaseVisible()) G_POPUP_BASIC.showBasic("Exception! " + exception);
	}
}


/*
@brief  Function: Handler for event FormSetConnect.click.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onFormSetConnectClicked(event)
{
	var State = getWsServerState();
	
	G_WATCHDOG_DATA_LOGGED = false;
	G_WATCHDOG_CONN_LOGGED = false;
	
	if(State == 0 || State == 1)
	{
		closeWsServer();
	}
	else
	{
		openWsServer();
	}
}


/*
@brief  Function: Handler for event FormSetLog.click.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onFormSetLogClicked(event)
{
	var Res = G_FORM_SET.getResultset();
	
	if(Res)
	{
		var LogUse = ((typeof Res["log_use"] == "number") ? true : false);
		G_LOG.toggleCase(LogUse);
	}
}


/*
@brief  Function: Handler for event WatchdogTimer.elapsed
@param  None.
@return None.
*/
function onWatchdogTimerElapsed()
{
	var State     = getWsServerState();
	var Connected = (State == 0 || State == 1);
	
	//** Check data
	
	if(G_WATCHDOG_DATA_STAMP == G_WS_SERVER_STAMP)
	{
		if(!G_WATCHDOG_DATA_LOGGED)
		{
			G_WATCHDOG_DATA_LOGGED = true;
			
			var Str = G_RES[G_LANG]["NoDataErr"].replace(/\{0\}/g, G_WS_SERVER_URI);
			printDebug(G_DEBUG, Str);
			G_LOG.add(null, G_RES[G_LANG]["WatchDog"], Str, "yellow");
			if(!G_LOG.isCaseVisible() && Connected) G_POPUP_BASIC.showBasic(Str);
		}
	}
	
	G_WATCHDOG_DATA_STAMP = G_WS_SERVER_STAMP;
	
	
	//** Check connection
	
	if(!Connected)
	{
		if(!G_WATCHDOG_CONN_LOGGED)
		{
			G_WATCHDOG_CONN_LOGGED = true;
			
			printDebug(G_DEBUG, "WatchdogConnect: Reconnect");
			G_LOG.add(null, G_RES[G_LANG]["WatchDog"], G_RES[G_LANG]["AutoReconnect"], null);
		}
		
		openWsServer();
	}
}


/*
@brief  Function: Handler for event BitFuncAlarm.log
@param  NodeIn    - target node;	[OBJECT]
@param  AlarmIdIn - ID of an alarm. [NUMBER]
@return true.	[BOOLEAN]
*/
function onBitFuncAlarmLog(NodeIn, AlarmIdIn)
{
	if(typeof NodeIn == "object" && typeof AlarmIdIn == "number")
	{
		if(NodeIn && AlarmIdIn > 0)
		{
			var LogStamp   = null;
			var LogTarget  = NodeIn.find("h3").text();
			var LogMessage = G_RES[G_LANG]["AlarmTitleStates"][AlarmIdIn];
			
			if(G_WS_SERVER_STAMP > 0)
			{
				var Stamp = new Date();
				Stamp.set_time_stamp(G_WS_SERVER_STAMP);
				LogStamp = Stamp.format("isoDateTimeNorm");
			}
			
			G_LOG.add(LogStamp, LogTarget, LogMessage, "red");
		}
	}
	
	return (true);
}


/*
@brief  Function: Initialize PopupBasic-dialog.
@param  None.
@return None.
*/
function initPopupBasic()
{
	if(typeof jsPopupDialog == "function")
	{
		G_POPUP_BASIC = new jsPopupDialog("PopupBasic");
	}
}


/*
@brief  Function: Initialize FormSet.
@param  None.
@return None.
*/
function initFormSet()
{
	if(typeof jsForm == "function")
	{
		G_FORM_SET = new jsForm("FormSet");
		
		G_FORM_SET["ItemOptions"] = { log_use: { ItemType: "checkbox", DataType: "number", Allow: true }
									 };
		
		$("#FormSetConnect").bind("click", onFormSetConnectClicked);
		$("#FormSetLog").bind("click", onFormSetLogClicked);
		
		G_FORM_SET.AutoCreate = true;
	}
}


/*
@brief  Function: Inititialize UI.
@param  None.
@return None.
*/
function initUI()
{
	var Cases = [ {         ID: 1,
					     Title: "K1::"+G_RES[G_LANG]["Den200"],
					     Class: "Compressor",
					     PreID: "Case",
					HmiOptions: [ { PreDataKey: "St", Type: "ArrayIDx", Arr: G_RES[G_LANG]["CompClassStates"], NodeAttr: "class", DefaultValue: "ui-bar ui-bar-a ui-state-stop" },
								  { PreDataKey: "Al", Type: "BitFunc", Func: onBitFuncAlarmLog, DefaultValue: 0, RiseEdge: true }
								 ]
					},
				  {         ID: 2,
					     Title: "K2::"+G_RES[G_LANG]["Eko"],
					     Class: "Compressor",
					     PreID: "Case",
				    HmiOptions: [ { PreDataKey: "St", Type: "ArrayIDx", Arr: G_RES[G_LANG]["CompClassStates"], NodeAttr: "class", DefaultValue: "ui-bar ui-bar-a ui-state-stop" },
								  { PreDataKey: "Al", Type: "BitFunc", Func: onBitFuncAlarmLog, DefaultValue: 0, RiseEdge: true }
				    			 ]
				   },
				  {         ID: 3,
					     Title: "K3::"+G_RES[G_LANG]["Mythos"],
					     Class: "Compressor",
					     PreID: "Case",
				    HmiOptions: [ { PreDataKey: "St", Type: "ArrayIDx", Arr: G_RES[G_LANG]["CompClassStates"], NodeAttr: "class", DefaultValue: "ui-bar ui-bar-a ui-state-stop" },
								  { PreDataKey: "Al", Type: "BitFunc", Func: onBitFuncAlarmLog, DefaultValue: 0, RiseEdge: true }
				    			 ]
				   },
				  {         ID: 4,
					     Title: "K4::"+G_RES[G_LANG]["Wilden"],
					     Class: "Compressor",
					     PreID: "Case",
				    HmiOptions: [ { PreDataKey: "St", Type: "ArrayIDx", Arr: G_RES[G_LANG]["CompClassStates"], NodeAttr: "class", DefaultValue: "ui-bar ui-bar-a ui-state-stop" },
								  { PreDataKey: "Al", Type: "BitFunc", Func: onBitFuncAlarmLog, DefaultValue: 0, RiseEdge: true }
				    			 ]
				   },
				  {         ID: 5,
					     Title: "K5::"+G_RES[G_LANG]["Dnd"],
					     Class: "Compressor",
					     PreID: "Case",
				    HmiOptions: [ { PreDataKey: "St", Type: "ArrayIDx", Arr: G_RES[G_LANG]["CompClassStates"], NodeAttr: "class", DefaultValue: "ui-bar ui-bar-a ui-state-stop" },
								  { PreDataKey: "Al", Type: "BitFunc", Func: onBitFuncAlarmLog, DefaultValue: 0, RiseEdge: true }
				    			 ]
				   },
				  {         ID: 6,
					     Title: "K6::"+G_RES[G_LANG]["Ceccato"],
					     Class: "Compressor",
					     PreID: "Case",
				    HmiOptions: [ { PreDataKey: "St", Type: "ArrayIDx", Arr: G_RES[G_LANG]["CompClassStates"], NodeAttr: "class", DefaultValue: "ui-bar ui-bar-a ui-state-stop" },
								  { PreDataKey: "Al", Type: "BitFunc", Func: onBitFuncAlarmLog, DefaultValue: 0, RiseEdge: true }
				    			 ]
				   },
				  {         ID: 7,
					     Title: "K7::"+G_RES[G_LANG]["Hitachi"],
					     Class: "Compressor",
					     PreID: "Case",
				    HmiOptions: [ { PreDataKey: "St", Type: "ArrayIDx", Arr: G_RES[G_LANG]["CompClassStates"], NodeAttr: "class", DefaultValue: "ui-bar ui-bar-a ui-state-stop" },
								  { PreDataKey: "Al", Type: "BitFunc", Func: onBitFuncAlarmLog, DefaultValue: 0, RiseEdge: true }
				    			 ]
				   },
				  {         ID: 8,
					     Title: G_RES[G_LANG]["Total"],
					     Class: "Total",
					     PreID: "Case"
				   }
			    ];
	
	var CaseItems = { Compressor: {    TableRows: [  {      PreID: "To",
													   HmiOptions: [ { PreDataKey: "To", Type: "Number", Offset: 1, Round: 1 } ],
															Title: G_RES[G_LANG]["To"],
													      Title_t: G_RES[G_LANG]["To_t"],
															MUnit: G_RES[G_LANG]["DegC"]
													  },
													 {      PreID: "Ts",
													   HmiOptions: [ { PreDataKey: "Ts", Type: "Number", Offset: 1, Round: 1 } ],
															Title: G_RES[G_LANG]["Ts"],
													      Title_t: G_RES[G_LANG]["Ts_t"],
															MUnit: G_RES[G_LANG]["DegC"]
													  },
													 {      PreID: "Tv",
													   HmiOptions: [ { PreDataKey: "Tv", Type: "Number", Offset: 1, Round: 1 } ],
															Title: G_RES[G_LANG]["Tv"],
													      Title_t: G_RES[G_LANG]["Tv_t"],
															MUnit: G_RES[G_LANG]["DegC"]
													  },
													 {      PreID: "I",
													   HmiOptions: [ { PreDataKey: "I",  Type: "Number", Offset: 1, Round: 1 } ],
															Title: G_RES[G_LANG]["I"],
													      Title_t: G_RES[G_LANG]["I_t"],
															MUnit: G_RES[G_LANG]["Amp"]
													  },
													 {      PreID: "O",
													   HmiOptions: [ { PreDataKey: "Ws", Type: "ArrayIDx", Arr: G_RES[G_LANG]["BooStates"], Bit: 0, Inverted: true } ],
															Title: G_RES[G_LANG]["O"],
													      Title_t: G_RES[G_LANG]["O_t"],
															MUnit: G_RES[G_LANG]["None"]
													  },
													 {      PreID: "Fa",
													   HmiOptions: [ { PreDataKey: "Ws", Type: "ArrayIDx", Arr: G_RES[G_LANG]["BooStates"], Bit: 4, Inverted: true } ],
															Title: G_RES[G_LANG]["Fa"],
													      Title_t: G_RES[G_LANG]["Fa_t"],
															MUnit: G_RES[G_LANG]["None"]
													  },
													 {      PreID: "Mo",
													   HmiOptions: [ { PreDataKey: "Ws", Type: "ArrayIDx", Arr: G_RES[G_LANG]["MoStates"], Bit: 8 } ],
															Title: G_RES[G_LANG]["Mo"],
													      Title_t: G_RES[G_LANG]["Mo_t"],
															MUnit: G_RES[G_LANG]["None"]
													  },
													 {      PreID: "St",
													   HmiOptions: [ { PreDataKey: "St", Type: "ArrayIDx", Arr: G_RES[G_LANG]["CompStates"] },
																	 { PreDataKey: "Al", Type: "ArrayIDx", Arr: G_RES[G_LANG]["AlarmTitleStates"], NodeAttr: "title" }
																	],
															MUnit: G_RES[G_LANG]["None"],
														  Colspan: true
													  }
													 ],
									BitLampBlink: [ {      PreID: "Al",
													   HmiOptions: [ { PreDataKey: "Al", Type: "BitLampBlink", DefaultValue: 0 } ]
													  }
													 ]
									},
						   Total: {    TableRows: [  {      PreID: "P",
													   HmiOptions: [ { DataKey: "P", Type: "Number", Offset: 10, Round: 1 } ],
															Title: G_RES[G_LANG]["P"],
													      Title_t: G_RES[G_LANG]["P_t"],
															MUnit: G_RES[G_LANG]["Bar"],
															  Kpi: true
													  },
													 {      PreID: "Tc",
													   HmiOptions: [ { DataKey: "Tc",  Type: "Number", Offset: 1, Round: 1 } ],
															Title: G_RES[G_LANG]["Tc"],
													      Title_t: G_RES[G_LANG]["Tc_t"],
															MUnit: G_RES[G_LANG]["DegC"]
													  },
													 {      PreID: "Tr",
													   HmiOptions: [ { DataKey: "Tr",  Type: "Number", Offset: 1, Round: 1 } ],
															Title: G_RES[G_LANG]["Tr"],
														  Title_t: G_RES[G_LANG]["Tr_t"],
															MUnit: G_RES[G_LANG]["DegC"]
													  },
													 {      PreID: "RampPlc",
													   HmiOptions: [ { DataKey: "RampPlc", Type: "String" } ],
															Title: G_RES[G_LANG]["Plc"],
													      Title_t: G_RES[G_LANG]["Plc_t"],
															MUnit: G_RES[G_LANG]["None"]
													  }
													]
									}
							};
	
	if(typeof HMI == "function")
	{
		G_HMI = new HMI();
		G_HMI["Options"]      = { };
		G_HMI["DefaultValue"] = G_RES[G_LANG]["None"];
	}
	
	if(typeof jsLog == "function")
	{
		G_LOG = new jsLog("LogTable");
		G_LOG.LimRows           = 30;
		G_LOG.AllowRotate       = true;
		G_LOG.AllowCurrentStamp = true;
		G_LOG.CaseID            = "LogCase";
	}
	
	var RootCaseNode = $("#"+G_ROOT_CASE);
	initCases(RootCaseNode, Cases, CaseItems);
	
	if(G_HMI) G_HMI.init();
	
	initPopupBasic();
	initFormSet();
	
	refreshWsServerDesc();
	
	$("#FormSetConnect").trigger("click");
	
	G_WATCHDOG_TIMER = setInterval(onWatchdogTimerElapsed, G_WATCHDOG_TM*1000);
}

