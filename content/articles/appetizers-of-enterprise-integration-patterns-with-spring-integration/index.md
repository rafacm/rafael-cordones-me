---
title: Appetizers of Enterprise Integration Patterns with Spring Integration
date: 2013-04-29
legacyUrl: http://rafael.cordones.me/2013/04/29/appetizers-of-enterprise-integration-patterns-with-spring-integration/
category: Blog
tags: 
    - b2b
    - camunda BPM
    - eai
    - eip
    - integration
    - spring integration
image:
    path: /2013-04-20-12.03.59.jpg
    alt: Sant Jordi
    caption:  Sant Jordi at Plaça Sant Jaume. Barcelona. Photo by <a href="http://rafael.cordones.me">Rafael Cordones</a>.
---
 
Since I was going to be in my hometown, Barcelona, this past week to enjoy <a href="http://en.wikipedia.org/wiki/Saint_George's_Day#Catalonia">Sant Jordi</a>, I took the opportunity offered by the <a href="http://www.barcelonajug.org/">Barcelona Java User Group</a> to make a talk about <a href="http://www.eaipatterns.com/">Enterprise Integration Patterns</a>.

These are some of the main points/ideas I wanted to bring across during the talk: 
<ul>
	<li>how using patterns and more specifically, using pattern <em>names</em> (and the concepts they describe) improves the chances of reaching a common understanding among the project's integration developers</li>
	<li>how integration frameworks like <a href="http://www.springsource.org/spring-integration">Spring Integration</a> and <a href="http://camel.apache.org/">Apache Camel</a> can help you hit the ground running in a very short time in an integration project and let you focus on the actual integration logic and not on the infrastructure which might lead you to get lost in the technical issues. Obviously, <a href="http://www.joelonsoftware.com/articles/LeakyAbstractions.html">all abstractions are leaky</a> and as a developer you should not expect to be isolated from those nitty-gritty technical details all the time.</li>
<li>how, the moment you start keeping too much state spread all over your channels, filters, routers, ..., it makes a lot of sense to bring in a process engine like <a href="http://camunda.org/">camunda BPM</a> (a <a href="http://www.enterpriseintegrationpatterns.com/ProcessManager.html">process manager</a> pattern in EIP lingo) </li>
</ul>

During the talk I also demoed, <a href="https://github.com/rafacm/tapas2go">Tapas2Go</a>, a small project I built with <a href="http://www.springsource.org/sts">STS</a> in a few hours and that I intend to further develop so it can be used as an implementation of the <a href="http://www.eaipatterns.com/Chapter1.html">Widgets & Gadgets ‘R Us example</a> appearing in the <a href="http://www.enterpriseintegrationpatterns.com/">Enterprise Integration Patterns</a> book.

These are the slides of the talk (<a href="https://speakerd.s3.amazonaws.com/presentations/9daeac4090740130a9c8529790d16483/appetizers-of-enterprise-integration-patterns-with-spring-integration-barcelonajug-barcelona-2013.pdf">PDF with active hyperlinks</a>):

<script async class="speakerdeck-embed" data-id="9daeac4090740130a9c8529790d16483" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
