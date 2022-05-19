package com.example.controllers;

import com.example.models.Account;
import com.example.models.Picture;
import com.example.payload.requests.UploadPictureRequest;
import com.example.payload.responses.MessageResponse;
import com.example.payload.responses.PictureDto;
import com.example.payload.responses.VoteDto;
import com.example.repositories.IPictureRepository;
import com.example.services.IAccountService;
import com.example.utils.PictureUtility;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api/pictures")
public class PictureController {

    private final IAccountService accountService;
    private final IPictureRepository pictureRepository;


    @RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<MessageResponse> upload(@ModelAttribute UploadPictureRequest uploadPictureRequest) throws IOException {
        MultipartFile file = uploadPictureRequest.getFile();

        Account account = accountService.findById(uploadPictureRequest.getAccountId()).orElseThrow(
                () -> new RuntimeException("User not found!")
        );

        pictureRepository.save(
                Picture.builder()
                        .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .picture(PictureUtility.compressPicture(file.getBytes()))
                        .account(account)
                        .score(0)
                        .build()
        );

        return ResponseEntity.ok().body(new MessageResponse(
                "Picture successfully uploaded: " + file.getOriginalFilename())
        );
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getPicture(@PathVariable("id") Long id) throws IOException {
        Picture picture = pictureRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Picture not found!")
        );

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(picture.getType()))
                .body(PictureUtility.decompressPicture(picture.getPicture()));
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<PictureDto> getPictures() throws IOException {
        return pictureRepository.findAll()
                .stream()
                .map(current -> PictureDto.builder()
                        .id(current.getId())
                        .accountId(current.getAccount().getId())
                        .decompressed(PictureUtility.decompressPicture(current.getPicture()))
                        .score(current.getScore())
                        .type(current.getType())
                        .build()
                )
                .collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}/vote", method = RequestMethod.POST)
    public void assignVote(
            @PathVariable("id") Long id,
            @RequestBody VoteDto voteDto
    ) {
        Picture picture = pictureRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Picture not found!")
        );

        picture.setScore(picture.getScore() + voteDto.getVote());
        pictureRepository.save(picture);
    }
}
