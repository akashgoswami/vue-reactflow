import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

React;
const isValidSourceConnection = (connection) => {
  console.log(connection);
  return true
};

const isValidDestConnection = (connection) => {
  console.log(connection);
  return true
};
export default memo(({ data, isConnectable }) => {
  return (
    <div className="testNode">
      <Handle
        type="target"
        position="left"
        data={data}
        style = { { background: '#blue' } }
        isValidConnection ={isValidSourceConnection}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        Test
      </div>
      <Handle
        type="source"
        position="right"
        id="b"
        isValidConnection ={isValidDestConnection}
        style={{  background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
