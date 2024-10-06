package org.dizzybot.jobbot.controllers.user.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticateUserRequest {

    public String email;

    public String password;

}
