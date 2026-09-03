import { TerminologyItem, TopicContent, TopicId, TreeTypeItem, TraversalTypeItem, BSTOperationItem, QuizQuestion } from '../types';

export const TREE_TOPICS: TopicContent[] = [
  {
    id: 'basics',
    index: 1,
    title: '01. What is a Tree?',
    shortDescription: 'Understand how trees organize data in a simple hierarchy.',
    summary: 'A tree is a way of organizing data where connected items branch out from one starting point.',
    readTime: '3 min read',
    difficulty: 'Beginner',
    definition: {
      text: 'A tree is a non-linear data structure where items are organized hierarchically, branching downward from a single starting point.',
      highlights: [
        'A tree is made of nodes.',
        'Nodes are connected by edges.',
        'A tree starts from one top node called the root.',
        'Nodes can connect to children below them.',
        'Trees branch downward instead of forming a straight linear list.'
      ]
    },
    coreIntuition: {
      analogy: 'Think of a family tree or folders on your computer.',
      explanation: 'One item connects to items below it, creating a natural branching structure where every element has a clear place.',
      points: [
        'A tree is made of nodes.',
        'Nodes are connected by edges.',
        'A tree starts from one top node.',
        'Nodes can have children.',
        'Trees branch instead of forming a straight line.'
      ]
    },
    keyPoints: [
      'A tree starts with a single top node called the root.',
      'Nodes connect to other nodes below them using links called edges.',
      'A node can have multiple children branching beneath it.',
      'A node with no children is called a leaf node.',
      'Unlike arrays or linked lists, trees organize data hierarchically rather than in a straight line.'
    ],
    miniPractice: {
      instruction: 'Select the correct statement about trees.',
      question: 'What connects two nodes together in a tree?',
      options: ['An Edge', 'A Loop', 'An Array Index', 'A Stack Frame'],
      correctIndex: 0,
      explanation: 'Nodes in a tree are connected to each other by links called edges.',
      hint: 'Think about what is drawn between two circles in a diagram to connect them.',
      guidedSolve: {
        steps: [
          {
            stepNumber: 1,
            title: 'Understand Tree Components',
            explanation: 'A tree is built of two primary elements: circles that store data (called Nodes) and connecting lines between them.',
            nextPrompt: 'Next, let us see what the connecting line is named in computer science.'
          },
          {
            stepNumber: 2,
            title: 'Eliminate Non-Tree Terms',
            explanation: 'Trees are non-linear hierarchical structures with no cyclic loops or fixed array index slots.',
            nextPrompt: 'Now, match the remaining term to the connecting link.'
          },
          {
            stepNumber: 3,
            title: 'Identify the Connecting Link',
            explanation: 'The standard term for any line linking a parent node to a child node is an Edge.',
            nextPrompt: 'Review the final conclusion.'
          }
        ],
        finalAnswer: 'An Edge',
        finalExplanation: 'Nodes in a tree are linked together by directional connections known as edges.'
      }
    }
  },
  {
    id: 'terminology',
    index: 2,
    title: '02. Tree Terminology',
    shortDescription: 'Learn the basic words used when talking about trees.',
    summary: 'Learn the 15 core terms used to identify node roles, positions, and relationships in a tree structure.',
    readTime: '4 min read',
    difficulty: 'Beginner',
    definition: {
      text: 'Tree terminology gives simple, standard names to describe the position and relationship of every node in a tree.',
      highlights: [
        '1. Node: A single item in a tree that stores a value or piece of data.',
        '2. Root Node: The topmost node of a tree (a tree has only one root).',
        '3. Edge: The connection line between two nodes.',
        '4. Parent Node: A node that has one or more nodes connected below it.',
        '5. Child Node: A node directly connected below another node.',
        '6. Leaf Node: A node that has no children.',
        '7. Internal Node: A node that has at least one child (not a leaf).',
        '8. Degree of a Tree: The largest number of children that any single node has.',
        '9. Level of a Node: How far a node is from the top (Root = Level 0).',
        '10. Height of a Tree: Number of edges in the longest path from root to a leaf.',
        '11. Depth of a Node: Number of edges from the root to that node.',
        '12. Subtree: A smaller tree formed from a node and all of its descendants.',
        '13. Siblings: Nodes that have the same parent.',
        '14. Ancestor: Any node that comes above another node in the path to the root.',
        '15. Descendant: Any node that comes below another node.'
      ]
    },
    coreIntuition: {
      analogy: 'Just like naming members in a family tree, every node has a specific relationship (parent, child, sibling, ancestor, descendant) and position (root, leaf, level, depth).',
      explanation: 'Knowing the 15 standard terms makes understanding and discussing any tree algorithm intuitive and clear.',
      points: [
        'Root is always at the top (Level 0, Depth 0).',
        'Leaves are at the bottom with 0 children.',
        'Height is the length of the longest route from root to leaf.',
        'Siblings share the same parent; ancestors sit above on the path to root.'
      ]
    },
    keyPoints: [
      'Node: A node is a single item in a tree that stores data (e.g. Node 10, Node 20).',
      'Root Node: The root is the topmost node of the tree (e.g. Node 10).',
      'Edge: An edge is the connection between two nodes (e.g. the line connecting 10 and 20).',
      'Parent Node: A parent is a node that has one or more children (e.g. Node 10 is the parent of 20 and 30).',
      'Child Node: A child is a node directly connected below another node (e.g. Node 20 is a child of 10).',
      'Leaf Node: A leaf is a node that has no children (e.g. Nodes 30, 40, and 50).',
      'Internal Node: An internal node is a node that has at least one child (e.g. Nodes 10 and 20).',
      'Degree of Tree: The degree of a tree is the largest number of children any node has (Degree = 2).',
      'Level of Node: The level tells how far a node is from the root. The root is at level 0 (Root 10 is Level 0, 20 & 30 are Level 1).',
      'Height of Tree: The height is the number of edges on the longest path from the root to a leaf (Path 10 → 20 → 40 has 2 edges, Height = 2).',
      'Depth of a Node: The depth is the number of edges from the root to that node (Depth of node 40 is 2).',
      'Subtree: A subtree is a node together with all of its descendants (e.g. the subtree rooted at 20 includes 40 and 50).',
      'Siblings: Siblings are nodes that have the same parent (e.g. 20 & 30 share parent 10; 40 & 50 share parent 20).',
      'Ancestor: An ancestor is a node that comes before another node on the path from the root (e.g. 10 and 20 are ancestors of 40).',
      'Descendant: A descendant is a node that comes below another node in the tree (e.g. 40 and 50 are descendants of 10 and 20).'
    ],
    miniPractice: {
      instruction: 'Test your tree terminology knowledge.',
      question: 'In the tree with root 10, children 20 and 30, and grandchildren 40 and 50 below 20: what are nodes 40 and 50 to node 20?',
      options: [
        'Children and Descendants',
        'Ancestors and Roots',
        'Parents and Subtrees',
        'Siblings of node 10'
      ],
      correctIndex: 0,
      explanation: 'Nodes 40 and 50 are directly connected below node 20, making them children (and descendants) of node 20.',
      hint: 'Look at the direction of connection: are 40 and 50 located above or directly beneath node 20?',
      guidedSolve: {
        steps: [
          {
            stepNumber: 1,
            title: 'Locate the Nodes in the Tree',
            explanation: 'Find node 20. Look at the edges coming out of node 20 going downward toward 40 and 50.',
            nextPrompt: 'Next, classify what a downward connection represents.'
          },
          {
            stepNumber: 2,
            title: 'Determine Parent-Child Relationship',
            explanation: 'Because 40 and 50 are attached directly below 20, node 20 is their Parent, meaning 40 and 50 are Children of 20.',
            nextPrompt: 'Now, check the broader relationship (ancestor vs. descendant).'
          },
          {
            stepNumber: 3,
            title: 'Identify Ancestors vs. Descendants',
            explanation: 'Nodes higher up are Ancestors; all nodes branching beneath a node are its Descendants.',
            nextPrompt: 'Review the final conclusion.'
          }
        ],
        finalAnswer: 'Children and Descendants',
        finalExplanation: 'Nodes 40 and 50 branch directly below node 20, making them children and descendants of node 20.'
      }
    }
  },
  {
    id: 'types',
    index: 3,
    title: '03. Types of Trees',
    shortDescription: 'Learn the three main types of trees: General Tree, Binary Tree, and Binary Search Tree.',
    summary: 'Discover the 3 primary classifications of trees: General Tree, Binary Tree, and Binary Search Tree.',
    readTime: '3 min read',
    difficulty: 'Beginner',
    definition: {
      text: 'Trees are classified into three main types based on their branching factor and structural rules: General Tree, Binary Tree, and Binary Search Tree.',
      highlights: [
        '1. General Tree: A tree where each node can have any number of children (0, 1, 2, 3, or more).',
        '2. Binary Tree: A tree where each node can have at most two children (left child and right child).',
        '3. Binary Search Tree (BST): An ordered binary tree where left child values < parent < right child values.'
      ]
    },
    coreIntuition: {
      analogy: 'Think of organization: a company org chart can have unlimited direct reports (General Tree), a tournament bracket matches pairs (Binary Tree), and a dictionary organizes words in sorted order (BST).',
      explanation: 'General trees allow flexible branching, binary trees restrict branching to at most two paths, and binary search trees add sorted ordering for rapid lookups.',
      points: [
        'General Tree: Unlimited branching per node.',
        'Binary Tree: At most 2 children per node (Left & Right).',
        'Binary Search Tree: Sorted ordering (Left < Node < Right).'
      ]
    },
    keyPoints: [
      'General Tree: A tree data structure where each node can have an arbitrary or unlimited number of children with no fixed limit.',
      'Binary Tree: A tree data structure in which every node can have at most two children (designated as left and right).',
      'Binary Search Tree (BST): A specialized binary tree with an ordering property: all keys in the left subtree are smaller than the node, and all keys in the right subtree are larger.'
    ],
    miniPractice: {
      instruction: 'Identify the main tree type.',
      question: 'Which main tree type allows a single node to have 3, 4, or any arbitrary number of children?',
      options: [
        'General Tree',
        'Binary Tree',
        'Binary Search Tree',
        'Strictly Binary Tree'
      ],
      correctIndex: 0,
      explanation: 'In a General Tree, there is no restriction on the number of children a node can have.',
      hint: 'Think of the general, unrestricted tree structure.',
      guidedSolve: {
        steps: [
          {
            stepNumber: 1,
            title: 'Understand Tree Constraints',
            explanation: 'Binary Trees and BSTs strictly limit each node to at most 2 children.',
            nextPrompt: 'Next, look at the tree classification without child count limits.'
          },
          {
            stepNumber: 2,
            title: 'Identify General Tree Properties',
            explanation: 'A General Tree allows any node to have 0, 1, 2, 3, or any number of children.',
            nextPrompt: 'Review the final conclusion.'
          }
        ],
        finalAnswer: 'General Tree',
        finalExplanation: 'A General Tree places no limit on the number of children a node can branch into.'
      }
    }
  },
  {
    id: 'binary-tree',
    index: 4,
    title: '04. Binary Tree',
    shortDescription: 'Learn how nodes can have up to two children.',
    summary: 'A binary tree is a tree where each node can have at most two children.',
    readTime: '3 min read',
    difficulty: 'Beginner',
    definition: {
      text: 'A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.',
      highlights: [
        'Each node can have a LEFT child, a RIGHT child, both, or neither.',
        'Maximum of 2 children per node.',
        'Nodes with 0 children are leaf nodes.'
      ]
    },
    coreIntuition: {
      analogy: 'Think of a road fork that can split into at most two directions: left and right.',
      explanation: 'By capping the branch count to two, every step you take through the tree is a simple binary choice (left or right).',
      points: [
        '10 → has two children (5 and 15).',
        '5 → has two children (2 and 7).',
        '2, 7 and 15 → are leaf nodes.'
      ]
    },
    keyPoints: [
      'Strictly Binary Tree: A binary tree in which every node has either 0 children or exactly 2 children. No node has exactly one child.',
      'Full Binary Tree: A binary tree in which every node has either 0 children or exactly 2 children. Every parent node splits cleanly into two child branches.',
      'Complete Binary Tree: A binary tree in which every level is completely filled except possibly the last level, and the last level is filled from left to right.',
      'Perfect Binary Tree: A binary tree in which every internal node has exactly 2 children and all leaf nodes are at the same level.',
      'Degenerate Binary Tree: A binary tree in which every parent node has only one child, so the tree behaves like a linear chain.'
    ],
    miniPractice: {
      instruction: 'Analyze the example binary tree.',
      question: 'In a tree where 10 connects to (5, 15) and 5 connects to (2, 7), which nodes are leaves?',
      options: ['10 and 5', '5 and 15', '2, 7, and 15', 'Only 10'],
      correctIndex: 2,
      explanation: 'Nodes 2, 7, and 15 have no children attached below them, so they are leaf nodes.',
      hint: 'A leaf node is at the very end of a branch and has 0 children attached beneath it.',
      guidedSolve: {
        steps: [
          {
            stepNumber: 1,
            title: 'Recall the Definition of a Leaf Node',
            explanation: 'A leaf node (or external node) is any node in the tree that has zero (0) children.',
            nextPrompt: 'Next, inspect which nodes have children.'
          },
          {
            stepNumber: 2,
            title: 'Check Nodes with Children',
            explanation: 'Node 10 has children (5 and 15). Node 5 has children (2 and 7). Thus, 10 and 5 are internal parent nodes.',
            nextPrompt: 'Now, check the remaining nodes without children.'
          },
          {
            stepNumber: 3,
            title: 'Identify the Terminal Nodes',
            explanation: 'Node 15 has no children. Node 2 and node 7 also have no children. Therefore, 2, 7, and 15 are all leaves.',
            nextPrompt: 'Review the final conclusion.'
          }
        ],
        finalAnswer: '2, 7, and 15',
        finalExplanation: 'Nodes 2, 7, and 15 have 0 children attached beneath them, making them leaf nodes.'
      }
    }
  },
  {
    id: 'bst',
    index: 5,
    title: '05. Binary Search Tree',
    shortDescription: 'Learn how a BST keeps values organized.',
    summary: 'A Binary Search Tree (BST) keeps smaller values on the left and larger values on the right.',
    readTime: '3 min read',
    difficulty: 'Beginner',
    definition: {
      text: 'A Binary Search Tree (BST) is an ordered binary tree where all values in the left subtree are smaller than the node, and all values in the right subtree are larger.',
      highlights: [
        'Left Subtree: Contains only values SMALLER than the node.',
        'Right Subtree: Contains only values LARGER than the node.',
        'Fast Searching: Halves the search space at every step.'
      ]
    },
    coreIntuition: {
      analogy: 'Think of looking up a word in a dictionary: you open the middle, and go left if earlier, right if later.',
      explanation: 'At every node, you compare your target number. If smaller, go left; if larger, go right. This cuts the remaining search space in half at each step.',
      points: [
        '01. Compare the value with current node.',
        '02. If Smaller → Go LEFT.',
        '03. If Larger → Go RIGHT.',
        '04. Repeat until the correct position is found.'
      ]
    },
    keyPoints: [
      'BST Invariant: Left Subtree < Current Node < Right Subtree for every node in the tree.',
      'Searching takes O(log N) average time because each comparison eliminates half the remaining tree.',
      'To insert a value, compare from the root and branch left or right until reaching an empty leaf spot.',
      'Performing an Inorder traversal on a BST outputs all values in sorted ascending order.'
    ],
    miniPractice: {
      instruction: 'Trace a BST insertion step.',
      question: 'If the root node is 10 and we want to insert the number 7, which direction do we go?',
      options: [
        'Go LEFT because 7 < 10',
        'Go RIGHT because 7 < 10',
        'Replace 10 with 7',
        'Create a second root'
      ],
      correctIndex: 0,
      explanation: 'In a BST, values smaller than the current node always go to the LEFT subtree (7 is smaller than 10).',
      hint: 'In a Binary Search Tree, compare the value: smaller numbers always branch to one specific side.',
      guidedSolve: {
        steps: [
          {
            stepNumber: 1,
            title: 'Recall the BST Ordering Rule',
            explanation: 'In a Binary Search Tree, for any node: all values in the Left subtree must be smaller, and all values in the Right subtree must be larger.',
            nextPrompt: 'Next, compare the target value with the root.'
          },
          {
            stepNumber: 2,
            title: 'Compare 7 with Root 10',
            explanation: 'We compare 7 against 10. Since 7 is less than 10 (7 < 10), it belongs in the smaller-value partition.',
            nextPrompt: 'Now, pick the matching branch.'
          },
          {
            stepNumber: 3,
            title: 'Select the Direction',
            explanation: 'Since 7 < 10, we must navigate to the LEFT subtree to place 7.',
            nextPrompt: 'Review the final conclusion.'
          }
        ],
        finalAnswer: 'Go LEFT because 7 < 10',
        finalExplanation: 'In a BST, values smaller than the current node always route into the left subtree (7 < 10).'
      }
    }
  },
  {
    id: 'traversals',
    index: 6,
    title: '06. Tree Traversals',
    shortDescription: 'Learn how we visit every node in a tree.',
    summary: 'Traversal means visiting the nodes of a tree in a specific, orderly sequence.',
    readTime: '3 min read',
    difficulty: 'Beginner',
    definition: {
      text: 'Tree traversal is the process of visiting every single node in a tree data structure in a specific, predictable order.',
      highlights: [
        'PREORDER: Root → Left → Right',
        'INORDER: Left → Root → Right',
        'POSTORDER: Left → Right → Root',
        'LEVEL ORDER: Visit nodes level by level from top to bottom.'
      ]
    },
    coreIntuition: {
      analogy: 'Think of touring an exhibition with a specific route map so you visit every single room without getting lost.',
      explanation: 'Because trees branch in multiple directions, traversal algorithms provide strict step-by-step routes so no node is missed.',
      points: [
        'Preorder visits Root first before visiting subtrees.',
        'Inorder visits Left child, then Root, then Right child (produces sorted order in BSTs).',
        'Postorder visits children before visiting the parent.',
        'Level Order visits all nodes on level 0, then level 1, then level 2.'
      ]
    },
    keyPoints: [
      'Traversal means visiting every node in the tree exactly once in a defined order.',
      'Preorder (Root → Left → Right): Processes the parent node before traversing its subtrees.',
      'Inorder (Left → Root → Right): Visits the left subtree, then root, then right subtree (yields sorted order for BST).',
      'Postorder (Left → Right → Root): Processes both child subtrees before visiting their parent.',
      'Level Order (Breadth-First): Traverses the tree horizontally, level by level from top to bottom.'
    ],
    miniPractice: {
      instruction: 'Check traversal order rules.',
      question: 'Which traversal visits the Root node FIRST before visiting its children?',
      options: ['Inorder (Left → Root → Right)', 'Preorder (Root → Left → Right)', 'Postorder (Left → Right → Root)', 'Bottom-Up'],
      correctIndex: 1,
      explanation: 'Preorder traversal visits the Root first: Root → Left → Right.',
      hint: 'The prefix "Pre-" means "before" or "at the very start" (like a prelude or preview).',
      guidedSolve: {
        steps: [
          {
            stepNumber: 1,
            title: 'Understand Traversal Naming',
            explanation: 'Depth-first traversals are named according to when the Root node is processed relative to its left and right subtrees.',
            nextPrompt: 'Next, compare the positions of the Root in each order.'
          },
          {
            stepNumber: 2,
            title: 'Compare Inorder and Postorder',
            explanation: 'Inorder places Root in the middle (Left → Root → Right). Postorder places Root last (Left → Right → Root).',
            nextPrompt: 'Now, identify which order visits Root first.'
          },
          {
            stepNumber: 3,
            title: 'Identify Preorder',
            explanation: 'Preorder puts the Root at the very beginning: Root → Left → Right.',
            nextPrompt: 'Review the final conclusion.'
          }
        ],
        finalAnswer: 'Preorder (Root → Left → Right)',
        finalExplanation: 'Preorder traversal visits the Root first, then the left subtree, then the right subtree.'
      }
    }
  },
  {
    id: 'applications',
    index: 7,
    title: '07. Tree Applications',
    shortDescription: 'See where trees are useful in real life.',
    summary: 'Discover real-world systems and software powered by hierarchical tree data structures.',
    readTime: '3 min read',
    difficulty: 'Beginner',
    definition: {
      text: 'Tree data structures are applied across modern computing whenever information contains a natural hierarchy or demands high-speed organized searching.',
      highlights: [
        'FILE SYSTEMS: Folders and files can be organized like a tree.',
        'SEARCHING: BSTs can help organize values for faster searching.',
        'DATABASES: Tree structures are used to organize and find stored data efficiently.',
        'HTML / DOM: Web pages are represented as connected parent-child elements.',
        'DECISION MAKING: Decision trees can represent choices and possible outcomes.'
      ]
    },
    coreIntuition: {
      analogy: 'From files on your laptop to websites and AI models, trees organize our everyday digital world.',
      explanation: 'Any time items are grouped into folders, structured with parent-child tags, or split into logical decisions, a tree is the underlying data structure.',
      points: [
        'Operating systems organize files and folders as a tree.',
        'Browsers parse HTML tags into a DOM tree.',
        'Databases use trees to find records in milliseconds.',
        'AI algorithms use decision trees to classify data.'
      ]
    },
    keyPoints: [
      'Operating File Systems: Directories, folders, and files form a multi-level hierarchical tree.',
      'HTML DOM in Web Browsers: HTML tags (<head>, <body>, <div>, <p>) are parsed as a parent-child DOM tree.',
      'Database Indexing: B-Trees and BSTs power fast record lookup in modern databases and search engines.',
      'Decision Trees in AI: Machine learning models use tree branching to make accurate predictions and classifications.'
    ],
    miniPractice: {
      instruction: 'Match the tree application.',
      question: 'How does a web browser organize the HTML elements (like <html>, <body>, <div>) of a page?',
      options: ['As a DOM Tree', 'As a flat text list', 'As an unsorted queue', 'As a random graph'],
      correctIndex: 0,
      explanation: 'Web browsers parse HTML tags into a Document Object Model (DOM) tree of parent and child elements.',
      hint: 'HTML tags nest inside one another (like <body> containing <div>), creating parent-child hierarchical levels.',
      guidedSolve: {
        steps: [
          {
            stepNumber: 1,
            title: 'Examine HTML Document Structure',
            explanation: 'Web pages have an outer <html> tag that contains <head> and <body>, which contain nested tags like <header>, <section>, and <p>.',
            nextPrompt: 'Next, analyze how this hierarchy is represented in memory.'
          },
          {
            stepNumber: 2,
            title: 'Recognize the Parent-Child Nesting',
            explanation: 'Each enclosing tag acts as a parent to the tags inside it, forming a tree branching from the top document root.',
            nextPrompt: 'Now, connect this to the official web standard name.'
          },
          {
            stepNumber: 3,
            title: 'Identify the DOM Standard',
            explanation: 'Browsers parse and structure this hierarchy as the Document Object Model (DOM) Tree.',
            nextPrompt: 'Review the final conclusion.'
          }
        ],
        finalAnswer: 'As a DOM Tree',
        finalExplanation: 'Web browsers organize HTML elements as a hierarchical Document Object Model (DOM) tree.'
      }
    }
  }
];

export const TERMINOLOGY_LIST: TerminologyItem[] = [
  {
    id: 'node',
    name: 'Node',
    definition: 'A node is a single item in a tree that stores a value or piece of data.',
    example: 'If a tree contains 10, 20, and 30, each number is stored in a node.',
    highlightCategory: 'node',
    diagramExplanation: 'Each item (10, 20, 30, 40, 50) is stored in a separate node.',
    details: [
      'Basic building block of any tree.',
      'Stores a data value and pointers/links to its children.'
    ]
  },
  {
    id: 'root',
    name: 'Root Node',
    definition: 'The root is the topmost node of a tree. A tree has only one root node.',
    example: 'In a tree where 10 is at the top, 10 is the root.',
    highlightCategory: 'root',
    diagramExplanation: '10 is the root because it is the topmost node.',
    details: [
      'The root is the entry point of the tree.',
      'It has no parent node above it.'
    ]
  },
  {
    id: 'edge',
    name: 'Edge',
    definition: 'An edge is the connection between two nodes.',
    example: 'If 10 is connected to 20, the line between them is an edge.',
    highlightCategory: 'edge',
    diagramExplanation: 'The lines connecting nodes (like 10 → 20 and 10 → 30) are edges.',
    details: [
      'A tree with N nodes always contains exactly N - 1 edges.',
      'Edges represent direct parent-to-child links.'
    ]
  },
  {
    id: 'parent',
    name: 'Parent Node',
    definition: 'A parent is a node that has one or more nodes connected below it.',
    example: 'If 10 is connected to 20 and 30 below it, 10 is their parent.',
    highlightCategory: 'parent-child',
    diagramExplanation: '10 is the parent of 20 and 30. Node 20 is the parent of 40 and 50.',
    details: [
      'A parent sits directly one level above its child nodes.',
      'Every node except the root has exactly one parent.'
    ]
  },
  {
    id: 'child',
    name: 'Child Node',
    definition: 'A child is a node directly connected below another node.',
    example: 'If 20 is below 10, then 20 is a child of 10.',
    highlightCategory: 'parent-child',
    diagramExplanation: '20 is a child of 10. Also, 40 and 50 are children of 20.',
    details: [
      'Connected directly below a parent node.',
      'In a binary tree, children are called left child and right child.'
    ]
  },
  {
    id: 'leaf',
    name: 'Leaf Node',
    definition: 'A leaf is a node that has no children.',
    example: 'If 20 has nothing connected below it, 20 is a leaf node.',
    highlightCategory: 'leaf',
    diagramExplanation: '40, 50, and 30 are leaf nodes because they have no children.',
    details: [
      'Also known as an external node or terminal node.',
      'Degree of a leaf node is always 0.'
    ]
  },
  {
    id: 'internal',
    name: 'Internal Node',
    definition: 'An internal node is a node that has at least one child. It is not a leaf node.',
    example: 'If 10 has children 20 and 30, then 10 is an internal node.',
    highlightCategory: 'internal',
    diagramExplanation: '10 and 20 are internal nodes because each has at least one child.',
    details: [
      'Any non-leaf node in the tree.',
      'Includes the root if the tree has more than 1 node.'
    ]
  },
  {
    id: 'degree',
    name: 'Degree of a Tree',
    definition: 'The degree of a tree is the largest number of children that any single node has.',
    example: 'If the node with the most children has 3 children, the degree of the tree is 3.',
    highlightCategory: 'degree',
    diagramExplanation: 'Node 10 has 2 children and node 20 has 2 children. The degree of this tree is 2.',
    details: [
      'Degree of a node = count of its children.',
      'Degree of a binary tree is at most 2.'
    ]
  },
  {
    id: 'level',
    name: 'Level of a Node',
    definition: 'The level tells us how far a node is from the top of the tree.',
    example: 'If 10 is the root, then its children 20 and 30 are at Level 1.',
    highlightCategory: 'depth',
    diagramExplanation: '10 → Level 0 | 20, 30 → Level 1 | 40, 50 → Level 2',
    details: [
      'Root is at Level 0.',
      'Its children are at Level 1.',
      'Their children (grandchildren) are at Level 2.'
    ]
  },
  {
    id: 'height',
    name: 'Height of a Tree',
    definition: 'The height of a tree is the number of edges in the longest path from the root to a leaf.',
    example: 'If the longest path from the root to a leaf contains 3 edges, the tree has height 3.',
    highlightCategory: 'height',
    diagramExplanation: 'Longest path: 10 → 20 → 40 contains 2 edges, so the tree height is 2.',
    details: [
      'Count the number of edges in the longest root-to-leaf path.',
      'Height of this 3-level tree is 2.'
    ]
  },
  {
    id: 'depth',
    name: 'Depth of a Node',
    definition: 'The depth of a node is the number of edges from the root to that node.',
    example: 'The root has depth 0. A child of the root has depth 1. A grandchild has depth 2.',
    highlightCategory: 'depth',
    diagramExplanation: '10 → Depth 0 | 20, 30 → Depth 1 | 40, 50 → Depth 2',
    details: [
      'Root has depth 0.',
      'Depth increases by 1 for each step down from the root.'
    ]
  },
  {
    id: 'subtree',
    name: 'Subtree',
    definition: 'A subtree is a smaller tree formed from a node and all of its descendants.',
    example: 'If we choose node 20 and include everything below 20, that group forms a subtree.',
    highlightCategory: 'subtree',
    diagramExplanation: 'This is a subtree because it contains node 20 and everything below it (40 and 50).',
    details: [
      'Every node can act as the root of its own subtree.',
      'Subtrees preserve all original child connections.'
    ]
  },
  {
    id: 'siblings',
    name: 'Siblings',
    definition: 'Siblings are nodes that have the same parent.',
    example: 'If 20 and 30 both have 10 as their parent, 20 and 30 are siblings.',
    highlightCategory: 'sibling',
    diagramExplanation: '20 and 30 are siblings because they have the same parent (10). 40 and 50 are also siblings (parent 20).',
    details: [
      'Nodes with the exact same parent.',
      'Always sit at the same level.'
    ]
  },
  {
    id: 'ancestor',
    name: 'Ancestor',
    definition: 'An ancestor is any node that comes above another node in the path to the root.',
    example: 'If 10 → 20 → 40, then 10 and 20 are ancestors of 40.',
    highlightCategory: 'ancestor',
    diagramExplanation: '10 and 20 are ancestors of 40 because they lie on the path above 40 to the root.',
    details: [
      'Includes parent, grandparent, up to the root.',
      'The root is an ancestor to every other node in the tree.'
    ]
  },
  {
    id: 'descendant',
    name: 'Descendant',
    definition: 'A descendant is any node that comes below another node.',
    example: 'If 10 → 20 → 40, then 20 and 40 are descendants of 10.',
    highlightCategory: 'descendant',
    diagramExplanation: '40 and 50 are descendants of 20. Nodes 20, 30, 40, and 50 are all descendants of 10.',
    details: [
      'Includes children, grandchildren, and all lower connected nodes.',
      'Leaf nodes have no descendants.'
    ]
  }
];

export const TREE_MAIN_TYPES_LIST: TreeTypeItem[] = [
  {
    id: 'general',
    name: 'General Tree',
    definition: 'A tree data structure where each node can have an arbitrary or unlimited number of children (0, 1, 2, 3, or more).',
    rule: 'Nodes can have any number of child nodes. No maximum child limit.',
    example: 'Root 10 connects to 3 children (20, 30, 40). Node 20 connects to (50, 60, 70).',
    properties: [
      'Unrestricted branching factor per node.',
      'Commonly used in File Systems, XML/HTML DOM trees, and Organization hierarchies.'
    ]
  },
  {
    id: 'binary',
    name: 'Binary Tree',
    definition: 'A tree data structure in which every node can have at most two children, referred to as the left child and right child.',
    rule: 'Every node has at most 2 children (0, 1, or 2 children).',
    example: 'Root 10 connects to left child 20 and right child 30. Node 20 connects to 40 and 50.',
    properties: [
      'Strict branch limit of ≤ 2 children per parent.',
      'Children are strictly distinguished as Left child and Right child.'
    ]
  },
  {
    id: 'bst',
    name: 'Binary Search Tree (BST)',
    definition: 'An ordered binary tree where all values in the left subtree are smaller than the node, and all values in the right subtree are larger.',
    rule: 'Left Subtree < Node Value < Right Subtree for every node in the tree.',
    example: 'Root 50 connects to left child 30 (with 20, 40) and right child 70 (with 60, 80).',
    properties: [
      'Maintains sorted order across all nodes.',
      'Provides fast O(log N) average search, insertion, and deletion.'
    ]
  }
];

export const BINARY_TREE_TYPES_LIST: TreeTypeItem[] = [
  {
    id: 'strictly',
    name: 'Strictly Binary Tree',
    definition: 'Every node has either zero (0) or exactly two (2) children.',
    rule: 'Every node has 0 or 2 children. No node has only 1 child.',
    example: 'Root 10 connects to 5 and 15 (both leaves with 0 children).',
    properties: [
      'Nodes with degree 1 are strictly forbidden.',
      'Leaves have 0 children, parents have 2 children.'
    ]
  },
  {
    id: 'full',
    name: 'Full Binary Tree',
    definition: 'A binary tree in which every node has either 0 or 2 children.',
    rule: 'Every parent node splits into both left and right children.',
    example: 'Root 10 has children (5, 15), and 5 has children (2, 7). All leaves have 0 children.',
    properties: [
      'No node has a single child.',
      'Number of leaf nodes = internal nodes + 1.'
    ]
  },
  {
    id: 'complete',
    name: 'Complete Binary Tree',
    definition: 'All levels are completely filled except possibly the last, which is filled from left to right.',
    rule: 'Levels 0 to h-1 are fully packed, and level h is filled strictly left-to-right.',
    example: 'Root 10 has children 5 and 15. Node 5 has children 2 and 7; Node 15 has left child 12.',
    properties: [
      'Filled sequentially without gaps on the left.',
      'Ideal topology for Array representation / Binary Heaps.'
    ]
  },
  {
    id: 'perfect',
    name: 'Perfect Binary Tree',
    definition: 'Every internal node has exactly two children and all leaf nodes are at the same level.',
    rule: 'Completely filled pyramid where all leaves are at the exact same depth.',
    example: 'Root 10 has children 5 and 15. Level 2 has leaves 2, 7, 12, 18.',
    properties: [
      'Total nodes = 2^(h+1) - 1.',
      'Leaf count = 2^h sitting on the bottom level.'
    ]
  },
  {
    id: 'degenerate',
    name: 'Degenerate Binary Tree',
    definition: 'Each node has only one child, so the tree looks like a single line or linked list.',
    rule: 'Every internal node has exactly 1 child.',
    example: '10 → 20 → 30 → 40 (forms a straight chain).',
    properties: [
      'Height equals N - 1 (maximum height for N nodes).',
      'Operations degrade to O(N) linear time.'
    ]
  }
];

export const TREE_TYPES_LIST: TreeTypeItem[] = TREE_MAIN_TYPES_LIST;

export const TRAVERSALS_LIST: TraversalTypeItem[] = [
  {
    id: 'preorder',
    name: 'Preorder',
    orderFormula: 'Root → Left → Right',
    description: 'Visit the root node first, then traverse the left subtree, then the right subtree.',
    mnemonic: 'PRE = Root comes first.',
    algorithmSteps: [
      '1. Visit/process the current node.',
      '2. Traverse left subtree.',
      '3. Traverse right subtree.'
    ]
  },
  {
    id: 'inorder',
    name: 'Inorder',
    orderFormula: 'Left → Root → Right',
    description: 'Traverse the left subtree, visit the root node in between, then traverse the right subtree.',
    mnemonic: 'IN = Root in the middle (gives sorted values in BST).',
    algorithmSteps: [
      '1. Traverse left subtree.',
      '2. Visit/process the current node.',
      '3. Traverse right subtree.'
    ]
  },
  {
    id: 'postorder',
    name: 'Postorder',
    orderFormula: 'Left → Right → Root',
    description: 'Traverse the left subtree, traverse the right subtree, and visit the root node last.',
    mnemonic: 'POST = Root comes last (bottom-up processing).',
    algorithmSteps: [
      '1. Traverse left subtree.',
      '2. Traverse right subtree.',
      '3. Visit/process current node.'
    ]
  },
  {
    id: 'levelorder',
    name: 'Level Order',
    orderFormula: 'Level by Level',
    description: 'Visit all nodes level by level from top to bottom, left to right.',
    mnemonic: 'BFS = Breadth-First Search level by level.',
    algorithmSteps: [
      '1. Start at Root (Level 0).',
      '2. Visit all Level 1 nodes from left to right.',
      '3. Repeat for next levels.'
    ]
  }
];

export const BST_OPERATIONS: BSTOperationItem[] = [
  {
    id: 'concept',
    name: 'BST Concept',
    title: 'Binary Search Tree Ordering Property',
    explanation: 'A Binary Search Tree is a binary tree where every node satisfies: all keys in its left subtree are strictly LESS, and all keys in its right subtree are strictly GREATER.',
    rules: [
      'LeftSubtree < Node.value',
      'RightSubtree > Node.value',
      'Inorder traversal gives sorted order.'
    ],
    complexity: { average: 'O(log N)', worst: 'O(N)' }
  },
  {
    id: 'searching',
    name: 'Searching in BST',
    title: 'Searching for a Key in a BST',
    explanation: 'Compare the target value with the current node: if smaller go left, if larger go right.',
    rules: [
      'If target == curr.val → Found!',
      'If target < curr.val → Go Left',
      'If target > curr.val → Go Right'
    ],
    complexity: { average: 'O(log N)', worst: 'O(N)' }
  },
  {
    id: 'insertion',
    name: 'Insertion in BST',
    title: 'Inserting a Key into a BST',
    explanation: 'Traverse left or right based on value comparison until reaching an empty spot to attach the new node.',
    rules: [
      'Smaller values go left',
      'Larger values go right',
      'Attach new node at leaf position'
    ],
    complexity: { average: 'O(log N)', worst: 'O(N)' }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topicId: 'basics',
    question: 'How many edges does a valid tree with 10 nodes contain?',
    options: ['10 edges', '9 edges', '11 edges', '5 edges'],
    correctAnswerIndex: 1,
    explanation: 'A fundamental property of any valid tree with N nodes is that it contains exactly N - 1 edges (10 - 1 = 9).'
  },
  {
    id: 'q2',
    topicId: 'basics',
    question: 'What distinguishes a Tree from a general Graph?',
    options: [
      'A tree has weights on edges',
      'A tree is hierarchical and cannot contain any closed cycles or loops',
      'A tree must always have 3 children per node',
      'A tree allows multiple root nodes'
    ],
    correctAnswerIndex: 1,
    explanation: 'Trees are connected acyclic graphs with a designated single root. The presence of any closed loop/cycle makes it a graph, not a tree.'
  },
  {
    id: 'q3',
    topicId: 'terminology',
    question: 'Which of the following is true about a Leaf Node?',
    options: [
      'It has degree equal to 2',
      'It is the parent of the root',
      'It has exactly 0 children',
      'Its depth is always 0'
    ],
    correctAnswerIndex: 2,
    explanation: 'A leaf node is a terminal node with no children.'
  },
  {
    id: 'q4',
    topicId: 'terminology',
    question: 'What is the Depth of the Root node in standard 0-indexed terminology?',
    options: ['0', '1', '-1', 'Equal to the number of leaves'],
    correctAnswerIndex: 0,
    explanation: 'Depth is the number of edges from the root to a node. Since the root is 0 edges from itself, Depth(Root) = 0.'
  },
  {
    id: 'q5',
    topicId: 'types',
    question: 'In a Binary Tree, how many children can each node have at most?',
    options: ['Only 1 child', 'At most 2 children', 'At least 3 children', 'Any number of children'],
    correctAnswerIndex: 1,
    explanation: 'In a Binary Tree, each node can have at most two children (0, 1, or 2).'
  },
  {
    id: 'q6',
    topicId: 'binary-tree',
    question: 'In a Binary Tree, what are the two children traditionally called?',
    options: ['First and Second Child', 'Left Child and Right Child', 'Top Child and Bottom Child', 'Alpha and Beta Child'],
    correctAnswerIndex: 1,
    explanation: 'In a binary tree, the two child positions are designated the Left Child and Right Child.'
  },
  {
    id: 'q7',
    topicId: 'bst',
    question: 'In a Binary Search Tree (BST), where are values smaller than the current node placed?',
    options: ['In the Left subtree', 'In the Right subtree', 'At the Root', 'Randomly'],
    correctAnswerIndex: 0,
    explanation: 'In a BST, all keys in the left subtree are strictly smaller than the node value.'
  },
  {
    id: 'q8',
    topicId: 'traversals',
    question: 'Which traversal of a Binary Search Tree (BST) produces the elements in strictly ASCENDING sorted order?',
    options: ['Preorder', 'Inorder', 'Postorder', 'Level Order'],
    correctAnswerIndex: 1,
    explanation: 'Because Inorder visits (Left → Root → Right), it visits all smaller elements first, then the root, then larger elements, producing sorted order.'
  },
  {
    id: 'q9',
    topicId: 'traversals',
    question: 'Which traversal visits the Root node FIRST: Root → Left → Right?',
    options: ['Preorder', 'Inorder', 'Postorder', 'Level Order'],
    correctAnswerIndex: 0,
    explanation: 'Preorder traversal processes the Root first, followed by left and right subtrees.'
  },
  {
    id: 'q10',
    topicId: 'applications',
    question: 'How do web browsers represent the HTML document elements (<html>, <body>, <div>)?',
    options: [
      'As a Document Object Model (DOM) Tree',
      'As a flat array of strings',
      'As a simple hash map',
      'As an unsorted linked list'
    ],
    correctAnswerIndex: 0,
    explanation: 'Browsers parse HTML markup into a hierarchical Document Object Model (DOM) tree structure.'
  }
];
