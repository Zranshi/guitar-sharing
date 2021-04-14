package com.lemon.controller;


import com.alibaba.fastjson.JSONObject;
import com.lemon.pojo.BookRecommend;
import com.lemon.service.IBookRecommendService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
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
@RequestMapping("/bookRecommend")
@Api(value = "推荐书籍管理", tags = "Swagger推荐书籍管理API")
public class BookRecommendController {

    @Autowired
    private IBookRecommendService iBookRecommendService;

    @GetMapping("/getBooks")
    @ApiOperation(value = "获取书籍", notes = "返回书籍列表")
    public Object getList(){
        List<BookRecommend> recommendList = iBookRecommendService.list();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("recommendList",recommendList);
        return jsonObject;
    }
}

