# Introduction

This project is the JobBot backend server, please see details of JobBot server at: https://dizzybot.atlassian.net/l/cp/q8NB1BV5.

# Requirement

This project bases on SpringBoot 3.2.4 and it is a Maven project, please ensure you have correct Java version installed and Maven installed.

Java requirement: Java 17

Once installed Java 17, point your JAVA_HOME environment variable to your Java installation directory, this is usually under "C:\Program Files\Java" for Windows user. If using IntelliJ, make sure you configure your project JDK to JDK 17.

# Contribution

Before you start contribution, make sure you have read:

- Terms and Conditions (confirmation needed): https://dizzybot.atlassian.net/l/cp/NDZ31pqP
- Jira github integration guide: https://dizzybot.atlassian.net/l/cp/KdbB5B1T
- JobBot code style guide: https://dizzybot.atlassian.net/wiki/x/DQAP

## Configure proper environment profile

For development, make sure use "dev" config for development, and "prod" for production.

Activate "dev" config by modifying "spring.profiles.active" configuration in application.yaml.

## Config database before running

To cater JobBot IDP, it is decided to use MySQL as development database https://dizzybot.atlassian.net/browse/JB-45.

Make sure you start MySQL, and create a database named "JobBot" before running this Spring Boot application.

Charset: utf8mb3 -- UTF-8 Unicode (utf8mb3_bin)

# Knowledge space

Please refer to following confluence space for more JobBot knowledge: https://dizzybot.atlassian.net/l/cp/yd4zPvqe.
