#!/usr/bin/env bash

#update m/c
sudo apt-get update
#install nginx
wget http://nginx.org/keys/nginx_signing.key
sudo apt-key add nginx_signing.key
sudo sed -i '$ a deb http://nginx.org/packages/ubuntu/ trusty nginx' /etc/apt/sources.list
sudo sed -i '$ a deb-src http://nginx.org/packages/ubuntu/ trusty nginx' /etc/apt/sources.list
sudo apt-get update
sudo apt-get install nginx
# install mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
#install node
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
#install git
sudo apt-get install git -y
