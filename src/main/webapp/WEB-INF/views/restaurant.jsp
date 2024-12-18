<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>웹페이지 제목</title>
	<link rel="stylesheet" type="text/css" href="/css/project01.css">
	<link rel="stylesheet" type="text/css" href="/css/restaurant.css">

	<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=kyvybyx7ee&submodules=geocoder"></script>
	<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body>


<header class="Header__Content">
	<div class="sc-beySbM bZhUCZ Common__Desk__Header">
		<div class="sc-guDLRT iBLjKP Header__Wrap">
			<div class="sc-hLQRIN hvFUgs Main__Logo">
				<a href="/">
					HOME
				</a>
			</div>
			<button id="myloc" type="button"> 현위치 조회 </button>
			<div class="sc-dmyDGi iIZNMU">
				<div class="sc-iBdmCd kcCZjE Input__Wrap">
					<input id="loc" class="sc-kFCsca fhEYBR Search__Input" placeholder="지역, 음식 또는 식당명 입력" value="">
					<button id="reset" class="sc-irLwvL iygqYW Search__Remove__Button">
						<img id="DeleteImg"
							 src="https://dcicons.s3.ap-northeast-1.amazonaws.com/new/images/web/react_components/SearchQueryInput/delete.png"
							 alt="검색어 지우기 버튼 이미지"></button>
					<button id="search" class="sc-jsEegt hKYKMU search" type="button" aria-label="검색하기 버튼"></button>
				</div>
			</div>
			<div class="sc-eDLJxc hJMKOc Auth__Box"></div>
		</div>
	</div>
</header>

<div class="content" style="height: auto !important;">
	<div class="sidebar">
		<div class="sc-jPQLIr fhXmKH Scroll__List__Section">
			<div class="sc-eKzwpa cGgrIe close" style="overflow: hidden; height: 220px; transition: height 0.5s;">
				<div class="sc-ppyJt gKbswF ColumFilter">
					<div class="sc-jiaTdC kykQke SearchFilterDivision">
						<div id="scrollObserver" style="width: 0px; height: 0px; margin: 0px; padding: 0px;"></div>
						<button id="category-tab" class="sc-gUjXxn sc-kZOrUE jfazXL eZQCTf">
							<div class="Text-Box-Img"><span>카테고리</span></div>
						</button>
						<button id="region-tab" class="sc-gUjXxn sc-kZOrUE jfazXL eZQCTf">
							<div class="Text-Box-Img"><span>지역</span></div>
						</button>
					</div>
					<div class="sc-hVcFhV kQoeOl Search-Filter">

						<ul class="sc-bCvmcN iwhOAe Category-Filter">
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="all"  />
									<span>전체</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="한식"  />
									<span>한식</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory"  value="중식" />
									<span>중식</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="일식" />
									<span>일식</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory"  value="양식" />
									<span>양식</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="아시안" />
									<span>아시안</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory"  value="카페"  />
									<span>카페</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="술집" />
									<span>술집</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory"  value="분식" />
									<span>분식</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory"  value="육류" />
									<span>육류</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="해산물" />
									<span>해산물</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="경양식" />
									<span>경양식</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="뷔페식" />
									<span>뷔페식</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="호프/통닭" />
									<span>호프/통닭</span>
								</label>
							</li>
							<li class="sc-egTteO kEDWgc Query">
								<label>
									<input type="radio" name="searchCategory" value="기타" />
									<span>기타</span>
								</label>
							</li>
						</ul>


						<!-- 지역 내용 -->
						<div id="region-content" class="sc-bCvmcN iwhOAe Category-Filter hidden">
							<div id="searchAddressText">

							</div>
							<button id="region-select-btn" class="region-btn">지역 선택</button>
						</div>
						<!-- 모달 -->
						<div id="region-modal" class="modal hidden">
							<div class="modal-content">
								<h2>서울 지역 선택</h2>
								<div style="display: flex; gap: 10px;">
									<!-- 구 선택 -->
									<select id="gu-selector" class="region-dropdown">
										<option value="" disabled selected>구 선택</option>
										<option value="gangnam">강남구</option>
										<option value="gangdong">강동구</option>
										<option value="gangseo">강서구</option>
										<option value="gwanak">관악구</option>
										<option value="dongjak">동작구</option>
									</select>
									<!-- 동 선택 -->
									<select id="dong-selector" class="region-dropdown" disabled>
										<option value="" disabled selected>동 선택</option>
									</select>
								</div>
								<div style="margin-top: 20px; display: flex; justify-content: space-between;">
									<button id="confirm-region" class="region-btn">선택 완료</button>
									<button id="close-region-modal" class="region-btn">취소</button>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>

			<div>
				<h2 class="location-title" id="location-title">내주변 500m 맛집 (296곳)</h2>
				<div id="restaurant-list" class="restaurant-list">
					<div class="restaurant-list-placeholder" id="restaurant-list-placeholder">데이터를 불러오는 중입니다...</div>
				</div>
			</div>


		</div>

	</div>

	<div  id="distanceMenu">
		<div id="filter-menu" style="display: flex; justify-content: center; margin-top: 10px;">
			<button class="filter-btn" data-distance="0.1" >100m</button>
			<button class="filter-btn" data-distance="0.3" >300m</button>
			<button class="filter-btn" data-distance="0.5" >500m</button>
			<button class="filter-btn active" data-distance="1">1km</button>
			<button class="filter-btn" data-distance="3">3km</button>
			<button class="filter-btn" data-distance="5">5km</button>
			<button class="filter-btn" data-distance="10">10km</button>
			<button class="filter-btn" data-distance="30">30km</button>
			<button class="filter-btn" data-distance="100">100km</button>
			<button class="filter-btn" data-distance="3000">전국</button>
		</div>
	</div>


	<div id="map" style=" margin-top:150px;  width:90vw;height:100vh;"></div>
</div>

<script src="/js/restaurant.js"></script>
<script src="/js/project01.js"></script>




</body>
</html>