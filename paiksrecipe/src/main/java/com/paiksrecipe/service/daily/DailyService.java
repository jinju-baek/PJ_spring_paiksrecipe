package com.paiksrecipe.service.daily;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paiksrecipe.domain.DailyDTO;
import com.paiksrecipe.persistence.DailyDAO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DailyService {
	// 1. 인터페이스 만들고 구현받아서 오버라이딩 한 메서드를 사용 할 것인지?
	// 2. 내가 그냥 직접 만들어서 사용할 것인지?
	
	@Autowired
	private SqlSession sqlSession;
	
	DailyDAO dDao; // 전역변수
	@Autowired
	public void newDailDAO() {
		dDao = sqlSession.getMapper(DailyDAO.class);
	}
	
	public void dailyCreate(DailyDTO dDto) {
		dDao.dailyCreate(dDto);
	}
	public List<DailyDTO> dailyRead() {
		// 비즈니스 로직
		// DB에 가서 오늘 출석글만 LIST로 담아와서 
		// Controller단으로 전달 -> return으로 전달
		return dDao.dailyRead();
	}
	public void dailyUpdate() {
		
	}
	public void dailyDelete() {
		
	}
}
