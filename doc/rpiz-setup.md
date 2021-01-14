
1. Load the proper modules

```.bash
echo "dtoverlay=dwc2" | sudo tee -a /boot/config.txt
```

Add the following after `rootwait` in `/boot/cmdline.txt`, but replace
the `X` with a unique value 1 through 4 for each DEEPi.

```
modules-load=dwc2,g_ether g_ether.host_addr=00:22:82:ff:ff:0X g_ether.dev_addr=00:22:82:ff:ff:1X
```

2. Create a config script and put the following in it.

```.bash
sudo touch /usr/bin/deepi
sudo chmod +x /usr/bin/deepi
```

3. Set config script to run on start up by adding the following line
   to `/etc/rc.local` before the line exit line

```.bash
/usr/bin/deepi
```
