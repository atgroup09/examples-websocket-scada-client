/*	JAVASCRIPT DOCUMENT
*	UTF-8
*/

/*  WebHMI-client / Resources
*
*  Copyright (C) 2022  ATgroup09 (atgroup09@gmail.com)
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
							     K1: "K1: ДЭН-200",
								 K2: "K2: HITACHI DSP-75",
								 K3: "K3: HITACHI DSP-75",
								 K4: "K4: HITACHI DSP-75",
							   Sens: {TSt:"Темп. статора", TPd:"Темп. подшипника", TOil:"Темп. масла", PAir:"Давл. воздуха", FlAir:"Фильтр воздуха", LvOil:"Уровень масла", A:"Ток нагрузки"},
						    SensErr: {32000:"обрыв датчика", 32001:"короткое замыкание", 32002:"неисправность чувствительного элемента"},
					   SensErrColor: {32000:"red", 32001:"red", 32002:"red"},
					   SensErrClass: {32000:"ui-state-red", 32001:"ui-state-red", 32002:"ui-state-red"},
							   Mode: {0:"останов", 1:"работа", 2:"неисправность"},
					      ModeColor: {0:"yellow", 1:"green", 2:"red"},
					   ModeErrClass: {2:"ui-state-red"},
							  LvOil: {0:"низкий", 1:"норма"},
						 LvOilColor: {0:"red", 1:null},
						 LvOilClass: {0:"ui-state-red"},
					  LvOilErrClass: {0:"ui-state-red"},
							  FlAir: {0:"засор", 1:"норма"},
					     FlAirColor: {0:"red", 1:null},
					  FlAirErrClass: {0:"ui-state-red"}
				  }
			};
