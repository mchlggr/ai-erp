import { Handle, Position } from '@xyflow/react';
import React from 'react';

export function EndNode() {
  return (
    <div className='w-12 h-12 bg-white border-2 border-black rounded-full relative'>
      <div className='w-7 h-7 bg-black rounded-full relative m-2'></div>
      <Handle
        type='target'
        position={Position.Top}
        id='a'
        style={{ background: '#555' }}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='b'
        style={{ background: '#555' }}
      />
    </div>);
}

export default EndNode;
