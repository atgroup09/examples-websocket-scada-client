/*	JAVASCRIPT DOCUMENT
*	UTF-8
*/

/*  pro-client
*   wsSCADA client / UI styles
*   2024
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

//WebHMI-server configuration

var G_WS_SERVER_URI 	= "ws://localhost:8100";
var G_WS_SERVER_ID  	= "WsProClient";
var G_WS_SERVER_NET_ID 	= 1;
var G_WS_SERVER_DEV_ID 	= 1;


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
		
		// Linking HTML-tags with wsSERVER-data
		
		var WsOpts = {  BL1_1: { DataKey:"BL1_1", setNode:"BL1_1", NodeAlg:"Attr", NodeAttr:"style", fromArray:G_RES[G_LANG]["BL1_List"] },
					    BL1_2: { DataKey:"BL1_2", setNode:"BL1_2", NodeAlg:"Attr", NodeAttr:"style", fromArray:G_RES[G_LANG]["BL1_List"] },
					    BL1_3: { DataKey:"BL1_3", setNode:"BL1_3", NodeAlg:"Attr", NodeAttr:"style", fromArray:G_RES[G_LANG]["BL1_List"] },
					    BL1_4: { DataKey:"BL1_4", setNode:"BL1_4", NodeAlg:"Attr", NodeAttr:"style", fromArray:G_RES[G_LANG]["BL1_List"] },
					    BL2_1: { DataKey:"BL2_1", setNode:"BL2_1", NodeAlg:"BitLamp" },
					    BL2_2: { DataKey:"BL2_2", setNode:"BL2_2", NodeAlg:"BitLamp" },
					    BL2_3: { DataKey:"BL2_3", setNode:"BL2_3", NodeAlg:"BitLamp" },
					    BL3_1: { DataKey:"BL3_1", setNode:"BL3_1", NodeAlg:"BitLamp" },
					BL3_1_log: { DataKey:"BL3_1", execFunc:onFuncWsLog, LogTarget:G_RES[G_LANG]["BL3_1_Device"], LogColor:G_RES[G_LANG]["BL3_1_Colors"], fromArray:G_RES[G_LANG]["BL3_1_States"], byRiseEdge:true },
					    BL3_2: { DataKey:"BL3_2", setNode:"BL3_2", NodeAlg:"BitLampBlink" },
					BL3_2_log: { DataKey:"BL3_2", execFunc:onFuncWsLog, LogTarget:G_RES[G_LANG]["BL3_2_Device"], LogColor:G_RES[G_LANG]["BL3_2_Colors"], fromArray:G_RES[G_LANG]["BL3_2_States"], byRiseEdge:true },
					   NUM1_1: { DataKey:"NUM1_1", setNode:"NUM1_1", NodeAlg:"Text" },
					   NUM1_2: { DataKey:"NUM1_2", setNode:"NUM1_2", NodeAlg:"Text" },
					   NUM1_3: { DataKey:"NUM1_3", setNode:"NUM1_3", NodeAlg:"Text" },
					   NUM2_1: { DataKey:"NUM2_1", setNode:"NUM2_1", NodeAlg:"Text" },
					   NUM2_2: { DataKey:"NUM2_2", setNode:"NUM2_2", NodeAlg:"Attr", NodeAttr:"value" },
					      STR: { DataKey:"STR", setNode:"STR", NodeAlg:"Text", fromArray:G_RES[G_LANG]["STR_List"] },
						COLOR: { DataKey:"COLOR", setNode:"COLOR", NodeAlg:"Attr", NodeAttr:"style", fromArray:G_RES[G_LANG]["COLOR_List"] }
				   };
		
		//Init. WebHMI-client
		initUI(G_WS_SERVER_URI, G_WS_SERVER_ID, WsOpts);
	}
}
