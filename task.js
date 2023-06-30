// var abc = function (a, b, c) {
//   return [a, b, c];
// };

// // function curry(fn) {
// //   return function (a) {
// //     return function (b) {
// //       return function (c) {
// //         return [a, b, c]
// //       }
// //     }
// //   }
// // }

// function curry(fn) {
//   const values = []
//   return function iter(...rest) {
//     values.push(...rest)
//     if (values.length >= fn.length) {
//       return fn(...values)
//     }

//     return iter
//   }
// }

// var curried = curry(abc);
// console.log(curried(1, 2, 3));
// // => [1, 2, 3]

// // curried(1, 2)(3);
// // // => [1, 2, 3]

// // curried(1, 2, 3);
// // => [1, 2, 3]

// Условие задачи: Напишите функцию duplicateEncode, которая принимает 
// строку и кодирует каждый символ в скобку. Если такой символ только 
// один, то скобка будет открывающая, если несколько, то закрывающая.


// function duplicateEncode(str) {

//   const arr = str.split();
//   let res = '';
//   let count = {};

//   for (let i = 0; i < arr.length; i++) {
//     if (count[arr[i]]) {
//       count[arr[i]] += 1
//     } else {
//       count[arr[i]] = 1
//     }
//   }

//   for (let j = 0; j < arr.length; j++) {
//     if (count[arr[j]] > 1) {
//       res += ')'
//     } else {
//       res += '('
//     }
//   }

//   return res
// }
// console.log(duplicateEncode("win")); // ( ( (
// console.log(duplicateEncode("receipt")); // ( )() ( ( (
// console.log(duplicateEncode("Success")); // )()) ())
// console.log(duplicateEncode(" ( ( #")); // )) ( (



// const res = [];
// const chunk = [];

// function multiplicationTable(size) {
//   for (let i = 0; i < size; i++) {
//     chunk.push(i + 1);
//   }
//   for (let j = 0; j < size; j++) {
//     const multiply = (chunk, multiplier) => chunk.reduce((acc, el) => {
//       acc.push(el * multiplier);
//       return acc;
//     }, []);
//     let value = multiply(chunk, j + 1);
//     res.push(value);
//   }

//   return res;
// }

// console.log(multiplicationTable(1));
// [ [1] ]
// console.log(multiplicationTable(2));
// // [ [ 1, 2 ], [ 2, 4 ] ]
// console.log(multiplicationTable(3));
// [ [ 1, 2, 3 ],  [2, 4, 6], [3, 6, 9 ] ]