/*	JAVASCRIPT DOCUMENT
*	UTF-8
*/

/*  WebHMI client: Boiler resources - BH50.
*
*  Copyright (C) 2020  ATgroup09 (atgroup09@gmail.com)
*
*  The JavaScript code in this page is free software: you can
*  redistribute it and/or modify it under the terms of the GNU
*  General Public License (GNU GPL) as published by the Free Software
*  Foundation, either version 3 of the License, or (at your option)
*  any later version.  The code is distributed WITHOUT ANY WARRANTY;
*  without even the implied warranty of MERCHANTABILITY or FITNESS
*  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
*
*  As additional permission under GNU GPL version 3 section 7, you
*  may distribute non-source (e.g., minimized or compacted) forms of
*  that code without the copy of the GNU GPL normally required by
*  section 4, provided you include this license notice and a URL
*  through which recipients can access the Corresponding Source.
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
				                St2: {0:"закр", 1:"откр"},
					        StClass: {0:"", 1:"ui-state-yellow"},
					        AlClass: {0:"", 1:"ui-state-red"},
					        AlColor: {1:"red"},
					             Al: {1:"авария"},
					            Err: {1:"ошибка"},
					           COAl: {1:"загазованность CO"},
					           CHAl: {1:"загазованность CH4"},
					           HiAl: {1:"высокое значение"},
					           LoAl: {1:"низкое значение"},
					        SensErr: {1:"ошибка датчика"},
					           Boil: "Котельная",
					             K1: "Котел 1",
					            K1Y: "Клапан котла 1",
					            K1N: "Насос котла 1",
					             K2: "Котел 2",
					            K2Y: "Клапан котла 2",
					            K2N: "Насос котла 2",
					             N1: "Насос 1",
					             N2: "Насос 2",
					             G1: "Горелка 1",
					             G2: "Горелка 2",
					             Ta: "Темп. нар. возд.",
					             Ti: "Темп. подачи",
					             Pi: "Давл. подачи",
					             To: "Темп. обратная",
					             Po: "Давл. обратное",
					             Pd: "Перепад давл.",
					            Tk1: "Темп. котла 1",
					            Tk2: "Темп. котла 2",
					             DO: "Модуль дискретных выходов",
					         ExpBus: "Шина данных модулей",
			                    V24: "Питание 24В",
			                      V: "Питание",
			                 V24Bus: "Шина 24В",
			                     V5: "Питание 5В"
				  }
			};


