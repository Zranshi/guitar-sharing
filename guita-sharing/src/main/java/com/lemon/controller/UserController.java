package com.lemon.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.pojo.User;
import com.lemon.service.IUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author ${author}
 * @since 2021-04-08
 */
@RestController
@RequestMapping("/user")
@Api(value = "用户管理", tags = "Swagger测试用户管理API")
public class UserController {

    @Autowired
    private IUserService iUserService;


    /**
     * 登陆
     * @param username
     * @param password
     * @return
     */
    @PostMapping("/login")
    public Object login(String username, String password){
        QueryWrapper<User> qu = new QueryWrapper<>();
        qu.eq("username",username);
        qu.eq("password",password);
        User us = iUserService.getOne(qu);
        JSONObject jsonObject = new JSONObject();
        if(us != null){
            //查询成功 返回用户id
            jsonObject.put("userId",us.getId());
            return jsonObject;
        }else{
            jsonObject.put("userId",0);;
        }
        return jsonObject;
    }

    /**
     * 注册
     * @param user
     * @return
     */
    @PostMapping("/register")
    public Object register(User user){
        JSONObject jsonObject = new JSONObject();
        QueryWrapper<User> qu = new QueryWrapper<>();
        qu.eq("username",user.getUsername());
        User us = iUserService.getOne(qu);
        //用户名不存在 就可以注册
        if(us == null){
            iUserService.save(user);
            jsonObject.put("msg","success");
        }else{
            jsonObject.put("msg","false");
        }
        return jsonObject;
    }


    @ApiOperation(value = "获取用户个人信息", notes = "传入一个字符串类型的username")
    @GetMapping("/getInfo")
    public Object getInfo(Integer id){
        User info = iUserService.getById(id);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("info", info);
        return jsonObject;
    }


    @PostMapping("/updateInfo")
    public Object updateInfo(User user){
        QueryWrapper<User> qu = new QueryWrapper<>();
        qu.eq("username", user.getUsername());
        User us2 = iUserService.getOne(qu);
        JSONObject jsonObject = new JSONObject();
        if(us2 == null || us2.getId() == user.getId()){
            boolean b = iUserService.updateById(user);
            jsonObject.put("msg","success");
        }else{
            jsonObject.put("msg","false");
        }
        return jsonObject;
    }

}

