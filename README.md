# 🏚 멀티캠퍼스 백앤드 부트캠프 최종 프로젝트 

### 📋 프로젝트 소개
#

11.04 ~ 12.15 까지 멀티캠퍼스 백엔드 27회차 부트캠프에서 진행했던 최종 프로젝트 입니다.

#
**서울 위치기반 맛집 추천 서비스**
<br /><br />
Spring Boot를 기반으로 개발한 위치 기반 맛집 추천 서비스입니다.  
서울시 공공데이터를 활용하여 사용자의 현재 위치를 중심으로 반경 100m부터 서울 전역까지 설정한 거리 내 식당 정보를 조회할 수 있는 기능을 구현했습니다.  
다만, 현재 데이터 양이 부족하여 일부 지역에 한해 식당 정보가 제공됩니다.  
사용자가 식당명이나 위치를 검색하면, 지도에서 해당 위치로 이동하고 마커와 함께 식당 정보를 표시하는 기능을 구현했습니다.



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

### 😅 내가 생각하는 이번 프로젝트에서 아쉬운 점
#

**DB 구성 :** 이번 프로젝트에서는 팀장님의 로컬 데이터베이스를 통해 작업을 진행했습니다. 팀장님의 PC가 꺼져 있는 경우 접속이 불가능하여 개발 진행에 어려움이 발생했습니다.
다음 프로젝트에서는 클라우드 기반의 데이터베이스 서비스를 활용하여 항상 접근 가능한 안정적인 개발 환경을 구성할 계획입니다.

<br />

**배포 문제 :** 이번 프로젝트는 WAR 방식으로 배포를 진행하였습니다. 하지만 외부 WAS 환경에 배포하는 과정이 생각보다 복잡했고 팀원들의 로컬 환경에서 WAR 파일을 테스트 하는 과정에서도 JDK 버전, 설정 경로, WAS 버전 문제 등 환경 차이로 인한 오류가 발생하였습니다. 설정을 조정한 후에는 정상적으로 작동했지만, 환경마다 반복적으로 동일한 작업을 해야 한다는 점에서 유지보수 측면에서 비효율적이라는 점을 확인할 수 있었습니다. 

<br />

**데이터 문제 :** 데이터의 양이 충분하지 않아 일부 지역에서는 음식점 정보가 조회되지 않는 문제가 있었습니다. 이로 인해 추천 결과가 제한적이었습니다.
다음 프로젝트에서는 프로젝트에 필요한 데이터를 확실하게 확보하여, 서비스의 완성도와 활용성을 높일 계획입니다.



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





