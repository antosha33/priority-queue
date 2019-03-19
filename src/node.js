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

    }
    else if(this.parent != null && this.parent.parent != null && this.parent.parent.right != null){
      var branch;
      for(var key in this.parent.parent){
        if(this.parent.parent[key] == this.parent) {
          console.log(key);
          branch = key;
          break;
        }
      }
      buffer = this.parent;
      this.parent.parent[branch] = this;
      this.parent = this.parent.parent;
      this.left = buffer;
      buffer.parent = this;
      buffer.left = null;
    }
    else if(this.parent!= null && this.right==null && this.left != null && this.parent.right.left == null){
      buffer = this.left;
      this.left = this.parent;
      this.left.left = buffer;
      this.right = this.parent.right;
      this.right.parent = this;
      this.left.right = null;
      this.left.parent = this;
      this.parent = null
    }else if (this.parent!= null && this.right == null && this.left == null && this.parent.left !=null && this.parent.right != null){
      buffer = this;
      this.parent.left.parent = buffer;
      this.parent.parent = buffer;
      this.parent = null;
    }else{
        // buffer = this.parent;
        // this.parent.parent.left = this;
        // this.parent.left = buffer;
        // this.parent = null;

        buffer = this.parent.parent;
        this.parent.parent = this;
        this.parent = buffer;
    }
  }
}

module.exports = Node;
