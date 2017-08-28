const btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
const TARGET_ADDRESS = "B8:27:EB:D1:4E:7A"; // Replace with bluetooth address of your target device.
const TARGET_CHANNEL = 1;
console.log('Connecting to ' + TARGET_ADDRESS + "...");
process.stdin.resume();
process.stdin.setEncoding('utf8');
btSerial.connect(TARGET_ADDRESS, TARGET_CHANNEL, function() {
    console.log("Connected!");
    btSerial.write(new Buffer("Hello world!", 'utf-8'), function(err, count) {
        console.error(err);
    });
    btSerial.on('data', function(data) {
        console.log(data.toString('utf-8'));
    });
}, function (err) {
    console.error(err);
});
