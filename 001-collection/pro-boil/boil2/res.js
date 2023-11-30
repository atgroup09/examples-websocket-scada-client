/*	JAVASCRIPT DOCUMENT
*	UTF-8
*/

/* WebHMI client resources: Boiler.
*
*  Copyright (C) 2019  ATgroup09 (atgroup09@gmail.com)
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

var G_RES = { ru: {       SrvConnErr: "Ошибка! Нет подключения к серверу {0}!",
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
								 B1: "Котел 1",
								 B2: "Котел 2",
								Fi1: "Горелка 1",
								Fi2: "Горелка 2",
							     Y1: "Газовый клапан",
							    Pwr: "Питание",
								 St: ["выкл.", "вкл."],
	                          StRev: ["вкл.", "выкл."],
							   StAl: ["авария", "норма"],
	                        StAlRev: ["норма", "авария"],
						       StPs: ["давление системы не в норме", "давление системы в норме"],
	                        StPsRev: ["давление системы в норме", "давление системы не в норме"]
				  }
			};


