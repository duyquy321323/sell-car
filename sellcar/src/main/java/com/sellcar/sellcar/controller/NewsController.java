package com.sellcar.sellcar.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sellcar.sellcar.request.CreateNewsRequest;
import com.sellcar.sellcar.request.ImageFile;
import com.sellcar.sellcar.response.NewsDetailResponse;
import com.sellcar.sellcar.response.NewsResponse;
import com.sellcar.sellcar.service.NewsService;

@RestController
@RequestMapping("/api/v1/news")
public class NewsController {

    @Autowired
    private NewsService newsService;
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createNews(@ModelAttribute CreateNewsRequest request, Authentication authentication, BindingResult result){
        if(result.hasErrors()){
            List<String> errorMessages = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
        }
        newsService.createNews(request, authentication);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/url-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> getUrlImage(@ModelAttribute ImageFile file){
        return ResponseEntity.ok(newsService.uploadImage(file.getFile()));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<NewsResponse>> getRecentNews(){
        return ResponseEntity.ok(newsService.getRecentNews());
    }

    @GetMapping("/hot")
    public ResponseEntity<List<NewsResponse>> getHotNews(){
        return ResponseEntity.ok(newsService.getHotNews());
    }

    @GetMapping("{id}")
    public ResponseEntity<NewsDetailResponse> getDetailNews(@PathVariable("id") Integer id){
        return ResponseEntity.ok(newsService.findNewsById(id));
    }
}