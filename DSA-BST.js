'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    } else {
      return this.left._findMin;
    }
  }
}

/*==========Height of a BST==========*/
function BSTHeight(tree) {
  // Keep count of how many times you traversed
  let count = 0;
  // Check to see if node has a left or right child
  // Traverse through tree. Go right and left
  if (!tree.left && !tree.right) {
    return count;
  } else if (tree.left && tree.right) {
    const leftHeight = BSTHeight(tree.left);
    const rightHeight = BSTHeight(tree.right);
    if (leftHeight > rightHeight) {
      count = leftHeight + 1;
    } else {
      count = rightHeight + 1;
    }
  } else if (tree.left) {
    const leftHeight = BSTHeight(tree.left);
    count = leftHeight + 1;
  } else if (tree.right) {
    const rightHeight = BSTHeight(tree.right);
    count = rightHeight + 1;
  }
  return count;
}

/*==========Is it BST?==========*/
function isBST(tree) {
  // Traverse through tree
  // Make sure left side is lower than parent
  if (tree.left) {
    if (tree.left.value < tree.value) {
      isBST(tree.left);
    } else {
      return false;
    }
  }
  // Make sure right side higher than parent
  if (tree.right) {
    if (tree.right.value > tree.value) {
      isBST(tree.right);
    } else {
      return false;
    }
  }
  // If both true, return true
  return true;
}

/*==========Third Largest Node==========*/
function thirdLargest(tree) {
  let thirdLargestNode;
  if (tree.right) {
    thirdLargestNode = thirdLargest(tree.right);
  }
  if (!tree.right && tree.left) {
    if (tree.left.right) {
      thirdLargestNode = tree.left.value;
    } else {
      thirdLargestNode = tree.parent.value;
    }
  }
  if (!tree.right && !tree.left) {
    if (tree.parent.left) {
      if (tree.parent.left.right) {
        thirdLargestNode = tree.parent.left.right.value;
      } else {
        thirdLargestNode = tree.parent.left.value;
      }
    } else {
      thirdLargestNode = tree.parent.parent.value;
    }
  }
  return thirdLargestNode;
}

/*==========Balanced BST==========*/

function main() {
  const BST = new BinarySearchTree;

  BST.insert(3, 3);
  BST.insert(1, 1);
  BST.insert(4, 4);
  BST.insert(6, 6);
  BST.insert(9, 9);
  BST.insert(2, 2);
  BST.insert(5, 5);
  BST.insert(7, 7);
  BST.insert(8, 8);
  BST.insert(10, 10);

  // console.log(BST);
  // console.log(BSTHeight(BST));
  // console.log(isBST(BST));
  console.log(thirdLargest(BST));
}

main();