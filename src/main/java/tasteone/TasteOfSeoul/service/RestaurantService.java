package tasteone.TasteOfSeoul.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tasteone.TasteOfSeoul.domain.RestaurantVO;
import tasteone.TasteOfSeoul.mapper.RestaurantMapper;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantMapper restaurantMapper;


    public RestaurantVO getRestaurantName(String name) {
        return restaurantMapper.restaurantName(name);
    }



    public List<RestaurantVO> restaurantList(Map<String, Object> paraeterMap) {
        return restaurantMapper.restaurantList(paraeterMap);
    }


    public Integer restaurantTotalCount(Map<String, Object> paraeterMap) {
        return restaurantMapper.restaurantTotalCount(paraeterMap);
    }

}
