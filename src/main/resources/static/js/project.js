// 김명찬님 코드
loc = document.getElementById("loc");   //입력 값
search = document.getElementById("search"); //검색버튼
myloc = document.getElementById("myloc");   // 현위치 조회 버튼

var marker = null;

var markers = [];
var restaurantData = [];
/////////////////////////////////////////////////////////////////////////////////////////-*


// 기존 이미지와 변경할 이미지 URL  - 전준영님 코드
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
    gangnam: ["전체", "삼성동", "청담동", "논현동", "역삼동", "압구정동", "신사동", "대치동", "도곡동", "개포동", "일원동", "수서동", "자곡동", "율현동", "세곡동"],
    gangdong: ["전체", "강일동", "상일동", "고덕동", "길동", "둔촌동", "명일동", "성내동", "암사동", "천호동"],
    gangseo: ["전체", "염창동", "등촌동", "화곡동", "가양동", "마곡동", "내발산동", "외발산동", "공항동", "방화동", "오곡동", "오쇠동", "과해동", "개화동"],
    gwanak: ["전체", "봉천동", "신림동", "남현동"],
    dongjak: ["전체", "노량진동", "상도동", "상도1동", "사당동", "흑석동", "본동", "대방동", "신대방동", "동작동"],
    gwangjin: ["전체", "광장동", "구의동", "군자동", "능동", "자양동", "화양동", "중곡동"],
    guro: ["전체", "가리봉동", "개봉동", "고척동", "구로동", "궁동", "신도림동", "오류동", "온수동", "천왕동", "항동"],
    geumcheon: ["전체", "가산동", "독산동", "시흥동"],
    nowon: ["전체", "월계동", "공릉동", "하계동", "중계동", "상계동"],
    dobong: ["전체", "쌍문동", "방학동", "창동", "도봉동"],
    dongdaemun:  ["전체", "용두동", "신설동", "제기동", "전농동", "답십리동", "회기동", "휘경동", "이문동"],
    songpa: ["전체", "잠실동", "풍납동", "방이동", "오륜동", "오금동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "장지동", "거여동", "마천동"],
    yeongdeungpo:  ["전체", "영등포동", "여의도동", "당산동", "문래동", "양평동", "도림동", "신길동", "대림동"],
    junggu: ["전체", "명동", "을지로동", "신당동", "동화동", "황학동", "방산동", "충무로동", "회현동", "남대문로", "소공동", "다동", "무교동", "저동", "태평로", "정동", "장충동", "광희동"],
    gangbok: ["전체", "미아동", "번동", "수유동", "우이동"],
    seongbuk: ["전체", "성북동", "삼선동", "동선동", "돈암동", "안암동", "보문동", "정릉동", "길음동", "종암동", "석관동"],
    jongno: ["전체", "청운효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1·2·3·4가동", "종로5·6가동", "이화동", "혜화동", "창신동", "숭인동"],
    eunpyeong: ["전체", "녹번동", "불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "수색동", "진관동"],
    seodaemun: ["전체", "충현동", "천연동", "북아현동", "홍제동", "연희동", "홍은동", "남가좌동", "북가좌동", "현저동", "대현동", "냉천동", "미근동", "합동"],
    mapo: ["전체", "아현동", "공덕동", "도화동", "용강동", "마포동", "대흥동", "염리동", "신수동", "노고산동", "현석동", "구수동", "창전동", "상수동", "하중동", "신정동", "서교동", "동교동", "합정동", "망원동", "연남동", "성산동", "중동"],
    jungnang: ["전체", "면목동", "상봉동", "중화동", "묵동", "망우동", "신내동"],
    yongsan: ["전체", "후암동", "용산동2가", "용산동4가", "용산동5가", "남영동", "청파동1가", "청파동2가", "청파동3가", "원효로1가", "원효로2가", "문배동", "신계동", "원효로3가", "원효로4가", "효창동", "도원동", "용문동", "한강로1가", "한강로2가", "한강로3가", "이촌동", "이태원동", "한남동", "동빙고동", "서빙고동", "주성동", "보광동"],
    seocho: ["전체", "서초동", "잠원동", "반포동", "방배동", "양재동", "내곡동"],
    yangcheon: ["전체", "목동", "신정동", "신월동"]
};


const dongCoordinates = {
    gangnam: {
        "전체": { lat: 37.5172363, lng: 127.0473248 },
        "압구정동": { lat: 37.52706, lng: 127.02861 },
        "신사동": { lat: 37.516333, lng: 127.020378 },
        "논현동": { lat: 37.511702, lng: 127.027621 },
        "청담동": { lat: 37.525022, lng: 127.049555 },
        "삼성동": { lat: 37.5145752, lng: 127.0565097 },
        "대치동": { lat: 37.494612, lng: 127.062361 },
        "역삼동": { lat: 37.5006211, lng: 127.0364292 },
        "도곡동": { lat: 37.489796, lng: 127.041534 },
        "개포동": { lat: 37.48791, lng: 127.066409 },
        "일원동": { lat: 37.483596, lng: 127.075085 },
        "수서동": { lat: 37.487028, lng: 127.103289 },
        "자곡동": { lat: 37.467289, lng: 127.103905 },
        "율현동": { lat: 37.464002, lng: 127.112506 },
        "세곡동": { lat: 37.467248, lng: 127.128773 }
    },
    gangdong: {
        "전체": { lat: 37.5301251, lng: 127.1237639 },
        "강일동": { lat: 37.563373, lng: 127.173815 },
        "상일동": { lat: 37.549047, lng: 127.167472 },
        "고덕동": { lat: 37.554249, lng: 127.154197 },
        "길동": { lat: 37.5378917, lng: 127.1402895 },
        "둔촌동": { lat: 37.527346, lng: 127.136615 },
        "명일동": { lat: 37.551302, lng: 127.144414 },
        "성내동": { lat: 37.530751, lng: 127.125315 },
        "암사동": { lat: 37.550219, lng: 127.13057 },
        "천호동": { lat: 37.5384865, lng: 127.1239747 }
    },
    gangseo: {
        "전체": { lat: 37.560396, lng: 126.825303 },
        "염창동": { lat: 37.550732, lng: 126.874374 },
        "등촌동": { lat: 37.553303, lng: 126.861511 },
        "화곡동": { lat: 37.54137, lng: 126.840033 },
        "가양동": { lat: 37.561314, lng: 126.854515 },
        "마곡동": { lat: 37.560338, lng: 126.829392 },
        "내발산동": { lat: 37.557292, lng: 126.812884 },
        "외발산동": { lat: 37.562689, lng: 126.806178 },
        "공항동": { lat: 37.565978, lng: 126.798353 },
        "방화동": { lat: 37.577532, lng: 126.812363 },
        "오곡동": { lat: 37.585821, lng: 126.796421 },
        "오쇠동": { lat: 37.574154, lng: 126.785682 },
        "과해동": { lat: 37.591514, lng: 126.767918 },
        "개화동": { lat: 37.585524, lng: 126.796123 }
    },
    gwanak: {
        "전체": { lat: 37.478058, lng: 126.951865 },
        "봉천동": { lat: 37.482153, lng: 126.952712 },
        "신림동": { lat: 37.485221, lng: 126.929582 },
        "남현동": { lat: 37.468713, lng: 126.982728 }
    },
    dongjak: {
        "전체": { lat: 37.502321, lng: 126.979384 },
        "노량진동": { lat: 37.511275, lng: 126.940928 },
        "상도동": { lat: 37.503279, lng: 126.947703 },
        "상도1동": { lat: 37.504833, lng: 126.951138 },
        "사당동": { lat: 37.476826, lng: 126.981635 },
        "흑석동": { lat: 37.509327, lng: 126.963049 },
        "본동": { lat: 37.507646, lng: 126.952629 },
        "대방동": { lat: 37.510065, lng: 126.926670 },
        "신대방동": { lat: 37.487776, lng: 126.913172 },
        "동작동": { lat: 37.504169, lng: 126.971972 }
    },
    gwangjin: {
        "전체": { lat: 37.548267, lng: 127.082583 },
        "광장동": { lat: 37.545201, lng: 127.104899 },
        "구의동": { lat: 37.541049, lng: 127.085452 },
        "군자동": { lat: 37.552669, lng: 127.073515 },
        "능동": { lat: 37.548573, lng: 127.083485 },
        "자양동": { lat: 37.535870, lng: 127.083613 },
        "화양동": { lat: 37.546757, lng: 127.070376 },
        "중곡동": { lat: 37.562532, lng: 127.084939 }
    },
    guro: {
        "전체": { lat: 37.495485, lng: 126.887932 },
        "가리봉동": { lat: 37.481749, lng: 126.887760 },
        "개봉동": { lat: 37.494544, lng: 126.858054 },
        "고척동": { lat: 37.498135, lng: 126.860104 },
        "구로동": { lat: 37.484032, lng: 126.902717 },
        "궁동": { lat: 37.496703, lng: 126.823844 },
        "신도림동": { lat: 37.508006, lng: 126.891517 },
        "오류동": { lat: 37.494633, lng: 126.844371 },
        "온수동": { lat: 37.492028, lng: 126.823620 },
        "천왕동": { lat: 37.487256, lng: 126.838968 },
        "항동": { lat: 37.486470, lng: 126.823031 }
    },
    geumcheon: {
        "전체": { lat: 37.456767, lng: 126.895812 },
        "가산동": { lat: 37.475247, lng: 126.883535 },
        "독산동": { lat: 37.467245, lng: 126.894563 },
        "시흥동": { lat: 37.452905, lng: 126.910495 }
    },
    nowon: {
        "전체": { lat: 37.654255, lng: 127.056198 },
        "월계동": { lat: 37.629901, lng: 127.063805 },
        "공릉동": { lat: 37.625556, lng: 127.072927 },
        "하계동": { lat: 37.639353, lng: 127.067555 },
        "중계동": { lat: 37.648067, lng: 127.077509 },
        "상계동": { lat: 37.660091, lng: 127.073513 }
    },
    dobong: {
        "전체": { lat: 37.665860, lng: 127.031767 },
        "쌍문동": { lat: 37.648639, lng: 127.034326 },
        "방학동": { lat: 37.667350, lng: 127.042687 },
        "창동": { lat: 37.653902, lng: 127.047211 },
        "도봉동": { lat: 37.680374, lng: 127.046158 }
    },
    dongdaemun: {
        "전체": { lat: 37.574264, lng: 127.039519 },
        "용두동": { lat: 37.574743, lng: 127.034893 },
        "신설동": { lat: 37.575712, lng: 127.022793 },
        "제기동": { lat: 37.582466, lng: 127.035731 },
        "전농동": { lat: 37.577120, lng: 127.057302 },
        "답십리동": { lat: 37.567919, lng: 127.052724 },
        "회기동": { lat: 37.589114, lng: 127.057121 },
        "휘경동": { lat: 37.588758, lng: 127.066580 },
        "이문동": { lat: 37.595772, lng: 127.067268 }
    },
    songpa: {
        "전체": { lat: 37.514575, lng: 127.105428 },
        "잠실동": { lat: 37.513261, lng: 127.098240 },
        "풍납동": { lat: 37.532191, lng: 127.119628 },
        "방이동": { lat: 37.516398, lng: 127.123700 },
        "오륜동": { lat: 37.508475, lng: 127.136208 },
        "오금동": { lat: 37.502662, lng: 127.128057 },
        "송파동": { lat: 37.502728, lng: 127.112381 },
        "석촌동": { lat: 37.505392, lng: 127.106891 },
        "삼전동": { lat: 37.499880, lng: 127.092995 },
        "가락동": { lat: 37.494409, lng: 127.125844 },
        "문정동": { lat: 37.486969, lng: 127.122467 },
        "장지동": { lat: 37.479580, lng: 127.135812 },
        "거여동": { lat: 37.493256, lng: 127.142672 },
        "마천동": { lat: 37.494221, lng: 127.149734 }
    },
    yeongdeungpo: {
        "전체": { lat: 37.526524, lng: 126.896601 },
        "영등포동": { lat: 37.518208, lng: 126.905237 },
        "여의도동": { lat: 37.521928, lng: 126.924374 },
        "당산동": { lat: 37.534406, lng: 126.902812 },
        "문래동": { lat: 37.517034, lng: 126.891872 },
        "양평동": { lat: 37.525052, lng: 126.886412 },
        "도림동": { lat: 37.508034, lng: 126.897982 },
        "신길동": { lat: 37.510512, lng: 126.917717 },
        "대림동": { lat: 37.494614, lng: 126.895862 }
    },
    junggu: {
        "전체": { lat: 37.563756, lng: 126.997471 },
        "명동": { lat: 37.563681, lng: 126.982768 },
        "을지로동": { lat: 37.566768, lng: 126.991589 },
        "신당동": { lat: 37.556755, lng: 127.014578 },
        "동화동": { lat: 37.560318, lng: 127.000161 },
        "황학동": { lat: 37.567441, lng: 127.019541 },
        "방산동": { lat: 37.566254, lng: 126.995756 },
        "충무로동": { lat: 37.561897, lng: 126.996961 },
        "회현동": { lat: 37.558155, lng: 126.978724 },
        "남대문로": { lat: 37.558729, lng: 126.977136 },
        "소공동": { lat: 37.564719, lng: 126.980008 },
        "다동": { lat: 37.568015, lng: 126.982562 },
        "무교동": { lat: 37.567293, lng: 126.978596 },
        "저동": { lat: 37.565308, lng: 126.985762 },
        "태평로": { lat: 37.566064, lng: 126.975304 },
        "정동": { lat: 37.565928, lng: 126.969849 },
        "장충동": { lat: 37.552777, lng: 127.005570 },
        "광희동": { lat: 37.563590, lng: 127.006582 }
    },
    gangbok: {
        "전체": { lat: 37.639741, lng: 127.025659 },
        "미아동": { lat: 37.627344, lng: 127.025393 },
        "번동": { lat: 37.636748, lng: 127.036191 },
        "수유동": { lat: 37.642196, lng: 127.014372 },
        "우이동": { lat: 37.663306, lng: 127.012644 }
    },
    seongbuk: {
        "전체": { lat: 37.589362, lng: 127.016834 },
        "성북동": { lat: 37.589072, lng: 127.005353 },
        "삼선동": { lat: 37.587737, lng: 127.010242 },
        "동선동": { lat: 37.591755, lng: 127.018832 },
        "돈암동": { lat: 37.603792, lng: 127.016615 },
        "안암동": { lat: 37.582647, lng: 127.029589 },
        "보문동": { lat: 37.583312, lng: 127.018708 },
        "정릉동": { lat: 37.604963, lng: 127.009564 },
        "길음동": { lat: 37.609064, lng: 127.020608 },
        "종암동": { lat: 37.602252, lng: 127.033162 },
        "석관동": { lat: 37.610615, lng: 127.057056 }
    },
    jongno: {
        "전체": { lat: 37.573050, lng: 126.979189 },
        "청운효자동": { lat: 37.584229, lng: 126.969107 },
        "사직동": { lat: 37.577914, lng: 126.966749 },
        "삼청동": { lat: 37.584750, lng: 126.981754 },
        "부암동": { lat: 37.592708, lng: 126.966213 },
        "평창동": { lat: 37.608337, lng: 126.977007 },
        "무악동": { lat: 37.582593, lng: 126.957730 },
        "교남동": { lat: 37.570529, lng: 126.961254 },
        "가회동": { lat: 37.582761, lng: 126.985022 },
        "종로1·2·3·4가동": { lat: 37.570387, lng: 126.985679 },
        "종로5·6가동": { lat: 37.572717, lng: 127.002183 },
        "이화동": { lat: 37.574378, lng: 127.004544 },
        "혜화동": { lat: 37.582474, lng: 127.001285 },
        "창신동": { lat: 37.574146, lng: 127.015512 },
        "숭인동": { lat: 37.573457, lng: 127.020855 }
    },
    eunpyeong: {
        "전체": { lat: 37.602227, lng: 126.929656 },
        "녹번동": { lat: 37.600845, lng: 126.933682 },
        "불광동": { lat: 37.610801, lng: 126.930975 },
        "갈현동": { lat: 37.618308, lng: 126.922318 },
        "구산동": { lat: 37.612528, lng: 126.915604 },
        "대조동": { lat: 37.609588, lng: 126.925305 },
        "응암동": { lat: 37.587688, lng: 126.921372 },
        "역촌동": { lat: 37.605924, lng: 126.918679 },
        "신사동": { lat: 37.585153, lng: 126.914509 },
        "증산동": { lat: 37.583966, lng: 126.909195 },
        "수색동": { lat: 37.577996, lng: 126.894780 },
        "진관동": { lat: 37.643202, lng: 126.916986 }
    },
    seodaemun: {
        "전체": { lat: 37.579896, lng: 126.936845 },
        "충현동": { lat: 37.561818, lng: 126.956543 },
        "천연동": { lat: 37.573395, lng: 126.950032 },
        "북아현동": { lat: 37.562801, lng: 126.953044 },
        "홍제동": { lat: 37.588593, lng: 126.946737 },
        "연희동": { lat: 37.567587, lng: 126.929391 },
        "홍은동": { lat: 37.600146, lng: 126.944580 },
        "남가좌동": { lat: 37.575315, lng: 126.922776 },
        "북가좌동": { lat: 37.577559, lng: 126.910845 },
        "현저동": { lat: 37.570188, lng: 126.944802 },
        "대현동": { lat: 37.558569, lng: 126.945128 },
        "냉천동": { lat: 37.571190, lng: 126.954019 },
        "미근동": { lat: 37.578401, lng: 126.934601 },
        "합동": { lat: 37.563877, lng: 126.961405 }
    },
    mapo: {
        "전체": { lat: 37.563655, lng: 126.908397 },
        "아현동": { lat: 37.559028, lng: 126.956602 },
        "공덕동": { lat: 37.544694, lng: 126.953483 },
        "도화동": { lat: 37.543529, lng: 126.946744 },
        "용강동": { lat: 37.538368, lng: 126.940429 },
        "마포동": { lat: 37.538998, lng: 126.935641 },
        "대흥동": { lat: 37.552827, lng: 126.939515 },
        "염리동": { lat: 37.545154, lng: 126.946875 },
        "신수동": { lat: 37.550296, lng: 126.930579 },
        "노고산동": { lat: 37.556360, lng: 126.936672 },
        "현석동": { lat: 37.536930, lng: 126.926014 },
        "구수동": { lat: 37.549454, lng: 126.929774 },
        "창전동": { lat: 37.550692, lng: 126.929335 },
        "상수동": { lat: 37.547342, lng: 126.922828 },
        "하중동": { lat: 37.547211, lng: 126.920456 },
        "신정동": { lat: 37.555252, lng: 126.920736 },
        "서교동": { lat: 37.552860, lng: 126.919247 },
        "동교동": { lat: 37.556977, lng: 126.923289 },
        "합정동": { lat: 37.549563, lng: 126.913220 },
        "망원동": { lat: 37.558378, lng: 126.905707 },
        "연남동": { lat: 37.562597, lng: 126.927113 },
        "성산동": { lat: 37.568021, lng: 126.908017 },
        "중동": { lat: 37.566816, lng: 126.912417 }
    },
    jungnang: {
        "전체": { lat: 37.606881, lng: 127.092228 },
        "면목동": { lat: 37.580293, lng: 127.087515 },
        "상봉동": { lat: 37.596782, lng: 127.085708 },
        "중화동": { lat: 37.603002, lng: 127.078833 },
        "묵동": { lat: 37.611504, lng: 127.076974 },
        "망우동": { lat: 37.599267, lng: 127.102866 },
        "신내동": { lat: 37.612242, lng: 127.098873 }
    },
    yongsan: {
        "전체": { lat: 37.531100, lng: 126.981074 },
        "후암동": { lat: 37.550732, lng: 126.978623 },
        "용산동2가": { lat: 37.541544, lng: 126.972341 },
        "용산동4가": { lat: 37.541973, lng: 126.970316 },
        "용산동5가": { lat: 37.543051, lng: 126.967875 },
        "남영동": { lat: 37.541497, lng: 126.972983 },
        "청파동1가": { lat: 37.548052, lng: 126.971644 },
        "청파동2가": { lat: 37.548936, lng: 126.968670 },
        "청파동3가": { lat: 37.549627, lng: 126.964803 },
        "원효로1가": { lat: 37.539151, lng: 126.960763 },
        "원효로2가": { lat: 37.537921, lng: 126.960136 },
        "문배동": { lat: 37.537101, lng: 126.967149 },
        "신계동": { lat: 37.535422, lng: 126.962192 },
        "원효로3가": { lat: 37.534512, lng: 126.956456 },
        "원효로4가": { lat: 37.532628, lng: 126.950987 },
        "효창동": { lat: 37.539711, lng: 126.956977 },
        "도원동": { lat: 37.534227, lng: 126.948695 },
        "용문동": { lat: 37.536329, lng: 126.953170 },
        "한강로1가": { lat: 37.532510, lng: 126.965674 },
        "한강로2가": { lat: 37.529671, lng: 126.966318 },
        "한강로3가": { lat: 37.526324, lng: 126.967984 },
        "이촌동": { lat: 37.519058, lng: 126.971847 },
        "이태원동": { lat: 37.533937, lng: 126.994177 },
        "한남동": { lat: 37.531167, lng: 127.006347 },
        "동빙고동": { lat: 37.519566, lng: 127.001365 },
        "서빙고동": { lat: 37.518498, lng: 126.993970 },
        "주성동": { lat: 37.529431, lng: 127.007850 },
        "보광동": { lat: 37.529902, lng: 127.002049 }
    },
    seocho: {
        "전체": { lat: 37.483312, lng: 127.032433 },
        "서초동": { lat: 37.491917, lng: 127.007878 },
        "잠원동": { lat: 37.513054, lng: 127.018209 },
        "반포동": { lat: 37.508658, lng: 127.018694 },
        "방배동": { lat: 37.481493, lng: 126.982275 },
        "양재동": { lat: 37.470022, lng: 127.037405 },
        "내곡동": { lat: 37.451981, lng: 127.082425 }
    },
    yangcheon: {
        "전체": { lat: 37.516466, lng: 126.866501 },
        "목동": { lat: 37.526421, lng: 126.864201 },
        "신정동": { lat: 37.520456, lng: 126.854329 },
        "신월동": { lat: 37.512218, lng: 126.831566 }
    }
};

// 모달 열기
regionSelectBtn.addEventListener("click", () => {
    regionModal.classList.remove("hidden");

    // 구 선택 초기화
    guSelector.value = ""; // 기본값 설정
    dongSelector.innerHTML = "<option value='' disabled selected>동 선택</option>";
    dongSelector.disabled = true; // 동 선택 비활성화
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
    const selectedGu = guSelector.value;
    const selectedDong = dongSelector.value;

    if (selectedGu && selectedDong) {
        const coordinates = dongCoordinates[selectedGu][selectedDong];
        if (coordinates) {
            const { lat, lng } = coordinates;
            const newPosition = new naver.maps.LatLng(lat, lng);
            ////////////////////////////////////////// - 김명찬님 코드
            //코드 추가 지역선택 시 반경 1km 맛집 정보 팝업 생성 --*
            //가게 검색했을 때 마커
            if(marker) {
                marker.setMap(null);
                marker = null;

            }

            //현 위치 기준 1km 내 식당을 표시해주는 마커
            if(markers && markers.length > 0) {
                markers.forEach(marker => {
                    marker.setMap(null); //배열의 각 마커 지우기

                })

                // 배열 비우기
                markers.length = 0;
            }

            map = new naver.maps.Map('map' , {
                position : newPosition,
                zoom : 15
            })

            fetch('/allData')
                .then(response => response.json())
                .then(data => {
                    restaurantData = data;

                    const filteredRestaurants = filterRestaurants(lat , lng, restaurantData);

                    filteredRestaurants.forEach(restaurant => {

                        //음식점 정보 팝업창
                        const infoWindow00 = new naver.maps.InfoWindow({
                            content: '<div style= display: flex; align-items: center; padding:10px; font-size: 9px">' +
                                '<h4>' + restaurant.restaurantName + '</h4>' +
                                '<p> 종류 : ' + restaurant.category + '</p>' +
                                '</div>'
                        })

                        //음식점 마커
                        const marker00 = new naver.maps.Marker({
                            position : new naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
                            map : map
                        })

                        // 마커 클릭 시 인포윈도우 표시
                        naver.maps.Event.addListener(marker00, 'click', function() {
                            infoWindow00.open(map, marker00);
                        });

                        markers.push(marker00);  //배열에 마커 추가

                    })

                    map.setCenter(newPosition);
                    map.setZoom(15);

                })
                .catch(err => console.error("Failed", err));

            /////////////////////////////////////////////--*

        } else {        // 전준영님 코드
            alert("좌표 정보가 없습니다.");
        }

        regionModal.classList.add("hidden");
    } else {
        alert("구와 동을 모두 선택해주세요.");
    }
});

function renderRestaurantList(data) {
    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.innerHTML = ''; // 기존 리스트 초기화

    if (data.length === 0) {
        // 데이터가 없을 때 기본 메시지 표시
        restaurantList.innerHTML = '<div class="restaurant-list-placeholder">표시할 음식점이 없습니다.</div>';
        return;
    }

    // 데이터가 있으면 리스트 항목 추가
    data.forEach((restaurant) => {
        const listItem = document.createElement('div');
        listItem.className = 'restaurant-list-item';
        listItem.innerHTML = `
            <h4>${restaurant.name}</h4>
            <p>${restaurant.address}</p>
            <p>${restaurant.category}</p>
        `;
        restaurantList.appendChild(listItem);
    });
}

//====================================================================================

//입력창 비우기
reset.addEventListener("click", function() {
    loc.value = "";

})

var map = new naver.maps.Map('map' , {
    center : new naver.maps.LatLng(37.5665, 126.9780),
    zoom : 11
})


search.addEventListener("click",  function() {
    input = loc.value;

    //console.log("입력값 : ",input);

    //가게 검색했을 때 마커
    if(marker) {
        marker.setMap(null);
        marker = null;

    }

    //현 위치 기준 1km 내 식당을 표시해주는 마커
    if(markers && markers.length > 0) {
        markers.forEach(marker => {
            marker.setMap(null); //배열의 각 마커 지우기
        })

        // 배열 비우기
        markers.length = 0;
    }

    //const url = "/getRestaurantName?input=" + input;
    //console.log(url);



    fetch(`/getRestaurantName?input=${input}`)


        .then(response => response.json())
        .then(data => {
            console.log(input , "ffff");
            //지도에 표시된 특정 위치에 대한 정보를 팝업 형태로 보여줌
            var infowindow = new naver.maps.InfoWindow({
                //content 안에는 html 문자열로 정의함.(이미지,텍스트,링크 등 포함가능)
                content: '<div style= display: flex; align-items: center; padding:10px; font-size: 12px">' +
                    '<img src="/images/image01.png" style="width:100px; height:auto;  overflow-clip-margin: content-box; overflow: clip; ">' + // 이미지 추가
                    '<h4>' + data.name + '</h4>' +
                    '<p> 주소 : ' + data.addr + '</p>' +
                    '<p> 종류 : ' + data.category + '</p>' +
                    '<p> 영업 : ' + data.open +  '~' + data.close + '</p>' +
                    '</div>'
            })

            //새 마커 지도에 추가
            marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(data.latitude, data.longitude),
                map: map
            })


            infowindow.open(map, marker);

            //지도 중심 이동
            map.setCenter(new naver.maps.LatLng(data.latitude, data.longitude));
            map.setZoom(15);

        })
        .catch(error => console.log('Error : ', error));

})

myloc.addEventListener("click", function() {
    //가게 검색했을 때 마커
    if(marker) {
        marker.setMap(null);
        marker = null;

    }

    //현 위치 기준 1km 내 식당을 표시해주는 마커
    if(markers && markers.length > 0) {
        markers.forEach(marker => {
            marker.setMap(null); //배열의 각 마커 지우기

        })

        // 배열 비우기
        markers.length = 0;
    }

    map = new naver.maps.Map('map' , {
        center : new naver.maps.LatLng(37.5172, 127.0413), //내가 있는 지역이 서울이 아니라서 일단 강남구청역으로 고정
        zoom : 11
    })


    // 현재 위치에 마커 표시
    marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5172, 127.0413),
        map: map,
        icon: {
            url: "/images/location_icon.png", // 현재 위치와 비슷한 아이콘 URL
            size: new naver.maps.Size(24, 37),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(12, 37),
        }
    });

    fetch('/allData')
        .then(response => response.json())
        .then(data => {
            restaurantData = data;

            const filteredRestaurants = filterRestaurants(37.5172, 127.0413, restaurantData);

            filteredRestaurants.forEach(restaurant => {

                const infoWindow00 = new naver.maps.InfoWindow({
                    content: '<div style= display: flex; align-items: center; padding:10px; font-size: 9px">' +
                        '<h4>' + restaurant.restaurantName + '</h4>' +
                        '<p> 종류 : ' + restaurant.category + '</p>' +
                        '</div>'
                })

                const marker00 = new naver.maps.Marker({
                    position : new naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
                    map : map
                })

                // 마커 클릭 시 인포윈도우 표시
                naver.maps.Event.addListener(marker00, 'click', function() {
                    infoWindow00.open(map, marker00);
                });

                markers.push(marker00);  //배열에 마커 추가

            })

            map.setCenter(new naver.maps.LatLng(37.5172, 127.0413));
            map.setZoom(15);


        })
        .catch(err => console.error("Failed", err));



})


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
    return restaurants.filter(restaurant => {
        const distance = calculateDistance(centerLat, centerLng, restaurant.latitude, restaurant.longitude);
        return distance <= 1; // 반경 1km 이내
    });
}
