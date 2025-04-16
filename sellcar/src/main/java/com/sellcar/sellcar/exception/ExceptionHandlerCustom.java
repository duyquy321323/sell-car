package com.sellcar.sellcar.exception;

import java.sql.SQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.sellcar.sellcar.response.ExceptionResponse;

@ControllerAdvice
public class ExceptionHandlerCustom {
    
    // ngoại lệ NOT_FOUND
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionResponse> handlerNotFoundException(NotFoundException exception){
        ExceptionResponse response = ExceptionResponse.builder()
                                    .message(exception.getMessage())
                                    .status(HttpStatus.NOT_FOUND)
                                    .stackTraceElements(exception.getStackTrace())
                                    .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // ngoại lệ url request NOT_FOUND
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ExceptionResponse> handlerNotFoundRequestException(NoHandlerFoundException exception){
        ExceptionResponse response = ExceptionResponse.builder()
                                    .message(exception.getMessage())
                                    .status(HttpStatus.NOT_FOUND)
                                    .stackTraceElements(exception.getStackTrace())
                                    .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // ngoại lệ SQL
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ExceptionResponse> handlerSqlException(SQLException exception){
        ExceptionResponse response = ExceptionResponse.builder()
                                    .message(exception.getMessage())
                                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                    .stackTraceElements(exception.getStackTrace())
                                    .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    // ngoại lệ chưa xác thực phân quyền
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ExceptionResponse> handlerUnauthorizedException(UnauthorizedException exception){
        ExceptionResponse response = ExceptionResponse.builder()
                                    .message(exception.getMessage())
                                    .status(HttpStatus.UNAUTHORIZED)
                                    .stackTraceElements(exception.getStackTrace())
                                    .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // // ngoại lệ lỗi server 500
    // @ExceptionHandler(InternalServerError.class)
    // public ResponseEntity<ExceptionResponse> handlerInternalServerException(InternalServerError exception){
    //     ExceptionResponse response = ExceptionResponse.builder()
    //                                 .message(exception.getMessage())
    //                                 .status(HttpStatus.UNAUTHORIZED)
    //                                 .stackTraceElements(exception.getStackTrace())
    //                                 .build();
    //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    // }

    // // ngoại lệ với các dữ liệu lớn
    // @ExceptionHandler(IOException.class)
    // public ResponseEntity<ExceptionResponse> handlerIOException(IOException exception){
    //     ExceptionResponse response = ExceptionResponse.builder()
    //                                 .message(exception.getMessage())
    //                                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                                 .stackTraceElements(exception.getStackTrace())
    //                                 .build();
    //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    // }

    
    // @ExceptionHandler(IllegalArgumentException.class)
    // public ResponseEntity<ExceptionResponse> handlerIllegalArgumentException(IllegalArgumentException exception){
    //     ExceptionResponse response = ExceptionResponse.builder()
    //                                 .message(exception.getMessage())
    //                                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                                 .stackTraceElements(exception.getStackTrace())
    //                                 .build();
    //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    // }

    // @ExceptionHandler(IllegalStateException.class)
    // public ResponseEntity<ExceptionResponse> handlerIllegalStateException(IllegalStateException exception){
    //     ExceptionResponse response = ExceptionResponse.builder()
    //                                 .message(exception.getMessage())
    //                                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                                 .stackTraceElements(exception.getStackTrace())
    //                                 .build();
    //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    // }
}