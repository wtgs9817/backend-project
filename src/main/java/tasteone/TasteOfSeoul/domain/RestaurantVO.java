package tasteone.TasteOfSeoul.domain;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantVO {

    /*
    private int id;
    private int rownum;
    private String restaurant; // 음식점
    private String address; // 주소
    private String foodCategory; // 음식카테고리
    private String latitude; //위도
    private String longitude;  //경도
    private String openTime; //오픈
    private String closeTime; //마감
    private String contact; //연락처

     */

    private Long restaurantId;
    private String restaurantName;  //음식점 이름
    private String address;  // 음식점 주소
    private String category;  //음식 카테고리
    private BigDecimal latitude;  // 위도
    private BigDecimal longitude;  // 경도
    private LocalTime openHour;  // 오픈시간
    private LocalTime closeHour;  // 마감시간
    private String phone;  //  연락처

}
