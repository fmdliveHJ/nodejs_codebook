import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e, index, type) => {
    setData(
      data.map((item, idx) => {
        return idx === index ? { ...item, [type]: e } : item;
      })
    );
  };
  /**
   * react 수정 및 삭제 버튼을 사용해서 mysql의 데이터를 수정 및 삭제
   *
   */
  return (
    <div className='App'>
      <table border='1'>
        <thead>
          <tr>
            <th>목록</th>
            <th>한글</th>
            <th>영어</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, idx) => (
            <tr key={idx} style={{ listStyle: 'none' }}>
              <td>{el.name}</td>
              <td>
                <input
                  type='text'
                  value={el.ko}
                  onChange={(e) => handleChange(e.target.value, idx, 'ko')}
                />
              </td>
              <td>
                <input
                  type='text'
                  value={el.en}
                  onChange={(e) => handleChange(e.target.value, idx, 'en')}
                />
              </td>
              <td>수정</td>
              <td>삭제</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
