package org.dizzybot.jobbot.controllers.job.messages;

public enum JobControllerMessage {

    JOB_CREATED("Job created successfully"),
    JOB_UPDATED("Job updated successfully"),
    JOB_DELETED("Job deleted successfully"),
    IMAGE_UPLOADED("Image uploaded successfully"),
    IMAGE_DELETED("Image deleted successfully")
    ;

    private final String message;

    JobControllerMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
