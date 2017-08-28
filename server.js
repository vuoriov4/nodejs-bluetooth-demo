const server = new(require('bluetooth-serial-port')).BluetoothSerialPortServer();
const TARGET_CHANNEL = 1;
const TARGET_UUID = '7a379a32-63ce-449d-b71a-40f4e6616458';
console.log("Listening for bluetooth at channel " + TARGET_CHANNEL + "...");
server.listen(function (clientAddress) {
    console.log('Client ' + clientAddress + ' connected.');
    server.on('data', function(buffer) {
        console.log('Received data from client: ' + buffer);
        server.write(new Buffer('Hello there!'));
    });
}, function(error){
	console.error(error);
}, {uuid: TARGET_UUID, channel: TARGET_CHANNEL} );
