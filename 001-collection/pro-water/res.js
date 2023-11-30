/*	JAVASCRIPT DOCUMENT
*	TEXT CODING - UTF-8
*/

/*   WebHMI client resources - Water.
*
*    Copyright (C) 2019  ATgroup09 (atgroup09@gmail.com)
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
					            Ewt: "Баки",
					          Cist1: "Бак #1",
					          Cist2: "Бак #2",
					          Pumps: "Насосы",
					          Pump1: "Осн. насос",
					          Pump2: "Доп. насос",
					            Plс: "ПЛК",
					         PumpSt: ["выкл.", "вкл."],
					          LvSrc: ["images/lv-no.png", "images/lv-lo.png", "images/lv-mi.png", "images/lv-hi.png"],
					         WsDI01: {1:"нижний уровень", 2:"нижний уровень", 4:"средний уровень", 8:"средний уровень", 16:"верхний уровень", 32:"верхний уровень", 128:"вкл. доп.", 256:"вкл. осн."},
					           WsSt: {2:"нижний аварийный уровень", 4:"нижний аварийный уровень"},
					        WsErNet: {1:"нет связи с модулем i-7041 (10)", 2:"нет связи с КСКН-60-А (01)", 4:"нет связи с Термодат-16 (02)"},
					       WsErSens: {1:"неисправность датчиков уровня", 2:"неисправность датчиков уровня"}
				  }
			};


