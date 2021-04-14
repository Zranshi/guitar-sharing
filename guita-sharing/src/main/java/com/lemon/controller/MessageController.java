package com.lemon.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.lemon.pojo.Message;
import com.lemon.service.IMessageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author ${author}
 * @since 2021-04-11
 */
@RestController
@RequestMapping("/message")
@Api(value = "发布信息管理", tags = "Swagger发布信息管理API")
public class MessageController {



    @Autowired
    private IMessageService iMessageService;


    @GetMapping("/getAll")
    @ApiOperation(value = "获取所有的帖子", notes = "返回messages")
    public Object getMessage(){
        List<Message> messages = iMessageService.list();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("messages",messages);
        return jsonObject;
    }

    @PostMapping("/post")
    @ApiOperation(value = "发布帖子")
    public void postMessage(Message message){

        iMessageService.save(message);
    }

    @RequestMapping("/giveLike")
    @ApiOperation(value = "点赞",notes = "传入帖子id和当前点赞数")
    public void giveLike(@RequestParam Integer id, @RequestParam Integer cnt){
        UpdateWrapper<Message> updateWrapper = new UpdateWrapper<>();
        updateWrapper.set("cnt",cnt+1);
        updateWrapper.eq("id",id);
        iMessageService.update(updateWrapper);
    }

    @GetMapping("/getImg")
    @ApiOperation(value = "获取图片")
    public Object getImg(){
        JSONObject jsonObject = new JSONObject();
        List<String> list = new ArrayList<>();
        Collections.addAll(list,"/imgs/1.jpg","/imgs/3.jpg","/imgs/4.jpg","/imgs/5.jpg","/imgs/7.jpg","/imgs/11.jpg","/imgs/15.jpg");
        jsonObject.put("images",list);
        return jsonObject;
    }

    @RequestMapping("/delete")
    @ApiOperation(value = "通过id删除",notes = "传入帖子的id")
    public void deleteById(@RequestParam Integer id){
        iMessageService.removeById(id);
    }


}

