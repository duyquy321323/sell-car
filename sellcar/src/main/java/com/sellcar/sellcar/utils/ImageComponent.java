package com.sellcar.sellcar.utils;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.SneakyThrows;

@Component
public class ImageComponent {
    
    @Autowired
    private Cloudinary cloudinary;

    @SneakyThrows
    public String uploadImage(MultipartFile image){
        Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap()); // emptyMap nghĩa là không cài gì cả
        // có thể chuyển từ emptymap thành asMap("folder", "car"); để lưu vào folder car trên cloudinary

        return uploadResult.get("secure_url").toString();
    }
}