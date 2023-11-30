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

var G_ARH_ALLOW = false;
var G_ARH_ROWS  = 0;
var G_ARH_COL   = 0;
var G_ARH       = {};

var G_CHART = null;


/*
@brief  Function: Handler for event FormSetArh.click.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onFormSetArhClicked(event)
{
	var Res = G_FORM_SET.getResultset();

	if(Res)
	{
		var ArhUse   = ((typeof Res["arh_use"] == "number") ? true : false);
		var CaseNode = $("#ArhCase");
		CaseNode.toggle(ArhUse);
	}
}

/*
@brief  Function: Handler for event FormSetArhAllow.click.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onFormSetArhAllowClicked(event)
{
	var Res = G_FORM_SET.getResultset();

	if(Res)
	{
		G_ARH_ALLOW = ((typeof Res["arh_allow"] == "number") ? true : false);
	}
}

/*
@brief  Function: Handler for event FormSetArhClear.click.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onFormSetArhClearClicked(event)
{
	G_ARH_ROWS = 0;
	$("#Arh").empty();
	$("#ArhInfo").text("[" + G_ARH_ROWS + "]");
}

/*
@brief  Function: Handler for event execFunc - out message into log.
@param  OptionsIn  - array of options [OBJECT]
@param  DataIn - array of data [OBJECT]
@param  DataKeyIn - key to Data [STRING]
@param  ValueIn - modified value [ANY]
@param  BeforeValueIn - modified value defore fromArray [ANY]
@return true.	[BOOLEAN]
*/
function onFuncWsArh(OptionsIn, DataIn, DataKeyIn, ValueIn, BeforeValueIn)
{
	/*if(DataKeyIn == "X")
	{
		G_PLOT.setData([ValueIn]);
		G_PLOT.draw();
	}
	*/
	
	if(!G_ARH_ALLOW || G_ARH_ROWS == 1000) return;
	
	var ArhNode     = $("#Arh");
	var ArhInfoNode = $("#ArhInfo");
	
	if(typeof G_ARH[DataKeyIn] == "undefined")
	{
		G_ARH[DataKeyIn] = ValueIn;
		G_ARH_COL++;
	}
	
	if(G_ARH_COL == 3)
	{
		if(!G_ARH_ROWS) ArhNode.append("TimeStamp;SP;X;Y;<br />");
		G_ARH_ROWS++;
		
		ArhNode.append("" + G_WS_SERVER_STAMP + ";" + G_ARH["Sp"] + ";" + G_ARH["X"] + ";" + G_ARH["Y"] + "<br />");
		ArhNode.stop().animate({scrollTop: ArhNode[0].scrollHeight}, 500);
		ArhInfoNode.text("[" + G_ARH_ROWS + "]");
		
		G_ARH     = {};
		G_ARH_COL = 0;
	}
	
	return (true);
}


/*
@brief  Function: Handler for event FormSetPlot.click.
@param  event - Event-object.	[OBJECT]
@return None.
*/
function onFormSetPlotClicked(event)
{
	var Res = G_FORM_SET.getResultset();

	if(Res)
	{
		var PlotUse   = ((typeof Res["plot_use"] == "number") ? true : false);
		var CaseNode = $("#PlotCase");
		CaseNode.toggle(PlotUse);
	}
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
		/* INIT WS-HMI
		*/
		
		//URI of WebHMI-server (data-server)
		var WsIP = "ws://127.0.0.1:8003";
		
		//ID of WebHMI-server (data-server)
		var WsID = "ws1003";
		
		//Settings of tags (link data with WebHMI-content)
		var WsOpts = {  X: { DataKey:"X", round:1, setNode:"X", NodeAlg:"Text", execFunc:onFuncWsArh },
		               Sp: { DataKey:"Sp", round:1, setNode:"Sp", NodeAlg:"Text", execFunc:onFuncWsArh },
					    E: { DataKey:"E", round:1, setNode:"E", NodeAlg:"Text" },
					   Kp: { DataKey:"Kp", round:1, setNode:"Kp", NodeAlg:"Text" },
					   Ki: { DataKey:"Ki", round:1, setNode:"Ki", NodeAlg:"Text" },
					   Kd: { DataKey:"Kd", round:1, setNode:"Kd", NodeAlg:"Text" },
						Y: { DataKey:"Y", round:1, setNode:"Y", NodeAlg:"Text", execFunc:onFuncWsArh },
						D: { DataKey:"D", round:1, setNode:"D", NodeAlg:"Text" }
				   	 };
		
		//Init. WebHMI-client
		initUI(WsIP, WsID, WsOpts);
		
		
		/* INIT UI
		*/
		
		G_FORM_SET["ItemOptions"]["arh_use"]   = { ItemType: "checkbox", DataType: "number", Allow: true };
		G_FORM_SET["ItemOptions"]["plot_use"]  = { ItemType: "checkbox", DataType: "number", Allow: true };
		G_FORM_SET["ItemOptions"]["arh_allow"] = { ItemType: "checkbox", DataType: "number", Allow: true };
		
		$("#FormSetArh").bind("click", onFormSetArhClicked);
		$("#FormSetPlot").bind("click", onFormSetPlotClicked);
		$("#FormSetArhAllow").bind("click", onFormSetArhAllowClicked);
		$("#FormSetArhClear").bind("click", onFormSetArhClearClicked);
		
		
		/* INIT PLOT
		*/
		G_CHART = new MainChartLinear("Plot");
		G_CHART["AutoScaleGrid"] = true;
		G_CHART.init();
	}
}
