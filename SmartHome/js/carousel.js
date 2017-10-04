function carouselInit() {
      var carousel, width, shift, arrItems, arrItemsLength;

      function nextElement(e) {
          var active = document.querySelector('.active');
          if (Array.prototype.indexOf.call(arrItems, active) < arrItemsLength - 2) {
              shift = shift + width;
              carousel.style.marginLeft = -shift + 'px';
              active.nextElementSibling.classList.add('active');
              active.classList.remove("active");
          }

          e.preventDefault();
      }

      function prevElement(e) {
          var active = document.querySelector('.active');
          if (Array.prototype.indexOf.call(arrItems, active) > 0) {
              shift = shift - width;
              carousel.style.marginLeft = -shift + 'px';
              active.previousElementSibling.classList.add('active');
              active.classList.remove("active");
          }
          
          e.preventDefault();
      }

          carousel = document.querySelector('.carousel_list');
          width = carousel.firstElementChild.clientWidth;
          shift = 0;
          document.querySelector('.prev').onclick = prevElement;
          document.querySelector('.next').onclick = nextElement;
          arrItems = carousel.children;
          arrItemsLength = arrItems.length;
}

