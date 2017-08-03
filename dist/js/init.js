    $(document).ready(function() {

       $('#menutop').flexMenu();
 
  var slickParams = {
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      speed: 300,
      dots: false,
      arrows:true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };


});
