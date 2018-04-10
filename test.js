function test() {
const arr1 = [1, 3, 5, 7, 13, 9, 14, 12, 11, 9, 4, 2]
const arr2 = []
let smallArr = []
const max = 6

arr1.forEach(c => {
  if(smallArr.length===0) {
    arr2.push(smallArr)
  }
  smallArr.push(c)
  if(smallArr.length===max) {
    smallArr = []
  }
})
console.log(arr2)
}