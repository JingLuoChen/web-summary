# 有点东西的内容

### 二维码登录原理
[二维码扫码登录是什么原理](https://juejin.cn/post/6940976355097985032)


## 智能去姓
```javascript
let surname =
  '刘;赵;钱;孙;李;周;吴;郑;王;冯;陈;褚;卫;蒋;沈;韩;杨;朱;秦;尤;许;何;吕;施;张;孔;曹;严;华;金;魏;陶;姜;戚;谢;邹;喻;柏;水;窦;章;云;苏;潘;葛;奚;范;彭;郎;廉;岑;薛;雷;贺;倪;汤;滕;殷;罗;毕;郝;邬;安;常;乐;伏;闵;席;季;麻;强;贾;路;娄;危;江;童;颜;郭;梅;盛;林;刁;钟;徐;邱;骆;高;夏;蔡;田;樊;胡;凌;霍;虞;万;支;柯;昝;管;卢;莫;经;房;裘;缪;干;解;应;宗;丁;宣;贲;邓;郁;程;嵇;邢;滑;裴;陆;荣;翁;荀;羊;於;惠;甄;麴;家宫;宁;仇;司;韶;郜;黎;蓟;薄;印;宿;白;怀;蒲;邰;从;鄂;索;咸;籍;赖;卓;蔺;屠;蒙;池;乔;阴;欎;胥;能;苍;双;闻;莘;党;翟;谭;贡;劳;逄;姬;申;扶;堵;冉;宰;郦;雍;舄;璩;桑;桂;边;扈;燕;冀;郏;浦;尚;农;温;别;庄;晏;柴;充;慕;连;茹;习;宦;艾;鱼;容;向;古;易;慎;戈;廖;庾;终;暨;居;衡;步;都;耿;满;弘;匡;国;文;寇;广;禄;阙;东;殴;殳;辛;阚;那;简;饶;空;曾;毋;沙;乜;养;鞠;须;丰;巢;关;蒯;相;查;後;荆;红;游;竺;权;逯;盖;益;桓;公;万俟;司马;上官;欧阳;夏侯;诸葛;闻人;东方;赫连;皇甫;尉迟;公羊;澹台;公冶;宗政;濮阳;淳于;单于;太叔;申屠;公孙;仲孙;轩辕;令狐;钟离;宇文;长孙;慕容;鲜于;闾丘;司徒;司空;丌官;司寇;仉督;子车;颛孙;端木;巫马;公西;漆雕;乐正;壤驷;公良;拓跋;夹谷;宰父;谷梁;晋;楚;闫;法;汝;鄢;涂;钦;段干;百里;东郭;南门;呼延;伯;赏;南宫;墨;哈;谯;笪;年;爱;阳;佟;第五;言;福;百;家;姓;终'
let surnameArr = surname.split(';')

function delSurname (userName) {
  if (!userName) {
    console.error('delSurname func require params!')
    return
  }
  let noNumName = userName.replace(/[0-9]+/g, '') // 去掉输入字符串内的全部数字
  let justChineseName = noNumName.match(/[\u4e00-\u9fa5]/g).join(""); // 去掉输入字符串内的中文
  if (justChineseName.length !== noNumName.length) { // 汉字字符长度 和没有数字长度不一样 认为有其他字符 不处理
    return noNumName
  }
  if (noNumName.length >= 2 && noNumName.length <= 4) { //处理2-4之间的名字 判断是否在百家姓
    let hitSurname = surnameArr.filter((item) => {
      return item === noNumName[0]
    })[0]
    if (hitSurname) { // 命中百家姓
      let noNumSurName = noNumName.substring(1)
      if (noNumSurName.length >= 2) {
        return noNumSurName
      }
      if (noNumSurName.length === 1) {
        return noNumSurName + noNumSurName
      }
    }
  } else {
    return noNumName
  }
}

```
