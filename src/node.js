class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left == null) {
      this.left = node;
      this.right = null;
      node.parent = this;
    }else if(this.right == null){
      this.right = node;
      node.parent = this;
    }
  }

  removeChild(node) {
    if(this.left == node){
      this.left = null;
      node.parent = null;
    }else if(this.right == node){
      this.right = null;
      node.parent = null;
    }else{
      throw new Error();
    }
  }

  remove() {
    if(this.parent == null) return;
    this.parent.removeChild(this);
  }

  swapWithParent() {
    var buffer;
    if(this.parent == null){
      return;
    }else if(this.parent != null && this.parent.right == null){
      buffer = this.parent.parent;
      this.parent.parent = this;
      this.parent = buffer;
    }else{
      buffer = this;
      this.parent.left.parent = buffer;
      this.parent.parent = buffer;
      this.parent = null;
    }
  }
}

module.exports = Node;
