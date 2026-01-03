import React from 'react';

const CustomDateDescription = (props) => {
  return (
    <div>
      {props.item.description && (
        <div className="small mb-2 dates-info">
          {props.item.description}
        </div>
      )}
    </div>
  );
};

export default CustomDateDescription;

