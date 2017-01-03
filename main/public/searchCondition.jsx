import React from 'react';

import {Select} from '../commoncomponent/common.jsx';
const Option =Select.Option;

 var searchCondition =(that,data)=>{
     let selectComponent = <Select placeholder='用户名' style={{width:120}} size='small' >
                         <Option value="0">用户名</Option>
                         {/*<Option value="1">邮箱</Option>
                                                        <Option value="2">手机</Option>
                                                        <Option value="3">部门</Option>*/}
                     </Select>

     let searchInputProps = {
        selectComponent,
        keyUpHandler:(e)=>{
          clearTimeout(that.keyupTimer);
          var value = e.target.value;
          console.log(value)
          that.defautlUserList === undefined && (that.defautlUserList = data.concat([]));
          that.keyupTimer = setTimeout(()=>{
            var userlist = that.defautlUserList;
            data = userlist.filter(user=>{
                return user.username.indexOf(value)>-1;
            });
            that.forceUpdate();
          },350);
        }
     }

     return searchInputProps;
 }


export default {searchCondition};