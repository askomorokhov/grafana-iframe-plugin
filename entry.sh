#!/bin/bash

service mysql start
mysql -e 'create database sbtest;'
sysbench /usr/share/sysbench/tests/include/oltp_legacy/oltp.lua --mysql-table-engine=innodb --oltp-table-size=1000000 --mysql-user=root --db-driver=mysql --rate=5 prepare

pmm-admin config --server pmm-server
pmm-admin add mysql MySQL57 --user=root --socket /var/run/mysqld/mysqld.sock --query-source perfschema

while true
do
	sysbench /usr/share/sysbench/tests/include/oltp_legacy/oltp.lua --mysql-table-engine=innodb --oltp-table-size=1000000 --mysql-user=root --db-driver=mysql --rate=5 run
	sleep 50
done
