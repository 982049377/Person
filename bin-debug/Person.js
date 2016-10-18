var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.call(this);
        this._person = new egret.Bitmap();
    }
    var d = __define,c=Person,p=c.prototype;
    p.SetState = function (e) {
        if (this._State != e) {
            this._State.onExit();
        }
        this._State = e;
        this._State.onEnter();
    };
    p.firstCreat = function () {
        this._person = this.createBitmapByName("10000_png");
        this._person.x = 0;
        this._person.y = 0;
        this.setAnchor(this._person);
        this.addChild(this._person);
        var idle = new Idle(this);
        var walk = new Walk(this);
        this._State = idle;
        idle.onEnter();
    };
    p.Creat = function () {
        var _this = this;
        var walk = new Walk(this);
        var idle = new Idle(this);
        var x;
        var y;
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            if (_this._State == walk) {
                console.log("          " + _this._State);
                egret.Tween.removeTweens(_this._person);
                egret.Tween.get(_this._person).to({ x: evt.stageX, y: evt.stageY }, 2000, egret.Ease.sineIn);
            }
            else {
                _this.SetState(walk);
                egret.Tween.get(_this._person).to({ x: evt.stageX, y: evt.stageY }, 2000, egret.Ease.sineIn);
            }
            x = evt.stageX;
            y = evt.stageY;
        }, this);
        egret.startTick(function () {
            if (_this._person.x == x && _this._person.y == y) {
                _this.SetState(idle);
            }
            return false;
        }, this);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.setAnchor = function (e) {
        e.$setAnchorOffsetX(e.width / 2);
        e.$setAnchorOffsetY(e.height / 2);
    };
    return Person;
}(egret.DisplayObjectContainer));
egret.registerClass(Person,'Person');
var Idle = (function () {
    function Idle(pperson) {
        this.person = new Person();
        this.Idlelist = ["Idle0_png", "Idle1_png", "Idle2_png", "Idle3_png"];
        this.count = -1;
        this.i = 0;
        this.person = pperson;
    }
    var d = __define,c=Idle,p=c.prototype;
    ;
    p.onEnter = function () {
        egret.startTick(this.PlayIdle, this);
    };
    p.onExit = function () {
        egret.stopTick(this.PlayIdle, this);
        console.log("IdleExit");
    };
    p.PlayIdle = function () {
        this.count++;
        this.i++;
        if (this.count >= this.Idlelist.length)
            this.count = 0;
        //var na=(i+10000).toString()+"_png";
        //console.log("Idle");
        if (this.i == 10) {
            this.person._person.texture = RES.getRes(this.Idlelist[this.count]);
            this.i = 0;
        }
        return false;
    };
    return Idle;
}());
egret.registerClass(Idle,'Idle',["State"]);
var Walk = (function () {
    function Walk(pperson) {
        this.Walklist = ["10000_png", "10001_png", "10002_png", "10003_png", "10004_png", "10005_png", "10006_png", "10007_png"];
        this.Walkcount = -1;
        this.person = new Person();
        this.i = 0;
        this.person = pperson;
    }
    var d = __define,c=Walk,p=c.prototype;
    p.onEnter = function () {
        egret.startTick(this.PlayWalk, this);
        console.log("EnterWalk");
    };
    p.onExit = function () {
        egret.stopTick(this.PlayWalk, this);
    };
    p.PlayWalk = function () {
        this.Walkcount++;
        this.i++;
        if (this.Walkcount >= this.Walklist.length)
            this.Walkcount = 0;
        if (this.i == 10) {
            this.person._person.texture = RES.getRes(this.Walklist[this.Walkcount]);
            this.i = 0;
        }
        //  console.log("Walk");
        //  console.log(this.Walklist[this.Walkcount]);
        return false;
    };
    return Walk;
}());
egret.registerClass(Walk,'Walk',["State"]);
//# sourceMappingURL=Person.js.map