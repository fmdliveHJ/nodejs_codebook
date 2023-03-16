const express = require('express');

const app = express();

const db = require('./models');

const { Member } = db;

// let members = require('./members');

//express.json() 어떤 함수를 리턴함
// 리턴된 함수는 서버로 온 리퀘스트의 바디에 json 데이터가 존재할 경우
// 추출해서 리퀘스트 바디의 body 프로퍼티 값으로 넣어줌
app.use(express.json()); //미들웨어
//> 바디에 있는 json데이터가 req객체의 body프로퍼티에 설정됨
// > 리퀘스트의 패스와 메소드를 보고 알맞은 라우터 핸들러가 호출됨

/*
  모델들이 가지고 있는 대부분의 메소드는 프로미스 객체를 리턴하는 비동기 실행 함수
*/
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/api/members', async (req, res) => {
  //배열을 넣으면 send메소드가 배열을 json문자열로 변환한 결과를 리스폰스 바디에 담아서 보내주게 됨

  //팀단위
  // const team = req.query.team;
  const { team } = req.query;
  if (team) {
    // const teamMembers = members.filter((m) => m.team === team);
    const teamMembers = await Member.findAll({ where: { team: team } });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll(); //members 테이블의 모든 요소를 조회해서 가져오는 기능
    res.send(members);
  }
});

// :id에는 다양한 값 들어올수 있는대, 그값들을 id에 담음
app.get('/api/members/:id', async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  // const member = members.find((m) => m.id === Number(id));
  const member = await Member.findOne({ where: { id: id } });
  if (member) {
    res.send(member);
  } else {
    res.status(404).send('no member');
  }
});

// app.get('/hello', (req, res) => {
//   //콜백함수는 라우트 핸들러
//   res.send('<h1>hello</h1>');
//   //리스폰 객체의 send를 이용해서 hello express응답함
// });

// app.post('/api/members', (req, res) => {
//   const newMember = req.body;
//   members.push(newMember)
//   res.send(newMember);
// });

app.post('/api/members', (req, res) => {
  console.log(req.body);
  const result = req.body;
  res.send(result);
});

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id));

  if (member) {
    //newInfo 객체의 모든 프로퍼티 순회 각각의 프로퍼티 값을 같은 이름을 가진 프로퍼티값으로 대입
    Object.keys(newInfo).forEach((prop) => {
      member[prop] = newInfo[prop];
    });
    res.send(member);
  } else {
    res.status(404).send({ message: 'no member id' });
  }
});

app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const memberCount = members.length;
  //기존의 직원정보 배열에서 삭제할 직원정보 id값 일치하지 않는 요소들만 추려내서 새로운 배열로 만듬
  members = members.filter((member) => member.id !== Number(id));
  if (members.length < memberCount) {
    res.send({ message: 'Delete' });
  } else {
    res.status(404).send({ message: 'no member id' });
  }
});

app.listen(3001, () => {
  console.log('server is listening..');
});
