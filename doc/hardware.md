# Hardware for DEEPi Cluster #
> Explanation of the electronic hardware involved in the DEEPi Cluster
> project. 


> NOTE: This documents the **electronic** hardware not the mechanical
> design for the DEEPi modules. Choices are made to accomodate the
> deep sea environment, but this electronic set up has been tested and
> will operate in other environments and without the additional pressure
> housing required for deep sea operation.

DEEPi Cluster is a network of 4x Rasberry Pi Zero (RPiZ) and a single
Raspberry Pi 4 (RPi4). The network connection and power for the RPiZ's
is through the USB ports on the RPi4. 

<!-- TODO: provide power to RPi4 --> The system is powered from a 5V
source and requires <!-- ??? --> sufficient amps to run. The RPiZ's
are powered through their micro-USB ports from the USB ports of the
RPi4. The USB also provides a ethernet-over-usb intranet
connection. This connection is finicky^[citation-needed], so high
quality USB cables are important. If the RPiZ's do not recieve enough power,
they will not recognize the connection. 

<!-- NOTE: In the alternative case of air operations, the connections can be
run over wifi and the issue could be ignored. -->

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

