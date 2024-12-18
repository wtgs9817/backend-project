loc = document.getElementById("loc");
search = document.getElementById("search");
myloc = document.getElementById("myloc");
var marker = null;
var mylocMarker = null;

let GLOBAL_LATITUDE =  37.5172;
let GLOBAL_LONGITUDE = 127.0413;
let GLOBAL_DISTANCE = 1;

let markers = [];
let restaurantData = [];

let keyword = "";
let searchCategory ="";
let selectedDistance = "1km";

var mylocFlag = -1;

//입력창 비우기
reset.addEventListener("click", function() {
    loc.value = "";
})

var map = new naver.maps.Map('map' , {
    center : new naver.maps.LatLng(GLOBAL_LATITUDE, GLOBAL_LONGITUDE),
    zoom : 11,
    zoomControl: true, // 기본 줌 컨트롤 활성화
    zoomControlOptions: {
        position: naver.maps.Position.RIGHT_CENTER
    }
})


restaurantList();



//검색 버튼 클릭시
search.addEventListener("click",  function() {
    keyword = loc.value;
    clearMapData();
    restaurantList();
})

loc.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        event.preventDefault(); // 기본 동작 방지
        search.click(); // 검색 버튼 클릭 이벤트 호출
    }
});



// 검색 카테고리 선택 이벤트 리스너 추가
document.querySelectorAll('input[name="searchCategory"]').forEach(radio => {


    radio.addEventListener("change", function () {
        searchCategory = this.value; // 선택된 카테고리 값 업데이트
        //console.log("선택된 카테고리:", searchCategory);
        clearMapData(); // 기존 데이터를 초기화
        restaurantList(); // 새로운 데이터를 가져오기
    });
});



//나의 위치
myloc.addEventListener("click", function() {
    // 현재 위치를 가져오는 기능 추가
    //navigator.geolocation : HTML5 Geolocation API 에서 제공하는 객체
    // 주로 자바스크립트를 통해 사용자의 위치 정보를 가져올 때 사용됨.
    if (navigator.geolocation) {

        // 첫번째 : 현재위치를 가져왔을 때 처리할 함수
        // 두번째 : 위치정보를 가져오는데 실패한 경우 처리 함수
        // 세번째 : 옵션
        //getCurrentPosition ->위치를 한 번만 가져옴.
        //watchPosition -> 위치가 변할 때마다 지속적으로 위치 정보를 제공
        navigator.geolocation.getCurrentPosition( function(position) {
            // 사용자의 실제 위치
            const userLat = position.coords.latitude;   //현재 조회한 위치의 위도
            const userLng = position.coords.longitude;  // 현재 조회한 위치의 경도

            console.log("* 나의 위치 :", userLat, userLng);

            GLOBAL_LATITUDE = userLat;
            GLOBAL_LONGITUDE = userLng;

            // 이전 마커 및 데이터 초기화
            clearMapData();

            mylocFlag = 1;  //현재 위치조회 마커 생성을 위한 플래그 지정  (389번줄)
            // 현 위치를 기준으로 식당 목록 가져오기
            restaurantList();
        }, function(error) {
            console.error("위치 정보를 가져오는 데 실패했습니다.", error);
            alert("위치 정보를 가져올 수 없습니다.");
        }, {
                enableHighAccuracy: true, // 정확도 우선모드
                timeout : 10000, //10초 이내에 응답이 없으면 에러 발생
                maximumAge : 3000 // 최대 3초까지 캐시된 위치 허용
        }

        );
    } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
});



// 기존 마커 및 인포윈도우 초기화 함수
function clearMapData() {

    // 모든 요소 숨기기
    document.querySelectorAll('.restaurantAlertTag').forEach(element => {
        const parent = element.parentElement; // 부모 요소 가져오기
        if (parent) {
            // 부모와 부모의 형제 요소 모두 숨기기
            const siblings = Array.from(parent.parentElement.children); // 부모의 모든 자식 요소 가져오기
            siblings.forEach(sibling => {
                sibling.style.display = 'none'; // 각 요소 숨기기
            });
        }
    });

    // 기존 마커 제거
    if (markers && markers.length > 0) {
        markers.forEach(marker => {
            marker.setMap(null); // 지도에서 마커 제거
        });
        markers.length = 0; // 배열 초기화
    }

    // 단일 마커 초기화 (검색 시 사용)
    if (marker) {
        marker.setMap(null);
        marker = null;
    }

    //현재 위치 마커 제거
    if(mylocMarker) {
        mylocMarker.setMap(null);
        mylocMarker = null;
    }


    //console.log("기존 마커와 데이터 초기화 완료");
}



// 식당 목록 로드
function restaurantList(getAddress) {
    console.log("주소 목록 불러오기  : ", getAddress);

    loc = document.getElementById("loc");
    keyword=loc.value;
    let searchAddress = getAddress;

    if(!getAddress ||  (getAddress ===undefined))searchAddress="";

    if(!keyword)keyword="";
    if(!searchCategory)searchCategory="";
    //console.log("레스토랑 목록 불러오기  : ", keyword, searchCategory);
    console.log("주소 목록 불러오기  searchAddress : ", searchAddress);

    fetch(`/restaurant/list?keyword=${keyword}&searchCategory=${searchCategory}&searchAddress=${searchAddress}`)
        .then(response => response.json())
        .then(data => {
            restaurantData = data.list;

            console.log("Keyword:", keyword);
            console.log("Search Category:", searchCategory);
            console.log("Search Address:", searchAddress);

            console.log(" restaurantData 크기   ===: ",  restaurantData.length);


            const filteredRestaurants = filterRestaurants(GLOBAL_LATITUDE, GLOBAL_LONGITUDE, restaurantData);
            // 지도 초기화 (필요 시)
            clearMapData();

            console.log("data  length  ===:",data.list.length);
            console.log(" 거리   ===:",GLOBAL_DISTANCE);
            document.getElementById("location-title").innerHTML =` 내주변 ${selectedDistance} 맛집 (${filteredRestaurants.length}곳) `;

            if(searchAddress){
                document.getElementById("searchAddressText").innerHTML = `선택지역 : ${searchAddress}`
            }else{
                document.getElementById("searchAddressText").innerHTML = ``;
            }


            // 카테고리별 스타일 및 아이콘 정의
            const categoryStyles = {
                "한식": { color: "#245fc6", icon: "🍚" },  // 코랄 레드
                "중식": { color: "#FFA500", icon: "🥡" },  // 밝은 오렌지
                "일식": { color: "#FFD700", icon: "🍣" },  // 골드 옐로우
                "양식": { color: "#4CAF50", icon: "🍝" },  // 밝은 그린
                "아시안": { color: "#008080", icon: "🍛" },  // 티얼 (청록색)
                "카페": { color: "#FF6F61", icon: "☕" },  // 슬레이트 블루
                "술집": { color: "#CD5C5C", icon: "🍺" },  // 인디언 레드
                "분식": { color: "#1f761a", icon: "🍢" },  // 오렌지 레드
                "육류": { color: "#800000", icon: "🥩" },  // 마룬 (다크 레드)
                "해산물": { color: "#4682B4", icon: "🦐" }  // 스틸 블루
            };



            // `restaurant-list` 요소 초기화
            const restaurantListContainer = document.getElementById("restaurant-list");
            restaurantListContainer.innerHTML = ""; // 기존 내용을 초기화

            filteredRestaurants.forEach((restaurant, index) => {
                if(!restaurant.category){
                    restaurant.category="기타";
                }


                const categoryStyle = categoryStyles[restaurant.category] || { color: "#FF6F61", icon: "🥘" }; // 기본 스타일 설정
                let restaurantCount =index+1;

                // **목록 추가**
                let restaurantListItemBackground="";
                if (Number(index)%2!=0) {
                    restaurantListItemBackground="#f5f5f5";
                }

                const listItem = document.createElement("div");
                listItem.className = "restaurant-list-item";
                listItem.id = `restaurantListItem-${restaurant.id}`
                listItem.style.backgroundColor = restaurantListItemBackground;
                listItem.style.margin = "10px";
                listItem.style.padding = "10px";
                listItem.style.borderRadius = "5px";

                

                listItem.innerHTML = `
                    <h3>${restaurantCount}.${categoryStyle.icon} ${restaurant.restaurantName}</h3>
                    <p>종류: <span style="color: ${categoryStyle.color}; font-weight: bold">${restaurant.category}</span></p>
                    <p>주소: ${restaurant.address}</p>
                    <p>연락처: ${restaurant.phone || "없음"}</p>
                `;
                restaurantListContainer.appendChild(listItem);

                // 커스텀 마커 스타일
                const markerIcon = {
                    content: `
                        <div id="restaurantText-${restaurant.restaurantId}" style="
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            transform: translate(-50%, -100%);
                            class="restaurantText"
                        ">
                            <div style="
                                width: 40px;
                                height: 40px;
                                background-color: ${categoryStyle.color};
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                            ">
                                <span style="color: #fff; font-weight: bold;">${restaurant.category.substring(0, 1)}</span>
                            </div>
                            <div style="
                                width: 0; 
                                height: 0; 
                                border-left: 10px solid transparent;
                                border-right: 10px solid transparent;
                                border-top: 10px solid ${categoryStyle.color};
                                margin-top: -1px;
                            "></div>
                            <span style="margin-top: 5px; padding: 5px 10px;
                                font-size: 12px;
                                 
                                border: 2px solid ${categoryStyle.color};
                                 background: #fff" class="restaurantTag-class">
                                ${categoryStyle.icon} ${restaurantCount}: ${restaurant.restaurantName}
                            </span>
                        </div>
                    `,
                    anchor: new naver.maps.Point(0, -50), // 마커 중심을 원 중앙으로 설정
                };

                // 커스텀 인포윈도우 스타일
                const infoWindow00 = new naver.maps.InfoWindow({
                    content: `
                        <div style="
                            display: flex;
                            flex-direction: column;
                            align-items: start;
                            padding: 10px;
                            font-size: 11px;
                            background-color: #fff;
                            border: 2px solid ${categoryStyle.color} !important;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                            border-radius: 5px;							
                        " class="restaurantAlertTag">
                            <h4 style="margin: 0; font-size: 14px; color: #333;">${restaurantCount}: ${restaurant.restaurantName}</h4>
                            <p style="margin: 5px 0 0; font-size: 12px; color: #555;">종류: ${categoryStyle.icon} ${restaurant.category}</p>
                            <p style="margin: 5px 0 0; font-size: 12px; color: #555;">주소: ${restaurant.address}</p>
                        </div>
                    `
                });

                // 마커 생성
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
                    map: map,
                    icon: markerIcon // 커스텀 마커 적용
                });

                // 클릭 이벤트 등록
                listItem.addEventListener("click", () => {
                    naver.maps.Event.trigger(marker, "click");
                    map.setCenter(new naver.maps.LatLng(restaurant.latitude, restaurant.longitude));
                    map.setZoom(18);
                });



                // 마커 클릭 시 인포윈도우 표시
                naver.maps.Event.addListener(marker, 'click', function (event) {

                    // 목록 강조
                    document.querySelectorAll('.restaurant-list-item').forEach(item => {
                        item.style.backgroundColor = ''; // 초기화
                    });
                    const targetListItem = document.getElementById(`restaurantListItem-${restaurant.id}`);
                    if (targetListItem) {
                        targetListItem.style.backgroundColor = '#e0f7fa'; // 강조 색상
                        targetListItem.style.border = '2px solid #00acc1'; // 강조 테두리

                        // 목록 스크롤 이동
                        targetListItem.scrollIntoView({
                            behavior: 'smooth', // 부드러운 스크롤
                            block: 'center',   // 중앙으로 정렬
                        });
                    }



                    // 모든 요소 다시 보이기
                    document.querySelectorAll('[id^="restaurantText-"]').forEach(element => {
                        console.log(`요소 다시 보이기: ${element.id}`);
                        element.style.display = 'flex'; // 보이게 설정
                    });



                    // 자신의 ID 값을 동적으로 가져오기
                    const restaurantElementId = `restaurantText-${restaurant.id}`;
                    const restaurantElement = document.getElementById(restaurantElementId);

                    if (restaurantElement) {
                        restaurantElement.style.display = 'none'; // 요소 숨기기
                    }


                    infoWindow00.open(map, marker);
                    setTimeout(() => {
                        const alertElement = document.querySelector('.restaurantAlertTag');
                        if (alertElement) {
                            const parentElement = alertElement.parentElement?.parentElement;
                            if (parentElement) {
                                parentElement.style.border = 'none';
                            }
                        }
                    }, 0);
                });


                // 마커를 배열에 추가
                markers.push(marker);
            });


            document.querySelectorAll('[id^="restaurantListItem-"]').forEach(element => {
                element.addEventListener("click", function() {
                    document.getElementById(`restaurantText-${restaurant.restaurantId}`).click();
                })
            });

            if(mylocFlag == 1) { //현위치 조회를 했을 때
                mylocMarker = new naver.maps.Marker({
                    position : new naver.maps.LatLng(GLOBAL_LATITUDE, GLOBAL_LONGITUDE),
                    map : map,
                    icon: {
                        url: "https://t1.daumcdn.net/localimg/localimages/07/2018/mw/m640/ico_marker.png", // 현재 위치와 비슷한 아이콘 URL
                        scaledSize: new naver.maps.Size(30, 30)
                    }
                });
                mylocFlag = -1;
            }


            // 지도 중심 설정
            map.setCenter(new naver.maps.LatLng(GLOBAL_LATITUDE, GLOBAL_LONGITUDE));
            map.setZoom(15);

        })
        .catch(err => console.error("Failed", err));
}



function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리 반환 (km)
}






function filterRestaurants(centerLat, centerLng, restaurants) {

    console.log(" GLOBAL_DISTANCE   :", GLOBAL_DISTANCE);

    return restaurants.filter(restaurant => {
        const distance = calculateDistance(centerLat, centerLng, restaurant.latitude, restaurant.longitude);
        return distance <= GLOBAL_DISTANCE; // 반경 1km 이내
    });
}


// 거리 필터 이벤트 추가
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        var distance = parseFloat(this.getAttribute('data-distance'));
        console.log("거리 선택  :::: ", this.innerText);

        selectedDistance = this.innerText;

        GLOBAL_DISTANCE =distance;
        console.log("GLOBAL_DISTANCE   :", GLOBAL_DISTANCE);
        restaurantList();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // 모든 버튼에서 active 클래스 제거
            filterButtons.forEach((btn) => btn.classList.remove("active"));

            // 클릭한 버튼에 active 클래스 추가
            button.classList.add("active");

            // 클릭한 버튼의 거리값 가져오기
            const distance = button.dataset.distance;
            console.log(`${distance}km 버튼이 선택되었습니다.`);

            // 거리값에 따라 지도 업데이트 로직 추가
        });
    });
});



/////////////////////////////////////////////////////////////////
//cluster


let clusters = []; // 클러스터 저장 배열

// 기존 클러스터 및 마커 초기화
function clearClusters() {
    clusters.forEach(cluster => cluster.setMap(null)); // 기존 클러스터 제거
    clusters = [];
    markers.forEach(marker => marker.setMap(null)); // 기존 마커 제거
}
// 겹쳐진 마커의 위치를 약간씩 조정하는 함수
function adjustMarkerPositions() {
    const markerPositionMap = new Map();

    markers.forEach(marker => {
        const posKey = `${marker.getPosition().lat().toFixed(6)},${marker.getPosition().lng().toFixed(6)}`;

        if (markerPositionMap.has(posKey)) {
            const count = markerPositionMap.get(posKey) + 1;
            markerPositionMap.set(posKey, count);

            // 위치를 조금씩 조정 (원형으로 퍼지도록)
            const angle = (Math.PI * 2) * (count / 10); // 마커가 많아질수록 분산
            const offsetLat = Math.cos(angle) * 0.00005; // 조정 크기
            const offsetLng = Math.sin(angle) * 0.00005;
            const newPos = new naver.maps.LatLng(
                marker.getPosition().lat() + offsetLat,
                marker.getPosition().lng() + offsetLng
            );

            marker.setPosition(newPos); // 마커 위치 조정
        } else {
            markerPositionMap.set(posKey, 0);
        }
    });
}

// 줌 레벨에 따른 클러스터링 처리
function updateMarkers() {
    const zoomLevel = map.getZoom();
    clearClusters();
    adjustMarkerPositions()
    if (zoomLevel <= 10) {
        const clusterCenter = new naver.maps.LatLng(37.5265, 127.03);

        // Map을 이용한 중복 제거
        const markerMap = new Map();
        markers.forEach(marker => {
            const positionKey = `${marker.getPosition().lat()}-${marker.getPosition().lng()}`;
            if (!markerMap.has(positionKey)) {
                markerMap.set(positionKey, marker);
            }
        });

        const uniqueMarkers = Array.from(markerMap.values());
        const markerCount =  uniqueMarkers.length;// 중복 제거된 마커 수

        const nationwideMarker = new naver.maps.Marker({
            position: clusterCenter,
            map: map,
            icon: {
                content: `
                <div style="
                    background-color: rgba(123, 104, 238, 0.7);
                    color: white;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    font-size: 16px;">
                    ${markerCount}
                </div>
            `,
                anchor: new naver.maps.Point(30, 30)
            }
        });

        clusters.push(nationwideMarker);

        naver.maps.Event.addListener(nationwideMarker, 'click', () => {
            map.setCenter(clusterCenter);
            map.setZoom(11);
        });
    } else if (zoomLevel >10 && zoomLevel <= 13) {
        // 11~13 구 단위 클러스터링 (그리드 방식)
        const gridSize = 0.02; // 격자 크기 (위도/경도 단위)
        const mapBounds = map.getBounds(); // 현재 지도 경계
        const { minLat, minLng, maxLat, maxLng } = {
            minLat: mapBounds._sw.lat(),
            minLng: mapBounds._sw.lng(),
            maxLat: mapBounds._ne.lat(),
            maxLng: mapBounds._ne.lng()
        };

        const gridMap = new Map();

        markers.forEach(marker => {
            const markerPos = marker.getPosition();
            const gridX = Math.floor((markerPos.lat() - minLat) / gridSize);
            const gridY = Math.floor((markerPos.lng() - minLng) / gridSize);
            const gridKey = `${gridX}-${gridY}`;

            if (!gridMap.has(gridKey)) {
                gridMap.set(gridKey, []);
            }
            gridMap.get(gridKey).push(marker);
        });

        // 클러스터 마커 생성
        gridMap.forEach((gridMarkers, gridKey) => {
            const uniqueMarkers = Array.from(new Set(gridMarkers.map(marker => marker.getPosition().toString())))
                .map(pos => {
                    return markers.find(marker => marker.getPosition().toString() === pos);
                });
            const markerCount =  uniqueMarkers.length; // 중복 제거된 마커 수

            const gridCenter = calculateGridCenter(uniqueMarkers);
            const clusterMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(gridCenter.lat, gridCenter.lng),
                map: map,
                icon: {
                    content: `
                        <div style="
                            background-color: rgba(123, 104, 238, 0.7);
                            color: white;
                            border-radius: 50%;
                            width: 50px;
                            height: 50px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: bold;
                            font-size: 14px;">
                            ${markerCount}
                        </div>
                    `,
                    anchor: new naver.maps.Point(25, 25)
                }
            });

            clusters.push(clusterMarker);

            // 클러스터 클릭 이벤트
            naver.maps.Event.addListener(clusterMarker, 'click', () => {
                map.setCenter(clusterMarker.getPosition());
                map.setZoom(14); // 줌 레벨 확대
            });
        });
    } else if (zoomLevel >= 14) {
        // 14 이상 개별 마커 표시
        markers.forEach(marker => marker.setMap(map));
    }

}

// 격자 중심 좌표 계산
function calculateGridCenter(uniqueMarkers) {
    const totalLat = uniqueMarkers.reduce((sum, marker) => sum + marker.getPosition().lat(), 0);
    const totalLng = uniqueMarkers.reduce((sum, marker) => sum + marker.getPosition().lng(), 0);
    return {
        lat: totalLat / uniqueMarkers.length,
        lng: totalLng / uniqueMarkers.length
    };
}

// 지도 줌 이벤트 리스너 추가
naver.maps.Event.addListener(map, 'zoom_changed', updateMarkers);

