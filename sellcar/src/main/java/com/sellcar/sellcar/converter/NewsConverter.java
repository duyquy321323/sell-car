package com.sellcar.sellcar.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sellcar.sellcar.entity.News;
import com.sellcar.sellcar.request.CreateNewsRequest;
import com.sellcar.sellcar.response.NewsDetailResponse;
import com.sellcar.sellcar.response.NewsResponse;

@Component
public class NewsConverter {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserConverter userConverter;

    public News createNewsRequestToNews(CreateNewsRequest request){
        return modelMapper.map(request, News.class);
    }

    public NewsResponse newsToNewsResponse(News news){
        NewsResponse response = modelMapper.map(news, NewsResponse.class);
        response.setAuthor(userConverter.userToUserDTO(news.getAuthor()));
        return response;
    }

    public NewsDetailResponse newsToNewsDetailResponse(News news){
        NewsDetailResponse response = modelMapper.map(news, NewsDetailResponse.class);
        response.setAuthor(userConverter.userToUserDTO(news.getAuthor()));
        return response;
    }
}