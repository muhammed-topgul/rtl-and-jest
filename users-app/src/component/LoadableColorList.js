import React, {useEffect, useState} from 'react';

function fakeFetchColors() {
    return Promise.resolve(["red", "green", "blue"]);
}

const LoadableColorList = () => {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        fakeFetchColors()
            .then(setColors);
    }, []);

   const renderedColors = colors.map(color => {
       return <li key={color}>{color}</li>
   });

    return (
        <ul>{renderedColors}</ul>
    );
};

export default LoadableColorList;