FROM gradle:6.6.1-jdk14 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM adoptopenjdk/openjdk11:x86_64-alpine-jre-11.0.6_10
EXPOSE 8081
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
COPY --from=build /home/gradle/src/jarRunDev.sh /app/jarRunDev.sh
WORKDIR /app
ENTRYPOINT ["./jarRunDev.sh"]