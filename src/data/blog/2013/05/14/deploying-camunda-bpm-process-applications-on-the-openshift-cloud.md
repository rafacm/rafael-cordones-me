---
author: Rafael Cordones
pubDatetime: 2013-05-14T12:00:00Z
modDatetime:  2013-05-14T12:00:00Z
title: Deploying camunda BPM process applications on the OpenShift cloud
slug: deploying-camunda-bpm-process-applications-on-the-openshift-cloud
featured: false
draft: false
tags:
  - BPM
  - Camunda BPM
  - Eclipse
  - JBoss
  - OpenShift
  - talks
description:
  How-to on deploying an **existing application** to camunda BPM running on JBoss EAP 6.x on OpenShift and a **a proposal** on how to manage the further development of the application and keep pushing new releases out to OpenShift.
---

<figure>
  <img src="/assets/images/deploying-camunda-bpm-process-applications-on-the-openshift-cloud/IMG_4231.jpg" alt="Cloud at dusk over the skyline of Alicante, Spain."
  />
    <figcaption class="text-center">
       Cloud at dusk over the skyline of Alicante, Spain. Photo by <a href="http://rafael.cordones.me">Rafael Cordones</a>.
  </figcaption>
</figure>

This post is a follow up from a previous article "<a href="/posts/2013/05/03/a-camunda-bpm-quickstart-for-jboss-eap-6-0-on-openshift/">A camunda BPM Quickstart for JBoss EAP 6.0 on OpenShift?</a>" in which I wrote about deploying the camunda BPM <strong>engine</strong> on OpenShift. You should definitely have a look at it since it describes the quickstart project we will use in this article.

This post focuses on two things:
1. how to initially deploy an <strong>existing application</strong> to camunda BPM running on JBoss EAP 6.x on OpenShift
2. <strong>a proposal</strong> on how to manage the further development of the application and keep pushing new releases out to OpenShift

Note the word "proposal". This is how I do it and I would be very glad to hear about other approaches!

The two main requirements I have are:
1. keep the OpenShift deployment environment aspect orthogonal to the rest of my application codebase, i.e. I want to be in a position to keep deploying my app to my internally managed deployment environment or I might even want to have several OpenShift deployment environments (test, staging, production).
2. whenever a new camunda BPM release is supported by the camunda BPM OpenShift quickstart, I would like to be able to easily upgrade

In my humble opinion, the easiest way of doing fulfill these requirements, is to have a dedicated branch called "openshift" on which all the code/configuration related to camunda BPM on <strong>a given OpenShift deployment environment</strong> is kept</strong>.

We will follow the steps using <a href="https://github.com/plexiti/the-job-announcement">The Job Announcement</a> as an example. Please note that you will need to create a JBoss EAP 6.x application type on OpenShift and get its corresponding Git deployment repository.

We first need to add both the 'quickstart' and the 'openshift' Git deployment repository remotes:

```bash
rafa@trane: ~/dev/vc/the-job-announcement$ git remote add openshift ssh://518cfa465973cab9d500002c@thejobannouncement-rafacm.rhcloud.com/~/git/thejobannouncement.git/
rafa@trane: ~/dev/vc/the-job-announcement$ git remote add quickstart git@github.com:rafacm/camunda-bpm-openshift-jboss-quickstart.git
rafa@trane: ~/dev/vc/the-job-announcement$ git remote -v
openshift ssh://518cfa465973cab9d500002c@thejobannouncement-rafacm.rhcloud.com/~/git/thejobannouncement.git/ (push)
openshift ssh://518cfa465973cab9d500002c@thejobannouncement-rafacm.rhcloud.com/~/git/thejobannouncement.git/ (fetch)
origin git@github.com:rafacm/the-job-announcement.git (fetch)
origin git@github.com:rafacm/the-job-announcement.git (push)
quickstart git@github.com:rafacm/camunda-bpm-openshift-jboss-quickstart.git (fetch)
quickstart git@github.com:rafacm/camunda-bpm-openshift-jboss-quickstart.git (push)
upstream git@github.com:plexiti/the-job-announcement.git (push)
upstream git@github.com:plexiti/the-job-announcement.git (fetch)
rafa@trane: ~/dev/vc/the-job-announcement$
```

This is the purpose of each of those remotes is:
* upstream: the canonical repository containing <a href="https://github.com/plexiti/the-job-announcement">The Job Announcement</a> project code</span>
* origin: my personal fork of the project on which I do my development work which I later push to 'upstream'
* quickstart: the repository containing a JBoss EAP 6.x distributions with the camunda BPM engine already configured (check article "<a href="http://rafael.cordones.me/2013/05/03/a-camunda-bpm-quickstart-for-jboss-eap-6-0-on-openshift/">A camunda BPM Quickstart for JBoss EAP 6.0 on OpenShift?</a>" for background)
* opeshift: the OpenShift application deploymnet Git deployment repository to which we will push our application's code

We create the aforementioned 'openshift' branch and switch to it with:

```bash
rafa@trane: ~/dev/vc/the-job-announcement$ git checkout -b openshift
Switched to a new branch 'openshift'
rafa@trane: ~/dev/vc/the-job-announcement$
```

We pull in the 'camunda-bpm-jboss-as-7.0.0-alpha3' tag from the 'quickstart' repository:

```bash
rafa@trane: ~/dev/vc/the-job-announcement$ git pull quickstart camunda-bpm-jboss-as-7.0.0-alpha3
remote: Counting objects: 103, done.
remote: Compressing objects: 100% (44/44), done.
remote: Total 98 (delta 43), reused 98 (delta 43)
Unpacking objects: 100% (98/98), done.
From github.com:rafacm/camunda-bpm-openshift-jboss-quickstart
 * tag               camunda-bpm-jboss-as-7.0.0-alpha3 -> FETCH_HEAD
Merge made by the 'recursive' strategy.
[...]
rafa@trane: ~/dev/vc/the-job-announcement$ 
```

The reason you (most probably) did not get any merge conflicts in the previous step is because I decided to remove all code whatsoever from the quickstart project. But this means that you will need to manually add (and commit) the following to your <code>pom.xml</code>:
```xml
<profile>
    <!-- When built in OpenShift the 'openshift' profile will be used when invoking mvn. -->
    <!-- Use this profile for any OpenShift specific customization your app will need. -->
    <!-- By default that is to put the resulting archive into the 'deployments' folder. -->
    <!-- http://maven.apache.org/guides/mini/guide-building-for-different-environments.html -->
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

```bash
rafa@trane: ~/dev/vc/the-job-announcement$ git ci -m "Added needed &lt;profile&gt; for OpenShift"
[openshift 8f9895d] Added needed &lt;profile&gt; for OpenShift
1 file changed, 20 insertions(+)
rafa@trane: ~/dev/vc/the-job-announcement$
```

We are now in a position to <strong>fetch</strong> the contents of the 'master' branch at OpenShift Git deployment repository with:

```bash
rafa@trane: ~/dev/vc/the-job-announcement$ git fetch openshift
From ssh://thejobannouncement-rafacm.rhcloud.com/~/git/thejobannouncement
 * [new branch]      master     -> openshift/master
rafa@trane: ~/dev/vc/the-job-announcement$ 
```

And now, before we can <strong>replace</strong> the contents of the 'master' branch on the 'openshift' remote with the contents of our local 'openshift' branch we need to merge that branch into ours using the 'ours' strategy to make sure that any merging conflict is resolved by choosing the code from the 'quickstart' repository we pulled from before:

```bash
rafa@trane: ~/dev/vc/the-job-announcement$ git merge -s ours openshift/master
Merge made by the 'ours' strategy.
rafa@trane: ~/dev/vc/the-job-announcement$ 
```

You can also push now the 'openshift' branch to OpenShift for deployment (the 'master' branch on the 'openshift' remote):

```bash
rafa@trane: ~/dev/vc/the-job-announcement$ git push openshift openshift:master
Counting objects: 2288, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (1362/1362), done.
Writing objects: 100% (2274/2274), 4.05 MiB | 748 KiB/s, done.
Total 2274 (delta 846), reused 1906 (delta 683)
remote: restart_on_add=false
remote: Sending SIGTERM to jboss:28842 ...
remote: Done
remote: restart_on_add=false
remote: Running .openshift/action_hooks/pre_build
[...]
remote: [INFO] ------------------------------------------------------------------------
remote: [INFO] BUILD SUCCESS
remote: [INFO] ------------------------------------------------------------------------
remote: [INFO] Total time: 8:16.535s
remote: [INFO] Finished at: Fri May 10 11:02:44 EDT 2013
remote: [INFO] Final Memory: 30M/158M
remote: [INFO] ------------------------------------------------------------------------
remote: Running .openshift/action_hooks/build
remote: Running .openshift/action_hooks/deploy
remote: hot_deploy_added=false
remote: Found 127.8.203.129:8080 listening port
remote: Done
remote: Running .openshift/action_hooks/post_deploy
To ssh://518cfa465973cab9d500002c@thejobannouncement-rafacm.rhcloud.com/~/git/thejobannouncement.git/
   d38fcb0..73cbd9f  openshift -> master
rafa@trane: ~/dev/vc/the-job-announcement$
```

After OpenShift has built your application from source and deployed it, your application should be ready to rock at the OpenShift's provided URL:

<figure>
  <img src="/assets/images/deploying-camunda-bpm-process-applications-on-the-openshift-cloud/thejobannouncement-rafacm-openshift.png" alt="The Job Announcement running on OpenShift"
  />
    <figcaption class="text-center">
       The Job Announcement running on OpenShift.
  </figcaption>
</figure>

## Feedback welcome!
You can reach me either via the comments section below or via any of the social coordinates you will find on the top right corner of this page.
