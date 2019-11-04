/*
 * 公用方法
 * @Author: Lee
 * @Date: 2018-03-03 11:27:25
 * @Last Modified by: Lee
 * @Last Modified time: 2019-08-09 17:05:16
 */

/**
 * 验证手机号
 * @param  {number, String} phone：要验证手机号
 * @returns {Boolean} [是否为手机号]
 */
export function isPhone(phone) {
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  return reg.test(phone);
}
