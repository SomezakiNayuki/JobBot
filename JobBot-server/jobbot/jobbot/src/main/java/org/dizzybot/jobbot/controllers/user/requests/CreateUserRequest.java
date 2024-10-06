package org.dizzybot.jobbot.controllers.user.requests;

import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.VisaEnum;

@Getter
@Setter
public class CreateUserRequest {

    public String username;

    public String email;

    public String password;

    public boolean workEligibility;

    public VisaEnum visaType;

    public String idCardNumber;

}
