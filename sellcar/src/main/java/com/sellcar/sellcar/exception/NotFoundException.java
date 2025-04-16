package com.sellcar.sellcar.exception;

public class NotFoundException extends RuntimeException {
    
    final private static String DEFAULT_MESSAGE = "Not found exception!!!";

    public NotFoundException(){
        super(DEFAULT_MESSAGE);
    }

    public NotFoundException(String message){
        super(message);
    }
}