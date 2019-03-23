const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
    if(maxSize){
      this.maxSize = maxSize
    }else{
      this.maxSize = 30
    }
    this.heap = new MaxHeap()
	}

	push(data, priority) {
    if(this.heap.size() < this.maxSize){
      this.heap.push(data,priority);
    }else{
      throw new Error;
    }
	}

	shift() {
    if(this.heap.size() != 0){
      return this.heap.pop();
    }else{
      throw new Error;
    }

	}

	size() {
    return this.heap.sizeHeap;
	}

	isEmpty() {
		return this.heap.sizeHeap == 0 ? true : false;
	}
}

module.exports = PriorityQueue;
