package org.dizzybot.jobbot.controllers.user.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequest {

    public String username;

    public String email;

    public String password;

    public boolean workEligible;

    public String visaType;

    public String idCardNumber;

}
