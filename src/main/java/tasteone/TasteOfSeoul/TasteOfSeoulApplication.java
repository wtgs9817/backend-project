package tasteone.TasteOfSeoul;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.support.ErrorPageFilter;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@MapperScan(basePackages = {"tasteone.TasteOfSeoul.mapper"})  //
public class TasteOfSeoulApplication extends SpringBootServletInitializer {


	//application 클래스에 SpringBootServletInitializer 상속받고 메소드를 정의하면
	//프로젝트 처음만들 때 생성되는 서블릿 클래스는 필요가 없음.
	// 추가 SpringBootServletInitializer 를 사용하지 않으면 war로 배포할 수 없음.

	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TasteOfSeoulApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(TasteOfSeoulApplication.class, args);
	}


}
