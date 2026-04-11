package org.dizzybot.jobbot.controllers.job.messages;

public enum JobControllerMessage {

    JOB_CREATED("Job created successfully"),
    JOB_UPDATED("Job updated successfully"),
    JOB_DELETED("Job deleted successfully"),
    JOB_ACCEPTED("Job accepted successfully"),
    JOB_CANNOT_BE_ACCEPTED_SAME_AS_POSTER("Job cannot be accepted due to same as poster"),
    JOB_STATUS_UPDATED("Job status updated successfully"),
    IMAGE_UPLOADED("Image uploaded successfully"),
    IMAGE_DELETED("Image deleted successfully"),
    COMMENT_ADDED("Comment added successfully"),
    COMMENT_DELETED("Comment deleted successfully")
    ;

    private final String message;

    JobControllerMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
