package org.dizzybot.jobbot.controllers.job.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobComment {

    public Long authorId;

    public Long replyToUserId;

    public String content;

}
