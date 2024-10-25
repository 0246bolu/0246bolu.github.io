// Task 1:  Remove the last two items from the array, and add them to 
//          the start (one at a time) → [7,9,3,5]
// 
// Task 2:  Remove first item of current array, then at the start add 
//          a random amount (between 1-3) of zeros to the array beginning
//          → one possible result:  [0,0,9,3,5]      
//           
// Task 3:  Find and remove the 9 from the array
//          → one possible result:  [0,0,3,5]
//
// Use a print to console to verify each task's success.


let myArray = [3, 5, 7, 9];
let shallowCopy;
let deepCopy;


function setup() {
  // solve the tasks here
  let lastItem = myArray.pop();
  let secondLastItem = myArray.pop();
  myArray.unshift(secondLastItem);
  myArray.unshift(lastItem);
  console.log(myArray);

  shallowCopy = myArray;
  deepCopy = structuredClone(myArray);

  myArray.shift();
  let n = random(0,3);
  for(let i = 0; i < myArray.length; i++){
    myArray.unshift(0);
  }
  console.log(myArray);

  for(let i = 0; i < myArray.length; i++){
    if(myArray[i]===9){
      myArray.splice(i,1);
    }
  }
  console.log(myArray);
  console.log(shallowCopy);
  console.log(deepCopy);
}
