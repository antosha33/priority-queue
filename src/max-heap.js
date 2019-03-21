const Node = require('./node');

class MaxHeap {
	constructor() {
     this.root = null;
     this.parentNodes = [];
	}

	push(data, priority) {
    var currentNode = new Node (data, priority);
    this.insertNode(currentNode);
    this.shiftNodeUp(currentNode);
	}

	pop() {
    if(this.root == null){
      return;
    }else{
      // var count = 1;
      // return this.root.data;
    }
	}

	detachRoot() {
    this.root = null;
    return this.parentNodes.shift();
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
	}

	clear() {
    this.root = null;
    this.parentNodes = [];
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
    if(node.parent){
      if(node.priority > node.parent.priority){
        var indexParent = this.parentNodes.indexOf(node.parent);
        var indexNode = this.parentNodes.indexOf(node);
        if(indexParent != -1){
          this.parentNodes[indexParent] = node;
        }
        this.parentNodes[indexNode] = node.parent;
        node.swapWithParent();
        this.shiftNodeUp(node);
      }
    }
    if(node.parent == null){
      this.root = node;
    }
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
