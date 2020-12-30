# DEEPi Observatory #
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

  * 4x DEEPi with USB tether
  * 1x DEEPi Cluster Server (RPi4 or alternative)
  * 1x Network Harddrive
  * 1x Router
  * 2x Ethernet to fiber converter
  * 1x Client computer

## Observatory Network ##

The DEEPi Observatory is a five node intranet consisting of the RPi4
and the four DEEPis. The DEEPis connect to the RPi4 using ethernet
over USB connections. The RPi4 is limited to four such connections and
connects to the network using either ethernet or WiFi. An outside
computer can then temporarily connect to the same network and
establish a connection to the RPi4. <!-- TODO: set up this exact
network in the lab with no outside connecitons -->

<!-- If set up right, this should not really be necessary since all
commands should be run through the RPi4 --> <!-- TODO: just set it up
in /etc/hostnames-->

Each of the four DEEPi is connected as a seperate interface on a
seperate subnet where the only members of each subnet are the
observatory server and a single DEEPi. The interfaces are named
`ethpiX`. The observatory takes the address `10.0.1X.1` and the DEEPi
takes the address `10.0.1X.2` where `X` is the DEEPi number. The DEEPi
number is associated with that DEEPi and not the plug choice. 

Only the observatory computer has network access to the DEEPi
computers.  For most applications, this is good enough since general
commands can be sent to the observatory which can in turn send
necessary commands to each DEEPi. Additionaly, a user can SSH into the
observatory and then SSH into individual DEEPi from there. <!-- could
also put in an tunnel or bridge the network, but that seems
unnecessary for our application. -->

## DEEPi Software ##
### DEEPi Operating System ##

<!-- TODO: link to DEEPi OS --> The DEEPi OS is Raspian Lite with some
prebuilt scripts and configuration files. The scripts and
configuration files are loaded on first boot.

The scripts included in the DEEPi OS rely on command line tools which
are robust and battery friendly. More advanced functionality can be
aquired using the DEEPi python module and associated scripts.

The DEEPi OS has a standard configuration which must be modified for
the specific application.  The primary purpose is time-lapse
photography. The secondary goal is to allow for live-stream video when
the a network connection is made.

Timelapse photography is controlled via a cronjob. See explanations below.
The live-stream capability must be turned on by the a user that has made a 
network connection to the device.

### RPi Camera Software Module ###

The RPi camera software module is the simplest method to control the
camera. The basic commands are `raspistill` and `raspivid`. Both have
many options that control the camera. <!-- TODO: link -->

### Python DEEPi Module ##

<!-- TODO: link to python-deepi --> 

The python DEEPi module uses the picamera python library to create
some additional functionality.

### Observatory Control Software ###
<!-- TODO: build software to control the connected DEEPi -->
## Setup ##

Create four DEEPi with unique networking on the same subnet. **This 
requires more work than a normal DEEPi set up**. Assuming 

### RPiZ Setup ###

**OTG Configuration**

Change the end of `/boot/cmdline.txt` to the following with everything
on the same line. Replace `X` with the DEEPi number. This change
ensures that the MAC addresses of the RPiZs are known. Normally, they
would be randomly assigned.

```sh
modules-load=dwc2,g_ether g_ether.host_addr=00:22:82:ff:ff:0X g_ether.dev_addr=00:22:82:ff:ff:1X
```

**Unique Hostname**

Change the host name to `deepi0X` in both `/etc/hosts` and
`/etc/hostname` where `X` is the DEEPi number.

**Static IP**

Add the following to the `/etc/dhcpcd.conf` file where `X` is the
DEEPi number.

```sh
interface usb0
static ip_address=10.0.1X.2
```

**Reboot** to enact changes.

<!-- TODO: install software -->

<!-- TODO: pull necessary libraries -->
<!-- Put a repo on the RPi4 and have each RPiZ pull from the repo -->

### RPi4 Setup ###

**Change Hostname**

Change the host name to `deepiobs01` in both `/etc/hosts` and
`/etc/hostname`.


**UDEV Rules to change network interface names**

Create a file `/etc/udev/rules.d/90-deepi.rules` and add the following.

``` bash
SUBSYSTEM=="net", ATTR{address}=="00:22:82:ff:ff:01", NAME="ethpi1"
SUBSYSTEM=="net", ATTR{address}=="00:22:82:ff:ff:02", NAME="ethpi2"
SUBSYSTEM=="net", ATTR{address}=="00:22:82:ff:ff:03", NAME="ethpi3"
SUBSYSTEM=="net", ATTR{address}=="00:22:82:ff:ff:04", NAME="ethpi4"
```

**Match network interfaces with static IP**

Edit the ‘/etc/dhcpcd.conf’ and add the follow settings to the bottom
of the file.


``` bash
interface ethpi1
static ip_address=10.0.11.1/24
 
interface ethpi2
static ip_address=10.0.12.1/24
 
interface ethpi3
static ip_address=10.0.13.1/24
 
interface ethpi4
static ip_address=10.0.14.1/24
```

**Set up FTP server**

``` bash
sudo apt-get install proftpd-dev
```

**Set up OpenCV**

https://pimylifeup.com/raspberry-pi-opencv/

## Timelapse photography ##

The primary purpose of the observatory is to produce timelapse
photography.  The images must be captured using as little power as
possible. Therefore, the camera should be shutoff when not in use.

The program `raspistill` is robust and only activates the camera for a
short time period. It can be called using a cronjob. The command to
call `raspistill` must also act as a wrapper for configuration and
error handling. <!-- TODO: write a script which can be called from
cronjob and includes all settings for the camera --> <!-- TODO: handle
errors -->

<!-- TODO: figure out filesizes 

A photo taken with the camera module will be around 2.4MB. This is
about 425 photos per GB.

Taking 1 photo per minute would take up 1GB in about 7 hours. This is
a rate of about 144MB per hour or 3.3GB per day.-->

## Live Stream ##

The live stream is only be active when a client requests the
stream. Therefore it will be handled by the http server which will run
a script. 

There are multiple ways to live stream off of the DEEPi. The most
robust is to use the installed raspivid program to stream to VLC on
the client side using TCP. Such a system is easily set up and requires
very little from the client in terms of prep. 

<!-- TODO: make this happen --> A better solution would be entirely
browser based so that all of the necessary code is is stored on the pi
and served as javascript to be run by the browser. This can be done
with using a motion jpeg (MJPEG) which is a continuously updating jpeg
image. 

<!-- TODO: set up live stream to start raspimjpeg and serve the image
to the webserver-->

## Camera Settings ##


The bash script controlling the camera takes into account every
possible variable and provides a default value. Once the default
values are set, the script loads variables from the config file which
overwrite any default values. Then all of the values are given to
whichever camera control commands is currently being used. <!-- TODO:
create a camera config file --> <!-- TODO: create a bash load config
script --> <!-- TODO: create a python load config script -->


Camera settings can be modified by uploading a new config file via
FTP or by manually editing the file.

<!-- TODO: give the webserver the ability to modify the settings
file-->


## Logging ##

<!-- TODO: set up logging -->

<!-- Logs must exists on deepi and on cluster. They should be backed
up and represent every possible error that could occur. In general, we
would prefer to over log. Incorporate system logs as much as possible-->

## DEEPi Cluster Server ##

<!-- TODO: fill out sections --> <!-- NTP Server --> <!-- FTP Server
--> <!-- HTTP Server --> <!-- Auto backup --> <!-- pass through
networking -->

## Time sync ##

The whole system must be time syncronized. Pi Zeros have bad clocks
which drift over time. Therefore, time syncronization is controlled
from an NTP server which will be on the RPi4. 

<!-- TODO: set up NTP server on RPi4 -->
<!-- TODO: add specifying the NTP server to the install process -->

## Cronjob ##

<!-- TODO: set up the cronjobs-->


## Backup ##

<!-- TODO: back up images incase of failure -->

## Contributors ##

* [Russell Shomberg](https://rshom.github.io)
* [Brennan Phillips](https://web.uri.edu/uril/)
<!-- TODO: add contributors-->

## License ##
<!--- If you're not sure which open license to use see https://choosealicense.com/--->

This project uses the following license: MIT.


	

