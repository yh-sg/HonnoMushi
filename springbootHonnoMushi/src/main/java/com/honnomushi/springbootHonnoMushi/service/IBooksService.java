package com.honnomushi.springbootHonnoMushi.service;

import java.util.List;

import com.honnomushi.springbootHonnoMushi.model.Books;

public interface IBooksService {
	List<Books> findall();
	List<Books> findBooksByLetter(String letter);
}
