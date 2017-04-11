'use strict';
var libQ = require('kew');

module.exports = CoreCommandRouterMockup;
function CoreCommandRouterMockup(server) {
    this.logger= new (require('./loggerMockup.js'))();
}

CoreCommandRouterMockup.prototype.volumioPause = function () {

};

CoreCommandRouterMockup.prototype.volumioStop = function () {


};

CoreCommandRouterMockup.prototype.volumioPrevious = function () {

};

CoreCommandRouterMockup.prototype.volumioNext = function () {

};

CoreCommandRouterMockup.prototype.volumioGetState = function () {

};

CoreCommandRouterMockup.prototype.volumioGetQueue = function () {

};

CoreCommandRouterMockup.prototype.volumioRemoveQueueItem = function (nIndex) {

};

CoreCommandRouterMockup.prototype.volumioClearQueue = function () {

};

CoreCommandRouterMockup.prototype.volumiosetvolume = function (VolumeInteger) {

};

CoreCommandRouterMockup.prototype.volumioupdatevolume = function (vol) {

};

CoreCommandRouterMockup.prototype.volumioretrievevolume = function (vol) {

};


CoreCommandRouterMockup.prototype.volumioUpdateVolumeSettings = function (vol) {

};

CoreCommandRouterMockup.prototype.addCallback = function (name, callback) {

};

CoreCommandRouterMockup.prototype.callCallback = function (name, data) {

};

CoreCommandRouterMockup.prototype.volumioAddQueueUids = function (arrayUids) {

};

CoreCommandRouterMockup.prototype.volumioRebuildLibrary = function () {

};

CoreCommandRouterMockup.prototype.volumioGetLibraryFilters = function (sUid) {

};

CoreCommandRouterMockup.prototype.volumioGetLibraryListing = function (sUid, objOptions) {

};

CoreCommandRouterMockup.prototype.volumioGetBrowseSources = function () {

};

CoreCommandRouterMockup.prototype.volumioAddToBrowseSources = function (data) {
};

CoreCommandRouterMockup.prototype.volumioRemoveToBrowseSources = function (data) {

};

CoreCommandRouterMockup.prototype.volumioUpdateToBrowseSources = function (name, data) {

};

CoreCommandRouterMockup.prototype.volumioGetPlaylistIndex = function (sUid) {

};

CoreCommandRouterMockup.prototype.serviceUpdateTracklist = function (sService) {

};

CoreCommandRouterMockup.prototype.volumiowirelessscan = function () {

};

CoreCommandRouterMockup.prototype.volumiopushwirelessnetworks = function (results) {

};

CoreCommandRouterMockup.prototype.volumioImportServicePlaylists = function () {

};

CoreCommandRouterMockup.prototype.volumioSearch = function (data) {

};

CoreCommandRouterMockup.prototype.volumioPushState = function (state) {

};

CoreCommandRouterMockup.prototype.volumioResetState = function () {

};

CoreCommandRouterMockup.prototype.volumioPushQueue = function (queue) {

};

CoreCommandRouterMockup.prototype.serviceClearAddPlayTracks = function (arrayTrackIds, sService) {

};

CoreCommandRouterMockup.prototype.serviceStop = function (sService) {

};

CoreCommandRouterMockup.prototype.servicePause = function (sService) {

};

CoreCommandRouterMockup.prototype.serviceResume = function (sService) {

};


CoreCommandRouterMockup.prototype.servicePushState = function (state, sService) {

};

CoreCommandRouterMockup.prototype.getAllTracklists = function () {

};

CoreCommandRouterMockup.prototype.addQueueItems = function (arrayItems) {

};

CoreCommandRouterMockup.prototype.replaceAndPlay = function (arrayItems) {

};

CoreCommandRouterMockup.prototype.checkFavourites = function (data) {

};

CoreCommandRouterMockup.prototype.emitFavourites = function (msg) {

};

CoreCommandRouterMockup.prototype.playPlaylist = function (data) {

};


CoreCommandRouterMockup.prototype.getId = function () {

};


CoreCommandRouterMockup.prototype.getPlugConf = function (category, plugin) {

};


CoreCommandRouterMockup.prototype.catPluginsConf = function (category, array) {

};

CoreCommandRouterMockup.prototype.getPluginsConf = function () {

};

CoreCommandRouterMockup.prototype.writePluginsConf = function () {

};

CoreCommandRouterMockup.prototype.restorePluginsConf = function (request) {

};

CoreCommandRouterMockup.prototype.usefulBackupConfs = function (currArray, backArray) {

};

CoreCommandRouterMockup.prototype.writeConfs = function (data) {

};

CoreCommandRouterMockup.prototype.min = function (a, b) {

};

CoreCommandRouterMockup.prototype.installBackupPlugins = function (name, array) {

};

CoreCommandRouterMockup.prototype.loadBackup = function (request) {

};

CoreCommandRouterMockup.prototype.loadPlaylistsBackup = function () {

};

CoreCommandRouterMockup.prototype.loadFavBackup = function (type) {

};

CoreCommandRouterMockup.prototype.writePlaylistsBackup = function () {

};

CoreCommandRouterMockup.prototype.writeFavouritesBackup = function () {

};

CoreCommandRouterMockup.prototype.restorePlaylistBackup = function () {

};

CoreCommandRouterMockup.prototype.restoreFavouritesBackup = function (type) {

};

CoreCommandRouterMockup.prototype.restorePlaylist = function (req) {

};


CoreCommandRouterMockup.prototype.checkBackup = function (backup) {

};

CoreCommandRouterMockup.prototype.checkFavouritesType = function (type, backup) {

};

CoreCommandRouterMockup.prototype.mergePlaylists = function (recent, old) {

};

CoreCommandRouterMockup.prototype.managePlaylists = function (value) {

};


CoreCommandRouterMockup.prototype.manageFavourites = function (value) {

};

CoreCommandRouterMockup.prototype.executeOnPlugin = function (type, name, method, data) {

};

CoreCommandRouterMockup.prototype.getUIConfigOnPlugin = function (type, name, data) {

};

CoreCommandRouterMockup.prototype.pushDebugConsoleMessage = function (sMessage) {

};

CoreCommandRouterMockup.prototype.pushErrorConsoleMessage = function (sMessage) {

};

CoreCommandRouterMockup.prototype.pushConsoleMessage = function (sMessage) {

};

CoreCommandRouterMockup.prototype.pushToastMessage = function (type, title, message) {

};

CoreCommandRouterMockup.prototype.broadcastToastMessage = function (type, title, message) {

};

CoreCommandRouterMockup.prototype.broadcastMessage = function (msg, value) {

};

CoreCommandRouterMockup.prototype.pushMultiroomDevices = function (data) {

};

CoreCommandRouterMockup.prototype.pushMultiroom = function (data) {

};

CoreCommandRouterMockup.prototype.pushAirplay = function (data) {

};

CoreCommandRouterMockup.prototype.shutdown = function () {

};

CoreCommandRouterMockup.prototype.reboot = function () {

};

CoreCommandRouterMockup.prototype.networkRestart = function () {

};

CoreCommandRouterMockup.prototype.wirelessRestart = function () {

};

CoreCommandRouterMockup.prototype.startupSound = function () {

};

CoreCommandRouterMockup.prototype.fileUpdate = function (data) {

};

CoreCommandRouterMockup.prototype.explodeUriFromService = function (service, uri) {
    return libQ.resolve();
};

CoreCommandRouterMockup.prototype.volumioPlay = function (N) {

};

CoreCommandRouterMockup.prototype.volumioSeek = function (position) {

};

CoreCommandRouterMockup.prototype.installPlugin = function (uri) {

};

CoreCommandRouterMockup.prototype.updatePlugin = function (data) {

};

CoreCommandRouterMockup.prototype.unInstallPlugin = function (data) {

};

CoreCommandRouterMockup.prototype.enablePlugin = function (data) {

};

CoreCommandRouterMockup.prototype.disablePlugin = function (data) {

};

CoreCommandRouterMockup.prototype.modifyPluginStatus = function (data) {

};

CoreCommandRouterMockup.prototype.broadcastMessage = function (emit, payload) {

};

CoreCommandRouterMockup.prototype.getInstalledPlugins = function () {

};

CoreCommandRouterMockup.prototype.getAvailablePlugins = function () {

};

CoreCommandRouterMockup.prototype.getPluginDetails = function (data) {

};


CoreCommandRouterMockup.prototype.enableAndStartPlugin = function (category, name) {

};


CoreCommandRouterMockup.prototype.disableAndStopPlugin = function (category, name) {

};


CoreCommandRouterMockup.prototype.volumioRandom = function (data) {

};

CoreCommandRouterMockup.prototype.volumioRepeat = function (repeat, repeatSingle) {

};

CoreCommandRouterMockup.prototype.volumioConsume = function (data) {

};


CoreCommandRouterMockup.prototype.volumioFFWDRew = function (millisecs) {

};

CoreCommandRouterMockup.prototype.volumioSaveQueueToPlaylist = function (name) {

};


CoreCommandRouterMockup.prototype.volumioMoveQueue = function (from, to) {

};

CoreCommandRouterMockup.prototype.getI18nString = function (key) {

};

CoreCommandRouterMockup.prototype.loadI18nStrings = function () {
};

CoreCommandRouterMockup.prototype.i18nJson = function (dictionaryFile, defaultDictionaryFile, jsonFile) {


};

CoreCommandRouterMockup.prototype.translateKeys = function (parent, dictionary, defaultDictionary) {

};

CoreCommandRouterMockup.prototype.updateBrowseSourcesLang = function () {

};

CoreCommandRouterMockup.prototype.checkAndPerformSystemUpdates = function () {

};