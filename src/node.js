class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if(this.left == null) {
      this.left = node;
      this.left.parent = this;
    }else if (this.right == null){
      this.right = node;
      this.right.parent = this;
    }else{
      return;
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
    if (this.parent == null) {
      return;
    } else if (this.parent != null && this.parent.parent == null && this.parent.right == null) {
      this.parent.parent = this;
      this.parent.left = null;
      this.left = this.parent;
      this.parent = null;
      return;
    } else if (this.parent != null && this.parent.parent != null) {
      var switcher;
      switcher = (this.data == this.parent.parent.left.left.data) ? 'left' : 'right';
      buffer = this.parent.parent;
      this.left = this.parent;
      buffer[switcher] = this;
      this.parent.left = null;
      this.parent = buffer;
      this.left.parent = this;
      return;
    } else if (this.parent != null && this.parent.parent == null && this.parent.right != null & this.parent.left == this) {
      if (this.left != null) {
        buffer = this.left;
        this.left = this.parent;
        this.right = this.parent.right;
        this.left.left = buffer;
        this.left.right = null;
        this.left.parent = this;
        this.right.parent = this;
        this.left.left.parent = this.left;
        this.parent = null;
        return;
      }
    }else if(this.parent != null && this.parent.parent == null && this.parent.right != null & this.parent.right == this){
      buffer = this.parent.left;
      this.parent.parent = this;
      this.parent.left = this.left;
      this.parent.right = this.right;
      this.right = this.parent;
      this.left = buffer;
      this.parent = null;
      this.left.parent = this;
      return;
    }
  }
}

module.exports = Node;
