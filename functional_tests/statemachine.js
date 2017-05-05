'use strict';

var fs = require('fs-extra');
var standard = require('standard');
var should = require('should');
var config = require('./config.json');
var io = require('socket.io-client');
var libQ = require('kew');

var volumioURL = 'http://' + config.volumioIP + ':3000';


describe("Pre checks", function () {
    this.timeout(300000);

    it("Checking that needed songs are available", function (done) {
        var deferPos = 0;
        var defers = [];
        for (var i in config.songs) {
            defers.push(libQ.defer());
        }

        var socket = io.connect(volumioURL);
        socket.on('pushBrowseLibrary', function (data) {
            var pos = deferPos;
            deferPos++;

            data.should.have.property('navigation');

            var navigation = data.navigation;
            navigation.should.have.property('lists');

            var lists = navigation.lists;
            lists.should.be.instanceOf(Array).and.have.lengthOf(1);

            var list = lists[0];
            list.should.have.property('items').and.have.lengthOf(1);

            var items = list.items;
            items.should.be.instanceOf(Array).and.have.lengthOf(1);

            var item = items[0];
            item.should.have.property('service');
            item.should.have.property('type');
            item.should.have.property('title');
            item.should.have.property('artist');
            item.should.have.property('album');
            item.should.have.property('uri');
            item.should.have.property('icon');

            defers[pos].resolve();
        });

        libQ.all(defers)
            .then(function () {
                socket.removeAllListeners("pushBrowseLibrary");
                socket.disconnect();
                done();
            });

        for (var i in config.songs) {
            var songUrl = config.songs[i];
            socket.emit("browseLibrary", {uri: songUrl});
        }
    });
});

describe("Standard playback", function () {
    this.timeout(1000000);


    it("Configure playback modes", function () {
        var socket = io.connect(volumioURL);
        socket.emit("setRepeat",{value:false,repeatSingle:false});
        socket.disconnect();
    });

    it("Clearing queue", function (done) {
       var socket = io.connect(volumioURL);
       socket.on('pushQueue', function (data) {
            data.should.be.instanceOf(Array).and.have.lengthOf(0);
           socket.removeAllListeners("pushQueue");
           socket.disconnect();
           done();
        });

        socket.emit("clearQueue");
        socket.emit("getQueue");

    });

    it("Adding songs to queue", function (done) {
        var deferPos = 0;
        var defers = [];
        for (var i in config.songs) {
            defers.push(libQ.defer());
        }

        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            var pos = deferPos;
            deferPos++;

            data.should.be.instanceOf(Array);
            for(var i in data)
            {
                var song=data[i];
                song.should.have.a.property("uri");
                song.should.have.a.property("service");
                song.should.have.a.property("name");
                song.should.have.a.property("artist");
                song.should.have.a.property("album");
                song.should.have.a.property("type");
                song.should.have.a.property("tracknumber");
                song.should.have.a.property("albumart");
                song.should.have.a.property("duration");
                song.should.have.a.property("trackType");
            }

            defers[pos].resolve();
        });

        libQ.all(defers)
            .then(function () {
                socket.removeAllListeners("pushQueue");
                socket.disconnect();
                done();
            });

        for (var i in config.songs) {
            var songUrl = config.songs[i];
            socket.emit("addToQueue",{'service':'mpd', 'uri':songUrl});
        }

    });

    it("Play song", function (done) {
        var deferPos = 0;
        var defers = [];
        for (var i in config.songs) {
            defers.push(libQ.defer());
        }
        var socket = io.connect(volumioURL);

        var lastUpdatedDefer=0;
        socket.on('pushState', function (data) {
            data.should.have.property('status');
            data.should.have.property('position');
            data.should.have.property('title');
            data.should.have.property('artist');
            data.should.have.property('album');
            data.should.have.property('albumart');
            data.should.have.property('uri');

            var status=data.status;
            if(status === 'play')
            {
                var position=data.position;
                if(position === lastUpdatedDefer)
                {
                    lastUpdatedDefer=position;
                    defers[position].resolve();
                    lastUpdatedDefer++;
                }
            }
        });

        libQ.all(defers)
            .then(function () {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                done();
            });

        socket.emit("play",{'value':0});

    });

    it("Checking that Volumio stopped", function (done) {

        var socket = io.connect(volumioURL);
        socket.on('pushState', function (data) {
            data.should.have.property('status');
            var status=data.status;

            if(status === 'stop') {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                done();
            }
        });

    });


});


describe("Playback controls (Seek)", function () {
    this.timeout(1000000);

    it("Configure playback modes", function () {
        var socket = io.connect(volumioURL);
        socket.emit("setRepeat",{value:false,repeatSingle:false});
        socket.disconnect();
    });

    it("Clearing queue", function (done) {
        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            data.should.be.instanceOf(Array).and.have.lengthOf(0);
            socket.removeAllListeners("pushQueue");
            socket.disconnect();
            done();
        });

        socket.emit("clearQueue");
    });

    it("Adding songs to queue", function (done) {
        var deferPos = 0;
        var defers = [];
        for (var i in config.songs) {
            defers.push(libQ.defer());
        }

        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            var pos = deferPos;
            deferPos++;

            data.should.be.instanceOf(Array);
            for(var i in data)
            {
                var song=data[i];
                song.should.have.a.property("uri");
                song.should.have.a.property("service");
                song.should.have.a.property("name");
                song.should.have.a.property("artist");
                song.should.have.a.property("album");
                song.should.have.a.property("type");
                song.should.have.a.property("tracknumber");
                song.should.have.a.property("albumart");
                song.should.have.a.property("duration");
                song.should.have.a.property("trackType");
            }

            defers[pos].resolve();
        });

        libQ.all(defers)
            .then(function () {
                socket.removeAllListeners("pushQueue");
                socket.disconnect();
                done();
            });

        for (var i in config.songs) {
            var songUrl = config.songs[i];
            socket.emit("addToQueue",{'service':'mpd', 'uri':songUrl});
        }

    });

    it("Play song", function (done) {
        var deferPos = 0;
        var defers = [];
        for (var i in config.songs) {
            defers.push(libQ.defer());
        }
        var socket = io.connect(volumioURL);

        var lastUpdatedDefer=0;
        socket.on('pushState', function (data) {
            data.should.have.property('status');
            data.should.have.property('position');
            data.should.have.property('title');
            data.should.have.property('artist');
            data.should.have.property('album');
            data.should.have.property('albumart');
            data.should.have.property('uri');

            var status=data.status;
            if(status === 'play')
            {
                var position=data.position;
                if(position === lastUpdatedDefer)
                {
                    lastUpdatedDefer=position;
                    defers[position].resolve();
                    lastUpdatedDefer++;

                    socket.emit("seek",config.seekTimes[position]);
                }
            }
        });

        libQ.all(defers)
            .then(function () {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                done();
            });

        socket.emit("play",{'value':0});

    });

    it("Checking that Volumio stopped", function (done) {

        var socket = io.connect(volumioURL);
        socket.on('pushState', function (data) {
            data.should.have.property('status');
            var status=data.status;

            if(status === 'stop') {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                done();
            }
        });

    });


});


describe("Playback controls (Pause/Resume)", function () {
    this.timeout(1000000);

    it("Configure playback modes", function () {
        var socket = io.connect(volumioURL);
        socket.emit("setRepeat",{value:false,repeatSingle:false});
        socket.disconnect();
    });

    it("Clearing queue", function (done) {
        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            data.should.be.instanceOf(Array).and.have.lengthOf(0);
            socket.removeAllListeners("pushQueue");
            socket.disconnect();
            done();
        });

        socket.emit("clearQueue");
        socket.emit("getQueue");

    });

    it("Adding songs to queue", function (done) {

        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            data.should.be.instanceOf(Array);
            for(var i in data)
            {
                var song=data[i];
                song.should.have.a.property("uri");
                song.should.have.a.property("service");
                song.should.have.a.property("name");
                song.should.have.a.property("artist");
                song.should.have.a.property("album");
                song.should.have.a.property("type");
                song.should.have.a.property("tracknumber");
                song.should.have.a.property("albumart");
                song.should.have.a.property("duration");
                song.should.have.a.property("trackType");
            }

            socket.removeAllListeners("pushQueue");
            socket.disconnect();
            done();
        });

        var songUrl = config.songs[0];
        socket.emit("addToQueue",{'service':'mpd', 'uri':songUrl});
    });

    it("Play song", function (done) {
        var socket = io.connect(volumioURL);

        socket.on('pushState', function (data) {
            data.should.have.property('status');
            data.should.have.property('position');
            data.should.have.property('title');
            data.should.have.property('artist');
            data.should.have.property('album');
            data.should.have.property('albumart');
            data.should.have.property('uri');

            var status=data.status;
            if(status === 'play')
            {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                setTimeout(function () {
                    done();
                },5000)
            }
        });

        socket.emit("play",{'value':0});

    });

    it("Pause song", function (done) {
        var socket = io.connect(volumioURL);

        socket.on('pushState', function (data) {
            data.should.have.property('status');
            data.should.have.property('position');
            data.should.have.property('title');
            data.should.have.property('artist');
            data.should.have.property('album');
            data.should.have.property('albumart');
            data.should.have.property('uri');

            var status=data.status;
            if(status === 'pause')
            {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                setTimeout(function () {
                    done();
                },5000)
            }
        });

        socket.emit("pause");

    });

    it("Resume song", function (done) {
        var socket = io.connect(volumioURL);

        var lastUpdatedDefer=0;
        socket.on('pushState', function (data) {
            data.should.have.property('status');
            data.should.have.property('position');
            data.should.have.property('title');
            data.should.have.property('artist');
            data.should.have.property('album');
            data.should.have.property('albumart');
            data.should.have.property('uri');

            var status=data.status;
            if(status === 'play')
            {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                done();
            }
        });

        socket.emit("play");

    });


    it("Checking that Volumio stopped", function (done) {

        var socket = io.connect(volumioURL);
        socket.on('pushState', function (data) {
            data.should.have.property('status');
            var status=data.status;

            if(status === 'stop') {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                done();
            }
        });

    });


});


describe("Playback controls (Skip)", function () {
    this.timeout(1000000);

    it("Configure playback modes", function () {
        var socket = io.connect(volumioURL);
        socket.emit("setRepeat",{value:false,repeatSingle:false});
        socket.disconnect();
    });

    it("Clearing queue", function (done) {
        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            data.should.be.instanceOf(Array).and.have.lengthOf(0);
            socket.removeAllListeners("pushQueue");
            socket.disconnect();
            done();
        });

        socket.emit("clearQueue");
        socket.emit("getQueue");

    });

    it("Adding songs to queue", function (done) {
        var deferPos = 0;
        var defers = [];
        for (var i in config.songs) {
            defers.push(libQ.defer());
        }

        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            var pos = deferPos;
            deferPos++;

            data.should.be.instanceOf(Array);
            for(var i in data)
            {
                var song=data[i];
                song.should.have.a.property("uri");
                song.should.have.a.property("service");
                song.should.have.a.property("name");
                song.should.have.a.property("artist");
                song.should.have.a.property("album");
                song.should.have.a.property("type");
                song.should.have.a.property("tracknumber");
                song.should.have.a.property("albumart");
                song.should.have.a.property("duration");
                song.should.have.a.property("trackType");
            }

            defers[pos].resolve();
        });

        libQ.all(defers)
            .then(function () {
                socket.removeAllListeners("pushQueue");
                socket.disconnect();
                done();
            });

        for (var i in config.songs) {
            var songUrl = config.songs[i];
            socket.emit("addToQueue",{'service':'mpd', 'uri':songUrl});
        }

    });

    it("Play song", function (done) {
        var deferPos = 0;
        var defers = [];
        for (var i in config.songs) {
            defers.push(libQ.defer());
        }
        var socket = io.connect(volumioURL);

        var lastUpdatedDefer=0;
        socket.on('pushState', function (data) {
            data.should.have.property('status');
            data.should.have.property('position');
            data.should.have.property('title');
            data.should.have.property('artist');
            data.should.have.property('album');
            data.should.have.property('albumart');
            data.should.have.property('uri');

            var status=data.status;
            if(status === 'play')
            {
                var position=data.position;
                if(position === lastUpdatedDefer)
                {
                    lastUpdatedDefer=position;
                    defers[position].resolve();
                    lastUpdatedDefer++;

                    if(position<(config.songs.length-1))
                    {
                        setTimeout(function () {
                            socket.emit("next");
                        },3000)
                    }
                }
            }
        });

        libQ.all(defers)
            .then(function () {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                done();
            });

        socket.emit("play",{'value':0});

    });

    it("Checking that Volumio stopped", function (done) {

        var socket = io.connect(volumioURL);
        socket.on('pushState', function (data) {
            data.should.have.property('status');
            var status=data.status;

            if(status === 'stop') {
                socket.removeAllListeners("pushState");
                socket.disconnect();
                done();
            }
        });

    });


});

describe("Playback controls (Repeat)", function () {
    this.timeout(1000000);

    it("Clearing queue", function (done) {
        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            data.should.be.instanceOf(Array).and.have.lengthOf(0);
            socket.removeAllListeners("pushQueue");
            socket.disconnect();
            done();
        });

        socket.emit("clearQueue");
        socket.emit("getQueue");

    });

    it("Adding songs to queue", function (done) {
        var deferPos = 0;
        var defers = [];
        for (var i in config.songs) {
            defers.push(libQ.defer());
        }

        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            var pos = deferPos;
            deferPos++;

            data.should.be.instanceOf(Array);
            for(var i in data)
            {
                var song=data[i];
                song.should.have.a.property("uri");
                song.should.have.a.property("service");
                song.should.have.a.property("name");
                song.should.have.a.property("artist");
                song.should.have.a.property("album");
                song.should.have.a.property("type");
                song.should.have.a.property("tracknumber");
                song.should.have.a.property("albumart");
                song.should.have.a.property("duration");
                song.should.have.a.property("trackType");
            }

            defers[pos].resolve();
        });

        libQ.all(defers)
            .then(function () {
                socket.removeAllListeners("pushQueue");
                socket.disconnect();
                done();
            });

        for (var i in config.songs) {
            var songUrl = config.songs[i];
            socket.emit("addToQueue",{'service':'mpd', 'uri':songUrl});
        }

    });

    it("Play song", function (done) {

        var socket = io.connect(volumioURL);

        var seek=0;
        var repeated=0;

        socket.on('pushState', function (data) {
            data.should.have.property('status');
            data.should.have.property('position');
            data.should.have.property('title');
            data.should.have.property('artist');
            data.should.have.property('album');
            data.should.have.property('albumart');
            data.should.have.property('uri');

            var status=data.status;
            if(status === 'play')
            {
                if(data.seek<seek)
                {
                    if(repeated === 2)
                    {
                        socket.emit("stop");

                        socket.removeAllListeners("pushState");
                        socket.disconnect();
                        done();
                    }
                    else
                    {
                        repeated++;
                        seek=data.seek;
                    }
                } else {
                    seek=data.seek;
                }
            }
        });
        socket.emit("setRepeat",{value:true,repeatSingle:true});
        socket.emit("play",{'value':1});

    });

});


describe("Consume mode playback", function () {
    this.timeout(1000000);

    it("Configure playback modes", function () {
        var socket = io.connect(volumioURL);
        socket.emit("setRepeat",{value:false,repeatSingle:false});
        socket.disconnect();
    });

    it("Clearing queue", function (done) {
        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            data.should.be.instanceOf(Array).and.have.lengthOf(0);
            socket.removeAllListeners("pushQueue");
            socket.disconnect();
            done();
        });

        socket.emit("clearQueue");
    });

    it("Adding songs to queue", function (done) {
        var socket = io.connect(volumioURL);
        socket.on('pushQueue', function (data) {
            socket.removeAllListeners("pushQueue");
            socket.disconnect();
            done();
        });

        var consumeurl = config.consumeURL;
        socket.emit("addToQueue",{'service':'webradio', 'uri':consumeurl});


    });

    it("Play song", function (done) {
        var socket = io.connect(volumioURL);

        socket.on('pushState', function (data) {
            if(data.title)
            {
                socket.emit("stop");
                socket.removeAllListeners("pushState");
                socket.disconnect();

                data.should.have.property('consume').and.be.exactly(true);
                data.should.have.property('volatile').and.be.exactly(false);
                data.should.have.property('service').and.be.exactly("webradio");

                setTimeout(function(){done()},2000);
            }
        });

        socket.emit("play",{'value':0});

    });

});