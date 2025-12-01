---
author: Rafael Cordones
pubDatetime: 2013-04-26T12:00:00Z
modDatetime:  2013-04-26T12:00:00Z
title: The Job Announcement on the OpenShift PaaS cloud?
slug: the-job-announcement-on-the-openshift-paas-cloud
featured: false
draft: false
tags:
  - BPM
  - BPMN
  - camunda BPM
  - cloud
  - jboss
  - openshift
  - paas
  - the job announcement
description:
  How to deploy The Job Announcement application on the OpenShift Cloud.
---

<figure>
  <img src="/assets/images/the-job-announcement-on-the-openshift-paas-cloud/IMG_0993_0998_panorama_small.jpeg" alt="Night Falls over Ponts, Lleida. Spain."/>
    <figcaption class="text-center">
    Night Falls over Ponts, Lleida. Spain. Photo by <a href="http://rafael.cordones.me">Rafael Cordones</a>.
  </figcaption>
</figure>

Last year <a href="http://plexiti.com/">Martin Schimak</a> and me, came up with the idea to develop a showcase in order to have an application which we could use to demonstrate the advantages of developing business applications on <a href="http://camunda.org"><strong>a platform where business process are first-class citizens</strong></a>. That showcase eventually grew up to become <a href="https://github.com/plexiti/the-job-announcement">The Job Announcement</a> and we even ended up presenting it at the <a href="http://www.bpmcon.de/impressionen-2012/">BPMCon 2012</a> in Berlin!

In March this year, <a href="http://www.camunda.com/">camunda</a> <a href="http://www.infoq.com/news/2013/03/Camunda-Forks-Activiti">forked the Activiti project</a> and launched a new product: <a href="http://camunda.org/">the open-source camunda BPM platform</a> and I could not wait to migrate the showcase to it! The<a href="http://docs.camunda.org/guides/migration-guide/"> migration from Activiti/camunda fox to camunda BPM</a> was actually a piece of cake and I will blog about it in another post. This post will focus on the implementation of an idea that we got during the migration: what if instead of deploying <a href="https://github.com/plexiti/the-job-announcement">The Job Announcement</a> on "own" JBoss AS 7 server we <em>push it</em> to the cloud? We finally did that and pushed it to… <a href="https://www.openshift.com/">OpenShift</a>.

Why OpenShift? Because the offer <a href="https://www.openshift.com/get-started/jboss">both JBoss AS and JBoss EAP</a> as pre-configured "application types" (in OpenShift's lingo) is quite convenient. I would nevertheless be very happy to hear from your experience deploying your apps on JBoss AS/EAP on another PaaS provider.

## JBoss AS 7.1.x or JBoss EAP 6.x?

OpenShift offers both JBoss AS 7.<strong><span style="text-decoration: underline;">1.0.Final</span></strong> and JBoss EAP <a href="http://6.0.1.ga/">6.0.1.GA</a> (AS 7.1.3.Final-redhat-4) application types. Given that the <a href="http://camunda.org/">camunda BPM platform</a> distribution for JBoss AS 7 (<a href="http://camunda.org/download/">download</a>) is built on top of JBoss AS 7<span style="text-decoration: underline;">.<b>1.3</b></span>, I went the EAP 6.x route. By the way, in case you are wondering why you cannot find newer releases of JBoss <strong>AS 7.1.0</strong>, have a look at this port <a href="https://community.jboss.org/blogs/mark.little/2013/03/07/eap-binaries-available-for-all-developers">this post</a> which give some background on the availability of JBoss AS and EAP source and binary artifacts (thanks <a href="http://camunda.org/community/team.html">Bernd Rücker</a> for it!).

<a href="http://the-job-announcement.com/">the-job-announcement.com</a> is now proudly served (though a bit slow due to the use of only 1 free gear!) by a JBoss EAP 6.0 running on OpenShift.

The following two posts explain the details in case you would like to deploy your camunda BPM-based process application on OpenShift:
* <a href="/posts/2013/05/03/a-camunda-bpm-quickstart-for-jboss-eap-6-0-on-openshift">A camunda BPM Quickstart for JBoss EAP 6.0 on OpenShift?</a>
* <a href="/posts/2013/05/14/deploying-camunda-bpm-process-applications-on-the-openshift-cloud">Deploying camunda BPM process applications on the OpenShift cloud</a>

> UPDATE (2013-05-03): added link to follow up post.

> UPDATE (2013-05-14): added link to follow up post.
