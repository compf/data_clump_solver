plugins {
   application
}

group = "javaTest"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}



application {
    mainClass.set( "org.example.Main")
}
java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(19))
    }
}



dependencies {
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}


