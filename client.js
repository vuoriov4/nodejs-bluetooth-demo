const btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
const TARGET_ADDRESS = "60:6B:BD:10:8A:59"; // Replace with bluetooth address of your target device.
const TARGET_CHANNEL = 1;

console.log("Scanning for bluetooth devices...");
btSerial.on('found', function(address, name) {
    console.log("Found a device (" + address + ")");
    if (address === TARGET_ADDRESS) {
        console.log("Target device detected! Connecting to channel " + TARGET_CHANNEL + "...");
        btSerial.findSerialPortChannel(address, function(channel) {
            if (channel === TARGET_CHANNEL) {
                btSerial.connect(address, channel, function() {
                    console.log("Success! Sending message...");
                    btSerial.write(new Buffer('Hello world!', 'utf-8'), function(err, bytesWritten) {
                        if (err) console.log(err);
                    });
                    btSerial.on('data', function(buffer) {
                        console.log("Response: " + buffer.toString('utf-8'));
                    });
                }, function() {
                    console.log("Error: Can't connect to channel " + TARGET_CHANNEL + ".");
                });
                btSerial.close();
            }
    	}, function() {
    		console.log('Error: No channels found');
    	});
    } else {
        console.log("That's not the target device.");
    }
});

btSerial.inquire();
