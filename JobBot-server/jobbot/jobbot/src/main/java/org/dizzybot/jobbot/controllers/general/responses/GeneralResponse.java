package org.dizzybot.jobbot.controllers.general.responses;

public class GeneralResponse {

    public String status;

    public String message;

    public Object payload;

    public GeneralResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public GeneralResponse(String status, String message, Object payload) {
        this.status = status;
        this.message = message;
        this.payload = payload;
    }

}
