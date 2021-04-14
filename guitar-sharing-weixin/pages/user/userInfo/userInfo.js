// pages/user/userInfo/userInfo.js
import {URL} from "../../config/index"

Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        error: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        sex: "",
    },
    userInput(e) {
        this.data.username = e.detail
    },
    passInput(e) {
        this.data.password = e.detail
    },
    emailInput(e) {
        this.data.email = e.detail
    },
    phoneInput(e) {
        this.data.phone = e.detail
    },
    sexInput(e) {
        this.data.sex = e.detail
    },

    getInfo() {
        let that = this;
        wx.request({
            url: URL + '/user/getInfo',
            method: "GET",
            data: {
                id: this.data.id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                if (res.statusCode === 200) {
                    that.setData({
                        username: res.data.info['username'],
                        password: res.data.info['password'],
                        email: res.data.info['email'],
                        phone: res.data.info['phone'],
                        sex: res.data.info['sex']
                    })
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
            this.setData({
                id: value
            })
            this.getInfo()
        } catch (e) {
            console.log('系统错误')
            console.log(e)
        }
    },
    phoneCheck(phone) {
        return (/^1[3456789]\d{9}$/.test(phone))
    },
    emailCheck(email) {
        return /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(email);
    },

    updateInfo() {
        let that = this;
        console.log(that.data)
        if (this.data.username === "") {
            this.setData({
                error: "用户名不能为空"
            })
            return;
        } else if (this.data.password === "") {
            this.setData({
                error: "密码不能为空"
            })
            return;
        } else if (this.data.email === "") {
            this.setData({
                error: "邮箱不能为空"
            })
            return;
        } else if (!this.emailCheck(this.data.email)) {
            this.setData({
                error: "邮箱格式不正确"
            })
            return;
        }
        if (this.data.phone === null || this.data.phone === undefined || this.data.phone === "") {
            this.setData({
                phone: ""
            })
        } else {
            if (!this.phoneCheck(this.data.phone)) {
                this.setData({
                    error: "电话格式错误"
                })
                return;
            }
        }
        if (this.data.sex === null || this.data.sex === undefined || this.data.sex === "") {
            this.setData({
                sex: ""
            })
        }
        wx.request({
            url: URL + '/user/updateInfo',
            method: "POST",
            data: {
                id: this.data.id,
                username: this.data.username,
                password: this.data.password,
                email: this.data.email,
                phone: this.data.phone,
                sex: this.data.sex
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                console.log(res.data)
                if (res.statusCode === 200) {
                    if (res.data['msg'] === "success") {
                        wx.switchTab({
                            url: '/pages/user/user'
                        })
                    } else {
                        that.setData({
                            error: "用户名或邮箱已存在"
                        })
                    }
                } else {
                    that.setData({
                        error: "系统错误"
                    })
                }
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
});
