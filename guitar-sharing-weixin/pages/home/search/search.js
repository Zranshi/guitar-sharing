// pages/home/search/search.js
import {URL} from "../../config/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        search: "",
        all: [],
        list: []
    },
    search() {
        this.setData({
            list: this.data.all.filter(i => i['mname'].indexOf(this.data.search) !== -1)
        })
    },
    searchInput(e) {
        this.data.search = e.detail
        if (this.data.search !== "") {
            this.search()
        } else {
            this.setData({
                list: this.data.all
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        wx.request({
            url: URL + "/music/findAll",
            method: "GET",
            data: {},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                that.setData({
                    all: res.data.all,
                    list: res.data.all
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
