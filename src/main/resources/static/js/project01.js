// 기존 이미지와 변경할 이미지 URL
const newImageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAABHNCSVQICAgIfAhkiAAAA0lJREFUWEfNWM9PE1EQ/ra0B40J9Q8gQqJnl5shXS1HT7QXrmylGONFvQnGkwl4Ey9qbGPLlUu3J49U2xBvlLMmkPAH2CZED7Q+Z7oslP5g32wW6Fw2aWfe+943b368MRBUrOwcmSahYHaWMPhrxAHVoN/qx7/xt4JqvhxkG0NklMgmYRgLBCDlAtEVAgzDgVIbqOUrulZ64O49mUS0VSBgSd2Fh+opVUErmsGPT/t+a/mDs7Lv6NTP/RaS/6/Wyd0vzrMbDi5px+mEpVDYGoaAWYy20qgUye39MhjczJKJMZRIfVLOiNhiH22ksZ1zg6hL+sExY+3YziUBc6FwdEePZnsZ7AeXyG5dqCvPc3EtPzucucTSOuWrZ2LHhGWg8B613EnwnTLH6SLW3gtrn8DrHI1NeWnmFNxVubP3FBzBx+51wbmZfyvwacM2VGqWK4kLzso6lGi5VoollTAxZ5kwb0/AvDOB+s8D1H8doFytw6n1ZQfN9anMVfO2B+63rFYC8RvXUFi2kbKmh27oVHeQWSuicfhXE5SnRrW4mr9pwFqkIh7hhKstDGxvc40AXve1aRz+wdT8shwgudZAgPThrD7FHLlTV5jB9KuPuuquHqUVBleh3PZA15LvWInASSW98kF2BxW+icEV6Z4tPJyRYsPG123YdP+0pQPOyoqCof7lNe5SZEqFo3h68Y3ATDUI3JISWEB9/yxRP6Nr3H8ssmVw3EuN61oFZW6Xcp/5SMIcmiN+50Y8WsVtkjTPlamMpSiViKST5wJWiP3NtxinSuEnTSpdk/MvA1YIXl0YFGzCJay4kjm3UjBj9mpBDgxoopqLe4WfsiM/luXCFSPFXQl1JJz/OCo5pzmhdSUj3c8xYcKolXOsa6HK1C5Rp8TjF09G+g3hsidOK7p8aOkNfX151lflXupC6FmY7D7E4Bd/K1qnB88trdOGoaSwSy/+pP+LnzfjWUlEOZcCkIH9g603K/GY6EyZYgRQv0sWk8iujB6lZFOm7l0uKkh6Lv+gg/kPD9mqM9lsF0NhkdlqjdnhTDbPsMiTAbofMDhJajeopNuk5xTNhFEMfyY8iHPuZlSEQ79rmt4B3DyZpoOn6gRKMKTu3uo/XMZNoGLc68wAAAAASUVORK5CYII=";

document.querySelectorAll('.iwhOAe .Query').forEach((item) => {
    item.addEventListener('click', () => {
        // 모든 항목을 초기화
        document.querySelectorAll('.iwhOAe .Query img').forEach((img) => {
            img.src = "https://dcicons.s3.ap-northeast-1.amazonaws.com/new/images/web/react_components/Query/r_un.png";
        });

        // 클릭된 항목만 변경
        const img = item.querySelector('img');
        if (img) {
            img.src = newImageSrc;
        }
    });
});

// DOM 요소 가져오기
const categoryTab = document.getElementById("category-tab");
const regionTab = document.getElementById("region-tab");
const categoryFilter = document.querySelector(".iwhOAe");
const regionContent = document.getElementById("region-content");
categoryTab.classList.add("active-tab");
categoryFilter.style.display = "grid";
regionContent.style.display = "none";
// 카테고리와 지역 탭 클릭 이벤트 핸들러
categoryTab.addEventListener("click", () => {
    // 카테고리 탭 활성화
    categoryTab.classList.add("active-tab");
    regionTab.classList.remove("active-tab");

    // 콘텐츠 전환
    categoryFilter.style.display = "grid";
    regionContent.style.display = "none";
});

regionTab.addEventListener("click", () => {
    // 지역 탭 활성화
    regionTab.classList.add("active-tab");
    categoryTab.classList.remove("active-tab");

    // 콘텐츠 전환
    categoryFilter.style.display = "none";
    regionContent.style.display = "block";
});

// 지역 선택 모달 관련 코드
const regionModal = document.getElementById("region-modal");
const regionSelectBtn = document.getElementById("region-select-btn");
const closeRegionModal = document.getElementById("close-region-modal");
const guSelector = document.getElementById("gu-selector");
const dongSelector = document.getElementById("dong-selector");
const confirmRegionBtn = document.getElementById("confirm-region");

const dongData = {
    gangnam: ["전체", "삼성동", "청담동", "논현동", "역삼동"],
    gangdong: ["전체", "천호동", "둔촌동", "암사동"],
    gangseo: ["전체", "화곡동", "염창동", "등촌동"],
    gwanak: ["전체", "봉천동", "신림동"],
    dongjak: ["전체", "상도동", "대방동", "사당동"]
};

const dongCoordinates = {
    gangnam: {
        "전체": { lat: 37.5172363, lng: 127.0473248 },
        "역삼동": { lat: 37.5006211, lng: 127.0364292 },
        "삼성동": { lat: 37.5145752, lng: 127.0565097 },
        "논현동": { lat: 37.511702, lng: 127.027621 },
        "청담동": { lat: 37.5199733, lng: 127.0515441 }
    },
    gangdong: {
        "전체": { lat: 37.5301251, lng: 127.1237639 },
        "천호동": { lat: 37.5384865, lng: 127.1239747 },
        "둔촌동": { lat: 37.5270882, lng: 127.136572 },
        "암사동": { lat: 37.5517846, lng: 127.128163 }
    },
    gangseo: {
        "전체": { lat: 37.5610936, lng: 126.821983 },
        "화곡동": { lat: 37.541255, lng: 126.840586 },
        "염창동": { lat: 37.548374, lng: 126.874479 },
        "등촌동": { lat: 37.551049, lng: 126.865784 }
    },
    gwanak: {
        "전체": { lat: 37.478407, lng: 126.951623 },
        "봉천동": { lat: 37.482051, lng: 126.941411 },
        "신림동": { lat: 37.484799, lng: 126.929953 }
    },
    dongjak: {
        "전체": { lat: 37.512409, lng: 126.939934 },
        "상도동": { lat: 37.502916, lng: 126.948591 },
        "대방동": { lat: 37.507225, lng: 126.926666 },
        "사당동": { lat: 37.477659, lng: 126.981934 }
    }
};

// 모달 열기
regionSelectBtn.addEventListener("click", () => {
    regionModal.classList.remove("hidden");
});

// 모달 닫기
closeRegionModal.addEventListener("click", () => {
    regionModal.classList.add("hidden");
});

// 구 선택 이벤트
guSelector.addEventListener("change", () => {
    const selectedGu = guSelector.value;

    dongSelector.innerHTML = "<option value='' disabled selected>동 선택</option>";
    if (dongData[selectedGu]) {
        dongData[selectedGu].forEach((dong) => {
            const option = document.createElement("option");
            option.value = dong;
            option.textContent = dong;
            dongSelector.appendChild(option);
        });
        dongSelector.disabled = false;
    } else {
        dongSelector.disabled = true;
    }
});



// 지역 선택 완료
confirmRegionBtn.addEventListener("click", () => {
    let selectedGu = guSelector.value;
    let selectedGuData = guSelector.value;

    if(selectedGu==="gangnam"){
        selectedGu = "강남구";
    }else if(selectedGu==="gangdong"){
        selectedGu = "강동구";
    }else if(selectedGu==="gangseo"){
        selectedGu = "강서구";
    }else if(selectedGu==="gwanak"){
        selectedGu = "관악구";
    }else if(selectedGu==="dongjak"){
        selectedGu = "동작구";
    }

    clearMapData();


    const selectedDong = dongSelector.value;

    if (selectedGu && selectedDong) {

        const coordinates = dongCoordinates[selectedGuData][selectedDong];

        GLOBAL_LATITUDE = coordinates.lat;
        GLOBAL_LONGITUDE = coordinates.lng;

        restaurantList(`${selectedGu} ${selectedDong}`);


        regionModal.classList.add("hidden");
    } else {
        alert("구와 동을 모두 선택해주세요.");
    }
});
