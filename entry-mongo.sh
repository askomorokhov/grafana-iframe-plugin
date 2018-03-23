#!/bin/bash

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update
apt-get install -y mongodb-org openjdk-8-jdk git
mkdir -p /data/db
mongod --profile 1 &
sleep 20
mongo localhost:27017/sbtest --eval 'db.createUser({user: "myuser", pwd: "mypass", roles: [{role: "readWrite", db: "sbtest"}]});'

pmm-admin config --server pmm-server
# pmm-admin add mongodb:queries MongoDB --uri localhost:27017/sbtest
pmm-admin add mongodb MongoDB --uri localhost:27017/sbtest

wget https://oss.sonatype.org/content/repositories/releases/org/mongodb/mongo-java-driver/3.2.1/mongo-java-driver-3.2.1.jar
export CLASSPATH=$PWD/mongo-java-driver-3.2.1.jar:$CLASSPATH

git clone https://github.com/Percona-Lab/sysbench-mongodb.git
cd sysbench-mongodb
./run.simple.bash
#while true
#do
 	echo 'Hello'
#	sleep 500
#done

