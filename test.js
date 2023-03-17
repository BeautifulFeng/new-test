/**
 * @description: 递归数组生成树
 * @param {[数组]} list 数组
 * @param {[数量]} root 默认为0
 * @return {*} 返回数组
 */
export const arrayToTreeV3 = (list, root = 0) => {
  return list
    .filter((item) => item.parentId === root)
    .map((item) => ({ ...item, children: arrayToTreeV3(list, item.id) }));
};
/**
 * @description: 递归数组生成树
 * @param {[数组]} list 数组
 * @param {[父ID]} parentID 默认为0
 * @return {*}
 */
export const TotreeV4 = (list, parentID = 0) => {
  //定义一个用于递归查找子元素的函数
  var child = function (pareID) {
    //先定义一个数组，用于存储所查到的子元素
    var childs = [];
    //循环数组
    for (let i = 0; i < list.length; i++) {
      //如果数组其中一项的parentId等于传入的，说明这一项是传入的子元素，把他push进数组，然后重复递归自己找该项的子元素
      if (list[i].parentId == pareID) {
        list[i].children = child(list[i].id);
        childs.push(list[i]);
      }
    }
    // console.log(childs);
    //最后将查到的所有子元素返回
    return childs;
  };
  return child(parentID);
};
/**
 * 数组转树形结构 双循环比递归效率高
 * @param {array} list 被转换的数组
 * @param {number|string} root 根节点（最外层节点）的 id
 * @return array
 */
export const ToTreeFast = (list, root) => {
  const result = []; // 用于存放结果
  const map = {}; // 用于存放 list 下的节点

  // 1. 遍历 list，将 list 下的所有节点以 id 作为索引存入 map
  for (const item of list) {
    map[item.id] = { ...item }; // 浅拷贝
  }

  // 2. 再次遍历，将根节点放入最外层，子节点放入父节点
  for (const item of list) {
    // 3. 获取节点的 id 和 父 id
    const { id, parentId } = item; // ES6 解构赋值
    // 4. 如果是根节点，存入 result
    if (item.parentId === root) {
      result.push(map[id]);
    } else {
      // 5. 反之，存入到父节点
      map[parentId].children
        ? map[parentId].children.push(map[id])
        : (map[parentId].children = [map[id]]);
    }
  }

  // 将结果返回
  return result;
};
