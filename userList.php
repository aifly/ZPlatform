<?php

header('Access-Control-Allow-Origin:*');
header("Content-type: text/html; charset=utf-8");
    $result = array(
            "key"=>uniqid(),
            'name'=>'D&S设计中心',
            "userList"=> [
                [
                    "key"=> uniqid(),
                    "username"=> "fly",
                    "email"=> "229742522@163.com",
                    "mobile"=> "13455422525",
                    "department"=> "麟腾传媒/设计中心/设计部"
                ],[
                    "key"=> uniqid(),
                    "username"=> "邓彬",
                    "email"=> "1345542525@163.com",
                    "mobile"=> "13455422525",
                    "department"=> "麟腾传媒/设计中心/设计部"
                ],[
                    "key"=> uniqid(),
                    "username"=> "tom",
                    "email"=> "22587592@163.com",
                    "mobile"=> "18952254115",
                    "department"=> "麟腾传媒/设计中心/设计部"
                ],[
                    "key"=> uniqid(),
                    "username"=> "join",
                    "email"=> "222580056@163.com",
                    "mobile"=> "13455422525",
                    "department"=> "麟腾传媒/设计中心/设计部"
                ],[
                    "key"=> uniqid(),
                    "username"=> "david",
                    "email"=> "985288542@163.com",
                    "mobile"=> "138922587152",
                    "department"=> "麟腾传媒/设计中心/设计部"
                ]
            ]
    );
echo json_encode($result);