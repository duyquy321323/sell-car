package com.sellcar.sellcar.exception;

public class UnauthorizedException extends RuntimeException {
    
    final private static String DEFAULT_MESSAGE = "Unauthorized exception!!!";

    public UnauthorizedException(){
        super(DEFAULT_MESSAGE);
    }

    public UnauthorizedException(String message){
        super(message);
    }

}