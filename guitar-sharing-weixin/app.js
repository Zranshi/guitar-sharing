// app.js
import {URL} from "./pages/config/index";

App({
    globalData: {
        imageList: []
    },
    onLaunch(options) {
        let that = this
        wx.clearStorage()
        wx.request({
            url: URL + "/message/getImg",
            method: "GET",
            data: {},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                that.globalData.imageList = res.data.images.map(function (i) {
                    return URL + i
                })
            }
        })
    },
})
