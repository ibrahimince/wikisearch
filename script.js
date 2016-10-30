$(function() {

  $('.forminput input[type="text"]').on('input propertychange', function() {
    var $this = $(this);
    var visible = Boolean($this.val());
    $this.siblings('.glyphicon').toggleClass('hidden', !visible);
  }).trigger('propertychange'); //nema potrebe za njim

  $('.glyphicon').click(function() {
    $(this).siblings('input[type="text"]').val('')
      .trigger('propertychange').focus();
    $('.results').empty();
  });

  $('.forminput').on('submit', function(event) {
    event.preventDefault();
    var typed = $('.nice').val();
    $.getJSON('http://en.wikipedia.org/w/api.php?callback=?', {
      action: 'query',
      srsearch: typed,
      format: 'json',
      list: 'search'
    }, function(data) {
      $('.results').empty();
      console.log(data);
      $.each(data.query.search, function(index, item) {
        $('.results').append("<a class='append' href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + "<div class='appendsearch'><h1>" + item.title + "</h1><p>" + item.snippet + "</p></div></a>")
      })
    })
  })
})