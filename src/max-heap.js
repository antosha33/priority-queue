const Node = require('./node');

class MaxHeap {
	constructor() {
     this.root = null;
     this.parentNodes = [];
	}

	push(data, priority) {
    this.insertNode(new Node (data, priority));
    this.shiftNodeUp(new Node(data, priority));
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
	}

	clear() {
		
	}

	insertNode(node) {
    if(this.root == null){
      this.root = node;
      this.parentNodes.push(node);
      return;
    }

    this.parentNodes[0].appendChild(node);
    this.parentNodes.push(node);
    if (this.parentNodes[0].right) {
      this.parentNodes.shift();
    }
  }

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
