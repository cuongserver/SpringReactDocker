FROM gradle:6.6.1-jdk14 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build -x test --no-daemon

FROM adoptopenjdk/openjdk14:x86_64-alpine-jre-14.0.2_12
EXPOSE 8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
COPY --from=build /home/gradle/src/JarRunLocalDocker.sh /app/JarRunLocalDocker.sh
WORKDIR /app
ENTRYPOINT ["./JarRunLocalDocker.sh"]