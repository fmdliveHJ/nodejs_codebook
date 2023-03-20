import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState([]);

  axios
    .get('http://localhost:3001/api/members')
    .then((res) => {
      setData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className='App'>
      <ul>
        {data.map((el, idx) => (
          <li key={idx} style={{ listStyle: 'none' }}>
            <span>{el.ko}</span>
            <span>{el.en}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
