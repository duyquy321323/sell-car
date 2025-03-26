package com.sellcar.sellcar.request;

import java.util.List;

import lombok.Getter;

@Getter
public class SearchCarRequest {
    private String title;
    private String condition;
    private List<String> years;
    private Long priceFrom;
    private Long priceTo;
    private Integer capacity;
}