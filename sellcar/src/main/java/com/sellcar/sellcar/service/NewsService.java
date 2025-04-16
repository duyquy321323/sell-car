package com.sellcar.sellcar.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import com.sellcar.sellcar.request.CreateNewsRequest;
import com.sellcar.sellcar.response.NewsDetailResponse;
import com.sellcar.sellcar.response.NewsResponse;

public interface NewsService {
    public void createNews(CreateNewsRequest request, Authentication authentication);

    public String uploadImage(MultipartFile image);

    public List<NewsResponse> getRecentNews();

    public List<NewsResponse> getHotNews();

    public NewsDetailResponse findNewsById(Integer id);
}