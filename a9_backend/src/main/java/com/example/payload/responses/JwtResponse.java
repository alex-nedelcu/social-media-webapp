package com.example.payload.responses;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class JwtResponse {

    private String token;

    private final String type = "Bearer";

    private Long id;

    private String username;

    private final String role;

}
