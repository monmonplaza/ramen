import React, { useState, useEffect } from "react";

function MyComponent() {
  const [groupedData, setGroupedData] = useState({});

  const data = [
    { id: 1, category: "Fruit", name: "Apple" },
    { id: 2, category: "Fruit", name: "Banana" },
    { id: 3, category: "Vegetable", name: "Carrot" },
    { id: 4, category: "Fruit", name: "Orange" },
    { id: 5, category: "Vegetable", name: "Spinach" },
  ];

  useEffect(() => {
    // Grouping data by the `category` key
    const grouped = data.reduce((acc, item) => {
      const key = item.category;
      if (!acc[key]) {
        acc[key] = []; // Initialize array if it doesn't exist
      }
      acc[key].push(item); // Add item to the relevant category
      return acc;
    }, {});

    setGroupedData(grouped);
  }, []); // Run only once on mount

  console.log(groupedData);

  return (
    <div>
      <h2>Grouped Data</h2>
      {Object.keys(groupedData).map((key) => (
        <div key={key}>
          <h3>{key}</h3>
          <ul>
            {groupedData[key].map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
