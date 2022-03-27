/*
*手写简易版的promise
*/
class MyPromise {
  static PENDDING = 'pending';
  static FUIFULLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(excutor) {
    this.promiseStatus = MyPromise.PENDDING;
    this.promiseResult = null;
    this.onFulfilledCallBackList = [];
    this.onRejectedCallBackList = [];
    try {
      excutor(this.resolve.bind(this), this.rejected.bind(this));
    }catch(e){
      this.rejected();
    }
  }
  resolve(result) {
    if(this.promiseStatus === MyPromise.PENDDING) {
      this.promiseStatus = MyPromise.FUIFULLED;
      this.promiseResult = result;
      this.onFulfilledCallBackList.forEach(callBack=>callBack(result));
    }
  }
  rejected(reason) {
    if(this.promiseStatus === MyPromise.REJECTED) {
      this.promiseStatus = MyPromise.REJECTED;
      this.promiseResult = reason;
      this.onRejectedCallBackList.forEach(callBack=>callBack(reason));
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value=>value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason=>{throw reason};
    const promise2 = new MyPromise((resolve, rejected)=> {
      if(this.promiseStatus === MyPromise.PENDDING) {
        this.onFulfilledCallBackList.push(onFulfilled);
        this.onRejectedCallBackList.push(onRejected);
      }
      if(this.promiseStatus === MyPromise.FUIFULLED) {
        onFulfilled(this.promiseResult)
      }
      if(this.promiseStatus === MyPromise.REJECTED) {
        onRejected(this.promiseResult);
      }
    })
    return promise2;
  }
}
