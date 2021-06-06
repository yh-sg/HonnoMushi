package com.honnomushi.springbootHonnoMushi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.honnomushi.springbootHonnoMushi.model.Books;
import com.honnomushi.springbootHonnoMushi.service.BooksService;


@RestController
@RequestMapping("/books")
public class BooksController {
	@Autowired
	private BooksService booksService;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> findBooks(){
			List<Books> books = booksService.findall();
			Map<String, Object> result = new HashMap<String,Object>();
			result.put("books",books);
		    result.put("count",books.size());
		try {
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value="/{letter}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> findBookLetter(@PathVariable String letter){
		List<Books> booksLetter = booksService.findBooksByLetter(letter);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("booksLetter",booksLetter);
	    result.put("count",booksLetter.size());
	    result.put("letter",letter);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
