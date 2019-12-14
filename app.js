import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import flash from 'connect-flash';
import passport from 'passport';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // req.body
app.use(express.urlencoded({extended: true})); // false: querystring모듈(내장 모듈)
                                               // true: qs모듈(npm 패키지)
app.use(cookieParser(process.env.COOKIE_SECRET)); // 서명된 쿠키는 클라이언트에서 수정시 에러
app.use(session({ // req.session 
                  // 삭제시:req.session.destroy() 
                  // 현재세션ID: req.sessionID
    resave: false,// 요청이 왔을때 세션에 수정사항이 생기지 않아도 세션을 다시 저장할지
    saveUninitialized: false, // 세션에 저장할 내역이 없어도 세션을 저장할지 (방문자 추적용)  
    secret: process.env.COOKIE_SECRET, // 필수항목, cookie-parser의 비밀키와 같은 역할
    cookie: {
        httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록
        secure: false   // false: https가 아닌 환경에서도 사용가능
    }
}));
app.use(flash());
//app.use(passport.initialize());
//app.use(passport.session());

export default app;