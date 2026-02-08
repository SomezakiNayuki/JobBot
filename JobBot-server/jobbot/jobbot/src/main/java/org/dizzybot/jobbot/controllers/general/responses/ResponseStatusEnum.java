package org.dizzybot.jobbot.controllers.general.responses;

public enum ResponseStatusEnum {

    SUCCESS("success"),
    ERROR("error");

    private final String status;

    ResponseStatusEnum(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return status;
}

    public static ResponseStatusEnum fromString(String s) {
        for (ResponseStatusEnum rs : values()) {
            if (rs.status.equalsIgnoreCase(s)) {
                return rs;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + s);
    }

}