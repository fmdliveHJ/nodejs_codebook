import axios from 'axios';
import { useEffect, useState } from 'react';
import './app.css';
function App() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(0);

  /**
   * 1. data를 삭제하고 리스트를 바로 적용하려면 useEffect에 data를 넣어주어야함
   * 1-1. data에 입력을해서 수정을 하는 순간 data의 리스트가 입력되서 바로 데이터베이스의 리스트를 불러옴 그래서 수정이 안됨
   * 2. 저장버튼을 눌러서 mysql 에 있는 내용에 수정된 내용을 보내야함
   */

  useEffect(() => {
    dataList();
  }, []);

  const dataList = () => {
    axios
      .get('http://localhost:3001')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e, index, type) => {
    setData(
      data.map((item, idx) => {
        return idx === index ? { ...item, [type]: e } : item;
      })
    );
  };

  const onEditClick = (index) => {
    editClick(index);
  };

  const editClick = (index) => {
    for (let i = 0; i < data.length; i++) {
      if (index === i) {
        setEdit(i);
      }
    }
  };

  const onDeleteClick = (id) => {
    const url = `http://localhost:3001/${id} `;
    console.log(url);
    axios.delete(url).then((res) => {
      if (res) {
        setData(
          data.map((item, idx) => {
            return idx === id ? item.filter((data) => data.index !== id) : item;
          })
        );
      }
    });
  };

  //저장 put 기능
  const onPutHandler = (id) => {
    const url = `http://localhost:3001/${id} `;
    axios
      .put(url, {
        id: 'id',
        name: 'name',
        ko: 'ko',
        en: 'en',
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubminClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className='App'>
      <form onSubmit={onSubminClick}>
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
                <td>{el.id}</td>
                <td>
                  {edit === idx ? (
                    <input
                      type='text'
                      value={el.ko}
                      onChange={(e) => handleChange(e.target.value, idx, 'ko')}
                    />
                  ) : (
                    <span>{el.ko}</span>
                  )}
                </td>
                <td>
                  {edit === idx ? (
                    <input
                      type='text'
                      value={el.en}
                      onChange={(e) => handleChange(e.target.value, idx, 'en')}
                    />
                  ) : (
                    <span>{el.en}</span>
                  )}
                </td>
                <td>
                  <button onClick={() => onEditClick(idx)}>수정</button>
                </td>
                <td>
                  <button onClick={() => onDeleteClick(el.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px' }}>
          <button type='submit'>저장</button>
        </div>
      </form>
    </div>
  );
}

export default App;
