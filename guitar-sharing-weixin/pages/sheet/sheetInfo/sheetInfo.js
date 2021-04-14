// pages/sheet/sheetInfo/sheetInfo.js
import {URL} from "../../config/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        it: {},
        info: "",
        imgUrl: "",
        error: "",
        favorites: [],
        disable: false,
        fa: "",
        uid: 0
    },
    favorites() {
        let that = this
        try {
            const value = wx.getStorageSync('id');
            wx.request({
                url: URL + "/collect/add",
                method: "GET",
                data: {
                    uid: Number(value),
                    mid: that.data.it.id
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    that.setData({
                        info: "收藏成功",
                        disable: true,
                        fa: "已收藏",
                    })
                }
            })
        } catch (e) {
            console.log('系统错误')
        }
    },

    downloadImage() {
        let that = this
        wx.getImageInfo({
            src: that.data.imgUrl,
            success(img) {
                wx.saveImageToPhotosAlbum({
                    filePath: img.path,
                    success(res) {
                        that.setData({
                            info: "保存成功"
                        })
                    },
                    fail(res) {
                        that.setData({
                            error: "保存失败"
                        })
                    }
                })
            }
        })
    },
    download() {
        let that = this
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            that.setData({
                                info: "获取权限成功"
                            })
                            that.downloadImage()
                        },
                        fail() {
                            that.setData({
                                error: "获取权限失败"
                            })
                        }
                    })
                } else {
                    that.downloadImage()
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
                    uid: value,
                })
            }
        } catch (e) {
            console.log('系统错误')
        }
        this.setData({
            id: Number(options.id)
        })
        wx.request({
            url: URL + "/music/getSheetInfo",
            method: "GET",
            data: {
                sheetId: this.data.id
            },
            success(res) {
                that.setData({
                    it: res.data.sheetInfo
                })
                that.setData({
                    imgUrl: URL + that.data.it.scoreimg
                })
            }
        })
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
        let that = this
        wx.request({
            url: URL + "/collect/getList",
            method: "GET",
            data: {
                uid: this.data.uid
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                that.setData({
                    favorites: res.data.collections
                })
                let list = that.data.favorites.map(it => it.mname)
                console.log(list)
                console.log(list.indexOf(that.data.it.mname))
                if (list.indexOf(that.data.it.mname) > -1) {
                    that.setData({
                        disable: true,
                        fa: "已收藏",
                    })
                } else {
                    that.setData({
                        disable: false,
                        fa: "收藏",
                    })
                }
            }
        })
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
