package com.example.services;

import com.example.enums.ERole;
import com.example.models.Role;

import java.util.List;
import java.util.Optional;

public interface IRoleService {

    Optional<Role> findByName(ERole name);

    List<Role> getAllRoles();

    Role save(Role role);

    void deleteById(Long id);

}
