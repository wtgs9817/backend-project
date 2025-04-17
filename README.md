# 🏚 멀티캠퍼스 백앤드 부트캠프 최종 프로젝트 

### 📋 프로젝트 소개
#
**서울 위치기반 맛집 추천 서비스**
<br /><br />
Spring Boot를 기반으로 둔 현위치 조회 서비스를 활용한 서울 맛집 추천서비스 서울시 공공데이터를 기반으로 현재위치에서 반경 100m ~ 서울 전역까지 설정한 거리를 토대로 반경 내의 맛집의 정보를 보여준다.



###  👨🏼‍🤝‍👨🏼 멤버 구성 및 역할
#
**신대훈(조장)** : DB 설계 및 관리
<br />
**전준영** :  UI 구현, 마커 클러스터링
<br />
**최승영** :   검색 및 필터링 구현
<br />
**김명찬** :   지도 API 및 데이터 처리 구현


### 🔦 프로젝트 아키텍쳐
![부트캠프_프로젝트_아키텍쳐](https://github.com/user-attachments/assets/7c19a46f-69c9-401b-b3e7-1474115c32d8)



### 📌 주요 기능 
#
음식점 검색 
<br />
현재 위치 조회
<br />
현재 위치를 기준으로 반경거리 100m ~ 서울 전체 음식점 조회
<br />
줌아웃시 동일 지역에 있는 음식점들 마커통합





### ERD
![image](https://github.com/user-attachments/assets/949806f4-bcb4-4807-9c7e-035cd9fc84c9)


### 😅 프로젝트 후 개선할 사항
#
서울 맛집 추천을 목표로 했으나 데이터 부족하여 추천결과가 제한적이었음.
<br />
**-> 데이터 추가 예정**
<br />
<br />
프로젝트를 진행하는 동안 DB서버를 조장님 PC로 운영해왔음. 그러다 보니 PC 사용중이 아닐 때는 프로젝트 진행에 제약이 있었음.
<br />
**->DB서버를 클라우드로 이전할 예정**
<br />
<br />
검색기능이 너무 느리다는 지적을 받음. 
<br />
**->효율적인 알고리즘으로 개선하여 검색 속도 향상 예정**
<br />
<br />
식당에 대한 정보만 제공되어 객관적인 식당 평가가 어려움.
<br />
**->익명 리뷰기능 구현 예정**


### 💻 개발환경
#

<details>
  <summary>
    접기/펼치기
  </summary>

- **JDK**
  - JAVA 17

- **프레임워크**
  - Spring Boot 3.x

- **빌드도구**
  - Gradle

- **개발도구**
  - Intellij IDEA (IDE)

- **기술 및 라이브러리**
  - MyBatis
  - Lombok
  - JSP
  - Naver Maps API

- **협업도구**
  - GitHub
  - ZOOM


  
</details>





