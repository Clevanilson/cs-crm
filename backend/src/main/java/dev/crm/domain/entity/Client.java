package dev.crm.domain.entity;

import java.util.Optional;
import java.util.regex.Pattern;

import dev.crm.domain.error.DomainError;

public class Client {
    private Optional<Long> id;
    private String name;
    private String email;
    private String phone;
    

    public Client(String name, String email, String phone, Optional<Long> id) {
        if (!this.isNameValid(name)) throw new DomainError("Invalid name");
        if (!this.isEmailValid(email)) throw new DomainError("Invalid email");
        if (!this.isPhoneValid(phone)) throw new DomainError("Invalid phone");
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.id = id;
    }

    public static Client create(String name, String email, String phone) {
        return new Client(name, email, phone, Optional.empty());
    }

    public Optional<Long> getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = Optional.of(id);
    }

    public String getName() {
        return this.name;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPhone() {
        return this.phone;
    }

    private boolean isNameValid(String name) {
        var pattern = Pattern.compile("^([A-Za-z ]){2,255}$");
        return pattern.matcher(name).find();
    }

    private boolean isEmailValid(String email) {
        var pattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        return pattern.matcher(email).find();
    }

    private boolean isPhoneValid(String phone) {
        var pattern = Pattern.compile("\\d{11}");
        return pattern.matcher(phone).find();
    }
}
