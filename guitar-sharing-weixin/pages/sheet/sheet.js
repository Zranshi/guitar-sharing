// pages/home/home.js
import {URL} from "../config/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        error: "",
        info: "",
        fileList: [],
        id: 0,
        type: "",
        name: "",
        author: "",
        empty: "",
        favorites: [],
        userSheetList: []
    },
    nameInput(e) {
        this.setData({
            name: e.detail
        })
    },
    authorInput(e) {
        this.setData({
            author: e.detail
        })
    },
    typeInput(e) {
        this.setData({
            type: e.detail
        })
    },
    checkNull(value) {
        return value === "" || value === null || value === undefined;
    },
    afterRead(e) {
        let that = this
        const {file} = e.detail;
        if (this.checkNull(this.data.name)) {
            this.setData({
                error: "名称不能为空"
            })
            return;
        } else if (this.checkNull(this.data.type)) {
            this.setData({
                error: "类型不能为空"
            })
            return;
        } else if (this.checkNull(this.data.author)) {
            this.setData({
                error: "类型不能为空"
            })
            return;
        }
        wx.uploadFile({
            url: URL + '/userScore/upload',
            filePath: file.url,
            name: 'musicImg',
            formData: {
                type: that.data.type,
                uid: that.data.id,
                name: that.data.name,
                author: that.data.author
            },
            success(res) {
                that.setData({
                    info: "上传成功"
                })
                that.onShow()
            },
            fail(res) {
                that.setData({
                    error: "文件大小不能超过20MB"
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 验证是否登陆
        let that = this
        try {
            const value = wx.getStorageSync('id');
            if (value === undefined) {
                this.setData({
                    error: "未登陆，请重新登陆"
                })
                wx.redirectTo({
                    url: "/pages/login/login"
                })
            } else {
                this.setData({
                    id: value,
                    empty: ""
                })
                wx.request({
                    url: URL + "/collect/getList",
                    method: "GET",
                    data: {
                        uid: this.data.id
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        that.setData({
                            favorites: res.data.collections
                        })
                    }
                })
                wx.request({
                    url: URL + "/userScore/getMySheet",
                    method: "GET",
                    data: {
                        uid: this.data.id
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        that.setData({
                            userSheetList: res.data.MySheet
                        })
                    }
                })
            }
        } catch (e) {
            console.log('系统错误')
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
