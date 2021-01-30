# Set up DEEPi Cluster #

## Overview ##

The RPi4 acts the network hub which gives commands to each RPiZ via
SSH (and other protocols). The RPi4 can either be accessed via network 
connection or through a monitor. 

## Networking ##

### RPi4 Networking Set Up ###

> There are many detailed instructions on how to perform most of these
> steps available online including RPi specific instructions. I will
> not reproduce them here.

1. Install the full [Raspberry Pi
   OS](https://www.raspberrypi.org/software/operating-systems/) with
   desktop and recommended software. Be sure to use the maximum
   available SD card size as this will determine the how much media
   storage is available to the cluster.

2. Change hostname to `deepi-cluster`.

3. Set UDEV rules to change the network interface names. These are
   specific networking rules for specific devices. We are going to
   give the RPiZ's specific ethernet addresses matching the ones below
   allowing the RPi4 to identify them as seperate devices and set
   seperate network interaces to deal with them.

	Create a file `/etc/udev/rules.d/90-deepi.rules` and add the
	following.

```
SUBSYSTEM=="net", ATTR{address}=="00:22:82:ff:ff:01", NAME="ethpi1"
SUBSYSTEM=="net", ATTR{address}=="00:22:82:ff:ff:02", NAME="ethpi2"
SUBSYSTEM=="net", ATTR{address}=="00:22:82:ff:ff:03", NAME="ethpi3"
SUBSYSTEM=="net", ATTR{address}=="00:22:82:ff:ff:04", NAME="ethpi4"
```

4. Match network interfaces with static IP. Edit the
   `/etc/dhcpcd.conf` and add the follow settings to the bottom of the
   file. The RPiZ's represent different network interfaces. Therefore,
   they must be on different subnets. Otherwise, traffic will attempt
   to go down the wrong path based on the first subnet it finds. The
   RPi4 must set its own static IP to `10.0.1x.1` where `x` represents
   the subnet. Below, the RPiZ's will take the static IPs of
   `10.0.1x.2` whre `x` represents the matching subnets.
   

```
interface ethpi1
static ip_address=10.0.11.1/24
	
interface ethpi2
static ip_address=10.0.12.1/24
	
interface ethpi3
static ip_address=10.0.13.1/24

interface ethpi4
static ip_address=10.0.14.1/24
```

5. Install `uhubctl`. <!-- TODO: fill in details here -->

6. Install `usbreset` <!-- TODO: fill in details here -->

### RPiZ Networking Set Up ###

Follow the following steps for each of the RPiZ used in
project. Throughout these steps an `x` will be used to represent each
unique RPiZ. These values need to match networking values used above
which were `1` through `4`.

Refer to the deepi-os project <!-- TODO: link --> and follow all
instructions up to the initial boot. Keep the microSD mounted on a
computer, and make the following edits.

1. In `boot/one-time-script.conf`, change the following lines
   throughout the file. Be sure the `x` in the hostname matches.
   
```
new_hostname = deepi0x
packages_to_install = python3 python3-pip proftpd screen lighttpd ntp vlc

# wifi settings
# country code from /usr/share/zoneinfo/iso3166.tab
# NOTE: this should match the internet available
new_wifi_country = US
new_wifi_ssid = "MY_WIFI_NETWORK"
new_wifi_password = "MY_WIFI_PASSWORD"
```
   
   The wifi will only work with a 2.4GHz network. If the network
   blocks internet forwarding, the wifi is necessary to install
   software. <!-- TODO: confirm this. URI secure and URI open (I
   think) block -->
   
   It is useful to assign the wifi to a smart phone hotspot as a
   back up for future debugging.
   
3. Go into the `boot/payload/` directory to edit files that will go
   directly into the RPiZ filesystem after set up.
   
4. Create a file `/etc/network/interfaces.d/usb0` and with the
   following content with each `x` replaced..
	  
<<<<<<< HEAD
	  ```
	  allow-hotplug usb0
	  iface usb0 inet static
	  address 10.0.1x.2
	  netmask 255.255.255.0
	  network 10.0.1x.01
	  broadcast 10.0.12.255
	  gateway 10.0.1x.1
	  ```

   3. Plug SD into RPiZ and allow to run. RPiZ will reboot a few times
	  before finishing. (for this to work an internet connection must
	  open either through wifi or through usb over ethernet.) **This
	  process will take a very long time** and interrupting it may be
	  ruin the process. The RPiZ should reboot three times before
	  complete.
=======
```
allow-hotplug usb0
iface usb0 inet static
address 10.0.1x.2
netmask 255.255.255.0
network 10.0.1x.01
broadcast 10.0.1x.255
gateway 10.0.1x.1
```

5. Plug SD into RPiZ and allow to run. RPiZ will reboot a few times
   before finishing. (for this to work an internet connection must
   open either through wifi or through usb over ethernet.) **This
   process will take a very long time** and interrupting it may be
   ruin the process. The RPiZ should reboot three times before
   complete.
>>>>>>> 9a4c9ca9d2803e7ad524e8a077ba19f416bbac93
	  
### Test Network Setup ###

At this point, the cluster is bassically set up and may be plugged in
and tested. Once everything is plugged, power it on and give a little
time to boot.

Use `ifconfig` to view the network devices and the IP addresses. Use
`ping 10.0.1x.2` to test each connection. Use `ssh pi@10.0.1x.2` to
login to each RPiZ to test control. The password (unless changed manually) is
`raspberry`. 

<!-- TODO: include some troubleshooting here. -->

### Enable Passwordless SSH ###

Set up passwordless SSH via by generating a public key.

Run the following on the RPi4. When prompted, a password is
unnecessary for most applications.

```
ssh-keygen -t rsa
```

Copy the newly made key to the RPiZs. Follow the prompts as necessary.

```
ssh-copy-id pi@10.0.11.2
ssh-copy-id pi@10.0.12.2
ssh-copy-id pi@10.0.13.2
ssh-copy-id pi@10.0.14.2
```

Test the connections. No password prompt should be necessary.

```
ssh pi@10.0.11.2
ssh pi@10.0.12.2
ssh pi@10.0.13.2
ssh pi@10.0.14.2
```

### Enable IP Forwarding ###

Enable IP forwarding so that the RPiZs can be accessed from the network.

1. SSH into the RPi4 and run `sudo sysctl net.ipv4.ip_forward=1`.
2. Edit the routing table of the computer attempting to reach the RPiZ
   to route traffic for the subnet through the RPi4.
   
   If the computer is a mac and the RPi4 IP address is 192.168.0.2,
   the command looks like `sudo route add 10.0.0/24.0/24 192.168.0.2`.


## Additional Software ##

