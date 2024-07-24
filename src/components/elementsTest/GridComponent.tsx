// GridComponent.tsx
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ToggleButtons from './ToggleButtons';
import RightColumn from './RightColumn';
import './GridComponent.css'; // Se hai stili personalizzati

const GridComponent: React.FC = () => {
  const [styleToggle1, setStyleToggle1] = useState<boolean[]>([false, false, false]);
  const [styleToggle2, setStyleToggle2] = useState<boolean[]>([false, false, false]);

  const toggleStyle1 = (index: number) => {
    const newStyleToggle = [...styleToggle1];
    newStyleToggle[index] = !newStyleToggle[index];
    setStyleToggle1(newStyleToggle);
  };

  const toggleStyle2 = (index: number) => {
    const newStyleToggle = [...styleToggle2];
    newStyleToggle[index] = !newStyleToggle[index];
    setStyleToggle2(newStyleToggle);
  };

  const getStyle1 = (index: number) => (styleToggle1[index] ? 'active1' : 'inactive1');
  const getStyle2 = (index: number) => (styleToggle2[index] ? 'active2' : 'inactive2');

  return (
    <Grid container spacing={2}>
      {[0, 1, 2].map((rowIndex) => (
        <Grid item xs={12} key={rowIndex}>
          <Grid container>
            <Grid item xs={2}>
              <ToggleButtons
                onToggleStyle1={() => toggleStyle1(rowIndex)}
                onToggleStyle2={() => toggleStyle2(rowIndex)}
                isStyle1Active={styleToggle1[rowIndex]}
                isStyle2Active={styleToggle2[rowIndex]}
              />
            </Grid>
            <Grid item xs={10}>
              <RightColumn
                style1={getStyle1(rowIndex)}
                style2={getStyle2(rowIndex)}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridComponent;