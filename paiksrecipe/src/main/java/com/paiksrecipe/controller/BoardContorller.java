package com.paiksrecipe.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.paiksrecipe.domain.BoardDTO;
import com.paiksrecipe.service.board.BoardService;
import com.paiksrecipe.service.board.Pager;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/board")
public class BoardContorller {

	@Autowired
	BoardService bService;
	
	//
	// curPage : 어떤 페이지를 띄울것인지
	// sort_option : 정렬할 값
	// search_option : 검색 옵션
	// keyword : 검색어
	
	@GetMapping("/list")
	public String list(@RequestParam(defaultValue="1") int curPage, @RequestParam(defaultValue="new") String sort_option, 
			@RequestParam(defaultValue="all") String search_option, @RequestParam(defaultValue="") String keyword, Model model) {
		log.info("★★★★★★★★★★★★★★★ GET: BOARD List PAGE");
		
		// 게시글 개수 계산
		int count = bService.countArticle(search_option, keyword);
		
		// 페이지 관련 설정
		Pager pager = new Pager(count, curPage);
		int start = pager.getPageBegin();
		int end = pager.getPageEnd();

		List<BoardDTO> list = bService.listAll(sort_option, search_option, keyword, start, end); // 게시물 목록
		
		Map<String, Object> map = new HashMap<>();
		map.put("count", count);
		map.put("list", list);
		map.put("pager", pager);
		map.put("sort_option", sort_option);
		map.put("search_option", search_option);
		map.put("keyword", keyword);
		
		model.addAttribute("map", map);
		
		log.info(pager.toString());
		return "board/list";
	}
	
	@GetMapping("/view/{bno}")
	public String view(@PathVariable(value="bno") int bno, Model model, HttpSession session) {
		log.info("★★★★★★★★★★★★★★★ GET: BOARD VIEW PAGE");
		
		// 1. 해당 bno 조회수 +1 증가
		bService.increaseViewCnt(session, bno);
		
		// DB에서 해당 bno정보를 get해서 view단으로 전송
		model.addAttribute("one", bService.view(bno));
		model.addAttribute("key", "dropBoard");
		
		return "board/view";
	}
	
	@GetMapping("/delete")
	public String delete(int bno) {
		log.info("★★★★★★★★★★★★★★★ GET: BOARD DELETE ACTION");
		
		bService.delBoard(bno);
		
		return "redirect:/board/list";
	}
	
	@GetMapping("/write")
	public String write(HttpSession session, Model model) {
		log.info("★★★★★★★★★★★★★★★ GET: BOARD WRITE PAGE");
		
		model.addAttribute("userid", (String)session.getAttribute("userid"));
		model.addAttribute("name", (String)session.getAttribute("name"));
		
		return "board/register";
	}
	
	@PostMapping("/write")
	public String write(BoardDTO bDto) {
		log.info("★★★★★★★★★★★★★★★ POST: BOARD WRITE ACTION");

		log.info(bDto.toString());
		
		if(bDto.getFiles() == null) { // 첨부파일 NO
			bDto.setFileCnt(0);
		} else { // 첨부파일 YES
			log.info("★★★★★★★★★★★★★★★ 첨부파일 수: " + bDto.getFiles().length);
			bDto.setFileCnt(bDto.getFiles().length);
		}
	
		bService.write(bDto);
		
		return "redirect:/board/view/" + bDto.getBno();
	}
	
	@GetMapping("/update")
	public String update(int bno, Model model) {
		log.info("★★★★★★★★★★★★★★★ GET: BOARD UPDATE VIEW PAGE");

		// 수정을 원하는 게시글의 정보를(1줄) 원함
		model.addAttribute("one", bService.view(bno));
		return "board/register";
	}
	
	@PostMapping("/update")
	public String update(BoardDTO bDto) {
		log.info("★★★★★★★★★★★★★★★ POST: BOARD UPDATE VIEW PAGE");
		
		if(bDto.getFiles() == null) { // 첨부파일 NO
			bDto.setFileCnt(0);
		} else {
			log.info("첨부파일 수 : " + bDto.getFiles().length);
			bDto.setFileCnt(bDto.getFiles().length);
		}
		
		bService.updateBoard(bDto); 
		return "redirect:/board/view/" + bDto.getBno();
	}
	
	@PostMapping("/getAttach")
	@ResponseBody
	public List<String> getAttach(int bno) {
		log.info("★★★★★★★★★★★★★★★ POST: BOARD GETATTACH ACTION");
		log.info("★★★★★★★★★★★★★★★ bno: " + bno);
		
		return bService.getAttach(bno);
	}
}
