package org.dizzybot.jobbot.controllers.user.messages;

public enum UserControllerMessage {

    EMAIL_OCCUPIED("This email is already registered. Please use a different email"),
    USER_CREATED("User created successfully"),
    USER_AUTHENTICATED("User authenticated successfully"),
    USER_INVALID_CREDENTIALS("Invalid email or password. Please try again"),
    USER_NOT_FOUND("User not found")
    ;

    private final String message;

    UserControllerMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
