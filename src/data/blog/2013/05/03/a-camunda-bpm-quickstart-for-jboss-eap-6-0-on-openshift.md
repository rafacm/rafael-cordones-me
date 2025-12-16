---
author: Rafael Cordones
pubDatetime: 2013-05-03T12:00:00Z
modDatetime:  2013-05-03T12:00:00Z
title: A camunda BPM Quickstart for JBoss EAP 6.0 on OpenShift?
slug: a-camunda-bpm-quickstart-for-jboss-eap-6-0-on-openshift
featured: false
draft: false
tags:
  - BPM
  - BPMN
  - camunda BPM
  - jboss
  - openshift
  - paas
  - quickstart
  - the job announcement
description:
  A quickstart you can use in order to deploy a process application based on camunda BPM to JBoss EAP 6.x on OpenShift.
---

<figure>
  <img src="/assets/images/a-camunda-bpm-quickstart-for-jboss-eap-6-0-on-openshift/gosaukam_panorama.jpg" alt="Gosaukam. Austria"
  />
    <figcaption class="text-center">
    Gosaukam. Austria. Photo by <a href="http://rafael.cordones.me">Rafael Cordones</a>.
  </figcaption>
</figure>

This post is a follow up from a previous article "<a href="/posts/2013/04/26/the-job-announcement-on-the-openshift-paas-cloud">The Job Announcement on the OpenShift PaaS cloud?</a>" and describes a quickstart you can use in order to deploy a process application based on camunda BPM to JBoss EAP 6.x on <a href="https://openshift.redhat.com/">OpenShift</a>. From the <a href="http://docs.camunda.org/guides/user-guide/#platform-process-engine">several deployment scenarios supported by the camunda BPM engine</a>, this post focuses on the <em>shared process engine</em> one.

But before getting in the technical details: this post is definitely not an introduction to OpenShift<i>.</i> For that, check the "<a href="https://access.redhat.com/site/documentation/en-US/OpenShift/2.0/html/User_Guide/">OpenShift User Guide</a>" as a starting point.

In order to create the quickstart, we started from the "plain vanilla" Git repository that OpenShift creates when choosing the "JBoss Enterprise Application Platform 6.0" application and we followed <a href="http://docs.camunda.org/guides/installation-guide/jboss/#platform">the instructions on how to install the camunda BPM platform on a vanilla JBoss</a> (with the exception of creating a XA datasource). There result of that work can be found on this GitHub repo: <a href="https://github.com/rafacm/camunda-bpm-openshift-jboss-quickstart">https://github.com/rafacm/camunda-bpm-openshift-jboss-quickstart</a> on <a href="https://github.com/rafacm/camunda-bpm-openshift-jboss-quickstart/tree/camunda-bpm-jboss-eap">the "camunda-bpm-jboss-eap" branch</a> (updated up to camunda BPM 7.0.0-alpha3).

> DISCLAIMER: please note that the <a href="https://github.com/rafacm/camunda-bpm-openshift-jboss-quickstart/">camunda BPM on OpenShift quickstart</a> is a personal project and is provided as is. At the same time, I would love to hear any feedback you may have and will do my best to be of any help.

## Just the steps, ma'am[^1]. Just the steps

Create a "JBoss Enterprise Application Platform 6.0" and clone its corresponding Git Repository:

```bash
rafa@trane: ~/tmp$ git clone ssh://5187fdcae0b8cde750000001@thejobannouncement-plexiti.rhcloud.com/~/git/thejobannouncement.git/
Cloning into 'thejobannouncement'...
remote: Counting objects: 39, done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 39 (delta 1), reused 0 (delta 0)
Receiving objects: 100% (39/39), 19.98 KiB, done.
Resolving deltas: 100% (1/1), done.
rafa@trane: ~/tmp$</div>
Add the <a href="https://github.com/rafacm/camunda-bpm-openshift-jboss-quickstart">camunda-bpm-openshift-jboss-quickstart</a> GitHub repository as a remote called <code>quickstart</code>:
<div id="terminal">rafa@trane: ~/tmp$ cd thejobannouncement/
rafa@trane: ~/dev/thejobannouncement$ git remote add quickstart git@github.com:rafacm/camunda-bpm-openshift-jboss-quickstart.git
rafa@trane: ~/dev/thejobannouncement$ git remote -v
origin ssh://5187fdcae0b8cde750000001@thejobannouncement-plexiti.rhcloud.com/~/git/thejobannouncement.git/ (fetch)
origin ssh://5187fdcae0b8cde750000001@thejobannouncement-plexiti.rhcloud.com/~/git/thejobannouncement.git/ (push)
quickstart git@github.com:rafacm/camunda-bpm-openshift-jboss-quickstart.git (fetch)
quickstart git@github.com:rafacm/camunda-bpm-openshift-jboss-quickstart.git (push)</div>
Fetch the contents of the <code>quickstart</code> remote:
<div id="terminal">rafa@trane: ~/dev/thejobannouncement$ git fetch quickstart
warning: no common commits
remote: Counting objects: 137, done.
remote: Compressing objects: 100% (74/74), done.
remote: Total 137 (delta 44), reused 137 (delta 44)
Receiving objects: 100% (137/137), 2.41 MiB | 723 KiB/s, done.
Resolving deltas: 100% (44/44), done.
From github.com:rafacm/camunda-bpm-openshift-jboss-quickstart
* [new branch] camunda-bpm-jboss-eap -&gt; quickstart/camunda-bpm-jboss-eap
* [new branch] master -&gt; quickstart/master
* [new tag] camunda-bpm-jboss-as-7.0.0-alpha3 -&gt; camunda-bpm-jboss-as-7.0.0-alpha3
rafa@trane: ~/dev/thejobannouncement$
```

Note that this will create some tags like <code>camunda-bpm-jboss-as-7.0.0-alpha3</code> which we will use to merge a specific camunda BPM release.

Merge the <a href="https://github.com/rafacm/camunda-bpm-openshift-jboss-quickstart/tree/camunda-bpm-jboss-as-7.0.0-alpha3">tag <code>camunda-bpm-jboss-as-7.0.0-alpha3</code></a> into your local master branch:
```bash
rafa@trane: ~/dev/thejobannouncement$ git merge -s recursive -X theirs camunda-bpm-jboss-as-7.0.0-alpha3
Auto-merging .openshift/config/standalone.xml
Merge made by the 'recursive' strategy.
[...]
rafa@trane: ~/dev/thejobannouncement$</div>
```

Note that since we deleted all the code and the README file from the quickstart repository, you will (hopefully)  not get any merging conflict. You will need to manually add (and commit) the following to your <code>pom.xml</code>:

```xml
    <!-- When built in OpenShift the 'openshift' profile will be used when invoking mvn. -->
    <!-- Use this profile for any OpenShift specific customization your app will need. -->
    <!-- By default that is to put the resulting archive into the 'deployments' folder. -->
    <!-- http://maven.apache.org/guides/mini/guide-building-for-different-environments.html -->
<profile>
    <id>openshift</id>
    <build>
        <finalName>camundabpm</finalName>
        <plugins>
            <plugin>
                <artifactId>maven-war-plugin</artifactId>
                <version>2.1.1</version>
                <configuration>
                    <outputDirectory>deployments</outputDirectory>
                    <warName>ROOT</warName>
                </configuration>
            </plugin>
        </plugins>
    </build>
</profile>
```

Now you can push you freshly minted camunda BPM engine to OpenShift!

```bash
rafa@trane: ~/dev/thejobannouncement$ git push origin master
[…]
remote: [INFO] WEB-INF/web.xml already added, skipping
remote: [INFO] ------------------------------------------------------------------------
remote: [INFO] BUILD SUCCESS
remote: [INFO] ------------------------------------------------------------------------
remote: [INFO] Total time: 54.086s
remote: [INFO] Finished at: Thu May 09 05:00:39 EDT 2013
remote: [INFO] Final Memory: 14M/162M
remote: [INFO] ------------------------------------------------------------------------
remote: Running .openshift/action_hooks/build
remote: Running .openshift/action_hooks/deploy
remote: hot_deploy_added=false
remote: Found 127.7.109.1:8080 listening port
remote: Done
remote: Running .openshift/action_hooks/post_deploy
To ssh://5187fdcae0b8cde750000001@thejobannouncement-plexiti.rhcloud.com/~/git/thejobannouncement.git/
c7cd281..d721e05 master -&gt; master
rafa@trane: ~/dev/thejobannouncement$
```

You can now login to your applications console to verify in the logs that the camunda BPM engine is running:

```bash
rafa@trane: ~/dev/thejobannouncement$ ssh 5187fdcae0b8cde750000001@thejobannouncement-plexiti.rhcloud.com
[...]
[thejobannouncement-plexiti.rhcloud.com 5187fdcae0b8cde750000001]\&gt; egrep "camunda" jbosseap-6.0/logs/server.log
2013/05/09 05:01:18,054 INFO [org.camunda.bpm.engine.impl.jobexecutor.JobExecutor] (MSC service thread 1-2) Starting up the JobExecutor[org.camunda.bpm.container.impl.jboss.service.MscRuntimeContainerJobExecutor].
2013/05/09 05:01:18,275 INFO [org.camunda.bpm.engine.impl.jobexecutor.AcquireJobsRunnable] (job-executor-tp-threads - 1) JobExecutor[org.camunda.bpm.container.impl.jboss.service.MscRuntimeContainerJobExecutor] starting to acquire jobs
2013/05/09 05:01:47,860 INFO [org.camunda.bpm.engine.impl.db.DbSqlSession] (ServerService Thread Pool -- 64) performing create on engine with resource org/camunda/bpm/engine/db/create/activiti.h2.create.engine.sql
2013/05/09 05:01:48,774 INFO [org.camunda.bpm.engine.impl.db.DbSqlSession] (ServerService Thread Pool -- 64) performing create on history with resource org/camunda/bpm/engine/db/create/activiti.h2.create.history.sql
2013/05/09 05:01:48,962 INFO [org.camunda.bpm.engine.impl.db.DbSqlSession] (ServerService Thread Pool -- 64) performing create on identity with resource org/camunda/bpm/engine/db/create/activiti.h2.create.identity.sql
2013/05/09 05:01:49,111 INFO [org.camunda.bpm.engine.impl.ProcessEngineImpl] (ServerService Thread Pool -- 64) ProcessEngine default created
rafa@trane: ~/dev/thejobannouncement$
```

Great! We now have the <strong>engine</strong> up and running on OpenShift. What about the rest of the awesome components that come with the camunda BPM <strong>platform</strong> like the <a href="http://docs.camunda.org/api-references/rest/#!/overview/introduction">REST API</a>, <a href="http://www.camunda.org/design/cycle-tutorial.html">Cycle</a>, <a href="http://www.camunda.org/implement/cockpit.html">Cockpit</a> and <a href="http://www.camunda.org/implement/tasklist.html">Tasklist</a>?! That's left (for now) as an exercise to the reader but with the the (also) awesome "<a href="http://docs.camunda.org/guides/installation-guide/jboss/#platform">camunda BPM Installation Guide (JBoss)</a>" it should not be that hard. ;-)

## Feedback welcome!

You can reach me either via the comments section below or via any of the social coordinates you will find on the top right corner of this page.

> UPDATE (2013-05-14): there's now a follow-up post focusing on how to bring the camunda BPM process engine into your <strong>existing</strong> process application: <a href="/posts/2013/05/14/deploying-camunda-bpm-process-applications-on-the-openshift-cloud/">Deploying camunda BPM process applications on the OpenShift cloud</a>.

[^1]: ["Just the facts, ma'am"](https://www.youtube.com/watch?v=EkfKqwnGLr8&ab_channel=CBS)
