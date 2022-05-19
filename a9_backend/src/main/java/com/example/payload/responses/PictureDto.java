package com.example.payload.responses;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PictureDto {

    private final Long id;

    private final Long accountId;

    private final String ownerUsername;

    private final byte[] decompressed;

    private final int score;

    private String type;
}
