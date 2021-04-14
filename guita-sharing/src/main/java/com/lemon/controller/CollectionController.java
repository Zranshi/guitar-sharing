package com.lemon.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.pojo.Collection;
import com.lemon.pojo.Music;
import com.lemon.service.ICollectionService;
import com.lemon.service.IMusicService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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
@RequestMapping("/collect")
@Api(value = "收藏管理", tags = "Swagger收藏管理API")
public class CollectionController {

    @Autowired
    private ICollectionService iCollectionService;

    @Autowired
    private IMusicService iMusicService;

    @GetMapping("/add")
    @ApiOperation(value = "加入收藏", notes = "传入用户id和曲谱id,返回msg")
    public Object add(@RequestParam Integer uid, @RequestParam Integer mid){
        Collection collection = new Collection();
        JSONObject jsonObject = new JSONObject();
        if(uid > 0 && mid > 0){
            collection.setUid(uid);
            collection.setMid(mid);
            iCollectionService.save(collection);
            jsonObject.put("msg","success");
        }else{
            jsonObject.put("msg","false");
        }
        return jsonObject;
    }

    @GetMapping("/getList")
    @ApiOperation(value = "获取收藏列表", notes = "传入用户id,返回collections")
    public Object getCollections(@RequestParam Integer uid){
        QueryWrapper<Collection> qu = new QueryWrapper<>();
        qu.eq("uid", uid);
        List<Collection> collections = iCollectionService.list(qu);
        List<Music> musicList = new ArrayList<>();
        for (Collection collection : collections) {
            Integer mid = collection.getMid();
            musicList.add(iMusicService.getById(mid));
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("collections", musicList);
        return jsonObject;
    }

}

