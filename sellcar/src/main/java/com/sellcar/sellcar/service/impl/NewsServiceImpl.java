package com.sellcar.sellcar.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sellcar.sellcar.converter.CommentConverter;
import com.sellcar.sellcar.converter.NewsConverter;
import com.sellcar.sellcar.entity.Dealer;
import com.sellcar.sellcar.entity.News;
import com.sellcar.sellcar.exception.NotFoundException;
import com.sellcar.sellcar.repository.DealerRepository;
import com.sellcar.sellcar.repository.NewsRepository;
import com.sellcar.sellcar.request.CreateNewsRequest;
import com.sellcar.sellcar.response.NewsDetailResponse;
import com.sellcar.sellcar.response.NewsResponse;
import com.sellcar.sellcar.service.NewsService;
import com.sellcar.sellcar.utils.ImageComponent;

@Service
@Transactional
public class NewsServiceImpl implements NewsService {

    @Autowired
    private ImageComponent imageComponent;

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private NewsConverter newsConverter;

    @Autowired
    private DealerRepository dealerRepository;

    @Autowired
    private CommentConverter commentConverter;

    @Override
    public void createNews(CreateNewsRequest request, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Optional<Dealer> dealerOp = dealerRepository.findByEmail(userDetails.getUsername());
        if(dealerOp.isPresent()){
            News news = newsConverter.createNewsRequestToNews(request);
            news.setAuthor(dealerOp.get());
            news.setCreatedDate(new Date());
            newsRepository.save(news);
            return;
        }
        throw new NotFoundException("Tác giả không tồn tại!!!");
    }

    @Override
    public String uploadImage(MultipartFile image) {
        return imageComponent.uploadImage(image);
    }

    @Override
    public List<NewsResponse> getRecentNews() {
        Pageable pageable = PageRequest.of(0, 10);
        List<News> news = newsRepository.findRecentNews(pageable);
        return news.stream().map(n -> {
            NewsResponse response = newsConverter.newsToNewsResponse(n);
            response.setCommentQuantity(n.getComments().size());
            return response;
        }).collect(Collectors.toList());
    }

    @Override
    public NewsDetailResponse findNewsById(Integer id) {
        Optional<News> newsOp = newsRepository.findById(id);
        if(newsOp.isPresent()){
            NewsDetailResponse response = newsConverter.newsToNewsDetailResponse(newsOp.get());
            response.setComments(newsOp.get().getComments().stream().map(comment -> commentConverter.commentToCommentResponse(comment)).collect(Collectors.toList()));
            return response;
        }
        throw new NotFoundException("Tin tức không tồn tại hoặc đã bị xóa!!!");
    }

    @Override
    public List<NewsResponse> getHotNews() {
        Pageable pageable = PageRequest.of(0, 10);
        List<News> news = newsRepository.findHotNews(pageable);
        return news.stream().map(n -> {
            NewsResponse response = newsConverter.newsToNewsResponse(n);
            response.setCommentQuantity(n.getComments().size());
            return response;
        }).collect(Collectors.toList());
    }

}