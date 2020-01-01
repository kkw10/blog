# SPACER
React를 사용해서 가장 기초적인 웹 커뮤니티 게시판의 기능들을 구현해보는 것이 목적입니다.

현재까지 구현한 기능은 다음과 같습니다.
- 글쓰기, 글읽기, 글수정, 글삭제
- 댓글, 대댓글
- 로그인, 회원가입
- 팔로우, 언팔로우 기능
- 검색 기능 (태그검색, 내용검색)
- 좋아요, 싫어요 기능

배포 주소 : http://13.125.168.124/


# 사용한 기술 스펙
- 프론트엔드
  - React.js, Redux, Redux-saga
  - Webpack
  - Styled-Components
  - nhn tui editor (WYSIWYG)

- 백엔드
  - Express.js
  - Sequelize (DB: Mysql)

# 프론트 컴포넌트 구조
![spacer](https://user-images.githubusercontent.com/35650075/71641968-539bac00-2ce7-11ea-8112-9f7463176876.jpg)