# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.ssh.insert_key = false
  # The following sets the RAM of the VMs to 512MB
  config.vm.provider "virtualbox" do |vb|
    vb.memory = 256
  end
  # create app vm
  config.vm.define "app01" do |app_config|
      app_config.vm.hostname = "lb01"
      app_config.vm.synced_folder "./app01", "/vagrant"
      app_config.vm.network "private_network", ip: "192.168.15.11"
      app_config.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true
      app_config.vm.network "forwarded_port", guest: 3030, host: 3030, auto_correct: true
      app_config.vm.provision "shell", path: "bootstrap-app.sh"
  end
end
