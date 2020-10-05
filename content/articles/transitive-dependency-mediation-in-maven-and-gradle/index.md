---
title: Transitive Dependency Mediation in Maven and Gradle
date: 2013-05-06
permalink: http://rafael.cordones.me/2013/05/06/transitive-dependency-mediation-in-maven-and-gradle/
category: Blog 
tags: BPM, build tools, camunda BPM, fluent testing, gradle, maven, testing
image:
    path: /Nighthawks_by_Edward_Hopper_1942.jpg
    alt: Nighthawks by Edward Hopper. 1942.
    caption: Nighthawks by Edward Hopper. 1942. Source <a href="http://en.wikipedia.org/wiki/Nighthawks">Wikipedia</a>, <a href="http://www.googleartproject.com/collection/the-art-institute-of-chicago/artwork/nighthawks-edward-hopper/449258/">Google Art Project</a> and <a href="http://smarthistory.khanacademy.org/hoppers-nighthawks.html">Khan Academy</a>.
---

Maven and Gradle walk into a bar:

> Maven: I'd like a coffee, please.<br/>
> Gradle: I'd like a coffee too, please.<br/>
> Bartender: Here's your coffee, Maven.<br/>
> Bartender: And here's your coffee with a <em>croissant</em>, Gradle.<br/>
> Maven: Why don't I get a <em>croissant</em> too?!<br/>
> Bartender: For you Maven? Just the nearest explicitly stated dependency.</blockquote>

I recently contributed a <a href="https://github.com/camunda/camunda-bpm-fluent-testing">fluent testing</a> library together with <a href="http://plexiti.com/">Martin Schimak</a> to the <a href="http://camunda.org">camunda BPM</a> <a href="http://camundabpm.blogspot.co.at/2013/04/camunda-bpm-incubation-space-launched.html">incubation space</a>. The aim of the project is to improve test creation <strong>and maintenance</strong> when developing business process applications based on the <a href="http://camunda.org/">camunda BPM platform</a>. One of the long term objectives of the <a href="https://github.com/camunda/camunda-bpm-fluent-testing">camunda BPM fluent testing library</a> would be to have tests to which one can come back after a while and still see the wood for the trees, i.e. understand the business logic and not get lost on the technical details of how to use the <a href="http://camunda.org/javadocs/org/camunda/bpm/engine/package-summary.html">camunda BPM engine API</a>.

Anyway, enough self-marketing and back to our topic! In the <a href="https://github.com/camunda/camunda-bpm-fluent-testing">camunda BPM fluent testing project</a> we use Maven to build the project artifacts. The <a href="http://camunda.org/community/team.html">camunda core team</a> has setup Jenkins so the project is continuously built and library snapshots are available via Nexus. So far so good.

I thought I just had to tell other developers to do just two things:
1. Add the camunda BPM repository to your project
```xml
        camunda-bpm-nexus
        camunda-bpm-nexus
        https://app.camunda.com/nexus/content/groups/public

            always
```
2. Declare the fluent testing artifacts as a test scope dependency
```xml
org.camunda.bpm.incubation
    camunda-bpm-fluent-assertions
    0.4-SNAPSHOT
    test

    org.camunda.bpm.incubation
    camunda-bpm-fluent-engine-api
    0.4-SNAPSHOT
    test
```

But unfortunately, reality has subtle ways of slipping into a developer's life... it's actually called <a href="http://en.wikipedia.org/wiki/Complexity">complexity</a> and it's one of the main reasons why software projects get delayed, <a href="http://en.wikipedia.org/wiki/The_Mythical_Man-Month">one day at a time</a>.

Anyway, I went off a tangent again. What's all of this got to do with Maven and Gradle?! Well, since I like to <a href="http://en.wikipedia.org/wiki/On_the_Internet,_nobody_knows_you're_a_dog">eat my own dog food</a> as much as I can, I refactored <a href="https://github.com/plexiti/the-job-announcement">The Job Announcement</a> project to use the fluent testing library... and... got the unpleasant surprise of getting the following exception while <strong>executing</strong> the tests:

```-------------------------------------------------------
T E S T S
-------------------------------------------------------
Running com.plexiti.camunda.bpm.showcase.jobannouncement.process.JobAnnouncementPublicationTest
Tests run: 1, Failures: 0, Errors: 1, Skipped: 0, Time elapsed: 0.043 sec &lt;&lt;&lt; FAILURE!
Running com.plexiti.camunda.bpm.showcase.jobannouncement.process.JobAnnouncementTest
Tests run: 1, Failures: 0, Errors: 1, Skipped: 0, Time elapsed: 0.001 sec &lt;&lt;&lt; FAILURE!
Running com.plexiti.camunda.bpm.showcase.jobannouncement.web.JobAnnouncementBeanTest
Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.326 sec
Results :
Tests in error:
initializationError(com.plexiti.camunda.bpm.showcase.jobannouncement.process.JobAnnouncementPublicationTest): org/junit/rules/TestRule
initializationError(com.plexiti.camunda.bpm.showcase.jobannouncement.process.JobAnnouncementTest): org/junit/rules/TestRule
Tests run: 4, Failures: 0, Errors: 2, Skipped: 0
```

After a bit of investigation I found the explanation: our library has a runtime dependency on <code>junit:junit:jar</code> version <strong>4.9</strong> whereas The Job Announcement <code>pom.xml</code> explicitly declares <code>junit:junit:jar:4.8</code>. The dependency on <code>4.9</code> is due to the use of the <a href="https://github.com/junit-team/junit/blob/master/src/main/java/org/junit/rules/TestRule.java">org.junit.rules.TestRule interface</a> introduced in JUnit 4.9. Given Maven's <a href="http://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html">default dependency conflict resolution strategy</a>, what is explicitly declared in your application's <code>pom.xml</code> ("nearest definition") overrides anything else. This is shown when using <code>mvn dependency:tree</code>:

```rafa@trane: ~/dev/the-job-announcement$ mvn dependency:tree
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building camunda BPM Job Announcement Showcase 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[...]
[INFO]
[INFO] --- maven-dependency-plugin:2.1:tree (default-cli) @ the-job-announcement ---
[INFO] com.plexiti.showcases:the-job-announcement:war:1.0-SNAPSHOT
[...]
[INFO] +- org.camunda.bpm.incubation:camunda-bpm-fluent-engine-api:jar:0.4-SNAPSHOT:test
[INFO] +- org.camunda.bpm.incubation:camunda-bpm-fluent-assertions:jar:0.4-SNAPSHOT:test
[INFO] | +- org.easytesting:fest-assert-core:jar:2.0M9:test
[INFO] | | \- org.easytesting:fest-util:jar:1.2.4:test
[INFO] | \- org.mockito:mockito-all:jar:1.9.5:test
[...]
[INFO] +- junit:junit:jar:4.8:test
[...]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 7.167s
[INFO] Finished at: Sat May 11 12:42:27 CEST 2013
[INFO] Final Memory: 19M/81M
[INFO] ------------------------------------------------------------------------
rafa@trane: ~/tmp/the-job-announcement$
```

To be honest, I would have expected at least a <code>[WARN]</code> entry while building the project telling me about a transitive dependency (<code>junit:junit:jar:4.9</code>) with a declared version higher than the one in my application's <code>pom.xml</code>!

Even using a dependency version range as indicated <a href="http://books.sonatype.com/mvnref-book/reference/pom-relationships-sect-project-dependencies.html#ex-dep-range-2">here</a> (thanks for the tip <a href="https://twitter.com/zziga">Ziga</a>!) in the fluent library's <code>pom.xml</code> like this:
```xml
junit
    junit
    [4.9]
```
gives exactly the same results.

If you are a Maven expert and are reading this, maybe you can drop me a comment (below) on the proper way to do this? Is there a better solution than having <strong>to explicitly tell the users of your library</strong> that <strong>they</strong> have to make sure to declare <code>junit:junit:jar</code> version <strong>4.9</strong> or higher in their own project's <code>pom.xml</code>?
<h2>What would Gradle do?</h2>
I could not help asking myself whether an issue like this would be taken care off by a more modern build tool like <a href="http://www.gradle.org">Gradle</a>. Or at least I would expect it to be more transparent and warn me about such a dependency conflict.

And so I downloaded and installed Gradle, had a look at <a href="http://www.gradle.org/docs/current/userguide/artifact_dependencies_tutorial.html">the "Dependency Management Basics" chapter</a> and came up with the following barebones Gradle build file to try and reproduce the issue:
```groovy
apply plugin: 'java'

repositories {
  mavenCentral()
  maven {
    url "https://app.camunda.com/nexus/content/groups/public"
  }
}

dependencies {
    testRuntime group: 'junit', name: 'junit', version: '4.8'
    testRuntime group: 'org.camunda.bpm.incubation', name: 'camunda-bpm-fluent-assertions', version: '0.4-SNAPSHOT'
}
```

What I basically do in the file is:
1. declare the project to be a Java project
2. add the camunda BPM Maven repository
3. define a <code>testRuntime</code> <a href="http://www.gradle.org/docs/current/userguide/artifact_dependencies_tutorial.html#configurations">dependency configuration</a> with the required dependencies required to run the tests.

That's what I call succinctness.

And now comes the moment of truth... drumroll please...
```
rafa@miles: ~/tmp/deps-with-gradle$ gradle dependencies
:dependencies
------------------------------------------------------------
Root project
------------------------------------------------------------
[...]
testCompile - Compile classpath for source set 'test'.
No dependencies
testRuntime - Runtime classpath for source set 'test'.
testRuntime - Runtime classpath for source set 'test'.
[...]
+--- junit:junit:4.8 -&gt; 4.9
| \--- org.hamcrest:hamcrest-core:1.1
\--- org.camunda.bpm.incubation:camunda-bpm-fluent-assertions:0.4-SNAPSHOT
+--- org.camunda.bpm.incubation:camunda-bpm-fluent-engine-api:0.4-SNAPSHOT
| \--- org.camunda.bpm:camunda-engine:7.0.0-alpha3
| +--- org.apache.commons:commons-email:1.2
| | +--- javax.mail:mail:1.4.1
| | | \--- javax.activation:activation:1.1
| | \--- javax.activation:activation:1.1
| +--- commons-lang:commons-lang:2.4
| +--- org.mybatis:mybatis:3.1.1
| +--- org.springframework:spring-beans:3.1.2.RELEASE
| | \--- org.springframework:spring-core:3.1.2.RELEASE
| | +--- org.springframework:spring-asm:3.1.2.RELEASE
| | \--- commons-logging:commons-logging:1.1.1
| \--- joda-time:joda-time:2.1
+--- org.camunda.bpm:camunda-engine:7.0.0-alpha3 (*)
+--- junit:junit:4.9 (*)
+--- org.easytesting:fest-assert-core:2.0M9
| \--- org.easytesting:fest-util:1.2.4
\--- org.mockito:mockito-all:1.9.5
(*) - dependencies omitted (listed previously)
BUILD SUCCESSFUL
Total time: 35.428 secs
```

Wow! That was neat! Note the <strong>two</strong> lines dealing with conflict resolution! The first one is the explicitly stated dependency on JUnit 4.8 (<code>junit:junit:4.8 -&gt; 4.9</code>) and the second is the transitive dependency (<code>junit:junit:4.9 (*)</code>). Gradle definitely passed the 10-minute test with flying colors!

## Can I <em>handle</em> the Maven truth?

<content-image
    dir="/articles/transitive-dependency-mediation-in-maven-and-gradle"
    src="/a-few-good-men.png"
    alt="A Few Good Men.">
</content-image>

<blockquote>Developer: Maven, if a library declares a dependency on JUnit <code>[4.9]</code> which conflicts with an explicitly declared dependency to JUnit <code>4.8</code> in my project's <code>pom.xml</code>, why do you still resolve the conflict choosing JUnit <code>4.8</code>?! At least you should give me a warning!

Maven: You want answers?

Developer: I think I'm entitled to.

Maven: *You want answers?*

Developer: *I want the truth!*

Maven: *You can't <em>handle</em> the truth!*

[pauses]

Maven: Son, we live in a world full of software projects that have dependencies, and those dependencies have to be resolved. Who's gonna do it? You, manually? You, Gradle? I have a greater responsibility than you can possibly fathom. You weep for your unresolved dependency and you curse Maven. You have that luxury. You have the luxury of not knowing what I know, that resolving that dependency my way, while tragic, probably saved projects. And my existence, while grotesque and incomprehensible to you, saves projects! You don't want the truth, because deep down in IT basements you don't talk about at release parties, you <em>want</em> me on your project. You <em>need</em> me on your project. We use words like <code>&lt;dependecy&gt;</code>, <code>&lt;version&gt;</code>, <code>&lt;scope&gt;</code>. We use these words as the backbone of a life spent building software. You use them as a punchline. I have neither the CPU cycles nor the disk space to explain myself to someone who develops and releases software under the blanket of the default configuration that I provide, and then questions the manner in which I provide it! I would rather you just said "thank you", and went on your way. Otherwise, I suggest you pick up a browser, and start manually downloading and managing all those dependencies. Either way, I don't give a damn what you think you are entitled to!

― From <a href="http://www.youtube.com/watch?v=5j2F4VcBmeo">"A Few Good Build Tools"</a></blockquote>
<h2>Postscript</h2>
Please, do not read this post as mere Maven bashing! I definitely believe that <a href="http://www.nofluffjuststuff.com/blog/john_smart/2010/09/what_has_maven_ever_done_for_us_">Maven has done A LOT for us</a> (thanks to <a href="http://managing-java.blogspot.co.at">Sebastian Dietrich</a> for the link!).

Anyway, thank you Maven! I go on my way now.
