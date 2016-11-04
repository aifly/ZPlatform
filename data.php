<?php
/**
 * Created by PhpStorm.
 * User: ltth-one's
 * Date: 2016/11/3
 * Time: 18:09
 */
header('Access-Control-Allow-Origin:*');
header("Content-type: text/html; charset=utf-8");

    $result = array(
        "totalUserNum"=> 35,
	    "disableUserNum"=> 8,
        "treeData" =>[
            [
                "title"=>'麟腾传媒文化有限公司',
                "key"=> uniqid(),
                "children"=>[
                   [
                       "title"=>'D&S设计中心',
                       "key"=>uniqid(),
                       "children"=>[
                           [
                               "key"=> uniqid(),
                               "title"=> "VI设计部"
                           ],[
                               "key"=> uniqid(),
                               "title"=> "UI设计部"

                           ],[
                               "key"=> uniqid(),
                               "title"=> "设计编码部"
                           ]
                       ],
                   ]
                ],
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
            ]
        ]
    );
echo json_encode($result);