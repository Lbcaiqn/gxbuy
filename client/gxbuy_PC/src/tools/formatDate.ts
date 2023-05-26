export function formatDate(datetime: Date | string | number, fmt: string): string {
  /*使用说明
  参数： datetime(数值或字符串类型，时间戳)，fmt(字符串类型，正则)
  示例：
  yyyy-MM-dd               2022-8-10
  dd/MM yyyy               10/8 2022
  yyyy年0M月0d日 0h:0m:0s  2022年08月01日 15:25:49

  */
  /*
  时间戳有三种：
  第一种：精确到毫秒，共13位
  第二种：精确到秒，共13位（最后三位为0）
  第三种：精确到秒，共10位
  所以传入的时间戳若是10位，需要*1000才能获得正确的时间
  该函数若传入精确到毫秒的时间戳也能正常使用，只是没有写获取毫秒数的代码
  */

  let date = new Date(String(datetime).length == 10 ? Number(datetime) * 1000 : Number(datetime));

  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, date.getFullYear() + '');

  for (const i in o) {
    let str = o[i] + '';
    if (new RegExp(`(0${i})`).test(fmt) && str.length >= 2) fmt = fmt.replace(RegExp.$1, str);
    else if (new RegExp(`(${i})`).test(fmt)) fmt = fmt.replace(RegExp.$1, str);
  }

  return fmt;
}
