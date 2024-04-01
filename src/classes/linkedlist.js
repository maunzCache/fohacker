'use strict';

import ListNode from './listnode.js';

class LinkedList {
    constructor() {
        // Note: If we don't want null, the constructor can create the first node.
        // However, this means the list can never be empty.
        // This is can be good because it forces to free memory to empty the list.
        this.head = null;
    }

    appendNode(type, value) {
        const newNode = new ListNode(type, value);
        if (this.head == null) {
            this.head = newNode;
        } else {
            const lastNode = this.getLastNode();
            lastNode.child = newNode
        }
    }

    getLastNode() {
        if (this.head == null) {
            return null;
        } else {
            // TODO: This loop will be implemented often. Find a better way to stay DRY.
            let tmpLastNode = this.head;
            while (tmpLastNode) {
                if (tmpLastNode.child != null) {
                    tmpLastNode = tmpLastNode.child;
                } else {
                    return tmpLastNode;
                }
            }
        }
    }

    getNodeValueLength() {
        // TODO: Find a better function name.
        if (this.head == null) {
            return 0;
        } else {
            let tmpLastNode = this.head;
            let nodeValueSum = this.head.value.length;
            while (tmpLastNode) {
                if (tmpLastNode.child != null) {
                    tmpLastNode = tmpLastNode.child;
                    nodeValueSum += tmpLastNode.value.length;
                } else {
                    return nodeValueSum;
                }
            }
        }
    }

    // TODO: Code below is not nice. I am not concentrated enough for this
    getNodeAtIndex(index) {
        let tmpLastNode = this.head;
        for (let lookupIndex = 0; lookupIndex < index; lookupIndex++) {
            tmpLastNode = tmpLastNode.child;
        }
        return tmpLastNode;
    }

    removeNodeAtIndex(index) {
        // TODO: Do check if input was an integer and in bounds.
        const tmpLastParentNode = this.getNodeAtIndex(index - 1);

        let newChild = null;
        if (tmpLastParentNode.child) {
            newChild = tmpLastParentNode.child;
        }
        tmpLastParentNode.child = newChild;
    }
}

export default LinkedList;

const getRandomIntInclusive = function (min, max) {
    // See: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateLinkedListForLine = function () {
    const tmpLinkedList = new LinkedList();

    // TODO: Move variables to somewhere else
    const nodeTypeChance = {
        'dud': 40,
        'dummy': 50,
        'password': 10
    };
    const maxPasswordLength = 4;
    const maxValueLength = 16;

    while (tmpLinkedList.getNodeValueLength() < maxValueLength) {
        const nodeTypes = ['dud', 'dummy'];
        if ((maxValueLength - tmpLinkedList.getNodeValueLength()) >= maxPasswordLength) {
            nodeTypes.push('password');
        }

        let randomType = 'dud';
        let nodeValue = 'a';

        let maxTypeChance = 0;
        nodeTypes.forEach(function (value) {
            maxTypeChance += nodeTypeChance[value];
        });

        const tmpNodeTypeChance = getRandomIntInclusive(1, maxTypeChance);
        if ((tmpNodeTypeChance >= 1) && (tmpNodeTypeChance <= nodeTypeChance['dud'])) {
            randomType = 'dud'; // TODO: Should access nodeTypes
            nodeValue = '{'
        } else if ((tmpNodeTypeChance >= (nodeTypeChance['dud'] + 1)) && (tmpNodeTypeChance <= (nodeTypeChance['dud'] + nodeTypeChance['dummy']))) {
            randomType = 'dummy'
            nodeValue = 'a';
        } else {
            randomType = 'password';
            nodeValue = 'WORD';
        }
        tmpLinkedList.appendNode(randomType, nodeValue);
    }

    if (tmpLinkedList.getNodeValueLength() > maxValueLength) {
        console.error('List has nodeValueLength', tmpLinkedList.getNodeValueLength(), 'but expected', maxValueLength);
    }

    return tmpLinkedList;
}
