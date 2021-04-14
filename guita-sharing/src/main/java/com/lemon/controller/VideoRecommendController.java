package com.lemon.controller;


import com.alibaba.fastjson.JSONObject;
import com.lemon.pojo.VideoRecommend;
import com.lemon.service.IVideoRecommendService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author ${author}
 * @since 2021-04-08
 */
@RestController
@RequestMapping("/videoRecommend")
@Api(value = "推荐视频管理", tags = "Swagger推荐视频API")
public class VideoRecommendController {

    @Autowired
    private IVideoRecommendService iVideoRecommendService;

    @GetMapping("/getVideos")
    @ApiOperation(value = "获取推荐视频", notes = "返回视频列表")
    public Object getList(){
        List<VideoRecommend> list = iVideoRecommendService.list();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("videos", list);
        return jsonObject;
    }
}

