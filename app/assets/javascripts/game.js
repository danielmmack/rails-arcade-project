document.addEventListener("turbolinks:load", function () {
  $('.edit_game').submit(editGameCallback)
    function editGameCallback(event) {
      event.preventDefault()
      let values = $(this).serialize()
      let gameId = parseInt($(".gameEdit").attr("data-id"))
      let editGame = $.post("/games/" + gameId + ".json", values)
      editGame.done(function(data) {
        let game = data
        $(".gameName").text(game["name"])
        $(".gameDifficultyLevel").text(game["difficulty_level"])
        $(".gameFunRating").text(game["fun_rating"])
      })
    }

    $('.gameEdit').click(function() {
      $(".editForm").show()
    })

    $('.gameEdit').click(function() {
      $(this).hide()
    })

    $('.edit_game').submit(function() {
      $(".editForm").hide()
      if (true) {
        return false;
      } else {
        return true;
      }
    })

    $('.edit_game').submit(function() {
      $('.gameEdit').show()
    })


  $('.js-next').click(nextGameCallback)
    function nextGameCallback(event) {
    let nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.get("/games/" + nextId + ".json", function(game) {
      // Update form and inputs
      $("form.edit_game").attr("action", `/games/${game["id"]}`)
      $("input#game_name").val(game["name"])
      $("#game_difficulty_level option").prop('selected', false)
      $(`#game_difficulty_level option[value="${game['difficulty_level']}"]`).prop('selected', true);
      $("#game_fun_rating option").prop('selected', false)
      $(`#game_fun_rating option[value="${game['fun_rating']}"]`).prop('selected', true);
      $("input#character_game_id").val(game.id)

      // Update Readonly Display fields
      $(".gameName").text(game["name"])
      $(".gameDifficultyLevel").text(game["difficulty_level"])
      $(".gameFunRating").text(game["fun_rating"])
      $(".gameCharacters").text("")
      game["characters"].forEach(function(character){
        $(".gameCharacters").append(`<li><a href='/games/${game.id}/characters/${character.id}'>${character.name}</a></li><br>`)
        $('.initialCharacters').hide()
      })
      $(".js-next").attr("data-id", game["id"])
    })
  }
})










































// class Game {
//   constructor(gameData) {
//     this.id = gameData.id
//     this.name = gameData.name
//     this.difficulty_level = gameData.difficulty_level
//     this.fun_rating = gameData.fun_rating
//   }
// }

// function Game(attributes) {
//   this.id = attributes.id
//   this.name = attributes.name
//   this.difficulty_level = attributes.difficulty_level
//   this.fun_rating = attributes.fun_rating
// }
//
// document.addEventListener("turbolinks:load", function () {
//   $('.edit_game').on("submit", function(event) {
//       event.preventDefault()
//       let $form = $(this)
//       let action = $form.attr("action")
//       let params = $form.serialize()
//
//         $.ajax({
//           url: action,
//           data: params,
//           dataType: "json",
//           method: "POST"
//         }).success(function(json) {
//           let game = new Game(json)
//
//         }

      // let values = $(this).serialize()
      // let gameId = parseInt($(".gameEdit").attr("data-id"))
      // let editGame = $.post("/games/" + gameId + ".json", values)
    //   $("#game_name").val("")
    //   editGame.done(function(data) {
    //     let game = data
    //     $(".gameName").text(game["name"])
    //     $(".gameDifficultyLevel").text(game["difficulty_level"])
    //     $(".gameFunRating").text(game["fun_rating"])
    //   })
    // }