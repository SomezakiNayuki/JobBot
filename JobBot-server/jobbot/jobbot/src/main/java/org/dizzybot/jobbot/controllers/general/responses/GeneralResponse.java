package org.dizzybot.jobbot.controllers.general.responses;

public class GeneralResponse {

    public ResponseStatusEnum status;

    public String message;

    public Object payload;

    public GeneralResponse(ResponseStatusEnum status, String message) {
        this.status = status;
        this.message = message;
    }

    public GeneralResponse(ResponseStatusEnum status, String message, Object payload) {
        this.status = status;
        this.message = message;
        this.payload = payload;
    }

}
