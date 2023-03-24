import axios from 'axios';
import { useEffect, useState } from 'react';
import './app.css';
function App() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [listState, setListState] = useState(false);

  useEffect(() => {
    dataList();
  }, [listState]);

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
    setListState(true);
  };

  const onSaveClick = (e) => {
    const url = `http://localhost:3001/${e.id} `;
    console.log(e);
    axios.put(url, e).then((res) => {
      if (res) {
        console.log(res);
      }
    });
    setListState(true);
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
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} style={{ listStyle: 'none' }}>
                <td>{item.name}</td>
                <td>
                  {edit === idx ? (
                    <input
                      type='text'
                      value={item.ko}
                      onChange={(e) => handleChange(e.target.value, idx, 'ko')}
                    />
                  ) : (
                    <span>{item.ko}</span>
                  )}
                </td>
                <td>
                  {edit === idx ? (
                    <input
                      type='text'
                      value={item.en}
                      onChange={(e) => handleChange(e.target.value, idx, 'en')}
                    />
                  ) : (
                    <span>{item.en}</span>
                  )}
                </td>
                <td>
                  <button onClick={() => onEditClick(idx)}>수정</button>

                  {edit === idx ? (
                    <span>
                      <button onClick={() => onSaveClick(item)}>저장</button>
                      <button onClick={() => onDeleteClick(item.id)}>
                        삭제
                      </button>
                    </span>
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default App;
