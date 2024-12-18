package tasteone.TasteOfSeoul.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import tasteone.TasteOfSeoul.domain.RestaurantVO;
import tasteone.TasteOfSeoul.service.RestaurantService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/restaurant")
public class RestaurantController {

    private final RestaurantService restaurantService;


    // http:localhost:8888/restaurant/map
    @GetMapping("/map")
    public String map(Model model) {
        System.out.println("지도 실행중...");
        return "restaurant";
    }



    // http:localhost:8888/restaurant/list
    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<?> restaurantList(@RequestParam Map<String, Object> paramMap) {
        System.out.println(" 파라미터 값 : " + paramMap.toString());


        Integer totalCount=restaurantService.restaurantTotalCount(paramMap);
        List<RestaurantVO>  list=restaurantService.restaurantList(paramMap);
        // Map<String, Object> resultMap=new HashMap<>();
        paramMap.put("totalCount",totalCount);
        paramMap.put("list",list);
        return ResponseEntity.ok(paramMap);
    }






    @GetMapping("/getRestaurantName")
    public ResponseEntity<Map<String, Object>> testData(@RequestParam String input) {

        System.out.println("값 : " + input);

        Map<String, Object> data = new HashMap<>();
        RestaurantVO vo = restaurantService.getRestaurantName(input);
        System.out.println(vo);
        System.out.println("가게명 : " + vo.getRestaurantName());
        System.out.println("주소 : " + vo.getAddress());
        System.out.println(" 위도: " + vo.getLatitude());
        System.out.println(" 경도: " + vo.getLongitude());

        data.put("name", vo.getRestaurantName());  //가게명
        data.put("addr", vo.getAddress());         //가게주소
        data.put("latitude", vo.getLatitude());    //가게 위도
        data.put("longitude", vo.getLongitude());  //가게 경도
        data.put("open", vo.getOpenHour());        //오픈시간
        data.put("close", vo.getCloseHour());      //마감시간
        data.put("category", vo.getCategory());    //음식 카테고리
        return ResponseEntity.ok(data);
    }



    @GetMapping("/allData")
    public ResponseEntity<List<RestaurantVO>> getData(Map<String, Object> paraeterMap) {
        List<RestaurantVO> list = restaurantService.restaurantList(paraeterMap);
        return ResponseEntity.ok(list);
    }



}