import { Handle, Position } from '@xyflow/react';
import React from 'react';

export function StartNode() {
  return (
    <div className='w-12 h-12 bg-white border-2 border-black rounded-full relative'>
      <Handle
        type='source'
        position={Position.Bottom}
        id='b'
        style={{ background: '#555' }}
      />
    </div>);
}

export default StartNode;
