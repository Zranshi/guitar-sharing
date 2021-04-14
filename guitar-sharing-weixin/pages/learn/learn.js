import {URL} from "../config/index";

const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        error: "",
        bookList: [],
        videoList: [],
        activeNames: ['0'],
        isCard: false,
        uid: 0,
        showList: [],
        modelName: "",
        textarea: "",
        username: "",
        info: "",
    },
    onChange(e) {
        this.setData({
            activeNames: e.detail
        })
    },
    getInfo() {
        let that = this;
        wx.request({
            url: URL + '/user/getInfo',
            method: "GET",
            data: {
                id: this.data.uid
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                if (res.statusCode === 200) {
                    that.setData({
                        username: res.data.info['username'],
                    })
                }
            }

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
                    uid: value
                })
                that.getInfo()
                wx.request({
                    url: URL + '/message/getAll',
                    method: "GET",
                    data: {},
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        let list = res.data.messages
                        let index = 0
                        for (let i = 0; i < list.length; i++) {
                            list[i].img = app.globalData.imageList[index]
                            index = index === app.globalData.imageList.length ? 0 : index + 1
                        }
                        that.setData({
                            showList: list
                        })
                    }
                })
                wx.request({
                    url: URL + "/bookRecommend/getBooks",
                    method: "GET",
                    data: {},
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        that.setData({
                            bookList: res.data.recommendList
                        })
                    }
                })
                wx.request({
                    url: URL + "/videoRecommend/getVideos",
                    method: "GET",
                    data: {},
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        that.setData({
                            videoList: res.data.videos
                        })
                    }
                })
            }
        } catch (e) {
            console.log('系统错误')
        }
    },
    textareaAInput(e) {
        this.setData({
            textarea: e.detail
        })
    },
    submit() {
        let that = this
        console.log(that.data.username)
        console.log(that.data.textarea)
        wx.request({
            url: URL + "/message/post",
            method: "POST",
            data: {
                uid: that.data.uid,
                cnt: 0,
                content: that.data.textarea.value,
                uname: that.data.username
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                that.setData({
                    modalName: null
                })
                that.setData({
                    textarea: "",
                    info: "发布成功"
                })
                that.onShow()
            }
        })
    },
    deleteIt(e) {
        let that = this
        console.log(e)
        wx.request({
            url: URL + "/message/delete",
            method: "GET",
            data: {
                id: Number(e.currentTarget.dataset.id),
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                that.setData({
                    info: "删除成功",
                })
                that.onShow()
            }
        })
    },
    likeIt(e) {
        let that = this
        let id = Number(e.currentTarget.dataset.id)
        let cnt = Number(e.currentTarget.dataset.cnt)
        wx.request({
            url: URL + "/message/giveLike",
            method: "GET",
            data: {
                id: id,
                cnt: cnt
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                let list = that.data.showList
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === id) {
                        list[i].cnt++
                    }
                }
                that.setData({
                    info: "点赞成功",
                    showList: list
                })
            }
        })
    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
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
