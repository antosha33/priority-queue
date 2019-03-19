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
		// return this.root.data;
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
    if (node.parent) {
      var rootIndex = this.parentNodes.indexOf(this.root);
      var currentNode = this.parentNodes.indexOf(node);
      if(rootIndex == -1){
        this.parentNodes.push(this.root);
      }
      if(currentNode !=-1){
        this.parentNodes.splice(currentNode,1);
      }
      if (node.parent.priority < node.priority) {
        node.swapWithParent();
        this.shiftNodeUp(node);
      }
    } else {
      this.root = node;
    }
    this.parentNodes.sort(function(a,b){
      return b.priority-a.priority;
    })
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
