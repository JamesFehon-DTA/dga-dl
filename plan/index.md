---
layout: main
title: Plan
lead: Browse or search for topics and resources relevant to your digital solution.

---

<main   class="ct-layout ct-layout--no-top-right ct-layout--no-bottom-right ct-layout--no-top-left ct-layout--no-bottom-left ct-vertical-spacing--top" role="main">
          <!--  CONTENT_TOP  -->
          {% if page.content_top %}  <div>{{ content_top }}</div> {% endif %} 
          <div class="ct-layout__inner container" data-masonry="true">
            <section class="ct-layout__main">
              <h1> {{page.title}}</h1>
              <p class="ct-text-large"> {{page.lead}}</p>
              {{page.toc}}
              <div class="ct-basic-content ct-theme-light">
                <div class="container">
                  <div class="row">
                    <div class="col-xxs-12">
                      {% assign cards = site.templates %}  
                      {% include explore-cards.html %}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <!-- <div >{{ content_bottom }}</div> -->
        </main>






