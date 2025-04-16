package com.sellcar.sellcar.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sellcar.sellcar.entity.Comment;
import com.sellcar.sellcar.response.CommentResponse;

@Component
public class CommentConverter {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserConverter userConverter;

    public CommentResponse commentToCommentResponse(Comment comment){
        CommentResponse response = modelMapper.map(comment, CommentResponse.class);
        response.setViewer(userConverter.userToUserDTO(comment.getViewer()));
        return response;
    }
}