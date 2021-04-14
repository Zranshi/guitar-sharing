// pages/user/userInfo/userInfo.js
import {URL} from "../../config/index"

Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: [{
            title: "节拍器",
            label: "节拍器是一种规律发出声音的工具，帮助音乐人稳定拍速",
            url: "http://eumlab.cn/pro-metronome/"
        }, {
            title: "调音器",
            label: "电子调谐器是一种检测和显示在乐器上演奏的音符的音高的设备",
            url: "https://m.ruan8.com/soft/53123.html"
        }, {
            title: "有谱么",
            label: "有谱么编辑器是专为吉他弹唱谱设计的曲谱编辑器",
            url: "https://yoopu.me/start?mode=startup"
        }]
    },

    click1() {
        wx.navigateTo({
            url: "/pages/user/advocate/metronome/metronome"
        })
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
});
