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
**김명찬** :   지도 API 및 데이터 처리, 현위치 조회 구현



<br />


###  ✍️ 기술스택
#

### ✔️Front-end
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![JSP](https://img.shields.io/badge/JSP-blue?style=for-the-badge&logo=java&logoColor=white)

### ✔️Back-end
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![MyBatis](https://img.shields.io/badge/MyBatis-0052CC?style=for-the-badge&logo=data&logoColor=white)

### ✔️API
![REST API](https://img.shields.io/badge/REST_API-000000?style=for-the-badge&logo=api&logoColor=white)
![Naver Maps](https://img.shields.io/badge/Naver_Maps_API-v3-green?style=for-the-badge&logo=naver&logoColor=white)


<br />

### 🔦 프로젝트 아키텍쳐
#
![부트캠프_프로젝트_아키텍쳐](https://github.com/user-attachments/assets/7c19a46f-69c9-401b-b3e7-1474115c32d8)


<br />

### 📌 주요 기능 
#
음식점명 검색 시, 해당 위치로 지도 이동 및 마커를 표시하는 기능 구현
<br /> <br />
카테고리별 라디오 버튼 클릭 시, 선택된 카테고리에 맞춰 음식점을 필터링하여 조회하는 기능 구현
<br /> <br />
현재 위치 조회 기능 구현
<br /> <br />
현재 위치 또는 지도를 기준으로, 반경 100m부터 서울 전 지역까지의 음식점을 조회할 수 있는 기능 구현
<br /> <br />
지도 확대/축소 시, 동일 지역 내 음식점 마커를 자동으로 클러스터링하는 기능 구현



<br />



### 📖 실행화면
현위치 기반 주변 음식점 조회 기능
![image](https://github.com/user-attachments/assets/8c5f6371-1a5e-4a13-ad9d-1caccd718bc3)

<br />

마커 클러스터링 기능 (지도 줌아웃 시 마커 통합)
![image](https://github.com/user-attachments/assets/fe15b33f-da8c-4dd9-96f0-c5407044767c)




<br />

### ERD
![image](https://github.com/user-attachments/assets/949806f4-bcb4-4807-9c7e-035cd9fc84c9)

<br />

### 😅 다음 프로젝트에 반영할 개선점
#

**DB :** 이번 프로젝트에서는 팀장님의 로컬 데이터베이스를 통해 작업을 진행했습니다. 팀장님의 PC가 꺼져 있는 경우 접속이 불가능하여 개발 진행에 어려움이 발생했습니다.
다음 프로젝트에서는 클라우드 기반의 데이터베이스 서비스를 활용하여 항상 접근 가능한 안정적인 개발 환경을 구성할 계획입니다.

<br />

**MyBatis -> JPA 전환 :** 이번 프로젝트에서는 MyBatis 를 사용하여 자바 객체와 데이터베이스의 데이터들을 매핑을 처리했습니다. 하지만 Sql 중심적인 개발을 하다보니 자바의 
객체지향의 강점을 잘 살리지 못해 아쉬움이 남았습니다. 다음 프로젝트에서는 JPA 를 사용하여 자바의 객체지향의 강점을 잘 살려서 개발을 진행하도록 하겠습니다.

<br />

**환경 문제 :** 각자 맡은 기능을 개발한 뒤 병합하고 배포하는 과정에서 다른 팀원의 PC에서 충돌이 자주 발생하여 정상적으로 실행되지 않는 문제가 반복되었습니다.
이로 인해 모든 팀원의 환경에서 안정적으로 프로젝트가 실행되기까지 많은 시간을 소비하였습니다. 이 경험을 통해서 통일된 개발 환경의 중요성을 느꼈습니다.
다음 프로젝트에서는 Docker와 같은 컨테이너 기반 가상화 기술을 도입하여 환경 차이로 인한 문제를 최소화할 계획입니다.




<br />

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
  - HeidiSQL

- **기술 및 라이브러리**
  - MyBatis
  - Lombok
  - JSP
  - Naver Maps API
  - Java Script
  - Maria DB
  - Rest API
  

- **협업도구**
  - GitHub
  - ZOOM


  
</details>





