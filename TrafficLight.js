var b = require('bonescript');
var Lighter = {
    pins: {
        gre: 'P8_14',
        yel: 'P8_16',
        red: 'P8_18',
        left: 'P8_17',
        right: 'P8_15'
    },
    pin_state: {
        gre: 0,
        yel: 0,
        red: 0,
        left: 0,
        right: 0
    },
    on: function (val) {
        this.pin_state[val] = 1;
        this.refresh();
    },
    off: function (val) {
        this.pin_state[val] = 0;
        this.refresh();
    },
    refresh: function () {
        for (var i in this.pins) {
            b.digitalWrite(this.pins[i], this.pin_state[i] == 1 ? b.HIGH : b.LOW);
        }
    },
    work: function () {
        var time = 0;
        setTimeout(function () {
            Lighter.on('gre');
        }, time);
        setTimeout(function () {
            Lighter.off('gre');
        }, time += 4000);
        setTimeout(function () {
            Lighter.on('gre');
        }, time += 500);
        setTimeout(function () {
            Lighter.off('gre');
        }, time += 500);
        setTimeout(function () {
            Lighter.on('yel');
        }, time += 500);
        setTimeout(function () {
            Lighter.off('yel');
        }, time += 3000);
        setTimeout(function () {
            Lighter.on('red');
        }, time += 500);
        setTimeout(function () {
            Lighter.on('right');
        }, time += 5000);
        setTimeout(function () {
            Lighter.off('right');
        }, time += 5000);
        setTimeout(function () {
            Lighter.on('left');
        }, time += 500);
        setTimeout(function () {
            Lighter.off('left');
        }, time += 5000);
        setTimeout(function () {
            Lighter.on('yel');
        }, time += 3000);
        setTimeout(function () {
            Lighter.off('red');
        }, time += 2000);
        setTimeout(function () {
            Lighter.off('yel');
        }, time);
        return time;
    }
};
var events = require("events");
var time = 0;

(function () {
    var pulse_num = 0;
    var heartbeat = new events.EventEmitter();
    heartbeat.addListener('beat', function () {
        pulse_num += 1;
        setTimeout(function () {
            console.log(pulse_num);
            time = Lighter.work();
            heartbeat.emit('beat');
        }, time);
    });
    heartbeat.emit('beat');
})();