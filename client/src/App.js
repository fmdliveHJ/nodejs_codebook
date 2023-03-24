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

  const onDeleteClick = (e, item) => {
    e.preventDefault();
    const url = `http://localhost:3001/${item.name} `;
    console.log(url);
    axios.delete(url).then((res) => {
      if (res) {
        const result = data.filter((data) => data.name !== item.name);
        setData(result);
      }
      setListState(true);
    });
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
        <div className='table'>
          <h2>코드북</h2>
          <div className='table-warpper'>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '16%' }}>목록</th>
                  <th style={{ width: '38%' }}>한글</th>
                  <th style={{ width: '38%' }}>영어</th>
                  <th style={{ width: '10%', minWidth: '165px' }}>수정</th>
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
                          onChange={(e) =>
                            handleChange(e.target.value, idx, 'ko')
                          }
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
                          onChange={(e) =>
                            handleChange(e.target.value, idx, 'en')
                          }
                        />
                      ) : (
                        <span>{item.en}</span>
                      )}
                    </td>
                    <td>
                      <button
                        className='modify'
                        onClick={() => onEditClick(idx)}
                      >
                        수정
                      </button>
                      {edit === idx ? (
                        <span>
                          <button
                            className='save'
                            onClick={() => onSaveClick(item)}
                          >
                            저장
                          </button>
                          <button
                            className='delete'
                            onClick={(e) => onDeleteClick(e, item)}
                          >
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
