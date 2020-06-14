$(document).on('turbolinks:load', function() {
  function buildHTML(message){
     var img = message.image ? `<img src=${message.image} >` : "";
     var html = 
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         ${img}
       </div>`
     return html;
   };
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: "json",
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('#new_message')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 })
});



$(document).on('turbolinks:load', function() {
  var user_list = $("#user-search-result");
  var member_list = $("#member_search_result");

  function appendUsers(user) {
      var html = `<div class='chat-group-user clearfix js-chat-member'>
              <div class='chat-group-form__field--right'>
              <p class="chat-group-user__name">
              ${user.name}
              </p>
              <a class="user_search_add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
              </a>
              </div>`

      user_list.append(html);
  }

  function appendMembers(name, user_id) {
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat_group_user_22'>
              <input name='group[user_ids][]' type='hidden' value="${user_id}">
              <p class='chat-group-user__name'>${name}</p>
              <a class='user_search_remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`

      member_list.append(html);
  }

      $(".chat-group-form__input").on("keyup", function () {
          var input = $("#user-search-field").val();

          if (input == 0) {
            $("#user-search-field").empty();
          } else {
          $.ajax({
              type: 'GET',
              url: '/users',
              data: { keyword: input },
              dataType: 'json'
          })


              .done(function (members) {
                  $("#user-search-result").empty();
                  if (members.length != 0) {
                      members.forEach(function (user) {
                          appendUsers(user);
                      })
                  }
              })
              .fail(function () {
                  alert('ユーザー検索に失敗しました');
              });
            }
      });

  $(function () {
      $(document).on("click", '.user_search_add', function () {
          var name = $(this).attr("data-user-name");
          var user_id = $(this).attr("data-user-id");
          $(this).parent().remove();
          appendMembers(name, user_id);
      });
      $(document).on("click", '.user_search_remove', function () {
          $(this).parent().remove();
      });
    });
// 
var reloadMessages = function () {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data("message-id"); 
  

    $.ajax({ 
      url: "api/messages", 
      type: 'get', 
      dataType: 'json', 
      data: {last_id: last_message_id} 
    })
    .done(function (messages) { 
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        console.log(message) ;
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function () {
      alert('自動更新に失敗しました');
    });
  }
};
setInterval(reloadMessages, 5000);
  
}); 


