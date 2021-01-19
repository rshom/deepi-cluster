# DEEPi Cluster #
> Camera system designed to function with a long term, low cost
> deep-sea observatory. The cameras will be used to capture timelapse
> photography and to allow for live-streaming when a network
> connection is made.

## TODO ##

<!-- the bootloader used by DEEPi OS contains a base system, but that
system is not designed to do anything. For this specific purpose, I
will make edits after the install since I am only making
four. However, I do need a specific list of what is done. -->

  * [ ] set up boot script
	* [ ] packages installed
	* [ ] auto scripts set up
  * [ ] timelapse
  * [ ] live stream 
  * [ ] client code

## Overview ##

<!-- TODO: include link to DEEPi project -->
<!-- TODO: link to the observatory project -->

This runs off the DEEPi OS project. The observatory follows a specific
functionality though. The DEEPi cameras should take time lapse
photography. It will take these photos for a year, so the programming
must be robust.

## Hardware ##

The DEEPi-Cluster is a single RPi4 which can power and control 4x
DEEPi modules. The DEEPi modules plug into the USB ports on the RPi4
which allows for both power and control.

<!-- TODO: expand to control multiple Clusters and stereo pi -->

### Power ###

The DEEPi modules are powered by the RPi4 USB hub. 

> Pis are fussy concerning power supply. 

According to official documentation on [power
supply](https://www.raspberrypi.org/documentation/hardware/raspberrypi/power/),
every RPi including the RPiZ requires a 5.1V power supply. A 3.0A
power supply is recommended for the RPi4, and a 1.2A power supply is
recomended for the RPiZ.

According to this documentation, the RPi4 is only capable of supplying
1.2A to USB devices. This means each RPiZ recieves 300mA on average. A
RPiZ uses 100mA typically, but we expect to run these hard, so this
limit is a problem. While shooting video, the zero could be using
230mA.

<!-- TODO: look at using an externally powered USB hub -->

<!-- TODO: power over ethernet may be a good option as well for the
RPi4 -->

The RPi4 should be able to just barely power 4x DEEPi
modules. Therefore good quality cables are needed.

<!-- TODO: link to cables we are using -->

Modify the cables by first taking off the shrink wrap. The rest is
easy after that. The wires may need to be played with to get the right
arrangement. If the data wires are switched, `dmesg` will show an
error, but still try to connect.

<!-- TODO: fully wire all the DEEPi modules. -->

### Power Control ###

Power supply is automatic and is not limited in any way. <!-- ???: is there a better way -->

Since, everything must be done remotely, the RPi4 must be able to power up and down USB ports
if there is an issue.

<!-- TODO: figure out USB reset -->

The following commands seem to work for the USB reset. More tests need to be done.

`./bin/uhubctl/uhubctl -l 1-1 -a 0` to power all off
`./bin/uhubctl/uhubctl -l 1-1 -a 1` to power all on

## Network ##

The same USB cables that power the DEEPi modules can be used to create
an ethernet over USB connections. 

The RPi4 operates either as a standalone computer which can be
attached to a monitor has connectivity through it's ethernet port.

The networks created by the ethernet over USB connections are two node
networks between each DEEPi and the RPi4. They live on different
subnets, so an outside host cannot not dirrectly directly access a
DEEPi without first getting an SSH terminal inside the RPi4.

## Interfaces ##

The DEEPi Cluster acts as both a sever to the user computer and a
client to the DEEPi modules. 

### Cluster to DEEPi ###

The DEEPi must be accessed through commandline interfaces. Ethernet
over USB provides the connection for these interfaces.

#### SSH ####

  * [ ] enable SSH on initial set up for the DEEPi
  * [ ] Use PSK to allow passwordless SSH
  
#### NTP ####

  * [ ] install an NTP server on the cluster
  * [ ] connect each DEEPi to the NtP server

#### FTP ####

  * [ ] install proftp on each DEEPi
  * [ ] install proftp on the cluster
  * [ ] ???
  
#### HTTP ####

  * [ ] install lighttpd on each DEEPi

### Client to Cluster ###

During set up, the DEEPi is plugged into a monitor and keyboard. It
acts as a standalone desktop computer.

<!-- TODO: ensure all these interfaces are set up -->

#### VNC ####

#### SSH ####

#### NTP ####

#### FTP ####

#### HTTP ####

### Client to DEEPi ###

  * [ ] set up ways to transfer data on and off the DEEPi modules

## Contributors ##

* [Russell Shomberg](https://rshom.github.io)
* [Brennan Phillips](https://web.uri.edu/uril/)
<!-- TODO: add contributors-->

## License ##
<!--- If you're not sure which open license to use see https://choosealicense.com/--->

This project uses the following license: MIT.


	

