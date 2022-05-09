import axios from "axios"

// 发送网络请求
export const getBooks = () => {
  const arr = []
  axios.get("../data.json")
    .then(res => arr.push(...res.data.data))
    .catch(err => console.log(err))
  return arr
}

// 根据数据评分进行降序排序
export const compare = key => {
  return function(obj1, obj2) {
    let a = obj1[key]
    let b = obj2[key]
    return b - a
  } 
}

// 根据评分渲染五角星
export const getBookStar = (score, fullScore = 100) => {
  return score/(fullScore/5)
}