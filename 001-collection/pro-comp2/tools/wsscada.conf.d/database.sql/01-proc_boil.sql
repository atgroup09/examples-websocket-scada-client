-- TABLE
-- proc_boil

DROP TABLE IF EXISTS `proc_boil`;
CREATE TABLE `proc_boil`
(
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- �������������� ��������� �����
  `stamp` datetime DEFAULT NULL, -- ���� � ����� ������
  `profile` ENUM( -- �������
                 '1min',  -- 1 ������
                 '5min',  -- 5 �����
                 '15min', -- 15 �����
                 '30min', -- 30 �����
                 'hour',  -- ���
                 'event'  -- �������
                 ),
  `device_id` bigint(20) unsigned DEFAULT NULL, -- ID ����������
  `register_id` bigint(20) unsigned DEFAULT NULL, -- ID ��������
  `value` int(11) NULL DEFAULT NULL, -- �������� ��������
  `ex` int(11) NULL DEFAULT NULL, -- ��� ���������� (0 � ���)
  `err` int(11) NULL DEFAULT NULL, -- ��� ������ (0 � ���)
  `sign` int(11) NULL DEFAULT NULL, -- ��� �������� (0 � ���)
  KEY `time_stamp_k` (`time_stamp`),
  KEY `stamp_k` (`stamp`),
  KEY `profile_k` (`profile`),
  KEY `ex_k` (`ex`),
  KEY `err_k` (`err`),
  KEY `sign_k` (`sign`),
  KEY `device_id_k` (`device_id`),
  KEY `register_id_k` (`register_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
