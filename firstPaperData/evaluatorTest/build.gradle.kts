plugins {
    id("java")
    id("org.openrewrite.rewrite") version "6.5.6"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
        mavenLocal()
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
        rewrite("com.dataClumpFixing:dataClumpFixing:0.1.0-SNAPSHOT")
}
rewrite{
    activeRecipe("org.openrewrite.java.UpdateSourcePositions","com.dataClumpFixing.DataClumpFinder")

}
tasks.test {
    useJUnitPlatform()
}