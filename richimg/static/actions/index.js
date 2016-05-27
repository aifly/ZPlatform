/**
 * Created by fly on 2016/5/27 0027.
 */

import * as types from '../constants/ActionTypes';

export function addTag(option){
    return {
        type:types.ADD_TAG,
        ...option
    }
}