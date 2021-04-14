// pages/user/feedback/feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        feedbackStr: "",
        error: ""
    },
    submitFeedback() {
        this.setData({
            error: "感谢您的反馈"
        })
        wx.switchTab({
            url: "/pages/user/user"
        })
    },
    feedbackInput(e) {
        this.setData({
            feedbackStr: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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
