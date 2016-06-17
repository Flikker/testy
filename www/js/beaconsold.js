function logThis(thetext) {
    
    if (thetext === 'succeeded') {
    itis = 'worked';
} else  { 
    itis = 'failed';
}
   document.getElementById("beaconalert").innerHTML = itis;
};


    
    



var delegate = new cordova.plugins.locationManager.Delegate();

delegate.didDetermineStateForRegion = function (pluginResult) {
    logThis('succeeded');
    logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
        + JSON.stringify(pluginResult));
};

delegate.didStartMonitoringForRegion = function (pluginResult) {
    console.log('didStartMonitoringForRegion:', pluginResult);
    document.getElementById("beaconalert").innerHTML=logThis();
    logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
};

delegate.didRangeBeaconsInRegion = function (pluginResult) {
    logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
};

var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
var identifier = 'blueberry';
var major = 44203;
var minor = 46278;

var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

cordova.plugins.locationManager.setDelegate(delegate);

// required in iOS 8+
cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
// or cordova.plugins.locationManager.requestAlwaysAuthorization()

cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
    .fail(function(e) { logThis('failed'); })
    .done();


