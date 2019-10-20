$(document).ready(function () {
    $(".input__button").click(function () {
        let data = $("#data").val();
        let url = "https://swapi.co/api/";
        let link = url + data;
        $.ajax({
            type: "GET",
            url: link,
            dataType: "json",
            success: function (result) {
                $(".texto__busca").html(JSON.stringify(result.name));
            },
        });
    });
});
