# DEEPi Cluster #
> Combine DEEPi modules to operate as a single unit.

## Overview ##

This runs off the DEEPi OS project. 

## Power Control ##

The RPi4 recieves 5VD power either from GPIO pins or a USB-C cable. Currently,
only the USB-C cable has been tested. Power is distributed to the RPiZs through micro-USB cables, which supply power and data. 

## Commands ##

  * `rebootcluster` resets all the RPiZs.
  
Commands are simple to impliment. They are stored as executables in
`/usr/local/bin`. Commands can be scheduled using `crontab`. More
information under `man crontab`.

> TODO: Impliment more commands. I have not implimented many, but that
> that part is much easier compared to the networking part. Most of
> them are only one line.

## Network ##

The system has a complex networking solution including multiple
networks.  On Avahi or Bonjour enabled networks, the RPi's can be
accessed through the hostnames `deepi-cluster`, `deepi1`, `deepi2`,
`deepi3`, and `deepi4` if the IP addresses are not known.

### USB-LAN ###

The RPi4 and RPiZ communicate using Ethernet-over-USB via the same
cables supplying power. The connections appear on four seperate
network interfaces using four seperate subnets.

| RPiZ Hostname | Interface | RPiZ IP   | RPi4 IP   |
|---------------|-----------|-----------|-----------|
| deepi1        | ethpi1    | 10.0.11.2 | 10.0.11.1 |
| deepi2        | ethpi2    | 10.0.12.2 | 10.0.12.1 |
| deepi3        | ethpi3    | 10.0.13.2 | 10.0.13.1 |
| deepi4        | ethpi4    | 10.0.14.2 | 10.0.14.1 |

The USB-LAN allows communication between the RPi.

### LAN ###

The RPi4 has an ethernet cable allowing for hotplugging into LAN
networks. The RPi4 any network assigned IP address.

The LAN connection on the RPi4 does not extend to the
USB-LAN. However, IP forwarding is turned on on the RPi4. Users can
edit the IP Routing Table on their computer to communicate with the
RPiZ when on the same LAN. On OSX the command is `sudo route add 10/24
IP.OF.THE.RPI4`.

### WLAN ###

For debugging and updating, the entire system connects to WiFi
networks named "DEEPiNet" with password "deepinet". It is capable of
being connected to additional networks. This default is a backup which
can always be created using a hotspot.

## Time Sync ##

None of the RPi have a real time clock (RTC) on board. This means the
clocks slowly drift in the absense of an internet source. This is
problem for some applications.

The RPi4 is set to broadcast an NTP server to the RPiZ.

> TODO: I have not really been able to test this because I think the
> University may be blocking access to NTP (port 123) for security
> reasons. It is pretty important for some applications. If the RPiZ
> are left to their own timing, the clocks will slowly drift
> apart. Videos and timelapse photos would not sync up in this
> case. There are some ways to patch this, but by the best way is a
> reliable network clock source provided by the RPi4 but originating
> from some better source.


## Web Server ##

The RPi4 runs a lighttpd web server which combines data from the
webservers on the RPiZ. The webserver also allows for runing CGI-BIN
scripts to issue commands. Web server files are located in
`/var/www/html/` and CGI-BIN scripts are located in
`/usr/lib/cgi-bin`.

> TODO: write CGI-BIN scripts.

> TODO: Set up the backend proxy so IP forwarding is not
> needed. Currently, the RPi4 server redirects or pulls resources from
> the RPiZ webservers. This requires IP forwarding to work. A better
> solution setting up a backend proxy to pipe the data. I ran into
> some issues getting mjpeg streaming to work using this method.

## Interfaces ##

For all interfaces requiring authentication the username and password
are left as the default for RPi OS, `pi` and `raspberry`
respectively. The interfaces enabled in the cluster are the same as
those in the DEEPi OS with the addition of the VNC being enabled for
the RPi4. IP forwarding must be used to access the RPiZ when not
connected via WLAN. SSH can be chained by accessing the RPi4 first.

> TODO: Investigate tunneling as an alternative access to the RPiZ
> when WLAN and IP forwarding are not available.

## Contributors ##

* [Russell Shomberg](https://rshom.github.io)
* [Brennan Phillips](https://web.uri.edu/uril/)

## License ##

This project uses the following license: MIT.

> TODO: what license do we want???
