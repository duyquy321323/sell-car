package com.sellcar.sellcar.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SellCarRequest {
    private String title;
    @NotBlank(message = "Điều kiện của xe không được để trống")
    private String condition;
    private String year;
    private Integer capacity;
    @NotNull(message = "Giá của xe không được để trống")
    private Long price;
    private String description;
    private List<String> featureCodes;
    private String anotherFeature;
    private String address;
    private List<MultipartFile> images;
}