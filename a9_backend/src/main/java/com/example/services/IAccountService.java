package com.example.services;

import com.example.models.Account;

import java.util.List;
import java.util.Optional;

public interface IAccountService {

    Boolean existsByUsername(String username);

    Optional<Account> findByUsername(String username);

    Account save(Account account);

    void deleteById(Long id);

    List<Account> getAllAccounts();

    Optional<Account> findById(Long id);

}
