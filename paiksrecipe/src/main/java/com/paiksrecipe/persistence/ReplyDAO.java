package com.paiksrecipe.persistence;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.paiksrecipe.domain.ReplyDTO;

public interface ReplyDAO {
	public List<ReplyDTO> list(@Param("bno") int bno);

	public void insert(ReplyDTO rDto);

	public void delete(@Param("rno") int rno);

	public void replyCntUpdate(@Param("bno") int bno, @Param("type") String type);
}
