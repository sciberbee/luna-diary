const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const multer = require('multer');

try {
    fs.readdirSync('uploads');
  } catch (error) {
    console.error('mkdir uploads');
    fs.mkdirSync('uploads');
  }

const app = express();
const PORT = 8000;

app.set('trust proxy', 1); // trust first proxy
app.use(cors({
    origin: "https://cyber.newbie.sparcsandbox.com", // 클라이언트 주소
    credentials: true,
}));

/* 
// 클라이언트와 서버의 포트가 다를 때 CORS 에러를 해결하기 위한 설정
나중에 고쳐야 함
app.use(cors({
  origin: 'http://localhost:3000', // 클라이언트 주소
  credentials: true // 쿠키를 함께 사용하려면 true로 설정
})); 
*/

// 데이터베이스 설정 (본인의 데이터베이스 정보로 수정해주세요)
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'tnfqkrtm',
    database: 'luna_diary'
});

// 파일 저장을 위한 multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // 파일명 중복 방지
    }
});

// 파일 확장자 필터
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
    if (allowedFileTypes.includes(path.extname(file.originalname))) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter});

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        domain: "cyber.newbie.sparcsandbox.com",
        secure: true,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));

// 라우트 설정
// 회원가입, 로그인, 로그아웃, 일기 작성, 일기 목록 조회 등의 라우트를 구현합니다.

// 회원가입
app.post('/register', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    // if the username is already taken, return an error
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        console.log(results);
        if (results.length > 0) {
            console.log('Username already taken');
            res.status(409).send('Username already taken');
            return;
        }
        else {
            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
                if (err) {
                    // log error on the terminal
                    console.error(err);
                    throw err;
                }
                res.send('User registered successfully!');
            });
        }
    });

});

// 로그인
app.post('/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.userId = user.id;
                console.log(user.id);
                req.session.save(function() {
                    res.send('Logged in successfully!');
                });
            } else {
                res.status(401).send('Incorrect password');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

// 로그아웃
app.post('/logout', (req, res) => {
    console.log(req.body);
    req.session.destroy();
    res.send('Logged out successfully!');
});

// 일기 목록 조회
app.get('/diaries', (req, res) => {
    console.log(req.body);
    db.query('SELECT * FROM diaries', (err, results) => {
        if (err) throw err;
        console.log(results);
        results.forEach((result) => {
            try {
                result.data = fs.readFileSync(result.path).toString('base64');
            } catch (err) {
                console.error(err);
                result.data = null;
            }
        });
        res.json(results);
    });
});

// 일기 작성
app.post('/create-diary', upload.single('image'), (req, res) => {
    console.log(req.file);
    const { title, content } = req.body;
    
    const path = req.file.path;
    const user_id = req.session.userId;

    console.log('user_id:', user_id);

    if (user_id) {
        console.log('user_id:', user_id);
        console.log('title:', title);
        console.log('content:', content);
        console.log('path:', path);
        db.query('INSERT INTO diaries (user_id, title, content, path) VALUES (?, ?, ?, ?)', 
            [user_id, title, content, path], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            }
            res.send('Diary added successfully!');
        });
    } else {
        console.log('Unauthorized');
        res.status(401).send('Unauthorized');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});