import React, { useState } from 'react';

export default function LearnDesc() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [peekValue, setPeekValue] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const showTemporaryAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const enqueue = () => {
    if (inputValue) {
      const value = !isNaN(Number(inputValue)) ? Number(inputValue) : inputValue;
      const newQueue = [...queue,value].sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return a-b;
        }
        return String(b).localeCompare(String(a));
      });
      setQueue(newQueue);
      setInputValue('');
      showTemporaryAlert('Element enqueued successfully!');
    } else {
      showTemporaryAlert('Please enter a value first');
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const removed = queue[0];
      setQueue(queue.slice(1));
      showTemporaryAlert(`Dequeued element: ${removed}`);
    } else {
      showTemporaryAlert('Queue is empty!');
    }
  };

  const peek = () => {
    if (queue.length > 0) {
      setPeekValue(queue[0]);
      setTimeout(() => setPeekValue(null), 3000);
    } else {
      showTemporaryAlert('Queue is empty!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enqueue();
    }
  };

  return (
    <div className="w-full p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Learn Priority Queue
        </h1>
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <p className="text-gray-700 leading-relaxed">
          A priority queue is a data structure similar to a queue, but each element has an associated priority.
The elements with higher priority are dequeued before those with lower priority.
If two elements have the same priority, they are dequeued according to their order of insertion.
You can think of it as a sorted queue.
In Java, A Priority Queue is in Ascending order in default
In C++, A Priority Queue is in Descending order in default
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-purple-50 p-4 rounded-lg">
  <h3 className="font-semibold text-purple-700 mb-2">Key Operations</h3>
  <ul className="space-y-2 text-sm">
    <li className="flex items-center gap-2">
      <span>🔽</span>
      <span>Enqueue: Add element with priority</span>
    </li>
    <li className="flex items-center gap-2">
      <span>🔼</span>
      <span>Dequeue: Remove highest priority element</span>
    </li>
    <li className="flex items-center gap-2">
      <span>👁️</span>
      <span>Peek: View highest priority element</span>
    </li>
    <li className="flex items-center gap-2">
      <span>❓</span> {/* You can choose a different icon based on your preference */}
      <span>isEmpty: Checks if the priority queue is empty.</span>
    </li>
    <li className="flex items-center gap-2">
      <span>🔢</span> {/* You can choose a different icon based on your preference */}
      <span>Size: Returns the number of elements currently in the priority queue.</span>
    </li>
  </ul>
</div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Time Complexity</h3>
              <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                  <span className='font-bold'>Operation</span>
                  <span  className='font-bold'>Time Complexity</span>
                </div>  
                <div className="flex justify-between items-center">
                  <span className='font semibold'>Insertion</span>
                  <code className="bg-blue-100 px-2 py-1 rounded">O(log n)</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className='font semibold'>Deletion</span>
                  <code className="bg-blue-100 px-2 py-1 rounded">O(1)</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Queue Section */}
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl">Interactive Demo</h2>
        {/* Queue Visualization */}
        <div className="space-y-2 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Queue Contents:</h2>
          <div className="flex flex-wrap gap-3 min-h-[80px] bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200">
            {queue.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg flex items-center justify-center min-w-[70px] shadow-lg transform hover:scale-105 transition-transform"
              >
                {item}
              </div>
            ))}
            {queue.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Queue is empty
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter element to append"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={enqueue}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex-1 sm:flex-none"
              >
                Enqueue
              </button>
              <button
                onClick={dequeue}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
              >
                Dequeue
              </button>
              <button
                onClick={peek}
                className="px-4 py-2 border border-purple-500 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex-1 sm:flex-none"
              >
                Peek
              </button>
            </div>
          </div>

          {/* Alerts */}
          {showAlert && (
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg flex items-center space-x-2">
              <span role="alert">⚠️</span>
              <span>{alertMessage}</span>
            </div>
          )}

          {peekValue !== null && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-center space-x-2">
              <span>👁️</span>
              <span>
                Front element: <span className="font-semibold">{peekValue}</span>
              </span>
            </div>
          )}

          {/* Queue Information */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="text-sm space-y-2">
              <p className="font-semibold text-gray-700">Queue Size:</p>
              <div className="font-mono bg-white px-3 py-2 rounded-lg shadow-sm border">
                {queue.length}
              </div>
            </div>
            <div className="text-sm space-y-2">
              <p className="font-semibold text-gray-700">Is Empty:</p>
              <div className="font-mono bg-white px-3 py-2 rounded-lg shadow-sm border">
                {queue.length === 0 ? 'true' : 'false'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syntax Comparison */}
      <div className="grid grid-cols-2 gap-6 max-w-[90%] mx-auto">
      <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2 text-blue-700">Java Example:</h4>
          <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
            {`// declare a empty priority queue
PriorityQueue<Integer> queue = new PriorityQueue<>(); // ascending order
PriorityQueue<Integer> queue = new PriorityQueue<>(Collections.reverseOrder()); // descending order

    
// add an element to the back
queue.add(value); // automatically gets placed in its sorted position

// obtain the first element of the queue (in sorted order)
int val = queue.peek();

// obtain the first element of the queue (in sorted order) and pop it out
int val = queue.poll();

// check if queue is empty or not
boolean flag = queue.isEmpty();

// find size of the queue
int size = queue.size();`}

          </pre>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2 text-blue-700">C++ Example:</h4>
          <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
            {`// declare a empty queue
priority_queue<int> q; // descending order
priority_queue<int, vector<int>, greater<int>> q; //ascending order
// vector<int> specifices type of list in queue, greater<int> specificies reverse order

// add an element to the back
q.push(value);    

// obtain the front element of the queue (first element in sorted order)
int val = q.top();

//pop the first element out
q.pop();

// check if queue is empty or not
bool flag = q.empty();

// find size of the queue
int size = q.size();`}

          </pre>
        </div>
      </div>
 

{/*    
      <div className="bg-white p-4 rounded-lg shadow max-w-[70%] mx-auto">
        <h4 className="font-semibold mb-2 text-purple-700">Learn More:</h4>
        <iframe
          className="w-full aspect-video rounded-lg"
          src="https://www.youtube.com/embed/HSvPm1QlftE"
          title="Priority Queue Explanation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}
    </div>
    
  );
}
