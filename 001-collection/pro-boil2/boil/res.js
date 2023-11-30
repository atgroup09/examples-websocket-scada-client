/*	JAVASCRIPT DOCUMENT
*	UTF-8
*/

/*  WebHMI client: Boiler resources - UD1A
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
				                 St: {0:"выкл", 1:"вкл"},
					        StColor: {0:"red", 1:"none"},
					        StClass: {0:"ui-table-title", 1:"ui-table-title ui-state-yellow"},
					          COAl1: {1:"загазованность CO, 1-й порог"},
					          COAl2: {1:"загазованность CO, 2-й порог"},
					           CHAl: {1:"загазованность CH"},
					           PoAl: {1:"аварийное давление обратного трубопровода"},
					      WaterLoAl: {1:"низкий уровень бака запаса воды"},
					            PAl: {1:"аварийное давление"},
					            TAl: {1:"аварийная температура"},
					             Al: {1:"авария"},
					        AlColor: {1:"red"},
					        AlClass: {1:"ui-table-title ui-state-red"},
					             Gk: "ГК",
					         K1Burn: "К1.Г",
					         K2Burn: "К2.Г",
					          Pump1: "Н1",
					          Pump2: "Н2",
					           Boil: "Котельная",
					             K1: "К1",
					             K2: "К2"
				  }
			};

