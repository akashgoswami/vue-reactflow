import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

React;
const isValidSourceConnection = (connection) => {
    connection;
    //console.log(connection);
    return true
};

const isValidDestConnection = (connection) => {
    connection;
    //console.log(connection);
    return true
};
export default memo(({ data, isConnectable }) => {
    return (
        <div className="conditionNode">
      <Handle
        type="target"
        position="left"
        data={data}
        isValidConnection ={isValidSourceConnection}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        Condition
      </div>
      <Handle
        type="source"
        position="right"
        id="b"
        isValidConnection ={isValidDestConnection}
        isConnectable={isConnectable}
      />
    </div>
    );
});
