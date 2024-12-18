package tasteone.TasteOfSeoul.mapper;

import org.apache.ibatis.annotations.Mapper;
import tasteone.TasteOfSeoul.domain.RestaurantVO;

import java.util.List;
import java.util.Map;

@Mapper
public interface RestaurantMapper {

     RestaurantVO restaurantName(String name);

     List<RestaurantVO> restaurantList(Map<String, Object> paraeterMap);

    Integer restaurantTotalCount(Map<String, Object> paraeterMap);


}
