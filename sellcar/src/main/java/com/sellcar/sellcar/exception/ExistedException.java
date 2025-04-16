package com.sellcar.sellcar.exception;

public class ExistedException extends RuntimeException {
    
    final private static String DEFAULT_MESSAGE = "Existed exception!!!";

    public ExistedException(){
        super(DEFAULT_MESSAGE);
    }

    public ExistedException(String message){
        super(message);
    }
}