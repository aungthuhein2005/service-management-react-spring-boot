package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;

public class CommentDTO {
    private Long id;
    private String text;
    private LocalDateTime createdAt;
    private UserDTO user;

    public CommentDTO() {
        // Default constructor
    }

    public CommentDTO(Long id, String text, LocalDateTime createdAt, UserDTO user) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.user = user;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
