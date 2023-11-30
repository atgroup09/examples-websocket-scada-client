-- TABLE
-- proc_boil

DROP TABLE IF EXISTS `proc_boil`;
CREATE TABLE `proc_boil`
(
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Автоматическая временная метка
  `stamp` datetime DEFAULT NULL, -- Дата и время записи
  `profile` ENUM( -- Профиль
                 '1min',  -- 1 минута
                 '5min',  -- 5 минут
                 '15min', -- 15 минут
                 '30min', -- 30 минут
                 'hour',  -- час
                 'event'  -- событие
                 ),
  `device_id` bigint(20) unsigned DEFAULT NULL, -- ID устройства
  `register_id` bigint(20) unsigned DEFAULT NULL, -- ID регистра
  `value` int(11) NULL DEFAULT NULL, -- значение регистра
  `ex` int(11) NULL DEFAULT NULL, -- код исключения (0 — нет)
  `err` int(11) NULL DEFAULT NULL, -- код ошибки (0 — нет)
  `sign` int(11) NULL DEFAULT NULL, -- код признака (0 — нет)
  KEY `time_stamp_k` (`time_stamp`),
  KEY `stamp_k` (`stamp`),
  KEY `profile_k` (`profile`),
  KEY `ex_k` (`ex`),
  KEY `err_k` (`err`),
  KEY `sign_k` (`sign`),
  KEY `device_id_k` (`device_id`),
  KEY `register_id_k` (`register_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
