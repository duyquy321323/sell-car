package com.sellcar.sellcar.response;

import java.util.Date;
import java.util.List;

import com.sellcar.sellcar.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsDetailResponse {
    private Integer id;
    private String title;
    private String posterUrl;
    private String description;
    private UserDTO author;
    private String content;
    private Date createdDate;
    private List<CommentResponse> comments;
}