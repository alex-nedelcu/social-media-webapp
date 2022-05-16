package com.example.controllers;

import com.example.enums.ERole;
import com.example.models.Account;
import com.example.payload.requests.LoginRequest;
import com.example.payload.requests.RegisterRequest;
import com.example.payload.responses.JwtResponse;
import com.example.payload.responses.MessageResponse;
import com.example.security.jwt.JwtUtils;
import com.example.security.security_utils.AccountDetails;
import com.example.services.IAccountService;
import com.example.services.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Locale;

@RestController
@RequestMapping("/api/authenticate")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IRoleService roleService;


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        AccountDetails accountDetails = (AccountDetails) authentication.getPrincipal();
        String role = accountDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse(""); // each user has exactly one role

        return ResponseEntity.ok(JwtResponse.builder()
                .token(jwt)
                .id(accountDetails.getId())
                .username(accountDetails.getUsername())
                .role(role)
                .build()
        );
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if (accountService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username already exists!"));
        }

        Account account = Account.builder()
                .username(registerRequest.getUsername())
                .passwordDigest(encoder.encode(registerRequest.getPassword()))
                .role(roleService.findByName(ERole.valueOf("ROLE_" + registerRequest.getRole().trim().toUpperCase(Locale.ROOT))).orElseThrow(() -> new RuntimeException("Role not found!\n")))
                .build();

        this.accountService.save(account);
        return ResponseEntity.ok(new MessageResponse("Account successfully created!"));
    }

}
