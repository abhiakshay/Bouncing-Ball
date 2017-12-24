let mCircle = {
    x: 360,
    y: 50,
    r: 50
};

const period = 2000; //in ms
let that;
class BouncingBall {
    constructor() {
        this.canvas = document.getElementById('stage');
        this.stage = this.canvas.getContext('2d');
        this.gradient = {};
        that = this;
    }

    init() {
        this.setBackground();
        this.drawCircle();
        this.centerY = this.canvas.height / 2;
        this.amplitude = this.centerY - mCircle.r;
        setTimeout(function() {
            var startTime = (new Date()).getTime();
            that.animate(startTime);
        }, 1000);
    }

    setBackground() {
        this.gradient = this.stage.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        this.gradient.addColorStop(0, 'skyblue');
        this.gradient.addColorStop(1, 'white');
        this.stage.fillStyle = this.gradient;
        this.stage.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.stage.save();
    }

    drawCircle() {
        this.stage.fillStyle = this.gradient;
        this.stage.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.stage.restore();
        this.stage.moveTo(mCircle.x, mCircle.y);
        this.stage.beginPath();
        this.stage.arc(mCircle.x, mCircle.y, mCircle.r, 0, Math.PI * 2, true);
        this.stage.fillStyle = 'blue';
        this.stage.fill();
    }

    animate(startTime) {
        // update
        let time = (new Date()).getTime() - startTime;
        let nextY = that.amplitude * Math.sin(time * 2 * Math.PI / period) + that.centerY;
        mCircle.y = nextY;
        that.drawCircle();
        // request new frame
        requestAnimFrame(function() {
            that.animate(startTime);
        });
    }

}


window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

let bouncingBall = new BouncingBall();
bouncingBall.init();