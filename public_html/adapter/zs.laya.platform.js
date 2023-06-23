window.zs = window.zs || {}, window.zs.laya = window.zs.laya || {}, function(t, e) {
    "use strict";
    class s extends e.Script {
        constructor() {
            super();
        }
        static setUserID(t, e) {
            s.user_id = t, s.is_new = e;
        }
        static initCFG(t) {
            this.platformCfg = t, this.adViewUrl = {
                screenAd: "view/ad/FullAd_4.scene",
                floatAd: "view/ad/FloatAd.scene",
                listAd: "view/ad/FullAd.scene",
                knockEggAd: "view/ad/KnockEgg.scene"
            }, this.adViewScript = {
                screenAd: E,
                floatAd: A,
                listAd: S,
                knockEggAd: I
            }, this.currentView = "";
        }
        static initSoundUrl(t, e) {
            this.openSound = t, this.clickSound = e;
        }
        static initGameAd() {
            // zs.laya.sdk.SdkService.initVideoAd(a.zs_video_adunit), zs.laya.sdk.SdkService.initInsertAd(a.zs_full_screen_adunit, null), 
            // zs.laya.sdk.SdkService.initCustomeAd(a.adUnitId1, a.adUnitId5, a.adUnitId2, a.adUnitId3, a.adUnitId4), 
            // zs.laya.banner.WxBannerMgr.Instance.setAdUnitId(a.zs_banner_rotate_id1, a.zs_banner_rotate_id2, a.zs_banner_rotate_id3);
        }
        static enterGamePopup() {
            setTimeout(function() {
                a.zs_jump_switch && a.isPublicVersion() && a.zs_auto_full_screen_jump_switch && a.zs_switch && a.zs_game_star_jump_switch && (console.log("ljc", "进游戏 打开全屏1 Jump"), 
                s.showListAd(), e.stage.once("closeFullAdJump", this, () => {
                    console.log("ljc", "进游戏 打开全屏2 Rank"), s.showScreenAd();
                }));
            }, 3e3);
        }
        static onGameFaildPopUp(t) {
            a.isBeforeGameAccount() ? (e.stage.on(s.UI_VIEW_CLOSED, null, s.onHideExportView, [ 0, t ]), 
            s.showListAd()) : e.stage.event(s.OPEN_FAILED_VIEW, [ t ]);
        }
        static onGameWinPopUp(t) {
            a.isBeforeGameAccount() ? (s.showListAd(), e.stage.on(s.UI_VIEW_CLOSED, null, s.onHideExportView, [ 1, t ])) : e.stage.event(s.OPEN_WIN_VIEW, [ t ]);
        }
        static onHideExportView(t, i, n) {
            if ("FullAd" == n) 0 == t ? e.stage.event(s.OPEN_FAILED_VIEW, [ i ]) : 1 == t && e.stage.event(s.OPEN_WIN_VIEW, [ i ]), 
            e.stage.off(s.UI_VIEW_CLOSED, null, s.onHideExportView); else if ("FullAd_4" == n && 2 == t && i.viewName == n) {
                e.stage.event(s.GAME_RESET_START), e.stage.off(s.UI_VIEW_CLOSED, null, s.onHideExportView);
                var r = !!i.isBackHome && i.isBackHome;
                a.isPublicVersion() && a.zs_switch && a.zs_auto_pop_ups_switch && r && s.showHomeFloatAd();
            }
        }
        static onGameOverPopUp(t) {
            if (a.isAfterGameAccount()) {
                var i = s.adViewUrl.screenAd;
                i = i.substring(i.lastIndexOf("/") + 1, i.lastIndexOf(".")), 
                e.stage.on(s.UI_VIEW_CLOSED, null, s.onHideExportView, [ 2, {
                    viewName: i,
                    isBackHome: t.isBackHome
                } ]), s.showScreenAd(t);
            } else e.stage.event(s.GAME_RESET_START);
            zs.laya.platform.ADConfig.updateGameNum();
        }
        static showInsertAd() {
            // if (a.zs_full_screen_ad_enable) {
            //     var t = e.LocalStorage.getItem("zs_full_screen_ad_time_stamp");
            //     if (null == t || "" == t || 0 == i.isToday(Number(t))) {
            //         zs.laya.sdk.SdkService.loadInsertAd(e.Handler.create(null, function() {
            //             zs.laya.sdk.SdkService.showInsertAd(null), e.LocalStorage.setItem("zs_full_screen_ad_time_stamp", Date.now().toString());
            //         }), null);
            //     }
            // }
        }
        static onExportJumpCancel() {
            a.zs_jump_switch && a.isPublicVersion() && a.zs_full_screen_jump && a.zs_slide_jump_switch && s.showListAd();
        }
        static initView(t, s, i) {
            if (t instanceof e.View && (t._gameData = i, s)) {
                var a = t.getComponent(s);
                null == a && (a = t.addComponent(s)), a.initView && a.initView(i);
            }
        }
        static showScreenAd(t) {
            // this.currentView != this.adViewUrl.screenAd && (null != this.adViewUrl.screenAd ? (this.currentView = this.adViewUrl.screenAd, 
            // e.Scene.open(this.adViewUrl.screenAd, !1, t, e.Handler.create(this, function(e) {
            //     this.initView(e, this.adViewScript.screenAd, t);
            // })), e.SoundManager.playSound(this.openSound)) : console.error("showScreenAd error"));
        }
        static hideScreenAd() {
            // null != this.adViewUrl.screenAd && (this.currentView = "", e.Scene.close(this.adViewUrl.screenAd));
        }
        static showListAd(t) {
            // this.currentView != this.adViewUrl.listAd && (null != this.adViewUrl.listAd ? (this.currentView = this.adViewUrl.listAd, 
            // e.Scene.open(this.adViewUrl.listAd, !1, t, e.Handler.create(this, function(e) {
            //     this.initView(e, this.adViewScript.listAd, t);
            // })), e.SoundManager.playSound(this.openSound)) : console.error("showListAd error"));
        }
        static hideListAd() {
            // null != this.adViewUrl.listAd && (this.currentView = "", e.Scene.close(this.adViewUrl.listAd));
        }
        static showHomeFloatAd(t) {
            // this.currentView != this.adViewUrl.floatAd && (null != this.adViewUrl.floatAd ? (this.currentView = this.adViewUrl.floatAd, 
            // e.Scene.open(this.adViewUrl.floatAd, !1, t, e.Handler.create(this, function(e) {
            //     this.initView(e, this.adViewScript.floatAd, t);
            // })), e.SoundManager.playSound(this.openSound)) : console.error("showHomeFloatAd error"));
        }
        static hideHomeFloatAd() {
            // null != this.adViewUrl.floatAd && (this.currentView = "", e.Scene.close(this.adViewUrl.floatAd));
        }
        static showKnockEggView(t) {
            // this.currentView != this.adViewUrl.knockEggAd && (null != this.adViewUrl.knockEggAd ? (this.currentView = this.adViewUrl.knockEggAd, 
            // e.Scene.open(this.adViewUrl.knockEggAd, !1, t, e.Handler.create(this, function(e) {
            //     this.initView(e, this.adViewScript.knockEggAd, t);
            // }))) : console.error("knockEggAd error"));
        }
        static hideKnockEggAd() {
            // null != this.adViewUrl.knockEggAd && (this.currentView = "", e.Scene.close(this.adViewUrl.knockEggAd));
        }
    }
    s.platformCfg = null, s.user_id = 1, s.is_new = 1, s.APP_SHOW = "DEVICE_ON_SHOW", 
    s.APP_HIDE = "DEVICE_ON_HIDE", s.APP_JUMP_CANCEL = "NAVIGATE_FAILED", s.APP_JUMP_SUCCESS = "NAVIGATE_SUCCESS", 
    s.AD_CONFIIG_LOADED = "AD_CONFIIG_LOADED", s.UI_VIEW_OPENED = "UI_VIEW_OPENED", 
    s.UI_VIEW_CLOSED = "UI_VIEW_CLOSED", s.OPEN_WIN_VIEW = "OPEN_WIN_VIEW", s.OPEN_FAILED_VIEW = "OPEN_FAILED_VIEW", 
    s.GAME_RESET_START = "GAME_RESET_START", s.EGG_GET_AWARD = "EGG_GET_AWARD", e.ILaya.regClass(s), 
    e.ClassUtils.regClass("zs.laya.platform.PlatformMgr", s), e.ClassUtils.regClass("Zhise.PlatformMgr", s);
    class i {
        static compareVersion(t, e) {
            t = t.split("."), e = e.split(".");
            for (var s = Math.max(t.length, e.length); t.length < s; ) t.push("0");
            for (;e.length < s; ) e.push("0");
            for (var i = 0; i < s; i++) {
                var a = parseInt(t[i]), n = parseInt(e[i]);
                if (a > n) return 1;
                if (a < n) return -1;
            }
            return 0;
        }
        static isToday(t) {
            var e = new Date(Date.now()), s = new Date(t);
            return e.getFullYear() == s.getFullYear() && e.getMonth() == s.getMonth() && e.getDate() == s.getDate();
        }
        static random(t, e) {
            return Math.random() * (e - t) + t << 0;
        }
        static IsNumber(t) {
            return !(!/^\d+(\.\d+)?$/.test(t) && !/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(t));
        }
    }
    class a {
        constructor() {
            this.current_version = "1.0";
        }
        static initAdSetting(t, s) {
            this.current_version = t, this.response = s;
            var n = s.zs_banner_system ? String(s.zs_banner_system).toUpperCase() : null;
            this.zs_version = s.zs_number ? s.zs_number : "0.0";
            var r = !n || !e.Browser.onMobile || !(-1 != n.indexOf("ANDROID") && e.Browser.onAndroid || -1 != n.indexOf("IOS") && !e.Browser.onAndroid);
            this.zs_switch = 1 == s.zs_switch && r && this.isPublicVersion(), this.egg_switch = 1 == s.zs_switch && this.isPublicVersion(), 
            this.zs_video_adunit = s.zs_video_adunit, this.zs_banner_adunit = s.zs_banner_adunit, 
            this.zs_full_screen_adunit = s.zs_full_screen_adunit, this.zs_full_screen_ad_enable = 1 == s.zs_full_screen_ad, 
            this.zs_banner_text_time = s.zs_banner_text_time ? Number(s.zs_banner_text_time) : 1e3, 
            this.zs_banner_banner_time = s.zs_banner_banner_time ? Number(s.zs_banner_banner_time) : 1e3, 
            this.zs_banner_refresh_time = s.zs_banner_refresh_time ? Number(s.zs_banner_refresh_time) : 1e3, 
            this.zs_banner_move_time = s.zs_banner_move_time ? Number(s.zs_banner_move_time) : 1e3, 
            this.zs_banner_vertical_enable = 1 == s.zs_banner_vertical_enable && this.zs_switch, 
            this.zs_banner_horizontal_enable = 1 == s.zs_banner_horizontal_enable, this.zs_share_title = s.zs_share_title, 
            this.zs_share_image = s.zs_share_img, this.zs_shield_gdt_export = 1 == s.zs_shield_gdt_export, 
            this.zs_jump_switch = 1 == s.zs_jump_switch && (0 == zs.laya.sdk.ZSReportSdk.Instance.isFromLink() || this.zs_shield_gdt_export), 
            this.zs_revive_type = s.zs_revive_type, this.zs_revive_click_num = s.zs_revive_click_num, 
            this.zs_revive_video_num = s.zs_revive_video_num, this.zs_revive_share_num = s.zs_revive_share_num, 
            this.zs_full_screen_jump = 1 == s.zs_full_screen_jump, this.zs_history_list_jump = 1 == s.zs_history_list_jump, 
            this.zs_finish_jump = 1 == s.zs_finish_jump, this.repair_click_num = this.zs_click_award_percent = s.zs_click_award_percent || [ .3, .7 ], 
            this.zs_click_award_back = s.zs_click_award_back ? Number(s.zs_click_award_back) : .00423, 
            this.zs_click_award_num = i.IsNumber(s.zs_click_award_num) ? s.zs_click_award_num : s.zs_click_award_num || 0, 
            this.zs_click_award_add = s.zs_click_award_add || .1, this.zs_ready_click_num = i.IsNumber(s.zs_ready_click_num) ? s.zs_ready_click_num : s.zs_ready_click_num || 0, 
            this.zs_revive_countdown = s.zs_revive_countdown ? Number(s.zs_revive_countdown) : 10, 
            this.zs_jump_style = s.zs_jump_style ? Number(s.zs_jump_style) : 0, this.zs_game_star_jump_switch = 1 == s.zs_game_star_jump_switch && this.zs_switch, 
            this.zs_banner_rotate_id1 = s.zs_banner_rotate_id1, this.zs_banner_rotate_id2 = s.zs_banner_rotate_id2, 
            this.zs_banner_rotate_id3 = s.zs_banner_rotate_id3, this.zs_click_award_system = s.zs_click_award_system, 
            this.zs_banner_show_number = this.getNumberVal(s.zs_banner_show_number, 2), this.zs_full_screen_rotate = 1 == this.getNumberVal(s.zs_full_screen_rotate, 0), 
            this.zs_unmiss_text_time = this.getNumberVal(s.zs_unmiss_text_time, 0), this.zs_button_delay_time = this.getNumberVal(s.zs_button_delay_time, 2e3), 
            this.zs_button_delay_switch = 1 == this.getNumberVal(s.zs_button_delay_switch, 0), 
            this.zs_game_banner_show_switch = 1 == this.getNumberVal(s.zs_game_banner_show_switch, 0), 
            this.zs_before_finsh_jump_switch = 1 == this.getNumberVal(s.zs_before_finsh_jump_switch, 0), 
            this.zs_slide_jump_switch = 1 == this.getNumberVal(s.zs_slide_jump_switch, 0), this.zs_auto_pop_ups_switch = 1 == this.getNumberVal(s.zs_slide_jump_switch, 0), 
            this.zs_show_share_num = s.zs_show_share_num ? s.zs_show_share_num : 0, this.zs_start_game_video_switch = 1 == s.zs_start_game_video_switch, 
            this.zs_auto_pop_ups_switch = 1 == this.getNumberVal(s.zs_auto_pop_ups_switch, 0), 
            this.zs_auto_full_screen_jump_switch = 1 == s.zs_auto_full_screen_jump_switch, this.zs_auto_jump_switch = 1 == s.zs_auto_jump_switch, 
            this.zs_friends_playing_switch = 1 == s.zs_friends_playing_switch, this.zs_reminder_switch = 1 == s.zs_reminder_switch, 
            this.zs_finish_switch = 1 == s.zs_finish_switch, this.zs_false_news_switch = 1 == s.zs_false_news_switch, 
            this.zs_share = 1 == s.zs_share, this.zs_Fakerjump = 1 == s.zs_Fakerjump, this.zs_full_screen_banner_time = s.zs_full_screen_banner_time ? Number(s.zs_full_screen_banner_time) : 0, 
            this.zs_skin_push_switch = s.zs_skin_push_switch ? Number(s.zs_skin_push_switch) : 0, 
            this.zs_bgm_change = s.zs_bgm_change ? Number(s.zs_bgm_change) : 0, this.adUnitId1 = s.zs_native_adunit, 
            this.adUnitId5 = s.zs_native_adunit2, this.adUnitId2 = s.zs_native_adunit3, "undefined" != typeof wx && wx.onShareAppMessage(function() {
                return {
                    title: a.zs_share_title,
                    imageUrl: a.zs_share_image
                };
            }), this.initOpenAwardNum();
        }
        static getNumberVal(t, e) {
            return e = i.IsNumber(e) ? Number(e) : 0, i.IsNumber(t) ? Number(t) : e;
        }
        static initOpenAwardNum() {
            this.open_award_num = e.LocalStorage.getItem(window.zs.wx.appId + "open_award_num") || 0;
            var t = e.LocalStorage.getItem(window.zs.wx.appId + "open_award_num_time_stamp");
            null != t && "" != t && 0 != i.isToday(Number(t)) || (e.LocalStorage.setItem(window.zs.wx.appId + "open_award_num_time_stamp", Date.now().toString()), 
            e.LocalStorage.setItem(window.zs.wx.appId + "open_award_num", 0), e.LocalStorage.setItem(window.zs.wx.appId + "open_ready_num", 0), 
            e.LocalStorage.setItem("open_recorder_num", 0), e.LocalStorage.setItem("CheckDatas", JSON.stringify({})));
        }
        static updateGameNum() {
            this.gameNum = e.LocalStorage.getItem(window.zs.wx.appId + "day_game_num") || 0, 
            this.gameNum += 1, e.LocalStorage.setItem(window.zs.wx.appId + "day_game_num", this.gameNum);
            var t = e.LocalStorage.getItem(window.zs.wx.appId + "game_num_time_stamp");
            null != t && "" != t && 0 != i.isToday(Number(t)) || (e.LocalStorage.setItem(window.zs.wx.appId + "game_num_time_stamp", Date.now().toString()), 
            e.LocalStorage.setItem(window.zs.wx.appId + "day_game_num", this.gameNum = 0));
        }
        static isPublicVersion() {
            return a.current_version != a.zs_version;
        }
        static isOpenEgg(t, s) {
            // if (console.log("进入砸金蛋配置" + this.egg_switch), !this.egg_switch) return !1;
            // if (this.zs_click_award_system) {
            //     var a = this.zs_click_award_system.trim().toLowerCase();
            //     if ("android" == a && e.Browser.onAndroid) return !1;
            //     if ("ios" == a && e.Browser.onIOS) return !1;
            // }
            // if (this.zs_click_award_since && this.zs_click_award_since > 0) {
            //     let t = e.LocalStorage.getItem(window.zs.wx.appId + "day_game_num");
            //     if (console.debug("当前局数" + t, this.zs_click_award_since + "局后开启砸金蛋"), !t || Number(t) < this.zs_click_award_since) return !1;
            // }
            // let n = 1 == s ? this.zs_ready_click_num : this.zs_click_award_num;
            // if (i.IsNumber(n)) {
            //     let t = 1 == s ? e.LocalStorage.getItem(window.zs.wx.appId + "open_ready_num") : e.LocalStorage.getItem(window.zs.wx.appId + "open_award_num");
            //     if (console.debug("type" + s, "限制:" + n, "已:" + t), console.log("type" + s, "限制:" + n, "已:" + t), 
            //     -1 == n) return !0;
            //     if (Number(n) > Number(t)) return !0;
            // }
            // if (console.debug("限制:" + n), console.log("限制:" + n), n && n.length > 0) {
            //     if (1 == n.length && -1 == n[0]) return !0;
            //     if (-1 != n.indexOf(t)) return !0;
            // }
            return !1;
        }
        static isShareRecorder(t) {
            if (e.Browser.onIOS) return !1;
            if (i.IsNumber(a.zs_show_share_num)) {
                if (-1 == a.zs_show_share_num) return !0;
                var s = e.LocalStorage.getItem("open_recorder_num") || 0;
                if (Number(a.zs_show_share_num) > Number(s)) return !0;
            }
            if (this.zs_show_share_num && this.zs_show_share_num.length > 0) {
                if (1 == this.zs_show_share_num.length && -1 == this.zs_show_share_num[0]) return !0;
                if (-1 != (this.zs_show_share_num.indexOf("[") >= 0 ? JSON.parse(this.zs_show_share_num) : this.zs_show_share_num.split(",")).indexOf(t)) return !0;
            }
            return !1;
        }
        static enableClickRevive() {
            return this.isReviveTypeEnable("zs_revive_click_num");
        }
        static updateClickRevive() {
            this.updateReviveTypeInfo("zs_revive_click_num");
        }
        static enableVideoRevive() {
            return this.isReviveTypeEnable("zs_revive_video_num");
        }
        static updateVideoRevive() {
            this.updateReviveTypeInfo("zs_revive_video_num");
        }
        static enableShareRevive() {
            return this.isReviveTypeEnable("zs_revive_share_num");
        }
        static updateShareRevive() {
            this.updateReviveTypeInfo("zs_revive_share_num");
        }
        static isReviveTypeEnable(t) {
            if (0 == this[t]) return !1;
            if (-1 == this[t]) return !0;
            var s = e.LocalStorage.getItem(t + "_time_stamp");
            if (null == s || "" == s || 0 == i.isToday(Number(s))) return !0;
            var a = e.LocalStorage.getItem(t);
            return (null == a || "" == a ? 0 : Number(a)) < this[t];
        }
        static updateReviveTypeInfo(t) {
            e.LocalStorage.setItem(t + "_time_stamp", Date.now().toString());
            var s = e.LocalStorage.getItem(t), i = null == s || "" == s ? 0 : Number(s);
            i++, e.LocalStorage.setItem(t, i.toString());
        }
        static isBeforeGameAccount() {
            return a.isPublicVersion() && a.zs_jump_switch && a.zs_before_finsh_jump_switch;
        }
        static isAfterGameAccount() {
            return a.isPublicVersion() && a.zs_jump_switch && a.zs_full_screen_jump;
        }
    }
    a.response = null, a.zs_share_title = "", a.zs_share_image = "", a.zs_switch = !1, 
    a.zs_version = "1.0.0", a.zs_video_adunit = "", a.zs_banner_adunit = "", a.zs_banner_rotate_id1 = "", 
    a.zs_banner_rotate_id2 = "", a.zs_banner_rotate_id3 = "", a.zs_full_screen_adunit = "", 
    a.zs_full_screen_ad_enable = !1, a.zs_banner_text_time = 0, a.zs_banner_banner_time = 0, 
    a.zs_banner_refresh_time = 0, a.zs_banner_move_time = 500, a.zs_banner_vertical_enable = !1, 
    a.zs_banner_horizontal_enable = !1, a.zs_jump_switch = !1, a.zs_revive_type = 0, 
    a.zs_revive_click_num = 0, a.zs_revive_video_num = 0, a.zs_revive_share_num = 0, 
    a.zs_continue_auto_share = !1, a.zs_full_screen_jump = !1, a.zs_history_list_jump = !1, 
    a.zs_finish_jump = !1, a.zs_revive_countdown = 10, a.zs_jump_style = 1, a.zs_game_star_jump_switch = 0, 
    a.zs_shield_gdt_export = !0, a.zs_full_screen_rotate = !1, a.zs_button_delay_switch = !1, 
    a.zs_button_delay_time = 2e3, a.zs_game_banner_show_switch = !0, a.zs_before_finsh_jump_switch = !1, 
    a.zs_slide_jump_swich = !1, a.zs_auto_pop_ups_switch = !0, a.zs_start_game_video_switch = !1, 
    a.zs_auto_full_screen_jump_switch = !1, a.zs_auto_jump_switch = !1, a.zs_friends_playing_switch = !1, 
    a.zs_reminder_switch = !1, a.zs_finish_switch = !1, a.zs_false_news_switch = !1, 
    a.zs_full_screen_banner_time = 0, a.zs_skin_push_switch = 0, a.zs_bgm_change = 0, 
    e.ILaya.regClass(a), e.ClassUtils.regClass("zs.laya.platform.ADConfig", a), e.ClassUtils.regClass("Zhise.ADConfig", a);
    class n extends e.Script {
        constructor() {
            super(), this.adType = null, this.autoScroll = !1, this.scrollDir = n.SCROLL_NONE, 
            this.dragSleep = 5e3, this.scrollSpeed = 1, this.waitTime = 1e3, this.passedTime = 0, 
            this.inAutoScroll = !1, this.adData = [], this.iosFilterAppIds = [], this.list = null, 
            this.hotIds = [], this.maxNum = null, this.isDataUpdate = !1, this.touchIndex = -1, 
            this.isRandomSelect = !1, this.changeValue = 0, this.unitValue = 0, this.isEnd = !1, 
            this.isClockPendulum = !1, this.notJumpFull = !1, this.bFixHeigt = !1;
        }
        requestAdData(t, e, s, i, a, r, h, o) {
            this.adType = t, this.autoScroll = e, this.scrollDir = s, this.iosFilterAppIds = i || [], 
            this.maxNum = a, this.notJumpFull = o, this.isRandomSelect = r, this.isClockPendulum = h, 
            this.scrollDir == n.SCROLL_VERTICAL ? this.list.vScrollBarSkin = "" : this.scrollDir == n.SCROLL_HORIZONTAL && (this.list.hScrollBarSkin = "");
            var l = this;
            zs.laya.sdk.ZSReportSdk.loadAd(function(t) {
                if (l.list) {
                    l.adData = t[l.adType.toString()], l.allData = {};
                    for (let t = 0; t < l.adData.length; t++) l.allData[l.adData[t].app_title] || (l.allData[l.adData[t].app_title] = []), 
                    l.allData[l.adData[t].app_title].push(l.adData[t]);
                    l.initHotIds(), l.freshAdList();
                }
            });
        }
        reloadData() {
            this.adData.sort(() => Math.random() > .5 ? 1 : -1), this.list.array = this.adData;
        }
        refreshSingleItem(t) {
            var e = Math.floor(Math.random() * this.adData.length);
            if (this.adData.length > 1 && e == t) return this.refreshSingleItem(t);
            console.log("新的随机数是：", e);
            var s = this.adData[e], i = this.adData[t];
            s && (this.list.setItem(t, s), this.list.setItem(e, i));
        }
        checkChange(t) {
            var s = this.adData[t].app_title, i = e.LocalStorage.getItem("CheckDatas");
            try {
                (i = JSON.parse(i)) || (i = {});
            } catch (t) {
                i = {};
            }
            !this.allData[s] || this.allData[s].length <= 1 || (i[s] || (i[s] = {
                cur: 0
            }), i[s].cur++, this.adData[t] = this.allData[s][i[s].cur % this.allData[s].length], 
            this.list.setItem(t, this.adData[t]), e.LocalStorage.setItem("CheckDatas", JSON.stringify(i)));
        }
        checkData() {
            var t = e.LocalStorage.getItem("CheckDatas");
            try {
                (t = JSON.parse(t)) || (t = {});
            } catch (e) {
                t = {};
            }
            for (let e = 0; e < this.adData.length; e++) t[this.adData[e].app_title] || (t[this.adData[e].app_title] = {
                cur: 0
            });
            this.adData = [];
            for (let e in t) this.allData[e] && this.adData.push(this.allData[e][t[e].cur % this.allData[e].length]);
        }
        freshAdList() {
            var t = this;
            if (this.adData = this.adData.filter(function(s) {
                return e.Browser.onAndroid || -1 == t.iosFilterAppIds.indexOf(s.appid);
            }), this.checkData(), null != this.maxNum) if (this.adData.length < this.maxNum) for (;this.adData.length < this.maxNum; ) this.adData.push(this.adData[Math.floor(Math.random() * this.adData.length)]); else if (this.adData.length > this.maxNum) for (;this.adData.length > this.maxNum; ) this.adData.splice(Math.floor(Math.random() * this.adData.length), 1);
            this.reloadData();
            var s = 0, i = this.list.getCell(0);
            if (i) {
                if (this.scrollDir == n.SCROLL_VERTICAL) {
                    if (s = Math.ceil(this.list.array.length / this.list.repeatX), console.log("行数：", s), 
                    this.unitValue = (i.height + this.list.spaceY) / (s * i.height + this.list.spaceY * (s - 1) - this.list.height) * this.list.scrollBar.max, 
                    this.bFixHeigt) {
                        var a = i.height * s + this.list.spaceY * (s - 1);
                        this.list.height = a;
                    }
                } else this.scrollDir == n.SCROLL_HORIZONTAL && (s = Math.ceil(this.list.array.length / this.list.repeatY), 
                this.unitValue = (i.width + this.list.spaceX) / (s * i.width + this.list.spaceX * (s - 1) - this.list.width) * this.list.scrollBar.max);
                console.log("单元value" + this.unitValue), this.autoScroll && e.stage.frameOnce(1, this, this.startAutoScrollAd);
            }
        }
        initHotIds() {
            for (var t = Math.random() < .5 ? 3 : 4, e = Math.floor(this.adData.length / t), s = 0; s < t; s++) this.hotIds.push(Math.floor(e * Math.random()) + s * e);
        }
        startAutoScrollAd() {
            this.list && (this.inAutoScroll = !0);
        }
        onItemRender(t, e) {
            var s = this.list.array[e];
            if (s) {
                if (i = t.getChildByName("icon")) {
                    i.loadImage(s.app_icon, null);
                    let t = i.getChildByName("mask");
                    t && (t.width = i.width, t.height = i.height);
                } else {
                    var i, a = t.getChildByName("iconBox");
                    if (a) (i = a.getChildByName("icon")) && (i.skin = s.app_icon);
                }
                var n = t.getChildByName("name");
                n && (n.text = s.app_title);
                var r = t.getChildByName("desc");
                r && (r.text = s.app_desc);
                var h = t.getChildByName("people");
                if (h) {
                    var o = Math.floor(980 * Math.random() + 6);
                    h.text = `${o / 10}万人在玩`;
                }
                if (1 != this.isDataUpdate) {
                    var l = t.getChildByName("titleBg");
                    l && (l.index = Math.floor(l.clipY * Math.random()));
                    var d = t.getChildByName("tag");
                    if (d) this.hotIds.indexOf(e) > 0 ? (d.visible = !0, d.index = Math.floor(d.clipY * Math.random())) : d.visible = !1; else {
                        var c = t.getChildByName("hot"), u = t.getChildByName("new");
                        c && (c.visible = !1), u && (u.visible = !1), this.hotIds.indexOf(e) > 0 && (c && u ? Math.random() < .5 ? c.visible = !0 : u.visible = !0 : c && !u ? c.visible = !0 : u && !c && (u.visible = !0));
                    }
                }
            } else t.visible = !1;
        }
        onTouchEnd(t) {
            this.list && this.list.array && (a.zs_slide_jump_switch && this.isRandomSelect && -1 == this.touchIndex && (this.touchIndex = Math.floor(Math.random() * this.list.array.length), 
            console.log("RandomSelect:" + this.touchIndex + " data list length:" + this.list.array.length)), 
            this.onSelectAd(this.touchIndex), this.touchIndex = -1);
        }
        onMouseAd(t, s) {
            t.type == e.Event.MOUSE_DOWN && (this.touchIndex = s);
        }
        onSelectAd(t) {
            if (null != t && -1 != t && this.list && this.list.array) {
                var i = this.list.array[t], a = this;
                a.isDataUpdate = !0, zs.laya.sdk.ZSReportSdk.navigate2Mini(i, s.user_id, function() {
                    e.stage.event(n.EVENT_NAVIGATE_SUCCESS);
                }, function() {
                    e.stage.event(n.EVENT_NAVIGATE_FAILED), a.notJumpFull || s.onExportJumpCancel();
                }, function() {
                    a.list.selectedIndex = -1, a.checkChange(t), e.stage.event(n.EVENT_NAVIGATE_COMPLETED);
                });
            }
        }
        params2String(t) {
            for (var e = t[0] + "=" + t[1], s = 2; s < t.length; s += 2) e += "&" + t[s] + "=" + t[s + 1];
            return e;
        }
        onDragStateChanged(t) {
            this.inAutoScroll = !1, this.autoScroll && 0 == t && (this.passedTime = 0);
        }
        onAwake() {
            this.list = this.owner, this.list.selectEnable = !0, this.list.renderHandler = e.Handler.create(this, this.onItemRender, null, !1), 
            this.list.mouseHandler = e.Handler.create(this, this.onMouseAd, null, !1);
        }
        onEnable() {
            this.owner.on(e.Event.MOUSE_UP, this, this.onTouchEnd), this.list.on(e.Event.MOUSE_UP, this, this.onDragStateChanged, [ 0 ]), 
            this.list.on(e.Event.MOUSE_OUT, this, this.onDragStateChanged, [ 0 ]), this.list.on(e.Event.MOUSE_DOWN, this, this.onDragStateChanged, [ 1 ]);
        }
        onDisable() {
            this.owner.off(e.Event.MOUSE_UP, this, this.onTouchEnd), this.list.off(e.Event.MOUSE_UP, this, this.onDragStateChanged), 
            this.list.off(e.Event.MOUSE_OUT, this, this.onDragStateChanged), this.list.off(e.Event.MOUSE_DOWN, this, this.onDragStateChanged);
        }
        onUpdate() {
            if (this.autoScroll && 1 == this.inAutoScroll && this.list && this.list.scrollBar && this.list.scrollBar.max) {
                if (this.list.scrollBar.value >= this.list.scrollBar.max ? (this.list.scrollBar.value = this.list.scrollBar.max, 
                this.scrollSpeed = 0 - this.scrollSpeed, this.isEnd = !0) : this.list.scrollBar.value <= 0 && (this.list.scrollBar.value = 0, 
                this.scrollSpeed = 0 - this.scrollSpeed, this.isEnd = !0), this.list.scrollBar.value += this.scrollSpeed, 
                !this.unitValue || !this.isClockPendulum) return;
                this.isEnd = this.isEnd && 0 != this.changeValue, this.changeValue += Math.abs(this.scrollSpeed), 
                (this.changeValue >= this.unitValue || this.isEnd) && (this.autoScroll = !1, this.isEnd = !1, 
                this.changeValue = 0, e.timer.once(this.waitTime, this, function() {
                    this.autoScroll = !0;
                }));
            }
            this.autoScroll && 0 == this.inAutoScroll && (this.passedTime += e.timer.delta, 
            this.passedTime > this.dragSleep && this.startAutoScrollAd());
        }
        setFixHeight(t) {
            this.bFixHeigt = t;
        }
    }
    n.EVENT_NAVIGATE_SUCCESS = "NAVIGATE_SUCCESS", n.EVENT_NAVIGATE_FAILED = "NAVIGATE_FAILED", 
    n.EVENT_NAVIGATE_COMPLETED = "NAVIGATE_COMPLETED", n.SCROLL_NONE = 0, n.SCROLL_VERTICAL = 1, 
    n.SCROLL_HORIZONTAL = 2, e.ILaya.regClass(n), e.ClassUtils.regClass("zs.laya.platform.AdList", n), 
    e.ClassUtils.regClass("Zhise.AdList", n);
    class r extends n {
        constructor() {
            super();
        }
        onItemRender(t, e) {
            var s = this.list.array[e];
            if (s) {
                if (1 != this.isDataUpdate) {
                    var i = t.getChildByName("icon");
                    i && (6 != e ? (i.visible = !0, i.loadImage(s.app_icon, null)) : i.visible = !1);
                    var a = t.getChildByName("name");
                    a && (a.text = 6 != e ? s.app_title : "");
                    var n = t.getChildByName("desc");
                    n && (n.text = 6 != e ? s.app_desc : "");
                    var r = t.getChildByName("arrow");
                    r && (r.visible = 6 == e, 6 == e ? (r.visible = !0, r.index = s.arrowIdx ? s.arrowIdx : 0) : r.visible = !1);
                }
            } else t.visible = !1;
        }
        onSelectAd(t) {
            if (-1 != t) {
                var i = this.list.array[t];
                if (6 == t) return null == i.arrowIdx || 0 == i.arrowIdx ? (i.arrowIdx = 1, this.owner.event(r.EVENT_AD_SWITCH_SHOW)) : (i.arrowIdx = 0, 
                this.owner.event(r.EVENT_AD_SWITCH_HIDE)), void (this.list.selectedIndex = -1);
                var a = this;
                a.isDataUpdate = !0, zs.laya.sdk.ZSReportSdk.navigate2Mini(i, s.user_id, function() {
                    e.stage.event(n.EVENT_NAVIGATE_SUCCESS);
                }, function() {
                    e.stage.event(n.EVENT_NAVIGATE_FAILED), s.onExportJumpCancel();
                }, function() {
                    a.list.selectedIndex = -1, e.stage.event(n.EVENT_NAVIGATE_COMPLETED);
                });
            }
        }
    }
    r.EVENT_AD_SWITCH_SHOW = "EVENT_AD_SWITCH_SHOW", r.EVENT_AD_SWITCH_HIDE = "EVENT_AD_SWITCH_HIDE", 
    e.ILaya.regClass(r), e.ClassUtils.regClass("zs.laya.platform.AdList2", r), e.ClassUtils.regClass("Zhise.AdList2", r);
    class h extends e.Script {
        constructor() {
            super(), this.args = null, this.adView = null, this.monitorOtherPageOpen = !1, this.visibleArr = null;
        }
        onEnable() {
            null == this.adView && e.stage.on(s.AD_CONFIIG_LOADED, this, this.onStart);
        }
        onDisable() {
            null == this.adView && e.stage.off(s.AD_CONFIIG_LOADED, this, this.onStart), this.monitorOtherPageOpen && (e.stage.off(s.UI_VIEW_OPENED, this, this.onViewOpened), 
            e.stage.off(s.UI_VIEW_CLOSED, this, this.onViewClosed));
        }
        onDestroy() {
            if (null != this.adView) {
                for (var t = 0; t < this.adView.length; t++) null != this.adView[t] && this.adView[t].destroy();
                this.adView = null;
            }
        }
        onStart() {
            if (!this.adView && 0 != a.zs_jump_switch && 0 != a.isPublicVersion()) {
                var t = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
                if (("HomePage" != t || a.zs_game_star_jump_switch && a.zs_switch) && (this.args = s.platformCfg.exportGameCfg[t], 
                this.args)) {
                    this.monitorOtherPageOpen = !1;
                    for (var i = 0; i < this.args.length; i++) {
                        (null == (n = this.args[i]).checkKey || a[n.checkKey]) && (this.monitorOtherPageOpen = this.monitorOtherPageOpen || n.isHide);
                    }
                    this.monitorOtherPageOpen && (e.stage.on(s.UI_VIEW_OPENED, this, this.onViewOpened), 
                    e.stage.on(s.UI_VIEW_CLOSED, this, this.onViewClosed)), this.adView = [];
                    for (i = 0; i < this.args.length; i++) {
                        var n;
                        if ((n = this.args[i]).readonly) this.adView.push(null); else {
                            if (null == n.checkKey || a[n.checkKey]) {
                                n.delayTime ? e.timer.once(n.delayTime, this, () => {
                                    e.loader.create(n.viewUrl, e.Handler.create(this, this.onPrefabReady), null, e.Loader.PREFAB);
                                }) : e.loader.create(n.viewUrl, e.Handler.create(this, this.onPrefabReady), null, e.Loader.PREFAB);
                                break;
                            }
                            this.adView.push(null);
                        }
                    }
                }
            }
        }
        onPrefabReady(t) {
            if (!this.destroyed) {
                var s = this.args[this.adView.length], i = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
                if (this.owner.getChildByName(s.parentRoot)) {
                    var n = this.getViewScript(s.scriptType);
                    if (null != n) {
                        var r = t.create();
                        this.owner.getChildByName(s.parentRoot).addChild(r), r.pos(s.x, s.y);
                        var h = r.getComponent(n);
                        if (null == h && (h = r.addComponent(n)), s.adType && h.initView(s), this.adView.push(r), 
                        this.adView.length < this.args.length) {
                            var o = this.args[this.adView.length];
                            o.readonly ? this.adView.push(null) : null == o.checkKey || a[o.checkKey] ? e.loader.create(o.viewUrl, e.Handler.create(this, this.onPrefabReady), null, e.Loader.PREFAB) : this.adView.push(null);
                        }
                    } else console.log(i + " page" + s.viewUrl + " scriptType is null");
                } else console.log(i + " page parentRoot " + s.parentRoot + " is null");
            }
        }
        getViewScript(t) {
            switch (t) {
              case "ExportScrollH":
                return o;

              case "ExportScrollV":
                return l;

              case "ExportScrollNone":
                return d;

              case "ShakeExportBox":
                return u;

              case "InviteBtn":
                return p;

              case "FakeExitBtn":
                return _;

              case "FloatExportBtn":
                return m;

              case "ScreenExportBtn":
                return g;

              case "ExportLeftPop":
                return w;

              case "ExportRightPop":
                return f;

              case "ExportLeftFlyBox":
                return C;
            }
        }
        onViewOpened(t) {
            if (t && this.adView) {
                this.visibleArr = [];
                for (var e = 0; e < this.adView.length; e++) null != this.adView[e] && this.args[e].isHide && (this.visibleArr[e] = this.adView[e].visible, 
                this.adView[e].visible = !1);
            }
        }
        onViewClosed(t) {
            if (t && this.adView) {
                if (!this.visibleArr) return;
                for (var e = 0; e < this.adView.length; e++) null != this.adView[e] && this.args[e].isHide && this.visibleArr[e] && (this.adView[e].visible = this.visibleArr[e]);
            }
        }
    }
    e.ILaya.regClass(h), e.ClassUtils.regClass("zs.laya.platform.ExportGameCtrl", h), 
    e.ClassUtils.regClass("Zhise.ExportGameCtrl", h);
    class o extends e.Script {
        constructor() {
            super(), this.adList = null;
        }
        initView(t) {
            this.adList = this.owner.getChildByName("adList").addComponent(n);
            var e = s.platformCfg;
            this.adList.requestAdData(t.adType, !0, n.SCROLL_HORIZONTAL, e.iosFilterAppIds, null, !1, t.isClockPendulum);
        }
    }
    e.ILaya.regClass(o), e.ClassUtils.regClass("zs.laya.platform.ExportScrollH", o), 
    e.ClassUtils.regClass("Zhise.ExportScrollH", o);
    class l extends e.Script {
        constructor() {
            super(), this.adList = null;
        }
        initView(t) {
            this.adList = this.owner.getChildByName("adList").addComponent(n);
            var e = s.platformCfg;
            this.adList.requestAdData(t.adType, !0, n.SCROLL_VERTICAL, e.iosFilterAppIds, null, !1, t.isClockPendulum);
        }
    }
    e.ILaya.regClass(l), e.ClassUtils.regClass("zs.laya.platform.ExportScrollV", l), 
    e.ClassUtils.regClass("Zhise.ExportScrollV", l);
    class d extends e.Script {
        constructor() {
            super(), this.adList = null;
        }
        initView(t) {
            this.adList = this.owner.getChildByName("adList").addComponent(n);
            var e = s.platformCfg;
            this.adList.requestAdData(t.adType, !1, n.SCROLL_NONE, e.iosFilterAppIds, null, !1, t.isClockPendulum);
        }
    }
    e.ILaya.regClass(d), e.ClassUtils.regClass("zs.laya.platform.ExportScrollNone", d), 
    e.ClassUtils.regClass("Zhise.ExportScrollNone", d);
    class c extends e.Script {
        constructor() {
            super(), this.list = null, this.delayAnimTime = 1e3, this.animIntervalTime = 1500, 
            this.animDuaration = 500, this.adIdx = 0, this.rotOffset = 20, this.loopTime = 8, 
            this.currentAdData = null, this.adDataArr = null, this.subAnimDuaration = 0, this.maxNum = 4;
        }
        initAd(t) {
            this.adDataArr = t, this.allData = {};
            for (let t = 0; t < this.adDataArr.length; t++) this.allData[this.adDataArr[t].app_title] || (this.allData[this.adDataArr[t].app_title] = []), 
            this.allData[this.adDataArr[t].app_title].push(this.adDataArr[t]);
            this.checkData(), this.adIdx %= this.adDataArr.length, this.onItemRender(this.adDataArr[this.adIdx]), 
            this.owner.timerLoop(this.delayAnimTime + this.animIntervalTime, this, this.freshAdItems);
        }
        checkChange(t) {
            var s = this.adDataArr[t].app_title, i = e.LocalStorage.getItem("CheckDatas");
            try {
                (i = JSON.parse(i)) || (i = {});
            } catch (t) {
                i = {};
            }
            !this.allData[s] || this.allData[s].length <= 1 || (i[s] || (i[s] = {
                cur: 0
            }), i[s].cur++, this.adDataArr[t] = this.allData[s][i[s].cur % this.allData[s].length], 
            this.onItemRender(this.adDataArr[t]), e.LocalStorage.setItem("CheckDatas", JSON.stringify(i)));
        }
        checkData() {
            var t = e.LocalStorage.getItem("CheckDatas");
            try {
                (t = JSON.parse(t)) || (t = {});
            } catch (e) {
                t = {};
            }
            for (let e = 0; e < this.adDataArr.length; e++) t[this.adDataArr[e].app_title] || (t[this.adDataArr[e].app_title] = {
                cur: 0
            });
            this.adDataArr = [];
            for (let e in t) this.allData[e] && this.adDataArr.push(this.allData[e][t[e].cur % this.allData[e].length]);
        }
        freshAdItems() {
            this.adIdx += this.maxNum, this.adIdx %= this.adDataArr.length, this.onItemRender(this.adDataArr[this.adIdx]), 
            this.playShakeAnim(0);
        }
        playShakeAnim(t) {
            if (!(t >= this.loopTime)) {
                var s = this.owner;
                switch (t % this.loopTime) {
                  case 0:
                    e.Tween.to(s, {
                        rotation: this.rotOffset
                    }, this.subAnimDuaration, e.Ease.linearNone, e.Handler.create(this, this.playShakeAnim, [ t + 1 ]));
                    break;

                  case 1:
                    e.Tween.to(s, {
                        rotation: 0
                    }, this.subAnimDuaration, e.Ease.linearNone, e.Handler.create(this, this.playShakeAnim, [ t + 1 ]));
                    break;

                  case 2:
                    e.Tween.to(s, {
                        rotation: this.rotOffset
                    }, this.subAnimDuaration, e.Ease.linearNone, e.Handler.create(this, this.playShakeAnim, [ t + 1 ]));
                    break;

                  case 3:
                    e.Tween.to(s, {
                        rotation: 0
                    }, this.subAnimDuaration, e.Ease.linearNone, e.Handler.create(this, this.playShakeAnim, [ t + 1 ]));
                }
            }
        }
        onItemRender(t) {
            if (null != t) {
                this.currentAdData = t, this.owner.visible = !0;
                var e = this.owner, s = e.getChildByName("icon");
                s && s.loadImage(t.app_icon, null);
                var i = e.getChildByName("name");
                i && (i.text = t.app_title);
                var a = e.getChildByName("desc");
                a && (a.text = t.app_desc);
            } else null == this.currentAdData && (this.owner.visible = !1);
        }
        onClick() {
            var t = this, i = this.adDataArr[t.adIdx];
            zs.laya.sdk.ZSReportSdk.navigate2Mini(i, s.user_id, function() {
                e.stage.event(n.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                e.stage.event(n.EVENT_NAVIGATE_FAILED), s.onExportJumpCancel();
            }, function() {
                t.checkChange(t.adIdx);
            });
        }
        onStart() {
            this.subAnimDuaration = this.animDuaration / this.loopTime, console.log("this.subAnimDuaration", this.subAnimDuaration);
        }
    }
    e.ILaya.regClass(c), e.ClassUtils.regClass("zs.laya.platform.ShakeExportIcon", c), 
    e.ClassUtils.regClass("Zhise.ShakeExportIcon", c);
    class u extends e.Script {
        constructor() {
            super(), this.adType = 0, this.iconScriptArr = [];
        }
        initView(t) {
            this.adType = t.adType;
            for (var e = this.owner.numChildren, s = 0; s < e; s++) {
                var i = this.owner.getChildAt(s).addComponent(c);
                i.adIdx = s, i.maxNum = e, this.iconScriptArr.push(i);
            }
            this.requestAdData();
        }
        requestAdData() {
            var t = this;
            zs.laya.sdk.ZSReportSdk.loadAd(function(s) {
                var i = s[t.adType.toString()];
                i = i.filter(function(t) {
                    return e.Browser.onAndroid || "wx48820730357d81a6" != t.appid && "wxc136d75bfc63107c" != t.appid;
                });
                for (var a = 0; a < t.iconScriptArr.length; a++) {
                    t.iconScriptArr[a].initAd(i);
                }
            });
        }
    }
    e.ILaya.regClass(u), e.ClassUtils.regClass("zs.laya.platform.ShakeExportBox", u), 
    e.ClassUtils.regClass("Zhise.ShakeExportBox", u);
    class _ extends e.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = !0, this.owner.visible = a.zs_jump_switch && a.isPublicVersion() && a.zs_history_list_jump;
        }
        onClick() {
            e.SoundManager.playSound(s.soundClick), this.owner.mouseEnabled = !1, s.showListAd(), 
            this.owner.mouseEnabled = !0;
        }
    }
    e.ILaya.regClass(_), e.ClassUtils.regClass("zs.laya.platform.FakeExitBtn", _), e.ClassUtils.regClass("Zhise.FakeExitBtn", _);
    class m extends e.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = !0, this.owner.visible = a.zs_jump_switch && a.isPublicVersion() && a.zs_history_list_jump;
        }
        onClick() {
            e.SoundManager.playSound(s.soundClick), this.owner.mouseEnabled = !1, s.showHomeFloatAd(), 
            this.owner.mouseEnabled = !0;
        }
    }
    e.ILaya.regClass(m), e.ClassUtils.regClass("zs.laya.platform.FloatExportBtn", m), 
    e.ClassUtils.regClass("Zhise.FloatExportBtn", m);
    class g extends e.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = !0, this.owner.visible = a.zs_jump_switch && a.isPublicVersion() && a.zs_history_list_jump;
        }
        onClick() {
            e.SoundManager.playSound(s.soundClick), this.owner.mouseEnabled = !1, s.showScreenAd(), 
            this.owner.mouseEnabled = !0;
        }
    }
    e.ILaya.regClass(g), e.ClassUtils.regClass("zs.laya.platform.ScreenExportBtn", g), 
    e.ClassUtils.regClass("Zhise.ScreenExportBtn", g);
    class p extends e.Script {
        constructor() {
            super();
        }
        onClick() {
            console.log("openInvite"), e.SoundManager.playSound(s.soundClick), zs.laya.sdk.SdkService.openShare(zs.laya.platform.ADConfig.zs_share_title, zs.laya.platform.ADConfig.zs_share_image);
        }
    }
    e.ILaya.regClass(p), e.ClassUtils.regClass("zs.laya.platform.InviteBtn", p), e.ClassUtils.regClass("Zhise.InviteBtn", p);
    class w extends e.Script {
        constructor() {
            super(), this.srcX = 0, this.adList = null, this.adCheckBox = null, this.bgmask = null;
        }
        initView(t) {
            this.srcX = this.owner.x, this.adList = this.owner.getChildByName("adList").addComponent(n), 
            this.adCheckBox = this.owner.getChildByName("adCheckBox"), this.bgmask = this.owner.getChildByName("bgmask"), 
            this.adCheckBox.on(e.Event.CLICK, this, this.updateFloatPos);
            var i = s.platformCfg;
            this.adList.requestAdData(t.adType, !0, n.SCROLL_VERTICAL, i.iosFilterAppIds, null, !1, !0), 
            a.zs_switch && !w.firstEnter && (this.adCheckBox.selected = !0, this.updateFloatPos()), 
            w.firstEnter && (w.firstEnter = !1);
        }
        onDestroy() {
            this.adCheckBox.off(e.Event.CLICK, this, this.updateFloatPos);
        }
        updateFloatPos() {
            zs.laya.sdk.SdkService.hideUserInfoButton(), this.adCheckBox.mouseEnabled = !1, 
            this.adCheckBox.selected ? (e.Tween.to(this.owner, {
                x: 0
            }, 500, null, e.Handler.create(this, this.onTweenCompleted)), this.bgmask && (this.bgmask.visible = !0)) : (e.Tween.to(this.owner, {
                x: this.srcX
            }, 500, null, e.Handler.create(this, this.onTweenCompleted)), this.bgmask && (this.bgmask.visible = !1), 
            "leftUIGame" == this.owner.parent.name && e.stage.event("ExportLeftPopCheckClicked"));
        }
        onTweenCompleted() {
            this.adCheckBox.mouseEnabled = !0, 0 == this.adCheckBox.selected && zs.laya.sdk.SdkService.showUserInfoButton();
        }
    }
    w.firstEnter = !1, e.ILaya.regClass(w), e.ClassUtils.regClass("zs.laya.platform.ExportLeftPop", w), 
    e.ClassUtils.regClass("Zhise.ExportLeftPop", w);
    class f extends e.Script {
        constructor() {
            super(), this.adFrame = null, this.adList = null;
        }
        initView(t) {
            this.adFrame = this.owner.getChildByName("adFrame"), this.adList = this.owner.getChildByName("adList").addComponent(r);
            var e = s.platformCfg;
            this.adList.requestAdData(t.adType, !1, n.SCROLL_NONE, e.iosFilterAppIds, 9), this.adList.owner.on(r.EVENT_AD_SWITCH_HIDE, this, this.onAdHide), 
            this.adList.owner.on(r.EVENT_AD_SWITCH_SHOW, this, this.onAdShow);
        }
        onAdHide() {
            this.adList.owner.mouseEnabled = !1, e.Tween.to(this.owner, {
                x: -150
            }, 500, null, e.Handler.create(this, this.onTweenCompleted));
        }
        onAdShow() {
            this.adList.owner.mouseEnabled = !1, e.Tween.to(this.owner, {
                x: -450
            }, 500, null, e.Handler.create(this, this.onTweenCompleted));
        }
        onTweenCompleted() {
            this.adList.owner.mouseEnabled = !0;
        }
    }
    e.ILaya.regClass(f), e.ClassUtils.regClass("zs.laya.platform.ExportRightPop", f), 
    e.ClassUtils.regClass("Zhise.ExportRightPop", f);
    class C extends e.Script {
        constructor() {
            super(), this.isClick = !1, this.adData = [], this.unData = [], this.showNum = 0;
        }
        initView(t) {
            if (a.zs_jump_switch && a.isPublicVersion()) {
                this.showNum = this.owner.numChildren;
                for (var s = this, i = 0; i < this.showNum; i++) {
                    var n = this.owner.getChildByName("ad_" + i);
                    n && e.Tween.from(n, {
                        rotation: 360,
                        x: n.x - 500
                    }, 700, null, e.Handler.create(this, function() {
                        s.isClick = !0;
                    }));
                }
                var r = t.adType.toString();
                zs.laya.sdk.ZSReportSdk.loadAd(function(t) {
                    s.adData = t[r], s.freshAdBox();
                });
            } else this.owner.visible = !1;
        }
        freshAdBox() {
            var t = s.platformCfg;
            if (this.adData = this.adData.filter(function(s) {
                return e.Browser.onAndroid || -1 == t.iosFilterAppIds.indexOf(s.appid);
            }), this.adData.length < this.showNum) for (;this.adData.length < this.showNum; ) this.adData.push(this.adData[Math.floor(Math.random() * this.adData.length)]); else if (this.adData.length > this.showNum) for (;this.adData.length > this.showNum; ) {
                var i = this.adData.splice(Math.floor(Math.random() * this.adData.length), 1);
                this.unData.push(i[0]);
            }
            for (var a = 0; a < this.showNum; a++) {
                var n = this.adData[a];
                if (n) {
                    var r = this.owner.getChildByName("ad_" + a);
                    if (r) {
                        var h = r.getChildByName("icon");
                        h && h.loadImage(n.app_icon, null);
                        var o = r.getChildByName("name");
                        o && (o.text = n.app_title);
                        var l = r.getChildByName("titleBg");
                        l && (l.index = Math.floor(l.clipY * Math.random()));
                        var d = r.getChildByName("tag");
                        d && (a < 2 ? (d.visible = !0, d.index = Math.floor(d.clipY * Math.random())) : d.visible = !1), 
                        r.on(e.Event.CLICK, this, this.onBoxClick, [ a ]);
                    }
                }
            }
        }
        onBoxClick(t) {
            if (this.isClick && (zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData[t], s.user_id, function() {
                e.stage.event(n.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                e.stage.event(n.EVENT_NAVIGATE_FAILED), zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_reminder_switch && e.Scene.open("view/ad/ChallengePage.scene", !1);
            }, function() {}), this.unData.length > 0)) {
                var i = this.unData.splice(Math.floor(Math.random() * this.unData.length), 1);
                this.unData.push(this.adData.splice(t, 1, i[0])[0]);
                var a = this.owner.getChildByName("ad_" + t), r = this.adData[t];
                if (!r) return;
                if (a) {
                    var h = a.getChildByName("icon");
                    h && h.loadImage(r.app_icon, null);
                    var o = a.getChildByName("name");
                    o && (o.text = r.app_title);
                    var l = a.getChildByName("titleBg");
                    l && (l.index = Math.floor(l.clipY * Math.random()));
                    var d = a.getChildByName("tag");
                    d && (t < 2 ? (d.visible = !0, d.index = Math.floor(d.clipY * Math.random())) : d.visible = !1);
                }
            }
        }
    }
    e.ILaya.regClass(C), e.ClassUtils.regClass("zs.laya.platform.ExportLeftFlyBox", C), 
    e.ClassUtils.regClass("Zhise.ExportLeftFlyBox", C);
    class A extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.adList = null, this.closeBtn = null;
        }
        onAwake() {
            super.onAwake();
            var t, s = this.owner.getChildByName("topUI");
            s && (t = s.getChildByName("adList"), this.closeBtn = s.getChildByName("closeBtn"));
            var i = this.owner.getChildByName("middleUI");
            i && (t = t || i.getChildByName("adList"), this.closeBtn = this.closeBtn || i.getChildByName("closeBtn"));
            var a = this.owner.getChildByName("bottomUI");
            a && (this.closeBtn = this.closeBtn || a.getChildByName("closeBtn")), this.adList = t.addComponent(n), 
            this.closeBtn.on(e.Event.CLICK, this, this.closeView);
        }
        onDestroy() {
            this.closeBtn.off(e.Event.CLICK, this, this.closeView);
        }
        onStart() {
            var t = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf(".")), e = s.platformCfg.exportGameCfg[t], i = s.platformCfg;
            this.adList.requestAdData(e ? e[0].adType : "promotion", !1, n.SCROLL_NONE, i.iosFilterAppIds, 9);
        }
        closeView() {
            e.SoundManager.playSound(s.soundClick), s.currentView = "", this.owner.close();
        }
    }
    e.ILaya.regClass(A), e.ClassUtils.regClass("zs.laya.platform.HomeFloatAdView", A), 
    e.ClassUtils.regClass("Zhise.HomeFloatAdView", A);
    class v extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.headAdList = null, this.mainAdList = null, this.closeBtn = null, this.fakeExitBtn = null, 
            this.firstClick = !1, this.isOpenBanner = !1, this.aniFinger = null;
        }
        onAwake() {
            super.onAwake();
            var t, i, a = this.owner.getChildByName("topUI");
            a && (t = a.getChildByName("headAdList"), i = a.getChildByName("mainAdList"), this.closeBtn = a.getChildByName("closeBtn"), 
            this.continueBtn = a.getChildByName("continueBtn"), this.fakeExitBtn = a.getChildByName("fakeExitBtn"), 
            this.aniFinger = a.getChildByName("aniFinger"));
            var r = this.owner.getChildByName("middleUI");
            r && (t = t || r.getChildByName("headAdList"), i = i || r.getChildByName("mainAdList"), 
            this.closeBtn = this.closeBtn || r.getChildByName("closeBtn"), this.continueBtn = this.continueBtn || r.getChildByName("continueBtn"), 
            this.fakeExitBtn = this.fakeExitBtn || r.getChildByName("fakeExitBtn"));
            var h = this.owner.getChildByName("bottomUI");
            h && (this.continueBtn = this.continueBtn || h.getChildByName("continueBtn")), t && (this.headAdList = t.addComponent(n)), 
            i && (this.mainAdList = i.addComponent(n)), this.closeBtn && this.closeBtn.on(e.Event.CLICK, this, this.closeView), 
            this.fakeExitBtn && this.fakeExitBtn.on(e.Event.CLICK, this, this.onOpenListAd), 
            this.continueBtn && this.continueBtn.once(e.Event.CLICK, this, this.onContinue), 
            e.stage.on(s.APP_HIDE, this, this.onAppHide), e.stage.on(s.APP_SHOW, this, this.onAppShow);
        }
        onDestroy() {
            this.closeBtn && this.closeBtn.off(e.Event.CLICK, this, this.closeView), this.fakeExitBtn && this.fakeExitBtn.off(e.Event.CLICK, this, this.onOpenListAd), 
            this.continueBtn && this.continueBtn.off(e.Event.CLICK, this, this.onContinue), 
            this.continueBtn && this.continueBtn.off(e.Event.CLICK, this, this.closeView), e.stage.off(s.APP_HIDE, this, this.onAppHide), 
            e.stage.off(s.APP_SHOW, this, this.onAppShow);
        }
        onEnable() {
            super.onEnable();
            var t = s.platformCfg.bannerCfg;
            if (t) {
                var e = t[this.viewName];
                if (e) {
                    var i = e.showData;
                    if (i) {
                        if (i.sign || 0 == i.sign || 0 == i.sign) {
                            var a = zs.laya.banner.WxBannerMgr.Instance.adUnitIdData.length;
                            this.bannerGroup = zs.laya.banner.WxBannerMgr.Instance.getBannerGroup(a <= 1 ? 0 : i.sign), 
                            this.bannerGroup && this.bannerGroup.hide();
                        }
                        var n = i.moveType;
                        1 == n && (this.bannerMoveType = n);
                    } else console.error("==============initBannerGroup===============", e.showData);
                }
            }
        }
        onStart() {
            super.onStart(), this.isOpenBanner = !1, this.firstClick = !1;
            var t = s.platformCfg.exportGameCfg[this.viewName], i = t ? t[0].adType : "promotion", r = s.platformCfg;
            this.headAdList && this.headAdList.requestAdData(i, !0, n.SCROLL_HORIZONTAL, r.iosFilterAppIds, null, !1, !1, !0), 
            this.mainAdList && this.mainAdList.requestAdData(i, !0, n.SCROLL_VERTICAL, r.iosFilterAppIds, null, !0, !1, !0), 
            e.timer.once(400, this, function() {
                if (this.mainAdList && this.mainAdList.adData.length && a.zs_switch && a.zs_auto_jump_switch) {
                    let t = Math.floor(Math.random() * this.mainAdList.adData.length);
                    this.mainAdList.onSelectAd(t);
                }
            }), this.showFingerEff();
        }
        onAppShow() {
            this.isOpenBanner && this.bannerGroup && this.bannerGroup.hide();
        }
        onAppHide() {
            this.isOpenBanner = !0;
        }
        onContinue() {
            if (a.zs_switch) {
                if (!this.firstClick) {
                    this.firstClick = !0;
                    var t = this;
                    setTimeout(function() {
                        t.bannerGroup && t.bannerGroup.updateBottonTouch(), t.bannerGroup && t.bannerGroup.show();
                    }, 500), setTimeout(function() {
                        t.bannerGroup && t.bannerGroup.hide(), t.continueBtn && t.continueBtn.on(e.Event.CLICK, t, t.closeView);
                    }, 1e3);
                }
            } else this.closeView();
        }
        closeView() {
            e.SoundManager.playSound(s.soundClick), s.currentView = "", this.owner.close();
        }
        onOpenListAd() {
            e.SoundManager.playSound(s.soundClick), s.showListAd();
        }
        showFingerEff() {
            if (this.aniFinger) {
                this.aniFinger.visible = !0, this.aniFinger.play();
                var t = Math.random() * e.stage.width / 2 + e.stage.width / 4, s = Math.random() * e.stage.height / 2 + e.stage.height / 4;
                this.aniFinger.pos(t, s), e.timer.once(4e3, this, this.showFingerEff);
            }
        }
    }
    e.ILaya.regClass(v), e.ClassUtils.regClass("zs.laya.platform.FullScreeAdView", v), 
    e.ClassUtils.regClass("Zhise.FullScreeAdView", v);
    class E extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.headAdList = null, this.mainAdList = null, this.closeBtn = null, this.fakeExitBtn = null, 
            this.firstClick = !1, this.isOpenBanner = !1, this.dragSleep = 5e3, this.scrollSpeed = 1, 
            this.waitTime = 1e3, this.inAutoScroll = !1, this.changeValue = 0, this.unitValue = 0, 
            this.isEnd = !1, this.head = null, this.main = null, this.aniFinger = null;
        }
        onAwake() {
            super.onAwake();
            var t = this.owner.getChildByName("topUI");
            t && (this.headAdList = t.getChildByName("headAdList"), this.mainAdList = t.getChildByName("mainAdList"), 
            this.closeBtn = t.getChildByName("closeBtn"), this.continueBtn = t.getChildByName("continueBtn"), 
            this.fakeExitBtn = t.getChildByName("fakeExitBtn"), this.aniFinger = t.getChildByName("aniFinger"));
            var s = this.owner.getChildByName("bottomUI");
            s && (this.headAdList = this.headAdList || s.getChildByName("headAdList"), this.mainAdList = this.mainAdList || s.getChildByName("mainAdList"), 
            this.closeBtn = this.closeBtn || s.getChildByName("closeBtn"), this.continueBtn = this.continueBtn || s.getChildByName("continueBtn"), 
            this.fakeExitBtn = this.fakeExitBtn || s.getChildByName("fakeExitBtn")), this.closeBtn && this.closeBtn.on(e.Event.CLICK, this, this.closeView), 
            this.fakeExitBtn && this.fakeExitBtn.on(e.Event.CLICK, this, this.onOpenListAd), 
            this.continueBtn && this.continueBtn.on(e.Event.CLICK, this, this.onContinue), this.headAdList.renderHandler = e.Handler.create(this, this.onItemRender, [ this.headAdList ], !1), 
            this.mainAdList.renderHandler = e.Handler.create(this, this.onItemRender, [ this.mainAdList ], !1), 
            this.headAdList.mouseEnabled = !0, this.mainAdList.mouseEnabled = !0, this.headAdList.mouseHandler = e.Handler.create(this, this.onSelectAd, [ this.headAdList ], !1), 
            this.mainAdList.mouseHandler = e.Handler.create(this, this.onSelectAd, [ this.mainAdList ], !1), 
            this.mainAdList.vScrollBarSkin = "";
        }
        initData() {
            var t = this;
            zs.laya.sdk.ZSReportSdk.loadAd(function(e) {
                t.adData = e[t.adType.toString()], t.allData = {};
                for (let e = 0; e < t.adData.length; e++) t.allData[t.adData[e].app_title] || (t.allData[t.adData[e].app_title] = []), 
                t.allData[t.adData[e].app_title].push(t.adData[e]);
                t.freshAdList();
            });
        }
        checkChange(t, s) {
            var i = s.array[t], a = i.app_title, n = e.LocalStorage.getItem("CheckDatas");
            try {
                (n = JSON.parse(n)) || (n = {});
            } catch (t) {
                n = {};
            }
            !this.allData[a] || this.allData[a].length <= 1 || (n[a] || (n[a] = {
                cur: 0
            }), n[a].cur++, i = this.allData[a][n[a].cur % this.allData[a].length], s.setItem(t, i), 
            e.LocalStorage.setItem("CheckDatas", JSON.stringify(n)));
        }
        checkData() {
            var t = e.LocalStorage.getItem("CheckDatas");
            try {
                (t = JSON.parse(t)) || (t = {});
            } catch (e) {
                t = {};
            }
            for (let e = 0; e < this.adData.length; e++) t[this.adData[e].app_title] || (t[this.adData[e].app_title] = {
                cur: 0
            });
            this.adData = [];
            for (let e in t) this.allData[e] && this.adData.push(this.allData[e][t[e].cur % this.allData[e].length]);
        }
        freshAdList() {
            this.checkData(), this.initRankData();
            for (var t = [], s = 0; s < 3; s++) this.adData[s] && t.push(this.adData[s]);
            this.headAdList.array = t;
            var i = [];
            if (this.adData.length > 3) for (s = 3; s < this.adData.length; s++) i.push(this.adData[s]);
            this.mainAdList.array = i;
            var a, n = this.mainAdList.getCell(0);
            n && (a = Math.ceil(this.mainAdList.array.length / this.mainAdList.repeatY), this.unitValue = (n.width + this.mainAdList.spaceX) / (a * n.width + this.mainAdList.spaceX * (a - 1) - this.mainAdList.width) * this.mainAdList.scrollBar.max, 
            console.log("单元value" + this.unitValue), e.stage.frameOnce(1, this, this.startAutoScrollAd));
        }
        initRankData() {
            for (var t = 0, e = 0; e < this.adData.length; e++) {
                if ((t = Math.floor(Math.random() * this.adData.length)) == e) continue;
                let s = this.adData[e];
                this.adData[e] = this.adData[t], this.adData[t] = s;
            }
            let s = 180;
            for (e = 0; e < this.adData.length; e++) this.adData[e].rank = e + 1, this.adData[e].rank = 1 == this.adData[e].rank ? 2 : 2 == this.adData[e].rank ? 1 : this.adData[e].rank, 
            t = s * (.6 + .4 * Math.random()), s = t += (s - t) * Math.random() * .3, t = t > 10 ? 10 * Math.floor(t / 10) + "万" : t > 1 ? Math.floor(t) + "万" : 1e3 * Math.floor(10 * t), 
            0 == e && this.adData[1] ? this.adData[1].playerNum = t : 1 == e ? this.adData[0].playerNum = t : this.adData[e].playerNum = t, 
            console.log("rank随机用户数量" + t);
        }
        onDestroy() {
            this.closeBtn && this.closeBtn.off(e.Event.CLICK, this, this.closeView), this.fakeExitBtn && this.fakeExitBtn.off(e.Event.CLICK, this, this.onOpenListAd), 
            this.continueBtn && this.continueBtn.off(e.Event.CLICK, this, this.onContinue);
        }
        onEnable() {
            super.onEnable();
        }
        onStart() {
            super.onStart(), this.isOpenBanner = !1, this.firstClick = !1, this.continueBtn.visible = !1, 
            this.continueBtn.mouseEnabled = !1;
            var t = s.platformCfg.exportGameCfg[this.viewName];
            this.adType = t ? t[0].adType : "promotion";
            let i = this;
            this.initData(), a.zs_switch && a.zs_auto_jump_switch && a.zs_banner_vertical_enable ? e.timer.once(500, this, function() {
                if (this.mainAdList && this.mainAdList.array && this.mainAdList.array.length) {
                    let t = Math.floor(Math.random() * this.mainAdList.array.length);
                    i.onSelectAd(i.mainAdList, {
                        type: e.Event.MOUSE_DOWN
                    }, t), e.stage.once(zs.laya.platform.PlatformMgr.APP_JUMP_CANCEL, i, i.showBtn), 
                    e.timer.once(3e3, i, i.showBtn);
                } else i.showBtn();
            }) : i.showBtn(), this.showFingerEff();
        }
        showBtn() {
            this.continueBtn.visible = !0;
            var t = this;
            e.timer.clear(t, t.showBtn), e.stage.off(zs.laya.platform.PlatformMgr.APP_JUMP_CANCEL, t, t.showBtn), 
            a.zs_banner_vertical_enable && a.zs_switch ? e.Tween.from(this.continueBtn, {
                alpha: .3
            }, 800, null, e.Handler.create(t, function() {
                e.timer.once(zs.laya.platform.ADConfig.zs_banner_banner_time, t, function() {
                    zs.laya.banner.WxBannerMgr.Instance.showBanner();
                }), e.timer.once(zs.laya.platform.ADConfig.zs_banner_text_time, t, function() {
                    e.Tween.to(t.continueBtn, {
                        y: t.continueBtn.y - 280
                    }, zs.laya.platform.ADConfig.zs_banner_move_time, null, e.Handler.create(t, function() {
                        t.continueBtn.mouseEnabled = !0;
                    }));
                });
            })) : this.continueBtn.mouseEnabled = !0;
        }
        onAppShow() {
            this.isOpenBanner && this.bannerGroup && this.bannerGroup.hide();
        }
        onAppHide() {
            this.isOpenBanner = !0;
        }
        startAutoScrollAd() {
            this.mainAdList && (this.inAutoScroll = !0);
        }
        onItemRender(t, e, s) {
            if (t) {
                var i = t.array[s];
                if (i) {
                    if (a = e.getChildByName("icon")) a.skin = i.app_icon; else {
                        var a, n = e.getChildByName("iconBox");
                        if (n) (a = n.getChildByName("icon")) && (a.skin = i.app_icon);
                    }
                    var r = e.getChildByName("name");
                    r && (r.text = i.app_title);
                    var h = e.getChildByName("desc");
                    h && (h.text = i.app_desc);
                    var o = e.getChildByName("titleBg");
                    o && (o.index = Math.floor(o.clipY * Math.random()));
                    var l = e.getChildByName("playerNum");
                    l && i.playerNum && (l.text = i.playerNum + "人正在玩");
                    var d = e.getChildByName("rank");
                    d && i.rank && (d.text = i.rank);
                    var c = e.getChildByName("rankImg");
                    c && i.rank && (c.skin = "ad/img_Corner_" + i.rank + ".png");
                    var u = e.getChildByName("rankBg");
                    u && i.rank && (u.skin = "ad/img_rankBg_" + i.rank + ".png", 1 == i.rank && (e.y -= 68));
                } else e.visible = !1;
            }
        }
        onSelectAd(t, i, a) {
            if (i.type == e.Event.MOUSE_DOWN && null != a && -1 != a && t && t.array) {
                var r = t.array[a], h = this;
                h.isDataUpdate = !0, console.log("点击了"), zs.laya.sdk.ZSReportSdk.navigate2Mini(r, s.user_id, function() {
                    e.stage.event(n.EVENT_NAVIGATE_SUCCESS);
                }, function() {
                    e.stage.event(n.EVENT_NAVIGATE_FAILED);
                }, function() {
                    e.stage.event(n.EVENT_NAVIGATE_COMPLETED), h.checkChange(a, t);
                });
            }
        }
        onUpdate() {
            if (1 == this.inAutoScroll && this.mainAdList && this.mainAdList.scrollBar && this.mainAdList.scrollBar.max) {
                if (this.mainAdList.scrollBar.value >= this.mainAdList.scrollBar.max ? (this.mainAdList.scrollBar.value = this.mainAdList.scrollBar.max, 
                this.scrollSpeed = 0 - this.scrollSpeed, this.isEnd = !0) : this.mainAdList.scrollBar.value <= 0 && (this.mainAdList.scrollBar.value = 0, 
                this.scrollSpeed = 0 - this.scrollSpeed, this.isEnd = !0), this.mainAdList.scrollBar.value += this.scrollSpeed, 
                !this.unitValue) return;
                this.isEnd = this.isEnd && 0 != this.changeValue, this.changeValue += Math.abs(this.scrollSpeed), 
                (this.changeValue >= this.unitValue || this.isEnd) && (this.autoScroll = !1, this.isEnd = !1, 
                this.changeValue = 0, e.timer.once(this.waitTime, this, function() {
                    this.autoScroll = !0;
                }));
            }
            this.autoScroll && 0 == this.inAutoScroll && (this.passedTime += e.timer.delta, 
            this.passedTime > this.dragSleep && this.startAutoScrollAd());
        }
        onContinue() {
            if (!a.zs_switch || this.firstClick) this.closeView(); else if (this.firstClick = !0, 
            this.bannerGroup) {
                var t = this;
                setTimeout(function() {
                    t.bannerGroup.updateBottonTouch(), t.bannerGroup.show();
                }, 500), setTimeout(function() {
                    t.bannerGroup.hide(), t.continueBtn && t.continueBtn.on(e.Event.CLICK, t, t.closeView);
                }, 1e3);
            }
        }
        closeView() {
            e.SoundManager.playSound(s.soundClick), s.currentView = "", this.owner.close(), 
            e.stage.event("closeFullAdRank");
        }
        showFingerEff() {
            if (this.aniFinger) {
                this.aniFinger.visible = !0, this.aniFinger.play();
                var t = Math.random() * e.stage.width / 2 + e.stage.width / 4, s = Math.random() * e.stage.height / 2 + e.stage.height / 4;
                this.aniFinger.pos(t, s), e.timer.once(4e3, this, this.showFingerEff);
            }
        }
    }
    class S extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.headAdList = null, this.mainAdList = null, this.closeBtn = null, this.fakeExitBtn = null, 
            this.firstClick = !1, this.isOpenBanner = !1, this.autoScroll = !0, this.inAutoScroll = !1, 
            this.scrollSpeed = 1, this.isEnd = !1, this.passedTime = 0, this.dragSleep = 5e3, 
            this.scrollBar = null, this.list = null, this.aniFinger = null;
        }
        onAwake() {
            super.onAwake();
            var t, i, a, r = this.owner.getChildByName("topUI");
            r && (r.vScrollBarSkin = "", this.list = r, this.scrollBar = r.vScrollBar, t = r.getChildByName("headAdList"), 
            i = r.getChildByName("mainAdList"), a = r.getChildByName("RecentPlayList"), this.closeBtn = r.getChildByName("closeBtn"), 
            this.continueBtn = r.getChildByName("continueBtn"), this.fakeExitBtn = r.getChildByName("fakeExitBtn"), 
            this.aniFinger = r.getChildByName("aniFinger"));
            var h = this.owner.getChildByName("middleUI");
            h && (t = t || h.getChildByName("headAdList"), i = i || h.getChildByName("mainAdList"), 
            this.closeBtn = this.closeBtn || h.getChildByName("closeBtn"), this.continueBtn = this.continueBtn || h.getChildByName("continueBtn"), 
            this.fakeExitBtn = this.fakeExitBtn || h.getChildByName("fakeExitBtn"));
            var o = this.owner.getChildByName("bottomUI");
            o && (this.continueBtn = this.continueBtn || o.getChildByName("continueBtn")), t && (this.headAdList = t.addComponent(n)), 
            i && (this.mainAdList = i.addComponent(n)), a && (this.recentPlay = a.addComponent(n)), 
            this.closeBtn && this.closeBtn.on(e.Event.CLICK, this, this.closeView), this.fakeExitBtn && this.fakeExitBtn.on(e.Event.CLICK, this, this.onOpenListAd), 
            this.continueBtn && this.continueBtn.once(e.Event.CLICK, this, this.onContinue), 
            this.list.on(e.Event.MOUSE_UP, this, this.onDragStateChanged, [ 0 ]), this.list.on(e.Event.MOUSE_OUT, this, this.onDragStateChanged, [ 0 ]), 
            this.list.on(e.Event.MOUSE_DOWN, this, this.onDragStateChanged, [ 1 ]), e.stage.on(s.APP_HIDE, this, this.onAppHide), 
            e.stage.on(s.APP_SHOW, this, this.onAppShow);
        }
        onDestroy() {
            this.closeBtn && this.closeBtn.off(e.Event.CLICK, this, this.closeView), this.fakeExitBtn && this.fakeExitBtn.off(e.Event.CLICK, this, this.onOpenListAd), 
            this.continueBtn && this.continueBtn.off(e.Event.CLICK, this, this.onContinue), 
            this.continueBtn && this.continueBtn.off(e.Event.CLICK, this, this.closeView), e.stage.off(s.APP_HIDE, this, this.onAppHide), 
            e.stage.off(s.APP_SHOW, this, this.onAppShow), this.list.off(e.Event.MOUSE_UP, this, this.onDragStateChanged), 
            this.list.off(e.Event.MOUSE_OUT, this, this.onDragStateChanged), this.list.off(e.Event.MOUSE_DOWN, this, this.onDragStateChanged);
        }
        onDragStateChanged(t) {
            this.inAutoScroll = !1, this.autoScroll && 0 == t && (this.passedTime = 0);
        }
        onEnable() {
            super.onEnable();
        }
        onStart() {
            super.onStart(), this.isOpenBanner = !1, this.firstClick = !1;
            var t = s.platformCfg.exportGameCfg[this.viewName], i = t ? t[0].adType : "promotion", r = s.platformCfg;
            this.headAdList && this.headAdList.requestAdData(i, !0, n.SCROLL_HORIZONTAL, r.iosFilterAppIds, null, !1, !1, !0), 
            this.mainAdList && (this.mainAdList.setFixHeight(!0), this.mainAdList.requestAdData(i, !1, n.SCROLL_VERTICAL, r.iosFilterAppIds, null, !0, !1, !0), 
            e.timer.once(3e3, this, this.startAutoScrollAd)), this.recentPlay && this.recentPlay.requestAdData(i, !0, n.SCROLL_NONE, r.iosFilterAppIds, null, !1, !1, !0), 
            e.timer.once(400, this, function() {
                if (this.mainAdList && this.mainAdList.adData.length && a.zs_switch && a.zs_auto_jump_switch) {
                    let t = Math.floor(Math.random() * this.mainAdList.adData.length);
                    this.mainAdList.onSelectAd(t);
                }
            }), this.showFingerEff();
        }
        showFingerEff() {
            this.aniFinger.visible = !0, this.aniFinger.play();
            var t = Math.random() * e.stage.width / 2 + e.stage.width / 4, s = Math.random() * e.stage.height / 2 + e.stage.height / 4;
            s += this.scrollBar.value, this.aniFinger.pos(t, s), e.timer.once(4e3, this, this.showFingerEff);
        }
        onAppShow() {
            this.isOpenBanner && this.bannerGroup && this.bannerGroup.hide();
        }
        onAppHide() {
            this.isOpenBanner = !0;
        }
        onContinue() {
            if (a.zs_switch) {
                if (!this.firstClick) {
                    this.firstClick = !0;
                    var t = this, s = zs.laya.banner.WxBannerMgr.Instance;
                    let a = Math.floor(800 * Math.random() + 800);
                    setTimeout(function() {
                        s.showBanner();
                    }, a);
                    var i = zs.laya.platform.ADConfig.zs_full_screen_banner_time ? 1e3 * zs.laya.platform.ADConfig.zs_full_screen_banner_time : 0;
                    return void setTimeout(function() {
                        s.hideAll(), t.continueBtn.on(e.Event.CLICK, t, t.closeView);
                    }, a + Math.max(2e3, i) + 500);
                }
            } else this.closeView();
        }
        closeView() {
            e.SoundManager.playSound(s.soundClick), s.currentView = "", this.owner.close(), 
            e.stage.event("closeFullAdJump");
        }
        onOpenListAd() {
            e.SoundManager.playSound(s.soundClick), s.showListAd();
        }
        startAutoScrollAd() {
            this.mainAdList && (this.inAutoScroll = !0);
        }
        onUpdate() {
            var t = this.scrollBar;
            if (this.autoScroll && 1 == this.inAutoScroll && this.mainAdList && t && t.max) {
                if (t.value >= t.max ? (t.value = t.max, this.scrollSpeed = 0 - this.scrollSpeed, 
                this.isEnd = !0) : t.value <= 0 && (t.value = 0, this.scrollSpeed = 0 - this.scrollSpeed, 
                this.isEnd = !0), t.value += this.scrollSpeed, !this.unitValue || !this.isClockPendulum) return;
                this.isEnd = this.isEnd && 0 != this.changeValue, this.changeValue += Math.abs(this.scrollSpeed), 
                (this.changeValue >= this.unitValue || this.isEnd) && (this.autoScroll = !1, this.isEnd = !1, 
                this.changeValue = 0, e.timer.once(this.waitTime, this, function() {
                    this.autoScroll = !0;
                }));
            }
            this.autoScroll && 0 == this.inAutoScroll && (this.passedTime += e.timer.delta, 
            this.passedTime > this.dragSleep && this.startAutoScrollAd());
        }
    }
    class y extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.adList = null, this.closeBtn = null;
        }
        onAwake() {
            super.onAwake();
            var t = this.owner.getChildByName("topUI");
            this.adList = t.getChildByName("adList").addComponent(n), this.closeBtn = t.getChildByName("topFrame").getChildByName("closeBtn"), 
            this.closeBtn.on(e.Event.CLICK, this, this.closeView);
            var s = this.owner.getChildByName("bottomUI").getChildByName("bottomImg");
            if (s) {
                var i = s.getChildByName("backHomeBtn");
                i && i.on(e.Event.CLICK, this, this.closeView);
                var a = s.getChildByName("continueBtn");
                a && a.on(e.Event.CLICK, this, this.closeView);
            }
        }
        onDestroy() {
            this.closeBtn.off(e.Event.CLICK, this, this.closeView);
        }
        onStart() {
            var t = s.platformCfg.exportGameCfg[this.viewName], e = s.platformCfg;
            this.adList.requestAdData(t ? t[0].adType : "promotion", !1, n.SCROLL_VERTICAL, e.iosFilterAppIds, null, !0);
        }
        closeView() {
            e.SoundManager.playSound(s.soundClick), s.currentView = "", this.owner.close();
        }
    }
    e.ILaya.regClass(y), e.ClassUtils.regClass("zs.laya.platform.ListAdView", y), e.ClassUtils.regClass("Zhise.ListAdView", y);
    class I extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake(), this.initData();
            var t = this.owner.getChildByName("bottomUI");
            t && (this.btn_repair = t.getChildByName("eggBtn"));
            var i = this.owner.getChildByName("middleUI");
            this.eggUI = i.getChildByName("eggUI"), this.eggUI && (this.btn_repair || (this.btn_repair = this.eggUI.getChildByName("eggBtn")), 
            this.progressBar = this.eggUI.getChildByName("loading_1"), this.progressWidth = this.progressBar.bitmap.width, 
            this.progressHeight = this.progressBar.bitmap.height), this.bannerMoveType = 0, 
            this.initCfg(), e.stage.on(s.APP_HIDE, this, this.onAppHide), e.stage.on(s.APP_SHOW, this, this.onAppShow), 
            this.btn_repair && (this.btn_repair.on(e.Event.MOUSE_DOWN, this, this.onTouchStart), 
            this.btn_repair.on(e.Event.MOUSE_UP, this, this.clickHammer)), this.hammerAni = this.owner.knockAni;
        }
        initCfg() {
            this.knockEggCfg = e.loader.getRes("config/KnockEggCfg.json"), this.awardDelay = 1e3, 
            this.closeDelay = 1e3, this.knockEggCfg && (i.IsNumber(this.knockEggCfg.awardDelay) && (this.awardDelay = Number(this.knockEggCfg.awardDelay)), 
            i.IsNumber(this.knockEggCfg.closeDelay) && (this.closeDelay = Number(this.knockEggCfg.closeDelay)));
        }
        isShowAward() {
            return this.knockEggCfg && this.knockEggCfg.isShowAward;
        }
        onTouchStart(t) {
            this.lastMouseX = e.stage.mouseX, this.lastMouseY = e.stage.mouseY;
        }
        initData() {
            this.btn_repair = null, this.progressBar = null, this.hammerAni = null, this.egg = null, 
            this.touchNode = null, this.repairProgress = 0, this.click_add_percent = .14, this.isOpenAd = !1, 
            this.repair_click_num = [ .3, .7 ], this.showBannerRange = 1, this.isGetAward = !1, 
            this.callback = null, this.recordMax = 0, this.recordTable = {};
        }
        onEnable() {
            super.onEnable(), this.initRepair();
        }
        onDisable() {
            super.onDisable();
        }
        onDestroy() {
            this.removeEvent(), super.onDestroy();
        }
        removeEvent() {
            e.timer.clear(this, this.cutBack), e.stage.off(s.APP_HIDE, this, this.onAppHide), 
            e.stage.off(s.APP_SHOW, this, this.onAppShow), this.btn_repair && (this.btn_repair.off(e.Event.MOUSE_DOWN, this, this.onTouchStart), 
            this.btn_repair.off(e.Event.MOUSE_UP, this, this.clickHammer));
        }
        onAppHide() {
            this.isOpenAd && (this.btn_repair && (this.btn_repair.off(e.Event.MOUSE_DOWN, this, this.onTouchStart), 
            this.btn_repair.off(e.Event.MOUSE_UP, this, this.clickHammer)), this.isOpenAd = !0, 
            e.timer.clear(this, this.resetIsOpenAd), e.timer.clear(this, this.cutBack), this.isShowAward() || this.onFinish());
        }
        initBannerGroup() {
            var t = s.platformCfg.bannerCfg;
            if (t) {
                var e = t[this.viewName];
                if (e) {
                    var i = e.showData;
                    if (i) {
                        if (i.sign || 0 == i.sign || 0 == i.sign) {
                            var a = zs.laya.banner.WxBannerMgr.Instance.adUnitIdData.length;
                            this.bannerGroup = zs.laya.banner.WxBannerMgr.Instance.getBannerGroup(a <= 1 ? 0 : i.sign), 
                            this.bannerGroup && this.bannerGroup.hide();
                        }
                        var n = i.moveType;
                        1 == n && (this.bannerMoveType = n);
                    } else console.error("==============initBannerGroup===============", e.showData);
                }
            }
        }
        onAppShow() {
            this.isOpenAd && (this.bannerGroup && this.bannerGroup.hide(), this.isShowAward() && this.onFinish());
        }
        initRepair() {
            this.isGetAward = !1, e.timer.loop(20, this, this.cutBack), a.zs_click_award_percent.indexOf("[") >= 0 ? this.repair_click_num = JSON.parse(a.zs_click_award_percent) : this.repair_click_num = a.zs_click_award_percent.split(","), 
            this.click_add_percent = a.zs_click_award_add, this.zs_click_award_back = a.zs_click_award_back, 
            this.click_add_percent = .01 * i.random(.9 * this.click_add_percent * 100, 1.1 * this.click_add_percent * 100), 
            console.log("===============repair_click_num=====================", this.repair_click_num), 
            this.showBannerRange = .01 * i.random(100 * Number(this.repair_click_num[0]), 100 * Number(this.repair_click_num[1]));
        }
        setCloseCallback(t) {
            this.callback = t;
        }
        clickHammer() {
            if (this.repairProgress + this.click_add_percent <= 1) {
                if (this.updateRepairPorgress(this.repairProgress + this.click_add_percent), this.hammerAni && this.hammerAni.play(0, !1), 
                this.repairProgress >= this.showBannerRange && !this.isOpenAd) {
                    switch (this.isOpenAd = !0, this.bannerMoveType) {
                      case 1:
                        this.bannerGroup && this.bannerGroup.updateY(this.lastMouseY);
                        break;

                      default:
                        this.bannerGroup && this.bannerGroup.updateBottonTouch();
                    }
                    zs.laya.banner.WxBannerMgr.Instance.showBanner(), e.timer.once(500, this, function() {
                        e.Tween.to(this.btn_repair, {
                            bottom: 312
                        }, 500);
                    });
                }
            } else this.updateRepairPorgress(this.repairProgress + this.click_add_percent), 
            this.bannerGroup && this.bannerGroup.hide(), e.timer.clear(this, this.cutBack), 
            e.timer.clear(this, this.resetIsOpenAd), this.onFinish();
        }
        resetIsOpenAd() {
            this.isOpenAd = !1;
        }
        onFinish() {
            if (!this.isGetAward) {
                var t = e.LocalStorage.getItem(window.zs.wx.appId + "open_award_num") || 0;
                e.LocalStorage.setItem(window.zs.wx.appId + "open_award_num", Number(t) + 1), this.isGetAward = !0, 
                e.timer.once(this.awardDelay, this, function() {
                    e.stage.event(s.EGG_GET_AWARD);
                }), e.timer.once(Math.max(this.closeDelay, this.awardDelay + 40), this, this.onClose);
            }
        }
        onClose() {
            console.log("====================关闭金蛋=================="), this.callback && this.callback(), 
            this.bannerGroup && this.bannerGroup.hide(), s.currentView = "", this.owner.close();
        }
        updateRepairPorgress(t) {
            this.repairProgress = Math.min(1, Math.max(0, t)), this.progressWidth < this.progressHeight ? this.progressBar && (this.progressBar.height = this.progressBar.clipHeight = Math.max(1, this.progressHeight * this.repairProgress)) : this.progressBar && (this.progressBar.width = Math.max(1, this.progressWidth * this.repairProgress)), 
            "KnockEggEnd" == this.viewName && (this.recordMax = Math.max(this.recordMax, this.repairProgress), 
            this.repairProgress >= .2 && !this.recordTable.one ? (this.recordTable.one = !0, 
            e.stage.event("KnockEggEndClickStep")) : this.repairProgress >= .36 && !this.recordTable.two ? (this.recordTable.two = !0, 
            e.stage.event("KnockEggEndClickStep")) : this.repairProgress >= .52 && !this.recordTable.three ? (this.recordTable.three = !0, 
            e.stage.event("KnockEggEndClickStep")) : this.repairProgress >= .68 && !this.recordTable.four ? (this.recordTable.four = !0, 
            e.stage.event("KnockEggEndClickStep")) : this.repairProgress >= .84 && !this.recordTable.five ? (this.recordTable.five = !0, 
            e.stage.event("KnockEggEndClickStep")) : this.repairProgress >= 1 && !this.recordTable.six && (this.recordTable.six = !0, 
            e.stage.event("KnockEggEndClickStep")));
        }
        cutBack() {
            this.repairProgress -= this.zs_click_award_back, this.updateRepairPorgress(this.repairProgress);
        }
    }
    e.ILaya.regClass(I), e.ClassUtils.regClass("zs.laya.platform.KnockEggView", I), 
    e.ClassUtils.regClass("Zhise.KnockEggView", I);
    class b extends e.Script {
        constructor() {
            super();
        }
        onDestroy() {
            e.stage.off(s.UI_VIEW_OPENED, this, this.hideNative), zs.laya.sdk.SdkService.hideCustomAd();
        }
        onEnable() {
            this.viewName = this.owner.url, this.viewName = this.viewName.substring(this.viewName.lastIndexOf("/") + 1, this.viewName.lastIndexOf("."));
            var t = s.platformCfg.nativeCfg[this.viewName];
            if (t) {
                for (let e = 0; e < t.length; e++) t[e].checkKey && !a[t[e].checkKey] || zs.laya.sdk.SdkService.checkCustomAd(t[e].x, t[e].y, t[e].num);
                e.stage.off(s.UI_VIEW_OPENED, this, this.hideNative), e.stage.once(s.UI_VIEW_OPENED, this, this.hideNative);
            }
        }
        hideNative() {
            zs.laya.sdk.SdkService.hideCustomAd();
        }
    }
    e.ILaya.regClass(b), e.ClassUtils.regClass("zs.laya.platform.NativeAdsCtrl", b), 
    e.ClassUtils.regClass("Zhise.NativeAdsCtrl", b);
    class B extends e.Script {
        constructor() {
            super(), this.gameIcon = null, this.config = null, this.maskViewNum = 0, this.iconReady = !1;
        }
        initView(t) {
            this.config = t, this.maskViewNum = 0, this.iconReady = !1;
            for (var i = e.stage.getChildByName("root"), a = i.numChildren - 1; a >= 0; a--) {
                var n = i.getChildAt(a);
                n.zOrder && n.zOrder > this.owner.zOrder && this.maskViewNum++, console.log("stage:" + n.name);
            }
            e.stage.on(s.UI_VIEW_OPENED, this, this.onViewOpened), e.stage.on(s.UI_VIEW_CLOSED, this, this.onViewClosed);
        }
        onStart() {
            var t = [], e = "undefined" != typeof wx;
            if (0 != e) {
                var s = wx.getSystemInfoSync();
                if (e = i.compareVersion(s.SDKVersion, "2.8.2") >= 0, this.owner.visible = e, 0 != e && (this.updateIconStyle(t, s), 
                0 != t.length && (console.log(t), this.gameIcon = wx.createGameIcon({
                    adUnitId: a.response[this.config.idKey],
                    count: t.length,
                    style: t
                }), this.gameIcon))) {
                    console.log("load gameIcon");
                    var n = this;
                    this.gameIcon.onError(function(t) {
                        console.error(t), n.gameIcon = null;
                    }), this.gameIcon.load(), this.gameIcon.onLoad(function() {
                        console.log("gameIcon loaded"), n.iconReady = !0, 0 == n.maskViewNum && n.owner.visible && n.gameIcon.show();
                    });
                }
            }
        }
        onEnable() {
            this.gameIcon && this.gameIcon.show();
        }
        onDisable() {
            this.gameIcon && this.gameIcon.hide();
        }
        updateIconStyle(t, s) {
            var i = this.owner.getChildByName("container");
            if (null != i) for (var a = 0; a < i.numChildren; a++) {
                const r = i.getChildAt(a);
                r.visible = !1;
                var n = this.owner.localToGlobal(new e.Point(r.x, r.y), !0);
                t.push({
                    appNameHidden: !0,
                    color: "white",
                    borderWidth: 1,
                    borderColor: "white",
                    top: n.y / e.stage.height * s.windowHeight,
                    left: n.x / e.stage.width * s.windowWidth,
                    size: r.width / e.stage.width * s.windowWidth
                });
            }
        }
        releaseView() {
            this.maskViewNum = -1, e.stage.off(s.UI_VIEW_OPENED, this, this.onViewOpened), e.stage.off(s.UI_VIEW_CLOSED, this, this.onViewClosed), 
            this.gameIcon && (this.gameIcon.destroy(), this.gameIcon = null);
        }
        onViewOpened(t, e) {
            e.zOrder > this.owner.zOrder && this.maskViewNum++, 0 != this.maskViewNum && this.gameIcon && this.iconReady && this.gameIcon.hide();
        }
        onViewClosed(t, e) {
            e.zOrder > this.owner.zOrder && this.maskViewNum--, 0 == this.maskViewNum && this.gameIcon && this.iconReady && this.gameIcon.show();
        }
    }
    e.ILaya.regClass(B), e.ClassUtils.regClass("zs.laya.platform.NativeIconAdView", B), 
    e.ClassUtils.regClass("Zhise.NativeIconAdView", B);
    class k extends e.Script {
        constructor() {
            super(), this.gameIcon = null, this.config = null, this.maskViewNum = 0, this.iconReady = !1;
        }
        initView(t) {
            this.config = t, this.maskViewNum = 0, this.iconReady = !1;
            for (var i = e.stage.getChildByName("root"), a = i.numChildren - 1; a >= 0; a--) {
                var n = i.getChildAt(a);
                n.zOrder && n.zOrder > this.owner.zOrder && this.maskViewNum++, console.log("stage:" + n.name);
            }
            e.stage.on(s.UI_VIEW_OPENED, this, this.onViewOpened), e.stage.on(s.UI_VIEW_CLOSED, this, this.onViewClosed);
        }
        onStart() {
            var t = "undefined" != typeof wx;
            if (0 != t) {
                var e = wx.getSystemInfoSync();
                if (t = i.compareVersion(e.SDKVersion, "2.8.0") >= 0, this.owner.visible = t, 0 != t) {
                    var s = this.updateIconStyle(e);
                    if (!this.gameIcon) {
                        if (this.gameIcon = wx.createCustomAd({
                            adUnitId: a.response[this.config.idKey]
                        }), !this.gameIcon) return void console.error("创建原生广告失败");
                        var n = this;
                        this.gameIcon.onError(function(t) {
                            console.error(t), n.gameIcon = null;
                        }), this.gameIcon.onLoad(function() {
                            console.log("gameIcon loaded"), n.iconReady = !0, 0 == n.maskViewNum && n.owner.visible && n.gameIcon.show();
                        });
                    }
                    console.log("宽高", s.left, s.top), this.gameIcon.left = s.left, this.gameIcon.top = s.top;
                }
            }
        }
        onEnable() {
            this.gameIcon && this.gameIcon.show();
        }
        onDisable() {
            console.log("原生广告onDisable"), this.gameIcon && (console.log("原生广告隐藏了"), this.gameIcon.hide());
        }
        updateIconStyle(t) {
            var s = this.owner;
            if (null == s) return;
            const i = s.getChildAt(0);
            i.visible = !1;
            var a = i.localToGlobal(new e.Point(0, 0), !0);
            return console.log("样式：", a), {
                appNameHidden: !0,
                color: "white",
                borderWidth: 1,
                borderColor: "white",
                top: a.y / e.stage.height * t.windowHeight,
                left: a.x / e.stage.width * t.windowWidth
            };
        }
        releaseView() {
            this.maskViewNum = -1, e.stage.off(s.UI_VIEW_OPENED, this, this.onViewOpened), e.stage.off(s.UI_VIEW_CLOSED, this, this.onViewClosed), 
            this.gameIcon && (this.gameIcon.destroy(), this.gameIcon = null);
        }
        onViewOpened(t, e) {
            e.zOrder > this.owner.zOrder && this.maskViewNum++, 0 != this.maskViewNum && this.gameIcon && this.iconReady && this.gameIcon.hide();
        }
        onViewClosed(t, e) {
            e.zOrder > this.owner.zOrder && this.maskViewNum--, 0 == this.maskViewNum && this.gameIcon && this.iconReady && this.gameIcon.show();
        }
    }
    e.ILaya.regClass(k), e.ClassUtils.regClass("zs.laya.platform.NativeGridAdView", k), 
    e.ClassUtils.regClass("Zhise.NativeGridAdView", k);
    class z extends e.Script {
        constructor() {
            super();
        }
        onAwake() {
            if (1 == a.isPublicVersion()) {
                var t = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf(".")), e = s.platformCfg.mistakenlyTouchCfg[t];
                if (e) for (var i = 0; i < e.length; i++) {
                    const t = e[i], s = this.findChildByPath(t.path);
                    var n = s.x, r = s.y;
                    if (a.zs_switch && a.zs_banner_vertical_enable) {
                        var h = t.showType || "move";
                        "move" == h && a.zs_banner_vertical_enable ? (s.mouseEnabled = !1, s.x += t.offsetX, 
                        s.y += t.offsetY, this.owner.timerOnce(a.zs_banner_text_time, this, this.moveBack, [ n, r, a.zs_banner_move_time, s ], !1)) : "delay" == h && a.zs_button_delay_switch ? (s.mouseEnabled = !1, 
                        s.visible = !1, this.owner.timerOnce(a.zs_button_delay_time, this, this.showObj, [ s ], !1)) : a.zs_unmiss_text_time > 0 && (s.mouseEnabled = !1, 
                        s.visible = !1, this.owner.timerOnce(a.zs_unmiss_text_time, this, this.showObj, [ s ], !1));
                    }
                }
            }
        }
        moveBack(t, s, i, a) {
            e.Tween.to(a, {
                x: t,
                y: s
            }, i, null, e.Handler.create(this, this.activeObj, [ a ]));
        }
        activeObj(t) {
            t.mouseEnabled = !0;
        }
        showObj(t) {
            t.visible = !0, t.mouseEnabled = !0;
        }
        findChildByPath(t) {
            for (var e = t.split("/"), s = this.owner, i = 0; i < e.length; i++) s = s.getChildByName(e[i]);
            return s;
        }
    }
    e.ILaya.regClass(z), e.ClassUtils.regClass("zs.laya.platform.MistakenlyTouchCtrl", z), 
    e.ClassUtils.regClass("Zhise.MistakenlyTouchCtrl", z);
    class N extends e.Script {
        onEnable() {
            e.timer.frameOnce(1, this, this.checkBanner);
        }
        checkBanner() {
            this.viewName = this.owner.url, this.viewName = this.viewName.substring(this.viewName.lastIndexOf("/") + 1, this.viewName.lastIndexOf("."));
            var t = s.platformCfg.bannerCfg, e = zs.laya.banner.WxBannerMgr.Instance;
            if (this.owner.on(zs.laya.platform.PlatformMgr.UI_VIEW_OPENED, this, this.clearDelay), 
            e.hideAll(), t) {
                var i = t[this.viewName];
                if (i) {
                    var n = i.showData;
                    if (n) {
                        if (!(!n.checkKey || n.checkKey && a[n.checkKey]) || null != n.checkKey && !a.isPublicVersion()) return void (e.isWait = !0);
                        e.updateBanner(n.isDelay || n.unAutoShow, n.left, n.bottom, n.length), n.isDelay && a.zs_banner_banner_time && (this.delayTime = setTimeout(function() {
                            e.showBanner(n.left, n.bottom, n.length);
                        }, a.zs_banner_banner_time));
                    } else e.isWait = !0;
                } else e.isWait = !0;
            }
        }
        clearDelay() {
            this.delayTime && clearTimeout(this.delayTime);
        }
        onDisable() {
            this.viewName = this.owner.url, this.viewName = this.viewName.substring(this.viewName.lastIndexOf("/") + 1, this.viewName.lastIndexOf("."));
            var t = s.platformCfg.bannerCfg;
            (zs.laya.banner.WxBannerMgr.Instance.hideAll(), t) && (t[this.viewName] && this.delayTime && clearTimeout(this.delayTime));
            e.timer.clearAll(this);
        }
    }
    e.ILaya.regClass(N), e.ClassUtils.regClass("zs.laya.platform.BannerCtrl", N), e.ClassUtils.regClass("Zhise.BannerCtrl", N), 
    t.PlatformMgr = s, t.MathUtils = i, t.ADConfig = a, t.ExportGameCtrl = h, t.NativeAdsCtrl = b, 
    t.MistakenlyTouchCtrl = z, t.BannerCtrl = N, t.AdList = n, t.FullScreeAdView_Rank = E, 
    t.ExportLeftPop = w, t.KnockEggView = I;
}(window.zs.laya.platform = window.zs.laya.platform || {}, Laya);