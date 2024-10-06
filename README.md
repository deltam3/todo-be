<p align="middle" >
  <img width="200px" src="https://github.com/user-attachments/assets/1ce17f3c-11eb-4897-a0d2-d4b9f534b8b2" alt="chim-logo"/>
</p>
<h1 align="middle">침Todo</h1>
<h3 align="middle">침착맨 방송 컨텐츠 추천 시스템</h3>

<br/>

## 📌 Notice

침Todo는 현재 프론트엔드 저장소와 백엔드 저장소가 분리되어 있어요.  
침Todo는 현재 프론트엔드 저장소와 백엔드 저장소가 분리되어 있어요.
백엔드 저장소는 [todo-be](https://github.com/deltam3/todo-be)를 참고해주세요!

## 📝 Introduce

침Todo는 방송 컨텐츠를 시청자에게 추천 받는 서비스 입니다.
회원가입과 로그인 CRUD 기능을 제공합니다.

## 💯 What I Learned (배운점들)

- 전에는 Supabase 처럼 회원가입/로그인/로그아웃 기능을 자체적으로 제공하는 서비스들을 사용해 로그인을 백엔드부터 프론트엔드까지 어떻게 구현하는지 자세히는 몰랐다. 처음에 로그인 구현을 할때 withCredentials를 true로설정하여 http request를 보낼 때 cookie들도 같이 보내게 해야 한다는 것을 배웠다.
  백엔드에서는 corsOptions에 credentials: true로 설정해야 cookie를 받을 수 있다.
- nodemon으로 메모리에 세션을 저장할 때는 서버 재시작할 때마다 세션이 삭제된다. redis 같은 서비스를 사용해 개선할 수 있었다.
- https 로 호스팅된 프론트엔드에서는 http로 호스팅된 Rest api에 호출을 못 한다. 따라서 개발용 도메인을 구매해 AWS Route 53와 AWS Certificate Manager로 SSL certificate을 받아야 한다.

## 🐤 Demo

- [Todo 시작하기](https://todo-fe-delta.vercel.app/)

## ⭐ Main Feature

- 회원가입, 로그인 기능. (중복 이메일 가입시 회원가입 불가능 기능)
- CRUD 기능
- Redis로 Session 저장

## 🔧 Stack

**Frontend(Web)**

- **Language** : TypeScript
- **Library & Framework** : NextJS, Tailwind CSS, TanStack Query, Babel
- **Test** : Jest, RTL, Storybook
- **Deploy**: Vercel
- **CI/CD** : Vercel
  <br />

**Backend, Devops**

- **Language** : JavaScript
- **Library & Framework** : ExpressJS
- **Database** : MySql
- **ORM** : Sequelize
- **Deploy**: AWS(EC2), Caddy

## 🔨 Front-End Architecture

## 🔨 Back-End Architecture

## 🙋‍♂️ Developer

| FullStack  
| :----------------------------------------------------------------------------------------:
| <img src="https://avatars.githubusercontent.com/u/149219075?v=4" width=400px alt="delta"/> |
| [delta](https://github.com/deltam3) |
