/*	JAVASCRIPT DOCUMENT
*	TEXT CODING - UTF-8
*/

/*   WebHMI client resources - Compressors.
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

var G_RES = { ru: {           Total: "ИТОГО",
					             To: "Tмасла",
							   To_t: "температура масла в сепараторе",
					             Ts: "Tстат",
							   Ts_t: "температура статора",
					             Tv: "Tвп",
							   Tv_t: "температура винтовой пары",
					             Tc: "Tкомп",
							   Tc_t: "температура в компрессорной",
					             Tr: "Tресс",
							   Tr_t: "температура в рессиверной",
					              I: "Iн",
							    I_t: "ток нагрузки",
					              O: "масло",
							    O_t: "уровень масла",
					             Fa: "возд.ф",
							   Fa_t: "состояние воздушного фильтра",
					             Mo: "режим",
							   Mo_t: "режим работы",
					            Plc: "ПЛК",
							  Plc_t: "пульс ПЛК",
				                  P: "давл",
							    P_t: "давление в системе",
					            Bar: "бар",
					           DegC: "C&deg;",
					            Amp: "А",
					           None: "---",
				            Connect: "подключиться",
			             Disconnect: "отключиться",
				            Hitachi: "HITACHI",
				             Den200: "ДЭН200",
				            Ceccato: "CECCATO",
				                Eko: "EKO",
				             Mythos: "MYTHОS",
				             Wilden: "WILDEN",
				                Dnd: "DND",
						  WebSocket: "WebSocket",
						   WatchDog: "WatchDog",
						  Connected: "соединение установлено",
					   Disconnected: "соединение сброшено",
					  AutoReconnect: "попытка восстановления соединения...",
			             CompStates: ["останов", "пуск", "работа", "ошибка пуска", "авария"],
			             ConnStates: ["подключение...", "подключено", "отключение...", "отключено", "отключено"],
			              BooStates: ["низ", "норм"],
				           MoStates: ["руч", "авт"],
				   AlarmTitleStates: {0:"нет аварии", 1:"аварийный уровень масла", 21:"аварийная температура винтовой пары", 22:"аварийная температура сепаратора", 23:"аварийная температура статора", 3:"перепад давления на карманном фильтре", 4:"нештатная ситуация"},
				   AlarmClassStates: {0:"", 1:"ui-table-td-alarm", 21:"ui-table-td-alarm", 22:"ui-table-td-alarm", 23:"ui-table-td-alarm", 3:"ui-table-td-alarm", 4:"ui-table-td-alarm"},
				    CompClassStates: ["ui-bar ui-bar-a ui-state-stop", "ui-bar ui-bar-a ui-state-start", "ui-bar ui-bar-a ui-state-work", "ui-bar ui-bar-a ui-state-start-error", "ui-bar ui-bar-a ui-state-alarm"],
				         SrvConnErr: "Ошибка! Нет подключения к серверу {0}!",
						  NoDataErr: "Ошибка! Нет данных длительное время! Проверьте связь с сервером {0}.",
				    WsNotSupportErr: "Ошибка! Ваш браузер не поддерживает работу с web-сокетами!"
				  }
			};


