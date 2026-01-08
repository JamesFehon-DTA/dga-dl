---
layout: main
title: Patterns
lead: Patterns are reusable compositions of components that solve design problems and help ensure consistency across the service.



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
                      {% assign cards = site.patterns %} 
                      {% include explore-cards.html content=cards %}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <!-- <div >{{ content_bottom }}</div> -->
        </main>






