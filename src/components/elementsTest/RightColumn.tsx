// RightColumn.tsx
import React from 'react';

interface RightColumnProps {
  style1: string;
  style2: string;
}

const RightColumn: React.FC<RightColumnProps> = ({ style1, style2 }) => {
  return (
    <div className={`${style1} ${style2}`} style={{color:'black'}}>
      {`Contenuto della colonna di destra`}
    </div>
  );
};

export default RightColumn;