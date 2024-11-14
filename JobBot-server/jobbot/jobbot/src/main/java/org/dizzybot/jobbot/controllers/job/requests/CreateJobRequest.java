package org.dizzybot.jobbot.controllers.job.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateJobRequest {

    public String jobTitle;

    public double pay;

    public String location;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    public LocalDateTime time;

    public String description;

    public Long userId;

}
