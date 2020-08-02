// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];                 //created an array to keep track of visited nodes
    startNode.distance = 0;                         // distance of the start node is kept zero to begin with
    const unvisitedNodes = getAllNodes(grid);       //gets all the remaining nodes
    while (!!unvisitedNodes.length) {               // for all the unvisited nodes, 
      sortNodesByDistance(unvisitedNodes);          // sort all the unvisited nodes
      const closestNode = unvisitedNodes.shift();   //pop the value from the front of the array (nodes with the least value)
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;             //boolean value taken for obstacles that is set to false in findPath.jsx
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;        //distance is set to infinity in findPath.jsx
      closestNode.isVisited = true;                                             //make isvisited defined in findPath.jsx true
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;               //if finish node is encountered
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid) {                           //add every node visited +1 value in its previous node
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {                          //get neighbours in all the four directions
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);  //adds value to the array
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }