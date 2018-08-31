cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-geolocation.geolocation",
    "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.PositionError",
    "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
    "pluginId": "cordova-plugin-geolocation",
    "runs": true
  },
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "id": "cordova-sqlite-storage.SQLitePlugin",
    "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
    "pluginId": "cordova-sqlite-storage",
    "clobbers": [
      "SQLitePlugin"
    ]
  },
  {
    "id": "cordova-plugin-android-imei.IMEI",
    "file": "plugins/cordova-plugin-android-imei/www/index.js",
    "pluginId": "cordova-plugin-android-imei",
    "clobbers": [
      "cordova.plugins.IMEI"
    ]
  },
  {
    "id": "cordova-plugin-imei.IMEIPlugin",
    "file": "plugins/cordova-plugin-imei/www/imei.js",
    "pluginId": "cordova-plugin-imei",
    "clobbers": [
      "window.plugins.imei"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-geolocation": "4.0.1",
  "cordova-plugin-network-information": "2.0.1",
  "cordova-sqlite-storage": "2.4.0",
  "cordova-plugin-android-imei": "1.0.0",
  "cordova-plugin-imei": "0.0.1"
};
// BOTTOM OF METADATA
});