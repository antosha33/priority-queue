const Node = require('./node');

class MaxHeap {
  constructor() {
     this.root = null;
     this.parentNodes = [];
     this.sizeHeap = 0;

  }

  push(data, priority) {
    this.sizeHeap++;
    var currentNode = new Node (data, priority);
    this.insertNode(currentNode);
    this.shiftNodeUp(currentNode);
  }

  pop() {
    this.sizeHeap--;
    if(this.root == null){
      return;
    }else{

      var detached = this.detachRoot();
      this.restoreRootFromLastInsertedNode(detached);
      this.shiftNodeDown(this.root);
      return detached.data;
    }
  }

  detachRoot() {
    var indexRoot = this.parentNodes.indexOf(this.root);
    var root = this.root;
    this.root = null;
    if(indexRoot == -1){
      return root;
    }else{
      this.parentNodes.shift();
      return root;
    }
  }

  restoreRootFromLastInsertedNode(detached) {
    if(this.parentNodes.length > 0){
      var currentLastInserted = this.parentNodes[this.parentNodes.length -1];
      if(detached.right != currentLastInserted && detached.right !=null){
        var currentLastInsertedleft = currentLastInserted.left;
        var currentLastInsertedRight = currentLastInserted.right;
        currentLastInserted.right = detached.right;
        currentLastInserted.left = detached.left;
        currentLastInserted.right.parent = currentLastInserted;  
        currentLastInserted.left.parent = currentLastInserted;  
        currentLastInserted.left.left = currentLastInsertedleft;
        currentLastInserted.left.right = currentLastInsertedRight;  
        this.parentNodes.pop();
        if(currentLastInserted.parent != this.parentNodes[0]){
          this.parentNodes.unshift(currentLastInserted.parent);
        }
        currentLastInserted.parent = null;
        this.root = currentLastInserted;
        return;
      }if(currentLastInserted == detached.right){
        var currentLastInsertedleft = currentLastInserted.left;
        var currentLastInsertedRight = currentLastInserted.right;
        this.root = currentLastInserted;
        currentLastInserted.parent = null;
        currentLastInserted.left = detached.left;
        currentLastInserted.left.parent = currentLastInserted;  
        var indexCurrentLastInserted = this.parentNodes.indexOf(currentLastInserted);
        var indexChild = this.parentNodes.indexOf(currentLastInserted.left);
        this.parentNodes[indexCurrentLastInserted] = this.parentNodes[indexChild]
        this.parentNodes[indexChild] = currentLastInserted;
      }
      if(detached.right == null && detached.left != null && currentLastInserted == detached.left){
        this.root = currentLastInserted;
        currentLastInserted.left = null;
        currentLastInserted.right = null;
        currentLastInserted.parent = null;
        this.parentNodes.shift();
      }
    }
  }

  size() {
    return this.sizeHeap;
  }

  isEmpty() {
    return this.root == null ? true : false;
  }

  clear() {
    this.sizeHeap = 0;
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
  if(node){
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
    }else{
      maxNode = this;
    }
    if(maxNode.left){
      this.root = maxNode;
    }else{
      this.root = node;
    }
  }
  }
}
module.exports = MaxHeap;
