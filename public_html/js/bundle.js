// "webApiMap": {
//     "login": "https://zcggx.zxmn2018.com/Zhise/User/login",
//     "authorize": "",
//     "gameCfg": "https://zcggx.zxmn2018.com/Zhise/Game/config",
//     "updateInfo": "https://zcggx.zxmn2018.com/Zhise/User/update",
//     "gameStart": "https://zcggx.zxmn2018.com/Zhise/Game/start",
//     "gameEnd": "https://zcggx.zxmn2018.com/Zhise/Game/end",
//     "worldRank": null,
//     "logVideo": "https://zcggx.zxmn2018.com/Zhise/Game/video"
// },

// "webApi": {
//     "RequestStoreData": "https://zcggx.zxmn2018.com/App/Store/index",
//     "RequestEquipItem": "https://zcggx.zxmn2018.com/App/Store/use_goods",
//     "ExchangeCoin": "https://zcggx.zxmn2018.com/Zhise/Game/video",
//     "UnlockGoodsByGold": "https://zcggx.zxmn2018.com/App/Store/unlock_gold",
//     "UnlockGoodsByVideo": "https://zcggx.zxmn2018.com/App/Store/unlock_video"
// }
!function () {
    "use strict";
    class t {
        constructor() {
            this.jsonData = null;
        }
        init() {
            Laya.loader.load("config/nickname.json", Laya.Handler.create(this, function (t) {
                this.jsonData = [];
                for (let a = 0; a < t.length; a++) this.jsonData.push(new e(t[a]));
            }));
        }
        get randowData() {
            if (!this.jsonData) return;
            let t = Math.floor(Math.random() * this.jsonData.length);
            return this.jsonData[t];
        }
    }
    t.Instance = new t();
    class e {
        constructor(t) {
            this.avatar = t.avatar, this.nickname = t.nickname;
        }
    }
    class a extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake();
        }
        onStart() {
            super.onStart(), this.owner.visible = !1;
            let t = this;
            zs.laya.sdk.ZSReportSdk.loadAd(function (e) {
                var a = e.promotion;
                a = a.filter(function (t) {
                    return Laya.Browser.onAndroid || "wx48820730357d81a6" != t.appid && "wxc136d75bfc63107c" != t.appid;
                }), t.adData = a[Math.floor(Math.random() * a.length)], t.initUI();
            });
        }
        initUI() {
            this.owner.visible = !0;
            let e = t.Instance.randowData;
            this.lab_name.text = e.nickname, this.lab_invite.text = '您的好友"' + e.nickname + '"向您发起挑战:',
                this.lab_appName.text = this.adData.app_title, this.img_avater.skin = e.avatar,
                this.img_icon.skin = this.adData.app_icon, this.btn_suc.on(Laya.Event.CLICK, this, this.onSucClick),
                this.btn_fail.on(Laya.Event.CLICK, this, this.closeView);
        }
        onSucClick() {
            this.owner.close(), zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData, zs.laya.game.AppMain.playerInfo.user_id, function () {
                Laya.stage.event(zs.laya.game.EventId.APP_JUMP_SUCCESS);
            }, function () {
                Laya.stage.event(zs.laya.game.EventId.APP_JUMP_CANCEL);
            }, function () { });
        }
        closeView() {
            this.owner.close();
        }
    }
    class s extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            if (this.light = this.owner.getChildByName("light"), this.hot = this.owner.getChildByName("hot"),
                this.parent = this.owner.parent, !parent) return;
            if (this.light.width = 237 * this.parent.width / 204, this.light.height = 320 / 237 * this.light.width,
                Laya.timer.loop(2e3, this, this.checkFlash), this.hot.visible = !1, this.hideHot) return;
            this.hot.width = 91 * this.parent.width / 204, this.hot.height = 42 / 91 * this.hot.width,
                this.hot.pos(this.parent.width - this.hot.width / 2 * 1.2, this.hot.height / 2 * 1.2);
            let t = Math.random() < .3333 || this.isSingle;
            this.hot.visible = t, this.tweenHot();
        }
        checkFlash() {
            let t = Math.random() < .3333 || this.isSingle;
            this.light.pos(.2 * -this.parent.width, .2 * -this.parent.height), t && Laya.Tween.to(this.light, {
                x: this.parent.width / 2,
                y: this.parent.height / 2
            }, 300, Laya.Ease.quadInOut, Laya.Handler.create(this, function () {
                Laya.Tween.to(this.light, {
                    x: 1.2 * this.parent.width,
                    y: 1.2 * this.parent.height
                }, 300, Laya.Ease.quadIn);
            }));
        }
        onDisable() {
            Laya.timer.clear(this, this.checkFlash), Laya.Tween.clearAll(this);
        }
        tweenHot() {
            this.hot.scale(1, 1), Laya.Tween.to(this.hot, {
                scaleX: 1.2,
                scaleY: 1.2
            }, 300, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(this.hot, {
                    scaleX: 1,
                    scaleY: 1
                }, 300, null, Laya.Handler.create(this, this.tweenHot));
            }));
        }
    }
    class i extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.listScr = null;
        }
        onAwake() {
            super.onAwake(), this.adList.dataSource = [];
            let e = [];
            for (let a = 0; a < 4; a++) {
                let a = {
                    avater_1: {
                        skin: t.Instance.randowData.avatar
                    },
                    avater_2: {
                        skin: t.Instance.randowData.avatar
                    },
                    avater_3: {
                        skin: t.Instance.randowData.avatar
                    }
                };
                e.push(a);
            }
            this.adList.dataSource = e, this.btn_close.on(Laya.Event.CLICK, this, this.closeView);
        }
        onStart() {
            this.listScr = this.adList.addComponent(zs.laya.platform.AdList), this.listScr.requestAdData("promotion", !1, 0, null, 4),
                Laya.timer.loop(3e3, this, this.loopChange);
        }
        loopChange() {
            this.listScr.requestAdData("promotion", !1, 0, null, 4);
        }
        onDisable() {
            super.onDisable(), this.btn_close.on(Laya.Event.CLICK, this, this.closeView);
        }
        closeView() {
            this.owner.close();
        }
    }
    class o {
        static get Level() {
            return Number(Laya.LocalStorage.getItem("Level")) || 0;
        }
        static set Level(t) {
            Laya.stage.event("Level"), zs.laya.game.AppMain.playerInfo.level_id = t, Laya.LocalStorage.setItem("Level", t.toString());
        }
        static get Skin() {
            return Number(Laya.LocalStorage.getItem("Skin")) || 3;
        }
        static set Skin(t) {
            Laya.LocalStorage.setItem("Skin", t.toString());
        }
        static get AccompanySkin() {
            var t = Laya.LocalStorage.getItem("AccompanySkin");
            return null == t || "" == t ? "0" == t ? Number(t) : -1 : Number(t);
        }
        static set AccompanySkin(t) {
            Laya.LocalStorage.setItem("AccompanySkin", t.toString());
        }
        static get Coin() {
            return Number(Laya.LocalStorage.getItem("Coin")) || 0;
        }
        static set Coin(t) {
            zs.laya.game.AppMain.playerInfo.gold = t, Laya.LocalStorage.setItem("Coin", t.toString());
        }
        static get Diamond() {
            return Number(Laya.LocalStorage.getItem("Diamond")) || 0;
        }
        static set Diamond(t) {
            Laya.LocalStorage.setItem("Diamond", t.toString());
        }
        static get lockSkinCount() {
            return Number(Laya.LocalStorage.getItem("lockSkinCount")) || 0;
        }
        static set lockSkinCount(t) {
            Laya.LocalStorage.setItem("lockSkinCount", t.toString());
        }
        static get SkinList() {
            var t;
            if ("" == Laya.LocalStorage.getItem("SkinList") || null == Laya.LocalStorage.getItem("SkinList")) {
                t = [{
                    ID: 0,
                    level: 0,
                    lockState: 0
                }, {
                    ID: 1,
                    level: -1,
                    lockState: 200
                }, {
                    ID: 2,
                    level: -1,
                    lockState: -1
                }, {
                    ID: 3,
                    level: -1,
                    lockState: -1
                }, {
                    ID: 4,
                    level: -1,
                    lockState: -1
                }, {
                    ID: 5,
                    level: -1,
                    lockState: -1
                }];
                var e = JSON.stringify(t);
                Laya.LocalStorage.setItem("SkinList", e);
            } else {
                var a = Laya.LocalStorage.getItem("SkinList");
                t = JSON.parse(a);
            }
            return t;
        }
        static set SkinList(t) {
            var e = JSON.stringify(t);
            Laya.LocalStorage.setItem("SkinList", e);
        }
        static cacheSkinList(t, e, a) {
            var s = [];
            Object.assign(s, o.SkinList), s[t][e] = a, o.SkinList = s;
        }
        static get AccompanyList() {
            var t = Laya.LocalStorage.getItem("AccompanyList");
            return null == t || "" == t ? [-1, -1, 300] : JSON.parse(t);
        }
        static set AccompanyList(t) {
            var e = JSON.stringify(t);
            Laya.LocalStorage.setItem("AccompanyList", e);
        }
        static cacheAccompanyList(t) {
            var e = [];
            Object.assign(e, o.AccompanyList), e[t] = 0, o.AccompanyList = e;
        }
    }
    o.IsPauseForAd = 0, o.isEnterWinPerfect = !1;
    class n extends Laya.Script {
        onAwake() {
            this.BtnStart = this.owner.getChildByName("fullUI"), this.LevelLabel = this.owner.getChildByName("topUI").getChildByName("Level"),
                this.LevelLabel.text = (o.Level + 1).toString(), this.BtnStart.on(Laya.Event.MOUSE_DOWN, this, () => {
                    platform.getInstance().showInterstitial(() => {
                        Laya.stage.event(zs.laya.game.EventId.GAME_PREPARE);
                    });
                }), Laya.stage.on("Level", this, () => {
                    this.LevelLabel.text = (o.Level + 1).toString();
                });
        }
        onDestroy() {
            this.BtnStart.offAll();
        }
    }
    class r extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.lab_name = this.owner.getChildByName("lab_name"), this.lab_invite = this.owner.getChildByName("lab_invite"),
                this.img_bg = this.owner.getChildByName("img_bg"), this.instance = this.owner;
        }
        onStart() {
            this.instance.visible = !1;
            let t = this;
            zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_false_news_switch && zs.laya.platform.ADConfig.zs_jump_switch ? zs.laya.sdk.ZSReportSdk.loadAd(function (e) {
                var a = e.promotion;
                a = a.filter(function (t) {
                    return Laya.Browser.onAndroid || "wx48820730357d81a6" != t.appid && "wxc136d75bfc63107c" != t.appid;
                }), t.adData = a[Math.floor(Math.random() * a.length)], t.initUI();
            }) : this.instance.destroy();
        }
        initUI() {
            this.instance.visible = !0, this.lab_name.text = t.Instance.randowData.nickname,
                this.lab_invite.text = "邀请您一起玩   " + this.adData.app_title, this.img_bg.on(Laya.Event.CLICK, this, this.onBgClick),
                this.instance.y = 0 - this.instance.height, this.instance.centerX = 0, Laya.SoundManager.playSound("sound/getChat.mp3"),
                zs.laya.sdk.DeviceService.VibrateShort(), Laya.Tween.to(this.instance, {
                    y: 100
                }, 500);
        }
        onBgClick() {
            zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData, zs.laya.game.AppMain.playerInfo.user_id, function () {
                Laya.stage.event(zs.laya.game.EventId.APP_JUMP_SUCCESS);
            }, function () {
                Laya.stage.event(zs.laya.game.EventId.APP_JUMP_CANCEL), zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_reminder_switch && Laya.Scene.open("view/ad/ChallengePage.scene", !1);
            }, function () { }), Laya.Tween.to(this.instance, {
                y: 0 - this.instance.height
            }, 500);
        }
    }
    class l extends Laya.Script {
        constructor() {
            super(), this.adType = "promotion", this.iconScriptArr = [], this.adData = null,
                this.maxLength = 6, this.posX = 0, this.posY = 0, this.knockIndex = 0;
        }
        onAwake() {
            super.onAwake(), this.adList = this.owner.getChildByName("adList");
        }
        onEnable() {
            super.onEnable(), zs.laya.platform.ADConfig.zs_jump_switch && zs.laya.platform.ADConfig.isPublicVersion() ? (this.initEvent(),
                this.initData(), this.initUI()) : this.owner.destroy();
        }
        onDisable() {
            super.onDisable();
        }
        onClose() {
            this.owner.destroy();
        }
        initUI() {
            this.adList.selectEnable = !0, this.aniHammer = this.owner.getChildByName("aniHammer"),
                this.aniBroken = this.owner.getChildByName("aniBroken"), this.aniHammer.on(Laya.Event.COMPLETE, this, this.onHammerComplete),
                this.aniHammer.on(Laya.Event.LABEL, this, this.onHammerKnock), this.aniBroken.on(Laya.Event.COMPLETE, this, this.onBrokenComplete),
                this.startKnock();
        }
        updateItem() {
            var t = [];
            this.adData.sort(() => Math.random() > .5 ? 1 : -1);
            for (let e = 0; e < this.maxLength; e++) t.push(this.adData[e]);
            this.adList.array = t;
        }
        initData() {
            zs.laya.sdk.ZSReportSdk.loadAd(t => {
                this.adData = t[this.adType.toString()], this.updateItem();
            });
        }
        initEvent() {
            this.adList.renderHandler = Laya.Handler.create(this, this.onItemRender, null, !1),
                this.adList.mouseHandler = Laya.Handler.create(this, this.onMouseAd, null, !1);
        }
        onHammerComplete() {
            this.aniHammer.visible = !1;
        }
        onHammerKnock(t) {
            this.aniBroken.visible = !0, this.aniBroken.pos(this.posX, this.posY), this.aniBroken.play(null, !1);
        }
        onBrokenComplete() {
            this.aniBroken.visible = !1;
            var t = this.adList.getCell(this.knockIndex);
            this.playScaleEff(t);
        }
        playScaleEff(t) {
            Laya.Tween.to(t, {
                scaleX: 0,
                scaleY: 0
            }, 500, Laya.Ease.bounceIn, Laya.Handler.create(this, () => {
                this.refreshSingleItem(this.knockIndex), Laya.Tween.to(t, {
                    scaleX: 1,
                    scaleY: 1
                }, 500, Laya.Ease.bounceIn, Laya.Handler.create(this, () => {
                    t.mouseEnabled = !0;
                }));
            }));
        }
        refreshItemByDate(t, e) {
            var a = t.getChildByName("icon"), s = t.getChildByName("name");
            a.loadImage(e.app_icon), s.text = e.app_title;
        }
        onItemRender(t, e) {
            var a = this.adList.array[e];
            this.refreshItemByDate(t, a);
        }
        refreshSingleItem(t) {
            var e = this.adData.filter(t => !this.adList.array.some(e => t.app_id === e.app_id)), a = e[Math.floor(Math.random() * e.length)];
            this.adList.setItem(t, a);
        }
        onMouseAd(t, e) {
            "click" == t.type && (zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData[e], zs.laya.game.AppMain.playerInfo.user_id, () => {
                Laya.stage.event("NAVIGATE_SUCCESS");
            }, () => {
                Laya.stage.event("APP_JUMP_CANCEL"), zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_reminder_switch && Laya.Scene.open("view/ad/ChallengePage.scene", !1);
            }, () => { }), this.refreshSingleItem(e));
        }
        startKnock() {
            Laya.timer.once(1e3, this, this.knockExportIcon, null, !1);
        }
        knockExportIcon() {
            var t = Math.floor(Math.random() * this.adList.array.length);
            this.knockIndex = t;
            var e, a = this.adList.getCell(t);
            this.aniHammer.removeSelf(), a.mouseEnabled = !1, e = Laya.Point.create().setTo(a.width / 2, a.height / 2),
                e = a.localToGlobal(e);
            var s = this.owner.globalToLocal(e);
            this.posX = s.x, this.posY = s.y, this.aniHammer.pos(s.x + 60, s.y - 30), this.aniHammer.visible = !0,
                this.owner.addChild(this.aniHammer), this.aniHammer.play(null, !1), Laya.timer.once(5e3, this, this.knockExportIcon, null, !1);
        }
    }
    class h extends Laya.Script3D {//Main Camera
        constructor() {
            super(...arguments), this.offerPos = new Laya.Vector3(), this.startPos = new Laya.Vector3(),
                this.startlocal = new Laya.Vector3(), this.startlocalRotate = new Laya.Vector3(),
                this.startAniPos = new Laya.Vector3(), this.startAniRotate = new Laya.Vector3(),
                this.isLookAt = !1;
        }
        onAwake() {
            this.startAniPos = this.owner.getChildAt(0).transform.localPosition.clone(), this.startAniRotate = this.owner.getChildAt(0).transform.localRotationEuler.clone(),
                this.startPos = this.owner.transform.position.clone();
            var t = this.owner.getChildAt(0);
            this.child = t, this.localZ = t.transform.localPositionZ, this.startlocal = t.transform.localPosition.clone(),
                this.startlocalRotate = t.transform.localRotation.clone(), this.animator = this.owner.getChildAt(0).getComponent(Laya.Animator),
                this.animator.enabled = !1, Laya.stage.on("cameraFnish", this, () => {
                    if (zs.laya.game.AppMain.GameState == zs.laya.game.GameState.STATE_PLAYING) {
                        var t = this.animator.owner.transform;
                        Laya.Tween.to(t, {
                            localPositionZ: this.startlocal.z,
                            localPositionY: this.startlocal.y,
                            localPositionX: this.startlocal.x,
                            localRotationEulerX: this.startlocalRotate.x
                        }, 1e3, null, Laya.Handler.create(this, () => {
                            this.animator.speed = 1, this.animator.enabled = !0, this.animator.play("camera", 0, 0);
                        }));
                    }
                }), Laya.stage.on("SHOWLOCK", this, () => {
                    g.Instance.Player.active = !1, this.animator.speed = 0, this.setTargetNull();
                    var t = g.Instance.end.getChildByName("TestCamera"), e = g.Instance.end.getChildByName("show_shoes");
                    e.active = !0, e.getChildAt(0).getChildAt(1).getChildAt(0).getComponent(Laya.Animator).play("show"),
                        this.animator.owner.transform.position = t.transform.position, this.animator.owner.transform.rotationEuler = t.transform.rotationEuler;
                });
        }
        setTargetNull() {
            this.target = null;
        }
        setTarget() {
            this.target = g.Instance.Player, this.animator.speed = 0, this.Clear();
        }
        onUpdate() {
            g.Instance.Light.transform.localRotationEuler, g.Instance.Light.transform.localRotationEulerY = this.child.transform.localRotationEulerY - 30;
            if (zs.laya.game.AppMain.GameState == zs.laya.game.GameState.STATE_PLAYING && null != this.target && this.target.transform)
                if (this.isLookAt) {
                    this.child.transform.lookAt(this.target.transform.position, new Laya.Vector3(0, 1, 0));
                }
                else {
                    var t = new Laya.Vector3();
                    Laya.Vector3.add(this.target.transform.position, this.offerPos, t);
                    var e = new Laya.Vector3();
                    Laya.Vector3.lerp(this.owner.transform.position, t, .1, e);
                    this.owner.transform.localPositionX = e.x,
                        this.owner.transform.localPositionZ = e.z;
                    this.owner.transform.localPositionY = e.y;
                    var a = this.target.getComponent(f).LegList.length,
                        s = this.localZ - a / 1.5, i = this.owner.getChildAt(0);
                    i.transform.localPositionZ = Laya.MathUtil.lerp(i.transform.localPositionZ, s, 0.1);
                }
        }
        Clear() {
            this.owner.transform.position = this.startPos, this.animator.speed = 0, this.isLookAt = !1;
            var t = this.animator.owner;
            t.transform.localPosition = this.startAniPos, t.transform.localRotationEuler = this.startAniRotate;
        }
    }
    class c {
        static PlaySound(t, e) {
            if (0 != this.isSound) {
                var a = "music/" + t + ".mp3";
                Laya.SoundManager.playSound(a, e);
            }
        }
        static StopSound(t) {
            var e = "music/" + t + ".mp3";
            Laya.SoundManager.stopSound(e);
        }
        static StopAllSound() {
            Laya.SoundManager.stopAllSound();
        }
        static PlayMusic(t) {
            // this.stopMusic();
            // var e = "music/" + t + ".mp3";
            // this.currentMusic = Laya.SoundManager.playMusic(e, 0);
        }
        static stopMusic() {
            // Laya.SoundManager.stopMusic();
        }
    }
    c.isSound = !0;
    class d extends Laya.Script3D {
        onStart() {
            this.npcNode = this.owner.getChildByName("npc"), Laya.stage.on("NPCWIN", this, this.playAni);
        }
        playAni() {
            this.owner.getChildByName("ef_finish").active = !0, c.PlaySound("ribbon", 1);
            for (let t = 0; t < this.npcNode.numChildren; t++) {
                this.npcNode.getChildAt(t).getComponent(Laya.Animator).play("qiLi");
            }
            Laya.timer.once(1e3, this, () => {
                var t = this.owner.getChildByName("lamp");
                for (let e = 0; e < t.numChildren; e++) {
                    t.getChildAt(e).getChildAt(0).getChildAt(1).getComponent(Laya.Animator).play("lamp");
                }
                c.PlaySound("winCheer", 1);
                for (let t = 0; t < this.npcNode.numChildren; t++) {
                    this.npcNode.getChildAt(t).getComponent(Laya.Animator).play("huanHu");
                }
            });
        }
        onDestroy() {
            Laya.stage.off("NPCWIN", this, this.playAni);
        }
    }
    class y {
        static Init() {
            this.levelCfg = Laya.loader.getRes("config/levelCfg.json");
        }
    }
    class g {
        static get Instance() {
            return null == this.instance && (this.instance = new g()), this.instance;
        }
        Init(t) {
            y.Init(), this.scene3D = t, this.loadFirstEf(), this.obs = this.scene3D.getChildByName("obs"),
                this.prop = this.scene3D.getChildByName("prop"), this.floor = this.scene3D.getChildByName("floor"),
                this.board = this.scene3D.getChildByName("board"), this.Camera = this.scene3D.getChildByName("Main Camera"),
                this.Light = this.scene3D.getChildByName("Directional Light"), this.Camera.addComponent(h),
                Laya.stage.on(zs.laya.game.EventId.GAME_FAILED, this, this.gameClear), Laya.stage.on(zs.laya.game.EventId.GAME_HOME, this, this.gameStart),
                Laya.stage.on(zs.laya.game.EventId.GAME_WIN, this, () => {
                    o.Level++;
                }), this.InitFog(t), this.LoadSky();
        }
        InitFog(t) {
            t.ambientColor = new Laya.Vector3(.5843138, .5647059, .5490196), t.enableFog = !0,
                t.fogColor = new Laya.Vector3(.5235, .8641, 1), t.fogStart = 10, t.fogRange = 70;
        }
        LoadSky() {
            var t = this;
            Laya.Material.load("3dres/SkyBox/skyMaterial.lmat", Laya.Handler.create(t, function (e) {
                t.Camera.getChildAt(0).clearFlag = Laya.CameraClearFlags.Sky;
                var a = t.scene3D.skyRenderer;
                a.mesh = Laya.SkyBox.instance, a.material = e;
            }));
        }
        gameStart() {
            console.log("调用了返回首页开始游戏"), this.gameClear(), this.creatorScene();
        }
        gameClear() {
            this.Player && this.Player.destroy(), this.obs.destroyChildren(), this.prop.destroyChildren(),
                this.floor.destroyChildren(), this.board.destroyChildren();
        }
        creatorScene() {
            var t = o.Level;
            o.Level > 19 && (t = Math.floor(20 * Math.random()));
            var e = y.levelCfg.levels[t], a = (t, a) => {
                var s = e[t];
                for (let t = 0; t < s.length; t++) {
                    var i = s[t], o = zs.laya.Resource.LoadSprite3d(i.name);
                    console.log(" ~ file: Game.ts ~ line 119 ~ creatorScene ~ prop.name", i.name);
                    let e = zs.laya.ObjectPool.GetSprite3d(o);
                    a.addChild(e), e.transform.position = new Laya.Vector3(i.posX / 1e4, i.posY / 1e4, i.posZ / 1e4),
                        e.transform.rotationEuler = new Laya.Vector3(i.rotationX / 1e4, i.rotationY / 1e4, i.rotationZ / 1e4),
                        e.transform.setWorldLossyScale(new Laya.Vector3(i.scaleX / 1e4, i.scaleY / 1e4, i.scaleZ / 1e4)),
                        "end" == i.name && (this.end = e, e.addComponent(d));
                }
            };
            a("prop", this.prop), a("obs", this.obs), a("floor", this.floor), a("board", this.board);
            var s = zs.laya.Resource.LoadSprite3d("Player");
            let i = zs.laya.ObjectPool.GetSprite3d(s);
            this.scene3D.addChild(i), this.Player = i, this.Camera.getComponent(h).setTarget(),
                this.Player.addComponent(f), o.PlayerInst = this.Player, Laya.Texture2D.load("tex/tex_shose04.png", Laya.Handler.create(this, t => {
                    this.Player.getChildAt(0).getChildAt(0).getChildByName("mod_shose_01").skinnedMeshRenderer.materials[0].albedoTexture = t;
                    for (let e = 0; e < this.prop.numChildren; e++) {
                        const a = this.prop.getChildAt(e);
                        if ("shose" == a.name) a.getChildAt(0).meshRenderer.materials[0].albedoTexture = t;
                    }
                    this.Player.getComponent(f).leftLeg.getChildAt(0).meshRenderer.materials[0].albedoTexture = t,
                        this.Player.getComponent(f).rightLeg.getChildAt(0).meshRenderer.materials[0].albedoTexture = t;
                }));
        }
        loadFirstEf() {
            var t = zs.laya.Resource.LoadSprite3d("end");
            let e = zs.laya.ObjectPool.GetSprite3d(t);
            this.scene3D.addChild(e), e.transform.localPositionX = 500, e.getChildByName("ef_finish").active = !0,
                Laya.timer.once(3e3, this, () => {
                    e.destroy();
                });
        }
    }
    g.instance = null;
    class m {
        constructor() {
            this.effectParent = new Laya.Sprite3D("effectParent"), g.Instance.scene3D.addChild(this.effectParent);
        }
        static get Instance() {
            return null == this.instance && (this.instance = new m()), this.instance;
        }
        creatorEffect(t, e, a = 1e3) {
            var s = zs.laya.Resource.LoadSprite3d(t), i = zs.laya.ObjectPool.GetSprite3d(s);
            return this.effectParent.addChild(i), i.transform.position = e, a >= 0 && Laya.timer.once(a, this, () => {
                zs.laya.ObjectPool.RecoverSprite3d(i);
            }), i;
        }
        creatorEffectByNode(t, e, a = 1e3) {
            var s = zs.laya.Resource.LoadSprite3d(t), i = zs.laya.ObjectPool.GetSprite3d(s);
            return e.addChild(i), -1 != a && Laya.timer.once(a, this, () => {
                zs.laya.ObjectPool.RecoverSprite3d(i);
            }), i;
        }
        play(t) {
            t instanceof Laya.ShuriKenParticle3D && t.particleSystem.simulate(0, !0);
            for (let e = 0, a = t.numChildren; e < a; e++) {
                let a = t.getChildAt(e);
                a instanceof Laya.ShuriKenParticle3D && a.particleSystem.simulate(0, !0);
            }
        }
    }
    class L extends Laya.Script3D {
        pai() {
            c.PlaySound("clap", 1);
        }
    }
    var p;
    !function (t) {
        t[t.MOVE = 0] = "MOVE", t[t.CLAP = 1] = "CLAP", t[t.BRIDGE = 2] = "BRIDGE", t[t.DEALTH = 3] = "DEALTH",
            t[t.WIN = 4] = "WIN", t[t.SHOW = 5] = "SHOW";
    }(p || (p = {}));
    class f extends Laya.Script3D {
        constructor() {
            super(...arguments), this.lastx = 0, this.moveSpeedX = .8, this.moveSpeedZ = 5,
                this.LegList = new Array(), this.linearVelocity = new Laya.Vector3(), this.startHeight = 0,
                this.state = p.MOVE, this.moveRigiX = 0, this.clampList = new Array(), this.movex = 0,
                this.lastMouseX = 0, this.dir = new Laya.Vector3(), this.lastMouseY = 0, this.subList = new Array(),
                this.currentCubeY = 0, this.iscolumn = !1;
        }
        onAwake() {
            this.touchIng = false;
            this.width = Laya.stage.width * Laya.stage.scaleX, this.getChildNameLeftLeg(this.owner, "heel1_L"),
                this.getChildNameRightLeg(this.owner, "heel1_R"), this.playerMod = this.owner.getChildAt(0),
                this.animator = this.owner.getChildAt(0).getChildAt(0).getComponent(Laya.Animator),
                this.animator.owner.addComponent(L), this.animator.play("Idel"), this.rigiBody = this.owner.getComponent(Laya.Rigidbody3D),
                this.rigiBody.overrideGravity = !0, this.rigiBody.gravity = new Laya.Vector3(0, -40, 0),
                this.rigiBody.friction = 0, this.boxCollider = this.rigiBody.colliderShape,
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.touchStart),
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.touchUp),
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.touchUp),
                Laya.stage.on(Laya.Event.BLUR, this, this.touchUp),
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.touchMove),
                Laya.stage.on(zs.laya.game.EventId.GAME_PREPARE, this, () => {
                    this.animator.play("move1");
                });
        }
        touchMove(t) {
            if (!this.touchIng) {
                return;
            }
            if (this.state != p.DEALTH && this.state != p.WIN && this.state != p.SHOW && (t.touchId == this.startTouch ||
                zs.laya.game.AppMain.GameState != zs.laya.game.GameState.STATE_PREPARE)) if (this.state == p.BRIDGE) {
                    var e = t.stageX - this.lastx;
                    this.playerMod.transform.rotate(new Laya.Vector3(0, 0, e * Laya.timer.delta / 1e3 / 10)),
                        this.lastx = t.stageX;
                } else {
                    let t = Laya.stage.mouseX - this.lastMouseX;
                    if (0 == this.movex) this.movex = t; else {
                        if (t > 0 && t < 10 && this.movex < 0) return void console.log("反向1");
                        if (t < 0 && t > -10 && this.movex > 0) return void console.log("反向2");
                        this.movex = t;
                    }
                    let e = 7.5 * t / this.width;
                    this.lastMouseX = Laya.stage.mouseX, this.lastMouseY = Laya.stage.mouseY, this.dir.setValue(e, 0, 0);
                    var a = this.dir;
                    let s = 0;
                    a.x > 0 ? s = Math.min(.4, a.x) : a.x < 0 && (s = Math.max(-.4, a.x));
                    let i = this.owner.transform.localPositionX - s;
                    this.state == p.CLAP ? this.owner.transform.localPositionX = i : i >= -2.8 && i <= 2.8 && (this.owner.transform.localPositionX = i);
                }
        }
        touchStart(t) {
            this.touchIng = true;
            null == this.startTouch && (this.startTouch = t.touchId, this.lastx = t.stageX,
                this.lastMouseX = Laya.stage.mouseX, this.lastMouseY = Laya.stage.mouseY);
        }
        touchUp(t) {
            this.touchIng = false;
            (!t || !t.touchId || this.startTouch == t.touchId) && (this.startTouch = null, this.lastx = 0);
        }
        getChildNameLeftLeg(t, e) {
            for (let a = 0; a < t.numChildren; a++) {
                if (t.getChildAt(a).name == e) return void (this.leftLeg = t.getChildAt(a));
                this.getChildNameLeftLeg(t.getChildAt(a), e);
            }
        }
        getChildNameRightLeg(t, e) {
            for (let a = 0; a < t.numChildren; a++) {
                if (t.getChildAt(a).name == e) return void (this.rightLeg = t.getChildAt(a));
                this.getChildNameRightLeg(t.getChildAt(a), e);
            }
        }
        onUpdate() {
            zs.laya.game.AppMain.GameState == zs.laya.game.GameState.STATE_PLAYING && this.state != p.DEALTH && this.state != p.SHOW ?
                (this.state == p.BRIDGE || this.state == p.CLAP ?
                    this.rigiBody.linearVelocity = new Laya.Vector3(0, this.rigiBody.linearVelocity.y, 1.5 * this.moveSpeedZ) :
                    0 == o.IsPauseForAd && Laya.timer.delta / 1e3 < 3 &&
                    (this.owner.transform.localPositionZ += Math.min(Laya.timer.delta, 30) / 1e3 * this.moveSpeedZ),
                    this.state == p.BRIDGE && (this.playerMod.transform.rotationEuler.z >= 0 ?
                        this.playerMod.transform.rotate(new Laya.Vector3(0, 0, .2 * Laya.timer.delta / 1e3)) :
                        this.playerMod.transform.rotate(new Laya.Vector3(0, 0, -.2 * Laya.timer.delta / 1e3)),
                        (this.playerMod.transform.rotationEuler.z > 60 || this.playerMod.transform.rotationEuler.z < -60) && (console.log("角度死亡"),
                            this.Dealth())), this.rigiBody.linearVelocity.y < -75 && (console.log("重力死亡"), this.Dealth(200),
                                g.Instance.Camera.getComponent(h).setTargetNull())) :
                this.rigiBody.linearVelocity = new Laya.Vector3(this.moveRigiX, this.rigiBody.linearVelocity.y, 0);
        }
        onDestroy() {
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.touchStart), Laya.stage.off(Laya.Event.MOUSE_UP, this, this.touchUp),
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.touchMove);
        }
        addLeg() {
            zs.laya.sdk.DeviceService.VibrateShort(), Laya.timer.once(500, this, () => {
                zs.laya.sdk.DeviceService.VibrateShort();
            });
            var t = this.leftLeg.clone();
            this.leftLeg.parent.addChild(t);
            var e = this.rightLeg.clone();
            this.rightLeg.parent.addChild(e), t.active = !0, e.active = !0;
            var a = this.LegList.length;
            t.transform.localPositionY = this.leftLeg.transform.localPositionY - 1 * a, e.transform.localPositionY = this.rightLeg.transform.localPositionY - 1 * a,
                this.LegList.push([t, e]), this.setboxCollider(), this.addLegTween && Laya.Tween.clear(this.addLegTween);
            var s = a + 1 + this.startHeight;
            this.addLegTween = Laya.Tween.to(this.owner.transform, {
                localPositionY: s
            }, 200, Laya.Ease.sineOut);
        }
        resetLeg() {
            var t = this.LegList.length;
            if (this.addLegTween && Laya.Tween.clear(this.addLegTween), this.owner.transform.position.y < this.startHeight) var e = t + this.owner.transform.position.y; else e = t + this.startHeight;
            this.addLegTween = Laya.Tween.to(this.owner.transform, {
                localPositionY: e
            }, 200, Laya.Ease.sineOut);
        }
        setboxCollider() {
            var t = this.LegList.length + 1;
            this.rigiBody.colliderShape = new Laya.BoxColliderShape(.3, t, .2), this.rigiBody.colliderShape.localOffset = new Laya.Vector3(0, .5 - this.LegList.length / 2, 0),
                this.rigiBody.enabled = !1, Laya.timer.frameOnce(1, this, () => {
                    this.rigiBody.enabled = !0;
                });
        }
        setStartCollider() {
            this.rigiBody.colliderShape = new Laya.BoxColliderShape(.3, 1, .2), this.rigiBody.colliderShape.localOffset = new Laya.Vector3(0, .5, 0);
        }
        setboxClapCollider() {
            var t = 2 * (1.2 + this.LegList.length);
            this.rigiBody.colliderShape = new Laya.BoxColliderShape(t, .2, .2), this.rigiBody.colliderShape.localOffset = new Laya.Vector3(0, 0, 0),
                this.rigiBody.enabled = !1, Laya.timer.frameOnce(1, this, () => {
                    this.rigiBody.enabled = !0;
                });
        }
        subLeg(t, e = !1) {
            if (0 == this.subList.length && Laya.timer.frameOnce(1, this, () => {
                var t = -1;
                for (let e = 0; e < this.subList.length; e++) this.subList[e] > t && (t = this.subList[e]);
                if (-1 != t) {
                    var a = this.LegList.length - t + this.currentCubeY;
                    if (a < 0) return void (e ? this.Win() : (c.PlaySound("roleBump", 1), console.log("碰撞死亡"),
                        this.Dealth()));
                    c.PlaySound("crash_heel", 1);
                    var s = this.LegList.splice(a, t);
                    for (let t = 0; t < s.length; t++) g.Instance.scene3D.addChild(s[t][0]), g.Instance.scene3D.addChild(s[t][1]),
                        Laya.timer.once(500, this, () => {
                            s[t][0].destroy(), s[t][1].destroy();
                        });
                    this.currentCubeY = t, this.setboxCollider();
                }
                this.subList = new Array();
            }), null == t) var a = 1; else if ("road" == t.name) a = Math.round(t.transform.position.y - this.startHeight); else a = Math.round(t.transform.position.y - this.startHeight) + 1;
            this.subList.push(a);
        }
        onTriggerStay1(t, e) {
            "prop" == t.owner.parent.name && (t.owner.destroy(), this.addLeg());
        }
        onCollisionEnter(t) {
            var e = t.other.owner;
            if ("prop" == e.parent.name) "shose" == e.name ? (Math.random() > .5 ? c.PlaySound("shoes_collect_1", 1) : c.PlaySound("shoes_collect_2", 1),
                e.destroy(), this.addLeg()) : "diamond" == e.name && (zs.laya.sdk.DeviceService.VibrateShort(),
                    Laya.timer.once(500, this, () => {
                        zs.laya.sdk.DeviceService.VibrateShort();
                    }), m.Instance.creatorEffect("ef_CGQ_diamond", e.transform.position), c.PlaySound("gemstone_pickup", 1),
                    e.destroy()); else if ("obs" == e.parent.name) {
                        if ("tile" == e.name) this.subLeg(null), e.getComponent(Laya.PhysicsCollider).enabled = !1; else if ("redBox" == e.name) {
                            this.owner.transform.position.y - this.LegList.length - .5 <= e.transform.position.y && this.subLeg(t.other.owner);
                        } else if ("dealthBox" == e.name) {
                            if (this.state == p.BRIDGE || this.state == p.CLAP) g.Instance.Camera.getComponent(h).isLookAt = !0,
                                e.destroy(), console.log("触发死亡"), this.Dealth();
                        }
                    } else if ("floor" == e.parent.name) {
                        if (e.transform.position.y != this.startHeight) this.owner.transform.position.y - this.LegList.length <= e.transform.position.y && this.state == p.MOVE && e.transform.position.y > this.owner.transform.position.y + .5 && this.subLeg(t.other.owner),
                            this.startHeight = e.transform.position.y;
                        this.currentCubeY = 0;
                    } else if ("end" == e.parent.name) {
                        if ("end_yuan" == e.name) return console.log("ljc", "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", "完美通关"),
                            void this.WinPerfect();
                        if (e.transform.position.y + 1 != this.startHeight) this.owner.transform.position.y - this.LegList.length <= e.transform.position.y && this.subLeg(t.other.owner, !0),
                            this.startHeight = e.transform.position.y + 1, this.currentCubeY = 0;
                        this.owner.transform.position.y - this.LegList.length < e.transform.position.y && this.subLeg(t.other.owner, !0);
                    } else "board" == e.parent.name && ("bridge" == e.name ? this.owner.transform.position.x > e.transform.position.x ? this.playerMod.transform.localRotationEulerX = 1 : this.playerMod.transform.localRotationEulerX = -1 : "column" == e.name ? (this.LegList.length <= 0 && Laya.timer.once(500, this, () => {
                        console.log("劈叉死亡"), this.Dealth();
                    }), c.PlaySound("friction", 0)) : "clapEnter" == e.name ? (this.state = p.CLAP,
                        e.destroy(), this.animator.crossFade("clap", .1), c.PlaySound("hail", 1), this.setboxClapCollider()) : "clapExit" == e.name ? (this.state = p.MOVE,
                            e.destroy(), this.animator.crossFade("move1", .1), this.setboxCollider(), Laya.timer.frameOnce(2, this, () => {
                                this.resetLeg();
                            })) : "bridgeEnter" == e.name ? (this.state = p.BRIDGE, e.destroy(), this.animator.crossFade("move2", .1)) : "bridgeExit" == e.name && (this.playerMod.transform.localRotationEulerZ = 0,
                                Laya.timer.once(0, this, () => {
                                    this.state = p.MOVE;
                                }), e.destroy(), this.animator.crossFade("move1", .1)));
        }
        onCollisionExit(t) {
            var e = t.other.owner;
            if ("column" == e.name || "column1" == e.name) {
                this.iscolumn = !1;
                var a = this.owner.getChildByName("ef_CGQ_spark1"), s = this.owner.getChildByName("ef_CGQ_spark");
                a && a.destroy(), s && s.destroy(), c.StopSound("friction");
            }
        }
        Dealth(t = 2e3) {
            c.StopSound("friction"), c.PlaySound("loseCheer", 1), this.state = p.DEALTH, this.animator.crossFade("dealth", .1),
                this.setStartCollider(), Laya.timer.once(t, this, () => {
                    zs.laya.sdk.DeviceService.VibrateLong(), Laya.stage.event(zs.laya.game.EventId.GAME_FAILED);
                });
        }
        Win() {
            zs.laya.platform.ADConfig.zs_skin_push_switch ? Laya.stage.event("SHOWLOCK") : Laya.stage.event(zs.laya.game.EventId.GAME_WIN);
        }
        WinPerfect() {
            if (zs.laya.platform.ADConfig.isPublicVersion() && zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_jump_switch) {
                if (1 == o.isEnterWinPerfect) return;
                o.isEnterWinPerfect = !0, Laya.stage.event("WinPerfectAD");
                let t = this, e = () => {
                    o.IsPauseForAd = 1, t.state != p.WIN && t.state != p.SHOW && (t.state = p.WIN, Laya.stage.event("NPCWIN"),
                        Laya.stage.event("cameraFnish"), Laya.timer.once(1e3, t, () => {
                            t.state = p.SHOW, t.animator.play("Idel"), Laya.timer.once(500, t, () => {
                                t.animator.play("role_celebrate"), zs.laya.platform.ADConfig.isOpenEgg(zs.laya.game.AppMain.playerInfo.level_id, 2) ? Laya.Scene.open("view/ad/KnockEggEnd.scene", !1, null, Laya.Handler.create(this, function (t) {
                                    t.addComponent(zs.laya.platform.KnockEggView), Laya.stage.once(zs.laya.game.EventId.EGG_GET_AWARD, this, function () {
                                        var t = Laya.LocalStorage.getItem("open_award_num") || 0;
                                        Laya.LocalStorage.setItem("open_award_num", Number(t) + 1 + ""), zs.laya.platform.ADConfig.zs_skin_push_switch ? Laya.stage.event("SHOWLOCK") : Laya.stage.event(zs.laya.game.EventId.GAME_WIN);
                                    });
                                })) : Laya.timer.once(5e3, t, () => {
                                    zs.laya.platform.ADConfig.zs_skin_push_switch ? Laya.stage.event("SHOWLOCK") : Laya.stage.event(zs.laya.game.EventId.GAME_WIN);
                                });
                            });
                        }), o.isEnterWinPerfect = !1);
                }, a = () => {
                    this.animator.play("move1"), o.IsPauseForAd = 0, Laya.timer.once(1600, this, e);
                };
                this.animator.play("Idel"), o.IsPauseForAd = 1, Laya.stage.once("ExportLeftPopCheckClicked", this, a);
            } else {
                if (this.state == p.WIN || this.state == p.SHOW) return;
                this.state = p.WIN, this.animator.play("role_model_1"), Laya.stage.event("NPCWIN"),
                    Laya.stage.event("cameraFnish");
                var self = this;
                Laya.timer.once(2e3, this, () => {
                    this.state = p.SHOW, this.animator.play("Idel"), zs.laya.platform.ADConfig.isOpenEgg(zs.laya.game.AppMain.playerInfo.level_id, 2) ? Laya.Scene.open("view/ad/KnockEggEnd.scene", !1, null, Laya.Handler.create(this, function (t) {
                        t.addComponent(zs.laya.platform.KnockEggView), Laya.stage.once(zs.laya.game.EventId.EGG_GET_AWARD, this, function () {
                            var t = Laya.LocalStorage.getItem("open_award_num") || 0;
                            Laya.LocalStorage.setItem("open_award_num", Number(t) + 1 + ""), zs.laya.platform.ADConfig.zs_skin_push_switch ? Laya.stage.event("SHOWLOCK") : Laya.stage.event(zs.laya.game.EventId.GAME_WIN);
                        });
                    })) : Laya.timer.once(5e3, self, () => {
                        zs.laya.platform.ADConfig.zs_skin_push_switch ? Laya.stage.event("SHOWLOCK") : Laya.stage.event(zs.laya.game.EventId.GAME_WIN);
                    });
                });
            }
        }
        onCollisionStay(t) {
            var e = t.other.owner;
            if ("column" == e.name && !this.iscolumn) return this.iscolumn = !0, void (e.name = "column1");
            if ("column" == e.name) {
                var a = this.owner.getChildByName("ef_CGQ_spark");
                null == a && ((a = m.Instance.creatorEffect("ef_CGQ_spark", new Laya.Vector3(0, 0, 0), -1)).name = "ef_CGQ_spark",
                    this.owner.addChild(a)), a.transform.position = t.contacts[0].positionOnA.clone(),
                    a.transform.position.x > 0 && (a.transform.localRotationEulerY = 90);
            }
            if ("column1" == e.name) {
                var s = this.owner.getChildByName("ef_CGQ_spark1");
                null == s && ((s = m.Instance.creatorEffect("ef_CGQ_spark", new Laya.Vector3(0, 0, 0), -1)).name = "ef_CGQ_spark1",
                    this.owner.addChild(s)), s.transform.position = t.contacts[0].positionOnA.clone(),
                    s.transform.position.x < 0 && (s.transform.localRotationEulerY = -90);
            }
        }
    }
    var u = zs.laya.game.EventId;
    class C extends Laya.Script {
        constructor() {
            super(), this.leftPopView = null;
        }
        onEnable() {
            super.onEnable(), this.goldLabel.text = zs.laya.game.AppMain.playerInfo.gold.toString(),
                Laya.stage.event(u.GAME_START), this.owner.getChildByName("UILock").visible = !1,
                Laya.stage.on("SHOWLOCK", this, this.ShowLock), Laya.stage.once("WinPerfectAD", this, this.showLeftPop),
                Laya.stage.on("KnockEggEndClickStep", this, this.knockEggEndAddLeg), zs.laya.banner.WxBannerMgr.Instance.hideAll();
        }
        knockEggEndAddLeg() {
            console.log("ljc", "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK", this.owner), o.PlayerInst.getComponent(f).addLeg();
        }
        onStart() {
            this.LevelLabel.text = (o.Level + 1).toString(), Laya.stage.on("Level", this, () => {
                this.LevelLabel.text = (o.Level + 1).toString();
            });
        }
        ShowLock() {
            this.owner.getChildByName("UILock").visible = !0;
        }
        onDisable() {
            super.onDisable(), zs.laya.platform.ADConfig.isPublicVersion() && zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_jump_switch && this.leftPopView.destroy();
        }
        showLeftPop() {
            zs.laya.platform.ADConfig.isPublicVersion() && zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_jump_switch && Laya.loader.create("prefab/wechat/ExportLeftPop.json", Laya.Handler.create(this, this.onPrefabReady), null, Laya.Loader.PREFAB);
        }
        onPrefabReady(t) {
            var e = t.create();
            this.leftPopView = e, this.owner.getChildByName("leftUIGame").addChild(e), e.pos(-524, 46);
            var a = e.getComponent(zs.laya.platform.ExportLeftPop);
            null == a && (a = e.addComponent(zs.laya.platform.ExportLeftPop));
            let s = {
                adType: "promotion"
            };
            s.adType && a.initView(s);
        }
    }
    class S extends Laya.Script {
        onAwake() {
            var t = [0, 1, 2, 3, 4, 5, 6, 7];
            this.btnClose = this.owner.getChildByName("btnClose"), this.btnLock = this.owner.getChildByName("btnLock"),
                t.splice(o.Skin, 0);
            var e = Math.floor(Math.random() * t.length);
            this.skinID = t[e], this.btnClose.on(Laya.Event.MOUSE_DOWN, this, () => {
                Laya.stage.event(zs.laya.game.EventId.GAME_WIN);
            }), this.btnLock.on(Laya.Event.MOUSE_DOWN, this, () => {
                zs.laya.sdk.SdkService.playVideo(Laya.Handler.create(this, function () {
                    o.Skin = this.skinID, Laya.stage.event(zs.laya.game.EventId.GAME_WIN);
                }), null, null);
            }), Laya.stage.on("SHOWLOCK", this, () => {
                c.PlaySound("Shoes_sound", 1), Laya.Texture2D.load("tex/tex_shose04.png", Laya.Handler.create(this, t => {
                    g.Instance.end.getChildByName("show_shoes").getChildByName("platform").getChildByName("Player").getChildAt(0).getChildByName("mod_shose_01").skinnedMeshRenderer.materials[0].albedoTexture = t;
                }));
            });
        }
        onEnable() { }
    }
    class v {
        constructor() { }
        static init() {
            var t = Laya.ClassUtils.regClass;
            t("compUI/ChallengPage.ts", a), t("compUI/FlashLight.ts", s), t("compUI/FrienPlayView.ts", i),
                t("compUI/UIHome.ts", n), t("compUI/InviteBox.ts", r), t("compUI/KnockExport.ts", l),
                t("compUI/GamePlayUI.ts", C), t("compUI/UILock.ts", S);
        }
    }
    v.width = 750, v.height = 1334, v.scaleMode = "showall", v.screenMode = "none",
        v.alignV = "middle", v.alignH = "center", v.startScene = "view/comm/WinPage.scene", v.sceneRoot = "",
        v.debug = !1, v.stat = !1, v.physicsDebug = !1, v.exportSceneToJson = !0, v.init();
    class w extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            g.Instance.Init(this.owner);
        }
    }
    var A = zs.laya.ObjectPool, E = zs.laya.game.EventId, I = zs.laya.platform.ADConfig;
    class _ extends zs.laya.game.AppMain {
        constructor() {
            super(), this.sceneLogic = null;
        }
        onAwake() {
            super.onAwake(), Laya.stage.once(E.LAUNCH_COMPLETED, this, this.onGameLaunchReady),
                Laya.stage.on(E.UI_VIEW_CLOSED, this, this.onViewClosed), Laya.stage.on(E.UI_VIEW_OPENED, this, this.onViewOpened);
        }
        onDestroy() {
            this.sceneLogic = null, Laya.stage.off(E.UI_VIEW_CLOSED, this, this.onViewClosed),
                Laya.stage.off(E.UI_VIEW_OPENED, this, this.onViewOpened);
        }
        onGameLaunchReady(e) {
            A.ClearCache(), e && (this.sceneLogic = Laya.stage.addChildAt(e, 0).addComponent(w)),
                console.log("打开调用了返回首页"), Laya.stage.event(E.GAME_HOME), t.Instance.init();
        }
        onGamePrepare(t) {
            o.IsPauseForAd = 0, o.isEnterWinPerfect = !1, console.warn("" + I.isPublicVersion(), I.zs_switch, I.zs_start_game_video_switch),
                I.isPublicVersion() && I.zs_switch && I.zs_start_game_video_switch ? zs.laya.sdk.SdkService.playVideo(Laya.Handler.create(this, () => {
                    this.onAdOpenEgg(), console.warn("1");
                }), Laya.Handler.create(this, () => {
                    this.onAdOpenEgg(), console.warn("2");
                }), Laya.Handler.create(this, () => {
                    this.onAdOpenEgg(), console.warn("3");
                })) : this.onAdOpenEgg();
        }
        onAdOpenEgg() {
            let t = zs.laya.platform.ADConfig.isOpenEgg(zs.laya.game.AppMain.playerInfo.level_id, 1);
            console.warn(t), t ? (zs.laya.platform.PlatformMgr.showKnockEggView(null), Laya.stage.once(zs.laya.platform.PlatformMgr.EGG_GET_AWARD, this, () => {
                var t = [0, 1, 2, 3, 4, 5, 6, 7];
                t.splice(o.Skin, 0);
                var e = t[Math.floor(Math.random() * t.length)];
                o.Skin = e, console.log("ljc", "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY", o.Skin + 1),
                    this.checkFriend();
            })) : this.checkFriend();
        }
        checkFriend() {
            zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_friends_playing_switch ? (Laya.Scene.open("view/ad/FriendPage.scene", !1),
                Laya.stage.on(E.UI_VIEW_CLOSED, this, this.checkClose)) : super.onGamePrepare(null);
        }
        checkClose(t) {
            "FriendPage" == t && super.onGamePrepare(null);
        }
        onGameOverToStart() {
            super.onGameOverToStart(), zs.laya.sdk.SdkService.showInsertAd();
        }
    }
    new class {
        constructor() {
            window.Laya3D ? Laya3D.init(v.width, v.height) : Laya.init(v.width, v.height, Laya.WebGL),
                Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(),
                Laya.stage.bgColor = "#ffffff",
                Laya.stage.scaleMode = v.scaleMode,
                Laya.stage.screenMode = v.screenMode,
                Laya.stage.alignV = v.alignV,
                Laya.stage.alignH = v.alignH,
                Laya.URL.exportSceneToJson = v.exportSceneToJson, console.log("2"),
                (v.debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(),
                v.physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(), v.stat && Laya.Stat.show();
            window.yad = platform.getInstance().createLogo();
            window.yad.bottom = 0;
            window.yad.centerX = 0;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.stage.addComponent(_);
        }
    }();
}();