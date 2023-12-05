plugins {
   application
    id("org.openrewrite.rewrite") version "6.5.6"
}

group = "javaTest"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    mavenLocal()
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
    rewrite("com.dataClumpFixing:dataClumpFixing:0.1.0-SNAPSHOT")
}

tasks.test {
    useJUnitPlatform()
}
rewrite{
    activeRecipe("com.dataClumpFixing.DataClumpFixer")
    
}


