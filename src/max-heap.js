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
    var indexRoot = this.parentNodes.indexOf(this.root);
    var root = this.root;
    this.root = null;
    if(indexRoot == -1){
      return root;
    }else{
      return this.parentNodes.shift();
    }
	}

	restoreRootFromLastInsertedNode(detached) {
    this.root = this.parentNodes[this.parentNodes.length-1];
    this.parentNodes.unshift(this.root.parent);
    this.parentNodes[this.parentNodes.length-1].remove();
    this.root.left = detached.left;
    if(this.root.left != null) this.root.left.parent = this.root;
    this.root.right = detached.right;
    if(this.root.right != null) this.root.right.parent = this.root;
    if(this.parentNodes.length == 3){
      this.parentNodes[0] = this.parentNodes[this.parentNodes.length-1];
      this.parentNodes.pop();
    }else{
      this.parentNodes.pop();
    }
	}

	size() {
		
	}

	isEmpty() {
    return this.root == null ? true : false;
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
    var maxNode = node.priority;
    if(node.left !=null && node.right !=null){
      var trigger = node.left.priority > node.right.priority ? 'left':'right';

    }else if (node.left !=null && node.right ==null){
      trigger = 'left';
    }
    if (node[trigger]) {
      if (node[trigger].priority > node.priority) {
        var nodeIndex = this.parentNodes.indexOf(node);
        var leftIndex = this.parentNodes.indexOf(node[trigger]);
        nodeIndex = this.parentNodes.indexOf(node);
        if(nodeIndex != -1){
          this.parentNodes[nodeIndex] = this.parentNodes[leftIndex];
        }
        if (leftIndex != -1) {
          this.parentNodes[leftIndex] = node;
        }
        node[trigger].swapWithParent();
        if (node.parent.priority > maxNode) maxNode = node.parent;
        this.shiftNodeDown(node);
      }
    }
    this.root = maxNode;
	}
}

module.exports = MaxHeap;
