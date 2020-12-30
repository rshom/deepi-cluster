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
