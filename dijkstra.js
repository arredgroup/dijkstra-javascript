
// Labels contains all visited node with their accumulated distance and previous node
const labels = {};

// Dijkstra algorithm

const node = {
    'A': [
        { 'B': 3, },
        { 'C': 1, }
    ],
    'B': [
        { 'A': 3, },
        { 'G': 5, },
        { 'D': 1, }
    ],
    'C': [
        { 'A': 1, },
        { 'F': 5, },
        { 'D': 2, }
    ],
    'D': [
        { 'B': 1, },
        { 'C': 2, },
        { 'F': 2, },
        { 'E': 4, }
    ],
    'E': [
        { 'G': 2, },
        { 'H': 1, },
        { 'D': 4, }
    ],
    'F': [
        { 'C': 5, },
        { 'H': 3, },
        { 'D': 2, }
    ],
    'G': [
        { 'B': 5, },
        { 'E': 2, }
    ],
    'H': [
        { 'F': 3, },
        { 'E': 1, }
    ]
};

const setLabels = (key) => {
    if (Object.keys(labels).length === 0) {
        labels[key] = {
            distance: 0,
            previousNode: null
        }
    }
    for (const child of node[key]) {
        const childKey = Object.keys(child)[0];
        const distance = child[childKey];
        let mustContinue = true;
        if (!labels[childKey]) {
            labels[childKey] = {
                distance: labels[key].distance + distance,
                previousNode: key
            }
        } else {
            if (labels[childKey].distance > labels[key].distance + distance) {
                labels[childKey] = {
                    distance: labels[key].distance + distance,
                    previousNode: key
                }
            } else {
                mustContinue = false;
            }
        }
        if (mustContinue) {
            setLabels(childKey);
        }
    }
}

const dijkstra = (start, end) => {
    setLabels(start);
    const path = [];
    let current = end;
    while (current) {
        path.unshift(current);
        current = labels[current].previousNode;
    }
    return path;
}

console.log(dijkstra('A', 'H'));