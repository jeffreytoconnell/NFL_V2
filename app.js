  function leagueCrimes(searchTerm) {
    var url = 'http://NflArrest.com/api/v1/crime';
    $('.search_results').append("<strong>Top Crimes in League:</strong>"  + "<br>");
    $.getJSON(url, function (data) {
      $.each(data, function () {
        var cat = this.Category;
        var acount = this.arrest_count;
        
        $('.search_results').append(cat + ' ' + ' - ' + acount).append('<br>');
      })
    })
  };

  function leagueTeams(searchTerm) {
    var url = 'http://NflArrest.com/api/v1/team';
    $.getJSON(url, function (data) {
      $.each(data, function () {
        var team = this.Team;
        var name = this.Team_name;
        $('.right_panel').append(team + ' ' + name).append('<br>');
      })
    })
  };

  function leaguePlayers(searchTerm) {
    var url = 'http://NflArrest.com/api/v1/player/';
    $('.right_panel').append("<strong>Top Offenders in League:</strong>" + "<br>");
    
    $.getJSON(url, function (data) {
      $.each(data, function () {
        var name = this.Name;
        var team = this.Team_name;
        $('.right_panel').append(name + ' ' + ' - ' + team).append('<br>');
        
      })
    })
  };

  $(document).ready(function () {

    // SEARCH BY TEAM //
    function teamSearch(searchTerm) {
      var url = 'http://NflArrest.com/api/v1/team/topCrimes/' + searchTerm;
      $('.search_results').append("<strong>Top Crimes:</strong>" + "<br>");    
      var chartArray = [];
      $.getJSON(url, function (data) {
        $.each(data, function () {
          var cat = this.Category;
          var acount = this.arrest_count;
          var chartObject = {
            name: cat,
            y: Number(acount)
          };
          chartArray.push(chartObject)
          $('.search_results').append(cat + ' ' + acount).append('<br>');
          
        })
        $(".far_right_panel").html('<div id="container" style="min-width: 510px; height: 400px; max-width: 600px; margin: 0 auto"></div>')
        
        // CHART //

        Highcharts.chart('container', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
            }
          },
          title: {
            text: '  Crimes'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              }
            }
          },
          series: [{
            name: 'Brands',
            colorByPoint: true,
            data: chartArray
          }]
        });
      })
    };

    // TOP PLAYERS BY TEAM //
    function topPlayer(searchTerm) {
      var url = 'http://NflArrest.com/api/v1/team/topPlayers/' + searchTerm;
      $('.right_panel').append("<strong>Top Offenders:</strong>" + "<br>");
      $.getJSON(url, function (data) {
        $.each(data, function () {
          var name = this.Name;
          var acount = this.arrest_count;
          $('.right_panel').append(name + ' ' + acount).append('<br>');
        })
      })
    };

    // ARREST DETAILS //
    function arrestDetails(searchTerm) {
      var url = 'http://NflArrest.com/api/v1/team/arrests/' + searchTerm;
      $('.bottom_panel').append("<strong>Arrest Details:</strong>" + "<br>" + "<br>");
      $.getJSON(url, function (data) {
        $.each(data, function () {
          var name = this.Name;
          var date = this.Date;
          var description = this.Description;
          $('.bottom_panel').append(date + ' - ' + name + ' - ' + description).append('<br>');
        })
      })
    };


    // CLICK ON TEAM //

    $('li a').click(function () {
      var teamSelected = this.id;
      $('.search_results').empty();
      $('.right_panel').empty();
      $('.bottom_panel').empty();
      $('.far_right_panel').empty();

      teamSearch(teamSelected);
      topPlayer(teamSelected);
      arrestDetails(teamSelected);

    });

    leagueCrimes();
    leaguePlayers();

  });

