/**
 * Created by fly on 2016/5/27 0027.
 */
import {ADD_TAG} from '../constants/ActionTypes';
const initialState = [{
    data:{
        title:"",
        tags:[
            {
                "type": "text",
                "href": "http://www.zmiti.com",
                "content": "",
                "id": 'aaaaaa',
                "icon": "images/red-plain.png",
                "iconHover": "images/hoverlink.png",
                "styles": {
                    "left": "85%",
                    "top": "42%"
                },
                "wrapStyles": {
                    "width": "200px",
                    "height": "130px",
                    "fontFamily": "'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif"
                }
            }
        ]
    }
}];

export default function addTag (state = initialState,action){
    switch (action.type){
        case ADD_TAG:
            return [
                {
                    data:{
                        title:"",
                        tags:[
                            {
                                "type": "text",
                                "href": "http://www.zmiti.com",
                                "content": "",
                                "id": 'aaaaaa',
                                "icon": "images/red-plain.png",
                                "iconHover": "images/hoverlink.png",
                                "styles": {
                                    "left": "85%",
                                    "top": "42%"
                                },
                                "wrapStyles": {
                                    "width": "200px",
                                    "height": "130px",
                                    "fontFamily": "'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif"
                                }
                            }
                        ]
                    }
                },
                ...state
            ]
            break;
        default:
            return state;
    }

}