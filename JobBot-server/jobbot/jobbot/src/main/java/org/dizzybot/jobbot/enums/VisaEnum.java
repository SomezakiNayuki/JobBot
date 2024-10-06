package org.dizzybot.jobbot.enums;

public enum VisaEnum {
    STUDENT_VISA("500"),
    TEMPORARY_GRADUATE_VISA("485"),
    VISITOR("600"),
    EMPLOYER_NOMINATION_SCHEME("186")
    ;

    private final String visaCode;

    VisaEnum(String visaCode) {
        this.visaCode = visaCode;
    }

    public String getVisaCode() {
        return visaCode;
    }

}
