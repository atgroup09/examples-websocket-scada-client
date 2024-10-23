/*	JAVASCRIPT DOCUMENT
*	UTF-8
*/

/*  pro1003
*   webSCADA client / text resources
*   AT09 (atgroup09@gmail.com), 2023
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

//** GLOBAL VARIABLES

var G_RES = { ru: {      SrvConnErr: "Ошибка! Нет подключения к серверу {0}!",
						  NoDataErr: "Ошибка! Нет данных длительное время! Проверьте связь с сервером {0}.",
				    WsNotSupportErr: "Ошибка! Ваш браузер не поддерживает работу с web-сокетами!",
							Connect: "подключиться",
			             Disconnect: "отключиться",
			              WebSocket: "WebSocket",
						   WatchDog: "WatchDog",
						  Connected: "соединение установлено",
					   Disconnected: "соединение сброшено",
					  AutoReconnect: "попытка восстановления соединения...",
					     ConnStates: ["подключение...", "подключено", "отключение...", "отключено", "отключено"],
					           None: "---",
					   BL3_1_Device: "КЛАПАН 3-1",
					   BL3_1_Colors: {0:null, 1:"green"},
					   BL3_1_States: {0:"ЗАКРЫТ", 1:"ОТКРЫТ"},
					   BL3_2_Device: "АВАРИЯ",
					   BL3_2_Colors: {0:null, 1:"red"},
					   BL3_2_States: {0:"НЕТ", 1:"ЕСТЬ"},
						   BL1_List: {0:"background-color:transparent;", 1:"background-color:yellow;"},
					       STR_List: {0:"РУЧНОЙ", 1:"АВТОМАТ", 2:"НАЛАДКА"},
					     COLOR_List: {0:"background-color:transparent;", 1:"background-color:yellow;", 2:"background-color:red;"}
				  }
			};
