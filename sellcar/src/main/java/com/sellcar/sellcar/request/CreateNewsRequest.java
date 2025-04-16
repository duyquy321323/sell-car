package com.sellcar.sellcar.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateNewsRequest {
    @NotBlank(message = "Tiêu đề không được để trống")
    private String title;
    @NotNull(message = "Ảnh bìa không được để trống")
    private String posterUrl;
    @NotBlank(message = "Nội dung không được để trống")
    private String content;
}